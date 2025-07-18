import React, { useEffect, useState } from "react";
import logo from "../assets/1-removebg-preview.png";
import * as XLSX from "xlsx";

function AdminDashboard() {
  const [requests, setRequests] = useState(() => {
    const stored = localStorage.getItem("permintaanBarang");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("permintaanBarang", JSON.stringify(requests));
  }, [requests]);

  const handleAcc = (id, status) => {
    const updated = requests.map((item) =>
      item.id === id ? { ...item, accStatus: status } : item
    );
    setRequests(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

 const downloadExcel = () => {
  const offlineData = requests.filter((r) => r.metodePembelian === "offline");
  const onlineData = requests.filter((r) => r.metodePembelian === "online");

  const formatData = (data) =>
    data.map((r, i) => ({
      No: i + 1,
      Tanggal: r.tanggal,
      Nama: r.nama,
      Jabatan: r.jabatan,
      Barang: r.namaBarang,
      Jumlah: `${r.jumlah} ${r.satuan}`,
      Harga: r.harga,
      Urgensi: r.urgent ? "URGENT" : "Normal",
      Metode: r.metodePembelian,
      LinkToko: r.linkToko,
      EstimasiTiba: r.estimasiTiba,
      Keterangan: r.keterangan,
      Status: r.accStatus,
    }));

  const createFile = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(formatData(data));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekapan");
    XLSX.writeFile(wb, fileName);
  };

  createFile(offlineData, "Rekapan_Offline_Kalipers.xlsx");
  createFile(onlineData, "Rekapan_Online_Kalipers.xlsx");
};

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Kalipers Logo" className="h-20" />
        </div>

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
          <h1 className="text-2xl font-bold text-green-700">
            Dashboard Admin – Permintaan Barang
          </h1>
          <button
            onClick={downloadExcel}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
          >
            Download Excel
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-xl p-4">
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
                <th className="p-2 border">Urgent</th>
                <th className="p-2 border">Metode</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((item, index) => (
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
                  <td className="p-2 border capitalize">
                    {item.metodePembelian}
                  </td>
                  <td className="p-2 border">{item.accStatus}</td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAcc(item.id, "Disetujui")}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => handleAcc(item.id, "Ditolak")}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        ❌
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="11" className="text-center text-gray-400 italic p-4">
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

export default AdminDashboard;
