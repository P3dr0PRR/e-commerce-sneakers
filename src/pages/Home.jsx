import { useState, useRef } from "react";
import { useProducts } from "../hooks/useProducts";

const Home = () => {
  const [selectedBrand, setSelectedBrand] = useState("todos");
  const productsRef = useRef(null);

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
    <section className="min-h-screen bg-gray-900 flex flex-col py-2 cursor-default p-2">
      <header className="flex justify-between items-center w-full  ">
        <div className="flex gap-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-400 tracking-widest">
            Sole
          </h1>
          <p className="flex flex-col md:text-xl text-gray-300/50">
            olá
            <span className="text-white md:text-xl lg:text-2xl">...</span>
          </p>
        </div>
        <div>
          <nav className="flex gap-4">
            <button className="px-2 md:p-2 md:w-30 bg-teal-400  rounded-md hover:font-semibold">
              ADMIN
            </button>
            <button className="px-2 md:p-2 md:w-30 text-gray-300/50 border border-teal-400 bg-transparent rounded-md hover:font-semibold">
              SAIR
            </button>
          </nav>
        </div>
      </header>
      <article className="flex flex-col items-start justify-center mt-4 md:mt-10 lg:mt-20">
        <p className="text-xl md:text-2xl lg:text-3xl text-teal-400 mb-4">
          // Coleção de {colectionYear[0].year}
        </p>
        <h2 className="text-white text-wide text-4xl md:text-7xl lg:text-8xl font-bold tracking-widest">
          Os melhores tenis do
        </h2>
        <p className="text-5xl md:text-8xl lg:text-9xl text-teal-400 mt-4 font-bold">
          Mundo.
        </p>
        <p className="text-gray-300/50 text-lg md:text-2xl mt-6">
          Encontre o par perfeito para cada momento
        </p>
      </article>
      <article className="mb-6">
        <nav className="flex flex-wrap items-center justify-center gap-4 mt-10">
          {buttons.map((button) => (
            <button
              key={button.name}
              className="p-2 w-30 bg-teal-400  rounded-md hover:font-semibold"
              onClick={() => {
                setSelectedBrand(button.value);
                productsRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {button.name}
            </button>
          ))}
        </nav>
      </article>
      <article
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        ref={productsRef}
      >
        {filtered.map((product) => (
          <div
            key={product.id}
            className=" flex flex-col items-center justify-center bg-gray-800 p-4 m-2 rounded-md"
          >
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
