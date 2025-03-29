import Button from "../Elements/Button";

const CardProduct = ({ children }) => {
  return (
    <div className="w-full max-w-sm bg-gray-800 border border-gray-700 rounded-xl shadow-lg flex flex-col h-full overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
      {children}
    </div>
  );
};

const Header = ({ src }) => {
  return (
    <div className="overflow-hidden">
      <img
        className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
        src={src}
        alt="Product Image"
      />
    </div>
  );
};

const Body = ({ nama_product, deskripsi, stok }) => {
  return (
    <div className="px-6 py-5 flex-grow">
      <h5 className="text-xl font-semibold text-white mb-2">{nama_product}</h5>
      <p className="text-sm text-gray-400">{deskripsi}</p>
      <p className="text-sm text-green-400 font-medium mt-2">Stok: {stok}</p>
    </div>
  );
};

const Footer = ({ harga, handleAddToCart }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-t border-gray-700">
      <span className="text-lg font-bold text-white">{harga}</span>
      <Button
        className="px-4 py-2 bg-blue-600 rounded-lg font-semibold text-white hover:bg-blue-700 transition duration-300"
        onClick={handleAddToCart}
      >
        Add To Cart
      </Button>
    </div>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;