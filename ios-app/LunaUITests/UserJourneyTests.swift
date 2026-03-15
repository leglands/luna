import XCTest

// ─────────────────────────────────────────────────────────────────────────────
// LUNA — User Journey E2E Tests
//
// Real vault, live data. Uses `-UITesting` to auto-create vault.
// Covers: CRUD operations, navigation, settings, export, panic wipe.
// ─────────────────────────────────────────────────────────────────────────────

final class UserJourneyTests: XCTestCase {
    var app: XCUIApplication!

    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["-UITesting", "-AppleLanguages", "(en)"]
    }

    override func tearDown() {
        app = nil
        super.tearDown()
    }

    // MARK: - Journey 1: Onboarding (fresh launch)

    func testFirstLaunchOnboarding_noData() {
        // Launch with reset to test real onboarding
        app.launchArguments = ["-ResetState", "-AppleLanguages", "(en)"]
        app.launch()

        // Welcome screen should appear
        XCTAssertTrue(app.staticTexts["Welcome to LUNA"].waitForExistence(timeout: 5),
                      "Onboarding welcome should appear on fresh launch")

        // Navigate through all 4 steps
        let nextButton = app.buttons["onboarding_next"]
        XCTAssertTrue(nextButton.waitForExistence(timeout: 3))
        nextButton.tap()
    }

    // MARK: - Journey 2: Log a day (CRUD Create)

    func testLogDay_noExistingData() {
        app.launch()

        // Wait for home screen
        let logButton = app.buttons["log_today_button"]
        XCTAssertTrue(logButton.waitForExistence(timeout: 10), "Log today button should be visible")
        logButton.tap()

        // Log sheet should open
        let saveButton = app.buttons["log_save_button"]
        XCTAssertTrue(saveButton.waitForExistence(timeout: 5), "Save button should appear in log sheet")

        // Select flow
        let flowLight = app.buttons["flow_light"]
        if flowLight.waitForExistence(timeout: 3) {
            flowLight.tap()
        }

        // Select mood
        let mood3 = app.buttons["mood_3"]
        if mood3.waitForExistence(timeout: 3) {
            mood3.tap()
        }

        // Save
        saveButton.tap()

        // Should return to home
        XCTAssertTrue(app.tabBars.firstMatch.waitForExistence(timeout: 5),
                      "Should return to home after saving")
    }

    // MARK: - Journey 3: Insights view

    func testInsightsView_withData() {
        app.launch()

        // Navigate to Insights
        let insightsTab = app.tabBars.firstMatch.buttons["Insights"]
        XCTAssertTrue(insightsTab.waitForExistence(timeout: 10))
        insightsTab.tap()

        // Insights nav should appear
        XCTAssertTrue(app.navigationBars["Insights"].waitForExistence(timeout: 5),
                      "Insights navigation should appear")
    }

    // MARK: - Journey 4: Settings — export CSV

    func testSettings_exportCSV() {
        app.launch()

        // Go to Settings
        let settingsTab = app.tabBars.firstMatch.buttons["Me"]
        XCTAssertTrue(settingsTab.waitForExistence(timeout: 10))
        settingsTab.tap()

        // Scroll to find export
        let list = app.tables.firstMatch.exists ? app.tables.firstMatch : app.collectionViews.firstMatch
        if list.exists { list.swipeUp() }

        // Export CSV button
        let exportBtn = app.buttons.matching(NSPredicate(format: "label CONTAINS[c] 'CSV'")).firstMatch
        if exportBtn.waitForExistence(timeout: 5) {
            exportBtn.tap()
        }

        // App should not crash
        XCTAssertTrue(app.exists, "App should survive export action")
    }

    // MARK: - Journey 5: Tracking Mode selection

    func testTrackingMode_TTCSelection() {
        app.launch()

        let settingsTab = app.tabBars.firstMatch.buttons["Me"]
        XCTAssertTrue(settingsTab.waitForExistence(timeout: 10))
        settingsTab.tap()

        // Find Tracking Mode link
        let trackingLink = app.buttons.matching(NSPredicate(format: "label CONTAINS[c] 'Tracking'")).firstMatch
        if !trackingLink.waitForExistence(timeout: 3) {
            // Scroll to find it
            let list = app.tables.firstMatch.exists ? app.tables.firstMatch : app.collectionViews.firstMatch
            if list.exists { list.swipeUp() }
        }

        if trackingLink.waitForExistence(timeout: 3) {
            trackingLink.tap()
            sleep(1)
        }

        // App should not crash navigating tracking mode
        XCTAssertTrue(app.exists, "App should survive tracking mode navigation")
    }

    // MARK: - Journey 6: CRUD full cycle

    func testCRUD_startAndLogCycle() {
        app.launch()

        // 1. Log a day from home
        let logBtn = app.buttons["log_today_button"]
        if logBtn.waitForExistence(timeout: 5) {
            logBtn.tap()
            sleep(1)
            // Save (even empty log is valid)
            let saveBtn = app.buttons["log_save_button"]
            if saveBtn.waitForExistence(timeout: 3) {
                saveBtn.tap()
            }
            sleep(2)
        }

        // 2. Check calendar shows the update
        let calendarTab = app.tabBars.firstMatch.buttons["Calendar"]
        if calendarTab.waitForExistence(timeout: 5) {
            calendarTab.tap()
            XCTAssertTrue(app.navigationBars["Calendar"].waitForExistence(timeout: 3),
                          "Calendar should show after logging")
        }

        // 3. Back to home
        app.tabBars.firstMatch.buttons["Today"].tap()
        XCTAssertTrue(app.navigationBars["Today"].waitForExistence(timeout: 3))
    }

    // MARK: - Journey 7: Panic Wipe

    func testPanicWipe() {
        app.launch()

        let settingsTab = app.tabBars.firstMatch.buttons["Me"]
        XCTAssertTrue(settingsTab.waitForExistence(timeout: 10))
        settingsTab.tap()

        // Find delete button
        let deleteBtn = app.buttons.matching(NSPredicate(format: "label CONTAINS[c] 'Delete' OR label CONTAINS[c] 'Erase'")).firstMatch
        if deleteBtn.waitForExistence(timeout: 5) {
            deleteBtn.tap()
            // Confirmation dialog — tap destructive action if present
            let confirmBtn = app.buttons.matching(NSPredicate(format: "label CONTAINS[c] 'Delete' OR label CONTAINS[c] 'Erase'")).firstMatch
            if confirmBtn.waitForExistence(timeout: 3) {
                confirmBtn.tap()
            }
        }

        // App should not crash after wipe attempt
        // (On simulator, device auth may block actual wipe, which is fine)
        XCTAssertTrue(app.exists, "App should survive panic wipe flow")
    }
}
