import React, { useEffect, useState, Link } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import axios from "axios";
//import firebase from './firebase'
import Notification from './Notification'
import firebase from './firebase'
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


function Dashboard() {
  const messaging = getMessaging();

  const requestForToken = () => {
   return getToken(messaging, { vapidKey: `BIqVE17v6ajIFWBCNupjQ0RyjjA5jtdbSANPWP9NViw-b1OWKuk3trzgOaLUdEBz9aFKgQUkWTeqA-9CzFotcR4` })
     .then((currentToken) => {
       if (currentToken) {
         console.log('client: ', currentToken);
         // Perform any other neccessary action with the token
       } else {
         // Show permission request UI
         console.log('No registration token available. Request permission to generate one.');
       }
     })
     .catch((err) => {
       console.log('An error occurred while retrieving token. ', err);
     });
 };



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
var mejl = user?.email
//console.log(mejl)



  window.localStorage.setItem('imejl', mejl)
  console.log(window.localStorage.getItem('imejl'))
  var timejl =   console.log(window.localStorage.getItem('imejl'))


  function UserPodaci () {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios.get(
            `https://test.taxifrom.com/backend/user.api.php?mejl=` + mejl
          );
          setData(response.data);
          setError(null);
        } catch (err) {
          setError(err.message);
          setData(null);
        } finally {
          setLoading(false);
        }
      };
      getData();
    }, []);
  
    return (
      <div className="App">
        <h1></h1>
        {loading && <div>A moment please...</div>}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <div>
          {data &&
            data.map(({ AuthUserID, AuthUserRealName }) => (
              <div key={AuthUserID}>
                {   window.localStorage.setItem('AuthUserID', AuthUserID)

                   } {
                    window.localStorage.setItem('AuthUserRealName', AuthUserRealName)
                   }

                   
                <div>{AuthUserRealName}</div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  console.log(window.localStorage.getItem('AuthUserID'))
  console.log(window.localStorage.getItem('AuthUserRealName'))
var UserID = window.localStorage.getItem('AuthUserID')
var UserRealName = window.localStorage.getItem('AuthUserRealName')
console.log(UserID)
console.log(UserRealName)
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{user?.email}</div>
        <UserPodaci />
        <a href="/dtransferi" className="dashboard__btn" >Transferi </a>
        <a href="/dexpenses" className="dashboard__btn" >Transferi </a>

        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
        <Notification />

      </div>
    </div>
  );
}

export default Dashboard;
