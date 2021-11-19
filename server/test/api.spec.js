const request = require('supertest');
const server = require('../app');


describe("Test to see the functionality of the api",()=>{
    let api;
    let testPost = {
        id:49,
        title:"Hello World",
        message:"I'm not afraid of the dark",
        dislikes: 2,
        likes:5,
        loves:9,
        comments:[
            "Dan - Great Post",
            "Mia - So weird to think about"
        ]
    }

    beforeAll(() => {
        api = server.listen(5001, ()=>{
            console.log('Test server running on port 5001');
        });

    });

    afterAll((done) => {
        console.log('Test server stopped');
        api.close(done); 
    });

    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    })
})