import Foundation
import LifeDS

enum LunaCrossPromoRules {

    static let lunaToAuraTTC = CrossPromoRule(
        id: "luna-to-aura-ttc",
        targetApp: .aura,
        priority: 10,
        conditions: [
            CrossPromoCondition(stateKey: "tracking_mode", op: .eq, value: "ttc"),
            CrossPromoCondition(stateKey: "ttc_days", op: .gte, value: 30)
        ],
        minDaysActive: 7,
        placement: .homeBanner,
        i18nKeyPrefix: "cross_promo.luna_to_aura_ttc",
        icon: "heart.circle",
        targetBrandColor: 0xC86B5A,
        cooldownDays: 30
    )

    static let lunaToAlma = CrossPromoRule(
        id: "luna-to-alma",
        targetApp: .alma,
        priority: 50,
        conditions: [],
        minDaysActive: 14,
        placement: .settingsSection,
        i18nKeyPrefix: "cross_promo.luna_to_alma",
        icon: "brain.head.profile",
        targetBrandColor: 0x4A8F8F,
        cooldownDays: 90
    )

    static let lunaToNova = CrossPromoRule(
        id: "luna-to-nova",
        targetApp: .nova,
        priority: 30,
        conditions: [
            CrossPromoCondition(stateKey: "current_phase", op: .eq, value: "follicular")
        ],
        minDaysActive: 7,
        placement: .homeBanner,
        i18nKeyPrefix: "cross_promo.luna_to_nova",
        icon: "sparkles",
        targetBrandColor: 0xE94B3C,
        cooldownDays: 30
    )

    static let allRules: [CrossPromoRule] = [lunaToAuraTTC, lunaToAlma, lunaToNova]

    static func buildState(
        trackingMode: String,
        ttcDays: Int,
        currentPhase: String
    ) -> [String: AnyHashable] {
        [
            "tracking_mode": trackingMode,
            "ttc_days": ttcDays,
            "current_phase": currentPhase
        ]
    }

    static func evaluateForHome(
        trackingMode: String,
        ttcDays: Int,
        currentPhase: String
    ) -> CrossPromoRule? {
        let state = buildState(trackingMode: trackingMode, ttcDays: ttcDays, currentPhase: currentPhase)
        return CrossPromoEvaluator.evaluate(
            rules: allRules,
            state: state,
            dismissals: [:],
            firstLaunchDate: Date()
        )
    }
}
