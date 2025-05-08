const orderModel = require("../models/orders");

class Order {
  async getAllOrders(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      if (Orders) {
        return res.json({ Orders });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getOrderByUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let Order = await orderModel
          .find({ user: uId })
          .populate("allProduct.id", "pName pImages pPrice")
          .populate("user", "name email")
          .sort({ _id: -1 });
        if (Order) {
          return res.json({ Order });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postCreateOrder(req, res) {
    let { allProduct, user, amount, paymentMethod, address, phone } = req.body;
    if (!allProduct || !user || !amount || !paymentMethod || !address || !phone) {
      return res.json({ message: "Todos os campos são obrigatórios" });
    }

    // Generate a unique order ID
    const orderId = "ORD" + Date.now();

    try {
      let newOrder = new orderModel({
        allProduct,
        user,
        amount,
        paymentMethod,
        address,
        phone,
        orderId,
        status: paymentMethod === "bank_transfer" ? "Aguardando pagamento" : "Processando",
      });
      
      let save = await newOrder.save();
      if (save) {
        return res.json({ success: "Pedido criado com sucesso" });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Erro ao criar o pedido" });
    }
  }

  async postUpdateOrder(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "Todos os campos são obrigatórios" });
    }
    
    try {
      let currentOrder = await orderModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      
      if (currentOrder) {
        return res.json({ success: "Pedido atualizado com sucesso" });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "Erro ao atualizar o pedido" });
    }
  }

  async postDeleteOrder(req, res) {
    let { oId } = req.body;
    if (!oId) {
      return res.json({ error: "Todos os campos são obrigatórios" });
    }
    
    try {
      let deleteOrder = await orderModel.findByIdAndDelete(oId);
      if (deleteOrder) {
        return res.json({ success: "Pedido apagado com sucesso" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ error: "Erro ao apagar o pedido" });
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;
