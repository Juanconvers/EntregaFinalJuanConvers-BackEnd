import cartModel from "../models/cart.js"
import productModel from "../models/products.js"
import ticketModel from "../models/ticket.js"

export const createCart = async (req, res) => {
    try {
        const mensaje = await cartModel.create({ products: [] })
        res.status(201).send(mensaje)
    } catch (e) {
        res.status(500).send(`Error interno del servidor al crear el carrito: ${error}`)
    }

}

export const getCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findOne({ _id: cartId })
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
}

export const createTicket = async (req, res) => {
    try {
        
        const cartId = req.params.cid
        const cart = await cartModel.findById(cartId)
        const prodSinStock = []
        if (cart) {
            cart.products.forEach(async (prod) => {
                let producto = await productModel.findById(prod.id_prod)
                if (productModel.stock < prod.quantity) {
                    prodSinStock.push(producto.id)
                }
            })
            if (prodSinStock.length = 0) {
                const totalPrice = cart.products.reduce((a, b) => (a.id_prod.price * a.quantity) + (b.id_prod.price * b.quantity), 0)
                
                if (req.user.role == 'Premium') {
                    totalPrice * 0.9
                }               
                
                const newTicket = await ticketModel.create({
                    code: crypto.randomUUID(),
                    purchaser: req.user.email,
                    amount: totalPrice,
                    products: cart.products
                })
                //Descontar stock de cada uno de los productos
                cart.products.forEach(async (prod) => {
                    await productModel.findByIdAndUpdate(prod.id_prod, {
                        stock: prod.quantity
                    })
                })

                //Vaciar carrito al comprar
                await cartModel.findByIdAndUpdate(cartId, {
                    products: []
                })

                //Vaciar carrito
                res.status(200).send(newTicket)
            } else {
                console.log(prodSinStock) //[id1, id2, id3]
                prodSinStock.forEach((prodId) => {
                    //[{id_prod, quantity, {}...]
                    cart.products = cart.products.filter(pro => pro.id_prod !== prodId)
                })
                await cartModel.findByIdAndUpdate(cartId, {
                    products: cart.products
                })
                res.status(400).send(`Productos sin stock: ${prodSinStock}`)
            }

        } else {
            res.status(404).send("Carrito no existe")
        }

    } catch (e) {
        res.status(500).send(`Error interno del servidor al crear ticket: ${e}`)
    }
}


export const insertProductCart = async (req, res) => {
    try {
        if (req.user.role == "Admin") {
            const cartId = req.params.cid
            const productId = req.params.pid
            const { quantity } = req.body
            const cart = await cartModel.findById(cartId)

            const indice = cart.products.findIndex(product => product.id_prod == productId)

            if (indice != -1) {
                //Consultar Stock para ver cantidades
                cart.products[indice].quantity += quantity //5 + 5 = 10, asigno 10 a quantity
            } else {
                cart.products.push({ id_prod: productId, quantity: quantity })
            }
            const mensaje = await cartModel.findByIdAndUpdate(cartId, cart)
            res.status(200).send(mensaje)
        } else {
            res.status(403).send("Usuario no autorizado")
        }

    } catch (error) {
        res.status(500).send(`Error interno del servidor al insertar el producto: ${error}`)
    }

}

export const deleteFromCart = async (req, res) => {
    try {
        const idProducto = req.params.pid
        const idCart = req.params.cid
        const cart = await cartModel.findById(idCart)
        const indice = cart.products.findIndex(product => product.id_prod == idProducto)
        if ( indice != -1) {
            cart.products.splice(indice, 1)
            const mensaje = await cartModel.findByIdAndUpdate(idCart, cart)
            res.status(200).send(mensaje)}
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar el producto: ${error}`)
    }
}