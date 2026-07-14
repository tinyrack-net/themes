# Changelog

## Unreleased

### Changed

- Added contrast-safe control, track, inverse, skeleton, overlay, measure, and spinner foundation tokens.
- Enforced foundation fallbacks for component-owned length, time, and opacity custom properties.
- Standardized public overlay anatomy on `tr-layer-arrow`, `tr-layer-backdrop`, `tr-layer-positioner`, and `tr-layer-viewport` classes.
- Removed the duplicate `Link` `primary` variant and narrowed invalid Dialog and Spinner prop combinations.
- Moved Separator and Context Menu Separator to Base UI wrapper contracts.
- Preserved Form value generics and added Field size and Meter status variants.

### Fixed

- Reset uncontrolled Checkbox Groups from the form actually owned by descendant checkbox inputs.
- Synchronized mixed Checkbox Playground state after activation.
- Hid AppShell mobile controls on desktop regardless of consumer display styles.
- Restored CopyButton focus and selection after the legacy clipboard fallback.
- Implemented four-direction Drawer anchoring and attached-edge radii.
- Removed Field Control styling dependence on Input CSS import order.
- Rendered only a Spinner with a single loading name in loading IconButtons.
- Sized Toolbar separators from the separator's own orientation.
