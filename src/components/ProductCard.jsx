import { EditIcon, Trash2Icon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";

function ProductCard({ product }) {
  const { deleteProduct, fetchProduct } = useProductStore();
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      {/* PRODUCT IMAGE */}
      <figure className="relative pt-[56.25%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* PRODUCT INFO */}
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-sm text-gray-700">{product.description}</p>
        <p className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>

        {/* CARD ACTIONS */}
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-sm btn-info btn-outline hover:scale-110 transition-transform duration-200"
            onClick={() => {
              fetchProduct(product.id);
              document.getElementById("add_product_modal").showModal();
            }}
          >
            <EditIcon className="size-4" />
          </button>

          <button
            className="btn btn-sm btn-error  btn-outline hover:scale-110 transition-transform duration-200"
            onClick={() => deleteProduct(product.id)}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
