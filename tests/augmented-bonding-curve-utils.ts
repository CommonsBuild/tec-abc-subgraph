import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  MakeBuyOrder,
  MakeSellOrder
} from "../generated/AugmentedBondingCurve/AugmentedBondingCurve"

export function createMakeBuyOrderEvent(
  buyer: Address,
  onBehalfOf: Address,
  collateral: Address,
  fee: BigInt,
  purchaseAmount: BigInt,
  returnedAmount: BigInt,
  feePct: BigInt
): MakeBuyOrder {
  let makeBuyOrderEvent = changetype<MakeBuyOrder>(newMockEvent())

  makeBuyOrderEvent.parameters = new Array()

  makeBuyOrderEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  makeBuyOrderEvent.parameters.push(
    new ethereum.EventParam(
      "onBehalfOf",
      ethereum.Value.fromAddress(onBehalfOf)
    )
  )
  makeBuyOrderEvent.parameters.push(
    new ethereum.EventParam(
      "collateral",
      ethereum.Value.fromAddress(collateral)
    )
  )
  makeBuyOrderEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )
  makeBuyOrderEvent.parameters.push(
    new ethereum.EventParam(
      "purchaseAmount",
      ethereum.Value.fromUnsignedBigInt(purchaseAmount)
    )
  )
  makeBuyOrderEvent.parameters.push(
    new ethereum.EventParam(
      "returnedAmount",
      ethereum.Value.fromUnsignedBigInt(returnedAmount)
    )
  )
  makeBuyOrderEvent.parameters.push(
    new ethereum.EventParam("feePct", ethereum.Value.fromUnsignedBigInt(feePct))
  )

  return makeBuyOrderEvent
}

export function createMakeSellOrderEvent(
  seller: Address,
  onBehalfOf: Address,
  collateral: Address,
  fee: BigInt,
  sellAmount: BigInt,
  returnedAmount: BigInt,
  feePct: BigInt
): MakeSellOrder {
  let makeSellOrderEvent = changetype<MakeSellOrder>(newMockEvent())

  makeSellOrderEvent.parameters = new Array()

  makeSellOrderEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  makeSellOrderEvent.parameters.push(
    new ethereum.EventParam(
      "onBehalfOf",
      ethereum.Value.fromAddress(onBehalfOf)
    )
  )
  makeSellOrderEvent.parameters.push(
    new ethereum.EventParam(
      "collateral",
      ethereum.Value.fromAddress(collateral)
    )
  )
  makeSellOrderEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )
  makeSellOrderEvent.parameters.push(
    new ethereum.EventParam(
      "sellAmount",
      ethereum.Value.fromUnsignedBigInt(sellAmount)
    )
  )
  makeSellOrderEvent.parameters.push(
    new ethereum.EventParam(
      "returnedAmount",
      ethereum.Value.fromUnsignedBigInt(returnedAmount)
    )
  )
  makeSellOrderEvent.parameters.push(
    new ethereum.EventParam("feePct", ethereum.Value.fromUnsignedBigInt(feePct))
  )

  return makeSellOrderEvent
}
