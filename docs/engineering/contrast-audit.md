## What it does

`contrast-audit` finds unreadable foreground and background combinations across a project and leaves one location-aware findings ledger. HTML receives computed WCAG 2.2 checks; PDF, PPTX, and images receive rendered visual review because flattened pixels cannot recover the document semantics needed for authoritative automated ratios.

Precise ratios are reported only when the rendered DOM exposes enough **evidence** to justify them. Gradients, images, SVG composition, canvas content, and flattened formats are marked for review instead of being silently treated as passes.

## When to reach for it

Type `/contrast-audit`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it automatically when a task fits.

Reach for it:

- before shipping an HTML report, site, slide deck, PDF, presentation, or image set;
- after changing brand tokens; or
- whenever text looks washed out, hard to read, or inconsistent across pages.

It is a contrast gate, not a general code or content review; use [code-review](https://aihero.dev/skills-code-review) for implementation and spec fidelity.

## Prerequisites

Automated HTML auditing needs Python Playwright and an installed Chromium browser. PDF, PPTX, and image auditing needs a renderer that can produce one image per page or slide for visual inspection.

## One ledger, different confidence

- **HTML DOM:** computed foreground, composed background, observed ratio, required ratio, text sample, and selector path.
- **HTML manual review:** gradients, background images, canvas, pseudo-content, and SVG whose background is not declared.
- **PDF, PPTX, and images:** rendered page or slide, visible location, visual finding, and remediation. These findings are not labelled as automated WCAG proof.

The distinction matters because a plausible ratio calculated from guessed colours is worse than an honest review item: it looks authoritative while missing transparency, compositing, theme inheritance, or an image underneath the text.

## Common questions

**Does PDF, PPTX, or image support prove WCAG compliance?**
No. It catches practical legibility problems in the rendered output, but flattened formats do not expose enough semantic and compositing information for the same confidence as computed HTML. The report labels that work as visual review.

**Why does the HTML path need a browser?**
Source CSS is not the final design. The browser resolves variables, inheritance, opacity, responsive rules, fonts, and layered backgrounds; auditing the rendered DOM checks what the reader actually sees.

## It's working if

- Every discovered artifact is either audited or listed as an error; an unreadable file never disappears from the result.
- HTML failures include a selector, text sample, observed ratio, required ratio, and colours.
- Image, gradient, and translucent compositions appear in manual review rather than receiving a guessed pass.
- Re-running after a shared token or component fix reduces the findings count, and the command exits successfully only when automated failures are zero.

## Where it fits

`contrast-audit` is a reach-for-it-anytime standalone and a final quality gate after rendering. It complements [code-review](https://aihero.dev/skills-code-review), which reviews implementation and spec fidelity but does not measure the composed artifact. For the complete workflow map, use [ask-matt](https://aihero.dev/skills-ask-matt).
