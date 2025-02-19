import Button from "../Elements/Button";

const CardProduct = ({ children }) => {
  return (
    <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-xl shadow-lg flex flex-col h-full overflow-hidden transition-transform transform hover:-translate-y-2">
      {children}
    </div>
  );
};

const Header = ({ src }) => {
  return (
    <a href="#">
      <img
        className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105 p-10"
        src={src || "https://media.istockphoto.com/id/2120395013/photo/laptop-image.webp?a=1&b=1&s=612x612&w=0&k=20&c=C_uJL46B6QFusEybJpLMIjVznx90QX1i-NAHxaiFyvg="}
        alt="product"
      />
    </a>
  );
};

const Body = ({ nama_product, deskripsi }) => {
  return (
    <div className="px-6 py-5 flex-grow">
      <a href="#">
        <h5 className="text-xl font-semibold text-white">{nama_product || "No Title"}</h5>
        <p className="text-sm text-gray-400 mt-2">{deskripsi || "No Description"}</p>
      </a>
    </div>
  );
};

const Footer = ({ harga, handleAddToCart }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-800">
      <span className="text-lg font-bold text-white">{harga || "Rp 0"}</span>
      <Button 
        classname="px-4 py-2 bg-blue-600 rounded-lg font-semibold text-white hover:bg-blue-700 transition-colors"
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
