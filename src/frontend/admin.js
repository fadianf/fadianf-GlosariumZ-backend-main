import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/admin.css";
 
function AdminPage() {
  const navigate = useNavigate();
  const [terms, setTerms] = useState([]);
  const [error, setError] = useState("");
 
  // Function to fetch terms data
  const fetchTerms = () => {
    axios
      .get("http://127.0.0.1:8000/api/istilah")
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error); // Menangani error dari backend
        } else {
          setTerms(res.data); // Menyimpan istilah di state
        }
      })
      .catch((err) => {
        setError("Terjadi kesalahan saat mengambil data");
        console.error(err);
      });
  };
 
  // Mengambil data istilah dari API saat pertama kali load
  useEffect(() => {
    fetchTerms();
  }, []);
 
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus istilah ini?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/istilah/${id}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authToken")}`
          }
        })
        .then((res) => {
          if (res.data) {
            alert("Istilah berhasil dihapus");
            fetchTerms(); // Refetch the terms after successful delete
          } else {
            alert("Gagal menghapus istilah");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Terjadi kesalahan saat menghapus istilah");
        });
    }
  };
 
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
 
  const handleAdd = () => {
    navigate("/tambah");
  };
 
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🧢 Hello <strong>Admin</strong></h1>
        <button className="btn-add" onClick={handleAdd}>+ Tambah</button>
      </div>
 
      <h2>Daftar Istilah</h2>
      {error && <p>{error}</p>}
      {terms.length === 0 ? (
        <p>Belum ada istilah</p>
      ) : (
        terms.map((term) => (
          <div key={term.id} className="term-card">
            <span className="term-word">
              <strong>{term.kata}</strong> {term.emoji}
            </span>
            <p>{term.deskripsi}</p>
            <div className="term-actions">
              <button className="btn-edit" onClick={() => handleEdit(term.id)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(term.id)}>Hapus</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
 
export default AdminPage;