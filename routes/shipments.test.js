"use strict";


const shipItApi = require("../shipItApi");
shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");

describe("POST /", function () {
  test("valid", async function () {
    let mockId = shipItApi.shipProduct.mockReturnValue(7104);

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });


    expect(resp.body).toEqual({ shipped: 7104 });
  });
});
