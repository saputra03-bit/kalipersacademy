import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import logo from "../assets/1-removebg-preview.png";

function FormulirKaryawan() {
  const [form, setForm] = useState({
    nama: "",
    jabatan: "",
    namaBarang: "",
    jumlah: "",
    satuan: "",
    harga: "",
    urgent: false,
    metodePembelian: "offline",
    linkToko: "",
    estimasiTiba: "",
    fotoBarang: "",
    keterangan: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, fotoBarang: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "permintaanBarang"), {
        ...form,
        createdAt: Timestamp.now(),
        accStatus: "Menunggu",
        tanggal: new Date().toLocaleDateString(),
      });
      alert("Permintaan berhasil dikirim!");
      setForm({
        nama: "",
        jabatan: "",
        namaBarang: "",
        jumlah: "",
        satuan: "",
        harga: "",
        urgent: false,
        metodePembelian: "offline",
        linkToko: "",
        estimasiTiba: "",
        fotoBarang: "",
        keterangan: "",
      });
    } catch (error) {
      console.error("Gagal mengirim:", error);
      alert("Terjadi kesalahan saat mengirim permintaan.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-6 space-y-4">
        <div className="flex justify-center">
          <img src={logo} alt="Kalipers Logo" className="h-20 mb-4" />
        </div>
        <h2 className="text-2xl font-bold text-green-700 text-center">
          Formulir Permintaan Barang
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="nama"
              placeholder="Nama"
              value={form.nama}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              required
            />
            <select
              name="jabatan"
              value={form.jabatan}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              required
            >
              <option value="">Pilih Jabatan</option>
              <option>Housekeeping</option>
              <option>Gardener</option>
              <option>Office Boy/Girl</option>
              <option>Laundry</option>
              <option>Electric</option>
              <option>Driver</option>
              <option>Medis</option>
            </select>
            <input
              type="text"
              name="namaBarang"
              placeholder="Nama Barang"
              value={form.namaBarang}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              required
            />
            <input
              type="number"
              name="jumlah"
              placeholder="Jumlah"
              value={form.jumlah}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              required
            />
            <select
              name="satuan"
              value={form.satuan}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              required
            >
              <option value="">Pilih Satuan</option>
              <option>pcs</option>
              <option>box</option>
              <option>liter</option>
              <option>unit</option>
              <option>meter</option>
            </select>
            <input
              type="number"
              name="harga"
              placeholder="Harga"
              value={form.harga}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="urgent"
              checked={form.urgent}
              onChange={handleChange}
            />
            <label>Permintaan Urgent</label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="col-span-2">Metode Pembelian:</label>
            <label>
              <input
                type="radio"
                name="metodePembelian"
                value="offline"
                checked={form.metodePembelian === "offline"}
                onChange={handleChange}
              />
              Offline
            </label>
            <label>
              <input
                type="radio"
                name="metodePembelian"
                value="online"
                checked={form.metodePembelian === "online"}
                onChange={handleChange}
              />
              Online
            </label>
          </div>

          {form.metodePembelian === "online" && (
            <div className="grid grid-cols-1 gap-4">
              <input
                type="url"
                name="linkToko"
                placeholder="Link Toko Online"
                value={form.linkToko}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="estimasiTiba"
                placeholder="Estimasi Tiba (contoh: 2 hari)"
                value={form.estimasiTiba}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              {form.fotoBarang && (
                <img
                  src={form.fotoBarang}
                  alt="Preview"
                  className="h-24 w-auto mt-2 rounded-lg border"
                />
              )}
            </div>
          )}

          <textarea
            name="keterangan"
            placeholder="Keterangan tambahan..."
            value={form.keterangan}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
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
