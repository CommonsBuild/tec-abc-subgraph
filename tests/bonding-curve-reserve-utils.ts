import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  SafeExecute,
  Execute,
  AddProtectedToken,
  RemoveProtectedToken,
  PresignHash,
  SetDesignatedSigner,
  ReceiveERC721,
  VaultTransfer,
  VaultDeposit,
  ScriptResult,
  RecoverToVault
} from "../generated/BondingCurveReserve/BondingCurveReserve"

export function createSafeExecuteEvent(
  sender: Address,
  target: Address,
  data: Bytes
): SafeExecute {
  let safeExecuteEvent = changetype<SafeExecute>(newMockEvent())

  safeExecuteEvent.parameters = new Array()

  safeExecuteEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  safeExecuteEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  safeExecuteEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return safeExecuteEvent
}

export function createExecuteEvent(
  sender: Address,
  target: Address,
  ethValue: BigInt,
  data: Bytes
): Execute {
  let executeEvent = changetype<Execute>(newMockEvent())

  executeEvent.parameters = new Array()

  executeEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  executeEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  executeEvent.parameters.push(
    new ethereum.EventParam(
      "ethValue",
      ethereum.Value.fromUnsignedBigInt(ethValue)
    )
  )
  executeEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return executeEvent
}

export function createAddProtectedTokenEvent(
  token: Address
): AddProtectedToken {
  let addProtectedTokenEvent = changetype<AddProtectedToken>(newMockEvent())

  addProtectedTokenEvent.parameters = new Array()

  addProtectedTokenEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return addProtectedTokenEvent
}

export function createRemoveProtectedTokenEvent(
  token: Address
): RemoveProtectedToken {
  let removeProtectedTokenEvent = changetype<RemoveProtectedToken>(
    newMockEvent()
  )

  removeProtectedTokenEvent.parameters = new Array()

  removeProtectedTokenEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return removeProtectedTokenEvent
}

export function createPresignHashEvent(
  sender: Address,
  hash: Bytes
): PresignHash {
  let presignHashEvent = changetype<PresignHash>(newMockEvent())

  presignHashEvent.parameters = new Array()

  presignHashEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  presignHashEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromFixedBytes(hash))
  )

  return presignHashEvent
}

export function createSetDesignatedSignerEvent(
  sender: Address,
  oldSigner: Address,
  newSigner: Address
): SetDesignatedSigner {
  let setDesignatedSignerEvent = changetype<SetDesignatedSigner>(newMockEvent())

  setDesignatedSignerEvent.parameters = new Array()

  setDesignatedSignerEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  setDesignatedSignerEvent.parameters.push(
    new ethereum.EventParam("oldSigner", ethereum.Value.fromAddress(oldSigner))
  )
  setDesignatedSignerEvent.parameters.push(
    new ethereum.EventParam("newSigner", ethereum.Value.fromAddress(newSigner))
  )

  return setDesignatedSignerEvent
}

export function createReceiveERC721Event(
  token: Address,
  operator: Address,
  from: Address,
  tokenId: BigInt,
  data: Bytes
): ReceiveERC721 {
  let receiveErc721Event = changetype<ReceiveERC721>(newMockEvent())

  receiveErc721Event.parameters = new Array()

  receiveErc721Event.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  receiveErc721Event.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  receiveErc721Event.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  receiveErc721Event.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  receiveErc721Event.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return receiveErc721Event
}

export function createVaultTransferEvent(
  token: Address,
  to: Address,
  amount: BigInt
): VaultTransfer {
  let vaultTransferEvent = changetype<VaultTransfer>(newMockEvent())

  vaultTransferEvent.parameters = new Array()

  vaultTransferEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  vaultTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  vaultTransferEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return vaultTransferEvent
}

export function createVaultDepositEvent(
  token: Address,
  sender: Address,
  amount: BigInt
): VaultDeposit {
  let vaultDepositEvent = changetype<VaultDeposit>(newMockEvent())

  vaultDepositEvent.parameters = new Array()

  vaultDepositEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  vaultDepositEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  vaultDepositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return vaultDepositEvent
}

export function createScriptResultEvent(
  executor: Address,
  script: Bytes,
  input: Bytes,
  returnData: Bytes
): ScriptResult {
  let scriptResultEvent = changetype<ScriptResult>(newMockEvent())

  scriptResultEvent.parameters = new Array()

  scriptResultEvent.parameters.push(
    new ethereum.EventParam("executor", ethereum.Value.fromAddress(executor))
  )
  scriptResultEvent.parameters.push(
    new ethereum.EventParam("script", ethereum.Value.fromBytes(script))
  )
  scriptResultEvent.parameters.push(
    new ethereum.EventParam("input", ethereum.Value.fromBytes(input))
  )
  scriptResultEvent.parameters.push(
    new ethereum.EventParam("returnData", ethereum.Value.fromBytes(returnData))
  )

  return scriptResultEvent
}

export function createRecoverToVaultEvent(
  vault: Address,
  token: Address,
  amount: BigInt
): RecoverToVault {
  let recoverToVaultEvent = changetype<RecoverToVault>(newMockEvent())

  recoverToVaultEvent.parameters = new Array()

  recoverToVaultEvent.parameters.push(
    new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault))
  )
  recoverToVaultEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  recoverToVaultEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return recoverToVaultEvent
}
