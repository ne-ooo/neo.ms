# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [0.1.0] - 2026-03-09

### Added

- **`ms(value)`** — Default export; parses string to ms or formats ms to string (100% `ms` package compatible)
- **`parse(str)`** — Parse time string to milliseconds (`'2d'` → `172800000`)
- **`format(ms, options?)`** — Format milliseconds to time string
- **`formatShort(ms)`** — Short format (`'2d'`, `'1h'`, `'5m'`)
- **`formatLong(ms)`** — Long format (`'2 days'`, `'1 hour'`, `'5 minutes'`)
- **Constants** — `MILLISECOND`, `SECOND`, `MINUTE`, `HOUR`, `DAY`, `WEEK`, `YEAR`
- Supports units: `ms`, `s`/`sec`, `m`/`min`, `h`/`hr`, `d`, `w`/`wk`, `y`/`yr` and their long forms
- 2-3x faster than the original `ms` package
- 100% backward compatible API
- Zero runtime dependencies
- ESM + CJS dual output with TypeScript declaration files
- 78 tests across parser, formatter, and edge cases
