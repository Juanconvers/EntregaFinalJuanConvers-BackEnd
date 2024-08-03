import mongoose from "mongoose";
import productModel from "../src/models/products.js";
import chai from 'chai'
const expect = chai.expect

await mongoose.connect(`mongodb+srv://juanconverslegal:Malkut27.7@cluster0.j6k2srb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

describe('Test CRUD de productos en la ruta /api/users', function () {

    before(() => {
        console.log("Empezando el test")
    })

    beforeEach(() => {
        console.log("Ya comienza el test")
    })

    it('Obtener todos los usuarios mediante el metodo GET', async () => {
        const products = await productModel.find()

        //expect(products).equal([])
        //expect(Array.isArray(products)).to.be.ok 
        //expect(products).not.to.be.deep.equal([]) 
        expect(products).to.have.lengthOf(0)
    })

   
})