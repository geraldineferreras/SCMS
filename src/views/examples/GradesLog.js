import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Table,
  Badge,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
  Progress,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import classnames from "classnames";

const GradesLog = () => {
  const [gradesData, setGradesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedActivityType, setSelectedActivityType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [activeCourseTab, setActiveCourseTab] = useState("bsit");

  // Sample grades data
  const sampleData = [
    {
      id: 1,
      studentName: "John Smith",
      section: "BSIT-1A",
      subject: "Programming Fundamentals",
      activityType: "Quiz",
      score: 18,
      totalScore: 20,
      date: "2024-01-15",
    },
    {
      id: 2,
      studentName: "Maria Garcia",
      section: "BSIT-1A",
      subject: "Programming Fundamentals",
      activityType: "Quiz",
      score: 16,
      totalScore: 20,
      date: "2024-01-15",
    },
    {
      id: 3,
      studentName: "David Wilson",
      section: "BSIT-1A",
      subject: "Programming Fundamentals",
      activityType: "Quiz",
      score: 20,
      totalScore: 20,
      date: "2024-01-15",
    },
    {
      id: 4,
      studentName: "Sarah Johnson",
      section: "BSIT-1B",
      subject: "Web Development",
      activityType: "Project",
      score: 45,
      totalScore: 50,
      date: "2024-01-16",
    },
    {
      id: 5,
      studentName: "Michael Brown",
      section: "BSIT-1B",
      subject: "Web Development",
      activityType: "Project",
      score: 42,
      totalScore: 50,
      date: "2024-01-16",
    },
    {
      id: 6,
      studentName: "Emily Davis",
      section: "BSIT-1C",
      subject: "Database Management",
      activityType: "Exam",
      score: 85,
      totalScore: 100,
      date: "2024-01-17",
    },
    {
      id: 7,
      studentName: "James Miller",
      section: "BSIT-1C",
      subject: "Database Management",
      activityType: "Exam",
      score: 78,
      totalScore: 100,
      date: "2024-01-17",
    },
    {
      id: 8,
      studentName: "Lisa Anderson",
      section: "BSIT-1A",
      subject: "Computer Networks",
      activityType: "Quiz",
      score: 17,
      totalScore: 20,
      date: "2024-01-18",
    },
    {
      id: 9,
      studentName: "Robert Taylor",
      section: "BSIT-1B",
      subject: "Software Engineering",
      activityType: "Project",
      score: 48,
      totalScore: 50,
      date: "2024-01-19",
    },
    {
      id: 10,
      studentName: "Jennifer White",
      section: "BSIT-1C",
      subject: "Operating Systems",
      activityType: "Exam",
      score: 92,
      totalScore: 100,
      date: "2024-01-20",
    },
  ];

  const sections = ["BSIT-1A", "BSIT-1B", "BSIT-1C", "BSIT-2A", "BSIT-2B"];
  const subjects = [
    "Programming Fundamentals",
    "Web Development",
    "Database Management",
    "Computer Networks",
    "Software Engineering",
    "Operating Systems",
  ];
  const activityTypes = ["Quiz", "Exam", "Project"];

  // Add courses array for tabs
  const courses = [
    { id: "bsit", abbr: "BSIT", name: "Info Tech" },
    { id: "bscs", abbr: "BSCS", name: "Computer Science" },
    { id: "bsis", abbr: "BSIS", name: "Info Systems" },
    { id: "act", abbr: "ACT", name: "Computer Technology" },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setGradesData(sampleData);
      setFilteredData(sampleData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, selectedSection, selectedSubject, selectedActivityType, gradesData]);

  const filterData = () => {
    let filtered = gradesData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Section filter
    if (selectedSection) {
      filtered = filtered.filter((item) => item.section === selectedSection);
    }

    // Subject filter
    if (selectedSubject) {
      filtered = filtered.filter((item) => item.subject === selectedSubject);
    }

    // Activity type filter
    if (selectedActivityType) {
      filtered = filtered.filter((item) => item.activityType === selectedActivityType);
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const getSortIndicator = (key) => {
    if (sortKey === key) {
      return sortDirection === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  const getActivityTypeBadge = (type) => {
    switch (type) {
      case "Quiz":
        return <Badge color="info">{type}</Badge>;
      case "Exam":
        return <Badge color="warning">{type}</Badge>;
      case "Project":
        return <Badge color="success">{type}</Badge>;
      default:
        return <Badge color="secondary">{type}</Badge>;
    }
  };

  const getScorePercentage = (score, totalScore) => {
    return Math.round((score / totalScore) * 100);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 90) return "success";
    if (percentage >= 80) return "info";
    if (percentage >= 70) return "warning";
    return "danger";
  };

  const exportToCSV = () => {
    const headers = ["Student Name", "Section", "Subject", "Activity Type", "Score", "Total Score", "Percentage", "Date"];
    const csvContent = [
      headers.join(","),
      ...filteredData.map((row) => {
        const percentage = getScorePercentage(row.score, row.totalScore);
        return [
          row.studentName,
          row.section,
          row.subject,
          row.activityType,
          row.score,
          row.totalScore,
          `${percentage}%`,
          row.date,
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grades_log.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    // Simple PDF export simulation
    alert("PDF export functionality would be implemented here");
  };

  // Filter by course tab
  const filteredByCourse = filteredData.filter(item => (item.section || '').toLowerCase().includes(activeCourseTab));

  // Sorting and pagination
  const sortedData = [...filteredByCourse].sort((a, b) => {
    if (!sortKey) return 0;
    
    let aVal = a[sortKey];
    let bVal = b[sortKey];
    
    if (sortKey === "date") {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }
    
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner color="primary" />
        <p className="mt-2">Loading grades data...</p>
      </div>
    );
  }

  return (
    <>
      <Header showStats={false} />
      <Container className="mt-4" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardBody style={{ background: '#fff', borderRadius: '0 0 12px 12px', padding: 0 }}>
                {/* Tabs and View Mode Row */}
                <Row className="mb-4 align-items-center" style={{marginTop: 0, paddingTop: 0}}>
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
                    </div>
                  </Col>
                </Row>
                {/* Search and Filter Row */}
                <Row style={{ marginLeft: 0, marginRight: 0 }}>
                  <Col md="12" className="pl-3 pr-3">
                    {/* Search bar in a single row with space to the right */}
                    <div className="d-flex align-items-center mb-2" style={{ width: '100%', margin: 0, padding: 0 }}>
                      <InputGroup className={isSearchFocused ? 'focused' : ''} style={{ width: '100%', marginBottom: '6px' }}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Search students, sections, or subjects..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{ minWidth: 0 }}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setIsSearchFocused(false)}
                        />
                      </InputGroup>
                    </div>
                    {/* Activity Type filter buttons below search bar */}
                    <div className="d-flex justify-content-center">
                      <div className="btn-group mb-2" role="group" style={{ marginTop: '8px', marginBottom: '16px' }}>
                        {['All Types', 'Quiz', 'Exam', 'Project'].map((type, idx) => (
                          <Button
                            key={type}
                            color={selectedActivityType === type || (idx === 0 && !selectedActivityType) ? 'primary' : 'secondary'}
                            outline={false}
                            style={{
                              minWidth: '56px',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              border: 'none',
                              boxShadow: 'none',
                              background: (selectedActivityType === type || (idx === 0 && !selectedActivityType)) ? undefined : '#f6f9fc',
                              color: (selectedActivityType === type || (idx === 0 && !selectedActivityType)) ? '#fff' : '#4385B1',
                              marginRight: '7px',
                              padding: '3px 7px',
                              borderRadius: '0.375rem',
                              textAlign: 'center',
                              whiteSpace: 'nowrap'
                            }}
                            onClick={() => setSelectedActivityType(idx === 0 ? "" : type)}
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>
                    {/* Header with count and action buttons */}
                    <div className="w-100 d-flex justify-content-between align-items-center" style={{ marginTop: '20px', marginBottom: '16px' }}>
                      <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#32325d' }}>
                        Grades Log ({filteredData.length})
                      </div>
                      <div className="d-flex align-items-center" style={{ gap: 12 }}>
                        <UncontrolledDropdown className="d-inline-block mr-2">
                          <DropdownToggle color="info" outline size="sm" style={{ padding: '3px 10px', fontSize: '0.75rem' }}>
                            <i className="ni ni-archive-2 mr-2" /> Export
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={exportToCSV}>
                              <i className="ni ni-single-copy-04 mr-2" />
                              Export to CSV
                            </DropdownItem>
                            <DropdownItem onClick={exportToPDF}>
                              <i className="ni ni-pdf mr-2" />
                              Export to PDF
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* Table View */}
                <div style={{ margin: 0, padding: 0, width: '100%' }}>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" onClick={() => handleSort('studentName')} style={{ cursor: 'pointer' }}>
                        STUDENT NAME{getSortIndicator('studentName')}
                      </th>
                      <th scope="col" onClick={() => handleSort('section')} style={{ cursor: 'pointer' }}>
                        SECTION{getSortIndicator('section')}
                      </th>
                      <th scope="col" onClick={() => handleSort('subject')} style={{ cursor: 'pointer' }}>
                        SUBJECT{getSortIndicator('subject')}
                      </th>
                      <th scope="col" onClick={() => handleSort('activityType')} style={{ cursor: 'pointer' }}>
                        ACTIVITY TYPE{getSortIndicator('activityType')}
                      </th>
                      <th scope="col" onClick={() => handleSort('score')} style={{ cursor: 'pointer' }}>
                        SCORE{getSortIndicator('score')}
                      </th>
                      <th scope="col" onClick={() => handleSort('totalScore')} style={{ cursor: 'pointer' }}>
                        TOTAL SCORE{getSortIndicator('totalScore')}
                      </th>
                      <th scope="col">PERCENTAGE</th>
                      <th scope="col" onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                        DATE{getSortIndicator('date')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item) => {
                        const percentage = getScorePercentage(item.score, item.totalScore);
                        return (
                          <tr key={item.id}>
                            <td>
                              <div className="font-weight-bold">{item.studentName}</div>
                            </td>
                            <td>{item.section}</td>
                            <td>{item.subject}</td>
                            <td>{getActivityTypeBadge(item.activityType)}</td>
                            <td>
                              <div className="font-weight-bold">{item.score}</div>
                            </td>
                            <td>{item.totalScore}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="mr-3">
                                  <span className="font-weight-bold" style={{ color: '#525F7F' }}>
                                    {percentage}%
                                  </span>
                                </div>
                                <div className="flex-grow-1">
                                  <Progress
                                    value={percentage}
                                    color={getScoreColor(percentage)}
                                    size="sm"
                                    style={{ height: "6px" }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4">
                          <div className="text-muted">
                            <i className="ni ni-hat-3" style={{ fontSize: "3rem" }} />
                            <p className="mt-2">No grades records found</p>
                          </div>
                        </td>
                      </tr>
                    )}
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
            </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default GradesLog; 