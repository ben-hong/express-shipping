"use strict";

const { BadRequestError } = require("../expressError");
const express = require("express");
const jsonschema = require("jsonschema");
const shipitSchema = require("../schemas/shipitSchema.json");
const router = new express.Router();
const { shipProduct } = require("../shipItApi");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const result = jsonschema.validate(req.body, shipitSchema);
  if (!result.valid) {
    let errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }
  let shipId = await shipProduct(result.instance);
  return res.json({ shipped: shipId });
});


module.exports = router;