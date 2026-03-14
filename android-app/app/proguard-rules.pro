# ── UniFFI generated Kotlin bindings ──────────────────
# JNA uses reflection to access these classes — R8 must not obfuscate/strip them
-keep class uniffi.luna_core.** { *; }
-keep interface uniffi.luna_core.** { *; }

# ── JNA (Java Native Access) ─────────────────────────
# JNA loads native methods via reflection and Structure field ordering
-keep class com.sun.jna.** { *; }
-keep interface com.sun.jna.** { *; }
-dontwarn com.sun.jna.**

# ── Keep JNA Structure subclasses field order ─────────
# @Structure.FieldOrder annotations must survive R8
-keepclassmembers class * extends com.sun.jna.Structure {
    public *;
}

# ── Keep JNA Callback interfaces ──────────────────────
-keep interface * extends com.sun.jna.Callback
-keepclassmembers interface * extends com.sun.jna.Callback {
    *;
}
