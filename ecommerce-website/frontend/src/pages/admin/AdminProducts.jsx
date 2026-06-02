import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../api/adminApi";

const CATEGORIES = [
  "New Iphones",
  "Used Iphones",
  "New Android Phones",
  "Laptops",
  "Mobile Accessories",
  "Gaming Accessories",
  "Computer Accessories",
  "Perfumes",
  "Headset and Earpiece",
  "Wifi and Routers",
  "Other Electronics"
];

const AdminProducts = () => {
  const { token } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  /* CREATE */
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [variants, setVariants] = useState([]);
  const [variantLabel, setVariantLabel] = useState("");
  const [variantPrice, setVariantPrice] = useState("");

  /* EDIT */
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  /* LOAD */
  useEffect(() => {
    if (!token) return;

    fetchProducts(token)
      .then(setProducts)
      .catch(() => showMessage("Failed to load products", "error"))
      .finally(() => setLoading(false));
  }, [token]);

  /* VARIANTS CREATE */
  const addVariant = () => {
    if (!variantLabel || !variantPrice) return;

    setVariants([
      ...variants,
      { label: variantLabel, price: Number(variantPrice) },
    ]);

    setVariantLabel("");
    setVariantPrice("");
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  /* CREATE PRODUCT */
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name,
        price: Number(price),
        category,
        image,
        description,
        variants,
      };

      const newProduct = await createProduct(payload, token);

      setProducts([newProduct, ...products]);

      setName("");
      setPrice("");
      setCategory(CATEGORIES[0]);
      setImage("");
      setDescription("");
      setVariants([]);

      showMessage("Product created");
    } catch (err) {
      showMessage(err.message || "Creation failed", "error");
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;

    try {
      await deleteProduct(id, token);
      setProducts(products.filter((p) => p._id !== id));
      showMessage("Product deleted");
    } catch (err) {
      showMessage(err.message || "Delete failed", "error");
    }
  };

  /* EDIT */
  const startEdit = (product) => {
    setEditingId(product._id);
    setEditData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image || "",
      description: product.description || "",
      variants: product.variants || [],
    });
  };

  const addEditVariant = () => {
    if (!variantLabel || !variantPrice) return;

    setEditData({
      ...editData,
      variants: [
        ...(editData.variants || []),
        { label: variantLabel, price: Number(variantPrice) },
      ],
    });

    setVariantLabel("");
    setVariantPrice("");
  };

  const removeEditVariant = (index) => {
    setEditData({
      ...editData,
      variants: editData.variants.filter((_, i) => i !== index),
    });
  };

  const saveEdit = async (id) => {
    try {
      const updated = await updateProduct(id, editData, token);

      setProducts(products.map((p) => (p._id === id ? updated : p)));

      setEditingId(null);
      showMessage("Product updated");
    } catch (err) {
      showMessage(err.message || "Update failed", "error");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">Products</h1>
        <p className="text-gray-500 text-sm">{products.length} products</p>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className={`p-3 rounded-lg text-sm ${message.type === "error"
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700"
          }`}>
          {message.text}
        </div>
      )}

      {/* CREATE */}
      <form onSubmit={handleCreate} className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">Add Product</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="number" className="input" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        <input className="input" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />

        <textarea className="input min-h-[100px]" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        {/* VARIANTS */}
        <div className="border rounded-xl p-4 space-y-3">
          <h3 className="font-medium">Variants</h3>

          <div className="flex flex-col sm:flex-row gap-2">
            <input className="input flex-1" placeholder="Label" value={variantLabel} onChange={(e) => setVariantLabel(e.target.value)} />
            <input type="number" className="input w-32" placeholder="Price" value={variantPrice} onChange={(e) => setVariantPrice(e.target.value)} />
            <button type="button" onClick={addVariant} className="bg-black text-white px-4 rounded-lg">Add</button>
          </div>

          {variants.map((v, i) => (
            <div key={i} className="flex justify-between bg-gray-100 p-2 rounded">
              <span>{v.label} - GHS {v.price}</span>
              <button onClick={() => removeVariant(i)} className="text-red-500 text-sm">Remove</button>
            </div>
          ))}
        </div>

        <button className="bg-black text-white px-6 py-3 rounded-xl">
          Add Product
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white border rounded-2xl overflow-x-auto">

        <table className="min-w-[700px] w-full text-sm">

          <thead className="bg-gray-50">

            <tr>
              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4">
                Category
              </th>

              <th className="p-4">
                Price
              </th>

              <th className="p-4">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {products.map((p) => (

              <tr
                key={p._id}
                className="border-t"
              >

                {/* PRODUCT */}

                <td className="p-4">

                  <div className="flex gap-3 min-w-[250px]">

                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-14 rounded object-cover shrink-0"
                      />
                    )}

                    <div className="min-w-0">

                      <p className="font-medium break-words">
                        {p.name}
                      </p>

                      <p className="text-xs text-gray-500 break-words">
                        {p.description}
                      </p>

                    </div>
                  </div>
                </td>

                {/* CATEGORY */}

                <td className="p-4 whitespace-nowrap">
                  {p.category}
                </td>

                {/* PRICE */}

                <td className="p-4 whitespace-nowrap">
                  GHS {p.price}
                </td>

                {/* ACTIONS */}

                <td className="p-4">

                  <div className="flex flex-col gap-2 min-w-[120px]">

                    <button
                      onClick={() =>
                        startEdit(p)
                      }
                      className="px-3 py-2 bg-gray-100 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          p._id
                        )
                      }
                      className="px-3 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto">

            <h2 className="text-xl font-semibold">Edit Product</h2>

            <input className="input" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
            <input type="number" className="input" value={editData.price} onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })} />

            <select className="input" value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>

            <input className="input" value={editData.image} onChange={(e) => setEditData({ ...editData, image: e.target.value })} />

            <textarea className="input" value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />

            {/* EDIT VARIANTS */}
            <div className="space-y-2">
              <h3 className="font-medium">Variants</h3>

              <div className="flex gap-2">
                <input className="input flex-1" placeholder="Label" value={variantLabel} onChange={(e) => setVariantLabel(e.target.value)} />
                <input type="number" className="input w-32" placeholder="Price" value={variantPrice} onChange={(e) => setVariantPrice(e.target.value)} />
                <button onClick={addEditVariant} className="bg-black text-white px-3 rounded">Add</button>
              </div>

              {editData.variants?.map((v, i) => (
                <div key={i} className="flex justify-between bg-gray-100 p-2 rounded">
                  <span>{v.label} - GHS {v.price}</span>
                  <button onClick={() => removeEditVariant(i)} className="text-red-500 text-sm">Remove</button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => saveEdit(editingId)} className="bg-black text-white px-5 py-2 rounded-lg">Save</button>
              <button onClick={() => setEditingId(null)} className="bg-gray-200 px-5 py-2 rounded-lg">Cancel</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;