# Platform Design Skills

A collection of agent skills for building and evaluating apps across every major platform. Each skill encodes the official design guidelines — from Apple's Human Interface Guidelines to Google's Material Design to web standards — into actionable rules AI agents can apply during code generation, review, and refactoring.

Built by scraping the [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines) (a compiled [PDF version](Apple_HIG.pdf) is included in this repo) and distilling it — along with Material Design 3 and WCAG 2.2 — into succinct but exhaustive skill files. Use them to evaluate, improve, or create your designs.

## Available Skills

### ios

Apple Human Interface Guidelines for iPhone. 50+ rules covering navigation, layout, accessibility, gestures, and iOS-specific components like tab bars, sheets, and Dynamic Island.

**Use when:**
- Building SwiftUI or UIKit interfaces for iPhone
- Reviewing iOS app code for HIG compliance
- Choosing between iOS navigation patterns
- Implementing accessibility, Dark Mode, Dynamic Type

### ipados

Apple HIG for iPad, covering multitasking, pointer support, sidebar navigation, keyboard shortcuts, and Stage Manager. Extends the iOS skill with iPad-specific patterns.

**Use when:**
- Building iPad-optimized interfaces
- Implementing Split View, Slide Over, Stage Manager support
- Adding pointer/trackpad and keyboard shortcut support
- Designing responsive layouts for iPad screen sizes

### macos

Apple HIG for Mac apps. Covers menu bars, window management, toolbars, keyboard-driven interaction, and the expectations of desktop power users.

**Use when:**
- Building macOS apps with SwiftUI or AppKit
- Implementing menu bars, toolbars, and sidebars
- Adding keyboard shortcuts and window management
- Designing for Catalyst or native macOS

### watchos

Apple HIG for Apple Watch. Covers glanceable interfaces, Digital Crown, complications, Always On display, and wrist-optimized interactions.

**Use when:**
- Building watchOS apps or complications
- Designing for small screens and short interactions
- Implementing health/fitness features on Watch

### visionos

Apple HIG for Apple Vision Pro. Covers spatial UI, eye and hand input, windows, volumes, immersive spaces, and ornaments.

**Use when:**
- Building visionOS apps with RealityKit or SwiftUI
- Designing for spatial computing and indirect gestures
- Implementing immersive experiences

### tvos

Apple HIG for Apple TV. Covers focus-based navigation, Siri Remote, Top Shelf, and living room viewing distances.

**Use when:**
- Building tvOS apps
- Implementing focus-based navigation with Siri Remote
- Designing for 10-foot viewing experiences

### android

Google Material Design 3 guidelines for Android. Covers Material You, dynamic color, navigation patterns, components, and Android-specific patterns.

**Use when:**
- Building Android apps with Jetpack Compose or XML layouts
- Reviewing Android code for Material Design compliance
- Implementing Material You and dynamic color
- Choosing between Android navigation patterns

### web

Web platform best practices covering responsive design, accessibility (WCAG), performance, progressive enhancement, and modern CSS/HTML patterns.

**Use when:**
- Building web interfaces with any framework
- Auditing sites for accessibility compliance
- Implementing responsive, performant web layouts
- Reviewing web UI code for best practices

## Installation

```bash
npx skills add ehmo/platform-design-skills
```

## Usage

Skills activate automatically when agents detect platform-relevant tasks.

```
Review this SwiftUI view for iOS HIG compliance
```
```
Check this Android Compose screen against Material Design
```
```
Audit this web page for accessibility
```

## Skill Structure

Each skill contains:
- `SKILL.md` — Agent instructions with frontmatter metadata
- `metadata.json` — Version, references, and abstract
- `rules/` — Individual rule files with examples
- `AGENTS.md` — Quick context for agent consumption

## Sources

- Apple Human Interface Guidelines (2025) — developer.apple.com/design/human-interface-guidelines
- Material Design 3 — m3.material.io
- Web Content Accessibility Guidelines (WCAG) 2.2 — w3.org/WAI/WCAG22/quickref
- MDN Web Docs — developer.mozilla.org

## License

MIT
