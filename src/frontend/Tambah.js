import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/Tambah.css";
 
function TambahEditPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    kata: "", 
    deskripsi: "", 
    kelas_kata: "",
    sinonim: "",
    terkait: "",
    emoji: ""
  });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSimpan = async () => {
    if (formData.kata.trim() === "") {
      alert("Istilah tidak boleh kosong!");
      return;
    }
 
    try {
      const authToken = window.localStorage.getItem("authToken"); // Get auth token
 
      const res = await axios.post(
        "http://127.0.0.1:8000/api/istilah",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}` // Add Bearer token here
          }
        }
      );
 
      console.log(res.data); // DEBUG: tampilkan respon dari backend
 
      if (res.data) { 
        alert("Berhasil menambah istilah!");
        navigate("/admin");
      } else {
        alert("Gagal menyimpan: " + (res.data.message || "Tidak diketahui"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan saat menyimpan.");
    }
  };
 
  return (
    <div className="form-container">
      <h2>Tambah Istilah</h2>
 
      <label>Istilah</label>
      <input name="kata" value={formData.kata} onChange={handleChange} /> 
 
      <label>Deskripsi</label> 
      <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} /> 
 
      <label>Kelas Kata</label>
      <input name="kelas_kata" value={formData.kelas_kata} onChange={handleChange} />
 
      <label>Sinonim</label>
      <input name="sinonim" value={formData.sinonim} onChange={handleChange} />
 
      <label>Kata Terkait</label>
      <input name="terkait" value={formData.terkait} onChange={handleChange} />
 
      <label>Emoji</label>
      <input name="emoji" value={formData.emoji} onChange={handleChange} />
 
      <div className="button-group">
        <button onClick={handleSimpan} className="btn-simpan">Simpan</button>
        <button onClick={() => navigate("/admin")} className="btn-batal">Batal</button>
      </div>
    </div>
  );
}
 
export default TambahEditPage;