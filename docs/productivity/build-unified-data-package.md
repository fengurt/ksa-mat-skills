## What it does

Build Unified Data Package converts raw tabular, document, media, graph, vector, geospatial, or mixed data into a reproducible handoff. The result contains typed Parquet tables, CSV views, a schema, a manifest, row lineage, hashes, rebuild code, and validation evidence.

Parquet is truth. CSV is only a human view, source inputs stay read-only, and missing semantics are disclosed instead of invented.

## When to reach for it

Type `/build-unified-data-package`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it automatically when a task fits.

Reach for it when the output must be a reusable, auditable data deliverable. For a one-off question, chart, or analysis that does not need a packaged handoff, use the normal analysis workflow instead.

## Prerequisites

The builder needs Python 3.10 or newer and the dependencies listed in its `scripts/requirements.txt`. Run it in an isolated environment with access only to the authorized source files. Every build writes a new package directory and refuses to overwrite an existing release.

## Parquet is truth

Each package keeps machine truth and human convenience separate:

- `data/*.parquet` preserves types, exact values, and nulls.
- `data/*.csv` provides a readable full or deterministic preview view.
- `schema.yml` declares grains, keys, units, null meaning, sensitivity, and derivations.
- `manifest.json` records sources, hashes, row counts, artifacts, build inputs, and validation status.
- `src/` carries enough configuration and code to rebuild the package.

## Release gate

The skill blocks release when structure, checksums, keys, types, or Parquet round trips fail. Automated validation is followed by a semantic review of grain, definitions, joins, formulas, privacy, and license because syntactic checks cannot prove business meaning.

## Common questions

**Can it package PDFs, images, audio, or proprietary formats?**

Yes. It preserves the original as a content-addressed asset and links verified extraction results as separate derived tables. It does not claim semantic conversion when no authorized, testable extractor exists.

**Can I rebuild into the existing package directory?**

No. A changed source or contract produces a new package version so released truth is not silently replaced.

**Must every large table have a complete CSV copy?**

No. Parquet remains complete truth. The CSV may be a deterministic preview when a full mirror is impractical, with the selection rule recorded in the package.

## It's working if

- Every table states one grain and has a validated primary key.
- Every row traces back to a source locator and source hash.
- Identifiers retain leading zeros, exact measures retain precision, and units are explicit.
- The validator reports `pass`, zero errors, and zero round-trip difference cells.
- Another person can rebuild and audit the package without asking what the producer meant.

## Where it fits

This is a reach-for-it-anytime standalone for durable data handoffs. Use [ask-matt](https://aihero.dev/skills-ask-matt) to place it among the rest of the workflow skills.
