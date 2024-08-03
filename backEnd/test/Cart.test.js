import mongoose from "mongoose";
import Assert from 'assert'
import cartModel from "../src/models/cart.js";

const assert = Assert.strict

await mongoose.connect(`mongodb+srv://juanconverslegal:Malkut27.7@cluster0.j6k2srb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

describe('Test CRUD de productos en la ruta /api/products', function () {

    before(() => {
        console.log("Iniciando el test")
    })

    beforeEach(() => {
        console.log("Ya comienza el test")
    })

    it('Obtener todos los productos con el metodo GET', async () => {
        const users = await cartModel.find()

        assert.strictEqual(Array.isArray(users), true)
    })

    it('Obtener un producto con metodo GET usando su id (parametro)', async () => {
        const user = await cartModel.findById('65fb7dbb4c863f6027e6da4b')
        //assert.strictEqual(typeof user, 'object')
        assert.ok(user._id)
    })

    it('Crear un producto con el metodo POST', async () => {
        const newUser = {
            first_name: "Gerson",
            last_name: "Gonzales",
            email: "Gergon@gmail.com",
            password: "2345",
            age: 34
        }

        const userCreated = await cartModel.create(newUser)

        assert.ok(userCreated._id)
    })

    it('Actualizar un producto con el metodo PUT usando su id (parametro)', async () => {
        const updateUser = {
            first_name: "Gerson",
            last_name: "Gonzales",
            email: "Gergon@gmail.com",
            password: "2345",
            age: 34
        }

        const userUpdated = await cartModel.findByIdAndUpdate('66679049e977df92c7c6de85', updateUser)
        assert.ok(userUpdated._id)
    })

    it('Eliminar un producto con el metodo DELETE usando su id (parametro)', async () => {

        const rta = await cartModel.findByIdAndDelete('66679049e977df92c7c6de85')
        assert.strictEqual(typeof rta, 'object')
    })


})