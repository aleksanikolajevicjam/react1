import React, { useEffect, useState, Link } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import axios from "axios";
import IframeResizer from "iframe-resizer-react";
import DUpload from './DUpload'
import './DExpenses.css'

function DExpenses() {
  const [user, loading, error] = useAuthState(auth);
  const [datumTroska, setdatumTroska] = useState("22-09-2022");
  const [vrstaTroska, setvrstaTroska] = useState("1");
  const [cost, setCost] = useState("");
  const [nacinPlacanja, setnacinPlacanja] = useState("1");
  var UserID = window.localStorage.getItem('AuthUserID')
  console.log(UserID)
  const handleChangeDatumTroska = (event) => {
    setdatumTroska(event.target.value)
  }
  const handleChangeVrstaTroska = (event) => {
    setvrstaTroska(event.target.value)
  }
  const handleChangeNacinPlacanja = (event) => {
    setnacinPlacanja(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(datumTroska)
    window.location.href = "https://test.taxifrom.com/backend/crud4.php?driverid=" + UserID +"&datum=" + datumTroska + "&expense=" + vrstaTroska + "&amount=" + cost +"&card=" + nacinPlacanja + "";

  }
    console.log(datumTroska)
  console.log(vrstaTroska)
  console.log(cost)
  console.log(nacinPlacanja)
  return (
    <div className="dashboard">
    <div className="container mt-5 fs-3">
    <div className="row">
    <div className="col-md-15"> 

      <form onSubmit={handleSubmit}>
        <label>Datum troska</label>
      <select value={datumTroska} onChange={handleChangeDatumTroska}>
        <option value="20-09-2022">20-09-2022</option>
        <option value="21-09-2022">21-09-2022</option>
        <option value="22-09-2022">22-09-2022</option>
      </select>
      <label>Vrsta troska</label>
      <select value={vrstaTroska} onChange={handleChangeVrstaTroska}>
      <option value="117">Predaja Jošku </option><option value="1">Gorivo</option><option value="2">Autoput</option><option value="3">Parking</option><option value="4">Pranje</option><option value="5">Popravci</option><option value="Piće">Piće</option><option value="9">Sredstva za čišćenje</option><option value="10">Dijelovi za auto</option><option value="21">AD blue</option><option value="22">Gorivo + AD blue</option><option value="17">Naplata karticom</option><option value="8">Polog na račun</option><option value="11">Predaja direktoru</option><option value="103">Predaja  Bazoki</option><option value="119">Predaja Vrdoljku ( Nica 1) </option><option value="18">Predaja Danijeli</option><option value="104">Predaja  Mareticu </option><option value="105">Predaja Vrdoljaku (Lyon)</option><option value="106">Predaja Anti Alebiću </option><option value="110">Predaja Zdravku</option><option value="108">Predaja Nikši (Lyon)</option><option value="118">Predaja Zlatku </option><option value="111">Predaja Peri (Lyon)</option><option value="20">Predaja Žarku</option><option value="112">Predaja Danijelu (Nica)</option><option value="6">Plaća</option><option value="23">Primanje novca</option><option value="24">Ostalo</option>
      </select>
      <label>Iznos
        <input
          type="text" 
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </label>
      <label>Nacin placanja</label>
      <select value={nacinPlacanja} onChange={handleChangeNacinPlacanja}>
        <option value="1">Card</option>
        <option value="0">Cash</option>
      </select>
      <input type="submit" />

    </form>
    </div>
    </div>
    <div className="col-md-15"> 

    <DUpload />
    </div>
</div>
  </div>
  );
}

export default DExpenses;
