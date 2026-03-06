fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios build_rust

```sh
[bundle exec] fastlane ios build_rust
```

Build Rust core for iOS device (arm64)

### ios build

```sh
[bundle exec] fastlane ios build
```

Archive and export IPA for App Store

### ios upload_testflight

```sh
[bundle exec] fastlane ios upload_testflight
```

Upload IPA to App Store Connect (TestFlight)

### ios upload_metadata

```sh
[bundle exec] fastlane ios upload_metadata
```

Upload metadata and screenshots to App Store Connect

### ios release

```sh
[bundle exec] fastlane ios release
```

Full release: build + upload to TestFlight

### ios submit_for_review

```sh
[bundle exec] fastlane ios submit_for_review
```

Submit existing build for App Store review (no binary upload)

### ios upload

```sh
[bundle exec] fastlane ios upload
```

Upload already-built IPA to App Store (shortcut)

----


## Android

### android build

```sh
[bundle exec] fastlane android build
```

Build signed AAB

### android upload_internal

```sh
[bundle exec] fastlane android upload_internal
```

Upload AAB to Google Play (internal track, no assets)

### android upload_store_assets

```sh
[bundle exec] fastlane android upload_store_assets
```

Upload only metadata + screenshots (no binary)

### android release

```sh
[bundle exec] fastlane android release
```

Full release: build + upload AAB + metadata + screenshots to internal track

### android upload

```sh
[bundle exec] fastlane android upload
```

Upload already-built AAB to Play Store (shortcut)

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
