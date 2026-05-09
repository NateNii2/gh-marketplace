import ProductCard from "./ProductCard";

const mockProducts = [
  {
    _id: "1",
    name: "iPhone 14 Pro Max",
    price: 14500,
    category: "Phones",
    image: "https://images.unsplash.com/photo-1664478546384-30f1a71f3b27"
  },
  {
    _id: "2",
    name: "MacBook Pro M2",
    price: 23500,
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    _id: "3",
    name: "Sony WH-1000XM5",
    price: 5200,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb"
  },
  {
    _id: "4",
    name: "PlayStation 5 Controller",
    price: 1200,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1606813902914-9c5b1d38b6c6"
  }
];

export default function ProductGrid() {
  return (
    <section className="mt-20">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight">
          Featured Products
        </h2>
        <p className="text-black/50 text-sm mt-1">
          Curated premium items from trusted sellers
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
