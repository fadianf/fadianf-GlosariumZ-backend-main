import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditIstilah() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    kata: "",
    kelas_kata: "",
    deskripsi: "",
    sinonim: "",
    terkait: "",
    emoji: ""
  });

  // Ambil data berdasarkan ID saat komponen dimount
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/istilah/${id}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data) {
          setFormData({
            kata: data.kata || "",
            kelas_kata: data.kelas_kata || "",
            deskripsi: data.deskripsi || "",
            sinonim: data.sinonim || "",
            terkait: data.terkait || "",
            emoji: data.emoji || ""
          });
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        alert("Gagal mengambil data dari server");
      });
  }, [id]);

  // Tangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit data ke backend
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the auth token from localStorage
    const authToken = window.localStorage.getItem("authToken");

    axios
      .put(
        `http://127.0.0.1:8000/api/istilah/${id}`,
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${ authToken }`, // Add the Bearer token here
        },
      }
    )
    .then((res) => {
  if (res.data) {
    alert("Berhasil disimpan");
    navigate("/admin");
  } else {
    alert("Gagal menyimpan");
  }
  })
  .catch((err) => {
    console.error("Gagal update:", err);
    alert("Terjadi kesalahan saat menyimpan");
  });
};

return (
  <div className="edit-page">
    <h2>Edit Istilah</h2>
    <form onSubmit={handleSubmit}>
      <input
        name="kata"
        value={formData.kata}
        onChange={handleChange}
        placeholder="Kata"
      />
      <input
        name="kelas_kata"
        value={formData.kelas_kata}
        onChange={handleChange}
        placeholder="Kelas Kata"
      />
      <textarea
        name="deskripsi"
        value={formData.deskripsi}
        onChange={handleChange}
        placeholder="Deskripsi"
      />
      <input
        name="sinonim"
        value={formData.sinonim}
        onChange={handleChange}
        placeholder="Sinonim"
      />
      <input
        name="terkait"
        value={formData.terkait}
        onChange={handleChange}
        placeholder="Kata Terkait"
      />
      <input
        name="emoji"
        value={formData.emoji}
        onChange={handleChange}
        placeholder="Emoji"
      />
      <button type="submit">Simpan</button>
    </form>
  </div>
);
}

export default EditIstilah;
