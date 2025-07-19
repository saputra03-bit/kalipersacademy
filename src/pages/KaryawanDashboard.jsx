// src/pages/KaryawanDashboard.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import logo from "../assets/1-removebg-preview.png";

function KaryawanDashboard() {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const username = localStorage.getItem("username");
    if (role !== "karyawan" || !username) {
      window.location.href = "/";
    } else {
      setCurrentUser(username);
      const q = query(
        collection(db, "permintaanBarang"),
        where("username", "==", username)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const requests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(requests);
      });
      return () => unsubscribe();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Kalipers Logo" className="h-20" />
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-700">
            Dashboard Karyawan — Permintaan Barang
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg p-4">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-green-100 text-green-800 text-left">
                <th className="p-2 border">No</th>
                <th className="p-2 border">Tanggal</th>
                <th className="p-2 border">Nama</th>
                <th className="p-2 border">Jabatan</th>
                <th className="p-2 border">Barang</th>
                <th className="p-2 border">Jumlah</th>
                <th className="p-2 border">Harga</th>
                <th className="p-2 border">Urgensi</th>
                <th className="p-2 border">Metode</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="hover:bg-green-50">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{item.tanggal}</td>
                  <td className="p-2 border">{item.nama}</td>
                  <td className="p-2 border">{item.jabatan}</td>
                  <td className="p-2 border">{item.namaBarang}</td>
                  <td className="p-2 border">
                    {item.jumlah} {item.satuan}
                  </td>
                  <td className="p-2 border">Rp {item.harga}</td>
                  <td className="p-2 border">
                    {item.urgent ? (
                      <span className="text-red-600 font-bold">URGENT</span>
                    ) : (
                      "Normal"
                    )}
                  </td>
                  <td className="p-2 border capitalize">{item.metodePembelian}</td>
                  <td className="p-2 border font-semibold">
                    {item.accStatus || "-"}
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center italic text-gray-400 py-6">
                    Belum ada permintaan barang.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          &copy; 2025 Kalipers Academy — Dibuat oleh <b>Risky Saputra</b>
        </p>
      </div>
    </div>
  );
}

export default KaryawanDashboard;
