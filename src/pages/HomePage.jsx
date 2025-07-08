import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";

function HomePage() {
	const { products, loading, error, fetchProducts, searchQuery, selectedCategory, clearAllProducts } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const filteredProducts = products.filter((product) => {
		const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
		const productCategoryLowerTrimmed = product.category ? product.category.toLowerCase().trim() : '';
		const selectedCategoryLowerTrimmed = selectedCategory.toLowerCase().trim();
		const matchesCategory = selectedCategoryLowerTrimmed === "all" || productCategoryLowerTrimmed === selectedCategoryLowerTrimmed;

		console.log(`Filtering: Product: ${product.name}, Product Category: '${product.category}', Selected Category: '${selectedCategory}', Matches Category: ${matchesCategory}`);

		return matchesSearchQuery && matchesCategory;
	});

	return (
		<main className='max-w-6xl mx-auto px-4 py-8 '>
			<div className='flex justify-between items-center mb-8'>
				<button
					className='btn btn-primary hover:scale-105 transition-transform duration-200'
					onClick={() => document.getElementById("add_product_modal").showModal()}
				>
					<PlusCircleIcon className='size-5 mr-2' />
					Add Product
				</button>
				<button className='btn btn-error hover:scale-105 transition-transform duration-200' onClick={clearAllProducts}>
					Delete All Products
				</button>
				<button className='btn btn-ghost btn-circle hover:scale-110 transition-transform duration-200' onClick={fetchProducts}>
					<RefreshCwIcon className='size-5' />
				</button>
			</div>

			<AddProductModal />

			{error && <div className='alert alert-error mb-8'>{error}</div>}

			{filteredProducts.length === 0 && !loading && (
				<div className='flex flex-col justify-center items-center h-96 space-y-4'>
					<div className='bg-base-100 rounded-full p-6'>
						<PackageIcon className='size-12' />
					</div>
					<div className='text-center space-y-2'>
						<h3 className='text-2xl font-semibold '>No products found</h3>
						<p className='text-gray-500 max-w-sm'>
							Get started by adding your first product to the inventory
						</p>
					</div>
				</div>
			)}

			{loading ? (
				<div className='flex justify-center items-center h-64'>
					<div className='loading loading-spinner loading-lg' />
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</main>
	);
}
export default HomePage;
