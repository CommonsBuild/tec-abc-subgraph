import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ExampleEntity } from "../generated/schema"
import { MakeBuyOrder } from "../generated/AugmentedBondingCurve/AugmentedBondingCurve"
import { handleMakeBuyOrder } from "../src/augmented-bonding-curve"
import { createMakeBuyOrderEvent } from "./augmented-bonding-curve-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let buyer = Address.fromString("0x0000000000000000000000000000000000000001")
    let onBehalfOf = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let collateral = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let fee = BigInt.fromI32(234)
    let purchaseAmount = BigInt.fromI32(234)
    let returnedAmount = BigInt.fromI32(234)
    let feePct = BigInt.fromI32(234)
    let newMakeBuyOrderEvent = createMakeBuyOrderEvent(
      buyer,
      onBehalfOf,
      collateral,
      fee,
      purchaseAmount,
      returnedAmount,
      feePct
    )
    handleMakeBuyOrder(newMakeBuyOrderEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExampleEntity created and stored", () => {
    assert.entityCount("ExampleEntity", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "buyer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "onBehalfOf",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "collateral",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "fee",
      "234"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "purchaseAmount",
      "234"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "returnedAmount",
      "234"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "feePct",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
