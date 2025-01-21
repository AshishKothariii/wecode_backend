import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Problem from "./pages/Problem";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Statement from "./pages/Statement";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import LoggedinHome from "./pages/LoggedinHome";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="pl-10 pr-10 pt-4">
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <LoggedinHome></LoggedinHome> : <Home />}
          />
          <Route
            path="/login"
            element={user ? <LoggedinHome></LoggedinHome> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <LoggedinHome></LoggedinHome> : <Signup />}
          />
          <Route
            path="/problems"
            element={user ? <Problem /> : <Home></Home>}
          />
          <Route path="/profile" element={user ? <Profile /> : <Home></Home>} />
          <Route
            path="/problems/:id"
            element={user ? <Statement></Statement> : <Home></Home>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
