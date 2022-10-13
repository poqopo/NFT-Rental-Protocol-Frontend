import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Collection from "./pages/Collection";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:collectionAddress" element={<Collection/>}/>
      </Routes>
    </Router>
  );
}

export default App;
