import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreateUser from "./CreateUser";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("scms_users") || "[]");
    const user = users.find(u => String(u.id) === String(id));
    setUserData(user || null);
  }, [id]);

  if (!userData) return <div className="text-center mt-5">User not found.</div>;

  return <CreateUser editUser={userData} editMode={true} onEditDone={() => navigate("/admin/user-management")} />;
};

export default EditUser; 