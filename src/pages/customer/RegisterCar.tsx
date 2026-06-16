import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

function RegisterCar() {
  const navigate = useNavigate();

  const [bienSoXe, setBienSoXe] = useState("");
  const [loaiXe, setLoaiXe] = useState("");
  const [hangXe, setHangXe] = useState("");
  const [model, setModel] = useState("");
  const [mauXe, setMauXe] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Bạn cần đăng nhập để đăng ký xe");
        return;
      }

      await axiosClient.post(
        "/api/vehicles",
        {
          LicensePlate: bienSoXe,
          VehicleType: loaiXe,
          Brand: hangXe,
          Model: model,
          Color: mauXe,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Đăng ký xe thành công");

      navigate("/home");
    } catch (error) {
      console.log(error);
      setMessage("Đăng ký xe thất bại");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Đăng ký xe
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Thêm thông tin xe của bạn vào hệ thống
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biển số xe
            </label>
            <input
              placeholder="Ví dụ: 59F1-12345"
              value={bienSoXe}
              onChange={(e) => setBienSoXe(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại xe
            </label>
            <input
              placeholder="Ví dụ: Xe máy, Xe tay ga, Ô tô"
              value={loaiXe}
              onChange={(e) => setLoaiXe(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hãng xe
            </label>
            <input
              placeholder="Ví dụ: Honda, Yamaha, Toyota"
              value={hangXe}
              onChange={(e) => setHangXe(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <input
              placeholder="Ví dụ: Wave Alpha, Vision, Vios"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Màu xe
            </label>
            <input
              placeholder="Ví dụ: Đỏ, Đen, Trắng"
              value={mauXe}
              onChange={(e) => setMauXe(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Đăng ký xe
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}

export default RegisterCar;