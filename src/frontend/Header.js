import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/Header.css";
 
const Header = () => {
  const [word, setWord] = useState('');
  const navigate = useNavigate();
 
  const handleInputChange = (e) => {
    setWord(e.target.value);
  };
 
  const handleSearch = async () => {
    if (word.trim() === "") return;
 
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/istilah`);
      const filteredTerm = data.find((term) =>
        term.kata.toLowerCase() === word.toLowerCase()
      );
 
      if (filteredTerm) {
        navigate(`/detail/${filteredTerm.id}`);
      } else {
        alert("Istilah tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
      alert("Terjadi kesalahan saat mencari istilah.");
    }
  };
 
  return (
    <div className="glosariumz-header">
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={word}
          onChange={handleInputChange}
          placeholder="Cari istilah..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Search on Enter
        />
        <button className="btn login" onClick={handleSearch}>
          Cari
        </button>
      </div>
    </div>
  );
};
 
export default Header;