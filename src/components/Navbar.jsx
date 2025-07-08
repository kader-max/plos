import { Link, useResolvedPath } from "react-router-dom";
import { SearchIcon, ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useProductStore } from "../store/useProductStore";
import { useEffect, useState } from "react";

function Navbar() {
	const { pathname } = useResolvedPath();
	const isHomePage = pathname === "/";

	const { products, setSearchQuery, totalProducts, totalPrice, setSelectedCategory, selectedCategory } = useProductStore();

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const uniqueCategories = ["All", ...new Set(products.map((product) => product.category))];
		setCategories(uniqueCategories);
	}, [products]);

	return (
		<div className='bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto'>
				<div className='navbar px-4 min-h-[4rem] justify-between'>
					{/* LOGO */}
					<div className='flex-1 lg:flex-none'>
						<Link to={"/"} className='hover:opacity-80 transition-opacity'>
							<div className='flex items-center gap-2'>
								<ShoppingCartIcon className='size-9 text-primary' />
								<span
									className='font-semibold font-mono tracking-widest text-2xl 
                    bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'
								>
									POSGRESTORE
								</span>
							</div>
						</Link>
					</div>

					{isHomePage && (
						<div className='flex-1 justify-center hidden md:flex'>
							<label className='input input-bordered flex items-center gap-2 rounded-full w-full max-w-md'>
								<input
									type='text'
									className='grow'
									placeholder='Search for products...'
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<SearchIcon className='size-5 text-base-content/50' />
							</label>
						</div>
					)}

					{isHomePage && (
						<div className='form-control'>
							<select
								className='select select-bordered w-full max-w-xs'
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
							>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>
					)}

					{/* RIGHT SECTION */}
					<div className='flex items-center gap-4'>
						<ThemeSelector />

						{isHomePage && (
							<div className='indicator'>
								<div className='p-2 rounded-full hover:bg-base-200 transition-colors'>
									<ShoppingBagIcon className='size-5' />
									<span className='badge badge-sm badge-primary indicator-item'>{totalProducts}</span>
								</div>
								<div className='p-2 rounded-full hover:bg-base-200 transition-colors'>
									<span className='text-sm font-semibold'>${totalPrice.toFixed(2)}</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
export default Navbar;
