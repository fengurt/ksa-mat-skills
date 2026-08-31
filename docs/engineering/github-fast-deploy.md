## What it does

GitHub Fast Deploy chooses the fastest safe path between GitHub Actions and a repository's existing local or provider-CLI deployment command.

It pins one commit and permits at most one attempt per route. Actions and local deployment never mutate production concurrently.

## When to reach for it

Type `/github-fast-deploy`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it automatically when a deployment task fits.

Reach for it when Actions quota, queue delay, checkout stalls, or release speed may justify an existing local fallback. To reduce waste in workflow definitions rather than execute a release, use `ksamint-githubaction-skill`.

## Prerequisites

The repository must already define its deployment, smoke check, rollback, and any local or provider-CLI fallback. Production credentials, target access, and an exclusive deployment lock must already exist. The skill does not create a second deployment implementation or widen access.

## Pinned release

Every decision stays attached to the remote default branch's exact 40-character SHA. A target or SHA change requires a fresh decision and authorization.

| State | Route |
| --- | --- |
| Actions is eligible and progressing | Continue the single Actions run |
| Actions stalls before production mutation | Confirm full cancellation, then use the local fallback |
| Any production mutation has started | Stay on Actions and repair or roll back that release |
| Neither route can prove safety | Block the deployment |

## Common questions

**Will Actions and the local fallback ever run together?**

No. Local starts only after every Actions job and child workflow is confirmed terminal and no production-mutating step began.

**Does deploy authorization also authorize fallback?**

Yes, only for the same repository, environment, and pinned SHA. Changing any target requires new authorization.

## It's working if

- The selected route names one exact SHA and environment.
- No second deployment starts while another route may still mutate production.
- The release metadata and production smoke checks confirm the pinned SHA.
- The result records the route, timing, verification, and any rollback.

## Where it fits

This is a reach-for-it-anytime standalone for executing an authorized deployment. Use [wizard](https://aihero.dev/skills-wizard) when a human must configure credentials or a provider dashboard, and [ask-matt](https://aihero.dev/skills-ask-matt) maps the rest of the skill set.
