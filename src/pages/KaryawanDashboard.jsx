import React, { useState } from "react";
import Input from "../components/ui/input";
import Label from "../components/ui/label";
import Button from "../components/ui/button";
import Card from "../components/ui/card";

function KaryawanDashboard() {
  const [formData, setFormData] = useState({
    namaBarang: "",
    jumlah: "",
    satuan: "Unit",
    keterangan: "",
    jenisPembelian: "Offline",
    linkToko: "",
    estimasiTiba: "",
    harga: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Permintaan berhasil dikirim!");
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Form Permintaan Barang</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="namaBarang">Nama Barang</Label>
            <Input
              name="namaBarang"
              value={formData.namaBarang}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="jumlah">Jumlah</Label>
            <Input
              type="number"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="satuan">Satuan</Label>
            <select
              name="satuan"
              value={formData.satuan}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Unit">Unit</option>
              <option value="Pcs">Pcs</option>
              <option value="Box">Box</option>
              <option value="Meter">Meter</option>
              <option value="Lusin">Lusin</option>
            </select>
          </div>

          <div>
            <Label htmlFor="keterangan">Keterangan</Label>
            <textarea
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <Label htmlFor="jenisPembelian">Jenis Pembelian</Label>
            <select
              name="jenisPembelian"
              value={formData.jenisPembelian}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {formData.jenisPembelian === "Online" && (
            <>
              <div>
                <Label htmlFor="linkToko">Link Toko Online</Label>
                <Input
                  name="linkToko"
                  value={formData.linkToko}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="estimasiTiba">Estimasi Tiba</Label>
                <Input
                  name="estimasiTiba"
                  value={formData.estimasiTiba}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="harga">Harga Barang</Label>
                <Input
                  type="number"
                  name="harga"
                  value={formData.harga}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <Button type="submit">Kirim Permintaan</Button>
        </form>
      </Card>
    </div>
  );
}

export default KaryawanDashboard;
