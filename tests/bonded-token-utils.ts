import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ClaimedTokens,
  Transfer,
  NewCloneToken,
  Approval,
  AuthorizationUsed
} from "../generated/BondedToken/BondedToken"

export function createClaimedTokensEvent(
  _token: Address,
  _controller: Address,
  _amount: BigInt
): ClaimedTokens {
  let claimedTokensEvent = changetype<ClaimedTokens>(newMockEvent())

  claimedTokensEvent.parameters = new Array()

  claimedTokensEvent.parameters.push(
    new ethereum.EventParam("_token", ethereum.Value.fromAddress(_token))
  )
  claimedTokensEvent.parameters.push(
    new ethereum.EventParam(
      "_controller",
      ethereum.Value.fromAddress(_controller)
    )
  )
  claimedTokensEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return claimedTokensEvent
}

export function createTransferEvent(
  _from: Address,
  _to: Address,
  _amount: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return transferEvent
}

export function createNewCloneTokenEvent(
  _cloneToken: Address,
  _snapshotBlock: BigInt
): NewCloneToken {
  let newCloneTokenEvent = changetype<NewCloneToken>(newMockEvent())

  newCloneTokenEvent.parameters = new Array()

  newCloneTokenEvent.parameters.push(
    new ethereum.EventParam(
      "_cloneToken",
      ethereum.Value.fromAddress(_cloneToken)
    )
  )
  newCloneTokenEvent.parameters.push(
    new ethereum.EventParam(
      "_snapshotBlock",
      ethereum.Value.fromUnsignedBigInt(_snapshotBlock)
    )
  )

  return newCloneTokenEvent
}

export function createApprovalEvent(
  _owner: Address,
  _spender: Address,
  _amount: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("_spender", ethereum.Value.fromAddress(_spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return approvalEvent
}

export function createAuthorizationUsedEvent(
  authorizer: Address,
  nonce: Bytes
): AuthorizationUsed {
  let authorizationUsedEvent = changetype<AuthorizationUsed>(newMockEvent())

  authorizationUsedEvent.parameters = new Array()

  authorizationUsedEvent.parameters.push(
    new ethereum.EventParam(
      "authorizer",
      ethereum.Value.fromAddress(authorizer)
    )
  )
  authorizationUsedEvent.parameters.push(
    new ethereum.EventParam("nonce", ethereum.Value.fromFixedBytes(nonce))
  )

  return authorizationUsedEvent
}
