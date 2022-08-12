import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./menu/header";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import List from "./pages/List"
import Mypage from "./pages/Mypage";
import Kick from "./pages/Kick";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/:contractaddress/:tokenid/Rent" element={<Rent />}/>
        <Route path="/list" element={<List />}/>
        <Route path="/mypage/:useraddress" element={<Mypage />}/>
        <Route path="/Kick" element={<Kick />}/>
      </Routes>
    </Router>
  );
}

export default App;
