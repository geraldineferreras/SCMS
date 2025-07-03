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
/*eslint-disable*/
import React, { useState } from "react";
import { Link, NavLink as NavLinkRRD, useLocation } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

var ps;

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const [isSidebarSearchFocused, setIsSidebarSearchFocused] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const location = props.location || window.location;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes
      .filter(prop => !prop.hidden)
      .map((prop, key) => {
        // Collapsible Reports & Logs section
        if (prop.path === "/reports-and-logs") {
          // Only active if a sub-route is active
          const subRoutes = [
            "/admin/reports-and-logs/attendance",
            "/admin/reports-and-logs/grades",
            "/admin/reports-and-logs/audit"
          ];
          const isActive = subRoutes.includes(location.pathname);

          return (
            <div key={key}>
              <NavItem>
                <button
                  className={`nav-link d-flex align-items-center${isActive ? " active" : ""}`}
                  style={{ 
                    padding: "0.75rem 1rem", 
                    fontWeight: 400, 
                    color: isActive ? "#fb6340" : "#525f7f", 
                    fontSize: "1rem", 
                    marginLeft: '8px', 
                    position: 'relative',
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                  onClick={e => { e.preventDefault(); setReportsOpen(!reportsOpen); }}
                >
                  <i className="ni ni-single-copy-04" style={{ marginRight: 8, fontSize: 18, position: 'relative', top: '-2px', verticalAlign: 'middle', color: '#fb6340' }} />
                  Reports & Logs
                  <i className={`fa fa-chevron-${reportsOpen ? "down" : "right"}`} style={{ position: 'absolute', right: -8, fontSize: 13, color: "#8898aa" }} />
                </button>
              </NavItem>
              {reportsOpen && (
                <div style={{ marginLeft: 32 }}>
                  <NavItem>
                    <NavLink
                      to="/admin/reports-and-logs/attendance"
                      tag={NavLinkRRD}
                      className={location.pathname.startsWith("/admin/reports-and-logs/attendance") ? "active" : ""}
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        padding: "0.5rem 1rem", 
                        fontSize: "0.97rem",
                        color: location.pathname.startsWith("/admin/reports-and-logs/attendance") ? "#fb6340" : "#525f7f"
                      }}
                      onClick={closeCollapse}
                    >
                      <i className="ni ni-calendar-grid-58 mr-2" /> Attendance Log
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/admin/reports-and-logs/grades"
                      tag={NavLinkRRD}
                      className={location.pathname.startsWith("/admin/reports-and-logs/grades") ? "active" : ""}
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        padding: "0.5rem 1rem", 
                        fontSize: "0.97rem",
                        color: location.pathname.startsWith("/admin/reports-and-logs/grades") ? "#fb6340" : "#525f7f"
                      }}
                      onClick={closeCollapse}
                    >
                      <i className="ni ni-hat-3 mr-2" /> Grades Log
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/admin/reports-and-logs/audit"
                      tag={NavLinkRRD}
                      className={location.pathname.startsWith("/admin/reports-and-logs/audit") ? "active" : ""}
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        padding: "0.5rem 1rem", 
                        fontSize: "0.97rem",
                        color: location.pathname.startsWith("/admin/reports-and-logs/audit") ? "#fb6340" : "#525f7f"
                      }}
                      onClick={closeCollapse}
                    >
                      <i className="ni ni-archive-2 mr-2" /> Audit Log
                    </NavLink>
                  </NavItem>
                </div>
              )}
            </div>
          );
        }
        
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
            >
              <i className={prop.icon} style={{ marginRight: 8, fontSize: 18, position: 'relative', top: '-2px', verticalAlign: 'middle' }} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/team-1-800x800.jpg")}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className={isSidebarSearchFocused ? 'focused' : ''} style={{ width: '100%', marginBottom: '6px' }}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-search" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Search"
                type="search"
                style={{ minWidth: 0 }}
                onFocus={() => setIsSidebarSearchFocused(true)}
                onBlur={() => setIsSidebarSearchFocused(false)}
              />
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
          <h6 className="navbar-heading text-muted">Documentation</h6>
          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Getting started
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
                <i className="ni ni-palette" />
                Foundation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="ni ni-ui-04" />
                Components
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
