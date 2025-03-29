import { useEffect, useState } from "react";
import { getProducts } from "../../services/Product.service";
import CardProduct from "../../components/Fragments/CardProduct";

const HeaderSection = ({ cartCount }) => (
  <header className="bg-gray-900 text-white py-6 px-8 shadow-lg text-center flex justify-between items-center">
    <h1 className="text-3xl font-bold">Product List</h1>
    <div className="bg-gray-800 px-4 py-2 rounded-lg">
      🛒 Cart: <span className="font-bold">{cartCount}</span>
    </div>
  </header>
);

const FooterSection = () => (
  <footer className="bg-gray-900 text-gray-400 py-6 text-center mt-10 border-t border-gray-700">
    <p>&copy; 2025 Your Store. All rights reserved.</p>
  </footer>
);

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const data = await getProducts();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format from API");
        }
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // fungsi menambahkan cart ke keranjang
  const handleAddToCart = (product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id && p.stok > 0 ? { ...p, stok: p.stok - 1 } : p
      )
    );

    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    console.log("Added to cart:", product);
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <HeaderSection cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      <main className="flex-grow p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <p className="text-gray-400">Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <CardProduct key={product.id}>
                <CardProduct.Header
                  src={
                    product.image ??
                    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyfGVufDB8fDB8fHww"
                  }
                />
                <CardProduct.Body
                  nama_product={product.nama_product}
                  deskripsi={product.deskripsi}
                  stok={product.stok}
                />
                <CardProduct.Footer
                  harga={`Rp ${(product.harga || 0).toLocaleString()}`}
                  handleAddToCart={() => {
                    if (product.stok > 0) {
                      handleAddToCart(product);
                    } else {
                      alert("Stok habis!");
                    }
                  }}
                />

              </CardProduct>
            ))
          ) : (
            <p className="text-gray-400 text-center w-full">No products available.</p>
          )}
        </div>
        {/* Cart Section */}
        <div className="mt-10 p-5 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
          {cart.length > 0 ? (
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between bg-gray-700 p-3 rounded-md">
                  <span>{item.nama_product} (x{item.quantity})</span>
                  <span className="font-bold">Rp {(item.harga * item.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">Your cart is empty.</p>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default ProductsPage;
