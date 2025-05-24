import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/IstilahDetail.css";
 
function IstilahDetail() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
 
  // Extracting the ID from the URL manually
  const getIdFromURL = () => {
    const url = window.location.pathname;
    const id = url.split("/").pop();
    return id;
  };
 
  const id = getIdFromURL();
  console.log("ID dari URL:", id); // Debugging untuk melihat ID yang diterima
 
  // Fetch data from API using ID
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/istilah/${id}`)
      .then((res) => {
        console.log("API Response:", res.data); // Debugging untuk melihat respons dari API
        if (res.status === 200) {
          setData(res.data); // Store data in state
        } else {
          setError("Istilah tidak ditemukan.");
        }
      })
      .catch((err) => {
        setError("Terjadi kesalahan saat mengambil data.");
        console.error("Error:", err);
      });
  }, [id]); // Runs whenever ID changes
 
  // Display loading or error state
  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;
 
  // Display term details
  return (
    <div className="istilah-container">
      <div className="detail-content">
        <h1>
          {data.kata} {data.emoji ? data.emoji : ""}
        </h1>
        <p>
          <strong>Kelas Kata:</strong> {data.kelas_kata || "Tidak tersedia"}
        </p>
 
        <div className="card">
          <strong>Definisi:</strong>
          <p>{data.deskripsi || "Tidak tersedia"}</p>
        </div>
 
        {data.sinonim && (
          <div className="card">
            <strong>Sinonim:</strong>
            <p>{data.sinonim}</p>
          </div>
        )}
 
        {data.terkait && (
          <div className="card">
            <strong>Kata Terkait:</strong>
            <p>{data.terkait}</p>
          </div>
        )}
      </div>
    </div>
  );
}
 
export default IstilahDetail;