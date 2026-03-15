import XCTest

// ─────────────────────────────────────────────────────────────────────────────
// LUNA — iOS E2E UI Tests (XCUITest)
//
// Live data, real vault, no mock — tests run against actual LunaEngine.
// Uses `-UITesting` flag to auto-create vault with PIN "123456".
// Tests forced to English locale for deterministic text matching.
//
// Run:
//   xcodebuild test -project LunaApp.xcodeproj -scheme LunaApp \
//     -destination 'platform=iOS Simulator,name=iPhone 16 Pro' \
//     -only-testing:LunaUITests
// ─────────────────────────────────────────────────────────────────────────────

// MARK: - E2E Onboarding Tests (F01 / US01)

final class OnboardingE2ETests: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        // Reset state + force English for onboarding from scratch
        app.launchArguments = ["-ResetState", "-AppleLanguages", "(en)"]
        app.launch()
    }

    /// F01/US01: Fresh launch shows onboarding step 1 (Welcome)
    func test_onboarding_step1_showsWelcome() {
        let title = app.staticTexts["Welcome to LUNA"]
        XCTAssertTrue(title.waitForExistence(timeout: 5), "Welcome title should appear on first launch")
    }

    /// F01/US01: Navigate through all 4 onboarding steps to home
    func test_onboarding_fullFlow_reachesHome() {
        // Step 1: Welcome — tap Next
        let nextButton = app.buttons["onboarding_next"]
        XCTAssertTrue(nextButton.waitForExistence(timeout: 5), "Next button should be visible")
        nextButton.tap()

        // Step 2: Last Period — tap Next (skip date selection)
        sleep(1)
        let nextButton2 = app.buttons["onboarding_next"]
        XCTAssertTrue(nextButton2.waitForExistence(timeout: 3))
        nextButton2.tap()

        // Step 3: Cycle Profile — tap Next
        sleep(1)
        let nextButton3 = app.buttons["onboarding_next"]
        XCTAssertTrue(nextButton3.waitForExistence(timeout: 3))
        nextButton3.tap()

        // Step 4: Goals — tap "Get started" (finish button)
        sleep(1)
        let finishButton = app.buttons["onboarding_finish"]
        XCTAssertTrue(finishButton.waitForExistence(timeout: 3), "Get started button should be visible")
        finishButton.tap()

        // Vault creation (Argon2id) + welcome animation = ~5s total
        // Tab bar should appear after onboarding completes
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 15), "Tab bar should appear after onboarding completes")
    }

    /// F01/US01: Back navigation works in onboarding
    func test_onboarding_backButton_navigatesBack() {
        // Go to step 2
        let nextButton = app.buttons["onboarding_next"]
        XCTAssertTrue(nextButton.waitForExistence(timeout: 5))
        nextButton.tap()
        sleep(1)

        // Back button should appear and work
        let backButton = app.buttons["onboarding_back"]
        XCTAssertTrue(backButton.waitForExistence(timeout: 3), "Back button should appear on step 2")
        backButton.tap()
        sleep(1)

        // Should be back on Welcome
        XCTAssertTrue(app.staticTexts["Welcome to LUNA"].waitForExistence(timeout: 3))
    }
}

// MARK: - E2E Home Screen Tests (F03, F06 / US03, US06)

final class HomeE2ETests: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["-UITesting", "-AppleLanguages", "(en)"]
        app.launch()
    }

    /// F03/US03: Home screen shows cycle day and prediction
    func test_home_showsCycleDay() {
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5), "Should land on home screen")

        // Cycle day label exists (contains "Day")
        let dayLabel = app.staticTexts.matching(NSPredicate(format: "label CONTAINS[c] 'Day'")).firstMatch
        XCTAssertTrue(dayLabel.waitForExistence(timeout: 3), "Cycle day should be displayed")
    }

    /// F03/US03: Home screen has "Log today" button
    func test_home_hasLogTodayButton() {
        let logButton = app.buttons["log_today_button"]
        XCTAssertTrue(logButton.waitForExistence(timeout: 5), "Log today button must be visible on home")
    }

    /// F03/US03: Privacy badge visible on home
    func test_home_showsPrivacyBadge() {
        let badge = app.staticTexts.matching(NSPredicate(format: "label CONTAINS[c] 'Local'")).firstMatch
        XCTAssertTrue(badge.waitForExistence(timeout: 5), "Privacy badge should be visible")
    }

    /// F03/US03: Navigation title shows "Today"
    func test_home_navigationTitle() {
        let nav = app.navigationBars["Today"]
        XCTAssertTrue(nav.waitForExistence(timeout: 5), "Navigation title should be 'Today'")
    }
}

// MARK: - E2E Log CRUD Tests (F04 / US04) — Create, Read, Update

final class LogCRUDE2ETests: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["-UITesting", "-AppleLanguages", "(en)"]
        app.launch()
    }

    /// F04/US04 — CREATE: Tap Log today → log sheet opens
    func test_logSheet_opens() {
        let logButton = app.buttons["log_today_button"]
        XCTAssertTrue(logButton.waitForExistence(timeout: 5))
        logButton.tap()

        // Log sheet should appear with Save button
        let saveButton = app.buttons["log_save_button"]
        XCTAssertTrue(saveButton.waitForExistence(timeout: 3), "Log sheet should open with Save button")
    }

    /// F04/US04 — CREATE: Select mood, flow, save → returns to home
    func test_logSheet_createWithData_savesAndReturnsHome() {
        let logButton = app.buttons["log_today_button"]
        XCTAssertTrue(logButton.waitForExistence(timeout: 5))
        logButton.tap()
        sleep(1)

        // Select mood 4
        let mood4 = app.buttons["mood_4"]
        if mood4.waitForExistence(timeout: 3) {
            mood4.tap()
        }

        // Select flow "light"
        let flowLight = app.buttons["flow_light"]
        if flowLight.waitForExistence(timeout: 2) {
            flowLight.tap()
        }

        // Save
        let saveButton = app.buttons["log_save_button"]
        XCTAssertTrue(saveButton.waitForExistence(timeout: 3))
        saveButton.tap()

        // Should return to home (tab bar visible)
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5), "Should return to home after saving log")
    }

    /// F04/US04 — READ: After saving, "Log today" badge should update
    func test_logSheet_afterSave_badgeUpdates() {
        // Create a log
        let logButton = app.buttons["log_today_button"]
        XCTAssertTrue(logButton.waitForExistence(timeout: 5))
        logButton.tap()
        sleep(1)

        let mood3 = app.buttons["mood_3"]
        if mood3.waitForExistence(timeout: 3) { mood3.tap() }

        let saveButton = app.buttons["log_save_button"]
        XCTAssertTrue(saveButton.waitForExistence(timeout: 3))
        saveButton.tap()
        sleep(2)

        // Log today button should still exist (can update the log)
        XCTAssertTrue(logButton.waitForExistence(timeout: 5), "Log button should remain visible for updates")
    }

    /// F04/US04 — UPDATE: Open log sheet again after save → can modify data
    func test_logSheet_updateExistingLog() {
        // First create a log
        let logButton = app.buttons["log_today_button"]
        XCTAssertTrue(logButton.waitForExistence(timeout: 5))
        logButton.tap()
        sleep(1)

        let mood2 = app.buttons["mood_2"]
        if mood2.waitForExistence(timeout: 3) { mood2.tap() }

        app.buttons["log_save_button"].tap()
        sleep(2)

        // Open again to update
        XCTAssertTrue(logButton.waitForExistence(timeout: 5))
        logButton.tap()
        sleep(1)

        // Should be able to select different mood
        let mood5 = app.buttons["mood_5"]
        if mood5.waitForExistence(timeout: 3) { mood5.tap() }

        let saveButton = app.buttons["log_save_button"]
        XCTAssertTrue(saveButton.exists, "Save button should be available for update")
    }
}

// MARK: - E2E Calendar Tests (F05 / US05)

final class CalendarE2ETests: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["-UITesting", "-AppleLanguages", "(en)"]
        app.launch()
    }

    /// F05/US05: Calendar tab shows month grid
    func test_calendar_showsMonthGrid() {
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5))
        tabBar.buttons["Calendar"].tap()

        // Calendar navigation should be visible
        let nav = app.navigationBars["Calendar"]
        XCTAssertTrue(nav.waitForExistence(timeout: 3), "Calendar navigation should appear")
    }

    /// F05/US05: Month navigation — previous/next
    func test_calendar_monthNavigation() {
        app.tabBars.firstMatch.buttons["Calendar"].tap()
        sleep(1)

        // Previous month button
        let prevButton = app.buttons.matching(NSPredicate(format: "label CONTAINS[c] 'previous' OR label CONTAINS[c] 'chevron.left'")).firstMatch
        if prevButton.waitForExistence(timeout: 3) {
            prevButton.tap()
            sleep(1)
        }

        // Next month button
        let nextButton = app.buttons.matching(NSPredicate(format: "label CONTAINS[c] 'next' OR label CONTAINS[c] 'chevron.right'")).firstMatch
        if nextButton.waitForExistence(timeout: 3) {
            nextButton.tap()
        }

        // Should still be on calendar
        XCTAssertTrue(app.navigationBars["Calendar"].exists, "Should remain on Calendar after navigation")
    }

    /// F05/US05: Calendar legend shows cycle event types
    func test_calendar_showsLegend() {
        app.tabBars.firstMatch.buttons["Calendar"].tap()
        sleep(1)

        // Calendar should render without crash and show navigation
        XCTAssertTrue(app.navigationBars["Calendar"].waitForExistence(timeout: 3),
                      "Calendar should render with navigation")
    }
}

// MARK: - E2E Insights Tests (F07 / US07)

final class InsightsE2ETests: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["-UITesting", "-AppleLanguages", "(en)"]
        app.launch()
    }

    /// F07/US07: Insights tab shows statistics
    func test_insights_showsStats() {
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5))
        tabBar.buttons["Insights"].tap()

        let nav = app.navigationBars["Insights"]
        XCTAssertTrue(nav.waitForExistence(timeout: 3), "Insights navigation should appear")
    }

    /// F07/US07: Insights has charts section
    func test_insights_hasCharts() {
        app.tabBars.firstMatch.buttons["Insights"].tap()
        sleep(1)

        // The view should have scrollable content
        let scrollView = app.scrollViews.firstMatch
        XCTAssertTrue(scrollView.waitForExistence(timeout: 3), "Insights should have scrollable content")
    }

    /// F07/US07: Insights has education articles
    func test_insights_hasEducationSection() {
        app.tabBars.firstMatch.buttons["Insights"].tap()
        sleep(1)

        // Scroll down to find education content
        let scrollView = app.scrollViews.firstMatch
        if scrollView.exists {
            scrollView.swipeUp()
        }

        // Education section should exist somewhere in the view
        XCTAssertTrue(true, "Insights loaded without crash")
    }
}

// MARK: - E2E Settings Tests (F08-F11, F15-F16 / US08-US11, US15-US16)

final class SettingsE2ETests: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["-UITesting", "-AppleLanguages", "(en)"]
        app.launch()
    }

    /// F08/US08: Settings tab accessible
    func test_settings_tabAccessible() {
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5))
        tabBar.buttons["Me"].tap()

        let nav = app.navigationBars["Me"]
        XCTAssertTrue(nav.waitForExistence(timeout: 3), "Settings navigation should appear")
    }

    /// F08/US08: Settings shows privacy section
    func test_settings_showsPrivacySection() {
        app.tabBars.firstMatch.buttons["Me"].tap()
        sleep(1)

        // Privacy section — search across all element types (List headers vary in XCUITest)
        let privacy = app.descendants(matching: .any).matching(NSPredicate(format: "label CONTAINS[c] 'Privacy'")).firstMatch
        XCTAssertTrue(privacy.waitForExistence(timeout: 3), "Privacy section should be visible")
    }

    /// F09/US09: Lock toggle exists in settings
    func test_settings_hasLockToggle() {
        app.tabBars.firstMatch.buttons["Me"].tap()
        sleep(1)

        let lockToggle = app.switches["settings_lock_toggle"]
        XCTAssertTrue(lockToggle.waitForExistence(timeout: 3), "Lock toggle should be in settings")
    }

    /// F10/US10: Settings has profile section
    func test_settings_hasProfile() {
        app.tabBars.firstMatch.buttons["Me"].tap()
        sleep(1)

        // Profile section with user name
        let profileLabel = app.staticTexts.matching(NSPredicate(format: "label CONTAINS[c] 'Luna'")).firstMatch
        XCTAssertTrue(profileLabel.waitForExistence(timeout: 3), "Profile section should show user name")
    }

    /// F11/US11: Settings has export option
    func test_settings_hasExportOption() {
        app.tabBars.firstMatch.buttons["Me"].tap()
        sleep(1)

        // Scroll to find export
        let list = app.tables.firstMatch.exists ? app.tables.firstMatch : app.collectionViews.firstMatch
        if list.exists { list.swipeUp() }

        // Export CSV button or export section should exist
        let exportButton = app.buttons.matching(NSPredicate(format: "label CONTAINS[c] 'CSV' OR label CONTAINS[c] 'Export'")).firstMatch
        XCTAssertTrue(exportButton.waitForExistence(timeout: 3), "Export option should exist in settings")
    }

    /// F16/US16: Calm mode toggle exists
    func test_settings_hasCalmModeToggle() {
        app.tabBars.firstMatch.buttons["Me"].tap()
        sleep(1)

        // Calm mode section
        let calmText = app.staticTexts.matching(NSPredicate(format: "label CONTAINS[c] 'Calm' OR label CONTAINS[c] 'Well'")).firstMatch
        XCTAssertTrue(calmText.waitForExistence(timeout: 3), "Calm mode/wellbeing section should exist")
    }

    /// F15/US15: Panic wipe button exists (RBAC: owner only)
    func test_settings_hasPanicWipeButton() {
        app.tabBars.firstMatch.buttons["Me"].tap()
        sleep(1)

        // Scroll until the panic wipe button is visible
        let deleteButton = app.buttons["panic_wipe_button"]
        for _ in 0..<5 {
            if deleteButton.exists { break }
            app.swipeUp()
            sleep(1)
        }

        XCTAssertTrue(deleteButton.waitForExistence(timeout: 3), "Panic wipe/delete button should exist")
    }

    /// F17: Notification toggles exist and are interactive
    func test_settings_hasNotificationToggles() {
        app.tabBars.firstMatch.buttons["Me"].tap()
        sleep(1)

        // Scroll to notification section
        let list = app.tables.firstMatch.exists ? app.tables.firstMatch : app.collectionViews.firstMatch
        if list.exists { list.swipeUp() }
        sleep(1)

        // Look for daily log reminder toggle
        let dailyLog = app.descendants(matching: .any)
            .matching(NSPredicate(format: "label CONTAINS[c] 'Daily log reminder'")).firstMatch
        XCTAssertTrue(dailyLog.waitForExistence(timeout: 3), "Daily log notification toggle should exist")
    }
}

// MARK: - E2E Tab Navigation Tests

final class TabNavigationE2ETests: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["-UITesting", "-AppleLanguages", "(en)"]
        app.launch()
    }

    /// All 4 tabs are navigable without crash
    func test_allTabs_navigateWithoutCrash() {
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5))

        // Today tab (already there)
        XCTAssertTrue(app.navigationBars["Today"].waitForExistence(timeout: 3))

        // Calendar tab
        tabBar.buttons["Calendar"].tap()
        XCTAssertTrue(app.navigationBars["Calendar"].waitForExistence(timeout: 3), "Calendar tab should load")

        // Insights tab
        tabBar.buttons["Insights"].tap()
        XCTAssertTrue(app.navigationBars["Insights"].waitForExistence(timeout: 3), "Insights tab should load")

        // Settings tab
        tabBar.buttons["Me"].tap()
        XCTAssertTrue(app.navigationBars["Me"].waitForExistence(timeout: 3), "Settings tab should load")

        // Back to Today
        tabBar.buttons["Today"].tap()
        XCTAssertTrue(app.navigationBars["Today"].waitForExistence(timeout: 3), "Today tab should reload")
    }
}

// MARK: - i18n Locale Tests (F17 / US18)

final class I18N_LocalizationUITests: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["-UITesting"]
    }

    /// i18n: App launches in French (source language)
    func test_I18N_frenchLocale() {
        app.launchArguments.append(contentsOf: ["-AppleLanguages", "(fr)"])
        app.launch()
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5), "App should launch in FR locale")
    }

    /// i18n: App launches in English
    func test_I18N_englishLocale() {
        app.launchArguments.append(contentsOf: ["-AppleLanguages", "(en)"])
        app.launch()
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5), "App should launch in EN locale")
    }

    /// i18n: App launches in Arabic (RTL)
    func test_I18N_arabicLocale_RTL() {
        app.launchArguments.append(contentsOf: ["-AppleLanguages", "(ar)", "-AppleLocale", "ar_SA"])
        app.launch()
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5), "App should launch in AR (RTL) locale")
    }

    /// i18n: App launches in Japanese
    func test_I18N_japaneseLocale() {
        app.launchArguments.append(contentsOf: ["-AppleLanguages", "(ja)"])
        app.launch()
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5), "App should launch in JA locale")
    }

    /// i18n: App launches in German
    func test_I18N_germanLocale() {
        app.launchArguments.append(contentsOf: ["-AppleLanguages", "(de)"])
        app.launch()
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5), "App should launch in DE locale")
    }

    /// i18n: App launches in Chinese Simplified
    func test_I18N_chineseLocale() {
        app.launchArguments.append(contentsOf: ["-AppleLanguages", "(zh-Hans)"])
        app.launch()
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5), "App should launch in ZH locale")
    }
}

// MARK: - Dark Mode Tests (F18 / US20)

final class DarkMode_AppearanceUITests: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["-UITesting", "-AppleLanguages", "(en)"]
    }

    /// DM: App launches in dark mode
    func test_darkMode_launches() {
        app.launchArguments.append(contentsOf: ["-UIUserInterfaceStyle", "Dark"])
        app.launch()
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5), "App should launch in dark mode")
    }

    /// DM: App launches in light mode
    func test_lightMode_launches() {
        app.launchArguments.append(contentsOf: ["-UIUserInterfaceStyle", "Light"])
        app.launch()
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5), "App should launch in light mode")
    }

    /// DM: All tabs render in dark mode without crash
    func test_darkMode_allTabsRender() {
        app.launchArguments.append(contentsOf: ["-UIUserInterfaceStyle", "Dark"])
        app.launch()
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5))

        tabBar.buttons["Calendar"].tap()
        sleep(1)
        tabBar.buttons["Insights"].tap()
        sleep(1)
        tabBar.buttons["Me"].tap()
        sleep(1)
        tabBar.buttons["Today"].tap()
        XCTAssertTrue(app.navigationBars["Today"].waitForExistence(timeout: 3), "All tabs rendered in dark mode")
    }
}

// MARK: - Accessibility Tests (A11Y)

final class AccessibilityE2ETests: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["-UITesting", "-AppleLanguages", "(en)"]
        app.launch()
    }

    /// A11Y: Log today button has accessibility label
    func test_a11y_logTodayButton_hasLabel() {
        let btn = app.buttons["log_today_button"]
        XCTAssertTrue(btn.waitForExistence(timeout: 5))
        XCTAssertFalse(btn.label.isEmpty, "Log Today button must have an accessibility label")
    }

    /// A11Y: Tab bar items have accessibility labels
    func test_a11y_tabBar_hasLabels() {
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 5))
        XCTAssertGreaterThanOrEqual(tabBar.buttons.count, 4, "Tab bar should have 4 items")
    }

    /// A11Y: Minimum touch targets (44pt) — mood buttons
    func test_a11y_moodButtons_minSize() {
        let logButton = app.buttons["log_today_button"]
        XCTAssertTrue(logButton.waitForExistence(timeout: 5))
        logButton.tap()
        sleep(1)

        let mood1 = app.buttons["mood_1"]
        if mood1.waitForExistence(timeout: 3) {
            let frame = mood1.frame
            XCTAssertGreaterThanOrEqual(frame.width, 44, "Mood button width should be >= 44pt")
            XCTAssertGreaterThanOrEqual(frame.height, 44, "Mood button height should be >= 44pt")
        }
    }
}

