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
const studentNames = [
  "Mike Johnson", "David Brown", "Robert Miller", "Lisa Garcia", "Emily Clark", "James Lee", "Sophia Turner", "Daniel Kim", "Olivia Harris", "William Scott",
  "Ava Martinez", "Benjamin Young", "Mia King", "Elijah Wright", "Charlotte Green", "Alexander Adams", "Amelia Nelson", "Jacob Carter", "Evelyn Mitchell", "Michael Perez",
  "Abigail Roberts", "Matthew Hall", "Harper Lewis", "Jack Walker", "Ella Allen", "Henry Sanchez", "Grace Baker", "Samuel Gonzalez", "Chloe Nelson", "Jackson Rivera",
  "Lily Campbell", "Sebastian Morgan", "Zoe Reed", "Logan Cooper", "Penelope Cox", "Lucas Howard", "Layla Ward", "Mason Torres", "Scarlett Peterson", "Ethan Gray",
  "Victoria Ramirez", "Carter James", "Hannah Watson", "Jayden Brooks", "Aria Kelly", "Gabriel Sanders", "Avery Price", "Julian Bennett", "Sofia Wood", "Levi Barnes",
  "Nora Ross", "David Powell", "Camila Long", "Wyatt Patterson"
];
const avatarImages = [
  require("../../assets/img/theme/team-1-800x800.jpg"),
  require("../../assets/img/theme/team-2-800x800.jpg"),
  require("../../assets/img/theme/team-3-800x800.jpg"),
  require("../../assets/img/theme/team-4-800x800.jpg"),
  require("../../assets/img/theme/angular.jpg"),
  require("../../assets/img/theme/bootstrap.jpg"),
  require("../../assets/img/theme/profile-cover.jpg"),
  require("../../assets/img/theme/react.jpg"),
  require("../../assets/img/theme/sketch.jpg"),
  require("../../assets/img/theme/team-1-800x800.jpg"), // repeat if needed
  require("../../assets/img/theme/team-2-800x800.jpg"),
  require("../../assets/img/theme/team-3-800x800.jpg"),
  require("../../assets/img/theme/team-4-800x800.jpg"),
  require("../../assets/img/theme/team-1-800x800.jpg"),
  require("../../assets/img/theme/team-2-800x800.jpg"),
  require("../../assets/img/theme/team-3-800x800.jpg"),
  require("../../assets/img/theme/team-4-800x800.jpg"),
  require("../../assets/img/theme/vue.jpg")
];
const mockStudents = studentNames.map((name, idx) => {
  const id = idx + 1;
  // Use a unique avatar for each student, cycle if more students than images
  const avatar = avatarImages[idx % avatarImages.length];
  return {
    id,
    name,
    email: `20213059${id.toString().padStart(2, '0')}@dhvsu.edu.ph`,
    avatar
  };
});

// Add this array to match User Management's users
const userManagementUsers = [
  // Admin users
  { id: 1, name: "Dr. Sarah Johnson", email: "sarah.johnson@school.com", role: "admin" },
  { id: 2, name: "Mr. David Smith", email: "david.smith@school.com", role: "admin" },
  { id: 3, name: "Ms. Lisa Brown", email: "lisa.brown@school.com", role: "admin" },
  // Teacher users (already used above)
  { id: 4, name: "Dr. Emily Johnson", email: "emily.johnson@school.com", role: "teacher" },
  { id: 5, name: "Prof. David Smith", email: "david.smith@school.com", role: "teacher" },
  { id: 6, name: "Ms. Lisa Brown", email: "lisa.brown@school.com", role: "teacher" },
  { id: 7, name: "Mr. Robert Wilson", email: "robert.wilson@school.com", role: "teacher" },
  { id: 8, name: "Dr. Maria Garcia", email: "maria.garcia@school.com", role: "teacher" },
  { id: 9, name: "Mrs. Jennifer Lee", email: "jennifer.lee@school.com", role: "teacher" },
  { id: 10, name: "Mr. Thomas Anderson", email: "thomas.anderson@school.com", role: "teacher" },
  { id: 11, name: "Ms. Amanda White", email: "amanda.white@school.com", role: "teacher" },
  { id: 12, name: "Dr. Christopher Martinez", email: "christopher.martinez@school.com", role: "teacher" },
  { id: 13, name: "Mrs. Patricia Taylor", email: "patricia.taylor@school.com", role: "teacher" },
  { id: 14, name: "Mr. Daniel Clark", email: "daniel.clark@school.com", role: "teacher" },
  { id: 15, name: "Ms. Rebecca Hall", email: "rebecca.hall@school.com", role: "teacher" },
  { id: 16, name: "Dr. Kevin Rodriguez", email: "kevin.rodriguez@school.com", role: "teacher" },
  { id: 17, name: "Mrs. Stephanie Lewis", email: "stephanie.lewis@school.com", role: "teacher" },
  { id: 18, name: "Mr. Jason Walker", email: "jason.walker@school.com", role: "teacher" },
  // Student users
  { id: 19, name: "Alex Thompson", email: "alex.thompson@student.school.com", role: "student" },
  { id: 20, name: "Emma Davis", email: "emma.davis@student.school.com", role: "student" },
  { id: 21, name: "James Wilson", email: "james.wilson@student.school.com", role: "student" },
  { id: 22, name: "Sophia Lee", email: "sophia.lee@student.school.com", role: "student" },
  { id: 23, name: "Michael Chen", email: "michael.chen@student.school.com", role: "student" },
  { id: 24, name: "Olivia Taylor", email: "olivia.taylor@student.school.com", role: "student" },
  { id: 25, name: "William Brown", email: "william.brown@student.school.com", role: "student" },
  { id: 26, name: "Ava Johnson", email: "ava.johnson@student.school.com", role: "student" },
  { id: 27, name: "Ethan Miller", email: "ethan.miller@student.school.com", role: "student" },
  { id: 28, name: "Isabella Garcia", email: "isabella.garcia@student.school.com", role: "student" },
  { id: 29, name: "Mason Rodriguez", email: "mason.rodriguez@student.school.com", role: "student" },
  { id: 30, name: "Mia Martinez", email: "mia.martinez@student.school.com", role: "student" },
  { id: 31, name: "Noah Anderson", email: "noah.anderson@student.school.com", role: "student" },
  { id: 32, name: "Charlotte White", email: "charlotte.white@student.school.com", role: "student" },
  { id: 33, name: "Liam Clark", email: "liam.clark@student.school.com", role: "student" },
  { id: 34, name: "Harper Hall", email: "harper.hall@student.school.com", role: "student" },
  { id: 35, name: "Evelyn Lewis", email: "evelyn.lewis@student.school.com", role: "student" },
  { id: 36, name: "Benjamin Walker", email: "benjamin.walker@student.school.com", role: "student" },
  { id: 37, name: "Abigail Young", email: "abigail.young@student.school.com", role: "student" },
  { id: 38, name: "Sebastian King", email: "sebastian.king@student.school.com", role: "student" },
  { id: 39, name: "Emily Wright", email: "emily.wright@student.school.com", role: "student" },
  { id: 40, name: "Daniel Lopez", email: "daniel.lopez@student.school.com", role: "student" },
  { id: 41, name: "Sofia Hill", email: "sofia.hill@student.school.com", role: "student" },
  { id: 42, name: "Matthew Scott", email: "matthew.scott@student.school.com", role: "student" },
  { id: 43, name: "Avery Green", email: "avery.green@student.school.com", role: "student" },
  { id: 44, name: "Ella Adams", email: "ella.adams@student.school.com", role: "student" },
  { id: 45, name: "Jackson Baker", email: "jackson.baker@student.school.com", role: "student" },
  { id: 46, name: "Madison Nelson", email: "madison.nelson@student.school.com", role: "student" }
];

// Use only students for the popup
const userManagementStudents = userManagementUsers.filter(u => u.role === "student");

const CreateSection = () => {
  const [course, setCourse] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [yearLevel, setYearLevel] = useState("");
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
      // Save new section to localStorage for SectionManagement to pick up
      const newSection = {
        name: sectionName,
        course,
        year: yearLevel,
        academicYear,
        semester,
        adviser,
        maxStudents: 40,
        students: selectedStudents,
      };
      localStorage.setItem('newSection', JSON.stringify(newSection));
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/admin/section-management");
      }, 2000);
    }, 1200);
  };

  const filteredStudents = userManagementStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <>
      <style>{`
        .student-pill {
          transition: background 0.15s;
          font-size: 9px !important;
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
          padding-top: 8px !important;
          padding-bottom: 8px !important;
        }
        .student-list-row:hover {
          background: #f1f2f6;
        }
        .student-list-row.selected {
          background: #eaf4fb !important;
        }
        .unselect-all-btn {
          color: #5e72e4;
          text-decoration: underline;
          font-weight: 500;
          font-size: 11px;
          padding: 0;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.15s;
        }
        .unselect-all-btn:hover {
          color: #e74c3c;
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
                          <label className="form-control-label" htmlFor="yearLevel">Year Level</label>
                          <Input
                            type="select"
                            className="form-control-alternative"
                            id="yearLevel"
                            value={yearLevel}
                            onChange={e => setYearLevel(e.target.value)}
                            required
                          >
                            <option value="">Select Year Level</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
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
                    </Row>
                    <Row>
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
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="adviser">Adviser</label>
                          <Input
                            type="select"
                            className="form-control-alternative"
                            id="adviser"
                            value={adviser}
                            onChange={e => setAdviser(e.target.value)}
                            required
                          >
                            <option value="">Select Adviser</option>
                            {userManagementUsers.map(t => (
                              <option key={t.id} value={t.id}>{t.name} ({t.email})</option>
                            ))}
                          </Input>
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
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#b0b7c3', fontSize: 11, minHeight: 30 }}>
                              <FaUser size={14} style={{ marginBottom: 2 }} />
                              <div style={{ fontSize: 11, fontWeight: 500 }}>No students selected</div>
                            </div>
                          ) : (
                            selectedStudents.map(id => {
                              const s = userManagementStudents.find(stu => stu.id === id);
                              return s ? (
                                <span key={id} className="student-pill" style={{ display: 'flex', alignItems: 'center', background: '#e0e3ea', borderRadius: 10, padding: '0 4px 0 1px', fontSize: 9, fontWeight: 500 }}>
                                  <img src={s.avatar} alt={s.name} style={{ width: 13, height: 13, borderRadius: '50%', marginRight: 3, objectFit: 'cover', border: '1px solid #fff' }} />
                                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                                    <span style={{ fontWeight: 700, fontSize: 9 }}>{s.name}</span>
                                    <span style={{ color: '#888', fontWeight: 400, fontSize: 8 }}>{s.email}</span>
                                  </span>
                                  <FaTimes className="student-pill-x" style={{ marginLeft: 3, cursor: 'pointer', color: '#5e72e4', fontSize: 10 }} onClick={() => removeStudent(id)} />
                                </span>
                              ) : null;
                            })
                          )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                          <span style={{ fontWeight: 600, color: '#222', fontSize: 12 }}>
                            Students ({selectedStudents.length})
                          </span>
                          {selectedStudents.length > 0 && (
                            <button className="unselect-all-btn" type="button" onClick={() => setSelectedStudents([])}>
                              Unselect All
                            </button>
                          )}
                        </div>
                        <div style={{ maxHeight: 320, overflowY: 'auto', border: 'none', borderRadius: 12, background: '#f9fafd', padding: '0 16px 0 0', marginBottom: 8 }}>
                          {filteredStudents.length === 0 ? (
                            <div className="text-center text-muted py-5">No students found</div>
                          ) : (
                            filteredStudents.map((s, idx) => (
                              <div
                                key={s.id}
                                className={`d-flex align-items-center student-list-row${selectedStudents.includes(s.id) ? ' selected' : ''}`}
                                style={{ padding: '8px 16px', borderBottom: idx !== filteredStudents.length - 1 ? '1px solid #f0f1f6' : 'none', justifyContent: 'space-between', position: 'relative' }}
                                onClick={() => handleStudentCheck(s.id)}
                              >
                                <div className="d-flex align-items-center">
                                  <img src={s.avatar} alt={s.name} style={{ width: 28, height: 28, borderRadius: '50%', marginRight: 10, objectFit: 'cover', border: '2px solid #e9ecef' }} />
                                  <div>
                                    <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                                    <div className="text-muted" style={{ fontSize: 11 }}>{s.email}</div>
                                  </div>
                                </div>
                                <label style={{ marginBottom: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: 'auto' }} onClick={e => e.stopPropagation()}>
                                  <Input
                                    type="checkbox"
                                    checked={selectedStudents.includes(s.id)}
                                    onChange={() => handleStudentCheck(s.id)}
                                    style={{ width: 18, height: 18, accentColor: '#5e72e4', margin: 0 }}
                                  />
                                </label>
                              </div>
                            ))
                          )}
                        </div>
                        {/* Selected students pills in modal */}
                        <div style={{ minHeight: 50, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: selectedStudents.length === 0 ? 'center' : 'flex-start', justifyContent: 'center', background: '#f7f8fa', borderRadius: 8, padding: 8, border: '1px solid #e9ecef', marginTop: 12 }}>
                          {selectedStudents.length === 0 ? (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#b0b7c3', fontSize: 11, minHeight: 30 }}>
                              <FaUser size={14} style={{ marginBottom: 2 }} />
                              <div style={{ fontSize: 11, fontWeight: 500 }}>No students selected</div>
                            </div>
                          ) : (
                            selectedStudents.map(id => {
                              const s = userManagementStudents.find(stu => stu.id === id);
                              return s ? (
                                <span key={id} className="student-pill" style={{ display: 'flex', alignItems: 'center', background: '#e0e3ea', borderRadius: 10, padding: '0 4px 0 1px', fontSize: 9, fontWeight: 500 }}>
                                  <img src={s.avatar} alt={s.name} style={{ width: 13, height: 13, borderRadius: '50%', marginRight: 3, objectFit: 'cover', border: '1px solid #fff' }} />
                                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                                    <span style={{ fontWeight: 700, fontSize: 9 }}>{s.name}</span>
                                    <span style={{ color: '#888', fontWeight: 400, fontSize: 8 }}>{s.email}</span>
                                  </span>
                                  <FaTimes className="student-pill-x" style={{ marginLeft: 3, cursor: 'pointer', color: '#5e72e4', fontSize: 10 }} onClick={() => removeStudent(id)} />
                                </span>
                              ) : null;
                            })
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