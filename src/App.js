import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./frontend/Header";
import LoginPage from "./frontend/Login";
import AdminPage from "./frontend/admin";
import TambahEditPage from "./frontend/Tambah";
import EditPage from "./frontend/Edit";
import IstilahDetail from "./frontend/IstilahDetail";
 
function MainApp() {
  const [category, setCategory] = useState("en");
  const [word, setWord] = useState("");
  const [terms, setTerms] = useState([]); // <-- Updated: Store terms from API
  const [filteredTerms, setFilteredTerms] = useState([]); // <-- Filtered terms for search
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
 
  const navigate = useNavigate();
 
  // Fetch terms from API on page load
  useEffect(() => {
    fetchTerms();
  }, []);
 
  // Refetch and filter terms when search word changes
  useEffect(() => {
    filterTerms();
  }, [word, terms]);
 
  const fetchTerms = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/istilah");
      setTerms(data);
    } catch (error) {
      console.log("Error fetching terms from API:", error);
    }
  };
 
  const filterTerms = () => {
    if (word.trim() === "") {
      setFilteredTerms(terms); // Show all if no search term
    } else {
      setFilteredTerms(
        terms.filter((term) =>
          term.kata.toLowerCase().includes(word.toLowerCase())
        )
      );
    }
  };
 
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };
 
  return (
    <div className="glosariumz-app">
      <div className="hero-section">
        <div className="hero-left">
          <img src="/zingo.png" alt="Zingo" className="zingo" />
          <div className="hero-text">
            <h1>Welcome to <span>GlosariumZ</span></h1>
            <p>Kamu mau Zingo bantu cariin istilah apa?</p>
            <Header
              category={category}
              setCategory={setCategory}
              word={word}
              setWord={setWord}
              lightmode={false}
            />
          </div>
        </div>
      </div>
 
      <div className="main-section">
        <div className="admin-card">
          <p>Kamu Etmin?</p>
          <img src="/zingo.png" alt="Admin" />
          {isAdmin ? (
            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="btn login" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
 
        <div className="trending-terms">
          <h2>🔥 TOP 10 Istilah si Paling Trending</h2>
          <div className="terms-list">
            {filteredTerms.slice(0, 10).map((term, i) => (
              <button 
                key={term.id} 
                className="term-badge"
                onClick={() => navigate(`/detail/${term.id}`)}
              >
                {term.kata} {term.emoji}
              </button>
            ))}
          </div>
          {filteredTerms.length === 0 && <p>Tidak ada istilah yang cocok.</p>}
        </div>
      </div>
    </div>
  );
}
 
// Bungkus seluruh aplikasi dengan Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/tambah" element={<TambahEditPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/detail/:nama" element={<IstilahDetail />} />
      </Routes>
    </Router>
  );
}
 
export default App;