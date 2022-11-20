import { BigInt, Address, log } from "@graphprotocol/graph-ts";
import {
  AugmentedBondingCurve,
  MakeBuyOrder,
  MakeSellOrder,
} from "../generated/AugmentedBondingCurve/AugmentedBondingCurve";
import { BondedToken } from "../generated/BondedToken/BondedToken";
import { BondingCurveReserve } from "../generated/BondingCurveReserve/BondingCurveReserve";
import { BuyOrder, SellOrder } from "../generated/schema";

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

  const mintPrice = bondingCurveContract.try_getStaticPricePPM(
    supply,
    reserve,
    reserveRatio
  );

  if (!entity) {
    entity = new BuyOrder(event.transaction.from.toHex());
    entity.count = BigInt.fromI32(0);
  }

  if (mintPrice.reverted) {
    log.info("getStaticPricePPM reverted", []);
  } else {
    entity.mintPrice = mintPrice.value;
  }

  entity.hash = event.transaction.hash;
  entity.reserveRatio = reserveRatio;
  entity.buyer = event.params.buyer;
  entity.fee = event.params.fee;
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

  const burnPrice = bondingCurveContract.try_getStaticPricePPM(
    supply,
    reserve,
    reserveRatio
  );
  if (!entity) {
    entity = new SellOrder(event.transaction.from.toHex());
    entity.count = BigInt.fromI32(0);
  }

  if (burnPrice.reverted) {
    log.info("getStaticPricePPM reverted", []);
  } else {
    entity.burnPrice = burnPrice.value;
  }

  entity.hash = event.transaction.hash;
  entity.reserveRatio = reserveRatio;
  entity.buyer = event.params.seller;
  entity.fee = event.params.fee;
  entity.onBehalfOf = event.params.onBehalfOf;
  entity.collateral = event.params.collateral;
  entity.sellAmount = event.params.sellAmount;
  entity.returnedAmount = event.params.returnedAmount;
  entity.timestamp = event.block.timestamp;
  entity.supplyBalance = supply;
  entity.reserveBalance = reserve;

  entity.save();
}
