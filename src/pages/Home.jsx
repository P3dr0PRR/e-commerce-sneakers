import { useState } from "react";
import { useProducts } from "../hooks/useProducts";

const Home = () => {
  const [selectedBrand, setSelectedBrand] = useState("todos");

  const colectionYear = [
    { year: 2026 },
    { year: 2025 },
    { year: 2024 },
    { year: 2023 },
  ];

  const { products, loading, error } = useProducts();

  const filtered =
    selectedBrand === "todos"
      ? products
      : products.filter((p) => p.brand?.toLowerCase() === selectedBrand);

  const buttons = [
    { name: "Todos", value: "todos" },
    { name: "Nike", value: "nike" },
    { name: "Adidas", value: "adidas" },
    { name: "New Balance", value: "newbalance" },
    { name: "Jordan", value: "jordan" },
  ];

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <section className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 py-2 cursor-default">
      <header className="flex justify-between items-center w-full bg-pink-300 ">
        <div className="flex">
          <h1 className="text-4xl font-bold text-teal-400 tracking-widest">
            Sole
          </h1>
          <p className="flex flex-col text-gray-300/50">
            olá
            <span className="text-white">...</span>
          </p>
        </div>
        <div>
          <nav className="flex gap-4">
            <button className="p-2 w-30 bg-teal-400  rounded-md hover:font-semibold">
              ADMIN
            </button>
            <button className="p-2 w-30 text-gray-300/50 border border-gray-300 bg-transparent rounded-md hover:font-semibold">
              SAIR
            </button>
          </nav>
        </div>
      </header>
      <article className="flex flex-col items-start justify-center mt-20">
        <p className="text-2xl text-teal-400 mb-4">
          // Coleção de {colectionYear[0].year}
        </p>
        <h2 className="text-white text-wide text-9xl font-bold tracking-widest">
          Os melhores tenis do
        </h2>
        <p className="text-9xl text-teal-400 mt-4">Mundo</p>
        <p className="text-gray-300/50 text-2xl mt-6">
          Encontre o par perfeito para cada momento
        </p>
      </article>
      <article className="mb-6">
        <nav className="flex gap-4 mt-10">
          {buttons.map((button) => (
            <button
              key={button.name}
              className="p-2 w-30 bg-teal-400  rounded-md hover:font-semibold"
              onClick={() => setSelectedBrand(button.value)}
            >
              {button.name}
            </button>
          ))}
        </nav>
      </article>
      <article>
        {filtered.map((product) => (
          <div key={product.id} className="bg-gray-800 p-4 m-2 rounded-md">
            <h3 className="text-white text-xl">{product.name}</h3>
            <p className="text-gray-300">{product.brand}</p>
            <p className="text-teal-400">${product.price}</p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Home;
