# Provenance

This repository is maintained by `@oxfrigg`.

## Technocore identity

Technocore DID:

`did:key:z6MksYcM3N1WyYB2e5vic7YmVYoRfQXbfpdBg2HcsXy8cxh8`

This file declares the repository's intended builder identity.

The repository-to-DID association is independently verifiable only when a
matching record is signed by this DID and published through Technocore.

## Verification

A signed Technocore provenance record will reference:

- this repository: `oxfrigg/technocore-drift-check`
- an exact Git commit SHA
- the DID above

The resulting Technocore room record can then be verified against the public
key encoded in the DID without relying on this repository's authorship claim
alone.
