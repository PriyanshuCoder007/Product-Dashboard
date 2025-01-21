import React, { useState } from "react";
import { addProduct } from "../utility/api";

const AddProduct = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.description) {
      setError("Please fill out all required fields.");
      return;
    }
    try {
      const newProduct = await addProduct({
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category || "general",
        image: formData.image || "https://via.placeholder.com/150",
      });

      onAdd(newProduct);
      // Reset form data
      setFormData({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
      setError("");
    } catch (error) {
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Product Name *"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price *"
          value={formData.price}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description *"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category (optional)"
          value={formData.category}
          onChange={handleChange}
        />
        <input
          type="url"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
