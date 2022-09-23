import React, { useEffect, useState, Link } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import axios from "axios";
import IframeResizer from "iframe-resizer-react";
function DFinished() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let detailsid = params.id; // "some_value
  let userid = params.userid; // "some_value
  let username = params.username; // "some_value

console.log(detailsid);


  
  console.log(window.localStorage.getItem('AuthUserID'))
  console.log(window.localStorage.getItem('AuthUserRealName'))
var UserID = window.localStorage.getItem('AuthUserID')
var UserRealName = window.localStorage.getItem('AuthUserRealName')
console.log(UserID)
console.log(UserRealName)
  return (
    <div className="dashboard">
      <IframeResizer
  log
  src={"https://test.taxifrom.com/backend/finished.php?id=" + detailsid + "&userid=" + userid + "&username=" + username}
  style={{ width: '1px', minWidth: '100%'}}
/>
</div>
  );
}

export default DFinished;
