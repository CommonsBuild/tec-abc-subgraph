import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { ClaimedTokens } from "../generated/schema"
import { ClaimedTokens as ClaimedTokensEvent } from "../generated/BondedToken/BondedToken"
import { handleClaimedTokens } from "../src/bonded-token"
import { createClaimedTokensEvent } from "./bonded-token-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _token = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _controller = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _amount = BigInt.fromI32(234)
    let newClaimedTokensEvent = createClaimedTokensEvent(
      _token,
      _controller,
      _amount
    )
    handleClaimedTokens(newClaimedTokensEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ClaimedTokens created and stored", () => {
    assert.entityCount("ClaimedTokens", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ClaimedTokens",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_token",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ClaimedTokens",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_controller",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ClaimedTokens",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
