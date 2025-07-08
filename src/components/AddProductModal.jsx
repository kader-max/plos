import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon, EditIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";

function AddProductModal() {
  const { addProduct, formData, setFormData, loading, currentProduct, updateProduct, resetForm, categories } = useProductStore();

  const isEditMode = Boolean(currentProduct);

  useEffect(() => {
    if (!isEditMode) {
      resetForm();
    }
  }, [isEditMode, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateProduct(currentProduct.id);
    } else {
      addProduct(e);
    }
    document.getElementById("add_product_modal").close();
  };

  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        {/* CLOSE BUTTON */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            document.getElementById("add_product_modal").close();
            resetForm();
          }}
        >
          X
        </button>

        {/* MODAL HEADER */}
        <h3 className="font-bold text-xl mb-8">{isEditMode ? "Edit Product" : "Add New Product"}</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            {/* PRODUCT NAME INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Product Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* PRODUCT PRICE INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Price</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <DollarSignIcon className="size-5" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            {/* PRODUCT IMAGE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Image URL</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <ImageIcon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>

            {/* PRODUCT DESCRIPTION INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 focus:textarea-primary transition-colors duration-200"
                placeholder="Enter product description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            {/* PRODUCT CATEGORY INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Category</span>
              </label>
              <input
                type="text"
                placeholder="Enter product category"
                className="input input-bordered w-full py-3 focus:input-primary transition-colors duration-200"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                list="category-suggestions"
              />
              <datalist id="category-suggestions">
                {categories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </div>
          </div>

          {/* MODAL ACTIONS */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                document.getElementById("add_product_modal").close();
                resetForm();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={!formData.name || !formData.price || !formData.image || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  {isEditMode ? (
                    <EditIcon className="size-5 mr-2" />
                  ) : (
                    <PlusCircleIcon className="size-5 mr-2" />
                  )}
                  {isEditMode ? "Update Product" : "Add Product"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* BACKDROP */}
      <form
        method="dialog"
        className="modal-backdrop"
        onSubmit={() => {
          resetForm();
        }}
      >
        <button>close</button>
      </form>
    </dialog>
  );
}
export default AddProductModal;
