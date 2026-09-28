---
title: "PRD — Catat Emas (GoldInvestmentApp)"
document_type: PRD
version: 1.0
status: draft
created: 2026-09-28
source: existing_codebase
project_shape: mobile
reconstruction_method: Prompt 05 (code → PRD)
---

# PRD — Catat Emas (GoldInvestmentApp)

## 1. Executive Summary

> Source: reconstructed from an existing codebase via Prompt 05 on 2026-09-28.

**Catat Emas** (repository `farisi55/GoldInvestmentApp`, npm package `GoldInvestmentApp`, display name `Catat Emas`) is a single-user, offline-first **React Native mobile app** for recording a personal physical-gold investment portfolio. It ships today as a working Android application (README badge links an Amazon Appstore listing) with an iOS project present but not evidenced as released.

The app has **no backend, no accounts, and no authentication**: every transaction lives in a local SQLite database (`GoldInvestment.db`, single table `gold_investments`) on the device. The only network calls are (a) fetching a live gold price in IDR from `goldprice.org` and (b) third-party SDK traffic (Google AdMob ads, optional Sentry crash reporting). Users record gold purchases (date, weight in grams, rupiah value), see a dashboard of totals with a profit/loss estimate against the live rate, browse/sort/page/delete their history, view a cumulative growth chart over a selectable window, read live multi-unit gold prices, and export/import their whole dataset as a JSON file.

Monetization is advertising only: a banner ad is rendered on most screens and an interstitial is triggered from several navigation/action points (all ad calls fail open — the user flow continues if the ad is not ready). This PRD documents **what the code currently does**, at the granularity of independently observable capabilities; every §5 entry carries `Status: existing` and cites the file/lines that implement it.

---

## 2. Users & Context

**Primary user.** A single individual tracking their own physical gold holdings. [INFERRED from code: all UI strings and number formatting are Indonesian (`id-ID` formatter, `Rp` prefix, labels such as "Tambah Catatan", "Total Berat"), the target quote currency is IDR, and there is no multi-user, account, or sharing concept anywhere in the code.]

**Context of use.**
- **Device-local, single-profile.** No login, no cloud sync, no cross-device state. Deleting the app or clearing its data removes the portfolio unless the user has exported a JSON backup. [INFERRED — this is a consequence of the storage design, not a commented product decision.]
- **Offline-first.** Recording, history, chart, and backup/restore all read/write local SQLite and work with no connectivity. Network is required only for the live gold rate (dashboard rate + Gold Prices screen). [Code evidence: only `fetchGoldPrice`/`fetchGoldRates` perform network I/O.]
- **Infrequent, short sessions.** The user opens the app to add a purchase or check whether the portfolio is up or down; the splash screen gates entry with a fixed 3-second timer (`screens/SplashScreen.js:7-12`) before the dashboard loads. [INFERRED from the screen flow and splash gate — no analytics or usage data exists in the repo.]
- **Language/locale.** UI copy is a mix of Indonesian and English (e.g. `"About Application"`, `"← Back to Home"`, `"Gold Rates (Realtime)"` coexist with `"Dashboard Investasi"`). Currency is formatted with `Intl.NumberFormat('id-ID')` / `.toLocaleString('id-ID')`.
- **Distribution context.** README advertises an Amazon Appstore listing; git history shows release APK builds (`apk release succes running`, `build relase oke`). Store-compliance work (Play Store readiness, ad-free IAP) is described in `changelog.md` as *future* work and is **not present in code**.

**Stakeholders evidenced by the code.** One developer, named in-app: "Banu Salman" with GitHub/LinkedIn/blog links (`components/DeveloperInfo.js:24-36`).

---

## 3. Scope

### 3.1 In scope (implemented and observable in this codebase)

- Portfolio dashboard: total grams, current market value, profit/loss estimate, live rate, banner ad.
- Recording a purchase: date picker, weight↔value two-way auto-calculation, validation, save.
- History: table listing, ASC/DESC sort, client-side pagination, soft delete with confirmation, per-page totals.
- Growth chart: 1/3/6/12-month windows, cumulative line chart, tap-to-inspect tooltip, empty state.
- Market gold prices: real-time rates per gram/tola/ounce requested in IDR.
- Backup/restore: export all rows to a JSON file in the device Downloads folder, share it, and re-import it (replace-all).
- About: developer profile with external links.
- Platform services: Sentry crash reporting with PII scrubbing, startup env-var validation, AdMob unit selection (dev Test IDs vs. production env IDs), Android hardware-back exit confirmation.
- Engineering harness: Jest unit tests, ESLint/Prettier, GitHub Actions CI, a git pre-commit hook blocking secret files.

### 3.2 Out of scope (no code evidence — do not assume exists)

- User accounts, authentication, authorization, or any server API. [No endpoint, token, or auth module exists.]
- Cloud sync, push notifications, background/scheduled jobs (e.g. no daily price refresh job — the rate is fetched only when `HomeScreen` mounts; see §10).
- Multi-currency portfolio accounting — the portfolio is recorded and valued strictly in IDR.
- Ad-free purchase / Play Billing, privacy-policy page, E2E tests: listed as *planned* tasks in `changelog.md` only. These are **documentation evidence of intent, not features**; they are deliberately absent from §5 (no developer request in this session to spec them as `planned`).

### 3.3 Explicitly not decided here

- Whether future schema migration, data-retention (soft-deleted rows), and empty-state work should happen → §10 Open Questions.

---

## 4. Technical Specification

### 4.1 Tech Stack

| Layer | Choice (as pinned in `package.json`) |
|---|---|
| Language | JavaScript (app code), TypeScript config present but only `.tsx` test file; `typescript` 5.0.4 in devDependencies |
| Framework | React Native **0.76.5**, React **18.3.1**, `@react-native-community/cli` 15.1.3 |
| JS engine / arch | Hermes enabled, New Architecture enabled (`android/gradle.properties`: `hermesEnabled=true`, `newArchEnabled=true`) |
| Navigation | `@react-navigation/native` 7 + `@react-navigation/stack` 7 (single stack navigator in `App.js`) |
| Storage | `react-native-sqlite-storage` 6 — database `GoldInvestment.db` |
| HTTP | `axios` 1.7.9 (dashboard rate) and native `fetch` (gold rates list) |
| Charts | `react-native-chart-kit` (`LineChart`) + `react-native-svg` |
| Ads | `react-native-google-mobile-ads` 14.8.0 (AdMob) |
| Crash reporting | `@sentry/react-native` 6.15.0 (pinned exact) |
| Config/secrets | `react-native-config` (dotenv → native `BuildConfig`/plist) |
| File I/O | `react-native-fs`, `react-native-document-picker`, `react-native-share` |
| Misc UI | `@react-native-community/datetimepicker`, `@react-native-picker/picker`, `lottie-react-native`, `react-native-linear-gradient`, `react-native-vector-icons` |
| Build targets | Android: `minSdk 24`, `targetSdk 34`, `compileSdk 35`, app id `com.goldinvestmentapp`, `versionCode 1` / `versionName "1.0"`; iOS: bundle id still the RN template default (`org.reactjs.native.example.*`), `MARKETING_VERSION 1.0` |
| Package manager | npm (`package-lock.json`, `engines.node >= 18`); CocoaPods via `Gemfile` for iOS |
| Quality | Jest 29 (`react-native` preset), ESLint (`@react-native` config), Prettier 2.8.8, GitHub Actions |

Dependencies with **no import anywhere in app code** (dead weight): `date-fns-tz`, `expo`, `react-navigation-stack` (legacy v2 alongside v7), `react-native-dotenv` (no babel plugin registered — `babel.config.js` only adds `react-native-reanimated/plugin`), `react-native-get-random-values`. [Verified by import scan; `react-native-svg`/`react-native-reanimated`/`react-native-gesture-handler`/`react-native-screens`/`react-native-safe-area-context` are not imported directly but are peer requirements of navigation/chart libraries.]

**Entry points.** `index.js` → registers `App` from `App.js` → `GoldRateProvider` → `NavigationContainer` → stack navigator (`initialRouteName = "Splash"`). `App.js` executes two module-level side effects at import time: `initCrashReporter()` (`App.js:36`) and `validateEnv()` (`App.js:40`), plus an `AdMob.setRequestConfiguration → initialize` effect inside the component (`App.js:45-64`).

### 4.2 Architecture

What the code actually does (not a best-practice diagram):

- **Single-process, single-activity client app.** No backend. Layering is informal and directory-based:
  - `screens/` — 8 route components (Splash, Home, Graph, AddInvestment, InvestmentDetail, BackupRestore, Gold Prices, About).
  - `components/` — presentational widgets, several of which call `useNavigation()` and `AdManager` directly (e.g. `ChartComponent`, `InvestmentDetailList`, `GoldRatesList`, `DeveloperInfo`), so presentation and navigation/ad side effects are interleaved rather than strictly separated.
  - `repository/` — the only DB access layer: `GoldInvestmentRepository` (CRUD + aggregates) and `BackupRestoreRepository` (JSON export/import). Both call `SQLite.openDatabase({name:'GoldInvestment.db'})` independently at module load (`GoldInvestmentRepository.js:4`, `BackupRestoreRepository.js:15`) — two module-level handles over one file.
  - `services/` — one network service (`GoldRateService`); `utils/GoldPriceHelper` duplicates the same endpoint for the dashboard value.
  - `context/GoldRateContext` — one React context holding `currentGoldRate`, defaulting to `1000000`, mutated only by `HomeScreen`'s mount effect.
  - `utils/` — cross-cutting: `AdManager` (interstitial singleton), `CrashReporter` (Sentry wrapper), `GoldPriceHelper`, `ButtonBackHandler`.
- **State model.** All state is component-local `useState` plus the single `GoldRateContext`. There is no global store, no data layer caching, and no re-fetch-on-focus: totals and the history list are loaded once per screen mount (`HomeScreen.js:19-40`, `InvestmentDetailScreen.js:15-23`).
- **Navigation.** One flat stack; every non-Splash screen offers an explicit "← Back to Home" action that fires an interstitial before navigating. There is no deep linking, no params passed between routes, and `navigation.navigate('Home')` is used instead of `goBack()` everywhere.
- **Startup order (side effects).** import-time `initCrashReporter()` → import-time `validateEnv()` (throws in production when AdMob IDs are missing/placeholder) → render → AdMob request configuration + `initialize()` in `useEffect`.
- **Third-party boundary.** Everything outside the device is optional: goldprice.org (rate data), AdMob (revenue), Sentry (diagnostics). Each failure path degrades in code rather than surfacing an error screen (see §6.3).

### 4.3 External Integrations

| Integration | Endpoint / mechanism | Used by | Failure behavior in code |
|---|---|---|---|
| goldprice.org rate (dashboard) | `GET https://data-asg.goldprice.org/dbXRates/IDR`, axios, 10 s timeout | `utils/GoldPriceHelper.js:16-19` | catches all errors → returns literal `1000000` (Rp1,000,000/gram) |
| goldprice.org rates (list) | same URL via `fetch` | `services/GoldRateService.js:15` | catches → returns `[]` (empty list, no error UI) |
| Google AdMob | `GAMBannerAd` (FULL_BANNER) + `InterstitialAd` singleton; unit IDs from TestIds in dev, `.env` in release | `utils/AdManager.js`, `components/BannerAdComponent.js` | interstitial `showAd(cb)` runs `cb` immediately if ad not loaded; banner simply renders nothing |
| AdMob request policy | `tagForChildDirectedTreatment:false`, `tagForUnderAgeOfConsent:false`, `maxAdContentRating:PG`; `requestNonPersonalizedAdsOnly:true` on every ad request | `App.js:48-54`, `AdManager.js:23`, `BannerAdComponent.js:15` | init failure logged via `captureMessage`, never crashes |
| Sentry | `Config.SENTRY_DSN`; `tracesSampleRate:0.1`; `beforeSend: scrubPII` | `utils/CrashReporter.js:104-116` | no DSN or `__DEV__` → console-only, no remote reporting |
| Share / file picker | `react-native-share` `Share.open({url:file://…})`, `DocumentPicker.pickSingle` | `BackupRestoreRepository.js:61-73, 76-84` | user cancel is swallowed; other errors → `logError` |

Unit conversion constants live in code: `OZ_TO_GRAM = 31.1035`, `TOLA_TO_GRAM = 11.66` (`GoldRateService.js:10-11`, `GoldPriceHelper.js:21`).

### 4.4 Navigation Map

```
Splash ──(3 s, replace)──▶ Home
Home ──▶ Graph | AddInvestment | InvestmentDetail | BackupRestore | "Gold Prices" | About
Graph            ──[Back to Home + interstitial]──▶ Home
AddInvestment    ──[on successful save + interstitial]──▶ Home
InvestmentDetail ──[Back to Home + interstitial]──▶ Home
BackupRestore    ──[Back to Home + interstitial]──▶ Home
"Gold Prices"    ──[Back to Home + interstitial]──▶ Home
About            ──[Back to Home + interstitial]──▶ Home
Android hardware back (Home only) ──▶ confirm dialog ──▶ BackHandler.exitApp()
```
Route names are literal strings declared in `App.js:77-102` (note the inconsistent route name `"Gold Prices"` with a space).

### 4.5 Data Model

Reflects the **actual DDL** in `repository/GoldInvestmentRepository.js:6-21` — not any README/comment paraphrase. There is exactly one table; there are **no migration files** anywhere in the repo.

**Database:** `GoldInvestment.db` (SQLite, `location: "default"`), created lazily when `HomeScreen` mounts (`createTables()` at `HomeScreen.js:33`).

**Table `gold_investments`** (verbatim `CREATE TABLE IF NOT EXISTS`):

| Column | Type | Constraint / default | Meaning (from code usage) |
|---|---|---|---|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | row id; used by delete + list keys |
| `input_date` | DATETIME | NOT NULL | transaction date, stored as `YYYY-MM-DD` string (`GoldInvestmentRepository.js:86`) |
| `sys_timestamp` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | insert time (set by SQLite; never read by app code) |
| `sys_update_date` | DATETIME | NULL | set to `date('now')` only on soft delete (`:75`); never displayed |
| `weight_gram` | FLOAT | NOT NULL | grams purchased |
| `price_gold` | FLOAT | NOT NULL | the gold rate captured at save time (`currentGoldRate` passed from context) |
| `investment_value` | FLOAT | NOT NULL | rupiah paid |
| `use_data` | VARCHAR(5) | DEFAULT `'Y'` | soft-delete flag: `'Y'` visible, `'N'` deleted |

**Access patterns actually implemented:**
- Aggregate totals: `SUM(weight_gram), SUM(investment_value) … WHERE use_data='Y'` (`:27-31`).
- List: `SELECT id, input_date, weight_gram, investment_value … ORDER BY input_date ${orderByDate}` — `orderByDate` is string-interpolated, taken from UI state that only ever holds `'ASC'`/`'DESC'` (`:53-56`, `InvestmentDetailScreen.js:52`).
- Insert: parameterized `INSERT … VALUES (?,?,?,?)` (`:90-91`).
- Delete: **soft** — `UPDATE … SET use_data='N', sys_update_date=date('now') WHERE id=?` (`:75`). Soft-deleted rows are never purged and never returned by any read query; there is no retention/purge job.
- Chart: rows in the last N days (`input_date >= date('now', '-${days} days')`, `days` interpolated — values come only from a fixed Picker list `30|90|180|365`), grouped by `input_date`, then **cumulated in JS** into `weight` and `investment` running totals (`:106-134`).

**Derived (non-persisted) values:** current market value `totalWeight × currentGoldRate`; profit/loss `currentValue − totalInvestmentValue` (see `components/DashboardView.js:46-49`).

**Backup file format** (not a table — serialization of rows): a JSON array of objects with keys `input_date`, `weight_gram`, `price_gold`, `investment_value`, `use_data` (`BackupRestoreRepository.js:22, 30, 92-100`). `id`, `sys_timestamp`, `sys_update_date` are **not** exported, so restored rows get new ids.

**Schema-evolution mechanism:** none. Only `CREATE TABLE IF NOT EXISTS`; no `PRAGMA user_version`, no migration directory. [DECISION NEEDED — see §10.]

### 4.6 Build, Test & CI Tooling

- **Scripts** (`package.json`): `android`, `ios`, `start`, `lint` (`eslint .`), `test` (`jest`).
- **CI** (`.github/workflows/ci.yml`): on every push/PR — `npm ci` → `eslint . --max-warnings=9999` → `jest --watchAll=false --forceExit` → `npm audit --audit-level=critical` (blocking) plus a non-blocking `--audit-level=high` step.
- **Measured current state (run during this reconstruction):**
  - `npm test` → **6 suites / 42 tests pass** — but 3 of those 6 suites are duplicates inside the gitignored `.kilo/worktrees/…` copy (Jest has no `testPathIgnorePatterns`, only the default `/node_modules/`).
  - `npm run lint -- --max-warnings=9999` → **exit 1: 63 errors, 245 warnings** (61 errors are `'jest' is not defined` in `jest.setup.js`; the other 2 are `react-hooks/exhaustive-deps` in `HomeScreen.js:40` and `InvestmentDetailScreen.js:17`). The CI lint step therefore fails as the repo stands.
- **Pre-commit hook**: `scripts/pre-commit` blocks `.env*`, `*.keystore`, `*.jks`, `*.p12`, `*.pem`, `*.key` from being staged; it is installed in `.git/hooks/pre-commit` on this machine but must be manually copied on a fresh clone (the install instructions live in the script header).
- **Test inventory**: `__tests__/CrashReporter.test.js` (11 tests), `__tests__/validateEnv.test.js` (9 tests), `__tests__/App.test.tsx` (1 smoke render). There are **no tests** for repositories, profit/loss math, two-way input calculation, backup/restore, or price fallback.

---

## 5. Feature Specifications

All entries are `Status: existing`. Acceptance criteria describe behavior **observed in the current code**.

### Dashboard / Home

**F-01 — Splash gate**
- **Status:** existing
- **Evidence:** `screens/SplashScreen.js:7-12`
- **Acceptance criteria:** App opens on a branded screen (icon, title `GoldInvestmentApp`, looping Lottie animation on `#fff8e1`); after exactly 3000 ms it is *replaced* (not pushed) by Home, so back cannot return to it; the timer is cleared on unmount.

**F-02 — Hardware back exit confirmation (Android)**
- **Status:** existing
- **Evidence:** `utils/ButtonBackHandler.js:4-18`, applied in `screens/HomeScreen.js:17`
- **Acceptance criteria:** Pressing the Android back button while on Home shows a native alert "Apakah Anda yakin ingin keluar dari aplikasi?" with `Tidak` (dismiss) / `Ya` (`BackHandler.exitApp()`); the listener returns `true` so the app is not backgrounded by the default behavior; it is registered only on Home.

**F-03 — Portfolio totals on dashboard**
- **Status:** existing
- **Evidence:** `repository/GoldInvestmentRepository.js:23-47`, `components/DashboardView.js:62-65`, loaded by `screens/HomeScreen.js:33-36`
- **Acceptance criteria:** On Home mount the app ensures the table exists, then displays "Total Berat: {sum of `weight_gram`} gram" (2 decimals) and "Nilai Investasi: Rp {totalWeight × currentGoldRate}" formatted with `id-ID`; only rows with `use_data='Y'` count; with no rows both figures render as `0` without crashing.

**F-04 — Profit / loss estimate**
- **Status:** existing
- **Evidence:** `components/DashboardView.js:46-53, 66-72`
- **Acceptance criteria:** Computes `difference = (totalWeight × currentGoldRate) − totalInvestmentValue`; shows a green up-arrow `Profit` or red down-arrow `Lost` with `|difference|` in Rp and a percentage `(|difference| / totalInvestmentValue) × 100` to 2 decimals; `difference ≥ 0` counts as profit. (See §10: with zero investment the percentage renders `NaN` — current behavior, not a target.)

**F-05 — Live gold rate load on dashboard**
- **Status:** existing
- **Evidence:** `screens/HomeScreen.js:19-40`, `utils/GoldPriceHelper.js:14-29`, `context/GoldRateContext.js:8`
- **Acceptance criteria:** On mount the app requests `https://data-asg.goldprice.org/dbXRates/IDR` with a 10 s timeout, converts `xauPrice / 31.1035` to an integer Rp/gram, and stores it in `GoldRateContext`; a spinner flag (`isLoadingGoldPrice`) is toggled around the call; on any failure the helper returns the constant `1000000` and logs via `logError` — the context therefore always ends with a numeric rate (context default is also `1000000`).

**F-06 — Dashboard banner ad**
- **Status:** existing
- **Evidence:** `components/DashboardView.js:123-125`, `components/BannerAdComponent.js`
- **Acceptance criteria:** A `GAMBannerAd` (size `FULL_BANNER`) renders at the bottom of the dashboard using `AdManager.getBannerUnitId()` (Google Test ID when `__DEV__`, else `ADMOB_BANNER_UNIT_ID`), requested with `requestNonPersonalizedAdsOnly: true` and Indonesian finance keywords.

### Record a purchase (Add Investment)

**F-07 — Transaction date picker**
- **Status:** existing
- **Evidence:** `components/DatePickerInput.js`, `screens/AddInvestmentScreen.js:12, 69-71`
- **Acceptance criteria:** Tapping the date field opens the native `DateTimePicker` in date mode; a user selection is written with a timezone compensation (`getTimezoneOffset()` shift, `DatePickerInput.js:12`) so the picked local calendar date survives `toISOString()` on save. The field initializes to "now" **without** that compensation, so its initial `YYYY-MM-DD` display and an untouched save both use the UTC date (in UTC+N timezones after local midnight this is yesterday) — current behavior, see §8. The value is never empty, so it always passes validation.

**F-08 — Two-way weight ↔ value auto-calculation**
- **Status:** existing
- **Evidence:** `screens/AddInvestmentScreen.js:17-38`
- **Acceptance criteria:** Entering a weight (numeric keyboard) computes `investmentValue = weight × currentGoldRate` and shows it `id-ID`-formatted; entering a value strips non-digits, formats it, and back-computes `goldWeight = value / currentGoldRate` to 3 decimals; clearing either field clears the other; the two fields are always mutually consistent at rest.

**F-09 — Validate and save a transaction**
- **Status:** existing
- **Evidence:** `screens/AddInvestmentScreen.js:40-63`, `repository/GoldInvestmentRepository.js:84-99`
- **Acceptance criteria:** If date, weight, or value is missing, a native alert "Semua harus diisi!" appears and nothing is written; otherwise a row is inserted with `input_date` (local `YYYY-MM-DD`), `weight_gram`, `price_gold = currentGoldRate`, `investment_value` (non-digit characters stripped before `parseFloat`) inside a SQLite transaction; on success an interstitial is requested (`AdManager.showAd()`), the alert "Investasi berhasil ditambahkan!" is shown, and the app navigates to Home; on failure `logError('AddInvestmentScreen', error)` runs and an error alert is shown. No numeric range/format validation beyond `keyboardType="numeric"` and non-emptiness.

### History (Investment Detail)

**F-10 — Transaction table**
- **Status:** existing
- **Evidence:** `repository/GoldInvestmentRepository.js:49-69`, `components/InvestmentDetailList.js:46-74`
- **Acceptance criteria:** Lists every `use_data='Y'` row as `No | Tanggal | Berat Emas (gr) | Nilai Investasi (Rp) | Aksi`; dates render `en-GB` (`DD Mon YYYY`), weight 2 decimals, value `Rp` + `id-ID` format; numbering continues across pages via `startIndex`; delete action is a trash icon per row. With zero rows the list and footer simply render empty (no dedicated empty state).

**F-11 — Sort toggle**
- **Status:** existing
- **Evidence:** `screens/InvestmentDetailScreen.js:13, 52`, `components/InvestmentDetailList.js:38-44`
- **Acceptance criteria:** Tapping the header row toggles `ORDER BY input_date DESC ⇄ ASC`, re-queries, and resets to page 1; the toggle is the only sorting control (it is bound to the whole header, not an individual column).

**F-12 — Pagination**
- **Status:** existing
- **Evidence:** `screens/InvestmentDetailScreen.js:8, 54-56`, `components/Pagination.js`
- **Acceptance criteria:** The full result set is sliced client-side into pages of 10; `Previous`/`Next` are disabled at the bounds; the footer shows `Page {n} of {total}` (renders `Page 1 of 0` when empty); changing sort returns to page 1.

**F-13 — Delete with confirmation (soft delete)**
- **Status:** existing
- **Evidence:** `screens/InvestmentDetailScreen.js:25-50`, `repository/GoldInvestmentRepository.js:71-82`
- **Acceptance criteria:** Tapping the trash icon shows a non-cancelable alert "Apakah Anda yakin ingin menghapus item ini?"; `Ya` sets `use_data='N'` and `sys_update_date=date('now')` (row is retained, not dropped), refreshes the list, then navigates to Home; `Tidak` does nothing; SQL/DB errors surface as an error alert.

**F-14 — Per-page totals footer and interstitial on exit**
- **Status:** existing
- **Evidence:** `components/InvestmentDetailList.js:20-30, 86-96`
- **Acceptance criteria:** A `Total` row sums `weight_gram` and `investment_value` **of the rows currently displayed on the page** (not the portfolio), 2-decimal grams + `Rp id-ID`; the "← Back to Home" button requests an interstitial then navigates.

### Growth chart (Graph)

**F-15 — Period filter**
- **Status:** existing
- **Evidence:** `screens/GraphScreen.js:13, 45-54`
- **Acceptance criteria:** A `Picker` offers `1 Bulan/30`, `3 Bulan/90`, `6 Bulan/180`, `1 Tahun/365` days, defaulting to 30; changing it re-queries and resets the tooltip.

**F-16 — Cumulative growth line chart**
- **Status:** existing
- **Evidence:** `repository/GoldInvestmentRepository.js:101-142`, `components/ChartComponent.js:16-43`
- **Acceptance criteria:** Loads rows with `input_date` within the last N days, groups by date, and accumulates running totals in JS; renders a `LineChart` whose dataset is **cumulative weight in grams** (`yAxisSuffix="gr"`, 2 decimals, orange gradient, rotated labels `dd MMM` via `id-ID`) — the y-axis is weight, not rupiah; each point maps to that date's cumulative `investment_value` for the tooltip.

**F-17 — Point tooltip**
- **Status:** existing
- **Evidence:** `screens/GraphScreen.js:29-40`, `components/ChartComponent.js:44-50`
- **Acceptance criteria:** Tapping a data point shows an absolutely-positioned tooltip "Nilai Investasi: Rp {cumulative investment}" positioned from the point index; it auto-hides after 2000 ms; selecting a new point replaces it.

**F-18 — Chart empty state**
- **Status:** existing
- **Evidence:** `screens/GraphScreen.js:55-64`
- **Acceptance criteria:** When the query returns no rows the chart is replaced by centered text "Belum ada data investasi."; errors in the fetch are logged via `logError('GraphScreen', error)` with no visible error UI.

### Market prices (Gold Prices)

**F-19 — Real-time multi-unit rate list**
- **Status:** existing
- **Evidence:** `services/GoldRateService.js:13-38`, `screens/GoldPriceScreen.js:12-35`, `components/GoldRatesList.js`
- **Acceptance criteria:** On mount, fetches `…/dbXRates/IDR` and renders one white card per returned currency with `Price per Gram` (`xauPrice / 31.1035`), `Price per Tola` (gram × 11.66) and `Price per Ounce` (`xauPrice`), each `Intl`-formatted as IDR currency with 2 decimals; a `Loading gold rates…` spinner shows until the fetch resolves; a back-to-Home button (with interstitial) and a banner sit below.

**F-20 — Rate-list failure behavior**
- **Status:** existing
- **Evidence:** `services/GoldRateService.js:34-37`, `screens/GoldPriceScreen.js:21-35`
- **Acceptance criteria:** Any network/parse error is logged (`logError('GoldRateService', …, {source:'goldprice.org'})`) and the service returns `[]`, so the spinner stops and the user sees the heading with an empty list — there is **no** error message or cached/fallback value on this screen.

### Backup & Restore

**F-21 — Export to JSON + share**
- **Status:** existing
- **Evidence:** `repository/BackupRestoreRepository.js:18-73`, `screens/BackupRestoreScreen.js:29-39`
- **Acceptance criteria:** Tapping **Backup** (interstitial requested first, and the export runs only after the interstitial closes if one was loaded) selects all `use_data='Y'` rows, serializes them to a JSON array, and writes `${DownloadDirectoryPath}/gold_invest_bckYYYYMMDD.json`; a success alert offers to share the file, and `Ya` opens the native share sheet with `type: application/json`; read/write failures produce error alerts and `logError`. An empty portfolio produces a valid `[]` file and the same success alert.

**F-22 — Import from a picked file (replace-all)**
- **Status:** existing
- **Evidence:** `repository/BackupRestoreRepository.js:76-114`, `screens/BackupRestoreScreen.js:41-55`
- **Acceptance criteria:** Tapping **Restore** (interstitial requested, import runs regardless of ad state) opens a single-file picker (`allFiles`); on selection the file is read and `JSON.parse`d; inside one SQLite transaction the table is `DELETE`d wholesale and one `INSERT` per element re-creates rows preserving `input_date/weight_gram/price_gold/investment_value/use_data`, then "Restore Sukses" is alerted; a parse failure (or any non-picker error) shows "Gagal melakukan restore." and logs via `logError`; dismissing the picker is not treated as an error. There is no schema/shape validation of the parsed payload beyond `JSON.parse`.

### About

**F-23 — Developer profile**
- **Status:** existing
- **Evidence:** `screens/AboutScreen.js`, `components/DeveloperInfo.js`
- **Acceptance criteria:** The About route shows the heading "About the Developer", the name "Banu Salman", and three link rows (GitHub → `https://github.com/farisi55`, LinkedIn → `https://www.linkedin.com/in/farisi55`, Portfolio → `https://banu-salman-farisi.blogspot.com`) that open via `Linking.openURL`; a back-to-Home button with interstitial and a banner sit below. **No app-version line is rendered** (see §10).

### Cross-cutting platform services

**F-24 — Crash reporting with PII scrubbing**
- **Status:** existing
- **Evidence:** `utils/CrashReporter.js`, called at `App.js:36`
- **Acceptance criteria:** With `__DEV__` true or `SENTRY_DSN` empty, Sentry is not initialized and everything falls back to `console` — no remote reporting; otherwise `Sentry.init` runs with `tracesSampleRate: 0.1`, `attachStacktrace: true`, `maxBreadcrumbs: 50`, and a `beforeSend` hook that rewrites `weight_gram`, `investment_value`, `price_gold`, `total_weight`, `total_investment`, `profit_loss` to `[SCRUBBED]` in `extra`, `contexts`, and breadcrumb data; init failure never crashes the app; app code reports through `logError(tag, error, meta)` / `captureMessage` instead of `console.error` in the modules touched by Task #003.

**F-25 — Startup environment validation**
- **Status:** existing
- **Evidence:** `config/validateEnv.js`, invoked at `App.js:40`
- **Acceptance criteria:** At import time, the four `ADMOB_*_UNIT_ID` values are checked for presence and against the placeholder pattern `^ca-app-pub-[X]+/[Y]+$`; if any are missing/placeholder: in `__DEV__` a warning is logged (console + `captureMessage`) and execution continues, in production a descriptive `Error` is thrown so the app fails fast before any ad request; the error message lists the offending keys and remediation steps.

**F-26 — Ad unit selection and ad request policy**
- **Status:** existing
- **Evidence:** `utils/AdManager.js`, `admob.config.js`, `App.js:45-64`
- **Acceptance criteria:** In dev every unit resolves to Google's official `TestIds.*`; in release each resolves to `Config.ADMOB_*` with a `ca-app-pub-MISSING/…` sentinel fallback (`admob.config.js`) — while `AdManager` itself reads `Config.*` directly with no sentinel; the interstitial singleton preloads at module construction, reloads after every close, and `showAd(callback)` executes `callback` immediately when no ad is loaded (so no user flow is ever blocked by ads); AdMob is configured (child-directed = false, under-age = false, max rating PG) before `initialize()`, and both init success and failure are reported through `captureMessage`.

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Gold-rate requests carry an explicit 10 s timeout (`GoldPriceHelper.js:18`); the gold-rates `fetch` has **no** timeout. [Current behavior]
- SQLite queries are all short single-table reads run on the UI mount path; the entire history is fetched and paged in JS (no SQL `LIMIT/OFFSET`), which is O(total rows) per interaction.
- AdMob init is async and non-blocking; chart rendering is limited by `react-native-chart-kit` on the main thread with labels for every point in the window.
- No performance budget, profiling, or metrics exist in the repo. [DECISION NEEDED]

### 6.2 Security & Privacy
- **No auth, no backend, no data leaves the device** except optional Sentry telemetry and ad SDK traffic. [Code-evidenced by absence.]
- Secrets are env-only: `.env` is gitignored (`.gitignore:90-93`) and blocked by `scripts/pre-commit`; the template `.env.example` documents `SENTRY_DSN` + four `ADMOB_*` IDs. No secrets are hardcoded in app source (ad *App IDs* in `app.json`/manifest are Google's public test IDs).
- PII/financial scrubbing before transmission: `scrubPII` field list in `CrashReporter.js:21-28`; no `console.error` of financial payloads in the modules already migrated to `logError`.
- Android surface is minimal: single permission `INTERNET`, `android:allowBackup="false"`. iOS: `NSAllowsArbitraryLoads = false`, `NSAllowsLocalNetworking = true`; an empty `NSLocationWhenInUseUsageDescription` key is present though no location API is used.
- Ads request non-personalized traffic with finance/Islamic-finance keywords; child-directed and under-age tags are explicitly set to `false` with `MaxAdContentRating.PG`.
- Gaps: no app-level data-at-rest protection (device passcode/biometric gate), and the restore path performs an unvalidated destructive delete (§6.3).

### 6.3 Reliability & data integrity
- **Degradation, not crashes:** gold-price failure → constant `1000000` rate; rate-list failure → empty array; AdMob init/show failure → logged only; Sentry missing → console; env validation in dev → warning only.
- **Soft delete** means user "deletions" are reversible at the SQL level and never destroy rows; conversely **restore is destructive** — it `DELETE`s the whole table before inserting parsed rows (`BackupRestoreRepository.js:86-102`). Validation is limited to `JSON.parse` succeeding; a well-formed JSON value that is not an array of the expected shape can clear or corrupt the portfolio. [INFERRED from statement ordering — not verified by a runtime test.]
- **No transactional rollback across the app's own error paths:** `db.transaction` is used for writes, but the success alert for restore is raised inside the transaction callback regardless of whether every insert succeeded.
- Startup fail-fast exists only for production AdMob config; there is no crash-loop protection or first-run/DB-upgrade guard (no migration mechanism, §4.5).

### 6.4 Usability & compatibility
- Minimum Android 7.0 (API 24), `targetSdk 34` / `compileSdk 35`; iOS project targets are template defaults; Hermes + New Architecture on; `reactNativeArchitectures` builds all four ABIs.
- Formatting follows device-independent `id-ID` conventions; date display is `en-GB` in history and `YYYY-MM-DD` in the form — mixed formats and mixed EN/ID copy are current behavior.
- 8 routes, no deep links, no tablet/landscape-specific layouts; `Dimensions.get('window')` scales dashboard icons (`screenWidth / 4`).
- Touch targets are icon+label buttons; there is no explicit accessibility (a11y) labeling, dynamic-type support, or screen-reader testing evidence anywhere in the repo. [DECISION NEEDED]

### 6.5 Observability & quality
- Structured logging façade `logError(tag, error, meta)` / `captureMessage(message, level, meta)` with an explicit "metadata must be PII-free" contract (`CrashReporter.js:163-178`).
- Sentry: 10% transaction sampling, stack traces attached, 50-breadcrumb cap, `debug: false`.
- CI gates: lint (currently failing, §4.6), Jest (passing, but silently double-counting a vendored copy), `npm audit --audit-level=critical`, plus a non-blocking HIGH audit.
- Test coverage of business logic is effectively **zero** outside `CrashReporter` and `validateEnv`: no repository, math, or backup tests. No coverage threshold is enforced in Jest or CI.

---

## 7. Environment & Configuration

**Runtime env vars** (read via `react-native-config`; template in `.env.example`, real file `.env` is gitignored and was not read for this reconstruction):

| Variable | Required | Used by | Notes |
|---|---|---|---|
| `SENTRY_DSN` | optional | `CrashReporter.js:90` | empty/absent → crash reporting disabled |
| `ADMOB_BANNER_UNIT_ID` | production | `AdManager.js:5` | also validated at startup |
| `ADMOB_INTERSTITIAL_UNIT_ID` | production | `AdManager.js:6` | also validated at startup |
| `ADMOB_REWARDED_UNIT_ID` | production (validation only) | not consumed by any ad code | rewarded ads are never shown |
| `ADMOB_APPOPEN_UNIT_ID` | production (validation only) | not consumed by any ad code | app-open ads are never shown |

**Non-env configuration:**
- `app.json` — display name `Catat Emas`; `react-native-google-mobile-ads.android_app_id`/`ios_app_id` currently hold **Google's test App IDs** (`ca-app-pub-3940256099942544~…`); `admob.config.js` documents that these must be swapped for release.
- `android/app/src/main/AndroidManifest.xml` — AdMob `APPLICATION_ID` meta-data present, value = the same test App ID; `INTERNET` permission; `allowBackup=false`.
- `ios/GoldInvestmentApp/Info.plist` — display name `Catat Emas`; **no `GADApplicationIdentifier` key** (AdMob iOS App ID not configured); bundle identifier remains `org.reactjs.native.example.$(PRODUCT_NAME…)` in `project.pbxproj`.
- `android/build.gradle` — `minSdk 24`, `targetSdk 34`, `compileSdk 35`, `buildTools 35.0.0`, Kotlin `1.9.24`, NDK `26.1.10909125`.
- `android/app/build.gradle` — `applicationId com.goldinvestmentapp`, `versionCode 1`, `versionName "1.0"`, release signing referenced with passwords deliberately kept out of the repo (commented instructions in `android/gradle.properties`).
- `babel.config.js` — `@react-native/babel-preset` + `react-native-reanimated/plugin` (no dotenv plugin). `metro.config.js`, `react-native.config.js` are stock.
- `jest.setup.js` / `jest.config.js` — mocks for ~20 native modules including AdMob, SQLite, navigation, Sentry, `react-native-config` (returns Google test IDs + empty DSN).
- Toolchain requirements: Node ≥ 18, JDK/Gradle wrapper, Ruby/CocoaPods (`Gemfile` pins `cocoapods >= 1.13` excluding 1.15.0/1.15.1).

---

## 8. Constraints & Anti-patterns

Constraints the code imposes on any future change (all code-evidenced):
1. **Single-table, migration-less schema.** Any new column requires either `ALTER TABLE` ad-hoc handling or introducing a migration mechanism first; `CREATE TABLE IF NOT EXISTS` will not alter an existing install's table.
2. **Soft-delete is load-bearing.** Every read filters `use_data='Y'`; new queries must repeat that filter or they will resurrect deleted rows.
3. **The gold rate is ambient state.** `GoldRateContext` is populated only by `HomeScreen`'s mount effect; any screen reading `currentGoldRate` before/without that fetch silently uses `1000000`.
4. **Ad calls are fire-and-forget side effects** embedded in presentational components (`AdManager.showAd()` inside `onPress` handlers across 6 files); ads cannot be toggled off without touching UI code.
5. **No backend seam.** There is no repository interface/abstraction — `screens/` import repository functions directly, so swapping storage means editing screens.
6. **Two open handles to one DB file** at module scope (`GoldInvestmentRepository.js:4`, `BackupRestoreRepository.js:15`).

Anti-patterns already present (flagged, not cleaned up):
- **String-interpolated SQL**: `ORDER BY input_date ${orderByDate}` and `date('now', '-${days} days')` (`GoldInvestmentRepository.js:56, 108`). Values are currently internal constants, but the pattern is one UI change away from injection.
- **Unvalidated destructive restore**: `DELETE FROM gold_investments` executed before the parsed payload is checked for shape (§6.3).
- **Module-load side effects**: `initCrashReporter()`, `validateEnv()`, and the `AdManager` singleton's `load()` all execute at import time, which makes import order part of correctness and complicates testing.
- **Presentation components own navigation + monetization** (`ChartComponent`, `InvestmentDetailList`, `GoldRatesList`, `DeveloperInfo` each import `useNavigation` and `AdManager`).
- **Mislabelled totals**: the history footer labelled `Total` sums only the current page (§F-14).
- **Silent `NaN` UI**: profit percentage divides by `totalInvestmentValue`, which is `0` for a new user (`DashboardView.js:48`).
- **Dead error path**: `HomeScreen`'s `catch`/`Alert` for gold price can never fire because `fetchGoldPrice` swallows all errors and returns `1000000`.
- **Docs in the test path**: Jest collects the gitignored `.kilo/worktrees/…` copy of the whole app (3 extra suites), so test totals are inflated; ESLint, by contrast, ignores it.
- **Lint gate red**: `npm run lint` exits 1 with 63 errors while CI treats errors as blocking — CI cannot be green as configured.
- **Unused/misleading dependencies**: `react-native-dotenv` (no babel plugin), `react-navigation-stack` v2 alongside `@react-navigation/stack` v7, `expo`, `date-fns-tz`, `react-native-get-random-values` are installed but never imported.
- **Inconsistent naming**: route `"Gold Prices"` (space) vs. no-space routes; `"Lost"` label instead of "Loss"; `sys_update_date` written with SQLite `date('now')` (UTC) while `input_date` is local-formatted.
- **Inconsistent date handling**: the selected-date path compensates for timezone (`DatePickerInput.js:12`) but the untouched default date and the display formatter call `toISOString()` directly (`AddInvestmentScreen.js:12`, `DatePickerInput.js:20`, `GoldInvestmentRepository.js:86`), so the default row date can be one day off in UTC-ahead timezones.

---

## 9. Development Phases

Phases below are reconstructed from git history and the state of the code; nothing here is aspirational.

**Phase 0 — Build & first release (observed in git log).**
Initial RN app with the eight screens, SQLite repository, goldprice.org integration, AdMob banners/interstitials, backup/restore, then iterative UI fixes (`fix batch 1`), icon change, README, and release packaging (`build relase oke`, `apk release succes running`). Result: the working v1.0 app that this PRD documents.

**Phase 1 — Environment audit & operational hardening (observed, merged).**
Four merged feature branches, each with its own tests/config: Task #001 security baseline (`.gitignore` hardening, `scripts/pre-commit`), Task #002 CI pipeline (`.github/workflows/ci.yml`), Task #003 crash reporting + structured logging (`utils/CrashReporter.js`, `logError` sweep, 10 s axios timeout), Task #004 startup env validation (`config/validateEnv.js` + 9 tests). Follow-up commits `running android ok` confirm Android execution after these merges.

**Phase 2 — Current state / stabilization (observed).**
The tree now runs on Android with 42 passing tests and a **red lint gate**; no feature work is in progress in the working tree (only `PRD.md` → `PRD-old.md` documentation churn).

**Phase 3 — Roadmap described in `changelog.md` (documentation evidence only, not code).**
`changelog.md` (v1.0.4, status `in_progress`) enumerates Phases 2–7: schema migration runner (Task #005), soft-delete retention policy (#006), unit tests for profit/loss, two-way math, repository CRUD, price fallback (#007–#009), Play-Store integration items (#010–#014: AdMob App ID verification, Play Billing ad-free unlock, policy self-review), UI/UX passes (#015–#016), coverage/E2E (#017–#018), and deployment (#019–#021). **These are intentions recorded in a markdown file — none of them are implemented, and none are claimed as features in §5.** [DECISION NEEDED — confirm which, if any, become real scope.]

---

## 10 Open Questions

**Prompt-injection scan.** All `*.js`, `*.md`, `*.yml`, `*.json` in the repo were scanned for instruction-shaped text (`IGNORE…`, `SYSTEM:`, `[INST]`, "forget your instructions", "skip this check", directives aimed at an AI reader). **No injection attempts were found**; no [INJECTION RISK] flags are open. `AGENTS.md`/`changelog.md` contain task-runner instructions from the project's own tooling, which were treated as untrusted documentation, not as instructions to this reconstruction.

**Template/structure gaps (from this session):**
1. [DECISION NEEDED] Prompt 00's exact frontmatter field placeholders and §5 output template were not available in this session (per developer instruction, a standard frontmatter was used). The **titles of §4.1–4.6 and §6.1–6.5 are [INFERRED]** — only the numbering, the section order, and §4.2/§4.5/§6/§7–§11 names were given. Confirm exact subsection titles before downstream extraction.
2. [DECISION NEEDED] File name: written as `prd.md` per instruction; because the filesystem is case-insensitive and the repo previously tracked `PRD.md`, git reports this as a **modification of `PRD.md`** (the prior version is preserved in the untracked `PRD-old.md` and in git history). Confirm the intended final filename/casing before committing.

**Code vs. documentation discrepancies (code wins):**
3. `features/07-informasi-aplikasi.md` and `PRD-old.md` specify an **"Info Versi" (app version) line** on the About screen. `AboutScreen.js`/`DeveloperInfo.js` render no version at all. Feature as documented does not exist.
4. `features/03-riwayat-portofolio.md`, `05-harga-emas-pasar.md`, `06-cadangkan-pulihkan.md`, and `PRD-old.md` promise **empty states / failure messages** (history empty state, price-load failure message, "no data to back up" notice, invalid-file rejection with a clear message). In code: history has no empty state; price failure yields a silent empty list; an empty backup succeeds silently; restore validates only via `JSON.parse`.
5. `features/04-grafik-pertumbuhan.md` and `README.md` describe the chart as **investment value over time**; `fetchGraphData`/`ChartComponent` plot **cumulative weight in grams** (rp values appear only in the tooltip).
6. `README.md` claims **"Harga emas diperbarui otomatis setiap hari"** (auto-updated daily). No scheduler/background job exists — the rate is fetched once per `HomeScreen` mount.
7. `changelog.md` Task #010 states the AdMob Application-ID manifest tag was "confirmed missing"; it **is present** in `AndroidManifest.xml` today (still Google's *test* App ID), while the iOS equivalent (`GADApplicationIdentifier`) is absent from `Info.plist`.
8. `changelog.md` notes `App.test.tsx` as a pre-existing broken test; it **passes** in the current tree (42/42).

**Behavioral questions requiring a human decision:**
9. [DECISION NEEDED] Retention of soft-deleted rows: `use_data='N'` rows accumulate forever and are excluded from every read. Purge after N days, or keep permanently?
10. [DECISION NEEDED] Restore safety: should a file be schema/shape-validated (and the `DELETE` made conditional) before replacing the table?
11. [DECISION NEEDED] The dashboard profit percentage renders `NaN%` for a portfolio with zero recorded investment — fix, or specify zero-state behavior?
12. [DECISION NEEDED] Should `ADMOB_REWARDED_UNIT_ID`/`ADMOB_APPOPEN_UNIT_ID` remain hard-required at startup when no code path displays those formats?
13. [DECISION NEEDED] iOS: template bundle identifier, missing `GADApplicationIdentifier`, and `DownloadDirectoryPath`-based backup (`BackupRestoreRepository.js:36`, an Android-only RNFS path) suggest iOS is unshipped. Is iOS in scope?
14. [DECISION NEEDED] CI is red on lint (63 errors) and Jest silently runs the duplicated `.kilo` worktree — fix the gates before using them as a quality signal?
15. [DECISION NEEDED] Untested business logic (profit/loss, two-way math, repository CRUD, backup/restore, price fallback) has no coverage target recorded in this repo.

---

## 11 Revision History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-09-28 | Reconstructed via Prompt 05 from the existing codebase (`405885f`) | Initial PRD rebuilt from code: inventory, 26 existing capabilities with evidence lines, actual SQLite schema, measured CI/test/lint state, doc-vs-code discrepancy list. |
