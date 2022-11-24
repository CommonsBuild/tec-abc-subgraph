import { BigInt, BigDecimal, Address, log } from "@graphprotocol/graph-ts";
import {
  AugmentedBondingCurve,
  MakeBuyOrder,
  MakeSellOrder,
} from "../generated/AugmentedBondingCurve/AugmentedBondingCurve";
import { BondedToken } from "../generated/BondedToken/BondedToken";
import { BondingCurveReserve } from "../generated/BondingCurveReserve/BondingCurveReserve";
import { BuyOrder, SellOrder } from "../generated/schema";
import { scaleDown } from "./utils/math";

const COLLATERAL_TOKEN = "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d";
const BONDED_CONTRACT = "0x5dF8339c5E282ee48c0c7cE8A7d01a73D38B3B27";
const BONDING_CURVE_RESERVE = "0x4a3C145c35Fa0daa58Cb5BD93CE905B086087246";
const BONDING_CURVE = "0x74ade20c12067e2f9457c037809a73f35694f99f";

export function handleMakeBuyOrder(event: MakeBuyOrder): void {
  let entity = BuyOrder.load(event.transaction.from.toHex());
  const bondingCurveContract = AugmentedBondingCurve.bind(
    Address.fromString(BONDING_CURVE)
  );
  const bondedContract = BondedToken.bind(Address.fromString(BONDED_CONTRACT));
  const bondingCurveReserveContract = BondingCurveReserve.bind(
    Address.fromString(BONDING_CURVE_RESERVE)
  );
  const supply = bondedContract.totalSupply();
  const reserve = bondingCurveReserveContract.balance(
    Address.fromString(COLLATERAL_TOKEN)
  );
  const reserveRatio = bondingCurveContract
    .try_getCollateralToken(Address.fromString(COLLATERAL_TOKEN))
    .value.getValue3();
  const feePct = scaleDown(bondingCurveContract.try_buyFeePct().value);

  const price = bondingCurveContract.try_getStaticPricePPM(
    supply,
    reserve,
    reserveRatio
  );

  const newPrice = bondingCurveContract.try_getStaticPricePPM(
    supply.plus(event.params.returnedAmount),
    reserve.plus(event.params.purchaseAmount),
    reserveRatio
  );

  if (!entity) {
    entity = new BuyOrder(event.transaction.from.toHex());
  }

  if (price.reverted) {
    log.info("getStaticPricePPM for price reverted", []);
  } else {
    entity.price = price.value;
    entity.mintPrice = price.value
      .toBigDecimal()
      .plus(price.value.toBigDecimal().times(feePct));
  }

  if (newPrice.reverted) {
    log.info("getStaticPricePPM for newPrice reverted", []);
  } else {
    entity.newPrice = newPrice.value
      .toBigDecimal()
      .plus(price.value.toBigDecimal().times(feePct));
  }

  entity.hash = event.transaction.hash;
  entity.reserveRatio = reserveRatio;
  entity.buyer = event.params.buyer;
  entity.fee = event.params.fee;
  entity.feePct = feePct;
  entity.onBehalfOf = event.params.onBehalfOf;
  entity.collateral = event.params.collateral;
  entity.purchaseAmount = event.params.purchaseAmount;
  entity.returnedAmount = event.params.returnedAmount;
  entity.timestamp = event.block.timestamp;

  entity.supplyBalance = supply;
  entity.reserveBalance = reserve;
  entity.save();
}

export function handleMakeSellOrder(event: MakeSellOrder): void {
  let entity = SellOrder.load(event.transaction.from.toHex());
  const bondingCurveContract = AugmentedBondingCurve.bind(
    Address.fromString(BONDING_CURVE)
  );
  const bondedContract = BondedToken.bind(Address.fromString(BONDED_CONTRACT));
  const bondingCurveReserveContract = BondingCurveReserve.bind(
    Address.fromString(BONDING_CURVE_RESERVE)
  );
  const supply = bondedContract.totalSupply();
  const reserve = bondingCurveReserveContract.balance(
    Address.fromString(COLLATERAL_TOKEN)
  );
  const reserveRatio = bondingCurveContract
    .try_getCollateralToken(Address.fromString(COLLATERAL_TOKEN))
    .value.getValue3();
  const feePct = scaleDown(bondingCurveContract.try_sellFeePct().value);

  const price = bondingCurveContract.try_getStaticPricePPM(
    supply,
    reserve,
    reserveRatio
  );

  const newPrice = bondingCurveContract.try_getStaticPricePPM(
    supply.minus(event.params.returnedAmount),
    reserve.minus(event.params.sellAmount),
    reserveRatio
  );

  if (!entity) {
    entity = new SellOrder(event.transaction.from.toHex());
  }

  if (price.reverted) {
    log.info("getStaticPricePPM reverted", []);
  } else {
    entity.price = price.value;
    entity.burnPrice = price.value
      .toBigDecimal()
      .minus(price.value.toBigDecimal().times(feePct));
  }

  if (newPrice.reverted) {
    log.info("getStaticPricePPM for newPrice reverted", []);
  } else {
    entity.newPrice = newPrice.value
      .toBigDecimal()
      .minus(price.value.toBigDecimal().times(feePct));
  }

  entity.hash = event.transaction.hash;
  entity.reserveRatio = reserveRatio;
  entity.seller = event.params.seller;
  entity.fee = event.params.fee;
  entity.feePct = feePct;
  entity.onBehalfOf = event.params.onBehalfOf;
  entity.collateral = event.params.collateral;
  entity.sellAmount = event.params.sellAmount;
  entity.returnedAmount = event.params.returnedAmount;
  entity.timestamp = event.block.timestamp;
  entity.supplyBalance = supply;
  entity.reserveBalance = reserve;

  entity.save();
}
