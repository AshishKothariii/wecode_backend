import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Problem from "./pages/Problem";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Statement from "./pages/Statement";

function App() {
  return (
    <div className="pl-10 pr-10 pt-4">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/problems" element={<Problem />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/problems/:id" element={<Statement></Statement>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
