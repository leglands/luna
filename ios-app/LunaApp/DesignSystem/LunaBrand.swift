import SwiftUI
import LifeDS

/// LunaBrand — plum/violet palette for cycle and fertility tracking.
///
/// Rationale: Deep plum conveys femininity and cycle awareness without
/// being clinical. The accent coral (ovulation) provides a distinct
/// signal for fertile window without relying on red/green dichromatic
/// assumptions. Sage secondary grounds the palette with a natural,
/// nurturing undertone.
enum LunaBrand: AppBrand {
    static let name = "Luna"

    // MARK: - Primary (Plum)
    static let primary          = Color(hex: 0x6B3FA0)
    static let primaryDim       = Color(hex: 0x5A3488)
    static let primaryContainer  = Color(hex: 0xE8D5F5)

    // MARK: - Secondary (Sage)
    static let secondary          = Color(hex: 0x4A6741)
    static let secondaryContainer = Color(hex: 0xC8E0C0)

    // MARK: - Accent (Coral — ovulation)
    static let accent          = Color(hex: 0xE8523A)
    static let accentContainer  = Color(hex: 0xFDD5CE)

    // MARK: - Domain colors

    /// Menstruation phase — muted crimson
    static let phaseMenstruation = Color(hex: 0xC45C5C)

    /// Follicular phase — soft violet
    static let phaseFollicular  = Color(hex: 0x9B7DC9)

    /// Ovulation phase — coral accent
    static let phaseOvulation   = accent

    /// Luteal phase — muted sage
    static let phaseLuteal      = Color(hex: 0x7A9E6B)

    /// Fertile window indicator — translucent primary tint
    static let fertileWindow    = Color(hex: 0xE8D5F5)

    /// Logged temperature dot — primary
    static let temperature      = primary

    /// Cervical fluid quality scale — sage tones
    static let fluidEggWhite    = Color(hex: 0xD4E8D0)
    static let fluidCreamy      = Color(hex: 0xEDE8D4)
    static let fluidSticky      = Color(hex: 0xE0D8C8)
    static let fluidDry          = Color(hex: 0xD0CCC0)
}
