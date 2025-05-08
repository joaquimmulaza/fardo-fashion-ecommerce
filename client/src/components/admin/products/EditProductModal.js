import React, { Fragment, useContext, useState, useEffect } from "react";
import { ProductContext } from "./index";
import { editProduct, getAllProduct } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";
const apiURL = process.env.REACT_APP_API_URL;

const EditProductModal = (props) => {
  const { data, dispatch } = useContext(ProductContext);

  const [categories, setCategories] = useState([]);
  const [editformData, setEditformdata] = useState({
    pId: "",
    pName: "",
    pDescription: "",
    pImages: null,
    pEditImages: null,
    pStatus: "",
    pCategory: "",
    pQuantity: "",
    pPrice: "",
    pOffer: "",
    error: false,
    success: false,
  });

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      let responseData = await getAllCategory();
      if (responseData && responseData.Categories) {
        setCategories(responseData.Categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (data.editProductModal) {
      setEditformdata({
        pId: data.editProductModal.pId || "",
        pName: data.editProductModal.pName || "",
        pDescription: data.editProductModal.pDescription || "",
        pImages: data.editProductModal.pImages || null,
        pStatus: data.editProductModal.pStatus || "",
        pCategory: data.editProductModal.pCategory || "",
        pQuantity: data.editProductModal.pQuantity || "",
        pPrice: data.editProductModal.pPrice || "",
        pOffer: data.editProductModal.pOffer || "",
      });
    }
  }, [data.editProductModal]);

  const fetchData = async () => {
    try {
      let responseData = await getAllProduct();
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let responseData = await editProduct(editformData);
      if (responseData.success) {
        fetchData();
        setEditformdata({ ...editformData, success: responseData.success });
        setTimeout(() => {
          setEditformdata({
            ...editformData,
            success: false,
          });
        }, 2000);
      } else if (responseData.error) {
        setEditformdata({ ...editformData, error: responseData.error });
        setTimeout(() => {
          setEditformdata({
            ...editformData,
            error: false,
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setEditformdata({ ...editformData, error: "Error updating product" });
    }
  };

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  if (!data.editProductModal || !data.editProductModal.modal) {
    return null;
  }

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={() => dispatch({ type: "editProductModalClose", payload: false })}
        className="fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50"
      />

      {/* Modal Start */}
      <div className="fixed inset-0 flex items-center z-30 justify-center overflow-auto">
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Product
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={() => dispatch({ type: "editProductModalClose", payload: false })}
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {editformData.error ? alert(editformData.error, "red") : ""}
          {editformData.success ? alert(editformData.success, "green") : ""}
          <form className="w-full" onSubmit={submitForm}>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Nome do Produto *</label>
                <input
                  value={editformData.pName}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pName: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="price">Preço do Produto *</label>
                <input
                  value={editformData.pPrice}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pPrice: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="price"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="description">Descrição do produto *</label>
              <textarea
                value={editformData.pDescription}
                onChange={(e) =>
                  setEditformdata({
                    ...editformData,
                    error: false,
                    success: false,
                    pDescription: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                name="description"
                id="description"
                cols={5}
                rows={2}
              />
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="flex flex-col mt-4">
              <label htmlFor="image">Imagens do produto *</label>
              {editformData.pImages && editformData.pImages.length > 0 ? (
                <div className="flex space-x-1">
                  {editformData.pImages.map((image, index) => (
                    <img
                      key={index}
                      className="h-16 w-16 object-cover"
                      src={`${apiURL}/uploads/products/${image}`}
                      alt={`productImage-${index}`}
                    />
                  ))}
                </div>
              ) : null}
              <span className="text-gray-600 text-xs">Must need 2 images</span>
              <input
                onChange={(e) =>
                  setEditformdata({
                    ...editformData,
                    error: false,
                    success: false,
                    pEditImages: [...e.target.files],
                  })
                }
                type="file"
                accept=".jpg, .jpeg, .png"
                className="px-4 py-2 border focus:outline-none"
                id="image"
                multiple
              />
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Status do Produto *</label>
                <select
                  value={editformData.pStatus}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pStatus: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  id="status"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="category">Categoria *</label>
                <select
                  value={editformData.pCategory?._id || ""}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pCategory: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  id="category"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.cName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="quantity">Quantidade *</label>
                <input
                  value={editformData.pQuantity}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pQuantity: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="quantity"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="offer">Oferta (%)</label>
                <input
                  value={editformData.pOffer}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pOffer: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="offer"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6">
              <button
                type="submit"
                style={{ background: "#303031" }}
                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
              >
                Atualizar Produto
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProductModal;
