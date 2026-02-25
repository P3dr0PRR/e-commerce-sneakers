import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { func } from "prop-types";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      await register(name, email, password);
      navigate("/login");
    } catch (error) {
      console.error("Erro de registro:", error);
    }
  }

  function handleLogin() {
    navigate("/");
  }

  return (
    <section className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 py-2 cursor-default">
      <header className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-teal-400 mb-6 tracking-widest drop-shadow-lg drop-shadow-smoke drop-shadow-teal-400">
          SOLE
        </h1>
        <h2 className="text-xl text-gray-300/50 mb-4">Loja premium de tênis</h2>
      </header>
      <div className="bg-gray-800/40 rounded-lg border border-teal-600 w-full max-w-md p-8  shadow-lg flex flex-col items-center">
        <div className="w-full">
          <h3 className="text-4xl text-white mb-4 font-bold tracking-wide">
            Criar Conta
          </h3>
          <p className="text-gray-300/50">Junte-se a comunidade SOLE</p>
        </div>
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-300 mb-2 tracking-wide"
            >
              NOME
            </label>
            <input
              type="text"
              id="name"
              className="w-full bg-black text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-300 mb-2 tracking-wide"
            >
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-black text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-300 mb-2 tracking-wide"
            >
              SENHA
            </label>
            <input
              type="password"
              id="password"
              className="w-full bg-black text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-end justify-end w-full max-w-md mt-4"></div>
        <button
          className="w-full bg-teal-400 text-gray-900 py-3 rounded-lg hover:bg-teal-500 transition-colors duration-300 my-6 tracking-widest"
          onClick={handleSubmit}
        >
          CADASTRAR
        </button>

        <span className="text-gray-300/50">ou</span>

        <p className="flex gap-2 text-gray-300/50">
          Já tem conta ?{" "}
          <button className="text-teal-400" onClick={handleLogin}>
            Entrar
          </button>
        </p>
      </div>
    </section>
  );
};

export default Register;
