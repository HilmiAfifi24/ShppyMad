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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data || []); // Pastikan data tidak undefined/null
      } catch (error) {
        console.error("Failed to fetch products:", error);
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
          ) : products.length > 0 ? (
            products.map((product) => (
              <CardProduct key={product.id}>
                <CardProduct.Header src={product.image || "https://media.istockphoto.com/id/2120395013/photo/laptop-image.webp?a=1&b=1&s=612x612&w=0&k=20&c=C_uJL46B6QFusEybJpLMIjVznx90QX1i-NAHxaiFyvg="} />
                <CardProduct.Body
                  nama_product={product.nama_product || "No Title"}
                  deskripsi={product.deskripsi || "No Description"}
                />
                <CardProduct.Footer
                  harga={`Rp ${(product.harga || 0).toLocaleString()}`}
                  handleAddToCart={() => handleAddToCart(product)}
                />
              </CardProduct>
            ))
          ) : (
            <p className="text-white">No products available.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;