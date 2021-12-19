import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// material ui
import { makeStyles } from '@material-ui/core';
// import componentsyou will use
import Header from "./components/Header"
import Homepage from "./pages/Homepage"
import CoinPage from "./pages/CoinPage"


function App() {
  // material UI
  const useStyles = makeStyles(() => ({
   App: {
     backgroundColor: "#0B0C10",
     color: "white",
     minHeight: '100vh'
   }
  }));

  const classes = useStyles();


  return (
   <Router>
     <div className={classes.App}>
        {/*components  */}
        <Header />
        <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/coins/:id" element={<CoinPage/>} />
        </Routes>

      </div>
   </Router>
  );
}

export default App;
