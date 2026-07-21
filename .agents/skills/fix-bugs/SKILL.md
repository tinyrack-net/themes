---
name: fix-bugs
description: Diagnose and fix user-visible defects and regressions in this repository with evidence-led reproduction, root-cause analysis, proportionate regression coverage, and scoped verification. Use for established product behavior bugs. Do not use for routine documentation corrections, dependency maintenance, unrelated flaky CI, or external-service incidents unless a product-code defect is established.
---

# Evidence-Led Bug Fixes

## Reproduce and Classify

- Inspect the exact reported surface and reproduce the symptom before editing.
- Trace the smallest relevant code path and identify the concrete root cause.
- Distinguish product defects from stale environments, flaky tests, and external
  infrastructure failures. Do not change product code for an unrelated failure.

For visual, layout, spacing, overflow, alignment, positioning, or responsive
defects:

- Open the exact reported route and state in a Playwright-backed real browser
  before editing. Do not diagnose the defect from source, unit tests, or DOM
  markup alone.
- Capture a before screenshot and record the viewport, theme, route, and UI
  state needed to reproduce it.
- Inspect the rendered geometry with the evidence appropriate to the symptom,
  such as bounding boxes, computed styles, scroll dimensions, overlap, or hit
  testing. Treat screenshots as evidence, not as a substitute for measurement.

## Choose Proportionate Coverage

- Add or strengthen a permanent regression test when the defect has a stable,
  valuable automated reproduction. Prefer the narrowest existing layer that
  exercises the broken public behavior.
- Use real pointer, keyboard, focus, browser, persistence, or integration paths
  when those details caused the defect. Avoid mocks that bypass the failure.
- Confirm the test fails before the production fix when it can faithfully
  reproduce the defect without disproportionate harness work.
- An already-failing relevant test can provide the regression proof; a bug-fix
  diff does not need a test-code change merely to satisfy process.
- Do not add brittle implementation-detail tests solely to manufacture a red
  state or increase coverage.
- When reliable automation is impractical, continue only with strong
  reproduction and verification evidence. Explain the limitation at handoff.
  Treat an unprotected high-risk public contract as an explicit remaining risk.

If the user explicitly requests strict TDD or permanent automated regression
proof, require the regression test to fail before editing production code. If
that cannot be done reliably, stop and report the blocker instead of weakening
the requested standard.

## Fix and Verify

- Make the smallest change that resolves the demonstrated root cause.
- Never delete, skip, or weaken relevant tests to accept broken behavior.
- Run the targeted verification first, then the surrounding checks justified by
  the affected surface and risk. Use repository-specific instructions where
  applicable.
- For a visual or layout defect, revisit the same route and UI state in the real
  browser at the recorded viewport and theme. Capture an after screenshot and
  recheck the relevant rendered geometry. Automated assertions protect against
  regression but do not replace inspecting the actual rendered result.
- Keep unrelated or flaky failures separate from the fix and report their
  evidence without broadening the patch.

## Handoff

Report the symptom, root cause, production change, verification performed, and
any automation gap or remaining risk. Do not claim the defect is fixed unless
the reported behavior has been rechecked successfully.
