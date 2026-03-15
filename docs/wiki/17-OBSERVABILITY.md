# LUNA Observability

## Context

LUNA is a **zero-network, local-only** app. Traditional observability (OTEL, Datadog, Sentry) **does not apply** — there is no server, no API, no cloud infrastructure to monitor.

## What Applies

| Concern | Traditional | LUNA Equivalent |
|---------|-------------|-----------------|
| Crash reporting | Sentry, Crashlytics | **Disabled** — zero network. Local crash logs only. |
| Metrics | Prometheus, OTEL | **N/A** — no server metrics. Device performance via OS tools. |
| Traces | Jaeger, OTEL | **N/A** — no distributed system. Local function timing only. |
| Alerts | PagerDuty, OpsGenie | **N/A** — no server to alert on. |
| Logs | ELK, CloudWatch | **N/A** — deliberate no-log for user safety (IPV protection). |

## Local Development Observability

### iOS
```bash
# Console.app for device logs
xcrun simctl spawn 7A806776-... log stream --predicate 'subsystem == "com.macaron.luna"'
# Instruments for performance profiling
open /Applications/Instruments.app
```

### Android
```bash
# Logcat
adb -s emulator-5554 shell logcat -d | grep app.luna
# Android Studio Profiler for memory/CPU
```

### Rust Core
```bash
# Test with timing
cargo test -- --show-output
# Benchmark Argon2id derivation time
cargo bench  # (when benchmarks are added)
```

## Why No Crash Reporting

1. **Privacy**: Crash reports contain device info, stack traces, user context → violates zero-network promise
2. **Safety**: IPV survivors need assurance no data leaves device
3. **Trust**: Any network capability undermines "zero network" claim
4. **Store compliance**: INTERNET permission would trigger Google/Apple review questions

## Future Consideration

If crash reporting is ever added:
- **Opt-in only** — explicit user consent
- **Local-first** — store crash logs on device, user manually shares
- **No PII** — strip all personal data from reports
- **Review carefully** — adding any network capability requires privacy policy update
