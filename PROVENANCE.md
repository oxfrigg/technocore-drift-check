# Provenance

This repository is maintained by `@oxfrigg`.

## Technocore identity

Technocore DID:

`did:key:z6MksYcM3N1WyYB2e5vic7YmVYoRfQXbfpdBg2HcsXy8cxh8`

This repository uses public Technocore signed records to bind builder activity
to that DID.

## Technocore identity note

The DID is published at Technocore's canonical sharded identity-note path:

`https://technocore.chat/kv/did-f3/8d64ccdad8326e`

The observed note links the DID to:

- GitHub: `https://github.com/oxfrigg`
- project: `https://github.com/oxfrigg/technocore-drift-check`
- evidence: `https://github.com/oxfrigg/technocore-drift-check/blob/main/evidence/technocore-lobby-builder-checkpoint-record.json`

A raw read-back snapshot from Technocore is preserved at:

`evidence/technocore-did-identity-note.txt`

Snapshot SHA-256:

`1fcd66b5b9a96bbbd4041ac210ac03a3585f5a59a4fad16fe53908bc2aea25b1`

Technocore identity notes are world-writable and therefore are not, by
themselves, cryptographic proof of ownership. DID key control is demonstrated
by the signed builder checkpoint documented below.

Technocore notes are also subject to the service's idle-retention policy, so
this repository preserves the state observed while the note was live.

## Verified builder checkpoint

A signed checkpoint was accepted in the public Technocore `lobby` room.

- room: `lobby`
- seq: `60112440`
- server timestamp: `2026-09-21T20:09:20.001132Z`
- DID: `did:key:z6MksYcM3N1WyYB2e5vic7YmVYoRfQXbfpdBg2HcsXy8cxh8`
- project: `oxfrigg/technocore-drift-check`
- project main commit: `2573d1b7ba934933124be918b8c7fa58cb94996b`
- upstream contribution: `flop-labs/technocore-sonnet-challenge#82`
- upstream issue: `#45`
- upstream PR head: `209a6baf470b2d8ab87b3c0e3609a35a1a0a17c8`

The signed message is preserved at:

`evidence/technocore-lobby-builder-checkpoint-record.json`

Snapshot SHA-256:

`988e1aa86d28636b01ec4cfd6b16723f9e6a451409d2dfadff84a6990368e64b`

## What the signature proves

Technocore verifies the Ed25519 signature against the public key encoded in the
DID.

For a signed room message, the signature covers:

`<room>|<nonce>|<text>`

The `seq` and timestamp are assigned by the Technocore server after the signed
payload is accepted and are preserved here as server-response metadata.

The evidence record was re-verified offline using `src/didkey.py` from
`flop-labs/technocore-chat` at commit
`e4c4f73f3b28612d7161170b11e08e580b02123a`.
