import { order , OrderStore } from "../models/order";
const store = new OrderStore();
describe('order model',()=>{
    // getAll tests
    it('index should be there',()=>{
        expect(store.index).toBeDefined;
    })
    it('index should return array of orders' , async()=>{
        const orders =await store.index();
        expect(orders).toBeInstanceOf(Array);
    })
    // show tests
    it('first order should be known',async()=>{
        const order =await store.show(1);
        expect(order).toBe(order);
    })
    // create tests
    it('post should be there',()=>{
        expect(store.create).toBeDefined;
    })
    it('post func should create an order and return it',async()=>{
        const order = await store.create({userId : 1 , status: "done" , products : []});
        expect(order).toBe(order)
    })
    // delete tests
    it('delete should be there',()=>{
        expect(store.delete).toBeDefined;
    })
    it('delete should delete my selected product',async()=>{
        const orders = await store.index();
        console.log(orders);
        const deletedOrder = await store.delete(1);
        expect(deletedOrder).toBe(deletedOrder);
    })
})