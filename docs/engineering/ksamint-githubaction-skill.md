## What it does

`ksamint-githubaction-skill` audits how GitHub Actions is triggered and where runner time is actually spent, then removes duplicate, stale, or impossible work without weakening release gates.

It optimizes **billable fan-out**, not just the short wall-clock duration shown on a workflow page. Every job can allocate its own runner, repeat setup, and be billed independently, so a fast-looking workflow can still be expensive.

## When to reach for it

Type `/ksamint-githubaction-skill`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it automatically when a task fits.

Reach for it when Actions minutes rise unexpectedly, one commit starts several similar workflows, scheduled jobs add little signal, deploy workflows fail repeatedly, or you need to choose between hosted Actions, a self-hosted runner, local deployment, and provider-native deployment.

## Prerequisites

Read-only auditing needs GitHub CLI access to the repositories and workflow history in scope. Applying changes needs repository write access. Billing totals, workflow disabling, secrets, runners, and branch protection may require separate account or organization authorization.

## Billable fan-out

The audit separates four things that GitHub's workflow list can blur together:

- visible workflow duration;
- total job execution time;
- estimated billable minutes under current GitHub rules; and
- runs that failed before any runner was allocated.

It also checks topology before recommending infrastructure. A GitHub-hosted runner is temporary build capacity, and blue and green containers can share one production server.

## Remove work before making it faster

The highest-value change is usually stopping work that cannot succeed. Broken automatic deploys become manual until their prerequisites exist. Duplicate event paths are collapsed, superseded verification is cancelled safely, and only then are jobs, matrices, caches, schedules, and runner placement optimized.

Required check names and release evidence remain stable. A cheaper workflow that bypasses the gate is not an optimization.

## Common questions

**Why does a two-minute workflow consume more than two minutes?**
The page shows elapsed workflow time, while several jobs may run on separate runners and repeat checkout, runtime setup, dependency installation, and cleanup. Billing rules can also round each job independently.

**Do blue and green deployments require two production servers?**
No. Blue and green commonly mean two temporary application instances on one server behind one traffic switch. The audit reads the deployment topology instead of inferring server count from container names.

**Must production deployment run through GitHub Actions?**
No. GitHub Actions is one executor. Local or provider-native deployment is valid when it preserves an immutable version, tests, secrets isolation, failure stops, health checks, rollback, and an audit record.

**Should a self-hosted runner run on the production server?**
Usually not. Pull-request code should not share a host with production credentials, networks, or the Docker socket. Use an isolated runner when measured hosted-runner cost or queue time justifies its maintenance.

## It's working if

- One commit starts only the workflows intended for its event and release boundary.
- Replaced commits stop consuming verification runners while production deploys remain interruption-safe.
- Repeated no-runner failures and impossible deploys no longer consume the workflow queue.
- Required checks keep their names and still pass before release.
- The report separates observed duration, estimated billing, and account-level blockers.

## Where it fits

`ksamint-githubaction-skill` is reach-for-it-anytime CI maintenance. Use [wizard](https://aihero.dev/skills-wizard) when the remaining blocker is a secret, billing setting, or provider dashboard step only a human can complete. Use [ask-matt](https://aihero.dev/skills-ask-matt) for the complete workflow map.
