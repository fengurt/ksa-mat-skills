## What it does

`tencent-sms` checks Tencent Cloud SMS readiness, diagnoses provider errors, connects an application to its approved sign and template, performs explicitly authorized test sends, and rotates a dedicated CAM key safely.

Credentials and identifiers remain **runtime-only**. They come from the project's secret manager for the duration of one command; they never enter the skill, repository, report, or conversation.

## When to reach for it

Type `/tencent-sms`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it automatically when a task fits.

Reach for it when:

- Tencent SMS is not configured;
- a sign or template is rejected;
- an OTP send fails;
- the application needs deployment-safe provider wiring; or
- a dedicated SMS credential needs rotation.

A readiness check is read-only; sending and rotation require explicit authorization at the moment of the side effect.

## Prerequisites

The Tencent account needs an SMS application, an approved sign and template, and a least-privilege CAM identity. The project must identify its secret-manager references and existing provider/deployment contract; the skill will not guess or copy values from another application.

## Runtime-only means no reveal step

The safe path injects secret values directly into the target process. With 1Password, an ignored file contains only `op://` references and `op run` resolves them without printing them. Reports retain status, redacted destinations, result codes, and Tencent request IDs, not credentials, OTP values, full phone numbers, or private infrastructure details.

Failures are classified before anything is changed:

- CAM authorization;
- application, sign, or template mismatch;
- parameter mismatch;
- recipient restrictions;
- risk control or compliance;
- provider availability; or
- application retry behavior.

That keeps a template mistake from triggering an unnecessary credential rotation.

## Common questions

**Can the skill send a test SMS after a successful readiness check?**
Not without a recipient and explicit authorization. Readiness proves that a send may work; it does not authorize the external side effect.

**Can I paste credentials into the conversation just for setup?**
No. Put them in the project's approved secret manager and provide only the reference location or logical field names. Runtime injection is both safer and easier to repeat during deployment.

## It's working if

- Readiness reports application, sign, template, and parameter consistency without revealing their values.
- A failed request is tied to Tencent's request ID and official error category before configuration changes begin.
- Every send has explicit authorization, a redacted destination, and a bounded message count.
- A rotation validates the replacement before disabling the old key and preserves a rollback window.
- Repository and command output scans contain no resolved credentials, complete recipients, or OTP values.

## Where it fits

`tencent-sms` is a reach-for-it-anytime operational standalone for one provider. It complements [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs), which handles application failures after the provider boundary has been isolated. For the complete workflow map, use [ask-matt](https://aihero.dev/skills-ask-matt).
