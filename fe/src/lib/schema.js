import * as z from "zod"


export const userSchema = z.object({
    email: z.string().email(),
    name: z.string().min(4).max(100),
    password : z.string().min(6).max(20)
})


export const menuSchema = z.object({
    name: z.string(),
    image: z.string().url().optional(),
    category: z.string(),
    price: z.number(),
    availability: z.boolean()
})

export const updateMenuSchema = z.object({
    name: z.string().optional(),
    image: z.string().url().optional(),
    category: z.string().optional(),
    price: z.number().optional(),
    availability: z.boolean().optional()
})

export const orderSchema = z.object({
    items: z.array(
      z.object({
        menuId: z.string(),
        quantity: z.number(),
      })
    ),
  });