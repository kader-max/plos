import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

export const useProductStore = create((set, get) => ({
	// products state
	products: [],
	loading: false,
	error: null,
	currentProduct: null,
	  searchQuery: "",
  selectedCategory: "All",
  categories: [], // New state for unique categories

  setSelectedCategory: (category) => set({ selectedCategory: category }),
	totalProducts: 0,
	totalPrice: 0,

	setSearchQuery: (query) => set({ searchQuery: query }),

	// form state
	formData: {
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  },

	setFormData: (formData) => set({ formData }),
	resetForm: () => set({ formData: { name: "", price: "", image: "", description: "", category: "" } }),

	addProduct: (e) => {
		e.preventDefault();
		set({ loading: true });

		try {
			const { formData, products } = get();
			const newProduct = { ...formData, id: Date.now() };
			const updatedProducts = [newProduct, ...products];

			localStorage.setItem("products", JSON.stringify(updatedProducts));
			set({ products: updatedProducts });
			get().calculateTotals();

			get().resetForm();
			toast.success("Product added successfully");
			document.getElementById("add_product_modal").close();
		} catch (error) {
			console.log("Error in addProduct function", error);
			toast.error("Something went wrong");
		} finally {
			set({ loading: false });
		}
	},

	fetchProducts: () => {
		set({ loading: true });
		try {
			const products = JSON.parse(localStorage.getItem("products")) || [];
			set({ products, error: null });
			get().calculateTotals();
			get().updateCategories(products);
		} catch (err) {
			set({ error: "Something went wrong", products: [] });
		} finally {
			set({ loading: false });
		}
	},

	deleteProduct: (id) => {
		set({ loading: true });
		try {
			const { products } = get();
			const updatedProducts = products.filter((product) => product.id !== id);
			localStorage.setItem("products", JSON.stringify(updatedProducts));
			set({ products: updatedProducts });
			get().calculateTotals();
			get().updateCategories(updatedProducts);
			toast.success("Product deleted successfully");
		} catch (error) {
			console.log("Error in deleteProduct function", error);
			toast.error("Something went wrong");
		} finally {
			set({ loading: false });
		}
	},

	fetchProduct: (id) => {
		set({ loading: true });
		try {
			const { products } = get();
			const product = products.find((p) => p.id === id);
			set({
				currentProduct: product,
				        formData: {
          ...product,
          description: product.description || "",
          category: product.category || "",
        }, // pre-fill form with current product data
				error: null,
			});
		} catch (error) {
			console.log("Error in fetchProduct function", error);
			set({ error: "Something went wrong", currentProduct: null });
		} finally {
			set({ loading: false });
		}
	},
	updateProduct: (id) => {
		set({ loading: true });
		try {
			const { formData, products } = get();
			const updatedProducts = products.map((p) => (p.id === id ? { ...p, ...formData } : p));
			localStorage.setItem("products", JSON.stringify(updatedProducts));
			set({ products: updatedProducts, currentProduct: null });
			get().calculateTotals();
			get().updateCategories(updatedProducts);
			toast.success("Product updated successfully");
		} catch (error) {
			toast.error("Something went wrong");
			console.log("Error in updateProduct function", error);
		} finally {
			set({ loading: false });
		}
	},

	calculateTotals: () => {
		const { products } = get();
		const totalProducts = products.length;
		const totalPrice = products.reduce((acc, product) => acc + Number(product.price), 0);
		set({ totalProducts, totalPrice });
	},

  clearAllProducts: () => {
    localStorage.removeItem("products");
    set({ products: [], totalProducts: 0, totalPrice: 0 });
    toast.success("All products deleted successfully!");
  },

  updateCategories: (products) => {
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    set({ categories: uniqueCategories });
  },
}));
