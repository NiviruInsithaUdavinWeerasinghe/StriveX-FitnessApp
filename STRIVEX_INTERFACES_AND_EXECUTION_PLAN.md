# StriveX - Master Interfaces Specification and Execution Plan

This document outlines the complete architectural breakdown, user flows, and feature-by-feature execution plan for the StriveX responsive web application built with React 19, Vite, and the Kinetic Glass Design System. Every single interface, button, state, modal, and drawer is specified with explicit logic and purpose to ensure a zero-dead-button, production-ready system.

---

## 1. System Architecture and Design System Standards

### Core Framework and Styling
* Framework: React 19 (Component-based Single Page Application) powered by Vite.
* Styling: Kinetic Glass Design System using Vanilla CSS (CSS custom properties, 40px glass blurs, light and dark themes).
* Iconography: Lucide React.
* Typography: Plus Jakarta Sans / Inter.
* Dual Viewport Standardization: Optimized for 1440px Desktop and 390px Mobile viewports.

### Visual Identity (Kinetic Glass Design System)
* Canvas: High-depth dark surface `#131313` with subtle border radiance `rgba(212, 255, 0, 0.15)`.
* Brand Accent: Electric Lime `#d4ff00` for primary actions, active indicators, and progress rings.
* Surface Blurs: `backdrop-filter: blur(40px)` on sticky glass navigations, modals, drawers, and popovers.
* Dual Theme Support: Full Dark Mode and high-contrast Light Mode (strict rule: no grey backgrounds for cards, overlays, or light canvas; dark charcoal `#1a1a1a` typography for light mode).
* Dual Viewport Standardization: Seamless responsive layouts optimized for 1440px Desktop and 390px Mobile.

### Core System Controllers (No Dead UI Guarantee)
* Unified Toast Engine: Custom non-blocking notifications with automatic stacking and queue combination (no default browser alert/confirm dialogues).
* Real-Time Form Validation Engine: Immediate inline warnings for Sri Lankan phone numbers (`07XXXXXXXX` or `+94XXXXXXXXX`), international formats, text-only names (no numbers allowed), and standard RFC email formatting.
* Custom Dropdown Engine: Accessible custom dropdown components with keyboard navigation (no default HTML `<select>` elements).
* Global Command Palette: `Cmd+K` / `Ctrl+K` quick search indexing members, trainers, workouts, and transactions.
* Role and Viewport Switcher Bar: Floating developer tool allowing 1-click switching between Guest, Member, Trainer, and Admin roles, plus 1440px Desktop / 390px Mobile preview frames.

---

## 2. Master Interfaces Breakdown

### Module 1: Public and Onboarding (The Gateway)

#### Interface 1.1: Public Landing Page
* Header Navigation:
  * Brand Logo (StriveX with electric pulse glyph).
  * Navigation Links: Features, Schedule, Trainers, Pricing, About.
  * Role Demo Switcher: Quick dropdown to preview Member, Trainer, or Admin dashboards.
  * Theme Toggle: Dark and Light mode switcher with smooth transition.
  * Action Buttons: "Login" (opens Login Modal) and "Join StriveX" (opens Registration Modal).
  * Mobile Hamburger Menu: Fullscreen kinetic glass drawer with all links and actions.
* Hero Section:
  * Headline and Subheadline: "Engineered for Human Performance - Elevate Every Rep".
  * Live Metrics Badge: "1,240+ Active Athletes This Week".
  * Primary Action: "Start Free Trial" (triggers Step 1 Registration).
  * Secondary Action: "Explore Platform Demo" (opens interactive video/feature walkthrough modal).
* Feature Matrix Grid:
  * AI Workout Intelligence Card: Real-time rep tracking and auto-progressive overload details.
  * Elite Trainer Ecosystem Card: 1-on-1 coach access, routine customization, and direct messaging.
  * Real-Time Biometrics Card: Dynamic calorie, heart rate, and streak tracking.
* Live Class Schedule Section:
  * Day Switcher: Monday through Sunday selector tabs.
  * Category Filter: All, HIIT, Strength, Hypertrophy, Yoga, Mobility.
  * Class Cards: Time, class title, trainer photo, difficulty tag, spots remaining counter.
  * "Reserve Spot" Action: Opens reservation confirmation modal with live seat decrement.
* Tiered Membership Pricing Matrix:
  * Billing Toggle: Monthly vs Annual (with "Save 20%" badge).
  * Tier 1 (Basic / Starter): Price, feature checklist, "Select Starter" CTA.
  * Tier 2 (Pro / Recommended): Highlighted lime border, feature checklist, "Get Pro" CTA.
  * Tier 3 (Elite / Unlimited): VIP perks checklist, "Join Elite" CTA.
  * Selection Flow: Clicking any plan opens Registration pre-selected to that tier.
* Testimonials and Social Proof:
  * Athlete cards with verified member badge, star ratings, and before/after stats.
* Footer Section:
  * Brand manifesto, quick navigation links, technology build stack, and developer credits.

#### Interface 1.2: Multi-Step Member Registration Flow (Modal / View)
* Step 1: Personal and Contact Details:
  * Full Name field (real-time error if numbers or symbols entered).
  * Email Address field (real-time RFC format validation).
  * Phone Number field (real-time Sri Lankan `07X` / `+94` and international regex check).
  * Password field with visual strength meter (Length, Upper, Number, Symbol).
  * Next Step CTA: Validates all fields and advances to Step 2.
* Step 2: Athlete Profile and Goals:
  * Primary Fitness Goal: Fat Loss, Muscle Hypertrophy, Athletic Performance, Mobility.
  * Experience Level: Beginner, Intermediate, Advanced.
  * Weekly Training Target: 3, 4, 5, or 6 days/week.
  * Navigation: "Back" and "Continue to Checkout".
* Step 3: Membership Selection and Payment:
  * Selected Plan summary card with price breakdown.
  * Mock Cardholder Name, Card Number (Luhn validation), Expiry Date (MM/YY), and CVC.
  * Promo Code input with instant discount calculation.
  * Navigation: "Back" and "Complete Registration".
* Step 4: Success State and Onboarding:
  * Celebratory animation, welcome toast notification, and instant redirect to Member Dashboard.

#### Interface 1.3: Authentication and Login (Modal)
* Email and Password fields with live error highlighting.
* "Remember this device" checkbox.
* "Forgot Password" trigger (opens recovery drawer with code verification).
* 1-Click Demo Profiles: "Login as Member", "Login as Trainer", "Login as Admin".
* "Create New Account" link switching to Registration Modal.

---

### Module 2: Member Experience (The Athlete Hub)

#### Interface 2.1: Member Dashboard
* Top Navigation Bar:
  * Member avatar with status badge.
  * Notification Bell with unread counter and interactive notifications drawer.
  * Quick Streak Indicator (e.g., 5-day active streak flame).
* Biometric KPI Cards:
  * Active Calories Burned (e.g., 680 / 800 kcal) with daily progress bar.
  * Target Heart Rate (e.g., 142 bpm average).
  * Active Training Time (e.g., 54 mins logged today).
  * Weekly Consistency Score (e.g., 94%).
* Circular Goal Rings:
  * Interactive SVG triple rings: Movement, Exercise, and Stand goals.
* Today's Routine Card:
  * Routine Title (e.g., "Hypertrophy Push Day A").
  * Trainer Attribution (e.g., "Assigned by Coach Marcus").
  * Estimated duration (50 mins) and exercise count (6 exercises).
  * Primary Action: "Start Workout Session" (launches Workout Logger).
* Weekly Activity Calendar:
  * Interactive calendar grid highlighting completed workout days.
* Quick Hydration and Calorie Logger Widget:
  * Instant increment/decrement buttons (`+250ml`, `+100 kcal`) with live persistence.

#### Interface 2.2: Active Workout Session (Interactive Logger)
* Header: Live workout duration timer (with Pause/Resume and End buttons).
* Exercise Roster:
  * Exercise Cards (e.g., Barbell Bench Press, Incline Dumbbell Fly, Cable Lateral Raise).
  * Video demonstration thumbnail / visual guide.
  * Target Sets, Reps, and Rest Interval indicator.
* Interactive Set Logger:
  * Set rows with Weight (kg/lbs) input, Reps input, and Completion Checkbox.
  * Checking a set completes it, plays a subtle feedback animation, and auto-starts the Rest Timer.
* Rest Interval Timer:
  * Floating timer counting down rest period (with "+30s" and "Skip Rest" buttons).
* Session Completion:
  * "Finish Workout" CTA: Opens summary modal with total volume lifted, calories burned, celebration toast, and auto-updates the Member Dashboard rings.

#### Interface 2.3: Member Settings and Profile
* Personal Information Tab:
  * Profile avatar image selector, Full Name, Bio, Emergency Contact, and Fitness Level.
  * "Save Changes" with instant validation and toast feedback.
* Subscription and Billing Tab:
  * Current Plan: Pro Athlete Tier ($49/mo), Next Billing Date.
  * Actions: "Change Plan" (opens tier upgrade modal) and "Download Invoices" (triggers PDF receipt preview).
* Security and Preferences Tab:
  * Password change form, SMS reminder toggle, Email notification preferences, 2FA toggle.

#### Interface 2.4: Member-Trainer Direct Chat
* Chat Header: Assigned Trainer profile (Coach Marcus), Online status badge, "Call Trainer" placeholder action.
* Message Thread: Chronological message bubbles with timestamps and read receipts.
* Chat Input: Text field, quick attachment button, emoji picker, and Send CTA.
* Simulated Trainer Auto-Response: Intelligent instant response when sending messages.

---

### Module 3: Trainer Portal (The Professional Suite)

#### Interface 3.1: Trainer Dashboard
* Overview KPI Metrics:
  * Total Assigned Clients (e.g., 28 athletes).
  * Active Clients Today (e.g., 19 active).
  * At-Risk Clients (e.g., 3 inactive > 5 days).
  * Scheduled 1-on-1 Sessions (e.g., 4 sessions today).
* Client Management Roster:
  * Filter Tabs: All, Active, Needs Attention, Inactive.
  * Client Table / Grid: Avatar, Name, Current Goal, Compliance %, Last Active, Action buttons ("View Profile", "Assign Plan", "Message").
* Upcoming Schedule Feed:
  * Timeline of today's personal training bookings with client details and "Start Meeting" action.
* Quick Action Bar:
  * "Build New Routine", "Broadcast Announcement", "Register Client".

#### Interface 3.2: Client Detail Modal / Drawer
* Athlete Header: Profile photo, contact email, phone number, joined date, compliance grade.
* Biometrics Progress: Weight tracking chart, strength progression milestones.
* Assigned Routines List: Active and archived routines with status chips and edit buttons.
* Direct Action Shortcuts: "Assign Custom Workout", "Send Message", "Log Assessment Note".

#### Interface 3.3: Interactive Workout Routine Builder
* Exercise Library Panel:
  * Search input with live filtering.
  * Muscle Group Filters: Chest, Back, Legs, Shoulders, Arms, Core, Cardio.
  * Exercise list with thumbnail, target muscle, and "+ Add to Routine" button.
* Routine Composition Workspace:
  * Routine Name, Target Goal, Difficulty Level, and Notes fields.
  * Added Exercise Cards: Draggable ordering, custom sets counter, target reps, target weight, rest timer configuration, and delete action.
* Assignment Footer:
  * Custom Dropdown: "Select Client" (single client or all clients).
  * "Publish and Send Routine" CTA: Validates routine structure and notifies client.

#### Interface 3.4: Trainer Messaging Center
* Client List Sidebar: Search bar, client list sorted by latest interaction, unread badges.
* Active Conversation Window: Full chat history with client.
* Client Quick Stats Drawer: Collapsible side panel showing the client's current plan and compliance while messaging.

---

### Module 4: Admin Operations (The Command Center)

#### Interface 4.1: Admin Operations Dashboard
* Executive KPI Cards:
  * Monthly Recurring Revenue (MRR: $48,250 with +14.2% monthly trend).
  * Total Active Members (1,240 members).
  * Staff Capacity / Load (88% trainer utilization).
  * Churn Rate (1.8% low churn).
* Live System Activity Audit Trail:
  * Chronological log of system actions (New registrations, plan upgrades, trainer assignments, card charges).
  * Status chips (Success, Pending, Flagged).
* Global Quick Actions:
  * "Add Staff Member", "Generate Financial Audit", "Broadcast System Notice".

#### Interface 4.2: Financials and Revenue Reporting
* Interactive Revenue Breakdown Chart:
  * Monthly revenue trajectory comparing Basic, Pro, and Elite tiers.
* Transaction Ledger Table:
  * Columns: Date/Time, Transaction ID, Member Name, Subscription Tier, Amount ($), Payment Method, Status (Completed, Refunded).
  * Ledger Filters: Date range selector, Status filter, Tier filter.
  * Search Bar: Search by Transaction ID or Member Name.
  * Pagination: Page numbers, Next/Previous buttons, rows per page selector.
  * "Export CSV / Report" action button.

#### Interface 4.3: Staff Management Drawer / Interface
* Staff Directory Table:
  * Staff Name, Avatar, Role (Lead Coach, Fitness Instructor, Operations Admin), Assigned Clients count, Status (Active, On Leave).
* Permissions and Access Control:
  * Interactive toggles: Can Edit Plans, Can View Financials, Can Manage Members, Can Issue Refunds.
* "Add New Staff Member" Modal:
  * Full Name, Email, Phone, Assigned Role, Access Level with real-time validation.

#### Interface 4.4: Global Search Overlay (`Cmd+K`)
* Keyboard Shortcut (`Cmd+K` / `Ctrl+K`) and Top Search Bar trigger.
* Live search indexing: Members, Trainers, Workout Routines, and Financial Transactions.
* Categorized results with keyboard arrow navigation and instant view redirection.

---

## 3. Step-by-Step Execution Milestones

* **Step 1: Core Foundation and Kinetic Glass Design System**
  * Setup React 19 + Vite architecture, CSS design system variables, glassmorphism tokens, and responsive resets.
  * Build Unified Toast Notification Engine (stacked, non-blocking, combined alerts).
  * Build Custom Dropdown Engine (zero native browser dropdowns) and real-time form validation engine (Sri Lankan numbers `07X` / `+94`, international phone regex, text-only names, RFC email formatting).
  * Build Developer Toolbar (Role Switcher: Guest, Member, Trainer, Admin; Viewport Frame Switcher: Full Responsive, 1440px Desktop, 390px Mobile).
  * Build Theme Switcher (Dark Mode `#131313` with `#d4ff00` accents; Light Mode high contrast without grey backgrounds).

* **Step 2: Public Gateway and Onboarding**
  * Build Sticky Kinetic Glass Navigation and Mobile Drawer.
  * Build Hero Section with dynamic counters and CTA triggers.
  * Build Feature Matrix and Interactive Class Schedule with reservation flow.
  * Build Pricing Tier Matrix with billing toggle and direct checkout hooks.
  * Build Multi-Step Registration Modal with real-time validation.
  * Build Role-Aware Login Modal with 1-click demo profiles.
  * Build Footer with complete navigation and credentials.

* **Step 3: Member Experience (Athlete Hub)**
  * Build Member Dashboard with KPI cards and animated SVG goal rings.
  * Build Today's Routine card and Hydration/Calorie quick loggers.
  * Build Active Workout Session Modal with live set/rep logger and rest timer.
  * Build Member Settings and Profile management view.
  * Build Member-Trainer Chat view with instant responses.

* **Step 4: Trainer Portal**
  * Build Trainer Dashboard with client status overview and session schedule.
  * Build Client Detail Modal with progression metrics and quick actions.
  * Build Interactive Workout Routine Builder with exercise search and client assignment.
  * Build Trainer Messaging Center with client list and active chat.

* **Step 5: Admin Operations Command Center**
  * Build Admin Operations Dashboard with executive KPIs and audit trail.
  * Build Financials and Revenue Reporting with transaction ledger and pagination.
  * Build Staff Management view with permission toggles and add staff modal.
  * Build Global Command Palette (`Cmd+K`) with real-time search.

* **Step 6: End-to-End Verification and Polish**
  * Zero-dead-button audit across all roles.
  * Dual-viewport verification at 1440px Desktop and 390px Mobile.
  * Dark/Light mode contrast and accessibility review.
  * Step-by-step Git commits adhering to the 2-line protocol.
