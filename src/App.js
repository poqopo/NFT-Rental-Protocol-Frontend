import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./menu/header";
import Home from "./pages/Home";
import ItemDetail from "./pages/ItemDetail";
import List from "./pages/List"
import Mypage from "./pages/Mypage";
import Kick from "./pages/Kick";
// import Test from "./pages/test";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:contractaddress/:tokenid/:detail" element={<ItemDetail />}/>
        <Route path="/list" element={<List />}/>
        <Route path="/mypage/:useraddress" element={<Mypage />}/>
        <Route path="/Kick" element={<Kick />}/>
        {/* <Route path="/Test" element={<Test />}/> */}
      </Routes>
    </Router>
  );
}

export default App;
