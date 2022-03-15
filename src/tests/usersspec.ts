import { user,UserStore } from "../models/user-authentication";
const store = new UserStore();
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
    // show tests
    it('first user should be known',async()=>{
        const user =await store.show(1);
        expect(user).toEqual({id:1 , fName : "Mohammed" , lName : "Salah" , userName : "momo" , password : "$2b$10$hZRrNrP8zYMp7.hNim4snuA9nmNptsvFWAhIeYMgh.0/QfSoAJ4H."});
    })
    // create tests
    it('post should be there',()=>{
        expect(store.create).toBeDefined;
    })
    it('post func should create a user and return it',async()=>{
        const user = await store.create({userName:"ay" , fName : "mo" , lName : "sa" , password:"ayhaga"});
        expect(user).toBe(user)
    })
    // delete tests
    it('delete should be there',()=>{
        expect(store.delete).toBeDefined;
    })
    it('delete should delete my selected user',async()=>{
        const deletedUser = await store.delete(2);
        expect(deletedUser).toBe(deletedUser);
    })
})