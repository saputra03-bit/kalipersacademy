import React, { useEffect, useState } from "react";
import logo from "../assets/1-removebg-preview.png";

function FormulirKaryawan() {
  const [form, setForm] = useState({
    nama: "",
    jabatan: "",
    namaBarang: "",
    jumlah: "",
    satuan: "pcs",
    harga: "",
    urgent: false,
    metodePembelian: "offline",
    linkToko: "",
    estimasiTiba: "",
    keterangan: "",
    accStatus: "Menunggu",
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "karyawan") window.location.href = "/";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const waktu = new Date();
    const tanggal = waktu.toLocaleDateString();
    const jam = waktu.toLocaleTimeString();

    const newData = {
      ...form,
      id: Date.now(),
      tanggal,
      waktu: `${tanggal} ${jam}`,
      gambar: preview,
    };

    const existing = JSON.parse(localStorage.getItem("permintaanBarang")) || [];
    localStorage.setItem("permintaanBarang", JSON.stringify([...existing, newData]));
    alert("Permintaan barang berhasil dikirim!");
    setForm({
      nama: "",
      jabatan: "",
      namaBarang: "",
      jumlah: "",
      satuan: "pcs",
      harga: "",
      urgent: false,
      metodePembelian: "offline",
      linkToko: "",
      estimasiTiba: "",
      keterangan: "",
      accStatus: "Menunggu",
    });
    setPreview(null);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <img src={logo} alt="Logo" className="h-16" />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
          Formulir Permintaan Barang
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="Nama Lengkap"
              className="border p-2 rounded-lg"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
            />
            <select
              required
              className="border p-2 rounded-lg"
              value={form.jabatan}
              onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
            >
              <option value="">Pilih Jabatan</option>
              <option value="Housekeeping">Housekeeping</option>
              <option value="Laundry">Laundry</option>
              <option value="Electric">Electric</option>
              <option value="Driver">Driver</option>
              <option value="Medis">Medis</option>
              <option value="Office Boy/Girl">Office Boy/Girl</option>
              <option value="Gardener">Gardener</option>
            </select>
            <input
              required
              type="text"
              placeholder="Nama Barang"
              className="border p-2 rounded-lg"
              value={form.namaBarang}
              onChange={(e) => setForm({ ...form, namaBarang: e.target.value })}
            />
            <input
              required
              type="number"
              placeholder="Jumlah"
              className="border p-2 rounded-lg"
              value={form.jumlah}
              onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
            />
            <select
              className="border p-2 rounded-lg"
              value={form.satuan}
              onChange={(e) => setForm({ ...form, satuan: e.target.value })}
            >
              <option value="pcs">pcs</option>
              <option value="lusin">lusin</option>
              <option value="unit">unit</option>
              <option value="rim">rim</option>
              <option value="roll">roll</option>
              <option value="meter">meter</option>
            </select>
            <input
              required
              type="number"
              placeholder="Harga (Rp)"
              className="border p-2 rounded-lg"
              value={form.harga}
              onChange={(e) => setForm({ ...form, harga: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.urgent}
                onChange={(e) => setForm({ ...form, urgent: e.target.checked })}
              />
              <span className="text-sm">Urgent</span>
            </label>

            <label className="flex items-center gap-2">
              <span className="text-sm">Metode Pembelian:</span>
              <select
                value={form.metodePembelian}
                onChange={(e) => setForm({ ...form, metodePembelian: e.target.value })}
                className="border p-1 rounded"
              >
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </select>
            </label>
          </div>

          {form.metodePembelian === "online" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Link Toko Online"
                className="border p-2 rounded-lg"
                value={form.linkToko}
                onChange={(e) => setForm({ ...form, linkToko: e.target.value })}
              />
              <input
                type="text"
                placeholder="Estimasi Tiba (ex: 3 hari)"
                className="border p-2 rounded-lg"
                value={form.estimasiTiba}
                onChange={(e) => setForm({ ...form, estimasiTiba: e.target.value })}
              />
            </div>
          )}

          <textarea
            placeholder="Keterangan Tambahan"
            className="border p-2 rounded-lg w-full"
            rows="3"
            value={form.keterangan}
            onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Upload Foto Barang (Opsional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="block w-full text-sm text-gray-700 border rounded-lg"
            />
            {preview && (
              <img src={preview} alt="Preview" className="mt-4 h-32 object-contain rounded" />
            )}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
          >
            Kirim Permintaan
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          &copy; 2025 Kalipers Academy — Dibuat oleh <b>Risky Saputra</b>
        </p>
      </div>
    </div>
  );
}

export default FormulirKaryawan;
