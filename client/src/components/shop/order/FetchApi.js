import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const createOrder = async (orderData) => {
  try {
    let res = await axios.post(`${apiURL}/api/order/create-order`, orderData);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error: "Erro ao criar o pedido" };
  }
};
