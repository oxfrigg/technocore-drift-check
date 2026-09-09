# Technocore Drift Check

A small deterministic checker for Technocore claims that may have gone stale.

Instead of relying on AI-generated judgments, the tool compares known claims against current public sources and returns a simple verdict.

## Why

Fast-moving ecosystems change quickly.

Guides, repositories, and community resources can remain online after the information inside them becomes outdated.

Technocore Drift Check looks for that gap.

## Current Check

The first check tracks this claim:

```text
"no MCP server"
```

A community resource still contains that statement, while the current official Technocore repository documents an MCP server.

Result:

```text
Claim:   "no MCP server"
Verdict: STALE
```

## Verdicts

- `STALE` — an older claim conflicts with current official information
- `UNSUPPORTED` — the claim exists, but the expected official evidence is not present
- `INCONCLUSIVE` — there is not enough information to classify the claim

## Usage

```bash
python3 src/drift_check.py
```

## Tests

```bash
python3 -m unittest discover -s tests -v
```

## Design

The checker is intentionally simple:

```text
public source
     +
official source
     ↓
deterministic rule
     ↓
verdict
```

No language model is required.

## Security

The tool is read-only.

It does not:

- connect to a wallet
- request private keys or seed phrases
- sign messages or transactions
- interact with Technocore accounts
- execute downloaded code
- install third-party dependencies

Only public text sources are fetched over HTTPS.

See `SECURITY.md` for more details.

## Requirements

- Python 3
- Internet connection for live checks

No third-party Python packages are required.

## Status

Early version focused on real Technocore documentation drift.

More checks can be added as the ecosystem evolves.