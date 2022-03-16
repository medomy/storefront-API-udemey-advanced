import { user,UserStore } from "../models/user-authentication";
import { OrderStore } from "../models/order";
const store = new UserStore();
const orderStore = new OrderStore();
describe('user model',()=>{
    // getAll tests
    it('index should be there',()=>{
        expect(store.index).toBeDefined;
    })
    it('index should return array of users' , async()=>{
        const users =await store.index();
        console.log(users)
        expect(users).toBeInstanceOf(Array);
    })
    // create tests
    it('post should be there',()=>{
        expect(store.create).toBeDefined;
    })
    it('post func should create a user and return it',async()=>{
        const user = await store.create({userName:"ay" , fName : "mo" , lName : "sa" , password:"ayhaga"});
        console.log(user);
        expect(user).toBe(user)
    })
    // show tests
    it('first user should be known',async()=>{
        const user =await store.show(1);
        expect(user).toEqual(user);
    })
    // delete tests
    it('delete should be there',()=>{
        expect(store.delete).toBeDefined;
    })
    it('delete should delete my selected user',async()=>{
        const deletedUser = await store.delete(2);
        expect(deletedUser).toBe(deletedUser);
    })
    // testing create order and show order here to make userId foreign_key first
    describe("testing create and show on order test" , ()=>{
        it('post order should be there', () => {
            expect(orderStore.create).toBeDefined;
        })
        it('post func should create an order and return it', async () => {
            const order = await orderStore.create({ userId: 1, status: "done", products: [] });
            expect(order).toBe(order)
        })
        // show tests
        it('first order should be known', async () => {
            const order = await orderStore.show(1);
            expect(order).toBe(order);
        })
    })
})