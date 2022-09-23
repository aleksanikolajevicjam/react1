import React, { useEffect, useState, Link } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import './DTransferi.css'
import axios from "axios";
//import { Details } from "./Details";
import Dashboard from "../Dashboard";
function DTransferi() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();




  console.log(window.localStorage.getItem('imejl'))
  var timejl = window.localStorage.getItem('imejl')



  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var dd1 = String(today.getDate()).padStart(2, '0');
  var dd2 = Number(dd) + 1
  var dd3 = Number(dd) + 2

  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  var danNaslov1 = dd1 + '/' + mm + '/' + yyyy;
  var danNaslov2 = dd2 + '/' + mm + '/' + yyyy;
  var danNaslov3 = dd3 + '/' + mm + '/' + yyyy;

  var danApi1 = yyyy + '-' + mm + '-' + dd1
  var danApi2 = yyyy + '-' + mm + '-' + dd2
  var danApi3 = yyyy + '-' + mm + '-' + dd3

  console.log(today);

  const simulateCall = phoneNumber => window.open(`tel:${phoneNumber}`, '_self');
  const callHandler = phoneNumber => () => {
    // I want to do something here then make a call
    simulateCall(phoneNumber);
  };

  function gmapa(lok1, lok2) {
    let link = "https://www.google.rs/maps/search/" + lok1 + " " + lok2;
    return (
      <a href={link}>{lok1 + "," + lok2}</a>
    )
  }

  function flightStats(flightNo, datum, flightNum, flightTime) {
    var klink = "https://test.taxifrom.com/backend/flightStats.php?" + "flightno=" + flightNo + "&datum=" + datum;
    return (
      <a href={klink} >{flightNum} {flightTime}   </a>
    )


  }

  function List(arg1, arg2) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      let ApiLink = "https://test.taxifrom.com/backend/"
      const getData = async () => {
        try {
          const response = await axios.get(
            ApiLink + "?mejl=" + timejl + "&datum=" + arg1
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
    console.log(arg1)

    if (data == null) {
      var nemaTransfer = "No transfer for " + arg2;


    }
    console.log(data)


    return (

      <div className="App center">

        <h1 className="text-center"> <br></br> {arg2} </h1>
        {loading && <div>A moment please...</div>}
        {error && (
          <div>{`Nema transfera za ${arg2}`}</div>
        )}

        <div>
          {data &&
            data.map(({ OrderID, TNo, PaxName, PickupTime,SubPickupTime, PickupName, DropName, MPaxTel, PaxNo, FlightNo, FlightTime, PickupAddress, DropAddress, TransferStatus, DetailsID, MOrderID }) => (

              <><div >
                {(() => {
                  if (TransferStatus == 5) {
                    return (
                      <div key={MOrderID} className="completed transferList mb-5">
                        <h2 className="text-center  textVreme">{SubPickupTime}</h2>

                        <div >
                          <a href={"/ddetails?id=" + DetailsID}  >   <div > <i className="bi bi-bag-fill blackIcon"></i>{OrderID}-{TNo} <i class="bi bi-file-text-fill blackIcon"></i></div>

                            <div > <i className="bi bi-globe2 blackIcon"></i> {PickupTime} {PickupName}  <i class="bi bi-arrow-right blackIcon"></i>
                              {DropName}</div>
                            <div > <i className="bi bi-file-person-fill blackIcon"></i> {PaxName}</div>
                            <div><i className="bi bi-people-fill blackIcon"></i> {PaxNo} </div>
                          </a>

                          <div onClick={callHandler(MPaxTel)} ><i className="bi bi-telephone-fill blackIcon"></i>  {MPaxTel}</div>
                          <div><i className="bi bi-airplane-fill blackIcon"></i> {flightStats(FlightNo, arg1, FlightNo, FlightTime)}</div>
                 
                          <div  > <i class="bi bi-car-front-fill blackIcon"></i>  {gmapa(PickupName, PickupAddress)}  </div>
                            <div   >  <i class="bi bi-geo-alt-fill blackIcon"></i>
{gmapa(DropName, DropAddress)}</div>
                        </div>
                      </div>

                    );
                  } else if (TransferStatus == 3) {
                    return (
                      <div className="canceled transferList">
                        <h2 className="text-center  textVreme">{SubPickupTime}</h2>

                        <div >
                          <a href={"/ddetails?id=" + DetailsID}  >   <div > <i className="bi bi-bag-fill blackIcon"></i>{OrderID}-{TNo} <i class="bi bi-file-text-fill blackIcon"></i></div>

                            <div > <i className="bi bi-globe2 blackIcon"></i> {PickupTime} {PickupName}  <i class="bi bi-arrow-right blackIcon"></i>
                              {DropName}</div>
                            <div > <i className="bi bi-file-person-fill blackIcon"></i> {PaxName}</div>
                            <div><i className="bi bi-people-fill blackIcon"></i> {PaxNo}</div>  </a> 

                          <div onClick={callHandler(MPaxTel)} ><i className="bi bi-telephone-fill blackIcon"></i>  {MPaxTel}</div>
                          <div><i className="bi bi-airplane-fill blackIcon"></i> {flightStats(FlightNo, arg1, FlightNo, FlightTime)}</div>
                
                          <div  > <i class="bi bi-car-front-fill blackIcon"></i>
  {gmapa(PickupName, PickupAddress)}  </div>
                            <div  >  <i class="bi bi-geo-alt-fill blackIcon"></i>
 {gmapa(DropName, DropAddress)}</div>
                        </div></div>
                    );
                  } else {
                    return (
                      <div className="activeT transferList bg-primary">
                        <h2 className="text-center  textVreme">{SubPickupTime}</h2>

                        <div >
                          <a href={"/ddetails?id=" + DetailsID}  >   <div > <i className="bi bi-bag-fill blackIcon"></i>{OrderID}-{TNo}</div>

                            <div > <i className="bi bi-globe2 blackIcon"></i> {PickupTime} {PickupName} <i class="bi bi-arrow-right blackIcon"></i>
                              {DropName}</div>
                            <div > <i className="bi bi-file-person-fill blackIcon"></i> {PaxName}</div>
                            <div><i className="bi bi-people-fill blackIcon"></i> {PaxNo} </div></a> 
                          <div onClick={callHandler(MPaxTel)}><i className="bi bi-telephone-fill blackIcon"></i>  {MPaxTel}</div>
                          <div><i className="bi bi-airplane-fill blackIcon"></i> {flightStats(FlightNo, arg1, FlightNo, FlightTime)}</div>
                       
                          <div  > <i class="bi bi-car-front-fill blackIcon"></i>  {gmapa(PickupName, PickupAddress)}  </div>
                            <div  > <i class="bi bi-geo-alt-fill blackIcon"></i>
 {gmapa(DropName, DropAddress)}</div>
                        </div> </div>
                    );
                  }
                })()}
              </div></>
            ))}
          <div>
          </div>
          {(() => {
            if (data == 0) {
              return (
                <div>Nema transfera</div>
              )
            }
          })()}
        </div>

      </div>
    );
  }




  return (
    <div className="container mt-5 fs-3">
      <div className="row">
        <div className="col-md-15">   {List(danApi1, danNaslov1)}   </div>
        <div className="col-md-15">   {List(danApi2, danNaslov2)}   </div>
        <div className="col-md-15">   {List(danApi3, danNaslov3)}  </div>
      </div>
    </div>
  );
}

export default DTransferi;
