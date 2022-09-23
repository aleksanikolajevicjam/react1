import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Test() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

 /*  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  }; */

 /*  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]); */
//var mejl = user?.email
//console.log(mejl)
/*   window.localStorage.setItem("myObject", 'test');
  console.log(window.localStorage.getItem('myObject'))
  window.localStorage.setItem('imejl', mejl) */
  console.log(window.localStorage.getItem('imejl'))
  var timejl = window.localStorage.getItem('imejl')

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as {timejl}
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Test;
