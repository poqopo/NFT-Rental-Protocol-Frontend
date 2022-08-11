import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./menu/header";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import List from "./pages/List"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/:contractaddress/:tokenid/Rent" element={<Rent />}/>
        <Route path="/list" element={<List />}/>
      </Routes>
    </Router>
  );
}

export default App;
