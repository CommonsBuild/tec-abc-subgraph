import {
  SafeExecute as SafeExecuteEvent,
  Execute as ExecuteEvent,
  AddProtectedToken as AddProtectedTokenEvent,
  RemoveProtectedToken as RemoveProtectedTokenEvent,
  PresignHash as PresignHashEvent,
  SetDesignatedSigner as SetDesignatedSignerEvent,
  ReceiveERC721 as ReceiveERC721Event,
  VaultTransfer as VaultTransferEvent,
  VaultDeposit as VaultDepositEvent,
  ScriptResult as ScriptResultEvent,
  RecoverToVault as RecoverToVaultEvent
} from "../generated/BondingCurveReserve/BondingCurveReserve"
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
} from "../generated/schema"

export function handleSafeExecute(event: SafeExecuteEvent): void {
  let entity = new SafeExecute(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.sender = event.params.sender
  entity.target = event.params.target
  entity.data = event.params.data
  entity.save()
}

export function handleExecute(event: ExecuteEvent): void {
  let entity = new Execute(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.sender = event.params.sender
  entity.target = event.params.target
  entity.ethValue = event.params.ethValue
  entity.data = event.params.data
  entity.save()
}

export function handleAddProtectedToken(event: AddProtectedTokenEvent): void {
  let entity = new AddProtectedToken(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.token = event.params.token
  entity.save()
}

export function handleRemoveProtectedToken(
  event: RemoveProtectedTokenEvent
): void {
  let entity = new RemoveProtectedToken(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.token = event.params.token
  entity.save()
}

export function handlePresignHash(event: PresignHashEvent): void {
  let entity = new PresignHash(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.sender = event.params.sender
  entity.hash = event.params.hash
  entity.save()
}

export function handleSetDesignatedSigner(
  event: SetDesignatedSignerEvent
): void {
  let entity = new SetDesignatedSigner(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.sender = event.params.sender
  entity.oldSigner = event.params.oldSigner
  entity.newSigner = event.params.newSigner
  entity.save()
}

export function handleReceiveERC721(event: ReceiveERC721Event): void {
  let entity = new ReceiveERC721(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.token = event.params.token
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.tokenId = event.params.tokenId
  entity.data = event.params.data
  entity.save()
}

export function handleVaultTransfer(event: VaultTransferEvent): void {
  let entity = new VaultTransfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.token = event.params.token
  entity.to = event.params.to
  entity.amount = event.params.amount
  entity.save()
}

export function handleVaultDeposit(event: VaultDepositEvent): void {
  let entity = new VaultDeposit(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.token = event.params.token
  entity.sender = event.params.sender
  entity.amount = event.params.amount
  entity.save()
}

export function handleScriptResult(event: ScriptResultEvent): void {
  let entity = new ScriptResult(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.executor = event.params.executor
  entity.script = event.params.script
  entity.input = event.params.input
  entity.returnData = event.params.returnData
  entity.save()
}

export function handleRecoverToVault(event: RecoverToVaultEvent): void {
  let entity = new RecoverToVault(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.vault = event.params.vault
  entity.token = event.params.token
  entity.amount = event.params.amount
  entity.save()
}
