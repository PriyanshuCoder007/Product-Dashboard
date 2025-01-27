import axios from "axios";

let localProducts = [];

const url = "https://fakestoreapi.com/products";

const apiClient = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async () => {
  try {
    const response = await apiClient.get("/");
    return [...response.data, ...localProducts];
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await apiClient.post("/", product);
    const newProduct = {
      ...response.data,
      id: Date.now(),
    };
    localProducts.push(newProduct);
    return newProduct;
  } catch (error) {
    console.error("Error adding product:", error.message);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await apiClient.put(`/${id}`, product);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(`Error updating product (ID: ${id}):`, error.message);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product (ID: ${id}):`, error.message);
    throw error;
  }
};
