import React, { useState, useEffect, useMemo, useRef } from "react";
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
import classnames from "classnames";
import Header from "components/Headers/Header.js";
import userDefault from "../../assets/img/theme/user-default.svg";
import { useEffect as useClickEffect } from 'react';

const AttendanceLog = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState("studentName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [activeCourseTab, setActiveCourseTab] = useState("bsit");
  const [viewMode, setViewMode] = useState("table");
  const [isMobile, setIsMobile] = useState(false);
  const [activeYear, setActiveYear] = useState(0); // 0 = All Years
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('year');
  const tabRefs = useRef({});
  const dropdownRef = useRef();

  // Mock mapping of subjects to teachers
  const subjectTeachers = {
    "Programming 1": "Mr. Cruz",
    "Programming 2": "Ms. Reyes",
    "Data Structures": "Mr. Garcia",
    "Database Management": "Mrs. David",
    "Web Development": "Ms. Santos",
    "Software Engineering": "Mr. Lee",
    "Computer Networks": "Ms. Tan",
    "Operating Systems": "Mr. Ramos",
    "Information Security": "Ms. Lim",
    "Mobile Development": "Mr. Dela Cruz",
    "Artificial Intelligence": "Ms. Torres",
    "Machine Learning": "Mr. Mendoza",
    "Computer Architecture": "Ms. Navarro",
    "Software Testing": "Mr. Villanueva",
    "Project Management": "Ms. Bautista",
    "IT Ethics": "Mr. Hernandez"
  };

  // Mock mapping of teacher names to avatar URLs
  const teacherAvatars = {
    "Mr. Cruz": require("../../assets/img/theme/team-1-800x800.jpg"),
    "Ms. Reyes": require("../../assets/img/theme/team-2-800x800.jpg"),
    "Mr. Garcia": require("../../assets/img/theme/team-3-800x800.jpg"),
    "Mrs. David": require("../../assets/img/theme/team-4-800x800.jpg"),
    "Ms. Santos": "https://randomuser.me/api/portraits/women/44.jpg",
    "Mr. Lee": "https://randomuser.me/api/portraits/men/45.jpg",
    "Ms. Tan": "https://randomuser.me/api/portraits/women/46.jpg",
    "Mr. Ramos": "https://randomuser.me/api/portraits/men/47.jpg",
    "Ms. Lim": "https://randomuser.me/api/portraits/women/48.jpg",
    "Mr. Dela Cruz": "https://randomuser.me/api/portraits/men/49.jpg",
    "Ms. Torres": "https://randomuser.me/api/portraits/women/50.jpg",
    "Mr. Mendoza": "https://randomuser.me/api/portraits/men/51.jpg",
    "Ms. Navarro": "https://randomuser.me/api/portraits/women/52.jpg",
    "Mr. Villanueva": "https://randomuser.me/api/portraits/men/53.jpg",
    "Ms. Bautista": "https://randomuser.me/api/portraits/women/54.jpg",
    "Mr. Hernandez": "https://randomuser.me/api/portraits/men/55.jpg"
  };

  // Mock mapping of teacher names to emails
  const teacherEmails = {
    "Mr. Cruz": "cruz@dhvsu.edu.ph",
    "Ms. Reyes": "reyes@dhvsu.edu.ph",
    "Mr. Garcia": "garcia@dhvsu.edu.ph",
    "Mrs. David": "david@dhvsu.edu.ph",
    "Ms. Santos": "santos@dhvsu.edu.ph",
    "Mr. Lee": "lee@dhvsu.edu.ph",
    "Ms. Tan": "tan@dhvsu.edu.ph",
    "Mr. Ramos": "ramos@dhvsu.edu.ph",
    "Ms. Lim": "lim@dhvsu.edu.ph",
    "Mr. Dela Cruz": "delacruz@dhvsu.edu.ph",
    "Ms. Torres": "torres@dhvsu.edu.ph",
    "Mr. Mendoza": "mendoza@dhvsu.edu.ph",
    "Ms. Navarro": "navarro@dhvsu.edu.ph",
    "Mr. Villanueva": "villanueva@dhvsu.edu.ph",
    "Ms. Bautista": "bautista@dhvsu.edu.ph",
    "Mr. Hernandez": "hernandez@dhvsu.edu.ph"
  };

  // Helper to get avatar for user (copied from UserManagement)
  const getAvatarForUser = (user, users = []) => {
    if (!user) return userDefault;
    if (user.profileImageUrl && user.profileImageUrl !== userDefault) {
      return user.profileImageUrl;
    }
    if (user.role === 'student') {
      // Give ALL students real avatars
      return getRandomAvatar(user.id);
    }
    return userDefault;
  };

  // Generate random avatar for real people (copied from UserManagement)
  const getRandomAvatar = (userId) => {
    const avatarUrls = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face"
    ];
    
    // Use userId to consistently get the same avatar for the same user
    const index = Math.abs(userId.toString().split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % avatarUrls.length;
    return avatarUrls[index];
  };

  const courses = [
    { id: "bsit", abbr: "BSIT", name: "Info Tech" },
    { id: "bscs", abbr: "BSCS", name: "Computer Science" },
    { id: "bsis", abbr: "BSIS", name: "Info Systems" },
    { id: "act", abbr: "ACT", name: "Computer Technology" },
  ];

  const sections = ["BSIT-1A", "BSIT-1B", "BSIT-1C", "BSIT-2A", "BSIT-2B"];
  const subjects = [
    "Programming 1", "Programming 2", "Data Structures", "Database Management", 
    "Web Development", "Software Engineering", "Computer Networks", "Operating Systems",
    "Information Security", "Mobile Development", "Artificial Intelligence", "Machine Learning",
    "Computer Architecture", "Software Testing", "Project Management", "IT Ethics"
  ];
  const statuses = ["Present", "Late", "Absent"];

  // Get students from UserManagement (simulate import or shared state)
  const allUsers = [
    { id: 19, name: "Alex Thompson", email: "alex.thompson@student.school.com", role: "student", section: "BSIT-1A", course: "bsit", profileImageUrl: null },
    { id: 20, name: "Emma Davis", email: "emma.davis@student.school.com", role: "student", section: "BSIT-2A", course: "bsit", profileImageUrl: null },
    { id: 21, name: "Michael Chen", email: "michael.chen@student.school.com", role: "student", section: "BSIT-1B", course: "bsit", profileImageUrl: null },
    { id: 22, name: "Sarah Johnson", email: "sarah.johnson@student.school.com", role: "student", section: "BSIT-1C", course: "bsit", profileImageUrl: null },
    { id: 23, name: "David Wilson", email: "david.wilson@student.school.com", role: "student", section: "BSIT-2B", course: "bsit", profileImageUrl: null },
    { id: 24, name: "Lisa Rodriguez", email: "lisa.rodriguez@student.school.com", role: "student", section: "BSCS-1A", course: "bscs", profileImageUrl: null },
    { id: 25, name: "James Brown", email: "james.brown@student.school.com", role: "student", section: "BSCS-1B", course: "bscs", profileImageUrl: null },
    { id: 26, name: "Maria Garcia", email: "maria.garcia@student.school.com", role: "student", section: "BSCS-2A", course: "bscs", profileImageUrl: null },
    { id: 27, name: "Robert Taylor", email: "robert.taylor@student.school.com", role: "student", section: "BSIS-1A", course: "bsis", profileImageUrl: null },
    { id: 28, name: "Jennifer Lee", email: "jennifer.lee@student.school.com", role: "student", section: "BSIS-1B", course: "bsis", profileImageUrl: null },
    { id: 29, name: "Christopher Martinez", email: "christopher.martinez@student.school.com", role: "student", section: "ACT-1A", course: "act", profileImageUrl: null },
    { id: 30, name: "Amanda White", email: "amanda.white@student.school.com", role: "student", section: "ACT-1B", course: "act", profileImageUrl: null },
    { id: 31, name: "Daniel Anderson", email: "daniel.anderson@student.school.com", role: "student", section: "BSIT-3A", course: "bsit", profileImageUrl: null },
    { id: 32, name: "Jessica Thomas", email: "jessica.thomas@student.school.com", role: "student", section: "BSIT-3B", course: "bsit", profileImageUrl: null },
    { id: 33, name: "Kevin Moore", email: "kevin.moore@student.school.com", role: "student", section: "BSCS-3A", course: "bscs", profileImageUrl: null },
    { id: 34, name: "Nicole Jackson", email: "nicole.jackson@student.school.com", role: "student", section: "BSIS-2A", course: "bsis", profileImageUrl: null },
    { id: 35, name: "Steven Martin", email: "steven.martin@student.school.com", role: "student", section: "ACT-2A", course: "act", profileImageUrl: null },
    { id: 36, name: "Rachel Clark", email: "rachel.clark@student.school.com", role: "student", section: "BSIT-4A", course: "bsit", profileImageUrl: null },
    { id: 37, name: "Brian Lewis", email: "brian.lewis@student.school.com", role: "student", section: "BSCS-4A", course: "bscs", profileImageUrl: null },
    { id: 38, name: "Michelle Hall", email: "michelle.hall@student.school.com", role: "student", section: "BSIS-3A", course: "bsis", profileImageUrl: null },
    { id: 39, name: "Ryan Scott", email: "ryan.scott@student.school.com", role: "student", section: "BSIT-1A", course: "bsit", profileImageUrl: null },
    { id: 40, name: "Ashley Green", email: "ashley.green@student.school.com", role: "student", section: "BSIT-1B", course: "bsit", profileImageUrl: null },
    { id: 41, name: "Matthew Adams", email: "matthew.adams@student.school.com", role: "student", section: "BSIT-1C", course: "bsit", profileImageUrl: null },
    { id: 42, name: "Emily Baker", email: "emily.baker@student.school.com", role: "student", section: "BSIT-2A", course: "bsit", profileImageUrl: null },
    { id: 43, name: "Joshua Nelson", email: "joshua.nelson@student.school.com", role: "student", section: "BSIT-2B", course: "bsit", profileImageUrl: null },
    { id: 44, name: "Samantha Carter", email: "samantha.carter@student.school.com", role: "student", section: "BSIT-3A", course: "bsit", profileImageUrl: null },
    { id: 45, name: "Andrew Mitchell", email: "andrew.mitchell@student.school.com", role: "student", section: "BSIT-3B", course: "bsit", profileImageUrl: null },
    { id: 46, name: "Lauren Perez", email: "lauren.perez@student.school.com", role: "student", section: "BSIT-4A", course: "bsit", profileImageUrl: null },
    { id: 47, name: "Brandon Roberts", email: "brandon.roberts@student.school.com", role: "student", section: "BSIT-4B", course: "bsit", profileImageUrl: null },
    { id: 48, name: "Hannah Turner", email: "hannah.turner@student.school.com", role: "student", section: "BSCS-1A", course: "bscs", profileImageUrl: null },
    { id: 49, name: "Tyler Phillips", email: "tyler.phillips@student.school.com", role: "student", section: "BSCS-1B", course: "bscs", profileImageUrl: null },
    { id: 50, name: "Megan Campbell", email: "megan.campbell@student.school.com", role: "student", section: "BSCS-1C", course: "bscs", profileImageUrl: null },
    { id: 51, name: "Justin Parker", email: "justin.parker@student.school.com", role: "student", section: "BSCS-2A", course: "bscs", profileImageUrl: null },
    { id: 52, name: "Victoria Evans", email: "victoria.evans@student.school.com", role: "student", section: "BSCS-2B", course: "bscs", profileImageUrl: null },
    { id: 53, name: "Nathan Edwards", email: "nathan.edwards@student.school.com", role: "student", section: "BSCS-3A", course: "bscs", profileImageUrl: null },
    { id: 54, name: "Stephanie Collins", email: "stephanie.collins@student.school.com", role: "student", section: "BSCS-3B", course: "bscs", profileImageUrl: null },
    { id: 55, name: "Jonathan Stewart", email: "jonathan.stewart@student.school.com", role: "student", section: "BSCS-4A", course: "bscs", profileImageUrl: null },
    { id: 56, name: "Rebecca Morris", email: "rebecca.morris@student.school.com", role: "student", section: "BSCS-4B", course: "bscs", profileImageUrl: null },
    { id: 57, name: "Patrick Rogers", email: "patrick.rogers@student.school.com", role: "student", section: "BSIS-1A", course: "bsis", profileImageUrl: null },
    { id: 58, name: "Kimberly Reed", email: "kimberly.reed@student.school.com", role: "student", section: "BSIS-1B", course: "bsis", profileImageUrl: null },
    { id: 59, name: "Gregory Cook", email: "gregory.cook@student.school.com", role: "student", section: "BSIS-1C", course: "bsis", profileImageUrl: null },
    { id: 60, name: "Christine Morgan", email: "christine.morgan@student.school.com", role: "student", section: "BSIS-2A", course: "bsis", profileImageUrl: null },
    { id: 61, name: "Sean Bell", email: "sean.bell@student.school.com", role: "student", section: "BSIS-2B", course: "bsis", profileImageUrl: null },
    { id: 62, name: "Amber Murphy", email: "amber.murphy@student.school.com", role: "student", section: "BSIS-3A", course: "bsis", profileImageUrl: null },
    { id: 63, name: "Timothy Bailey", email: "timothy.bailey@student.school.com", role: "student", section: "BSIS-3B", course: "bsis", profileImageUrl: null },
    { id: 64, name: "Danielle Rivera", email: "danielle.rivera@student.school.com", role: "student", section: "BSIS-4A", course: "bsis", profileImageUrl: null },
    { id: 65, name: "Corey Cooper", email: "corey.cooper@student.school.com", role: "student", section: "BSIS-4B", course: "bsis", profileImageUrl: null },
    { id: 66, name: "Melissa Richardson", email: "melissa.richardson@student.school.com", role: "student", section: "ACT-1A", course: "act", profileImageUrl: null },
    { id: 67, name: "Adam Cox", email: "adam.cox@student.school.com", role: "student", section: "ACT-1B", course: "act", profileImageUrl: null },
    { id: 68, name: "Tiffany Howard", email: "tiffany.howard@student.school.com", role: "student", section: "ACT-1C", course: "act", profileImageUrl: null },
    { id: 69, name: "Derek Ward", email: "derek.ward@student.school.com", role: "student", section: "ACT-2A", course: "act", profileImageUrl: null },
    { id: 70, name: "Heather Torres", email: "heather.torres@student.school.com", role: "student", section: "ACT-2B", course: "act", profileImageUrl: null },
    { id: 71, name: "Travis Peterson", email: "travis.peterson@student.school.com", role: "student", section: "ACT-3A", course: "act", profileImageUrl: null },
    { id: 72, name: "Crystal Gray", email: "crystal.gray@student.school.com", role: "student", section: "ACT-3B", course: "act", profileImageUrl: null },
    { id: 73, name: "Marcus Ramirez", email: "marcus.ramirez@student.school.com", role: "student", section: "ACT-4A", course: "act", profileImageUrl: null },
    { id: 74, name: "Natalie James", email: "natalie.james@student.school.com", role: "student", section: "ACT-4B", course: "act", profileImageUrl: null },
    { id: 75, name: "Zachary Watson", email: "zachary.watson@student.school.com", role: "student", section: "BSIT-1A", course: "bsit", profileImageUrl: null },
    { id: 76, name: "Vanessa Brooks", email: "vanessa.brooks@student.school.com", role: "student", section: "BSIT-1B", course: "bsit", profileImageUrl: null },
    { id: 77, name: "Jordan Kelly", email: "jordan.kelly@student.school.com", role: "student", section: "BSIT-1C", course: "bsit", profileImageUrl: null },
    { id: 78, name: "Monica Sanders", email: "monica.sanders@student.school.com", role: "student", section: "BSIT-2A", course: "bsit", profileImageUrl: null },
    { id: 79, name: "Austin Price", email: "austin.price@student.school.com", role: "student", section: "BSIT-2B", course: "bsit", profileImageUrl: null },
    { id: 80, name: "Brittany Bennett", email: "brittany.bennett@student.school.com", role: "student", section: "BSIT-3A", course: "bsit", profileImageUrl: null },
    { id: 81, name: "Corey Wood", email: "corey.wood@student.school.com", role: "student", section: "BSIT-3B", course: "bsit", profileImageUrl: null },
    { id: 82, name: "Erica Barnes", email: "erica.barnes@student.school.com", role: "student", section: "BSIT-4A", course: "bsit", profileImageUrl: null },
    { id: 83, name: "Trevor Ross", email: "trevor.ross@student.school.com", role: "student", section: "BSIT-4B", course: "bsit", profileImageUrl: null },
    { id: 84, name: "Lindsey Henderson", email: "lindsey.henderson@student.school.com", role: "student", section: "BSCS-1A", course: "bscs", profileImageUrl: null },
    { id: 85, name: "Garrett Coleman", email: "garrett.coleman@student.school.com", role: "student", section: "BSCS-1B", course: "bscs", profileImageUrl: null },
    { id: 86, name: "Chelsea Jenkins", email: "chelsea.jenkins@student.school.com", role: "student", section: "BSCS-1C", course: "bscs", profileImageUrl: null },
    { id: 87, name: "Devin Perry", email: "devin.perry@student.school.com", role: "student", section: "BSCS-2A", course: "bscs", profileImageUrl: null },
    { id: 88, name: "Misty Powell", email: "misty.powell@student.school.com", role: "student", section: "BSCS-2B", course: "bscs", profileImageUrl: null },
    { id: 89, name: "Blake Long", email: "blake.long@student.school.com", role: "student", section: "BSCS-3A", course: "bscs", profileImageUrl: null },
    { id: 90, name: "Tara Patterson", email: "tara.patterson@student.school.com", role: "student", section: "BSCS-3B", course: "bscs", profileImageUrl: null },
    { id: 91, name: "Colin Hughes", email: "colin.hughes@student.school.com", role: "student", section: "BSCS-4A", course: "bscs", profileImageUrl: null },
    { id: 92, name: "Jenna Flores", email: "jenna.flores@student.school.com", role: "student", section: "BSCS-4B", course: "bscs", profileImageUrl: null },
    { id: 93, name: "Marshall Washington", email: "marshall.washington@student.school.com", role: "student", section: "BSIS-1A", course: "bsis", profileImageUrl: null },
    { id: 94, name: "Kara Butler", email: "kara.butler@student.school.com", role: "student", section: "BSIS-1B", course: "bsis", profileImageUrl: null },
    { id: 95, name: "Damon Simmons", email: "damon.simmons@student.school.com", role: "student", section: "BSIS-1C", course: "bsis", profileImageUrl: null },
    { id: 96, name: "Lacey Foster", email: "lacey.foster@student.school.com", role: "student", section: "BSIS-2A", course: "bsis", profileImageUrl: null },
    { id: 97, name: "Kirk Gonzales", email: "kirk.gonzales@student.school.com", role: "student", section: "BSIS-2B", course: "bsis", profileImageUrl: null },
    { id: 98, name: "Whitney Bryant", email: "whitney.bryant@student.school.com", role: "student", section: "BSIS-3A", course: "bsis", profileImageUrl: null },
    { id: 99, name: "Chad Alexander", email: "chad.alexander@student.school.com", role: "student", section: "BSIS-3B", course: "bsis", profileImageUrl: null },
    { id: 100, name: "Stacy Russell", email: "stacy.russell@student.school.com", role: "student", section: "BSIS-4A", course: "bsis", profileImageUrl: null },
    { id: 101, name: "Trent Griffin", email: "trent.griffin@student.school.com", role: "student", section: "BSIS-4B", course: "bsis", profileImageUrl: null },
    { id: 102, name: "Mandy Diaz", email: "mandy.diaz@student.school.com", role: "student", section: "ACT-1A", course: "act", profileImageUrl: null },
    { id: 103, name: "Wade Hayes", email: "wade.hayes@student.school.com", role: "student", section: "ACT-1B", course: "act", profileImageUrl: null },
    { id: 104, name: "Tracy Myers", email: "tracy.myers@student.school.com", role: "student", section: "ACT-1C", course: "act", profileImageUrl: null },
    { id: 105, name: "Brent Ford", email: "brent.ford@student.school.com", role: "student", section: "ACT-2A", course: "act", profileImageUrl: null },
    { id: 106, name: "Candace Hamilton", email: "candace.hamilton@student.school.com", role: "student", section: "ACT-2B", course: "act", profileImageUrl: null },
    { id: 107, name: "Dustin Graham", email: "dustin.graham@student.school.com", role: "student", section: "ACT-3A", course: "act", profileImageUrl: null },
    { id: 108, name: "Lorraine Sullivan", email: "lorraine.sullivan@student.school.com", role: "student", section: "ACT-3B", course: "act", profileImageUrl: null },
    { id: 109, name: "Erik Wallace", email: "erik.wallace@student.school.com", role: "student", section: "ACT-4A", course: "act", profileImageUrl: null },
    { id: 110, name: "Gina Cole", email: "gina.cole@student.school.com", role: "student", section: "ACT-4B", course: "act", profileImageUrl: null },
  ];
  const students = allUsers.filter(u => u.role === 'student');

  // Year options
  const yearOptions = ['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year'];

  // Section options for the selected course and year
  const sectionOptions = students
    .filter(s => s.course === activeCourseTab && (activeYear === 0 || s.section?.toLowerCase().includes(yearOptions[activeYear][0])))
    .map(s => s.section)
    .filter((v, i, arr) => v && arr.indexOf(v) === i);

  // Subject options for the selected course
  const subjectOptions = useMemo(() => {
    // Filter subjects based on course (you can customize this logic)
    const courseSubjects = {
      bsit: subjects.filter(subject => 
        subject.includes("Programming") || 
        subject.includes("Web") || 
        subject.includes("Database") ||
        subject.includes("Software") ||
        subject.includes("Computer") ||
        subject.includes("Information") ||
        subject.includes("Mobile") ||
        subject.includes("Project") ||
        subject.includes("IT")
      ),
      bscs: subjects.filter(subject => 
        subject.includes("Programming") || 
        subject.includes("Data") || 
        subject.includes("Computer") ||
        subject.includes("Software") ||
        subject.includes("Artificial") ||
        subject.includes("Machine") ||
        subject.includes("Architecture") ||
        subject.includes("Testing")
      ),
      bsis: subjects.filter(subject => 
        subject.includes("Information") || 
        subject.includes("Database") || 
        subject.includes("Web") ||
        subject.includes("Software") ||
        subject.includes("Computer") ||
        subject.includes("Project") ||
        subject.includes("IT") ||
        subject.includes("Security")
      ),
      act: subjects.filter(subject => 
        subject.includes("Computer") || 
        subject.includes("Programming") || 
        subject.includes("Web") ||
        subject.includes("Database") ||
        subject.includes("Information") ||
        subject.includes("IT") ||
        subject.includes("Project") ||
        subject.includes("Security")
      )
    };
    return courseSubjects[activeCourseTab] || subjects;
  }, [activeCourseTab]);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setAttendanceData(sampleData);
      setFilteredData(sampleData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, dateRange, selectedSection, selectedSubject, selectedStatus, attendanceData, activeCourseTab, activeYear]);

  const filterData = () => {
    let filtered = attendanceData.filter(item => item.course === activeCourseTab);

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.subject && item.subject.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter((item) => item.date >= dateRange.start);
    }
    if (dateRange.end) {
      filtered = filtered.filter((item) => item.date <= dateRange.end);
    }

    // Year filter
    if (activeYear !== 0) {
      filtered = filtered.filter(item => item.section && item.section.toLowerCase().includes(yearOptions[activeYear][0]));
    }

    // Section filter
    if (selectedSection) {
      filtered = filtered.filter((item) => item.section === selectedSection);
    }

    // Subject filter
    if (selectedSubject) {
      filtered = filtered.filter((item) => item.subject === selectedSubject);
    }

    // Status filter
    if (selectedStatus) {
      filtered = filtered.filter((item) => item.status === selectedStatus);
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "Present":
        return <Badge color="success">{status}</Badge>;
      case "Late":
        return <Badge color="warning">{status}</Badge>;
      case "Absent":
        return <Badge color="danger">{status}</Badge>;
      default:
        return <Badge color="secondary">{status}</Badge>;
    }
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Student Name,Section,Date,Time In,Status\n"
      + filteredData.map(row => 
          `${row.studentName},${row.section},${row.date},${row.timeIn || ""},${row.status}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    // PDF export functionality would go here
    alert("PDF export functionality would be implemented here");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // Pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Get current course name
  const currentCourseName = courses.find(course => course.id === activeCourseTab)?.name || "Info Tech";

  // Helper to get year label from activeYear
  const getYearLabel = (activeYear) => {
    const yearNames = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
    return activeYear > 0 ? yearNames[activeYear - 1] : '';
  };

  // Helper to get current section label
  const getSectionLabel = (selectedSection) => selectedSection || '';

  // Helper function to format course information for each row
  const getCourseInfo = (item) => {
    const course = courses.find(c => c.id === item.course);
    const courseName = course ? course.abbr : item.course?.toUpperCase() || 'N/A';
    // Extract year from section (e.g., "BSIT-1A" -> "1st Year")
    let year = '';
    if (item.section) {
      const yearMatch = item.section.match(/-(\d+)/);
      if (yearMatch) {
        const yearNum = parseInt(yearMatch[1]);
        const yearNames = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
        year = yearNames[yearNum - 1] || `${yearNum}th Year`;
      }
    }
    return {
      course: courseName,
      year: year,
      section: item.section || 'N/A'
    };
  };

  // Helper to build the display string
  const getCourseDisplay = () => {
    const sectionLabel = getSectionLabel(selectedSection);
    const subjectLabel = selectedSubject;
    
    if (sectionLabel && subjectLabel) {
      return `${sectionLabel} • ${subjectLabel} (${filteredData.length})`;
    } else if (sectionLabel) {
      return `${sectionLabel} (${filteredData.length})`;
    } else if (subjectLabel) {
      return `${subjectLabel} (${filteredData.length})`;
    }
    
    let display = currentCourseName;
    const yearLabel = getYearLabel(activeYear);
    if (yearLabel) display += ` • ${yearLabel}`;
    display += ` (${filteredData.length})`;
    return display;
  };

  // For demo, generate attendance records for each student
  const sampleData = students.map((student, i) => {
    const subject = subjects[i % subjects.length];
    const teacher = subjectTeachers[subject] || 'N/A';
    return {
      id: student.id,
      studentName: student.name,
      email: student.email,
      section: student.section || "BSIT-1A",
      course: student.course || "bsit",
      subject,
      teacher,
      teacherAvatar: teacherAvatars[teacher] || userDefault,
      teacherEmail: teacherEmails[teacher] || '',
      date: `2024-01-${15 + (i % 5)}`,
      timeIn: i % 3 === 0 ? "08:30" : i % 3 === 1 ? "08:45" : "",
      status: i % 3 === 0 ? "Present" : i % 3 === 1 ? "Late" : "Absent",
      profileImageUrl: student.profileImageUrl,
      user: student
    };
  });

  useClickEffect(() => {
    if (!showFilterDropdown) return;
    function handleClickOutside(event) {
      const dropdown = document.querySelector('.course-filter-dropdown');
      if (dropdown && !dropdown.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilterDropdown]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner color="primary" />
        <p className="mt-2">Loading attendance data...</p>
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
                          <NavItem key={course.id} style={{ position: 'relative' }}>
                            <NavLink
                              className={classnames({ active: activeCourseTab === course.id })}
                              onClick={e => {
                                e.preventDefault();
                                setActiveCourseTab(course.id);
                                setShowFilterDropdown(activeCourseTab === course.id ? !showFilterDropdown : true);
                                setActiveFilterTab('year');
                              }}
                              style={{
                                cursor: 'pointer',
                                borderBottom: activeCourseTab === course.id ? '3px solid #5e72e4' : 'none',
                              }}
                            >
                              {course.abbr}
                            </NavLink>
                            {activeCourseTab === course.id && showFilterDropdown && (
                              <div
                                className="course-filter-dropdown"
                                style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: '100%',
                                  zIndex: 1000,
                                  minWidth: 300,
                                  maxWidth: 400,
                                  borderRadius: 8,
                                  boxShadow: '0 2px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.1)',
                                  padding: '12px 0',
                                  marginTop: 4,
                                  background: '#fff',
                                  border: '1px solid #e1e5e9',
                                  transition: 'all 0.2s ease',
                                  maxHeight: 350,
                                  overflowY: 'auto',
                                }}
                              >
                                <Nav tabs style={{ 
                                  marginBottom: 8, 
                                  borderBottom: '1px solid #f1f3f4', 
                                  padding: '0 12px', 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  flexWrap: 'nowrap'
                                }}>
                                  <NavItem style={{ width: '33.33%', flex: 'none' }}>
                                    <NavLink
                                      className={classnames({ active: activeFilterTab === 'year' })}
                                      onClick={() => setActiveFilterTab('year')}
                                      style={{ 
                                        cursor: 'pointer', 
                                        fontWeight: 500, 
                                        fontSize: '0.875rem', 
                                        color: activeFilterTab === 'year' ? '#2d3748' : '#718096', 
                                        border: 'none', 
                                        background: 'none', 
                                        borderBottom: activeFilterTab === 'year' ? '2px solid #3182ce' : 'none', 
                                        borderRadius: 0, 
                                        paddingBottom: 6, 
                                        paddingTop: 0,
                                        transition: 'all 0.15s ease',
                                        textAlign: 'center',
                                        width: '100%'
                                      }}
                                    >
                                      Year
                                    </NavLink>
                                  </NavItem>
                                  <NavItem style={{ width: '33.33%', flex: 'none' }}>
                                    <NavLink
                                      className={classnames({ active: activeFilterTab === 'section' })}
                                      onClick={() => setActiveFilterTab('section')}
                                      style={{ 
                                        cursor: 'pointer', 
                                        fontWeight: 500, 
                                        fontSize: '0.875rem', 
                                        color: activeFilterTab === 'section' ? '#2d3748' : '#718096', 
                                        border: 'none', 
                                        background: 'none', 
                                        borderBottom: activeFilterTab === 'section' ? '2px solid #3182ce' : 'none', 
                                        borderRadius: 0, 
                                        paddingBottom: 6, 
                                        paddingTop: 0,
                                        transition: 'all 0.15s ease',
                                        textAlign: 'center',
                                        width: '100%'
                                      }}
                                    >
                                      Section
                                    </NavLink>
                                  </NavItem>
                                  <NavItem style={{ width: '33.33%', flex: 'none' }}>
                                    <NavLink
                                      className={classnames({ active: activeFilterTab === 'subject' })}
                                      onClick={() => setActiveFilterTab('subject')}
                                      style={{ 
                                        cursor: 'pointer', 
                                        fontWeight: 500, 
                                        fontSize: '0.875rem', 
                                        color: activeFilterTab === 'subject' ? '#2d3748' : '#718096', 
                                        border: 'none', 
                                        background: 'none', 
                                        borderBottom: activeFilterTab === 'subject' ? '2px solid #3182ce' : 'none', 
                                        borderRadius: 0, 
                                        paddingBottom: 6, 
                                        paddingTop: 0,
                                        transition: 'all 0.15s ease',
                                        textAlign: 'center',
                                        width: '100%'
                                      }}
                                    >
                                      Subject
                                    </NavLink>
                                  </NavItem>
                                </Nav>
                                {activeFilterTab === 'year' && (
                                  <div>
                                    {yearOptions.map((year, idx) => (
                                      <div
                                        key={year}
                                        onClick={() => { 
                                          setActiveYear(idx); 
                                          setActiveFilterTab('section');
                                          // Don't close dropdown yet, let user select section
                                        }}
                                        style={{
                                          padding: '8px 16px',
                                          fontWeight: activeYear === idx ? 600 : 400,
                                          fontSize: '0.875rem',
                                          color: activeYear === idx ? '#2d3748' : '#4a5568',
                                          background: activeYear === idx ? '#ebf8ff' : 'transparent',
                                          cursor: 'pointer',
                                          borderLeft: activeYear === idx ? '3px solid #3182ce' : '3px solid transparent',
                                          transition: 'all 0.15s ease',
                                          display: 'flex',
                                          alignItems: 'center',
                                        }}
                                        onMouseEnter={e => { 
                                          if (activeYear !== idx) {
                                            e.currentTarget.style.background = '#f7fafc';
                                            e.currentTarget.style.color = '#2d3748';
                                          }
                                        }}
                                        onMouseLeave={e => { 
                                          if (activeYear !== idx) {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = '#4a5568';
                                          }
                                        }}
                                      >
                                        {year}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {activeFilterTab === 'section' && (
                                  <div>
                                    {sectionOptions.length === 0 && (
                                      <div style={{ 
                                        color: '#a0aec0', 
                                        padding: '8px 16px', 
                                        fontSize: '0.875rem',
                                        fontStyle: 'italic'
                                      }}>
                                        No sections available
                                      </div>
                                    )}
                                    {sectionOptions.map(section => (
                                      <div
                                        key={section}
                                        onClick={() => { setSelectedSection(section); setActiveFilterTab('subject'); }}
                                        style={{
                                          padding: '8px 16px',
                                          fontWeight: selectedSection === section ? 600 : 400,
                                          fontSize: '0.875rem',
                                          color: selectedSection === section ? '#2d3748' : '#4a5568',
                                          background: selectedSection === section ? '#ebf8ff' : 'transparent',
                                          cursor: 'pointer',
                                          borderLeft: selectedSection === section ? '3px solid #3182ce' : '3px solid transparent',
                                          transition: 'all 0.15s ease',
                                          display: 'flex',
                                          alignItems: 'center',
                                        }}
                                        onMouseEnter={e => { 
                                          if (selectedSection !== section) {
                                            e.currentTarget.style.background = '#f7fafc';
                                            e.currentTarget.style.color = '#2d3748';
                                          }
                                        }}
                                        onMouseLeave={e => { 
                                          if (selectedSection !== section) {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = '#4a5568';
                                          }
                                        }}
                                      >
                                        {section}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {activeFilterTab === 'subject' && (
                                  <div>
                                    {subjectOptions.length === 0 && (
                                      <div style={{ 
                                        color: '#a0aec0', 
                                        padding: '8px 16px', 
                                        fontSize: '0.875rem',
                                        fontStyle: 'italic'
                                      }}>
                                        No subjects available
                                      </div>
                                    )}
                                    {subjectOptions.map(subject => (
                                      <div
                                        key={subject}
                                        onClick={() => { setSelectedSubject(subject); setShowFilterDropdown(false); }}
                                        style={{
                                          padding: '8px 16px',
                                          fontWeight: selectedSubject === subject ? 600 : 400,
                                          fontSize: '0.875rem',
                                          color: selectedSubject === subject ? '#2d3748' : '#4a5568',
                                          background: selectedSubject === subject ? '#ebf8ff' : 'transparent',
                                          cursor: 'pointer',
                                          borderLeft: selectedSubject === subject ? '3px solid #3182ce' : '3px solid transparent',
                                          transition: 'all 0.15s ease',
                                          display: 'flex',
                                          alignItems: 'center',
                                        }}
                                        onMouseEnter={e => { 
                                          if (selectedSubject !== subject) {
                                            e.currentTarget.style.background = '#f7fafc';
                                            e.currentTarget.style.color = '#2d3748';
                                          }
                                        }}
                                        onMouseLeave={e => { 
                                          if (selectedSubject !== subject) {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = '#4a5568';
                                          }
                                        }}
                                      >
                                        {subject}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
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
                    {/* Status filter buttons below search bar */}
                    <div className="d-flex justify-content-center">
                      <div className="btn-group mb-2" role="group" style={{ marginTop: '8px', marginBottom: '16px' }}>
                        {['All Status', 'Present', 'Late', 'Absent'].map((status, idx) => (
                          <Button
                            key={status}
                            color={selectedStatus === status || (idx === 0 && !selectedStatus) ? 'primary' : 'secondary'}
                            outline={false}
                            style={{
                              minWidth: '56px',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              border: 'none',
                              boxShadow: 'none',
                              background: (selectedStatus === status || (idx === 0 && !selectedStatus)) ? undefined : '#f6f9fc',
                              color: (selectedStatus === status || (idx === 0 && !selectedStatus)) ? '#fff' : '#4385B1',
                              marginRight: '7px',
                              padding: '3px 7px',
                              borderRadius: '0.375rem',
                              textAlign: 'center',
                              whiteSpace: 'nowrap'
                            }}
                            onClick={() => setSelectedStatus(idx === 0 ? "" : status)}
                          >
                            {status}
                          </Button>
                        ))}
                      </div>
                    </div>
                    {/* Year and Section dropdowns in top-right with Export/Add New */}
                    <div className="w-100 d-flex justify-content-between align-items-center" style={{ marginTop: '20px', marginBottom: '16px' }}>
                      <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#32325d' }}>
                        {getCourseDisplay()}
                      </div>
                      <div className="d-flex align-items-center" style={{ gap: 12 }}>
                        <Button color="info" outline className="mr-2" size="sm" style={{ padding: '3px 10px', fontSize: '0.75rem' }}>
                          <i className="ni ni-archive-2 mr-2" /> Export
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* Table View */}
                {viewMode === 'table' && (
                  <>
                    <Table className="align-items-center table-flush" responsive style={{ margin: 0, padding: 0, width: '100%' }}>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col" onClick={() => handleSort('studentName')} style={{ cursor: 'pointer' }}>
                            STUDENT NAME{getSortIndicator('studentName')}
                          </th>
                          <th scope="col" onClick={() => handleSort('course')} style={{ cursor: 'pointer' }}>
                            COURSE/YEAR/SECTION{getSortIndicator('course')}
                          </th>
                          <th scope="col" onClick={() => handleSort('subject')} style={{ cursor: 'pointer' }}>
                            SUBJECT{getSortIndicator('subject')}
                          </th>
                          <th scope="col" style={{ cursor: 'pointer' }}>
                            TEACHER
                          </th>
                          <th scope="col" onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                            DATE{getSortIndicator('date')}
                          </th>
                          <th scope="col" onClick={() => handleSort('timeIn')} style={{ cursor: 'pointer' }}>
                            TIME IN{getSortIndicator('timeIn')}
                          </th>
                          <th scope="col" onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                            STATUS{getSortIndicator('status')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.length > 0 ? (
                          paginatedData.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div
                                    className="avatar avatar-sm rounded-circle bg-gradient-primary mr-3"
                                    style={{ width: 32, height: 32, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: getAvatarForUser(item.user, allUsers) !== userDefault ? 'transparent' : '#f8f9fa', border: getAvatarForUser(item.user, allUsers) !== userDefault ? undefined : '1px solid #e9ecef' }}
                                  >
                                    <img 
                                      src={getAvatarForUser(item.user, allUsers)} 
                                      alt={item.studentName} 
                                      style={{ width: 32, height: 32, objectFit: 'cover', backgroundColor: getAvatarForUser(item.user, allUsers) === userDefault ? '#fff' : 'transparent' }} 
                                    />
                                  </div>
                                  <div>
                                    <div className="font-weight-bold">{item.studentName}</div>
                                    <div className="text-muted" style={{ fontSize: '0.85em' }}>{item.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                {(() => {
                                  const courseInfo = getCourseInfo(item);
                                  return (
                                    <div>
                                      <div className="font-weight-bold">{courseInfo.course}</div>
                                      <div className="text-muted" style={{ fontSize: '0.85em' }}>{courseInfo.year} • {courseInfo.section}</div>
                                    </div>
                                  );
                                })()}
                              </td>
                              <td>
                                <div className="font-weight-bold">{item.subject || 'N/A'}</div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={item.teacherAvatar}
                                    alt={item.teacher}
                                    className="avatar avatar-sm rounded-circle mr-2"
                                    style={{ width: 32, height: 32, objectFit: 'cover' }}
                                  />
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span className="font-weight-bold">{item.teacher || 'N/A'}</span>
                                    <span className="text-muted" style={{ fontSize: '0.85em' }}>{item.teacherEmail}</span>
                                  </div>
                                </div>
                              </td>
                              <td>{new Date(item.date).toLocaleDateString()}</td>
                              <td>{item.timeIn || "-"}</td>
                              <td>{getStatusBadge(item.status)}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center py-4">
                              <div className="text-muted">
                                <i className="ni ni-chart-bar-32" style={{ fontSize: "3rem" }} />
                                <p className="mt-2">No attendance records found</p>
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
                        <UncontrolledDropdown direction="down">
                          <DropdownToggle
                            caret
                            color="white"
                            style={{
                              width: '60px',
                              fontSize: '0.85rem',
                              marginRight: '8px',
                              borderRadius: '6px',
                              border: '1px solid #e1e5e9',
                              background: '#fff',
                              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                              padding: '3px 8px',
                              height: '30px',
                              color: '#22336b',
                              outline: 'none',
                              transition: 'border-color 0.2s',
                              textAlign: 'left',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            {itemsPerPage}
                          </DropdownToggle>
                          <DropdownMenu style={{
                            minWidth: '60px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 12px rgba(34,51,107,0.08), 0 1px 3px rgba(34,51,107,0.10)',
                            padding: '4px 0',
                            border: '1px solid #e1e5e9',
                            marginTop: 4,
                          }}>
                            {[5, 10, 20, 50].map(val => (
                              <DropdownItem
                                key={val}
                                active={itemsPerPage === val}
                                onClick={() => { setItemsPerPage(val); setCurrentPage(1); }}
                                style={{
                                  fontWeight: itemsPerPage === val ? 600 : 400,
                                  fontSize: '0.85rem',
                                  color: itemsPerPage === val ? '#22336b' : '#4a5568',
                                  background: itemsPerPage === val ? '#eaf4fb' : 'transparent',
                                  borderRadius: '4px',
                                  margin: '1px 4px',
                                  transition: 'all 0.15s',
                                  cursor: 'pointer',
                                }}
                              >
                                {val}
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </UncontrolledDropdown>
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
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AttendanceLog; 