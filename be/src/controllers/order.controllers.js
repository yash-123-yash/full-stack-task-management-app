import { Menu } from "../models/menu.models.js";
import { Order } from "../models/order.models.js";
import { orderSchema } from "../utils/schema.js";

export async function handleCreateOrder(req, res){
    
    try {
        const user = req.user;
    
        if(!user){
            return res.status(401).josn({
                message: "Unauthorrize"
            })
        }
        const inputData = orderSchema.safeParse(req.body);
            
            if(!inputData.success){
                const errormMessage = inputData.error.errors.map((err) => {
                    return {
                        message: err.message
                    }
                });
                return res.status(409).json({
                    message: errormMessage[0].message
                })
            }
        
        const { items } = inputData.data;
        
        const menuIds = [...new Set(items.map(item => item.menuId))];
    
        const qauntityMap = {};
    
        items.forEach(item => {
            qauntityMap[item.menuId] = (qauntityMap[item.menuId] || 0) + item.quantity
        })
    
        const menu = await Menu.find({
            _id: { $in: menuIds }
        });
    
        if(!menu){
            return res.status(500).json({
                message: "Problem in making order"
            })
        }
    
        const finalItems = menu.map((it) => ({
            _id: it._id,
            totalAmt: it.price * qauntityMap[it._id]
        }))
    
        let totalAmount = 0;
        for(let i = 0; i < finalItems.length; i++){
            totalAmount = totalAmount + finalItems[i].totalAmt;
        }
    
        const order = await Order.create({
            userId: user._id,
            items: items,
            totalAmount: totalAmount,
            status: "pending"
        });
    
        if(!order){
            return res.status(500).json({
                message: "Unable to procees your order right now. Please try again."
            })
        }
    
        return res.status(200).json({
            message: "Your order is completed"
        })
    } catch (e) {
        console.log(e)
    }
}

export async function handleAllGetOrder(req, res){

    const user = req.user;
    
    if(!user){
        return res.status(401).josn({
            message: "Unauthorrize"
        })
    }

    const orders = await Order.find()

    if(!orders){
        return res.status(500).json({
            message: "unable to show order."
        })
    }

    return res.status(200).josn({
        data: orders
    })

}

export async function handleGetOrderById(req, res){

    try {
        const user = req.user;
        
        if(!user){
            return res.status(401).josn({
                message: "Unauthorrize"
            })
        }
    
        const orderId = req.params;
    
        if(!orderId){
            return res.status(409).json({
                message: "OrderId is required"
            })
        }
    
        const order = await Order.findOne({
            _id: orderId,
            userId: user.id
        })
    
        if(!order){
            return res.status(500).json({
                message: "Unable to find order"
            })
        }
    
        return res.status(200).json({
            data: order
        })
    } catch (e) {
        console.log(e)
    }
}