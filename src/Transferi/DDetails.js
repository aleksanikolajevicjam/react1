import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import IframeResizer from "iframe-resizer-react";
import axios from "axios";
function DDetails() {
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
//console.log(mejl)
  console.log(window.localStorage.getItem('imejl'))
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let detailsid = params.id; // "some_value
console.log(detailsid);
  const link = "https://test.taxifrom.com/backend/test4.html";

var UserRealName = window.localStorage.getItem('AuthUserRealName')
var AuthUserID = window.localStorage.getItem('AuthUserID')


  function Details (username) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios.get(
            `https://test.taxifrom.com/backend/details.api.php?detailsid=` + detailsid
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
        <h1>Transfer Details</h1>
        {loading && <div>A moment please...</div>}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <div>
          {data &&
            data.map(({ OrderID,DetailsID, PaxName, MOrderKey, PickupName, PickupDate, PickupTime, PickupAddress, FlightNo, FlightTime, DropAddress, DropName, MPaxTel, PaxNo, Notes, PickupNotes, DropNotes, DriverNotes, DetailPrice }) => (
              <div>
              <table className="table" key={OrderID}>
              <thead>
                <tr>
                  <th scope="row"></th>
                  <th scope="row"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Order</th>
                  <th>{MOrderKey}-{OrderID}</th>
                </tr>
                <tr>
                  <th scope="row">Vehicle type</th>
                  <th>{PaxNo}</th>
                </tr> <tr>
                  <th scope="row">Pickup Name</th>
                  <th>{PickupName}</th>
                </tr> <tr>
                  <th scope="row">Pickup Address</th>
                  <th>{PickupAddress}</th>
                </tr> 
                <tr>
                  <th scope="row">FlightNo</th>
                  <th>{FlightNo}</th>
                </tr>
                <tr>
                  <th scope="row">Flight Time</th>
                  <th>{FlightTime}</th>
                </tr>  <tr>
                  <th scope="row">Drop Address</th>
                  <th>{DropAddress}</th>
                </tr>  <tr>
                  <th scope="row">Drop Name</th>
                  <th>{DropName}</th>
                </tr>  <tr>
                  <th scope="row">PaxName</th>
                  <th>{PaxName}</th>
                </tr>  <tr>
                  <th scope="row">Pax Tel</th>
                  <th>{MPaxTel}</th>
                </tr>  <tr>
                  <th scope="row">PaxNo</th>
                  <th>{PaxNo}</th>
                </tr>  <tr>
                  <th scope="row">Pickup Notes</th>
                  <th>{PickupNotes}</th>
                </tr>  <tr>
                  <th scope="row">DropNotes</th>
                  <th>{DropNotes}</th>
                </tr>  <tr>
                  <th scope="row">Subdriver</th>
                  <th>{username}</th>
                </tr>  <tr>
                  <th scope="row">DriverNotes</th>
                  <th>{DriverNotes}</th>
                </tr>
                <tr>
                  <th scope="row">Naplata &#40; {username}	&#41;	</th>
                  <th>{DetailPrice}</th>
                </tr>

              </tbody>
              </table>
              <a className="btn btn-dark col-sm-3" href={"https://test.taxifrom.com/backend/sign.php?paxname="+ PaxName}>Sign</a>
              {/* <a className="btn btn-dark col-sm-3" href={"/dfinished?id="+ DetailsID + "&userid=" + AuthUserID + "&username=" + UserRealName }>Finished</a> */}
              <a className="btn btn-dark col-sm-3" href={"/dform?id=" + DetailsID}>Finished</a>
              <a className="btn btn-dark col-sm-3" href={"/dnalog?id="+ DetailsID + "&userid=" + AuthUserID + "&username=" + UserRealName }>Nalog</a>
              <a className="btn btn-dark col-sm-3" href={"/dracun?id="+ DetailsID + "&userid=" + AuthUserID + "&username=" + UserRealName }>Racun</a>



              </div>
            ))}
        </div>
      </div>
    );
  }





  return (
    <div className="dashboard">
    {Details(UserRealName)}
    </div>
  );
}

export default DDetails;
