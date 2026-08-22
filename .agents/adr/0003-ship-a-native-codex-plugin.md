# Ship the promoted skills as a native Codex plugin

Codex now accepts multiple paths in a plugin manifest's `skills` field. The
constraint recorded in [ADR 0002](./0002-ship-as-a-claude-code-plugin.md) no
longer applies.

## Decision

Ship `.codex-plugin/plugin.json` from this fork as `ksa-mat-skills`. It lists
every skill in `skills/engineering/` and `skills/productivity/` explicitly, so
draft, miscellaneous, and deprecated skills are not installed.

Preserve upstream skills and attribution. KSA MAT may add its own promoted or
in-progress skills in this fork and owns the Codex packaging and marketplace
entry; Matt Pocock remains credited as the original author under the existing
MIT license.

The repo-local marketplace at `.agents/plugins/marketplace.json` supports local
testing and Git-backed team installation.
