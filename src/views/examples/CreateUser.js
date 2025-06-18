import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
  Modal,
  ModalBody,
  Container
} from "reactstrap";
import { QrReader } from "react-qr-reader";
import Header from "components/Headers/Header.js";
import { FaCamera, FaTrash } from "react-icons/fa";
import userDefault from "../../assets/img/theme/user-default.svg";
import Cropper from 'react-easy-crop';
import "./CreateUser.css";
import { useNavigate } from "react-router-dom";

const CreateUser = ({ editUser, editMode, onEditDone }) => {
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [section, setSection] = useState("");
  const [qrData, setQrData] = useState("");
  const [qrModal, setQrModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [cropModal, setCropModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [profileImageName, setProfileImageName] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [status, setStatus] = useState("active");

  const navigate = useNavigate();

  useEffect(() => {
    if (editMode && editUser) {
      setRole(editUser.role || "");
      setFullName(editUser.name || "");
      setAddress(editUser.address || "");
      setEmail(editUser.email || "");
      setPassword(editUser.password || "");
      setDepartment(editUser.department || "");
      setStudentNumber(editUser.studentNumber || "");
      setSection(editUser.section || "");
      setQrData(editUser.qrData || "");
      setProfileImageUrl(editUser.profileImageUrl || "");
      setProfileImageName("");
      setStatus(editUser.status || "active");
    }
  }, [editMode, editUser]);

  const handleQrScan = (result, error) => {
    if (!!result) {
      setQrData(result?.text);
      setQrModal(false);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageName(file.name);
      const url = URL.createObjectURL(file);
      setTempImage(url);
      setCropModal(true);
    }
  };

  const handleDeleteAvatar = () => {
    setProfileImage(null);
    setProfileImageUrl(null);
    setProfileImageName("");
  };

  const getCroppedImg = async (imageSrc, crop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = crop.width;
    canvas.height = crop.height;
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise((resolve) => {
      resolve(canvas.toDataURL('image/jpeg'));
    });
  };

  function createImage(url) {
    return new Promise((resolve, reject) => {
      const image = new window.Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });
  }

  const handleCropSave = async () => {
    const croppedUrl = await getCroppedImg(tempImage, croppedAreaPixels);
    setProfileImageUrl(croppedUrl);
    setProfileImage(null); // You can store the blob if you want
    setCropModal(false);
    setTempImage(null);
  };

  // Password strength checker
  function checkPasswordStrength(pw) {
    if (!pw) return "";
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (strong.test(pw)) return "strong";
    if (pw.length >= 6) return "medium";
    return "weak";
  }

  // Email format checker
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleCreateUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: editMode && editUser ? editUser.id : Date.now(),
      role,
      name: fullName,
      email,
      password,
      address,
      department,
      studentNumber,
      section,
      qrData,
      profileImageUrl,
      status,
      createdAt: editMode && editUser ? editUser.createdAt : new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
    let users = JSON.parse(localStorage.getItem('scms_users') || '[]');
    if (editMode && editUser) {
      users = users.map(u => String(u.id) === String(editUser.id) ? newUser : u);
    } else {
      users.push(newUser);
    }
    localStorage.setItem('scms_users', JSON.stringify(users));
    if (editMode && onEditDone) {
      onEditDone();
    } else {
      navigate('/admin/user-management');
    }
  };

  return (
    <>
      <Header compact />
      <Container className="mt-4" fluid>
        <Row>
          <Col className="order-xl-1 mx-auto" xl="8" lg="8" md="10">
            <Card className="bg-secondary shadow border-0 mt-5">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{editMode ? 'Update User Information' : 'Create New User'}</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="d-flex align-items-center justify-content-center mb-4">
                  <div style={{ position: 'relative', width: 120, height: 120 }}>
                    <img
                      alt="Profile Preview"
                      className="rounded-circle shadow"
                      src={profileImageUrl || userDefault}
                      style={{ width: 120, height: 120, objectFit: 'cover', border: '3px solid #fff' }}
                    />
                    {/* Bin button overlay at bottom-left */}
                    {profileImageUrl && profileImageUrl !== userDefault && (
                      <button
                        onClick={handleDeleteAvatar}
                        title="Delete avatar"
                        className="avatar-action-btn"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          background: '#F44336',
                          border: 'none',
                          borderRadius: '50%',
                          width: 32,
                          height: 32,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                          cursor: 'pointer',
                          outline: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                          zIndex: 2
                        }}
                      >
                        <FaTrash color="#fff" size={16} />
                      </button>
                    )}
                    <label
                      htmlFor="profileImageInput"
                      className="avatar-action-btn"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        cursor: 'pointer',
                        background: '#fff',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                        zIndex: 2
                      }}
                    >
                      <FaCamera color="#324cdd" size={16} />
                      <input
                        id="profileImageInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleProfileImageChange}
                      />
                    </label>
                  </div>
                  <div className="ml-4 d-flex flex-column align-items-start">
                    {profileImageName && (
                      <span className="text-muted small mt-2" style={{ wordBreak: 'break-all', maxWidth: 180 }}>
                        {profileImageName}
                      </span>
                    )}
                  </div>
                </div>
                <Form onSubmit={handleCreateUser}>
                  <h6 className="heading-small text-muted mb-4">User information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="role">Role</label>
                          <Input type="select" className="form-control-alternative" id="role" value={role} onChange={e => setRole(e.target.value)} required>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="fullName">Full Name</label>
                          <Input className="form-control-alternative" type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="email">Email</label>
                          <Input
                            className="form-control-alternative"
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => {
                              setEmail(e.target.value);
                              setEmailValid(validateEmail(e.target.value));
                            }}
                            required
                          />
                          {!emailValid && (
                            <small className="text-danger">Please enter a valid email address.</small>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="password">Password</label>
                          <Input
                            className="form-control-alternative"
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => {
                              setPassword(e.target.value);
                              setPasswordStrength(checkPasswordStrength(e.target.value));
                            }}
                            required
                          />
                          {password && (
                            <small className={
                              passwordStrength === 'strong' ? 'text-success' :
                              passwordStrength === 'medium' ? 'text-warning' :
                              'text-danger'
                            }>
                              Password strength: {passwordStrength}
                            </small>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Account Status</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="status">Status</label>
                          <Input type="select" className="form-control-alternative" id="status" value={status} onChange={e => setStatus(e.target.value)} required>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {/* Conditionally render details based on role */}
                  {role === 'teacher' && (
                    <>
                      <hr className="my-4" />
                      <h6 className="heading-small text-muted mb-4">Teacher Details</h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label" htmlFor="address">Address</label>
                              <Input className="form-control-alternative" type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label" htmlFor="department">Department</label>
                              <Input className="form-control-alternative" type="text" id="department" value={department} onChange={e => setDepartment(e.target.value)} />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </>
                  )}
                  {role === 'student' && (
                    <>
                      <hr className="my-4" />
                      <h6 className="heading-small text-muted mb-4">Student Details</h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label" htmlFor="address">Address</label>
                              <Input className="form-control-alternative" type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label" htmlFor="studentNumber">Student Number</label>
                              <Input className="form-control-alternative" type="text" id="studentNumber" value={studentNumber} onChange={e => setStudentNumber(e.target.value)} />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label" htmlFor="section">Section</label>
                              <Input className="form-control-alternative" type="text" id="section" value={section} onChange={e => setSection(e.target.value)} />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label" htmlFor="department">Department</label>
                              <Input className="form-control-alternative" type="text" id="department" value={department} onChange={e => setDepartment(e.target.value)} />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                      <h6 className="heading-small text-muted mb-4">QR Code</h6>
                      <div className="pl-lg-4">
                        <FormGroup>
                          <label className="form-control-label">QR Code</label>
                          <div className="d-flex align-items-center">
                            <Input className="form-control-alternative mr-2" type="text" value={qrData} readOnly placeholder="Scan QR code..." />
                            <label
                              htmlFor="qrScanButton"
                              className="btn btn-info btn-sm mb-0"
                              style={{ cursor: 'pointer' }}
                              onClick={() => setQrModal(true)}
                            >
                              <i className="ni ni-camera-compact mr-1" /> Scan
                            </label>
                          </div>
                        </FormGroup>
                      </div>
                    </>
                  )}
                  <div className="text-center">
                    <Button color="primary" type="submit">
                      {editMode ? 'Update User' : 'Create User'}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Modal isOpen={qrModal} toggle={() => setQrModal(!qrModal)} centered>
              <ModalBody>
                <div className="d-flex justify-content-center mb-3">
                  <div style={{ width: 320, height: 300 }}>
                    <QrReader
                      constraints={{ facingMode: "environment" }}
                      onResult={handleQrScan}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <Button color="secondary" onClick={() => setQrModal(false)}>
                    Close
                  </Button>
                </div>
              </ModalBody>
            </Modal>
            <Modal isOpen={cropModal} toggle={() => setCropModal(false)} centered size="lg">
              <ModalBody>
                <div style={{ position: 'relative', width: '100%', height: 300, background: '#333' }}>
                  {tempImage && (
                    <Cropper
                      image={tempImage}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  )}
                </div>
                <div className="d-flex align-items-center mt-3">
                  <span className="mr-2">Zoom</span>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={e => setZoom(Number(e.target.value))}
                    style={{ width: 200 }}
                  />
                </div>
                <div className="text-center mt-3">
                  <Button color="primary" onClick={handleCropSave} className="mr-2">Save</Button>
                  <Button color="secondary" outline onClick={() => setCropModal(false)}>Cancel</Button>
                </div>
              </ModalBody>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateUser; 