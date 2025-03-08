import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";
import { cartListProduct } from "../partials/FetchApi";
// Remover importações relacionadas ao Braintree
// import { getBrainTreeToken, getPaymentProcess } from "./FetchApi";
// import { fetchData, fetchbrainTree, pay } from "./Action";
// import DropIn from "braintree-web-drop-in-react";

const apiURL = process.env.REACT_APP_API_URL;

const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const CheckoutComponent = (props) => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
    success: false,
    // Remover clientToken e instance
    // clientToken: null,
    // instance: {},
  });

  useEffect(() => {
    fetchData(cartListProduct, dispatch);
    // Remover chamada ao fetchbrainTree
    // fetchbrainTree(getBrainTreeToken, setState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Remover DropIn e referências ao Braintree no JSX
  return (
    <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
      <div className="text-2xl mx-2">Pedido</div>
      <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
        <div className="md:w-1/2">
          <CheckoutProducts products={data.cartProduct} />
        </div>
        <div className="w-full order-first md:order-last md:w-1/2">
          <Fragment>
            <div onBlur={(e) => setState({ ...state, error: false })} className="p-4 md:p-8">
              {state.error ? (
                <div className="bg-red-200 py-2 px-4 rounded">
                  {state.error}
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col py-2">
                <label htmlFor="address" className="pb-2">
                  Endereço de entrega
                </label>
                <input
                  value={state.address}
                  onChange={(e) =>
                    setState({
                      ...state,
                      address: e.target.value,
                      error: false,
                    })
                  }
                  type="text"
                  id="address"
                  className="border px-4 py-2"
                  placeholder="Endereço..."
                />
              </div>
              <div className="flex flex-col py-2 mb-2">
                <label htmlFor="phone" className="pb-2">
                  Telefone
                </label>
                <input
                  value={state.phone}
                  onChange={(e) =>
                    setState({
                      ...state,
                      phone: e.target.value,
                      error: false,
                    })
                  }
                  type="number"
                  id="phone"
                  className="border px-4 py-2"
                  placeholder="+244"
                />
              </div>
              {/* Remover DropIn */}
              <div
                onClick={(e) =>
                  // Remover chamada ao pay
                  // pay(
                  //   data,
                  //   dispatch,
                  //   state,
                  //   setState,
                  //   getPaymentProcess,
                  //   totalCost,
                  //   history
                  // )
                  console.log("Pagamento processado")
                }
                className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer"
                style={{ background: "#303031" }}
              >
                Pagar agora
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </section>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-1">
        {products !== null && products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
              >
                <div className="md:flex md:items-center md:space-x-4">
                  <img
                    onClick={(e) => history.push(`/products/${product._id}`)}
                    className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
                    src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                    alt="wishListproduct"
                  />
                  <div className="text-lg md:ml-6 truncate">
                    {product.pName}
                  </div>
                  <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                    Preço : {product.pPrice}Kz{" "}
                  </div>
                  <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                    Quantidade : {quantity(product._id)}
                  </div>
                  <div className="font-semibold text-gray-600 text-sm">
                    Subtotal : {subTotal(product._id, product.pPrice)}Kz
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>Nenhum produto encontrado para finalização da compra</div>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;
