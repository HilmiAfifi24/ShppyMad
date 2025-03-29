import { useEffect, useState } from "react";
import { getProducts } from "../../services/Product.service";
import CardProduct from "../../components/Fragments/CardProduct";

const HeaderSection = ({ cartCount }) => (
  <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-6 px-8 shadow-lg text-center flex justify-between items-center">
    <h1 className="text-3xl font-bold">🔥 Product List</h1>
    <div className="bg-orange-700 px-4 py-2 rounded-lg shadow-md">
      🛒 Cart: <span className="font-bold">{cartCount}</span>
    </div>
  </header>
);

const FooterSection = () => (
  <footer className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-6 text-center mt-10 border-t border-orange-700 shadow-lg">
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
    <div className="min-h-screen flex flex-col bg-orange-100 text-gray-900">
      <HeaderSection cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      
      <main className="flex-grow p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <p className="text-orange-700">Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <CardProduct key={product.id} className="shadow-lg border border-orange-300 rounded-lg">
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
                  className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white font-semibold py-2 rounded-lg shadow-md"
                />
              </CardProduct>
            ))
          ) : (
            <p className="text-orange-700 text-center w-full">No products available.</p>
          )}
        </div>

        {/* Cart Section */}
        <div className="mt-10 p-5 bg-orange-200 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-orange-800">🛒 Shopping Cart</h2>
          {cart.length > 0 ? (
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between bg-orange-300 p-3 rounded-md">
                  <span className="text-orange-900 font-medium">
                    {item.nama_product} (x{item.quantity})
                  </span>
                  <span className="font-bold text-orange-700">
                    Rp {(item.harga * item.quantity).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-orange-700">Your cart is empty.</p>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default ProductsPage;
