/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from "reactstrap";
import classnames from "classnames";
import userDefault from "../../assets/img/theme/user-default.svg";
import Header from "components/Headers/Header.js";

const defaultCoverPhotoSvg =
  "data:image/svg+xml;utf8,<svg width='600' height='240' viewBox='0 0 600 240' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='600' height='240' fill='%23f7f7f7'/><path d='M0 180 Q150 120 300 180 T600 180 V240 H0 Z' fill='%23e3eafc'/><path d='M0 200 Q200 140 400 200 T600 200 V240 H0 Z' fill='%23cfd8dc' opacity='0.7'/></svg>";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("admin");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [sortBy, setSortBy] = useState("name"); // "name", "email", "department", "status", "lastLogin"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for A-Z, "desc" for Z-A
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [localUsers, setLocalUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteUserName, setDeleteUserName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // "table" or "block"
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); // { src: string, type: 'cover' | 'avatar' }
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('scms_users') || '[]');
    setLocalUsers(stored);
  }, []);

  // On mount, check for tab and view query params and set state accordingly
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    const view = params.get('view');
    if (tab && (tab === 'admin' || tab === 'teacher' || tab === 'student')) setActiveTab(tab);
    if (view && (view === 'table' || view === 'block')) setViewMode(view);
  }, []);

  // Sample user data
  const users = [
    // Admin users
    { id: 1, name: "Dr. Sarah Johnson", email: "sarah.johnson@school.com", role: "admin", status: "active", department: "Administration", lastLogin: "2024-01-15" },
    { id: 2, name: "Mr. David Smith", email: "david.smith@school.com", role: "admin", status: "active", department: "Administration", lastLogin: "2024-01-14" },
    { id: 3, name: "Ms. Lisa Brown", email: "lisa.brown@school.com", role: "admin", status: "inactive", department: "Administration", lastLogin: "2024-01-05" },
    
    // Teacher users
    { id: 4, name: "Dr. Emily Johnson", email: "emily.johnson@school.com", role: "teacher", status: "active", department: "Mathematics", lastLogin: "2024-01-15" },
    { id: 5, name: "Prof. David Smith", email: "david.smith@school.com", role: "teacher", status: "active", department: "Science", lastLogin: "2024-01-15" },
    { id: 6, name: "Ms. Lisa Brown", email: "lisa.brown@school.com", role: "teacher", status: "active", department: "English", lastLogin: "2024-01-14" },
    { id: 7, name: "Mr. Robert Wilson", email: "robert.wilson@school.com", role: "teacher", status: "inactive", department: "History", lastLogin: "2024-01-08" },
    { id: 8, name: "Dr. Maria Garcia", email: "maria.garcia@school.com", role: "teacher", status: "active", department: "Physics", lastLogin: "2024-01-15" },
    { id: 9, name: "Mrs. Jennifer Lee", email: "jennifer.lee@school.com", role: "teacher", status: "active", department: "Chemistry", lastLogin: "2024-01-15" },
    { id: 10, name: "Mr. Thomas Anderson", email: "thomas.anderson@school.com", role: "teacher", status: "active", department: "Biology", lastLogin: "2024-01-14" },
    { id: 11, name: "Ms. Amanda White", email: "amanda.white@school.com", role: "teacher", status: "active", department: "Art", lastLogin: "2024-01-15" },
    { id: 12, name: "Dr. Christopher Martinez", email: "christopher.martinez@school.com", role: "teacher", status: "active", department: "Music", lastLogin: "2024-01-14" },
    { id: 13, name: "Mrs. Patricia Taylor", email: "patricia.taylor@school.com", role: "teacher", status: "active", department: "Physical Education", lastLogin: "2024-01-15" },
    { id: 14, name: "Mr. Daniel Clark", email: "daniel.clark@school.com", role: "teacher", status: "active", department: "Computer Science", lastLogin: "2024-01-14" },
    { id: 15, name: "Ms. Rebecca Hall", email: "rebecca.hall@school.com", role: "teacher", status: "active", department: "Geography", lastLogin: "2024-01-15" },
    { id: 16, name: "Dr. Kevin Rodriguez", email: "kevin.rodriguez@school.com", role: "teacher", status: "active", department: "Economics", lastLogin: "2024-01-14" },
    { id: 17, name: "Mrs. Stephanie Lewis", email: "stephanie.lewis@school.com", role: "teacher", status: "active", department: "Psychology", lastLogin: "2024-01-15" },
    { id: 18, name: "Mr. Jason Walker", email: "jason.walker@school.com", role: "teacher", status: "inactive", department: "Sociology", lastLogin: "2024-01-05" },
    
    // Student users
    { id: 19, name: "Alex Thompson", email: "alex.thompson@student.school.com", role: "student", status: "active", department: "Grade 12", lastLogin: "2024-01-15" },
    { id: 20, name: "Emma Davis", email: "emma.davis@student.school.com", role: "student", status: "active", department: "Grade 11", lastLogin: "2024-01-15" },
    { id: 21, name: "James Wilson", email: "james.wilson@student.school.com", role: "student", status: "active", department: "Grade 10", lastLogin: "2024-01-14" },
    { id: 22, name: "Sophia Lee", email: "sophia.lee@student.school.com", role: "student", status: "inactive", department: "Grade 12", lastLogin: "2024-01-05" },
    { id: 23, name: "Michael Chen", email: "michael.chen@student.school.com", role: "student", status: "active", department: "Grade 11", lastLogin: "2024-01-15" },
    { id: 24, name: "Olivia Taylor", email: "olivia.taylor@student.school.com", role: "student", status: "active", department: "Grade 10", lastLogin: "2024-01-14" },
    { id: 25, name: "William Brown", email: "william.brown@student.school.com", role: "student", status: "active", department: "Grade 12", lastLogin: "2024-01-15" },
    { id: 26, name: "Ava Johnson", email: "ava.johnson@student.school.com", role: "student", status: "active", department: "Grade 11", lastLogin: "2024-01-15" },
    { id: 27, name: "Ethan Miller", email: "ethan.miller@student.school.com", role: "student", status: "active", department: "Grade 10", lastLogin: "2024-01-14" },
    { id: 28, name: "Isabella Garcia", email: "isabella.garcia@student.school.com", role: "student", status: "active", department: "Grade 12", lastLogin: "2024-01-15" },
    { id: 29, name: "Mason Rodriguez", email: "mason.rodriguez@student.school.com", role: "student", status: "active", department: "Grade 11", lastLogin: "2024-01-14" },
    { id: 30, name: "Mia Martinez", email: "mia.martinez@student.school.com", role: "student", status: "active", department: "Grade 10", lastLogin: "2024-01-15" },
    { id: 31, name: "Noah Anderson", email: "noah.anderson@student.school.com", role: "student", status: "active", department: "Grade 12", lastLogin: "2024-01-14" },
    { id: 32, name: "Charlotte White", email: "charlotte.white@student.school.com", role: "student", status: "active", department: "Grade 11", lastLogin: "2024-01-15" },
    { id: 33, name: "Liam Clark", email: "liam.clark@student.school.com", role: "student", status: "active", department: "Grade 10", lastLogin: "2024-01-14" },
    { id: 34, name: "Harper Hall", email: "harper.hall@student.school.com", role: "student", status: "active", department: "Grade 12", lastLogin: "2024-01-15" },
    { id: 35, name: "Evelyn Lewis", email: "evelyn.lewis@student.school.com", role: "student", status: "active", department: "Grade 11", lastLogin: "2024-01-14" },
    { id: 36, name: "Benjamin Walker", email: "benjamin.walker@student.school.com", role: "student", status: "active", department: "Grade 10", lastLogin: "2024-01-15" },
    { id: 37, name: "Abigail Young", email: "abigail.young@student.school.com", role: "student", status: "active", department: "Grade 12", lastLogin: "2024-01-14" },
    { id: 38, name: "Sebastian King", email: "sebastian.king@student.school.com", role: "student", status: "active", department: "Grade 11", lastLogin: "2024-01-15" },
    { id: 39, name: "Emily Wright", email: "emily.wright@student.school.com", role: "student", status: "active", department: "Grade 10", lastLogin: "2024-01-14" },
    { id: 40, name: "Daniel Lopez", email: "daniel.lopez@student.school.com", role: "student", status: "active", department: "Grade 12", lastLogin: "2024-01-15" },
    { id: 41, name: "Sofia Hill", email: "sofia.hill@student.school.com", role: "student", status: "active", department: "Grade 11", lastLogin: "2024-01-14" },
    { id: 42, name: "Matthew Scott", email: "matthew.scott@student.school.com", role: "student", status: "active", department: "Grade 10", lastLogin: "2024-01-15" },
    { id: 43, name: "Avery Green", email: "avery.green@student.school.com", role: "student", status: "active", department: "Grade 12", lastLogin: "2024-01-14" },
    { id: 44, name: "Ella Adams", email: "ella.adams@student.school.com", role: "student", status: "active", department: "Grade 11", lastLogin: "2024-01-15" },
    { id: 45, name: "Jackson Baker", email: "jackson.baker@student.school.com", role: "student", status: "active", department: "Grade 10", lastLogin: "2024-01-14" },
    { id: 46, name: "Madison Nelson", email: "madison.nelson@student.school.com", role: "student", status: "inactive", department: "Grade 12", lastLogin: "2024-01-03" },
  ];

  // Merge localUsers with sample users for display:
  const allUsers = [...users, ...localUsers];

  // Filter users based on search term and role filter
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.department || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Group users by role
  const adminUsers = filteredUsers.filter(user => user.role === "admin");
  const teacherUsers = filteredUsers.filter(user => user.role === "teacher");
  const studentUsers = filteredUsers.filter(user => user.role === "student");

  // Only show the selected number of entries
  const getPaginatedUsers = (users) => {
    let sortedUsers = [...users].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Handle different data types
      if (sortBy === "lastLogin") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedUsers.slice(startIndex, endIndex);
  };

  const getStatusBadge = (status) => {
    return status === "active" ? (
      <Badge color="success">Active</Badge>
    ) : (
      <Badge color="secondary">Inactive</Badge>
    );
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <Badge color="danger" className="badge-dot mr-2">Admin</Badge>;
      case "teacher":
        return <Badge color="warning" className="badge-dot mr-2">Teacher</Badge>;
      case "student":
        return <Badge color="info" className="badge-dot mr-2">Student</Badge>;
      default:
        return <Badge color="secondary" className="badge-dot mr-2">Unknown</Badge>;
    }
  };

  const getRoleBadgeForBlock = (role) => {
    return (
      <Badge 
        color="dark" 
        className="badge-dot mr-2"
        style={{
          backgroundColor: '#172b4d',
          color: '#fff',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem',
          fontSize: '0.7rem',
          fontWeight: '600'
        }}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  // Get current users for pagination
  const getCurrentUsers = () => {
    if (activeTab === "admin") return adminUsers;
    if (activeTab === "teacher") return teacherUsers;
    if (activeTab === "student") return studentUsers;
    return [];
  };

  // Calculate pagination info
  const getPaginationInfo = () => {
    const currentUsers = getCurrentUsers();
    const totalItems = currentUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    return { totalItems, totalPages, startItem, endItem };
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when switching tabs
  };

  const handleDeleteUser = (id, name) => {
    setDeleteUserId(id);
    setDeleteUserName(name);
  };

  const cancelDeleteUser = () => {
    setDeleteUserId(null);
    setDeleteUserName("");
  };

  const confirmDeleteUser = async () => {
    setIsDeleting(true);
    
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    let users = JSON.parse(localStorage.getItem('scms_users') || '[]');
    users = users.filter(u => String(u.id) !== String(deleteUserId));
    localStorage.setItem('scms_users', JSON.stringify(users));
    setLocalUsers(users);
    
    setIsDeleting(false);
    setShowDeleteSuccess(true);
    
    // Hide success message after 3 seconds and close modal
    setTimeout(() => {
      setShowDeleteSuccess(false);
      cancelDeleteUser();
      // Restore tab and view mode after delete
      const params = new URLSearchParams({ tab: activeTab, view: viewMode });
      window.history.replaceState(null, '', `/admin/user-management?${params.toString()}`);
    }, 3000);
  };

  // Generate random avatar for real people
  const getRandomAvatar = (userId) => {
    const avatarUrls = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face"
    ];
    
    // Use userId to consistently get the same avatar for the same user
    const index = Math.abs(userId.toString().split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % avatarUrls.length;
    return avatarUrls[index];
  };

  const getAvatarForUser = (user) => {
    // If user has a custom profile image, use it
    if (user.profileImageUrl && user.profileImageUrl !== userDefault) {
      return user.profileImageUrl;
    }
    
    // Assign random avatars to specific users based on role
    if (user.role === 'admin') {
      // First 2 admins get random avatars
      const adminUsers = [...users, ...localUsers].filter(u => u.role === 'admin').sort((a, b) => a.id - b.id);
      const adminIndex = adminUsers.findIndex(u => u.id === user.id);
      if (adminIndex < 2) {
        return getRandomAvatar(user.id);
      }
    } else if (user.role === 'teacher') {
      // First 9 teachers get random avatars
      const teacherUsers = [...users, ...localUsers].filter(u => u.role === 'teacher').sort((a, b) => a.id - b.id);
      const teacherIndex = teacherUsers.findIndex(u => u.id === user.id);
      if (teacherIndex < 9) {
        return getRandomAvatar(user.id);
      }
    } else if (user.role === 'student') {
      // First 15 students get random avatars
      const studentUsers = [...users, ...localUsers].filter(u => u.role === 'student').sort((a, b) => a.id - b.id);
      const studentIndex = studentUsers.findIndex(u => u.id === user.id);
      if (studentIndex < 15) {
        return getRandomAvatar(user.id);
      }
    }
    
    // For all other users, use default avatar
    return userDefault;
  };

  const handleUserRowClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };
  const closeUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
    // Update URL to preserve tab and view
    const params = new URLSearchParams({ tab: activeTab, view: viewMode });
    window.history.replaceState(null, '', `/admin/user-management?${params.toString()}`);
  };

  // Helper to abbreviate course names
  const getCourseAbbreviation = (course) => {
    if (!course) return '';
    const map = {
      'Bachelor of Science in Information Technology': 'BSIT',
      'Bachelor of Science in Information Systems': 'BSIS',
      'Bachelor of Science in Computer Science': 'BSCS',
      'Associate in Computer Technology': 'ACT',
      // Add more mappings as needed
    };
    return map[course] || course;
  };

  // Helper to get sort indicator
  const getSortIndicator = (key) => {
    if (sortBy === key) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return ' ↑';
  };

  const renderUserTable = (users, title, color) => {
    if (users.length === 0) return null;
    const { totalItems, totalPages, startItem, endItem } = getPaginationInfo();
    return (
      <div className="mb-4">
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col" onClick={() => { setSortBy('name'); setSortOrder(sortBy === 'name' && sortOrder === 'asc' ? 'desc' : 'asc'); }} style={{ cursor: 'pointer' }}>
                Name{getSortIndicator('name')}
              </th>
              <th scope="col" onClick={() => { setSortBy('email'); setSortOrder(sortBy === 'email' && sortOrder === 'asc' ? 'desc' : 'asc'); }} style={{ cursor: 'pointer' }}>
                Email{getSortIndicator('email')}
              </th>
              <th scope="col" onClick={() => { setSortBy('department'); setSortOrder(sortBy === 'department' && sortOrder === 'asc' ? 'desc' : 'asc'); }} style={{ cursor: 'pointer' }}>
                {activeTab === 'student' ? 'Course/Year/Section' : 'Department'}{getSortIndicator('department')}
              </th>
              <th scope="col" onClick={() => { setSortBy('status'); setSortOrder(sortBy === 'status' && sortOrder === 'asc' ? 'desc' : 'asc'); }} style={{ cursor: 'pointer' }}>
                Status{getSortIndicator('status')}
              </th>
              <th scope="col" onClick={() => { setSortBy('lastLogin'); setSortOrder(sortBy === 'lastLogin' && sortOrder === 'asc' ? 'desc' : 'asc'); }} style={{ cursor: 'pointer' }}>
                Last Login{getSortIndicator('lastLogin')}
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedUsers(users).map((user) => {
              let courseYearSection = user.department;
              if (user.role === 'student') {
                const course = getCourseAbbreviation(user.department);
                const year = user.year ? user.year : '';
                const section = user.section ? user.section : '';
                courseYearSection = [course, year, section].filter(Boolean).join(' ').replace(/  +/g, ' ');
              }
              return (
                <tr key={user.id} style={{ cursor: 'pointer' }} onClick={e => {
                  if (e.target.closest('button')) return;
                  handleUserRowClick(user);
                }}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div
                        className="avatar avatar-sm rounded-circle bg-gradient-primary mr-3"
                        style={{
                          width: 40,
                          height: 40,
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: getAvatarForUser(user) !== userDefault ? 'transparent' : '#f8f9fa',
                          border: getAvatarForUser(user) !== userDefault ? undefined : '1px solid #e9ecef'
                        }}
                      >
                        <img 
                          src={getAvatarForUser(user)} 
                          alt={user.name} 
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            backgroundColor: getAvatarForUser(user) === userDefault ? '#fff' : 'transparent'
                          }} 
                        />
                      </div>
                      <div>
                        <span className="font-weight-bold">{user.name}</span>
                        <br />
                        <small className="text-muted">ID: {user.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{courseYearSection}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>{user.lastLogin}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <Button
                      color="primary"
                      size="sm"
                      className="mr-2"
                      onClick={() => navigate(`/admin/edit-user/${user.id}?tab=${activeTab}&view=${viewMode}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id, user.name)}
                      disabled={!getAvatarForUser(user) && !localUsers.find(u => String(u.id) === String(user.id))}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        
        {/* Pagination */}
        <div className="d-flex flex-row justify-content-between align-items-center w-100 mt-3 px-4">
          <div className="d-flex flex-row align-items-center">
            <span className="mr-2 text-muted small">Show</span>
            <Input
              className="custom-focus-effect"
              type="select"
              value={itemsPerPage}
              onChange={e => handleItemsPerPageChange(parseInt(e.target.value))}
              style={{ width: '80px', fontSize: '0.95rem', marginRight: '8px' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Input>
            <span className="text-muted small" style={{ whiteSpace: 'nowrap' }}>
              of {totalItems} entries
            </span>
          </div>
          <Pagination size="sm" className="mb-0 justify-content-center">
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink
                previous
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ cursor: currentPage === 1 ? 'default' : 'pointer' }}
              />
            </PaginationItem>
            
            {/* Mobile-friendly page numbers - show fewer elements on small screens */}
            {currentPage > 2 && !isMobile && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(1)}
                  style={{ cursor: 'pointer', textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            
            {currentPage > 3 && !isMobile && (
              <PaginationItem disabled>
                <PaginationLink style={{ textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}>...</PaginationLink>
              </PaginationItem>
            )}
            
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{ cursor: 'pointer', textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}
                >
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            
            <PaginationItem active>
              <PaginationLink style={{ textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{ cursor: 'pointer', textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}
                >
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            
            {currentPage < totalPages - 2 && !isMobile && (
              <PaginationItem disabled>
                <PaginationLink style={{ textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}>...</PaginationLink>
              </PaginationItem>
            )}
            
            {currentPage < totalPages - 1 && !isMobile && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(totalPages)}
                  style={{ cursor: 'pointer', textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            
            <PaginationItem disabled={currentPage === totalPages}>
              <PaginationLink
                next
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ cursor: currentPage === totalPages ? 'default' : 'pointer' }}
              />
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    );
  };

  const renderUserBlocks = (users, title, color) => {
    if (users.length === 0) return null;
    
    const { totalItems, totalPages, startItem, endItem } = getPaginationInfo();
    
    return (
      <div className="mb-4">
        <Row className="px-3">
          {getPaginatedUsers(users).map((user) => (
            <Col key={user.id} lg="4" md="6" sm="12" className="mb-3">
              <Card className="shadow-sm position-relative">
                <div style={{ position: 'absolute', top: 12, right: 16, zIndex: 2 }} onClick={e => e.stopPropagation()}>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      color="link"
                      size="sm"
                      className="text-muted p-0 user-block-menu-toggle"
                      style={{ border: 'none', background: 'transparent', fontSize: '1.15rem', lineHeight: 1, borderRadius: '50%', transition: 'background 0.15s' }}
                      aria-label="Actions"
                    >
                      <i className="fa fa-ellipsis-h" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem
                        onClick={() => navigate(`/admin/edit-user/${user.id}?tab=${activeTab}&view=${viewMode}`)}
                        className="d-flex align-items-center"
                      >
                        <i className="ni ni-settings-gear-65 mr-2"></i>
                        Edit User
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        disabled={!getAvatarForUser(user) && !localUsers.find(u => String(u.id) === String(user.id))}
                        className="d-flex align-items-center text-danger"
                      >
                        <i className="fa fa-trash mr-2"></i>
                        Delete User
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
                <CardBody className="p-3" style={{ cursor: 'pointer' }} onClick={() => handleUserRowClick(user)}>
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="avatar avatar-sm rounded-circle bg-gradient-primary mr-3"
                      style={{
                        width: 50,
                        height: 50,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: getAvatarForUser(user) !== userDefault ? 'transparent' : '#f8f9fa',
                        border: getAvatarForUser(user) !== userDefault ? undefined : '1px solid #e9ecef'
                      }}
                    >
                      <img 
                        src={getAvatarForUser(user)} 
                        alt={user.name} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          backgroundColor: getAvatarForUser(user) === userDefault ? '#fff' : 'transparent'
                        }} 
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 font-weight-bold">{user.name}</h6>
                      <small className="text-muted">ID: {user.id}</small>
                    </div>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted d-block">
                      <i className="ni ni-email-83 mr-1"></i>
                      {user.email}
                    </small>
                    <small className="text-muted d-block">
                      <i className="ni ni-badge mr-1"></i>
                      {user.department || 'N/A'}
                    </small>
                    <small className="text-muted d-block">
                      <i className="ni ni-calendar-grid-58 mr-1"></i>
                      Last Login: {user.lastLogin}
                    </small>
                  </div>
                  <div className="d-flex align-items-center">
                    {getStatusBadge(user.status)}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        
        {/* Pagination */}
        <div className="d-flex flex-row justify-content-between align-items-center w-100 mt-3 px-4">
          <div className="d-flex flex-row align-items-center">
            <span className="mr-2 text-muted small">Show</span>
            <Input
              className="custom-focus-effect"
              type="select"
              value={itemsPerPage}
              onChange={e => handleItemsPerPageChange(parseInt(e.target.value))}
              style={{ width: '80px', fontSize: '0.95rem', marginRight: '8px' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Input>
            <span className="text-muted small" style={{ whiteSpace: 'nowrap' }}>
              of {totalItems} entries
            </span>
          </div>
          <Pagination size="sm" className="mb-0 justify-content-center">
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink
                previous
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ cursor: currentPage === 1 ? 'default' : 'pointer' }}
              />
            </PaginationItem>
            
            {/* Mobile-friendly page numbers - show fewer elements on small screens */}
            {currentPage > 2 && !isMobile && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(1)}
                  style={{ cursor: 'pointer', textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            
            {currentPage > 3 && !isMobile && (
              <PaginationItem disabled>
                <PaginationLink style={{ textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}>...</PaginationLink>
              </PaginationItem>
            )}
            
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{ cursor: 'pointer', textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}
                >
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            
            <PaginationItem active>
              <PaginationLink style={{ textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{ cursor: 'pointer', textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}
                >
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            
            {currentPage < totalPages - 2 && !isMobile && (
              <PaginationItem disabled>
                <PaginationLink style={{ textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}>...</PaginationLink>
              </PaginationItem>
            )}
            
            {currentPage < totalPages - 1 && !isMobile && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(totalPages)}
                  style={{ cursor: 'pointer', textAlign: 'center', minWidth: '28px', fontSize: '0.875rem' }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            
            <PaginationItem disabled={currentPage === totalPages}>
              <PaginationLink
                next
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ cursor: currentPage === totalPages ? 'default' : 'pointer' }}
              />
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header showStats={false} />
      {/* Page content */}
      <Container className="mt-4" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              {/* Tabs and View Mode Row */}
              <Row className="mb-4 align-items-center">
                <Col xs="12">
                  <div className="d-flex justify-content-between align-items-center flex-nowrap">
                    <Nav tabs className="flex-shrink-0">
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "admin" })}
                          onClick={() => handleTabChange("admin")}
                          style={{
                            cursor: "pointer",
                            borderBottom: activeTab === "admin" ? "3px solid #5e72e4" : "none"
                          }}
                        >
                          Admins
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "teacher" })}
                          onClick={() => handleTabChange("teacher")}
                          style={{
                            cursor: "pointer",
                            borderBottom: activeTab === "teacher" ? "3px solid #5e72e4" : "none"
                          }}
                        >
                          Teachers
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "student" })}
                          onClick={() => handleTabChange("student")}
                          style={{
                            cursor: "pointer",
                            borderBottom: activeTab === "student" ? "3px solid #5e72e4" : "none"
                          }}
                        >
                          Students
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <div className="btn-group flex-shrink-0" role="group" style={{ marginLeft: '1rem' }}>
                      <Button
                        color={viewMode === "table" ? "primary" : "secondary"}
                        outline={viewMode !== "table"}
                        size="sm"
                        onClick={() => setViewMode("table")}
                        className="mr-1"
                      >
                        <i className="ni ni-bullet-list-67 mr-1"></i>
                        <span className="d-none d-sm-inline">Table</span>
                        <span className="d-sm-none">Table</span>
                      </Button>
                      <Button
                        color={viewMode === "block" ? "primary" : "secondary"}
                        outline={viewMode !== "block"}
                        size="sm"
                        onClick={() => setViewMode("block")}
                        style={{ marginRight: '5px' }}
                      >
                        <i className="ni ni-app mr-1"></i>
                        <span className="d-none d-sm-inline">Block</span>
                        <span className="d-sm-none">Block</span>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              {/* Search and Show Entries Row with padding */}
              <Row style={{ marginLeft: 0, marginRight: 0 }}>
                <Col md="12" className="pl-3 pr-3">
                  {/* Search bar in a single row with space to the right */}
                  <div className="d-flex align-items-center mb-2" style={{ width: '100%' }}>
                    <InputGroup className={isSearchFocused ? 'focused' : ''} style={{ width: '100%', marginBottom: '6px' }}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-search" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className="custom-focus-effect"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ minWidth: 0 }}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                      />
                    </InputGroup>
                  </div>
                  {/* Role name below action buttons, matching SectionManagement course name */}
                  <div className="w-100 d-flex justify-content-between align-items-center" style={{ marginTop: '26px', marginBottom: '16px' }}>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#32325d' }}>
                      {activeTab === 'admin' ? 'Administrators' : activeTab === 'teacher' ? 'Teachers' : 'Students'} ({getCurrentUsers().length})
                    </div>
                    <div>
                      <Button color="info" outline className="mr-2" size="sm" style={{ padding: '3px 10px', fontSize: '0.75rem' }}>
                        <i className="ni ni-archive-2 mr-2" /> Export
                      </Button>
                      <Button color="primary" size="sm" style={{ padding: '3px 6px', fontSize: '0.75rem' }} onClick={() => navigate(`/admin/create-user?tab=${activeTab}&view=${viewMode}`)}>
                        <i className="ni ni-fat-add" /> Add New User
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              {/* Tabbed User Tables */}
              <TabContent activeTab={activeTab}>
                <TabPane tabId="admin">
                  {viewMode === "table" ? renderUserTable(adminUsers, "Administrators", "danger") : renderUserBlocks(adminUsers, "Administrators", "danger")}
                </TabPane>
                <TabPane tabId="teacher">
                  {viewMode === "table" ? renderUserTable(teacherUsers, "Teachers", "warning") : renderUserBlocks(teacherUsers, "Teachers", "warning")}
                </TabPane>
                <TabPane tabId="student">
                  {viewMode === "table" ? renderUserTable(studentUsers, "Students", "info") : renderUserBlocks(studentUsers, "Students", "info")}
                </TabPane>
              </TabContent>
            </Card>
          </div>
        </Row>
      </Container>
      <Modal isOpen={!!deleteUserId} toggle={cancelDeleteUser} centered backdrop>
        <ModalBody className="text-center">
          {!isDeleting && !showDeleteSuccess ? (
            <>
              <div className="mb-3">
                <div className="bg-danger rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
                  <i className="fa fa-trash text-white" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
              <h5>Are you sure you want to delete <span className="text-danger">{deleteUserName}</span>?</h5>
              <div className="mt-4 d-flex justify-content-center">
                <Button color="secondary" onClick={cancelDeleteUser} className="mr-2">Cancel</Button>
                <Button color="danger" onClick={confirmDeleteUser}>Delete</Button>
              </div>
            </>
          ) : isDeleting ? (
            <>
              <div className="mb-3">
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              <h5>Deleting User...</h5>
              <p className="text-muted mb-0">Please wait while we process your request.</p>
            </>
          ) : (
            <>
              <div className="mb-3">
                <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
                  <i className="ni ni-check-bold text-white" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
              <h5>User <span className="text-success">{deleteUserName}</span> has been deleted successfully!</h5>
            </>
          )}
        </ModalBody>
      </Modal>
      <Modal isOpen={showUserModal} toggle={closeUserModal} centered size="md" className="user-details-modal">
        <ModalHeader className="pb-0">
          <button className="modal-close-btn" onClick={closeUserModal}>
            <i className="ni ni-fat-remove" />
          </button>
        </ModalHeader>
        <ModalBody className="p-0">
          {selectedUser && (
            <div>
              <div className="cover-photo-container mb-4">
                <div className={`cover-photo-img-wrapper has-image`}>
                  <img
                    alt="Cover Preview"
                    src={selectedUser.coverPhotoUrl || defaultCoverPhotoSvg}
                    className="cover-photo-img"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setPreviewImage({ src: selectedUser.coverPhotoUrl || defaultCoverPhotoSvg, type: 'cover' })}
                  />
                  <div className="cover-photo-fade" />
                </div>
                <div className="avatar-container has-image">
                  <img
                    alt="Profile Preview"
                    className="avatar-img"
                    src={selectedUser.profileImageUrl || require('./../../assets/img/theme/user-default.svg')}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setPreviewImage({ src: selectedUser.profileImageUrl || require('./../../assets/img/theme/user-default.svg'), type: 'avatar' })}
                  />
                </div>
              </div>
              <div className="mx-auto px-4 pb-4" style={{ maxWidth: 480, marginTop: 0 }}>
                <div className="text-center mb-2" style={{ marginTop: 60, paddingTop: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 24, color: '#222', marginBottom: 2 }}>{selectedUser.name}</div>
                  <div className="d-flex justify-content-center align-items-center mb-1">
                    {getRoleBadgeForBlock(selectedUser.role)}
                  </div>
                  <div style={{ fontSize: 15, color: '#4fd165', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#4fd165', marginRight: 6 }}></span>
                    Online
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 mb-3" style={{ border: '1px solid #f0f1f6', boxShadow: '0 2px 16px 0 rgba(44,62,80,.08)' }}>
                  <div className="mb-3 font-weight-bold" style={{ color: '#222', fontSize: '1.1rem', letterSpacing: '0.01em' }}><i className="ni ni-single-02 mr-2" />Account Info</div>
                  <div className="row account-info-row">
                    <div className="col-12 col-md-6 mb-3">
                      <span className="text-muted small"><i className="ni ni-email-83 mr-1" />Email</span>
                      <div className="font-weight-bold account-info-value" id={`email-${selectedUser.id}`}>
                        {selectedUser.email}
                      </div>
                      <UncontrolledTooltip placement="top" target={`email-${selectedUser.id}`}>
                        {selectedUser.email}
                      </UncontrolledTooltip>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <span className="text-muted small"><i className="ni ni-badge mr-1" />{selectedUser.role === 'student' ? 'Course' : 'Department'}</span>
                      <div className="font-weight-bold account-info-value" id={`course-${selectedUser.id}`}>
                        {selectedUser.role === 'student' ? getCourseAbbreviation(selectedUser.department) : (selectedUser.department || 'N/A')}
                      </div>
                      <UncontrolledTooltip placement="top" target={`course-${selectedUser.id}`}>
                        {selectedUser.department || 'N/A'}
                      </UncontrolledTooltip>
                    </div>
                    {selectedUser.studentNumber && (
                      <div className="col-12 col-md-6 mb-3">
                        <span className="text-muted small"><i className="ni ni-hat-3 mr-1" />Student Number</span>
                        <div className="font-weight-bold account-info-value" id={`student-number-${selectedUser.id}`}>
                          {selectedUser.studentNumber}
                        </div>
                        <UncontrolledTooltip placement="top" target={`student-number-${selectedUser.id}`}>
                          {selectedUser.studentNumber}
                        </UncontrolledTooltip>
                      </div>
                    )}
                    {selectedUser.section && (
                      <div className="col-12 col-md-6 mb-3">
                        <span className="text-muted small"><i className="ni ni-bullet-list-67 mr-1" />Section</span>
                        <div className="font-weight-bold account-info-value" id={`section-${selectedUser.id}`}>
                          {selectedUser.section}
                        </div>
                        <UncontrolledTooltip placement="top" target={`section-${selectedUser.id}`}>
                          {selectedUser.section}
                        </UncontrolledTooltip>
                      </div>
                    )}
                    {selectedUser.year && (
                      <div className="col-12 col-md-6 mb-3">
                        <span className="text-muted small"><i className="ni ni-calendar-grid-58 mr-1" />Year</span>
                        <div className="font-weight-bold account-info-value" id={`year-${selectedUser.id}`}>
                          {selectedUser.year}
                        </div>
                        <UncontrolledTooltip placement="top" target={`year-${selectedUser.id}`}>
                          {selectedUser.year}
                        </UncontrolledTooltip>
                      </div>
                    )}
                    <div className="col-12 col-md-6 mb-3">
                      <span className="text-muted small"><i className="ni ni-check-bold mr-1" />Status</span>
                      <div>{getStatusBadge(selectedUser.status)}</div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <span className="text-muted small"><i className="ni ni-calendar-grid-58 mr-1" />Last Login</span>
                      <div className="font-weight-bold account-info-value" id={`last-login-${selectedUser.id}`}>
                        {selectedUser.lastLogin}
                      </div>
                      <UncontrolledTooltip placement="top" target={`last-login-${selectedUser.id}`}>
                        {selectedUser.lastLogin}
                      </UncontrolledTooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default UserManagement;