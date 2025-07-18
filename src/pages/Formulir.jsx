import React, { useState } from "react";

const Formulir = () => {
  const [formData, setFormData] = useState({
    namaBarang: "",
    jumlah: "",
    satuan: "",
    keterangan: "",
    jenisPembelian: "Luring",
    linkToko: "",
    estimasiTiba: "",
    harga: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data dikirim:", formData);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 py-10 px-4 md:px-10">
      <div className="max-w-xl mx-auto bg-green-50 p-8 rounded-2xl shadow-xl border border-green-200">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Form Permintaan Barang
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-medium text-sm">Nama Barang</label>
            <input
              type="text"
              name="namaBarang"
              value={formData.namaBarang}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-sm">Jumlah</label>
              <input
                type="number"
                name="jumlah"
                value={formData.jumlah}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="font-medium text-sm">Satuan</label>
              <select
                name="satuan"
                value={formData.satuan}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              >
                <option value="">Pilih Satuan</option>
                <option value="pcs">pcs</option>
                <option value="unit">unit</option>
                <option value="box">box</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-medium text-sm">Keterangan</label>
            <textarea
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
            ></textarea>
          </div>

          <div>
            <label className="font-medium text-sm">Jenis Pembelian</label>
            <select
              name="jenisPembelian"
              value={formData.jenisPembelian}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="Luring">Luring (Offline)</option>
              <option value="Daring">Daring (Online)</option>
            </select>
          </div>

          {formData.jenisPembelian === "Daring" && (
            <div className="space-y-3">
              <div>
                <label className="font-medium text-sm">Link Toko Online</label>
                <input
                  type="text"
                  name="linkToko"
                  value={formData.linkToko}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="font-medium text-sm">Estimasi Tiba</label>
                <input
                  type="text"
                  name="estimasiTiba"
                  value={formData.estimasiTiba}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="font-medium text-sm">Harga</label>
                <input
                  type="text"
                  name="harga"
                  value={formData.harga}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
          >
            Kirim Permintaan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Formulir;
