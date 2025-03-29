import { useEffect, useState } from "react";
import { getProducts } from "../../services/Product.service";
import CardProduct from "../../components/Fragments/CardProduct";

const Header = () => (
  <header className="bg-gray-900 text-white py-4 px-6 shadow-md">
    <h1 className="text-2xl font-bold text-center">Product List</h1>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-4 text-center mt-10">
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
        setError(""); // Reset error state
        const data = await getProducts();

        console.log("Fetched products:", data); // Debugging API response

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format from API");
        }

        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to fetch products. Please try again later.");
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-10 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-white">Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : products.length > 0 ? (
            products.map((product) => {
              console.log("Rendering product:", product); // Debugging rendering
              return (
                <CardProduct key={product.id}>
                  <CardProduct.Header
                    src={
                      product.image ??
                      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FyfGVufDB8fDB8fHww"
                    }
                  />
                  <CardProduct.Body
                    nama_product={product.nama_product ?? "No Title"}
                    deskripsi={product.deskripsi ?? "No Description"}
                  />
                  <CardProduct.Footer
                    harga={`Rp ${(product.harga || 0).toLocaleString()}`}
                    handleAddToCart={() => handleAddToCart(product)}
                  />
                </CardProduct>
              );
            })
          ) : (
            <p className="text-gray-400 text-center w-full">
              No products available.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
