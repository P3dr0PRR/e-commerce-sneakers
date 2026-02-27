import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { createSneaker } from "../services/products";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
}

const Admin = () => {
  const { products, loading, error, deleteSneaker, refresh } = useProducts();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleCreate() {
    setLoadingCreate(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await createSneaker(name, Number(price), brand, token!);
      setBrand("");
      setName("");
      setPrice("");
      setSuccessMessage("Produto criado com sucesso!");
      await refresh();
    } catch (error) {
      setErrorMessage("Erro ao criar produto: " + error);
    } finally {
      setLoadingCreate(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteSneaker(id);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  }

  function handleReturn() {
    navigate("/home");
  }
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 py-2 cursor-default">
      <header className="flex justify-between items-center w-full  ">
        <div className="flex gap-4 items-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-400 tracking-widest">
            Sole
          </h1>
          <div className="flex flex-col">
            <p className="flex flex-col justify-center items-center md:text-xl text-teal-400 border border-teal-400 px-2 rounded-md">
              ADMIN
            </p>
            <p className="text-white md:text-xl lg:text-2xl flex justify-center items-center">
              username...
            </p>
          </div>
        </div>
        <div>
          <nav className="flex gap-4">
            <button
              className="px-2 md:p-2 md:w-30 text-gray-300/50 border border-teal-400 bg-transparent rounded-md hover:font-semibold"
              onClick={handleReturn}
            >
              RETORNAR
            </button>
          </nav>
        </div>
      </header>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full md:justify-evenly">
        <article className="bg-gray-800/40 rounded-lg border border-teal-600 w-full max-w-md p-8  shadow-lg flex flex-col items-center mt-4 md:mt-10 lg:mt-20">
          {successMessage && <p className="text-green-400">{successMessage}</p>}
          {errorMessage && <p className="text-red-400">{errorMessage}</p>}
          <div className="flex flex-col w-full justify-start">
            <h3 className="text-xl text-white mb-4 font-bold tracking-wide">
              Novo Produto
            </h3>
          </div>
          <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="mb-6">
              <label
                htmlFor="text"
                className="block text-gray-300 mb-2 tracking-wide"
              >
                MARCA
              </label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                type="text"
                id="text"
                className="w-full bg-black text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="EX: Nike, Adidas, Puma..."
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="text"
                className="block text-gray-300 mb-2 tracking-wide"
              >
                NOME
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="text"
                className="w-full bg-black text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="EX: Nike Air Force 1"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-300 mb-2 tracking-wide"
              >
                PREÇO
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                id="password"
                className="w-full bg-black text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="EX: R$ 150,00"
              />
            </div>
          </div>

          <button
            className="w-full bg-teal-400 text-gray-900 py-3 rounded-lg hover:bg-teal-500 transition-colors duration-300 my-6 tracking-wide flex-wrap"
            disabled={loadingCreate}
            onClick={handleCreate}
          >
            {loadingCreate ? "Cadastrando..." : "Cadastrar Produto"}
          </button>
        </article>

        <article className="bg-gray-800/40 rounded-lg border border-teal-600 w-full max-w-md p-8  shadow-lg flex flex-col items-center mt-4 md:mt-10 lg:mt-20">
          <div className="flex gap-4">
            <h3 className="text-xl text-white mb-4 font-bold tracking-wide">
              Produtos Cadastrados
            </h3>
            <p className="text-white">{products.length} produtos</p>
          </div>
          <div className="w-full">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center bg-gray-700 p-4 rounded-lg mb-4"
              >
                <div>
                  <div className="flex">
                    <p className="text-gray-200">{product.brand}</p>
                    <p className="text-gray-200 ml-2">{product.name}</p>
                  </div>
                  <p className="text-teal-400 text-lg">{product.price}</p>
                </div>
                <div className="">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(product.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Admin;
