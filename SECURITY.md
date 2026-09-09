# Security Notes

## Scope

Technocore Drift Check is a read-only documentation and claim checking utility.

## Data Access

The tool only fetches public text sources over HTTPS.

It does not require:

- wallet access
- private keys
- seed phrases
- DID secrets
- API secrets
- transaction signing

## Execution Safety

Remote content is treated only as text data.

The tool does not execute code, shell commands, scripts, or instructions obtained from remote sources.

## Dependencies

The current version uses only Python standard-library modules.

No third-party packages are required.

## Development Approach

The project follows a defensive approach:

public data → deterministic checks → local tests → documented evidence