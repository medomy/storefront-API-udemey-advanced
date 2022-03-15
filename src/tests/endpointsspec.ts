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
})