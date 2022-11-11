import { BigInt } from "@graphprotocol/graph-ts";
import {
  AugmentedBondingCurve,
  MakeBuyOrder,
  MakeSellOrder,
} from "../generated/AugmentedBondingCurve/AugmentedBondingCurve";
import { BuyOrder, SellOrder } from "../generated/schema";

export function handleMakeBuyOrder(event: MakeBuyOrder): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = BuyOrder.load(event.transaction.from.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new BuyOrder(event.transaction.from.toHex());

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.buyer = event.params.buyer;
  entity.fee = event.params.fee;
  entity.onBehalfOf = event.params.onBehalfOf;
  entity.collateral = event.params.collateral;
  entity.purchaseAmount = event.params.purchaseAmount;
  entity.returnedAmount = event.params.returnedAmount;
  entity.timestamp = event.block.timestamp;

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.getCollateralToken(...)
  // - contract.sellFeePct(...)
  // - contract.buyFeePct(...)
  // - contract.PCT_BASE(...)
  // - contract.formula(...)
  // - contract.token(...)
  // - contract.reserve(...)
  // - contract.tokenManager(...)
  // - contract.getStaticPricePPM(...)
}

export function handleMakeSellOrder(event: MakeSellOrder): void {
  let entity = SellOrder.load(event.transaction.from.toHex());

  if (!entity) {
    entity = new SellOrder(event.transaction.from.toHex());
    entity.count = BigInt.fromI32(0);
  }
  entity.buyer = event.params.seller;
  entity.fee = event.params.fee;
  entity.onBehalfOf = event.params.onBehalfOf;
  entity.collateral = event.params.collateral;
  entity.sellAmount = event.params.sellAmount;
  entity.returnedAmount = event.params.returnedAmount;
  entity.timestamp = event.block.timestamp;

  entity.save();
}
