import {
  ClaimedTokens as ClaimedTokensEvent,
  Transfer as TransferEvent,
  NewCloneToken as NewCloneTokenEvent,
  Approval as ApprovalEvent,
  AuthorizationUsed as AuthorizationUsedEvent
} from "../generated/BondedToken/BondedToken"
import {
  ClaimedTokens,
  Transfer,
  NewCloneToken,
  Approval,
  AuthorizationUsed
} from "../generated/schema"

export function handleClaimedTokens(event: ClaimedTokensEvent): void {
  let entity = new ClaimedTokens(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._token = event.params._token
  entity._controller = event.params._controller
  entity._amount = event.params._amount
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._from = event.params._from
  entity._to = event.params._to
  entity._amount = event.params._amount
  entity.save()
}

export function handleNewCloneToken(event: NewCloneTokenEvent): void {
  let entity = new NewCloneToken(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._cloneToken = event.params._cloneToken
  entity._snapshotBlock = event.params._snapshotBlock
  entity.save()
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._owner = event.params._owner
  entity._spender = event.params._spender
  entity._amount = event.params._amount
  entity.save()
}

export function handleAuthorizationUsed(event: AuthorizationUsedEvent): void {
  let entity = new AuthorizationUsed(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.authorizer = event.params.authorizer
  entity.nonce = event.params.nonce
  entity.save()
}
