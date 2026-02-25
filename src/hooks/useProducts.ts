import { useState, useEffect } from "react";
import { getSneakers, deleteSneakers } from "../services/products";
import { useAuth } from "../contexts/AuthContext";

export function useProducts() {
  const [products, setProducts] = useState<
    { id: number; name: string; price: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getSneakers(token!);
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  async function deleteSneaker(id: number) {
    await deleteSneakers(id, token!);
    setProducts(products.filter((product) => product.id !== id));
  }

  return { products, loading, error, deleteSneaker };
}
