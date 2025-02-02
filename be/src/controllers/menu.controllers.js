import { Menu } from "../models/menu.models.js"
import { menuSchema, updateMenuSchema } from "../utils/schema.js"

export const handleGetAllMenu=async (req,res)=>{

    try {
        const allMenu = await Menu.find({
            availability: true
        })

        if(!allMenu){
            return res.status(500).json({
                message: "Menu fetching failed"
            })
        }

        return res.status(200).json({
            data: allMenu
        })

    } catch (error) {
        return res.status(500).json({
            message:`Server Error ${error}`
        })
    }
}

export const handleAddItemtoMenu=async(req,res)=>{

    const inputData = menuSchema.safeParse(req.body)

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

    const {name, image, category, price, availability }= inputData.data;
        
    try {

        const existinMenu = await Menu.findOne({name})

        if(existinMenu){
            return res.status(401).json({
                message:"Menu Already Exists"
            })
        }

        const menu = await Menu.create({name,image,category,price,availability})
        
        if(!menu){
            return res.status(500).json({
                message: "Error in Menu creation"
            })
        }

        return res.status(201).json({
            message:"item Added to Menu"
        })


    } catch (error) {
        return res.status(500).json({
            message:`Server Error ${error}`
        })
    }
}

export const handleUpdateItemOfMenu = async(req,res)=>{

    const { menuId } = req.params

    if(!menuId){
        return res.status(409).json({
            message: "provide menuId"
        })
    }

    const inputData = updateMenuSchema.safeParse(req.body)

    
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

    const { name, image, category, price, availability} = inputData.data
    
    try {
        const menuItem = await Menu.findOneAndUpdate({ _id: menuId },
            {
                name: name,
                image: image,
                price: price,
                availability: availability,
                category: category
            })

        if(!menuItem){
            return res.status(401).json({
                message:"No ITem Found in the Menu"
            })
        }

        return res.status(201).json({
            message:"ITem Updated Successfully "
        })
    } catch (error) {
     console.log(e)
    }
}

export const handleDeleteItemFromMenu = async(req,res) =>{
 
    try {
        const { menuId } = req.params
    
        if(!menuId){
            return res.status(409).json({
                message: "provide menuId"
            })
        }
    
        const menuExist = await Menu.findById({
            _id: menuId
        })
    
        if(!menuExist){
            return res.status(409).json({
                message: "Invalide item"
            })
        }
    
        const menuDelete = await Menu.deleteOne({
            _id: menuExist._id
        })
    
        if(!menuDelete){
            return res.status(500).json({
                message: "uable to delete item"
            })
        }
    
        return res.status(201).json({
            message: "item deleted succefully"
        })
    } catch (e) {
        console.log(e)
    }
}