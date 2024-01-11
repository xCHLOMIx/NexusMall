const User = require('../models/userModel')
const Order = require('../models/orderModel')
const Product = require('../models/productModel')

const adminpanel_get = async (req, res) => {
    const users = await User.find()
    const orders = await Order.find()
    const pendingOrders = []
    orders.forEach(order => {
        if (order.status == 'Pending...') {
            pendingOrders.push(order)
        }
    });
    const products = await Product.find()
    res.render('dashboard', { pendingOrders, users, products })
}
const users = async (req, res) => {
    const users = await User.find()
    res.render('users',{users})
}
const orders_get = async (req, res) => {

    try {
        const orders = await Order.find();
        const orders_users = await Promise.all(orders.map(async (order) => {
            if (order.userId) {
                const user = await User.findById(order.userId);
                return user ? user.username : "Unknown User";
            } else {
                return "Unknown User";
            }
        }));
        res.render('admin-orders', { orders, orders_users });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send("Internal Server Error");
    }
}
const delete_product = (req, res) => {
    const {id} = req.body
    Product.findByIdAndDelete(id)
        .then((result) => {
            res.status(201).json({result: true})
        })
        .catch((err) => {
            console.log(err);
        })
}
const orders_put = async (req, res) => {
    const { orderId, productName, userId, status, date } = req.body;
    var pname = productName
    const update = { orderId, productName, userId, status: 'confirmed', date };
    try {
        const productName = pname; // Replace with the actual product name
        const product = await Product.findOne({ productName });
    
        if (product) {
            const product_update = await Product.findOneAndUpdate(
                { _id: product._id },
                {
                    image: product.image,
                    productName: product.productName,
                    unitPrice: product.unitPrice,
                    productQuantity: product.productQuantity - 1,
                    productDescription: product.productDescription,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                    __v: product.__v
                },
                { new: true } // To return the updated document
            );
    
            console.log(product_update + 'HEYY');
        } else {
            console.log('Product not found.');
        }
    } catch (error) {
        console.error(error);
    }
    
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, update, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        console.log('Updated Order:', updatedOrder);
        res.status(201).json({ confirmed: true });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const products = async (req, res) => {
    const products = await Product.find()
    res.render('admin-products',{products})
}
const update_product = async (req,res)=>{
    console.log('hihi');
}
module.exports = {
    adminpanel_get,
    users,
    update_product,
    orders_get,
    products,
    orders_put,
    delete_product
}