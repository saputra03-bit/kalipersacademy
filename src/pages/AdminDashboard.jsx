// ======== AdminDashboard.jsx ========
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import * as XLSX from "xlsx";
import { db } from "../firebase";
import logo from "../assets/1-removebg-preview.png";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "permintaanBarang"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    });
    return () => unsub();
  }, []);

  const handleAcc = async (id, status) => {
    const docRef = doc(db, "requests", id);
    await updateDoc(docRef, { accStatus: status });
  };

  const downloadExcel = () => {
    const data = requests.map((r, index) => ({
      "No": index + 1,
      "Tanggal": r.tanggal,
      "Nama": r.nama,
      "Jabatan": r.jabatan,
      "Nama Barang": r.namaBarang,
      "Jumlah": `${r.jumlah} ${r.satuan}`,
      "Harga": r.harga,
      "Urgent": r.urgent ? "URGENT" : "Normal",
      "Metode": r.metodePembelian,
      "Link Toko": r.linkToko || "-",
      "Estimasi Tiba": r.estimasiTiba || "-",
      "Status": r.accStatus || "-",
    }));

    const sheet = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Permintaan");

    // Styling: header bold + green
    const headerRange = XLSX.utils.decode_range(sheet['!ref']);
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!sheet[cellAddress]) continue;
      sheet[cellAddress].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "D9F99D" } },
        alignment: { horizontal: "center" },
      };
    }

    XLSX.writeFile(wb, "Rekapan_Permintaan_Kalipers.xlsx");
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Kalipers Logo" className="h-20" />
        </div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-green-700">Dashboard Admin</h1>
          <button onClick={downloadExcel} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition">
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
                <th className="p-2 border">Link Toko</th>
                <th className="p-2 border">Estimasi</th>
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
                  <td className="p-2 border">{item.jumlah} {item.satuan}</td>
                  <td className="p-2 border">Rp {item.harga}</td>
                  <td className="p-2 border">{item.urgent ? "URGENT" : "Normal"}</td>
                  <td className="p-2 border capitalize">{item.metodePembelian}</td>
                  <td className="p-2 border">{item.linkToko || "-"}</td>
                  <td className="p-2 border">{item.estimasiTiba || "-"}</td>
                  <td className="p-2 border">{item.accStatus || "-"}</td>
                  <td className="p-2 border">
                    <button onClick={() => handleAcc(item.id, "Disetujui")} className="bg-green-500 text-white px-3 py-1 rounded mr-1">✅</button>
                    <button onClick={() => handleAcc(item.id, "Ditolak")} className="bg-red-500 text-white px-3 py-1 rounded">❌</button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="13" className="text-center text-gray-400 italic p-4">
                    Belum ada permintaan barang.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
