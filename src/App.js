import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import Test from "./Test";
import DTransferi from "./Transferi/DTransferi";
import DDetails from "./Transferi/DDetails";
import DFinished from "./Transferi/DFinished";
import DNalog from "./Transferi/DNalog";
import DRacun from "./Transferi/DRacun";
import DForm from "./Transferi/DForm";
import Notification from './Notification'
import firebase from './firebase'
import DExpenses from './Transferi/DExpenses'
import DUpload from "./Transferi/DUpload";

import { getMessaging, getToken, onMessage } from 'firebase/messaging';
function App() {
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
  return (
    <div className="app">
      <Router basename={'/statictest'}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/test" element={<Test />} />
          <Route exact path="/dtransferi" element={<DTransferi />} />
          <Route exact path="/ddetails" element={<DDetails />} />
          <Route exact path="/dfinished" element={<DFinished />} />
          <Route exact path="/dnalog" element={<DNalog />} />
          <Route exact path="/dracun" element={<DRacun />} />
          <Route exact path="/dform" element={<DForm />} />
          <Route exact path="/dexpenses" element={<DExpenses />} />
          <Route exact path="/dupload" element={<DUpload />} />








        </Routes>
      </Router>
    </div>
  );
}

export default App;
