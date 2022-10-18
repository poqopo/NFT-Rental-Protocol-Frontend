import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Kick from "./pages/Kick";
import MyPage from "./pages/Mypage";
import NFT from "./pages/NFT";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Kick" element={<Kick />} />
        <Route path="/:collectionAddress" element={<Collection/>}/>
        <Route path="/:collectionAddress/:token_id" element={<NFT/>}/>
        <Route path="/User/:useraddress" element={<MyPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
