import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import AddNote from "./components/AddNote";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({msg: message, type: type})
    setTimeout(() => {setAlert(null);}, 3000);
  };

  return (
    <div>
      <Router>
        <NoteState showAlert={showAlert} >
          <Navbar showAlert={showAlert} />
          <Alert alert={alert}/>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route exact path="/addNote" element={<AddNote showAlert={showAlert} />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
            </Routes>
        </NoteState>
      </Router>
    </div>
  );
}

export default App;
