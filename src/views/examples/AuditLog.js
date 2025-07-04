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
  Nav,
  NavItem,
  NavLink,
  Dropdown,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import classnames from "classnames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AuditLogDatePicker.css";

const AuditLog = () => {
  const [auditData, setAuditData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedModule, setSelectedModule] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [activeCourseTab, setActiveCourseTab] = useState("bsit");
  const [moduleDropdownOpen, setModuleDropdownOpen] = useState(false);

  // Sample audit data
  const sampleData = [
    {
      id: 1,
      user: "Dr. Sarah Johnson",
      action: "Added user",
      module: "User Management",
      details: "Created new student account for John Smith",
      timestamp: "2024-01-15 09:30:00",
    },
    {
      id: 2,
      user: "Mr. David Smith",
      action: "Deleted section",
      module: "Section Management",
      details: "Removed BSIT-1D section",
      timestamp: "2024-01-15 10:15:00",
    },
    {
      id: 3,
      user: "Ms. Lisa Brown",
      action: "Updated grades",
      module: "Grades Management",
      details: "Modified grades for Programming Fundamentals quiz",
      timestamp: "2024-01-15 11:00:00",
    },
    {
      id: 4,
      user: "Dr. Sarah Johnson",
      action: "Created section",
      module: "Section Management",
      details: "Added new section BSIT-2A",
      timestamp: "2024-01-15 14:20:00",
    },
    {
      id: 5,
      user: "Mr. David Smith",
      action: "Logged in",
      module: "Authentication",
      details: "User logged in from IP 192.168.1.100",
      timestamp: "2024-01-15 15:45:00",
    },
    {
      id: 6,
      user: "Ms. Lisa Brown",
      action: "Exported report",
      module: "Reports & Logs",
      details: "Exported attendance log to CSV",
      timestamp: "2024-01-15 16:30:00",
    },
    {
      id: 7,
      user: "Dr. Sarah Johnson",
      action: "Modified user",
      module: "User Management",
      details: "Updated profile information for Maria Garcia",
      timestamp: "2024-01-16 08:15:00",
    },
    {
      id: 8,
      user: "Mr. David Smith",
      action: "Deleted user",
      module: "User Management",
      details: "Removed inactive user account",
      timestamp: "2024-01-16 09:00:00",
    },
    {
      id: 9,
      user: "Ms. Lisa Brown",
      action: "Logged out",
      module: "Authentication",
      details: "User logged out",
      timestamp: "2024-01-16 17:30:00",
    },
    {
      id: 10,
      user: "Dr. Sarah Johnson",
      action: "Accessed logs",
      module: "Reports & Logs",
      details: "Viewed audit log entries",
      timestamp: "2024-01-16 18:00:00",
    },
  ];

  const modules = [
    "User Management",
    "Section Management",
    "Grades Management",
    "Reports & Logs",
    "Authentication",
  ];

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
      setAuditData(sampleData);
      setFilteredData(sampleData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, selectedModule, dateFrom, dateTo, auditData]);

  const filterData = () => {
    let filtered = auditData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Module filter
    if (selectedModule) {
      filtered = filtered.filter((item) => item.module === selectedModule);
    }

    // Date range filter
    if (dateFrom && dateTo) {
      filtered = filtered.filter((item) => {
        const itemDate = item.timestamp.split(" ")[0];
        return itemDate >= dateFrom.toISOString().split("T")[0] && itemDate <= dateTo.toISOString().split("T")[0];
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const getActionBadge = (action) => {
    switch (action.toLowerCase()) {
      case "added user":
      case "created section":
        return <Badge color="success">{action}</Badge>;
      case "deleted user":
      case "deleted section":
        return <Badge color="danger">{action}</Badge>;
      case "updated grades":
      case "modified user":
        return <Badge color="warning">{action}</Badge>;
      case "logged in":
      case "logged out":
        return <Badge color="info">{action}</Badge>;
      case "exported report":
      case "accessed logs":
        return <Badge color="primary">{action}</Badge>;
      default:
        return <Badge color="secondary">{action}</Badge>;
    }
  };

  const getModuleBadge = (module) => {
    switch (module) {
      case "User Management":
        return <Badge color="primary" outline>{module}</Badge>;
      case "Section Management":
        return <Badge color="success" outline>{module}</Badge>;
      case "Grades Management":
        return <Badge color="warning" outline>{module}</Badge>;
      case "Reports & Logs":
        return <Badge color="info" outline>{module}</Badge>;
      case "Authentication":
        return <Badge color="secondary" outline>{module}</Badge>;
      default:
        return <Badge color="light" outline>{module}</Badge>;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = ["User", "Action", "Module", "Details", "Timestamp"];
    const csvContent = [
      headers.join(","),
      ...filteredData.map((row) =>
        [
          `"${row.user}"`,
          `"${row.action}"`,
          `"${row.module}"`,
          `"${row.details}"`,
          `"${row.timestamp}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit_log.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    // Simple PDF export simulation
    alert("PDF export functionality would be implemented here");
  };

  // Sorting and pagination
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    
    let aVal = a[sortKey];
    let bVal = b[sortKey];
    
    if (sortKey === "timestamp") {
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

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner color="primary" />
        <p className="mt-2">Loading audit data...</p>
      </div>
    );
  }

  return (
    <>
      <Header showStats={false} />
      <Container className="mt-4" fluid>
        <Row>
          <Col md="12">
            {/* Filter Section OUTSIDE the table card */}
            <Card className="mb-4" style={{ border: '1px solid #e1e5e9', borderRadius: '8px' }}>
              <CardBody style={{ padding: '1.5rem' }}>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label style={{ fontWeight: 600, color: '#32325d', marginBottom: '0.5rem' }}>Module</Label>
                      <Dropdown isOpen={moduleDropdownOpen} toggle={() => setModuleDropdownOpen(!moduleDropdownOpen)} style={{ width: '100%' }}>
                        <DropdownToggle
                          style={{
                            width: '100%',
                            background: '#fff',
                            color: selectedModule ? '#32325d' : '#8898aa',
                            border: '1px solid #e1e5e9',
                            borderRadius: '6px',
                            fontWeight: 400,
                            fontSize: '1rem',
                            height: '48px',
                            padding: '0 16px',
                            boxShadow: 'none',
                            outline: 'none',
                            position: 'relative',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            margin: 0,
                          }}
                        >
                          <span>{selectedModule || 'All Modules'}</span>
                          <span style={{ position: 'absolute', right: 16, pointerEvents: 'none', display: 'flex', alignItems: 'center', height: '100%' }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 8L10 12L14 8" stroke="#b5b5b5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </DropdownToggle>
                        <DropdownMenu style={{ width: '100%' }}>
                          <DropdownItem
                            onClick={() => setSelectedModule("")}
                            active={!selectedModule}
                            style={{ backgroundColor: !selectedModule ? '#e7f3ff' : '#fff', color: '#525f7f', fontWeight: !selectedModule ? 600 : 400 }}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = '#e7f3ff'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = !selectedModule ? '#e7f3ff' : '#fff'}
                          >
                            All Modules
                          </DropdownItem>
                          {modules.map(module => (
                            <DropdownItem
                              key={module}
                              onClick={() => setSelectedModule(module)}
                              active={selectedModule === module}
                              style={{ backgroundColor: selectedModule === module ? '#e7f3ff' : '#fff', color: '#525f7f', fontWeight: selectedModule === module ? 600 : 400 }}
                              onMouseOver={e => e.currentTarget.style.backgroundColor = '#e7f3ff'}
                              onMouseOut={e => e.currentTarget.style.backgroundColor = selectedModule === module ? '#e7f3ff' : '#fff'}
                            >
                              {module}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label style={{ fontWeight: 600, color: '#32325d', marginBottom: '0.5rem' }}>Date From</Label>
                      <DatePicker
                        selected={dateFrom}
                        onChange={date => setDateFrom(date)}
                        selectsStart
                        startDate={dateFrom}
                        endDate={dateTo}
                        placeholderText="Select date"
                        className="form-control"
                        wrapperClassName="w-100"
                        style={{ borderRadius: '6px', border: '1px solid #e1e5e9', height: '48px', fontSize: '1rem', padding: '0 16px' }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label style={{ fontWeight: 600, color: '#32325d', marginBottom: '0.5rem' }}>Date To</Label>
                      <DatePicker
                        selected={dateTo}
                        onChange={date => setDateTo(date)}
                        selectsEnd
                        startDate={dateFrom}
                        endDate={dateTo}
                        minDate={dateFrom}
                        placeholderText="Select date"
                        className="form-control"
                        wrapperClassName="w-100"
                        style={{ borderRadius: '6px', border: '1px solid #e1e5e9', height: '48px', fontSize: '1rem', padding: '0 16px' }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={12} className="d-flex justify-content-end">
                    <Button
                      color="secondary"
                      outline
                      size="sm"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedModule("");
                        setDateFrom(null);
                        setDateTo(null);
                      }}
                      style={{ borderRadius: '6px', fontWeight: 600, fontSize: '0.8rem', padding: '0.375rem 0.75rem' }}
                    >
                      <i className="ni ni-refresh mr-1" />
                      Clear Filters
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Card with course tabs, search, filter buttons, and table */}
        <Row>
          <Col md="12">
            <Card className="shadow">
              <CardBody style={{ background: '#fff', borderRadius: '0 0 12px 12px', padding: 0 }}>
                {/* Search bar above the Audit Log title */}
                <Row style={{ marginLeft: 0, marginRight: 0 }}>
                  <Col md="12" className="pl-3 pr-3">
                    <div className="d-flex align-items-center mb-2" style={{ width: '100%', margin: 0, padding: 0, marginTop: '20px' }}>
                      <InputGroup className={isSearchFocused ? 'focused' : ''} style={{ width: '100%', marginBottom: '6px' }}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Search users, actions, or modules..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{ minWidth: 0 }}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setIsSearchFocused(false)}
                        />
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
                {/* Header with count and action buttons */}
                <Row>
                  <Col md="12" className="pl-3 pr-3">
                    <div className="w-100 d-flex justify-content-between align-items-center" style={{ marginTop: '20px', marginBottom: '16px' }}>
                      <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#32325d', marginLeft: '1.25rem' }}>
                        Audit Log ({filteredData.length})
                      </div>
                      <div className="d-flex align-items-center" style={{ gap: 12 }}>
                        <UncontrolledDropdown className="d-inline-block mr-2">
                          <DropdownToggle color="info" outline size="sm" style={{ padding: '3px 10px', fontSize: '0.75rem' }}>
                            <i className="ni ni-archive-2 mr-2" /> Export
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem 
                              onClick={exportToCSV}
                              style={{ backgroundColor: 'white', transition: 'background 0.2s' }}
                              onMouseOver={e => e.currentTarget.style.backgroundColor = '#e7f3ff'}
                              onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
                            >
                              <i className="ni ni-single-copy-04 mr-2" />
                              Export to CSV
                            </DropdownItem>
                            <DropdownItem 
                              onClick={exportToPDF}
                              style={{ backgroundColor: 'white', transition: 'background 0.2s' }}
                              onMouseOver={e => e.currentTarget.style.backgroundColor = '#e7f3ff'}
                              onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
                            >
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
                        <th scope="col" onClick={() => handleSort('user')} style={{ cursor: 'pointer' }}>
                          USER{getSortIndicator('user')}
                        </th>
                        <th scope="col" onClick={() => handleSort('action')} style={{ cursor: 'pointer' }}>
                          ACTION{getSortIndicator('action')}
                        </th>
                        <th scope="col" onClick={() => handleSort('module')} style={{ cursor: 'pointer' }}>
                          MODULE{getSortIndicator('module')}
                        </th>
                        <th scope="col">DETAILS</th>
                        <th scope="col" onClick={() => handleSort('timestamp')} style={{ cursor: 'pointer' }}>
                          TIMESTAMP{getSortIndicator('timestamp')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <div className="font-weight-bold">{item.user}</div>
                            </td>
                            <td>{getActionBadge(item.action)}</td>
                            <td>{getModuleBadge(item.module)}</td>
                            <td>
                              <div className="text-muted" style={{ maxWidth: "300px" }}>
                                {item.details}
                              </div>
                            </td>
                            <td>
                              <div className="text-muted">
                                {formatTimestamp(item.timestamp)}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            <div className="text-muted">
                              <i className="ni ni-archive-2" style={{ fontSize: "3rem" }} />
                              <p className="mt-2">No audit records found</p>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AuditLog; 