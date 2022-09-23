import React, { useEffect, useState, Link } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import IframeResizer from "iframe-resizer-react";
import axios from "axios";
import './DForm.css';
function DForm() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [nae, setNae] = useState("");
  const [textarea, setTextarea] = useState(
    "Notes"
  );
  const [myCar, setMyCar] = useState("10");

  const handleChang = (event) => {
    setTextarea(event.target.value)

  }
  const handleChange = (event) => {
    setMyCar(event.target.value)


  }

console.log(myCar)
  const handleSubmit = (event) => {
    setTextarea(event.target.value)
    event.preventDefault();
    var v1 = nae
    var v2 = textarea 
    {
    var v3 = myCar
    if (myCar == 10) {
        var  transstatus = 5
        var   payment = 99
        var   confstatus = 7
      

    } else  if (myCar == 20) {
       var  transstatus = 5
         var   payment = 0
         var   confstatus = 7
    }
    else  if (myCar == 30) {
        var  transstatus = 7
          var   payment = 0
          var   confstatus = 5
     }
     else  if (myCar == 40) {
        var  transstatus = 8
          var   payment = 0
          var   confstatus = 6
     }
    
    
    else {
        var  transstatus = 1
        var   payment = 1
        var   confstatus = 1
    }
}
   /*  var transstatus = 1
    var payment = 99
    var confstatus = 5 */
    window.location.href = "https://test.taxifrom.com/backend/finished.php?id=" + detailsid + "&cash=" + v1 + "&transstatus=" + transstatus + "&payment=" + payment +"&dconfstat=" + confstatus  + "&note=" + v2 +"&status=5";
}
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let detailsid = params.id; // "some_value
  let userid = params.userid; // "some_value
  let username = params.username; // "some_value
console.log(nae)
console.log(detailsid);
console.log("asdasdasdasdasdasd" + setMyCar)

function FormDetails (username) {
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
                setLoading(false)
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
              data.map(({ OrderID,DetailsID, PaxName, MOrderKey, PickupName, PickupDate, PickupTime, CashIn, FlightNo, FlightTime, DropAddress, DropName, MPaxTel, PaxNo, Notes, PickupNotes, DropNotes, DriverNotes }) => (
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
                  <th scope="row">Pax Name</th>
                  <th>{PaxName}</th>
                </tr>
                  <tr>
                  <th scope="row">Cash</th>
                  <th>{CashIn}  {console.log(CashIn)}</th>
                </tr>
                  <tr>
                  <th scope="row">Notes</th>
                  <th>{DriverNotes}</th>
                </tr>
                

              </tbody>
              </table>
  
  
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
    <div className="container mt-5 fs-3">
    <div className="row">
    <div className="col-md-15"> 
        {FormDetails(UserRealName)}
        </div>
        </div>
        <div className="col-md-15"> 
        <div class="input-group mb-3">
     <form onSubmit={handleSubmit}>
      <label>AMOUNT PAID EUR:
        <input  class="form-control"
          type="text" 
          value={nae}
          onChange={(e) => setNae(e.target.value)}
        />
                <div>Final notes

              <textarea  class="form-control" value={textarea} onChange={handleChang} />
</div>
      </label>
      <select class="form-select" value={myCar} onChange={handleChange}>
        <option value="10">Completed</option>
        <option value="20">Completed - Not Paid</option>
        <option value="30">No Show</option>
        <option value="40">Driver Error</option>

      </select>
      <input type="submit" />
    </form>
    </div>
    </div>
    </div>

</div>
  );
}

export default DForm;
