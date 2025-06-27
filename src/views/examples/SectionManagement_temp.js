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
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Table,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import classnames from "classnames";
import Header from "components/Headers/Header.js";
import userDefault from "../../assets/img/theme/user-default.svg";

// Helper function to generate consistent avatars
const getAvatarForStudent = (student) => {
  if (student && student.id) {
    const avatarUrls = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    ];
    const index = student.id % avatarUrls.length;
    return avatarUrls[index];
  }
  return userDefault;
};

// Standalone component for the "Add Students" modal
const AddStudentsModal = ({ 
  isOpen, 
  toggle, 
  allStudents, 
  existingSelection,
  onConfirm,
  sectionToEdit,
  isEditMode
}) => {
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [tempSelected, setTempSelected] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [clearAllHover, setClearAllHover] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);
  const [addHover, setAddHover] = useState(false);
  const [hoveredPillId, setHoveredPillId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStudentSearchTerm("");
      setTempSelected(existingSelection.map(s => s.id));
      setHoveredPillId(null);
    }
  }, [isOpen, existingSelection]);

  const availableStudents = allStudents.filter(s => {
    if (isEditMode) {
      return s.sectionId === null || s.sectionId === sectionToEdit.id;
    }
    return s.sectionId === null;
  });
  
  const filteredStudents = availableStudents.filter(s => 
    s.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) || 
    s.studentId.toLowerCase().includes(studentSearchTerm.toLowerCase())
  );

  const toggleStudent = (studentId) => {
    setTempSelected(current => 
      current.includes(studentId) 
        ? current.filter(id => id !== studentId)
        : [...current, studentId]
    );
  };

  const handleConfirmAdd = () => {
    const finalStudents = tempSelected.map(id => allStudents.find(s => s.id === id)).filter(Boolean);
    onConfirm(finalStudents);
    toggle();
  };

  // Get students in selection order
  const getSelectedStudentsInOrder = () => {
    return tempSelected.map(id => allStudents.find(s => s.id === id)).filter(Boolean);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="sm">
      <ModalHeader toggle={toggle} className="border-0 pb-0">
        <h4 className="mb-0">Add Students to Section</h4>
      </ModalHeader>
      <ModalBody className="pt-0">
        <div className="mt-3 mb-3">
          <InputGroup
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
            style={{
              transition: 'box-shadow 0.15s ease',
              borderRadius: '0.375rem',
              boxShadow: isSearchFocused ? '0 0 0 3px rgba(94, 114, 228, 0.35)' : (isSearchHovered ? '0 0 0 3px rgba(94, 114, 228, 0.1)' : 'none'),
            }}
          >
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-zoom-split-in" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Search students..."
              value={studentSearchTerm} 
              onChange={e => setStudentSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </InputGroup>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="text-uppercase text-muted font-weight-bold mb-0" style={{fontSize: '0.7rem'}}>
              Selected Students ({tempSelected.length})
            </h6>
            {tempSelected.length > 0 && (
              <Button 
                color="link" 
                size="sm" 
                className="text-danger p-0"
                style={{
                  fontSize: '0.7rem',
                  textDecoration: clearAllHover ? 'underline' : 'none'
                }}
                onClick={() => setTempSelected([])}
                onMouseEnter={() => setClearAllHover(true)}
                onMouseLeave={() => setClearAllHover(false)}
              >
                Clear All
              </Button>
            )}
          </div>
          <div 
            className="p-2" 
            style={{
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              minHeight: tempSelected.length > 0 ? 'auto' : '45px',
              display: 'flex',
              alignItems: 'flex-start',
              flexWrap: 'nowrap',
              gap: '6px',
              overflowX: 'auto',
              overflowY: 'hidden'
            }}
          >
            {getSelectedStudentsInOrder().length > 0 ? (
              getSelectedStudentsInOrder().map(student => (
                <div 
                  key={student.id} 
                  className="d-inline-flex align-items-center flex-shrink-0"
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: '4px 8px',
                    border: '1px solid #dee2e6',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    minWidth: '140px',
                    maxWidth: '160px'
                  }}
                >
                  <img 
                    alt={student.name} 
                    src={getAvatarForStudent(student)} 
                    className="rounded-circle mr-1" 
                    style={{width: '16px', height: '16px', objectFit: 'cover'}} 
                  />
                  <div className="d-flex flex-column flex-grow-1" style={{minWidth: 0}}>
                    <span style={{fontSize: '0.7rem', fontWeight: 600, color: '#495057', lineHeight: '1.2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {student.name}
                    </span>
                    <span style={{fontSize: '0.6rem', color: '#6c757d', lineHeight: '1.1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {student.email}
                    </span>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-link p-0 ml-1 flex-shrink-0" 
                    style={{
                      color: '#dc3545', 
                      fontSize: '0.7rem',
                      transform: hoveredPillId === student.id ? 'scale(1.2)' : 'scale(1)',
                      transition: 'transform 0.15s ease'
                    }}
                    onClick={() => toggleStudent(student.id)}
                    onMouseEnter={() => setHoveredPillId(student.id)}
                    onMouseLeave={() => setHoveredPillId(null)}
                  >
                    <i className="ni ni-fat-remove" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-muted w-100">
                <i className="ni ni-single-02 mb-1" style={{fontSize: '1rem', opacity: 0.5}} />
                <div style={{fontSize: '0.7rem'}}>No students selected</div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h6 className="text-uppercase text-muted font-weight-bold mb-2" style={{fontSize: '0.7rem'}}>
            Available Students ({filteredStudents.length})
          </h6>
          <div style={{maxHeight: '200px', overflowY: 'auto', border: '1px solid #e9ecef', borderRadius: '8px'}}>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => {
                const isAssignedToOtherSection = student.sectionId && (!isEditMode || student.sectionId !== sectionToEdit.id);
                const isSelected = tempSelected.includes(student.id);
                return (
                  <div 
                    key={student.id} 
                    className={`d-flex justify-content-between align-items-center p-2 border-bottom`}
                    style={{
                      cursor: isAssignedToOtherSection ? 'not-allowed' : 'pointer',
                      opacity: isAssignedToOtherSection ? 0.6 : 1,
                      transition: 'all 0.2s ease',
                      backgroundColor: isSelected ? 'rgba(94, 114, 228, 0.12)' : '#fff',
                      borderLeft: isSelected ? '3px solid #5e72e4' : '3px solid transparent'
                    }}
                    onClick={() => !isAssignedToOtherSection && toggleStudent(student.id)}
                  >
                    <div className="d-flex align-items-center">
                      <img 
                        alt={student.name} 
                        src={getAvatarForStudent(student)} 
                        className="rounded-circle mr-2" 
                        style={{width: '28px', height: '28px', objectFit: 'cover'}} 
                      />
                      <div>
                        <div style={{
                          fontSize: '0.85rem', 
                          fontWeight: isSelected ? 700 : 600,
                          color: isSelected ? '#32325d' : '#495057'
                        }}>
                          {student.name}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: isSelected ? '#6c757d' : '#6c757d'
                        }}>
                          {student.email}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      {isAssignedToOtherSection ? (
                        <Badge color="secondary" size="sm">Assigned</Badge>
                      ) : (
                        <div className={`border d-flex align-items-center justify-content-center ${isSelected ? 'bg-primary border-primary' : 'bg-white border-secondary'}`} 
                             style={{width: '16px', height: '16px', borderRadius: '3px'}}>
                          {isSelected && <i className="ni ni-check-bold text-white" style={{fontSize: '0.5rem'}} />}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-muted p-3">
                <i className="ni ni-zoom-split-in mb-1" style={{fontSize: '1.2rem', opacity: 0.5}} />
                <div style={{fontSize: '0.7rem'}}>No students found</div>
              </div>
            )}
          </div>
        </div>
      </ModalBody>
      <div className="modal-footer border-0 pt-0">
        <Button 
          color="secondary" 
          outline 
          onClick={toggle}
          onMouseEnter={() => setCancelHover(true)}
          onMouseLeave={() => setCancelHover(false)}
          style={{
            transform: cancelHover ? 'translateY(-1px)' : 'none',
            boxShadow: cancelHover ? '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)' : 'none',
            transition: 'all .15s ease'
          }}
        >
          Cancel
        </Button>
        <Button 
          color="primary" 
          onClick={handleConfirmAdd} 
          disabled={tempSelected.length === 0}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
          style={{
            transform: addHover ? 'translateY(-1px)' : 'none',
            boxShadow: addHover ? '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)' : 'none',
            transition: 'all .15s ease'
          }}
        >
          Add {tempSelected.length} Student{tempSelected.length !== 1 ? 's' : ''}
        </Button>
      </div>
    </Modal>
  );
};

// Add robust hover effect style
const sectionRowHoverStyle = `
  table tr.section-table-row.section-row-hover:hover, .section-row-hover.section-block-card:hover {
    background: #f6f9fc !important;
    transition: background 0.15s;
  }
`;

const SectionManagement = () => {
  const [activeTab, setActiveTab] = useState("bsit");
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [isMainSearchFocused, setIsMainSearchFocused] = useState(false);
  const [isMainSearchHovered, setIsMainSearchHovered] = useState(false);

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddStudentsModal, setShowAddStudentsModal] = useState(false);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [studentsModalSection, setStudentsModalSection] = useState(null);
  
  const [sectionToEdit, setSectionToEdit] = useState(null);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [selectedStudentsForSection, setSelectedStudentsForSection] = useState([]);

  const [sectionName, setSectionName] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [adviser, setAdviser] = useState("");
  const [maxStudents, setMaxStudents] = useState(40);

  const [expandedSectionId, setExpandedSectionId] = useState(null);

  const courses = [
    { id: "bsit", abbr: "BSIT", name: "Bachelor of Science in Information Technology" },
    { id: "bscs", abbr: "BSCS", name: "Bachelor of Science in Computer Science" },
    { id: "bsis", abbr: "BSIS", name: "Bachelor of Science in Information Systems" },
    { id: "act", abbr: "ACT", name: "Associate in Computer Technology" },
  ];

  const [teachers, setTeachers] = useState([
    { id: 101, name: "Mr. Cruz" },
    { id: 102, name: "Ms. Reyes" },
    { id: 103, name: "Mr. Garcia" },
    { id: 104, name: "Mrs. David" },
  ]);

  const [sections, setSections] = useState([
    { id: 1, course: "bsit", year: "3rd Year", section: "A", name: "BSIT 3A", adviserId: 101, maxStudents: 40 },
    { id: 2, course: "bsit", year: "3rd Year", section: "B", name: "BSIT 3B", adviserId: 102, maxStudents: 40 },
    { id: 3, course: "bsit", year: "4th Year", section: "A", name: "BSIT 4A", adviserId: 103, maxStudents: 40 },
    { id: 4, course: "bscs", year: "1st Year", section: "A", name: "BSCS 1A", adviserId: 104, maxStudents: 35 },
  ]);

  const [students, setStudents] = useState([
    { id: 1, sectionId: 1, studentId: "2021-0001", name: "John Doe", email: "john.doe@email.com", status: "active" },
    { id: 2, sectionId: 1, studentId: "2021-0002", name: "Jane Smith", email: "jane.smith@email.com", status: "active" },
    { id: 3, sectionId: null, studentId: "2021-0003", name: "Mike Johnson", email: "mike.j@email.com", status: "active" },
    { id: 4, sectionId: 2, studentId: "2021-0004", name: "Sarah Wilson", email: "sarah.w@email.com", status: "active" },
    { id: 5, sectionId: null, studentId: "2021-0005", name: "David Brown", email: "david.b@email.com", status: "active" },
    { id: 6, sectionId: 3, studentId: "2020-0001", name: "Emily Davis", email: "emily.d@email.com", status: "active" },
    { id: 7, sectionId: null, studentId: "2021-0006", name: "Robert Miller", email: "robert.m@email.com", status: "active" },
    { id: 8, sectionId: null, studentId: "2021-0007", name: "Lisa Garcia", email: "lisa.g@email.com", status: "active" },
    { id: 9, sectionId: 4, studentId: "2022-0001", name: "Chris Lee", email: "chris.l@email.com", status: "active" },
    { id: 10, sectionId: null, studentId: "2022-0002", name: "Karen White", email: "karen.w@email.com", status: "active" },
  ]);

  const resetForm = () => {
    setSectionName("");
    setYearLevel("");
    setAdviser("");
    setMaxStudents(40);
    setSelectedStudentsForSection([]);
    setSectionToEdit(null);
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    resetForm();
    setShowAddEditModal(true);
  };

  const handleOpenEditModal = (section) => {
    setIsEditMode(true);
    setSectionToEdit(section);
    setSectionName(section.name);
    setYearLevel(section.year);
    setAdviser(section.adviserId);
    setMaxStudents(section.maxStudents);
    setSelectedStudentsForSection(students.filter(s => s.sectionId === section.id));
    setShowAddEditModal(true);
  };

  const handleSaveSection = () => {
    if (isEditMode) {
      const updatedSections = sections.map(sec => 
        sec.id === sectionToEdit.id 
          ? { ...sec, name: sectionName, year: yearLevel, adviserId: adviser, maxStudents: maxStudents }
          : sec
      );
      setSections(updatedSections);
      
      const studentIdsForSection = selectedStudentsForSection.map(s => s.id);
      const updatedStudents = students.map(stud => {
        if (stud.sectionId === sectionToEdit.id && !studentIdsForSection.includes(stud.id)) {
          return { ...stud, sectionId: null };
        }
        if (studentIdsForSection.includes(stud.id)) {
          return { ...stud, sectionId: sectionToEdit.id };
        }
        return stud;
      });
      setStudents(updatedStudents);

    } else {
      const newSectionId = Math.max(...sections.map(s => s.id), 0) + 1;
      const newSection = {
        id: newSectionId,
        course: activeTab,
        year: yearLevel,
        name: sectionName,
        adviserId: adviser,
        maxStudents: maxStudents,
      };
      setSections([...sections, newSection]);
      setActiveTab(newSection.course);
      setSelectedYear('all');
      setSearchTerm("");

      const studentIdsForSection = selectedStudentsForSection.map(s => s.id);
      const updatedStudents = students.map(stud => 
        studentIdsForSection.includes(stud.id) ? { ...stud, sectionId: newSectionId } : stud
      );
      setStudents(updatedStudents);
    }
    setShowAddEditModal(false);
    resetForm();
  };

  const handleDeleteSection = (section) => {
    setSectionToDelete(section);
    setShowDeleteModal(true);
  };

  const confirmDeleteSection = () => {
    setSections(sections.filter(s => s.id !== sectionToDelete.id));
    setStudents(students.map(s => s.sectionId === sectionToDelete.id ? { ...s, sectionId: null } : s));
    setShowDeleteModal(false);
    setSectionToDelete(null);
  };
  
  const handleOpenAddStudentsModal = () => {
    setShowAddStudentsModal(true);
  };

  const handleAddStudentsConfirm = (newSelection) => {
    setSelectedStudentsForSection(newSelection);
  };
  
  const removeStudentFromSelection = (studentId) => {
    setSelectedStudentsForSection(selectedStudentsForSection.filter(s => s.id !== studentId));
  };
  
  const getFilteredSections = () => {
    return sections.filter(section => {
      const matchesCourse = section.course === activeTab;
      const matchesYear = selectedYear === "all" || section.year === selectedYear;
      const matchesSearch = section.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCourse && matchesYear && matchesSearch;
    });
  };
  
  const getStudentsForSection = (sectionId) => students.filter(student => student.sectionId === sectionId);

  const renderSectionsTable = (sectionsToRender) => (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th scope="col">Section Name</th>
          <th scope="col">Year</th>
          <th scope="col">Adviser</th>
          <th scope="col">Students</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sectionsToRender.map((section) => {
          const currentStudents = getStudentsForSection(section.id);
          const adviserName = teachers.find(t => t.id === section.adviserId)?.name || 'N/A';
          const ratio = currentStudents.length / section.maxStudents;
          let statusBadge;
          if (ratio >= 1) statusBadge = <Badge color="danger">Full</Badge>;
          else if (ratio >= 0.8) statusBadge = <Badge color="warning">Almost Full</Badge>;
          else statusBadge = <Badge color="success">Available</Badge>;
          return (
            <tr
              key={section.id}
              className="section-table-row section-row-hover"
              style={{ cursor: 'pointer' }}
              onClick={() => { console.log('Row clicked', section); setStudentsModalSection(section); setShowStudentsModal(true); }}
            >
              <td>{section.name}</td>
              <td>{section.year}</td>
              <td>{adviserName}</td>
              <td>{currentStudents.length} / {section.maxStudents}</td>
              <td>{statusBadge}</td>
              <td>
                <Button color="primary" size="sm" onClick={e => { e.stopPropagation(); handleOpenEditModal(section); }}>Edit</Button>
                <Button color="danger" size="sm" onClick={e => { e.stopPropagation(); handleDeleteSection(section); }}>Delete</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  const renderSectionsBlock = (sectionsToRender) => (
    <Row>
      {sectionsToRender.map((section) => {
         const currentStudents = getStudentsForSection(section.id).length;
         const adviserName = teachers.find(t => t.id === section.adviserId)?.name || 'N/A';
         return (
          <Col key={section.id} lg="4" md="6" sm="12" className="mb-4">
            <Card className="shadow-sm h-100 section-row-hover section-block-card" style={{ cursor: 'pointer' }}
              onClick={() => { console.log('Row clicked', section); setStudentsModalSection(section); setShowStudentsModal(true); }}>
              <CardBody className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title mb-0">{section.name}</h5>
                </div>
                <p className="card-text text-muted small mt-1">{section.year} | Adviser: {adviserName}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span>Students: {currentStudents} / {section.maxStudents}</span>
                </div>
                <div className="mt-auto pt-3">
                  <Button color="primary" size="sm" onClick={e => { e.stopPropagation(); handleOpenEditModal(section); }}>Edit</Button>
                  <Button color="danger" size="sm" onClick={e => { e.stopPropagation(); handleDeleteSection(section); }}>Delete</Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        );
      })}
    </Row>
  );

  // Modal for showing students in a section
  const renderStudentsModal = () => {
    if (!showStudentsModal || !studentsModalSection) return null;
    const studentsInSection = getStudentsForSection(studentsModalSection.id);
    return (
      <Modal isOpen={showStudentsModal} toggle={() => setShowStudentsModal(false)} centered>
        <ModalHeader toggle={() => setShowStudentsModal(false)}>
          Students in {studentsModalSection.name}
        </ModalHeader>
        <ModalBody>
          {studentsInSection.length === 0 ? (
            <div className="text-muted">No students assigned to this section.</div>
          ) : (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {studentsInSection.map(student => (
                <li key={student.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <img src={getAvatarForStudent(student)} alt={student.name} style={{ width: 28, height: 28, borderRadius: '50%', marginRight: 10, objectFit: 'cover' }} />
                  <span style={{ fontWeight: 500 }}>{student.name}</span>
                  <span style={{ color: '#888', fontSize: 12, marginLeft: 8 }}>{student.email}</span>
                </li>
              ))}
            </ul>
          )}
        </ModalBody>
      </Modal>
    );
  };

  // On mount, check localStorage for a new section and add it if present
  useEffect(() => {
    const stored = localStorage.getItem('newSection');
    if (stored) {
      const newSection = JSON.parse(stored);
      // Generate a new id
      const newSectionId = Math.max(0, ...sections.map(s => s.id)) + 1;
      setSections(prev => [
        ...prev,
        {
          id: newSectionId,
          name: newSection.name,
          course: newSection.course,
          year: newSection.year,
          adviserId: newSection.adviser,
          maxStudents: newSection.maxStudents || 40,
          academicYear: newSection.academicYear,
          semester: newSection.semester,
        }
      ]);
      // Optionally, you could also add students to the section here if needed
      localStorage.removeItem('newSection');
      setActiveTab(newSection.course);
      setSelectedYear('all');
      setSearchTerm("");
    }
  }, []);

  return (
    <>
      <Header compact />
      <style>{sectionRowHoverStyle}</style>
      <Container className="mt-4" fluid>
        <Card className="shadow">
          <div className="p-4 border-bottom">
            <Row className="align-items-center">
              <Col xs="12" lg="auto" className="mb-3 mb-lg-0">
                <Nav tabs className="border-0">
                  {courses.map(course => (
                    <NavItem key={course.id}>
                      <NavLink
                        className={classnames({ active: activeTab === course.id })}
                        onClick={() => setActiveTab(course.id)}
                        style={{ cursor: "pointer", borderBottom: activeTab === course.id ? "3px solid #5e72e4" : "none" }}
                      >
                        {course.abbr}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </Col>
              <Col />
              <Col xs="12" lg="auto">
                <div className="d-flex justify-content-start justify-content-lg-end align-items-center flex-wrap">
                  <div className="btn-group mr-2 mb-2 mb-lg-0" role="group">
                    <Button color={viewMode === 'table' ? 'primary' : 'secondary'} outline={viewMode !== 'table'} size="sm" onClick={() => setViewMode('table')} className="mr-1"><i className="ni ni-chart-bar-32 mr-1" />Table View</Button>
                    <Button color={viewMode === 'block' ? 'primary' : 'secondary'} outline={viewMode !== 'block'} size="sm" onClick={() => setViewMode('block')}><i className="ni ni-app mr-1" />Block View</Button>
                  </div>
                  <Button color="info" outline size="sm" className="mr-2 mb-2 mb-lg-0"><i className="ni ni-archive-2 mr-2" />Export</Button>
                  <Button color="primary" size="sm" onClick={handleOpenAddModal} className="mb-2 mb-lg-0"><i className="ni ni-fat-add mr-2" />Add New Section</Button>
                </div>
              </Col>
            </Row>
          </div>
          <div className="p-4">
            <Row className="mb-4">
              <Col md="4">
                <InputGroup
                  onMouseEnter={() => setIsMainSearchHovered(true)}
                  onMouseLeave={() => setIsMainSearchHovered(false)}
                  style={{
                    transition: 'box-shadow 0.15s ease',
                    borderRadius: '0.375rem',
                    boxShadow: isMainSearchFocused ? '0 0 0 3px rgba(94, 114, 228, 0.35)' : (isMainSearchHovered ? '0 0 0 3px rgba(94, 114, 228, 0.1)' : 'none'),
                  }}
                >
                  <InputGroupAddon addonType="prepend"><InputGroupText><i className="ni ni-zoom-split-in" /></InputGroupText></InputGroupAddon>
                  <Input 
                    placeholder="Search sections..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsMainSearchFocused(true)}
                    onBlur={() => setIsMainSearchFocused(false)}
                  />
                </InputGroup>
              </Col>
              <Col md="3">
                <Input type="select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                  <option value="all">All Years</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </Input>
              </Col>
            </Row>
            <TabContent activeTab={activeTab}>
              {courses.map(course => {
                const filteredSections = getFilteredSections().filter(s => s.course === course.id);
                return (
                  <TabPane key={course.id} tabId={course.id}>
                    <h3 className="text-dark mb-3">{course.name} Sections ({filteredSections.length})</h3>
                    {viewMode === "table" ? renderSectionsTable(filteredSections) : renderSectionsBlock(filteredSections)}
                  </TabPane>
                );
              })}
            </TabContent>
          </div>
        </Card>
      </Container>
      
      {renderStudentsModal()}
      <Modal isOpen={showAddEditModal} toggle={() => setShowAddEditModal(false)} centered>
        <ModalHeader toggle={() => setShowAddEditModal(false)}>{isEditMode ? "Edit Section" : "Add New Section"}</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Section Name</label>
            <Input type="text" placeholder="e.g., BSIT 3A" value={sectionName} onChange={e => setSectionName(e.target.value)} />
          </div>
          <Row>
            <Col md="6">
              <div className="form-group">
                <label>Year Level</label>
                <Input type="select" value={yearLevel} onChange={e => setYearLevel(e.target.value)}>
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </Input>
              </div>
            </Col>
            <Col md="6">
               <div className="form-group">
                <label>Maximum Students</label>
                <Input type="number" value={maxStudents} onChange={e => setMaxStudents(parseInt(e.target.value))} />
              </div>
            </Col>
          </Row>
          <div className="form-group">
            <label>Adviser</label>
            <Input type="select" value={adviser} onChange={e => setAdviser(e.target.value)}>
              <option value="">Select Adviser</option>
              {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </Input>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-3">
            <strong>Students ({selectedStudentsForSection.length})</strong>
            <Button color="primary" size="sm" onClick={handleOpenAddStudentsModal}>Add Students</Button>
          </div>
          <div className="d-flex flex-wrap" style={{gap: '8px'}}>
            {selectedStudentsForSection.length > 0 ? selectedStudentsForSection.map(student => (
              <Badge key={student.id} color="info" pill className="py-2 px-3 d-flex align-items-center">
                {student.name}
                <button type="button" className="close ml-2" style={{fontSize: '1rem', color: 'white'}} onClick={() => removeStudentFromSelection(student.id)}>
                  <span>&times;</span>
                </button>
              </Badge>
            )) : <span className="text-muted">No students added yet.</span>}
          </div>
        </ModalBody>
        <div className="modal-footer">
          <Button color="secondary" onClick={() => setShowAddEditModal(false)}>Cancel</Button>
          <Button color="primary" onClick={handleSaveSection}>{isEditMode ? "Save Changes" : "Create Section"}</Button>
        </div>
      </Modal>

      <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)} centered>
        <ModalHeader toggle={() => setShowDeleteModal(false)}>Confirm Delete</ModalHeader>
        <ModalBody>
          {sectionToDelete && (
            <div className="text-center">
              <h5>Are you sure you want to delete section "{sectionToDelete.name}"?</h5>
              <p className="text-muted">All students in this section will be unassigned.</p>
              <div className="mt-4">
                <Button color="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                <Button color="danger" className="ml-2" onClick={confirmDeleteSection}>Delete Section</Button>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>

      {showAddStudentsModal && 
        <AddStudentsModal 
          isOpen={showAddStudentsModal}
          toggle={() => setShowAddStudentsModal(false)}
          allStudents={students}
          existingSelection={selectedStudentsForSection}
          onConfirm={handleAddStudentsConfirm}
          sectionToEdit={sectionToEdit}
          isEditMode={isEditMode}
        />
      }
    </>
  );
};

export default SectionManagement; 