import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Container,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes, FaUser } from "react-icons/fa";

const courseOptions = [
  { value: "bsit", label: "BSIT" },
  { value: "bscs", label: "BSCS" },
  { value: "bsis", label: "BSIS" },
  { value: "act", label: "ACT" },
];
const semesterOptions = [
  { value: "1st Semester", label: "1st Semester" },
  { value: "2nd Semester", label: "2nd Semester" },
];
const mockStudents = [
  { id: 1, name: "Mike Johnson", email: "mike.j@email.com", avatar: require("../../assets/img/theme/team-1-800x800.jpg") },
  { id: 2, name: "David Brown", email: "david.b@email.com", avatar: require("../../assets/img/theme/team-2-800x800.jpg") },
  { id: 3, name: "Robert Miller", email: "robert.m@email.com", avatar: require("../../assets/img/theme/team-3-800x800.jpg") },
  { id: 4, name: "Lisa Garcia", email: "lisa.p@email.com", avatar: require("../../assets/img/theme/team-4-800x800.jpg") },
];

const CreateSection = () => {
  const [course, setCourse] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [semester, setSemester] = useState("");
  const [adviser, setAdviser] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [studentModal, setStudentModal] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");
  const [isStudentSearchFocused, setIsStudentSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleStudentCheck = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const removeStudent = (id) => setSelectedStudents(selectedStudents.filter(sid => sid !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/admin/section-management");
      }, 2000);
    }, 1200);
  };

  const filteredStudents = mockStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <>
      <style>{`
        .student-pill {
          transition: background 0.15s;
        }
        .student-pill:hover {
          background: #cfd8dc !important;
        }
        .student-pill-x {
          transition: color 0.15s;
        }
        .student-pill-x:hover {
          color: #e74c3c !important;
        }
        .student-list-row {
          cursor: pointer;
          transition: background 0.15s;
        }
        .student-list-row:hover {
          background: #f1f2f6;
        }
        .student-list-row.selected {
          background: #e3eafc !important;
        }
      `}</style>
      <Header showStats={false} />
      <Container className="mt-4" fluid>
        <Row>
          <Col className="order-xl-1 mx-auto" xl="8" lg="8" md="10">
            <Card className="bg-secondary shadow border-0 mt-5">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Create New Section</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Section Information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="course">Course</label>
                          <Input
                            type="select"
                            className="form-control-alternative"
                            id="course"
                            value={course}
                            onChange={e => setCourse(e.target.value)}
                            required
                          >
                            <option value="">Select Course</option>
                            {courseOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="sectionName">Section Name</label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            id="sectionName"
                            value={sectionName}
                            onChange={e => setSectionName(e.target.value)}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="academicYear">Academic Year</label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            id="academicYear"
                            value={academicYear}
                            onChange={e => setAcademicYear(e.target.value)}
                            placeholder="e.g. 2024-2025"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="semester">Semester</label>
                          <Input
                            type="select"
                            className="form-control-alternative"
                            id="semester"
                            value={semester}
                            onChange={e => setSemester(e.target.value)}
                            required
                          >
                            <option value="">Select Semester</option>
                            {semesterOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="adviser">Adviser</label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            id="adviser"
                            value={adviser}
                            onChange={e => setAdviser(e.target.value)}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* Students Row */}
                    <Row className="align-items-center mb-3">
                      <Col xs="8">
                        <h6 className="heading-small text-muted mb-0">Students ({selectedStudents.length})</h6>
                      </Col>
                      <Col xs="4" className="text-right">
                        <Button color="primary" size="sm" onClick={() => setStudentModal(true)}>
                          Add Students
                        </Button>
                      </Col>
                    </Row>
                    {/* Show selected students as pills */}
                    <Row className="mb-3">
                      <Col>
                        <div style={{ minHeight: 70, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: selectedStudents.length === 0 ? 'center' : 'flex-start', justifyContent: 'center', background: '#f7f8fa', borderRadius: 8, padding: 8, border: '1px solid #e9ecef' }}>
                          {selectedStudents.length === 0 ? (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#b0b7c3', fontSize: 14, minHeight: 70 }}>
                              <FaUser size={28} style={{ marginBottom: 4 }} />
                              <div style={{ fontSize: 16, fontWeight: 500 }}>No students selected</div>
                            </div>
                          ) : (
                            selectedStudents.map(id => {
                              const s = mockStudents.find(stu => stu.id === id);
                              return s ? (
                                <span key={id} className="student-pill" style={{ display: 'flex', alignItems: 'center', background: '#e0e3ea', borderRadius: 10, padding: '0 4px 0 1px', fontSize: 10, fontWeight: 500 }}>
                                  <img src={s.avatar} alt={s.name} style={{ width: 16, height: 16, borderRadius: '50%', marginRight: 4, objectFit: 'cover', border: '1px solid #fff' }} />
                                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                                    <span style={{ fontWeight: 700 }}>{s.name}</span>
                                    <span style={{ color: '#888', fontWeight: 400, fontSize: 9 }}>{s.email}</span>
                                  </span>
                                  <FaTimes className="student-pill-x" style={{ marginLeft: 4, cursor: 'pointer', color: '#5e72e4', fontSize: 11 }} onClick={() => removeStudent(id)} />
                                </span>
                              ) : null;
                            })
                          )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="text-right">
                    <Button color="primary" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Create Section"}
                    </Button>
                  </div>
                  {showSuccess && (
                    <div className="alert alert-success mt-3 mb-0 text-center">
                      Section created successfully!
                    </div>
                  )}
                </Form>
                {/* Student Modal */}
                <Modal isOpen={studentModal} toggle={() => setStudentModal(false)} size="md" centered style={{ borderRadius: 20 }} contentClassName="border-0">
                  <div style={{ borderRadius: 20, background: '#fff', padding: 0, boxShadow: '0 8px 32px rgba(44,62,80,.12)' }}>
                    <ModalHeader toggle={() => setStudentModal(false)} style={{ border: 'none', paddingBottom: 0, fontWeight: 700, fontSize: 18, background: 'transparent' }}>
                      Add Students to Section
                    </ModalHeader>
                    <ModalBody style={{ padding: 0 }}>
                      <div style={{ padding: 24, paddingTop: 12 }}>
                        <InputGroup className={isStudentSearchFocused ? 'focused' : ''} style={{ width: '100%', marginBottom: 18 }}>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            className="custom-focus-effect"
                            placeholder="Search students..."
                            value={studentSearch}
                            onChange={e => setStudentSearch(e.target.value)}
                            style={{ minWidth: 0 }}
                            onFocus={() => setIsStudentSearchFocused(true)}
                            onBlur={() => setIsStudentSearchFocused(false)}
                          />
                        </InputGroup>
                        {/* Selected students pills in modal */}
                        <div style={{ minHeight: 70, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: selectedStudents.length === 0 ? 'center' : 'flex-start', justifyContent: 'center', background: '#f7f8fa', borderRadius: 8, padding: 8, border: '1px solid #e9ecef', marginBottom: 12 }}>
                          {selectedStudents.length === 0 ? (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#b0b7c3', fontSize: 14, minHeight: 70 }}>
                              <FaUser size={28} style={{ marginBottom: 4 }} />
                              <div style={{ fontSize: 16, fontWeight: 500 }}>No students selected</div>
                            </div>
                          ) : (
                            selectedStudents.map(id => {
                              const s = mockStudents.find(stu => stu.id === id);
                              return s ? (
                                <span key={id} className="student-pill" style={{ display: 'flex', alignItems: 'center', background: '#e0e3ea', borderRadius: 10, padding: '0 4px 0 1px', fontSize: 10, fontWeight: 500 }}>
                                  <img src={s.avatar} alt={s.name} style={{ width: 16, height: 16, borderRadius: '50%', marginRight: 4, objectFit: 'cover', border: '1px solid #fff' }} />
                                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                                    <span style={{ fontWeight: 700 }}>{s.name}</span>
                                    <span style={{ color: '#888', fontWeight: 400, fontSize: 9 }}>{s.email}</span>
                                  </span>
                                  <FaTimes className="student-pill-x" style={{ marginLeft: 4, cursor: 'pointer', color: '#5e72e4', fontSize: 11 }} onClick={() => removeStudent(id)} />
                                </span>
                              ) : null;
                            })
                          )}
                        </div>
                        <div style={{ fontWeight: 600, color: '#222', fontSize: 15, marginBottom: 10 }}>Students</div>
                        {selectedStudents.length > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                            <Button color="link" size="sm" style={{ color: '#5e72e4', textDecoration: 'underline', fontWeight: 500, fontSize: 13, padding: 0 }} onClick={() => setSelectedStudents([])}>
                              Unselect All
                            </Button>
                          </div>
                        )}
                        <div style={{ maxHeight: 320, overflowY: 'auto', border: 'none', borderRadius: 12, background: '#f9fafd', padding: 0 }}>
                          {filteredStudents.length === 0 ? (
                            <div className="text-center text-muted py-5">No students found</div>
                          ) : (
                            filteredStudents.map((s, idx) => (
                              <div
                                key={s.id}
                                className={`d-flex align-items-center justify-content-between px-3 student-list-row${selectedStudents.includes(s.id) ? ' selected' : ''}`}
                                style={{ padding: '14px 0', borderBottom: idx !== filteredStudents.length - 1 ? '1px solid #f0f1f6' : 'none' }}
                                onClick={() => handleStudentCheck(s.id)}
                              >
                                <div className="d-flex align-items-center">
                                  <img src={s.avatar} alt={s.name} style={{ width: 38, height: 38, borderRadius: '50%', marginRight: 14, objectFit: 'cover', border: '2px solid #e9ecef' }} />
                                  <div>
                                    <div style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</div>
                                    <div className="text-muted" style={{ fontSize: 13 }}>{s.email}</div>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center" style={{ gap: 10 }}>
                                  <span style={{ fontSize: 13, color: '#6c757d', fontWeight: 500, marginRight: 10 }}>Student</span>
                                  <label style={{ marginBottom: 0, cursor: 'pointer' }} onClick={e => e.stopPropagation()}>
                                    <Input
                                      type="checkbox"
                                      checked={selectedStudents.includes(s.id)}
                                      onChange={() => handleStudentCheck(s.id)}
                                      style={{ width: 18, height: 18, accentColor: '#5e72e4' }}
                                    />
                                    {selectedStudents.includes(s.id) && <FaCheck style={{ color: '#5e72e4', position: 'absolute', marginLeft: -22, marginTop: 2, pointerEvents: 'none', fontSize: 13 }} />}
                                  </label>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </ModalBody>
                  </div>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateSection; 