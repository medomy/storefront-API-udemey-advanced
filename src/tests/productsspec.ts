import { product,ProductStore } from "../models/product";

const store = new ProductStore();

describe('product model',()=>{
    // getAll tests
    it('getAll should be there',()=>{
        expect(store.getAllProduct).toBeDefined;
    })
    it('getAll should return array of products' , async()=>{
        const products =await store.getAllProduct();
        expect(products).toBeInstanceOf(Array);
    })
    // show tests
    it('first product should be known',async()=>{
        const product =await store.getOneProduct(1);
        expect(product).toEqual({id:1 , title: 'toshiba' , price: 58 , descripe:'momo' , company : "el araby"});
    })
    // create tests
    it('post should be there',()=>{
        expect(store.createProdct).toBeDefined;
    })
    it('post func should create a product and return it',async()=>{
        const product = await store.createProdct({title : "ay" , price : 55 , descripe : 'wala' , company : "yalla"});
        expect(product).toBe(product)
    })
    // delete tests
    it('delete should be there',()=>{
        expect(store.deleteProduct).toBeDefined;
    })
    it('delete should delete my selected product',async()=>{
        const products = await store.getAllProduct();
        console.log(products);
        const deletedProduct = await store.deleteProduct(6);
        expect(deletedProduct).toBe(deletedProduct);
    })
})