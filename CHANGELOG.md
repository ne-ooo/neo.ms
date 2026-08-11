# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

## [1.1.0] - 2026-08-11

### Changed

- Updated Vitest to 3.2.7 and tsup to 8.5.1.
- Added Node-18-compatible Vite and esbuild overrides.
- Added an LPM lockfile for reproducible development installs.
- Added `StringValue`, `Unit`, and `UnitAnyCase` types plus format-aware ESM and CommonJS declaration entry points.

### Fixed

- CommonJS `require('@lpm.dev/neo.ms')` now returns the callable `ms` function while preserving named APIs as function properties.
- Restored ms@2.1.3 behavior for empty strings and `null` format options.
- Public formatter functions now reject `NaN` and infinite values.
- Invalid-value errors now report a bounded type description. They do not serialize objects or call object properties.
- Package smoke tests now verify the built CommonJS and ESM entry points.

## [1.0.0] - 2026-03-09

### Added

- **`ms(value)`** — Default export that parses a string or formats a number
- **`parse(str)`** — Parse time string to milliseconds (`'2d'` → `172800000`)
- **`format(ms, options?)`** — Format milliseconds to time string
- **`formatShort(ms)`** — Short format (`'2d'`, `'1h'`, `'5m'`)
- **`formatLong(ms)`** — Long format (`'2 days'`, `'1 hour'`, `'5 minutes'`)
- **Constants** — `MILLISECOND`, `SECOND`, `MINUTE`, `HOUR`, `DAY`, `WEEK`, `YEAR`
- Supports units: `ms`, `s`/`sec`, `m`/`min`, `h`/`hr`, `d`, `w`, `y`/`yr`, and their long forms
- Added repeatable benchmarks against `ms@2.1.3`. Results vary by operation and environment.
- Added API behavior that matches the tested `ms@2.1.3` cases.
- Zero runtime dependencies
- ESM + CJS dual output with TypeScript declaration files
- 78 tests across parser, formatter, and edge cases
