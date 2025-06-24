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
import React, { useState, useMemo } from "react";
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
} from "reactstrap";
import classnames from "classnames";
import Header from "components/Headers/Header.js";

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
  const [activeCourseTab, setActiveCourseTab] = useState("bsit");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'block'
  const [searchTerm, setSearchTerm] = useState("");
  const [activeYear, setActiveYear] = useState(0);
  
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  
  const { sections, teachers, courses } = useMemo(() => getMockData(), []);

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
    let filtered = sections
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
  }, [sections, activeCourseTab, activeYear, searchTerm, sortConfig]);

  const currentCourseName = courses.find(c => c.id === activeCourseTab)?.name || "Sections";

  return (
    <>
      <Header showStats={false} />
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
                        Table View
                      </Button>
                      <Button
                        color={viewMode === 'block' ? 'primary' : 'secondary'}
                        outline={viewMode !== 'block'}
                        size="sm"
                        onClick={() => setViewMode('block')}
                      >
                        <i className="ni ni-app mr-1"></i>
                        Block View
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              {/* Search and Filter Row */}
              <Row className="mb-4">
                <Col md="4" className="pl-4 d-flex flex-column align-items-start">
                  {/* Year filter buttons in a horizontal row above search bar and course name */}
                  <div className="btn-group mb-2" role="group">
                    {['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year'].map((year, idx) => (
                      <Button
                        key={year}
                        color={activeYear === idx ? 'primary' : 'secondary'}
                        outline={false}
                        style={{
                          minWidth: '50px',
                          fontWeight: 600,
                          fontSize: '0.89rem',
                          border: 'none',
                          boxShadow: 'none',
                          background: activeYear === idx ? undefined : '#f6f9fc',
                          color: activeYear === idx ? '#fff' : '#4385B1',
                          marginRight: '10px',
                          padding: '4px 10px',
                          borderRadius: activeYear === idx ? '8px' : '6px',
                          textAlign: 'left'
                        }}
                        onClick={() => setActiveYear(idx)}
                      >
                        {year}
                      </Button>
                    ))}
                  </div>
                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Search sections..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#32325d' }}>
                    {currentCourseName} ({filteredAndSortedSections.length})
                  </div>
                </Col>
                <Col md="8" className="d-flex align-items-end">
                  {/* (other controls remain here) */}
                </Col>
              </Row>
              {/* Table View */}
              {viewMode === 'table' && (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                        SECTION NAME{getSortIndicator('name')}
                      </th>
                      <th scope="col" onClick={() => handleSort('year')} style={{ cursor: 'pointer' }}>
                        YEAR{getSortIndicator('year')}
                      </th>
                      <th scope="col">ADVISER</th>
                      <th scope="col" onClick={() => handleSort('enrolled')} style={{ cursor: 'pointer' }}>
                        ENROLLED{getSortIndicator('enrolled')}
                      </th>
                      <th scope="col">A.Y.</th>
                      <th scope="col">SEMESTER</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedSections.map(section => {
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
                          <td>
                            <Button color="primary" size="sm">Edit</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
              {/* Block View (if needed) can be added here */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SectionManagement; 