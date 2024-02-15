import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Contacts from "./components/Contacts";
import Edit from "./route/Edit";
function App() {

  return (
    <div id='container'>
      <Router>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
