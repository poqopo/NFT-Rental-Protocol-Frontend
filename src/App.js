import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Kick from "./pages/Kick";
import MyPage from "./pages/Mypage";
import { QueryClient, QueryClientProvider } from "react-query";
import NFT from "./pages/NFT";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Kick" element={<Kick />} />
          <Route path="/:collectionAddress" element={<Collection />} />
          <Route path="/:collectionAddress/:token_id" element={<NFT />} />
          <Route path="/User/:useraddress" element={<MyPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
