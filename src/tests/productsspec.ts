import { product,ProductStore } from "../models/product";

const store = new ProductStore();

describe('product model',()=>{
    it('should have a getAll method',()=>{
        expect(store.getAllProduct).toBeDefined();
    })
})