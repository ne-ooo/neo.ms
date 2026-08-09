# Performance Benchmarks

These microbenchmarks compare `@lpm.dev/neo.ms` with `ms@2.1.3`. They do not predict performance in an application.

Results change with the operation, JavaScript runtime, module format, computer, and system load. Run the benchmarks in the target environment before you decide.

## Method

The benchmark command builds neo.ms before each run. Both libraries load through their package CommonJS entry points.

Each benchmark stores the return value in a shared variable. This step prevents the runtime from removing an unused function call.

Vitest runs each pair in the same process. The ratio is the neo.ms throughput divided by the `ms` throughput.

- A ratio greater than 1 means that neo.ms completed more operations per second.
- A ratio less than 1 means that `ms` completed more operations per second.
- A ratio near 1 means that the results were near parity.

## Current Snapshot

The following snapshot is from one local run on 2026-08-09:

| Item | Value |
|---|---|
| neo.ms | 1.0.0 local working tree |
| ms | 2.1.3 |
| Node.js | 26.5.0 |
| Vitest | 3.2.7 |
| LPM | 0.73.0 |
| Platform | macOS 26.5.2, Apple silicon |

### Representative Results

| Operation | neo.ms / ms throughput |
|---|---:|
| Format `60000`, short | 0.95 |
| Format `60000`, long | 1.12 |
| Parse `"1h"` | 1.13 |
| Parse `"2 days"` | 0.82 |

### Input Groups

| Group | Ratio range |
|---|---:|
| Short formatting inputs | 0.88–1.02 |
| Long formatting inputs | 0.89–1.14 |
| Parsing inputs | 0.80–1.15 |

The results were mixed. This run does not support one general speed multiplier for neo.ms.

Some measurements had high relative margins of error. Treat this table as a local snapshot, not a performance guarantee.

## Why Earlier Results Differed

The previous harness imported neo.ms source code and loaded `ms` through a different module path. It also discarded each return value.

That harness produced ratios of approximately 1.2 to 2.2 across the operations. Module transformation and unused-call optimization affected those results.

The current harness uses the same module format for both packages. It also retains every return value.

## Implementation Claims

The `ms` parser contains a regular-expression literal inside its parse function. The neo.ms parser stores its regular expression at module scope.

This difference does not prove that `ms` compiles a pattern on every call. JavaScript engines can cache and optimize regular-expression code.

neo.ms uses an object property lookup for unit multipliers. `ms` uses a `switch` statement.

The labels O(1) and O(n) do not describe optimized JavaScript behavior reliably. A JavaScript engine can optimize either implementation.

The benchmark measures complete operations. It does not isolate regular expressions, unit selection, or string construction.

## Run the Benchmarks

Install the locked dependencies:

```bash
lpm install --frozen-lockfile
```

Run the benchmarks:

```bash
lpm run bench
```

Vitest marks its benchmark feature as experimental. When you compare runs, use the same Vitest version.

## Limitations

- The benchmark uses CommonJS for a symmetric comparison. ESM results can differ.
- Microbenchmarks use constant inputs and tight loops. Application workloads can behave differently.
- CPU temperature, power mode, and other processes can change the result.
- A throughput ratio does not explain the cause of a difference.
- This document does not make bundle-size or tree-shaking size claims.
