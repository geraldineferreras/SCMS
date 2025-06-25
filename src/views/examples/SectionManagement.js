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
import React, { useState, useMemo, useEffect } from "react";
import {
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
  Nav,
  NavItem,
  NavLink,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import classnames from "classnames";
import Header from "components/Headers/Header.js";
import { useNavigate } from "react-router-dom";

// Mock Data - Replace with your actual data fetching logic
const getMockData = () => ({
  teachers: [
    { id: 101, name: "Mr. Cruz", email: "cruz@dhvsu.edu.ph", avatar: require("../../assets/img/theme/team-1-800x800.jpg") },
    { id: 102, name: "Ms. Reyes", email: "reyes@dhvsu.edu.ph", avatar: require("../../assets/img/theme/team-2-800x800.jpg") },
    { id: 103, name: "Mr. Garcia", email: "garcia@dhvsu.edu.ph", avatar: require("../../assets/img/theme/team-3-800x800.jpg") },
    { id: 104, name: "Mrs. David", email: "david@dhvsu.edu.ph", avatar: require("../../assets/img/theme/team-4-800x800.jpg") },
  ],
  sections: [
    { id: 1, course: "bsit", year: "3rd Year", name: "BSIT 3A", adviserId: 101, enrolled: 9, ay: '2024-2025', semester: '1st Semester' },
    { id: 2, course: "bsit", year: "3rd Year", name: "BSIT 3B", adviserId: 102, enrolled: 5, ay: '2024-2025', semester: '1st Semester' },
    { id: 3, course: "bsit", year: "4th Year", name: "BSIT 4A", adviserId: 103, enrolled: 3, ay: '2024-2025', semester: '2nd Semester' },
    { id: 4, course: "bscs", year: "1st Year", name: "BSCS 1A", adviserId: 104, enrolled: 12, ay: '2024-2025', semester: '1st Semester' },
    { id: 5, course: "bsis", year: "2nd Year", name: "BSIS 2A", adviserId: 101, enrolled: 25, ay: '2024-2025', semester: '1st Semester' },
    { id: 6, course: "act", year: "1st Year", name: "ACT 1A", adviserId: 102, enrolled: 30, ay: '2024-2025', semester: '1st Semester' },
  ],
  courses: [
    { id: "bsit", abbr: "BSIT", name: "Info Tech" },
    { id: "bscs", abbr: "BSCS", name: "Computer Science" },
    { id: "bsis", abbr: "BSIS", name: "Info Systems" },
    { id: "act", abbr: "ACT", name: "Computer Technology" },
  ]
});


const SectionManagement = () => {
  const [sections, setSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCourseTab, setActiveCourseTab] = useState("bsit");
  const [viewMode, setViewMode] = useState("table");
  const [activeYear, setActiveYear] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  
  const { sections: mockSections, teachers, courses } = useMemo(() => getMockData(), []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate();

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
    }
    return ' ↑';
  };

  const filteredAndSortedSections = useMemo(() => {
    let filtered = mockSections
      .filter(section => section.course === activeCourseTab)
      .filter(section => activeYear === 0 || section.year === ["All Years", "1st Year", "2nd Year", "3rd Year", "4th Year"][activeYear])
      .filter(section => section.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [mockSections, activeCourseTab, activeYear, searchTerm, sortConfig]);

  // Calculate pagination info
  const totalItems = filteredAndSortedSections.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSections = filteredAndSortedSections.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const currentCourseName = courses.find(c => c.id === activeCourseTab)?.name || "Sections";

  return (
    <>
      {!isMobile && <Header showStats={false} />}
      <Container className="mt-4" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              {/* Tabs and View Mode Row */}
              <Row className="mb-4 align-items-center">
                <Col xs="12">
                  <div className="d-flex justify-content-between align-items-center">
                    <Nav tabs>
                      {courses.map(course => (
                        <NavItem key={course.id}>
                          <NavLink
                            className={classnames({ active: activeCourseTab === course.id })}
                            onClick={() => setActiveCourseTab(course.id)}
                            style={{
                              cursor: "pointer",
                              borderBottom: activeCourseTab === course.id ? "3px solid #5e72e4" : "none"
                            }}
                          >
                            {course.abbr}
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>
                    <div className="btn-group" role="group" style={{ marginLeft: '1rem' }}>
                      <Button
                        color={viewMode === 'table' ? 'primary' : 'secondary'}
                        outline={viewMode !== 'table'}
                        size="sm"
                        onClick={() => setViewMode('table')}
                        className="mr-1"
                      >
                        <i className="ni ni-bullet-list-67 mr-1"></i>
                        Table
                      </Button>
                      <Button
                        color={viewMode === 'block' ? 'primary' : 'secondary'}
                        outline={viewMode !== 'block'}
                        size="sm"
                        onClick={() => setViewMode('block')}
                        style={{ marginRight: '5px' }}
                      >
                        <i className="ni ni-app mr-1"></i>
                        Block
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              {/* Search and Filter Row */}
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
                        placeholder="Search sections..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ minWidth: 0 }}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                      />
                    </InputGroup>
                  </div>
                  {/* Year filter buttons below search bar */}
                  <div className="d-flex justify-content-center">
                    <div className="btn-group mb-2" role="group" style={{ marginTop: '8px', marginBottom: '16px' }}>
                      {['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year'].map((year, idx) => (
                        <Button
                          key={year}
                          color={activeYear === idx ? 'primary' : 'secondary'}
                          outline={false}
                          style={{
                            minWidth: '56px',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            border: 'none',
                            boxShadow: 'none',
                            background: activeYear === idx ? undefined : '#f6f9fc',
                            color: activeYear === idx ? '#fff' : '#4385B1',
                            marginRight: '7px',
                            padding: '3px 7px',
                            borderRadius: '0.375rem',
                            textAlign: 'center',
                            whiteSpace: 'nowrap'
                          }}
                          onClick={() => setActiveYear(idx)}
                        >
                          {year}
                        </Button>
                      ))}
                    </div>
                  </div>
                  {/* Course name and action buttons row below year filter */}
                  <div className="w-100 d-flex justify-content-between align-items-center" style={{ marginTop: '20px', marginBottom: '16px' }}>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#32325d' }}>
                      {currentCourseName} ({filteredAndSortedSections.length})
                    </div>
                    <div>
                      <Button color="info" outline className="mr-2" size="sm" style={{ padding: '3px 10px', fontSize: '0.75rem' }}>
                        <i className="ni ni-archive-2 mr-2" /> Export
                      </Button>
                      <Button color="primary" size="sm" style={{ padding: '3px 6px', fontSize: '0.75rem' }} onClick={() => navigate('/admin/create-section')}>
                        <i className="ni ni-fat-add" /> Add New Section
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              {/* Table View */}
              <div style={{ marginTop: '0' }}>
                {viewMode === 'table' && (
                  <>
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col" onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                            SECTION NAME{getSortIndicator('name')}
                          </th>
                          <th scope="col" onClick={() => handleSort('year')} style={{ cursor: 'pointer' }}>
                            YEAR{getSortIndicator('year')}
                          </th>
                          <th scope="col" onClick={() => handleSort('adviserId')} style={{ cursor: 'pointer' }}>
                            ADVISER{getSortIndicator('adviserId')}
                          </th>
                          <th scope="col" onClick={() => handleSort('enrolled')} style={{ cursor: 'pointer' }}>
                            ENROLLED{getSortIndicator('enrolled')}
                          </th>
                          <th scope="col" onClick={() => handleSort('ay')} style={{ cursor: 'pointer' }}>
                            A.Y.{getSortIndicator('ay')}
                          </th>
                          <th scope="col" onClick={() => handleSort('semester')} style={{ cursor: 'pointer' }}>
                            SEMESTER{getSortIndicator('semester')}
                          </th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedSections.map(section => {
                          const adviser = teachers.find(t => t.id === section.adviserId);
                          return (
                            <tr key={section.id}>
                              <td>{section.name}</td>
                              <td>{section.year}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img src={adviser?.avatar} alt={adviser?.name} className="avatar avatar-sm rounded-circle mr-2" />
                                  <div>
                                    <div className="font-weight-bold">{adviser?.name}</div>
                                    <div className="text-muted small">{adviser?.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td>{section.enrolled}</td>
                              <td>{section.ay}</td>
                              <td>{section.semester}</td>
                              <td onClick={e => e.stopPropagation()}>
                                <Button
                                  color="primary"
                                  size="sm"
                                  className="mr-2"
                                  // onClick={() => handleEditSection(section.id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  color="danger"
                                  size="sm"
                                  // onClick={() => handleDeleteSection(section.id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    {/* Pagination UI */}
                    <div style={{height: '80px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <div className="d-flex flex-row align-items-center" style={{ marginLeft: '1.5rem' }}>
                        <span className="mr-2 text-muted small">Show</span>
                        <Input
                          className="custom-focus-effect"
                          type="select"
                          value={itemsPerPage}
                          onChange={handleItemsPerPageChange}
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
                      <Pagination size="sm" className="mb-0 justify-content-end" style={{margin: 0, marginRight: '1.5rem'}}>
                        <PaginationItem disabled={currentPage === 1}>
                          <PaginationLink
                            previous
                            onClick={() => handlePageChange(currentPage - 1)}
                            style={{ cursor: currentPage === 1 ? 'default' : 'pointer' }}
                          />
                        </PaginationItem>
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
                  </>
                )}
              </div>
              {/* Block View (if needed) can be added here */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SectionManagement; 