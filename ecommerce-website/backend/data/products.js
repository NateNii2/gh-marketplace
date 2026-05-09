const products = [
  /* ===================== PHONES ===================== */
  {
    name: "iPhone 13 Pro",
    brand: "Apple",
    category: "Phones",
    condition: "Used",
    price: 7800,
    countInStock: 4,
    description: "128GB, Sierra Blue, factory unlocked, very clean",
    images: [
      "https://images.apple.com/v/iphone-13-pro/a/images/overview/hero/hero_iphone_13pro__dhnsegysa42u_large.jpg"
    ]
  },
  {
    name: "iPhone 14 Pro",
    brand: "Apple",
    category: "Phones",
    condition: "Used",
    price: 9200,
    countInStock: 3,
    description: "256GB, Deep Purple, Face ID fully functional",
    images: [
      "https://images.apple.com/v/iphone-14-pro/a/images/overview/hero/hero_iphone_14pro__kzr001ge0262_large.jpg"
    ]
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    category: "Phones",
    condition: "Used",
    price: 8500,
    countInStock: 2,
    description: "256GB, Phantom Black, S-Pen included",
    images: [
      "https://images.samsung.com/is/image/samsung/p6pim/africa/2302/gallery/africa-galaxy-s23-ultra-s918-447045-sm-s918bzkqafa-535698136"
    ]
  },

  /* ===================== LAPTOPS ===================== */
  {
    name: "MacBook Pro M1 13-inch",
    brand: "Apple",
    category: "Laptops",
    condition: "Used",
    price: 12500,
    countInStock: 2,
    description: "8GB RAM, 256GB SSD, battery health excellent",
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-pro-13-m1-spacegray-select-202011"
    ]
  },
  {
    name: "HP EliteBook 840 G7",
    brand: "HP",
    category: "Laptops",
    condition: "Used",
    price: 5200,
    countInStock: 3,
    description: "Core i5, 16GB RAM, 512GB SSD, slim and fast",
    images: [
      "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06619187.png"
    ]
  },

  /* ===================== MOBILE ACCESSORIES ===================== */
  {
    name: "Apple AirPods Pro (2nd Gen)",
    brand: "Apple",
    category: "Mobile Accessories",
    condition: "New",
    price: 1800,
    countInStock: 10,
    description: "Active Noise Cancellation, USB-C charging case",
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2nd-gen"
    ]
  },
  {
    name: "20W USB-C Fast Charger",
    brand: "Anker",
    category: "Mobile Accessories",
    condition: "New",
    price: 180,
    countInStock: 20,
    description: "Fast charging for iPhone and Android devices",
    images: [
      "https://m.media-amazon.com/images/I/61YtR1F9YxL._AC_SL1500_.jpg"
    ]
  },

  /* ===================== GAMING ACCESSORIES ===================== */
  {
    name: "PlayStation 5 DualSense Controller",
    brand: "Sony",
    category: "Gaming Accessories",
    condition: "New",
    price: 950,
    countInStock: 6,
    description: "Haptic feedback, adaptive triggers",
    images: [
      "https://m.media-amazon.com/images/I/61QvXc+5GCL._AC_SL1500_.jpg"
    ]
  },

  /* ===================== COMPUTER ACCESSORIES ===================== */
  {
    name: "Logitech MX Master 3 Mouse",
    brand: "Logitech",
    category: "Computer Accessories",
    condition: "New",
    price: 750,
    countInStock: 8,
    description: "Ergonomic, multi-device Bluetooth mouse",
    images: [
      "https://resource.logitech.com/content/dam/logitech/en/products/mice/mx-master-3/gallery/mx-master-3-top-view.png"
    ]
  },

  /* ===================== PERFUMES ===================== */
  {
    name: "Dior Sauvage Eau de Parfum",
    brand: "Dior",
    category: "Perfumes",
    condition: "New",
    price: 1200,
    countInStock: 5,
    description: "Long-lasting masculine fragrance, 100ml",
    images: [
      "https://www.dior.com/couture/ecommerce/media/catalog/product/cache/1/cover_image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/Y/0/Y0996198_F099619009.jpg"
    ]
  }
];

module.exports = products;
