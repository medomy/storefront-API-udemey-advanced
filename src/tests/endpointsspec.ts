import app from "../server";
import supertest from "supertest";

describe('endpoints test' , ()=>{
    // products endpoints
    it('GET /products is expected to be fine',()=>{
        supertest(app)
        .get("/products")
        .expect(200)
    })
    it('GET /products is expected to return json',()=>{
        supertest(app)
        .get("/products")
        .expect('Content-Type', /json/)
    })
    it('GET /products/1 should be ok',()=>{
        supertest(app)
        .get("/products/1")
        .expect(200)
    })
    it('POST /products should be ok' , ()=>{
        supertest(app)
        .post("/products")
        .send({title : "y" , price : 55 , company : "x" , describe : "z"})
        .expect(200)
    })
    it('PUT /products/1 should be ok',()=>{
        supertest(app)
        .put("/products/1")
        .expect(200)
    })
    it('DELETE /products/2 should be ok' , ()=>{
        supertest(app)
        .delete("/products/2")
        .expect(200)
    })

    //Users Endpoints
    it('GET /users is expected to be fine',()=>{
        supertest(app)
        .get("/users")
        .expect(200)
    })
    it('GET /users is expected to return json',()=>{
        supertest(app)
        .get("/users")
        .expect('Content-Type', /json/)
    })
    it('GET /users/1 is expected to be fine',()=>{
        supertest(app)
        .get("/users/1")
        .expect(200)
    })
    it('POST /users should be ok' , ()=>{
        supertest(app)
        .post("/users")
        .send({userName : "momo" ,fName : "m" , lName : "s" , password : "ayhaga" })
        .expect(200)
    })
    it('PUT /users/1 is expected to be fine',()=>{
        supertest(app)
        .put("/users/1")
        .expect(200)
    })
    it('DELETE /users/2 should be ok' , ()=>{
        supertest(app)
        .delete("/users/2")
        .expect(200)
    })
    //orders Endpoints
    it('GET /orders is expected to be fine',()=>{
        supertest(app)
        .get("/orders")
        .expect(200)
    })
    it('GET /orders is expected to return json',()=>{
        supertest(app)
        .get("/orders")
        .expect('Content-Type', /json/)
    })
    it('GET /orders/1 is expected to be fine',()=>{
        supertest(app)
        .get("/orders/1")
        .expect(200)
    })
    it('POST /orders should be ok' , ()=>{
        supertest(app)
        .post("/orders")
        .send({userId : 1 , products : [] , status : "done"})
        .expect(200)
    })
    it('DELETE /orders/1 should be ok' , ()=>{
        supertest(app)
        .delete("/orders/1")
        .expect(200)
    })



})