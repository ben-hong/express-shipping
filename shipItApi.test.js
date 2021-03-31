"use strict";

const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

const {shipProduct} = require("./shipItApi");

test("shipProduct", async function () {

  axiosMock.onPost("http://localhost:3001/ship").reply(201, { receipt: {shipId: 7103 }});

  let shipId = await shipProduct({ productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789"})

  expect(shipId).toEqual(7103);
});

// const resp = await request(app).post("/shipments").send({
  // productId: 1000,
  // name: "Test Tester",
  // addr: "100 Test St",
  // zip: "12345-6789"
// })

// console.log(resp.body)

// expect(resp.body).toEqual({shipped: 7391})


//  shipItApi.shipProduct.mockReturnValue(7391);