import { useEffect, useState } from "react";
import { getProducts } from "../../services/Product.service";
import CardProduct from "../../components/Fragments/CardProduct";

const HeaderSection = () => (
  <header className="bg-gray-900 text-white py-6 px-8 shadow-lg text-center">
    <h1 className="text-3xl font-bold">Product List</h1>
  </header>
);

const FooterSection = () => (
  <footer className="bg-gray-900 text-gray-400 py-6 text-center mt-10 border-t border-gray-700">
    <p>&copy; 2025 Your Store. All rights reserved.</p>
  </footer>
);

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProducts();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format from API");
        }
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <HeaderSection />
      <main className="flex-grow p-10 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <p className="text-gray-400">Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <CardProduct key={product.id}>
                <CardProduct.Header src={product.image ?? "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyfGVufDB8fDB8fHww"} />
                <CardProduct.Body nama_product={product.nama_product} deskripsi={product.deskripsi} stok={product.stok} />
                <CardProduct.Footer harga={`Rp ${(product.harga || 0).toLocaleString()}`} handleAddToCart={() => handleAddToCart(product)} />
              </CardProduct>
            ))
          ) : (
            <p className="text-gray-400 text-center w-full">No products available.</p>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default ProductsPage;
