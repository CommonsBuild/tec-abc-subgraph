import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { SafeExecute } from "../generated/schema"
import { SafeExecute as SafeExecuteEvent } from "../generated/BondingCurveReserve/BondingCurveReserve"
import { handleSafeExecute } from "../src/bonding-curve-reserve"
import { createSafeExecuteEvent } from "./bonding-curve-reserve-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let target = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let data = Bytes.fromI32(1234567890)
    let newSafeExecuteEvent = createSafeExecuteEvent(sender, target, data)
    handleSafeExecute(newSafeExecuteEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SafeExecute created and stored", () => {
    assert.entityCount("SafeExecute", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SafeExecute",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SafeExecute",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "target",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SafeExecute",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "data",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
