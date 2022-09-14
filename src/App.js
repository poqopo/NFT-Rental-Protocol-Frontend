import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Kick from "./pages/Kick";
import ItemDetail from "./pages/Itemdetail";
import List from "./pages/ListNFT";
import Mypage from "./pages/Mypage";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Kick" element={<Kick />} />
        <Route path="/:contractaddress/:tokenid/:detail" element={<ItemDetail />}/>
        <Route path="/List" element={<List />} />
        <Route path="/Mypage/:userAddress" element={<Mypage />} />
        <Route path="/search/:collectionname" element={<Search/>}/>
      </Routes>
    </Router>
  );
}

export default App;
