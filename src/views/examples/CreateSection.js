import React, { useState, useRef } from "react";
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
import Select from 'react-select';
import { components } from 'react-select';

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

// Add avatar URLs to userManagementUsers
const teacherAvatars = [
  require("../../assets/img/theme/team-1-800x800.jpg"),
  require("../../assets/img/theme/team-2-800x800.jpg"),
  require("../../assets/img/theme/team-3-800x800.jpg"),
  require("../../assets/img/theme/team-4-800x800.jpg"),
  require("../../assets/img/theme/angular.jpg"),
  require("../../assets/img/theme/bootstrap.jpg"),
  require("../../assets/img/theme/profile-cover.jpg"),
  require("../../assets/img/theme/react.jpg"),
  require("../../assets/img/theme/sketch.jpg"),
  require("../../assets/img/theme/team-1-800x800.jpg"),
  require("../../assets/img/theme/team-2-800x800.jpg"),
  require("../../assets/img/theme/team-3-800x800.jpg"),
  require("../../assets/img/theme/team-4-800x800.jpg"),
  require("../../assets/img/theme/team-1-800x800.jpg"),
  require("../../assets/img/theme/team-2-800x800.jpg"),
  require("../../assets/img/theme/team-3-800x800.jpg"),
  require("../../assets/img/theme/team-4-800x800.jpg"),
];
const studentAvatars = [
  require("../../assets/img/theme/team-1-800x800.jpg"),
  require("../../assets/img/theme/team-2-800x800.jpg"),
  require("../../assets/img/theme/team-3-800x800.jpg"),
  require("../../assets/img/theme/team-4-800x800.jpg"),
  require("../../assets/img/theme/angular.jpg"),
  require("../../assets/img/theme/bootstrap.jpg"),
  require("../../assets/img/theme/profile-cover.jpg"),
  require("../../assets/img/theme/react.jpg"),
  require("../../assets/img/theme/sketch.jpg"),
  require("../../assets/img/theme/team-1-800x800.jpg"),
  require("../../assets/img/theme/team-2-800x800.jpg"),
  require("../../assets/img/theme/team-3-800x800.jpg"),
  require("../../assets/img/theme/team-4-800x800.jpg"),
  require("../../assets/img/theme/team-1-800x800.jpg"),
  require("../../assets/img/theme/team-2-800x800.jpg"),
  require("../../assets/img/theme/team-3-800x800.jpg"),
  require("../../assets/img/theme/team-4-800x800.jpg"),
  require("../../assets/img/theme/vue.jpg")
];
const userManagementUsers = [
  // Admin users
  { id: 1, name: "Dr. Sarah Johnson", email: "sarah.johnson@school.com", role: "admin" },
  { id: 2, name: "Mr. David Smith", email: "david.smith@school.com", role: "admin" },
  { id: 3, name: "Ms. Lisa Brown", email: "lisa.brown@school.com", role: "admin" },
  // Teacher users
  { id: 4, name: "Dr. Emily Johnson", email: "emily.johnson@school.com", role: "teacher", avatar: teacherAvatars[0] },
  { id: 5, name: "Prof. David Smith", email: "david.smith@school.com", role: "teacher", avatar: teacherAvatars[1] },
  { id: 6, name: "Ms. Lisa Brown", email: "lisa.brown@school.com", role: "teacher", avatar: teacherAvatars[2] },
  { id: 7, name: "Mr. Robert Wilson", email: "robert.wilson@school.com", role: "teacher", avatar: teacherAvatars[3] },
  { id: 8, name: "Dr. Maria Garcia", email: "maria.garcia@school.com", role: "teacher", avatar: teacherAvatars[4] },
  { id: 9, name: "Mrs. Jennifer Lee", email: "jennifer.lee@school.com", role: "teacher", avatar: teacherAvatars[5] },
  { id: 10, name: "Mr. Thomas Anderson", email: "thomas.anderson@school.com", role: "teacher", avatar: teacherAvatars[6] },
  { id: 11, name: "Ms. Amanda White", email: "amanda.white@school.com", role: "teacher", avatar: teacherAvatars[7] },
  { id: 12, name: "Dr. Christopher Martinez", email: "christopher.martinez@school.com", role: "teacher", avatar: teacherAvatars[8] },
  { id: 13, name: "Mrs. Patricia Taylor", email: "patricia.taylor@school.com", role: "teacher", avatar: teacherAvatars[9] },
  { id: 14, name: "Mr. Daniel Clark", email: "daniel.clark@school.com", role: "teacher", avatar: teacherAvatars[10] },
  { id: 15, name: "Ms. Rebecca Hall", email: "rebecca.hall@school.com", role: "teacher", avatar: teacherAvatars[11] },
  { id: 16, name: "Dr. Kevin Rodriguez", email: "kevin.rodriguez@school.com", role: "teacher", avatar: teacherAvatars[12] },
  { id: 17, name: "Mrs. Stephanie Lewis", email: "stephanie.lewis@school.com", role: "teacher", avatar: teacherAvatars[13] },
  { id: 18, name: "Mr. Jason Walker", email: "jason.walker@school.com", role: "teacher", avatar: teacherAvatars[14] },
  // Student users
  ...[...Array(28)].map((_, i) => ({
    id: 19 + i,
    name: [
      "Alex Thompson", "Emma Davis", "James Wilson", "Sophia Lee", "Michael Chen", "Olivia Taylor", "William Brown", "Ava Johnson", "Ethan Miller", "Isabella Garcia",
      "Mason Rodriguez", "Mia Martinez", "Noah Anderson", "Charlotte White", "Liam Clark", "Harper Hall", "Evelyn Lewis", "Benjamin Walker", "Abigail Young", "Sebastian King",
      "Emily Wright", "Daniel Lopez", "Sofia Hill", "Matthew Scott", "Avery Green", "Ella Adams", "Jackson Baker", "Madison Nelson"
    ][i],
    email: [
      "alex.thompson@student.school.com", "emma.davis@student.school.com", "james.wilson@student.school.com", "sophia.lee@student.school.com", "michael.chen@student.school.com", "olivia.taylor@student.school.com", "william.brown@student.school.com", "ava.johnson@student.school.com", "ethan.miller@student.school.com", "isabella.garcia@student.school.com",
      "mason.rodriguez@student.school.com", "mia.martinez@student.school.com", "noah.anderson@student.school.com", "charlotte.white@student.school.com", "liam.clark@student.school.com", "harper.hall@student.school.com", "evelyn.lewis@student.school.com", "benjamin.walker@student.school.com", "abigail.young@student.school.com", "sebastian.king@student.school.com",
      "emily.wright@student.school.com", "daniel.lopez@student.school.com", "sofia.hill@student.school.com", "matthew.scott@student.school.com", "avery.green@student.school.com", "ella.adams@student.school.com", "jackson.baker@student.school.com", "madison.nelson@student.school.com"
    ][i],
    role: "student",
    avatar: studentAvatars[i % studentAvatars.length]
  }))
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
  const [isAdviserHovered, setIsAdviserHovered] = useState(false);
  const navigate = useNavigate();
  const adviserInputRef = useRef();

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

  // Adviser select custom option rendering
  const adviserOptions = userManagementUsers.filter(u => u.role === 'teacher').map(t => ({ value: t.id, label: t.name + ' (' + t.email + ')', avatar: t.avatar, name: t.name, email: t.email }));
  const AdviserOption = (props) => (
    <div {...props.innerProps} style={{ display: 'flex', alignItems: 'center', padding: 8, background: props.isFocused ? '#f6f9fc' : 'white' }}>
      <img src={props.data.avatar} alt={props.data.label} style={{ width: 28, height: 28, borderRadius: '50%', marginRight: 10, objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: 700, color: '#525F7F', fontSize: '0.74rem', lineHeight: 1 }}>{props.data.name}</span>
        <span style={{ color: '#7b8a9b', fontSize: '0.63rem', fontWeight: 400, marginTop: 1 }}>{props.data.email}</span>
      </div>
    </div>
  );
  const AdviserSingleValue = (props) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      borderRadius: 16,
      padding: '6px 0',
      margin: '2px 0',
    }}>
      <img src={props.data.avatar} alt={props.data.label} style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 8, objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: 700, color: '#525F7F', fontSize: '0.74rem', lineHeight: 1 }}>{props.data.name}</span>
        <span style={{ color: '#7b8a9b', fontSize: '0.63rem', fontWeight: 400, marginTop: 1 }}>{props.data.email}</span>
      </div>
    </div>
  );

  // Custom dropdown indicator to match native select
  const CustomDropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <svg width="12" height="12" viewBox="0 0 12 12" style={{ display: 'block' }}>
        <polyline points="2.5 4.5 6 8.5 9.5 4.5" stroke="#b5b5c3" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </components.DropdownIndicator>
  );

  return (
    <>
      <style>{`
        .student-pill {
          transition: background 0.15s, box-shadow 0.15s;
          font-size: 9px !important;
          background: #e6ecf3 !important;
          color: #525f7f;
          border-radius: 16px;
          padding: 10px 48px;
          margin: 2px 4px 2px 0;
          display: inline-flex;
          align-items: center;
          border: 1px solid #e9ecef;
          box-shadow: 0 1px 4px rgba(80,110,140,0.07);
        }
        .student-pill:hover {
          background: #d3dbe6 !important;
        }
        .student-pill-x {
          transition: color 0.15s;
          color: #b0b7c3 !important;
          margin-left: 8px;
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
        select.form-control-alternative {
          background-position: right 1.1rem center !important;
          background-repeat: no-repeat !important;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23b5b5c3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 9 12 12 9'/%3E%3C/svg%3E") !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
        }
        select.form-control-alternative::-ms-expand {
          display: none;
        }
        select.form-control-alternative:hover,
        input.form-control-alternative:hover {
          background-color: #f6fbff !important;
          border: 1.5px solid #c7e3fa !important;
          box-shadow: 0 0 4px 1.5px rgba(142, 202, 255, 0.10) !important;
          transition: background 0.18s, box-shadow 0.18s, border 0.18s;
        }
        select.form-control-alternative:focus,
        input.form-control-alternative:focus {
          border: 1.5px solid #8ecaff !important;
          box-shadow: 0 0 10px 3px rgba(142, 202, 255, 0.28) !important;
          background-color: #fff !important;
        }
        .react-select__control {
          border: 1.5px solid #e9ecef !important;
          background: #fff !important;
          transition: border-color .15s, box-shadow .15s, background .18s;
        }
        .react-select__control--is-focused {
          border: 1.5px solid #8ecaff !important;
          background: #fff !important;
          box-shadow: 0 0 10px 3px rgba(142, 202, 255, 0.28) !important;
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
                            title="Select Semester"
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
                          <div
                            title="Select Adviser"
                            onMouseEnter={() => setIsAdviserHovered(true)}
                            onMouseLeave={() => setIsAdviserHovered(false)}
                          >
                            <Select
                              id="adviser"
                              classNamePrefix="react-select"
                              options={adviserOptions}
                              value={adviserOptions.find(opt => String(opt.value) === String(adviser)) || null}
                              onChange={opt => {
                                setAdviser(opt ? opt.value : '');
                                // Blur the select after choosing an option
                                if (adviserInputRef.current) {
                                  adviserInputRef.current.blur();
                                }
                              }}
                              isClearable
                              isSearchable={false}
                              placeholder="Select Adviser..."
                              styles={{
                                control: (base, state) => ({
                                  ...base,
                                  minHeight: 44,
                                  height: 44,
                                  borderRadius: 8,
                                  borderColor: state.isFocused
                                    ? '#8ecaff'
                                    : isAdviserHovered
                                      ? '#c7e3fa'
                                      : '#e9ecef',
                                  borderWidth: '1.5px',
                                  borderStyle: 'solid',
                                  boxShadow: state.isFocused
                                    ? '0 0 10px 3px rgba(142, 202, 255, 0.28)'
                                    : isAdviserHovered
                                      ? '0 0 4px 1.5px rgba(142, 202, 255, 0.10)'
                                      : '0 2px 6px rgba(50,50,93,.11), 0 1.5px 0 rgba(0,0,0,.04)',
                                  backgroundColor: state.isFocused
                                    ? '#fff'
                                    : isAdviserHovered
                                      ? '#f6fbff'
                                      : '#fff',
                                  fontSize: '1rem',
                                  fontWeight: 400,
                                  color: '#8898aa',
                                  paddingLeft: 16,
                                  paddingRight: 56,
                                  fontFamily: 'inherit',
                                  transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out,background 0.18s',
                                  outline: 'none',
                                  appearance: 'none',
                                  position: 'relative',
                                  display: 'flex',
                                  alignItems: 'center',
                                }),
                                valueContainer: (base) => ({
                                  ...base,
                                  padding: 0,
                                  paddingLeft: 0,
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                }),
                                input: (base) => ({
                                  ...base,
                                  margin: 0,
                                  padding: 0,
                                }),
                                menu: (base) => ({ ...base, zIndex: 9999, borderRadius: 8, marginTop: 2 }),
                                menuList: (base) => ({ ...base, maxHeight: 160, paddingTop: 0, paddingBottom: 0 }),
                                option: (base, state) => ({
                                  ...base,
                                  backgroundColor: state.isSelected ? '#eaf4fb' : state.isFocused ? '#f6f9fc' : '#fff',
                                  color: '#222',
                                  fontWeight: 400,
                                  fontSize: '0.89rem',
                                  padding: '8px 12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                }),
                                singleValue: (base) => ({
                                  ...base,
                                  display: 'flex',
                                  alignItems: 'center',
                                  color: '#8898aa',
                                  height: '100%',
                                }),
                                placeholder: (base) => ({ ...base, color: '#8898aa', fontSize: '0.90rem', fontWeight: 400 }),
                                indicatorSeparator: () => ({ display: 'none' }),
                                dropdownIndicator: (base) => ({
                                  ...base,
                                  color: '#b5b5c3',
                                  padding: 0,
                                  width: 12,
                                  height: 44,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  display: 'flex',
                                  position: 'absolute',
                                  right: 20,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                }),
                                clearIndicator: (base, state) => ({
                                  ...base,
                                  color: state.isFocused ? '#e74c3c' : '#b0b7c3',
                                  transition: 'color 0.15s',
                                }),
                                Control: (props) => {
                                  return (
                                    <components.Control
                                      {...props}
                                      title="Select Adviser"
                                      onMouseEnter={() => setIsAdviserHovered(true)}
                                      onMouseLeave={() => setIsAdviserHovered(false)}
                                    />
                                  );
                                },
                              }}
                              components={{
                                Option: AdviserOption,
                                SingleValue: AdviserSingleValue,
                                DropdownIndicator: CustomDropdownIndicator,
                                Control: (props) => {
                                  return (
                                    <components.Control
                                      {...props}
                                      title="Select Adviser"
                                      onMouseEnter={() => setIsAdviserHovered(true)}
                                      onMouseLeave={() => setIsAdviserHovered(false)}
                                    />
                                  );
                                },
                              }}
                              title="Select Adviser"
                            />
                          </div>
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
                                  <FaTimes className="student-pill-x" style={{ marginLeft: 8, cursor: 'pointer', color: '#5e72e4', fontSize: 10 }} onClick={() => removeStudent(id)} />
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
                            filteredStudents.map((s) => (
                              <div
                                key={s.id}
                                className={`student-list-row${selectedStudents.includes(s.id) ? ' selected' : ''}`}
                                onClick={() => handleStudentCheck(s.id)}
                                style={{ display: 'flex', alignItems: 'center', padding: '6px 10px' }}
                              >
                                <img
                                  src={s.avatar}
                                  alt={s.name}
                                  style={{ width: 28, height: 28, borderRadius: '50%', marginRight: 10, objectFit: 'cover', border: '1px solid #e9ecef' }}
                                />
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: 500, fontSize: '0.97rem', color: '#425466' }}>{s.name}</div>
                                  <div style={{ fontSize: '0.85rem', color: '#7b8a9b' }}>{s.email}</div>
                                </div>
                                <div>
                                  {selectedStudents.includes(s.id) ? (
                                    <FaCheck color="#5e72e4" size={16} />
                                  ) : null}
                                </div>
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
                                  <FaTimes className="student-pill-x" style={{ marginLeft: 8, cursor: 'pointer', color: '#5e72e4', fontSize: 10 }} onClick={() => removeStudent(id)} />
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