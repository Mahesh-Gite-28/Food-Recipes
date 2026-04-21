import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_BASE } from "../utils/api";

const AuthModal = ({ show, setShow }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const { login } = useContext(AuthContext);

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validation
    if (!isLogin && form.username.trim().length < 3) {
      setMsg("Username must be at least 3 characters");
      setIsError(true);
      return;
    }

    if (form.password.length < 6) {
      setMsg("Password must be at least 6 characters");
      setIsError(true);
      return;
    }

    const url = isLogin
      ? `${API_BASE}/login`
      : `${API_BASE}/signup`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setMsg(data.message);
        setIsError(false);

        if (isLogin) {
          login(data.user);
        }

        setForm({ username: "", email: "", password: "" });

        setTimeout(() => {
          handleClose();
        }, 1500);
      } else {
        setMsg(data.message || "Error");
        setIsError(true);
      }
    } catch (err) {
      setMsg("Something went wrong");
      setIsError(true);
      console.log(err);
    }
  };

  const handleClose = () => {
    setShow(false);
    setMsg("");
    setForm({ username: "", email: "", password: "" });
    setIsLogin(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-80 p-6 rounded-xl shadow-lg relative">

        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-green-700">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded focus:outline-green-600"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded focus:outline-green-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded focus:outline-green-600"
        />

        {msg && (
          <p
            className={`text-center text-sm mb-3 ${
              isError ? "text-red-500" : "text-green-600 font-semibold"
            }`}
          >
            {msg}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition shadow-md"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-sm text-center mt-3">
          {isLogin ? "No account?" : "Already have account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMsg("");
              setForm({ username: "", email: "", password: "" });
            }}
            className="text-green-700 cursor-pointer ml-1 font-semibold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

        {/* Optional Close Button */}
        <button
          onClick={handleClose}
          className="mt-3 text-red-500 w-full hover:underline"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default AuthModal;