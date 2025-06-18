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
import Header from "components/Headers/Header.js";
import { useNavigate } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Table,
  Button,
  Badge,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import classnames from "classnames";
import userDefault from "../../assets/img/theme/user-default.svg";

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

  // Sample user data
  const users = [
    // Admin users
    { id: 1, name: "John Admin", email: "john.admin@school.com", role: "admin", status: "active", department: "Administration", lastLogin: "2024-01-15" },
    { id: 2, name: "Sarah Manager", email: "sarah.manager@school.com", role: "admin", status: "active", department: "Administration", lastLogin: "2024-01-14" },
    { id: 3, name: "Mike Director", email: "mike.director@school.com", role: "admin", status: "inactive", department: "Administration", lastLogin: "2024-01-10" },
    
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
    const colors = {
      admin: "danger",
      teacher: "warning",
      student: "info"
    };
    return (
      <Badge color={colors[role]}>
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

  const confirmDeleteUser = () => {
    let users = JSON.parse(localStorage.getItem('scms_users') || '[]');
    users = users.filter(u => String(u.id) !== String(deleteUserId));
    localStorage.setItem('scms_users', JSON.stringify(users));
    setLocalUsers(users);
    cancelDeleteUser();
  };

  const renderUserTable = (users, title, color) => {
    if (users.length === 0) return null;
    
    const { totalItems, totalPages, startItem, endItem } = getPaginationInfo();
    
    return (
      <div className="mb-4">
        <h3 className="text-dark mb-3 pl-4">{title} ({users.length})</h3>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Department</th>
              <th scope="col">Status</th>
              <th scope="col">Last Login</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedUsers(users).map((user) => (
              <tr key={user.id}>
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
                        background: user.profileImageUrl ? 'transparent' : '#fff',
                        border: user.profileImageUrl ? undefined : '1px solid #e9ecef'
                      }}
                    >
                      {user.profileImageUrl ? (
                        <img src={user.profileImageUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <img src={userDefault} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', background: '#fff' }} />
                      )}
                    </div>
                    <div>
                      <span className="font-weight-bold">{user.name}</span>
                      <br />
                      <small className="text-muted">ID: {user.id}</small>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>{getStatusBadge(user.status)}</td>
                <td>{user.lastLogin}</td>
                <td>
                  <Button
                    color="primary"
                    size="sm"
                    className="mr-2"
                    onClick={() => navigate(`/admin/edit-user/${user.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id, user.name)}
                    disabled={!user.profileImageUrl && !localUsers.find(u => String(u.id) === String(user.id))}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        {/* Pagination */}
        <div className="d-flex flex-row justify-content-between align-items-center w-100 mt-3 px-4">
          <div className="d-flex flex-row align-items-center">
            <span className="mr-2 text-muted small">Show</span>
            <Input
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
      <Header compact />
      {/* Page content */}
      <Container className="mt-4" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              {/* Tabs and Add User Button Row */}
              <Row className="mb-4 align-items-center">
                <Col xs="12">
                  <Nav tabs>
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
                </Col>
              </Row>

              {/* Search and Show Entries Row */}
              <Row className="mb-4">
                <Col md="4" className="pl-4">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-zoom-split-in" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col md="2">
                  <Input
                    type="select"
                    value={`${sortBy}-${sortOrder}`}
                    onChange={e => {
                      const [field, order] = e.target.value.split('-');
                      setSortBy(field);
                      setSortOrder(order);
                    }}
                    className="text-dark"
                    style={{ width: '200px', minWidth: '150px' }}
                  >
                    <option value="name-asc">Name A to Z</option>
                    <option value="name-desc">Name Z to A</option>
                    <option value="email-asc">Email A to Z</option>
                    <option value="email-desc">Email Z to A</option>
                    <option value="department-asc">Department A to Z</option>
                    <option value="department-desc">Department Z to A</option>
                    <option value="status-asc">Status A to Z</option>
                    <option value="status-desc">Status Z to A</option>
                    <option value="lastLogin-desc">Last Login (Newest First)</option>
                    <option value="lastLogin-asc">Last Login (Oldest First)</option>
                  </Input>
                </Col>
                <Col md="6" className="text-right pr-4">
                  <Button color="info" outline className="mr-2">
                    <i className="ni ni-chart-bar-32 mr-2"></i>
                    Export
                  </Button>
                  <Button color="primary" onClick={() => navigate("/admin/create-user")}>
                    <i className="ni ni-fat-add mr-2"></i>
                    Add New User
                  </Button>
                </Col>
              </Row>

              {/* Tabbed User Tables */}
              <TabContent activeTab={activeTab}>
                <TabPane tabId="admin">
                  {renderUserTable(adminUsers, "Administrators", "danger")}
                </TabPane>
                <TabPane tabId="teacher">
                  {renderUserTable(teacherUsers, "Teachers", "warning")}
                </TabPane>
                <TabPane tabId="student">
                  {renderUserTable(studentUsers, "Students", "info")}
                </TabPane>
              </TabContent>
            </Card>
          </div>
        </Row>
      </Container>
      <Modal isOpen={!!deleteUserId} toggle={cancelDeleteUser} centered backdrop>
        <ModalBody className="text-center">
          <h5>Are you sure you want to delete <span className="text-danger">{deleteUserName}</span>?</h5>
          <div className="mt-4 d-flex justify-content-center">
            <Button color="secondary" onClick={cancelDeleteUser} className="mr-2">Cancel</Button>
            <Button color="danger" onClick={confirmDeleteUser}>Delete</Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default UserManagement; 