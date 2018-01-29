var expect  = require('chai').expect;
var request = require('request');


describe('Status and loading', () => {
  it('Main page loading', (done) =>{
    request('http://localhost:3000/', (error, response, body) =>{
      expect(response.statusCode).to.equal(200);
      done();
    })
  });

  it('Create Plant loading', (done) =>{
    request('http://localhost:3000/plants/createPlant', (error, response, body) =>{
      expect(response.statusCode).to.equal(200);
      done();
    })
  });
  it('Delete Plant loading', (done) =>{
    request('http://localhost:3000/plants/deletePlant/:plantid', (error, response, body) =>{
      expect(response.statusCode).to.equal(200);
      done();
    })
  });

  it('Edit Plant loading', (done) =>{
    request('http://localhost:3000/plants/editPlant/:plantid', (error, response, body) =>{
      expect(response.statusCode).to.equal(200);
      done();
    })
  });
});
