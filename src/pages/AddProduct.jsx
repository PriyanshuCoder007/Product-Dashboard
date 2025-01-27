import React, { useState } from "react";
import { addProduct } from "../utility/api";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ onAdd }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
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
        image: formData.image || "https://via.placeholder.com/150",
      });

      if (onAdd) onAdd(newProduct);
      navigate("/dashboard", { state: { newProduct } });
    } catch (error) {
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="title">Product Name *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
