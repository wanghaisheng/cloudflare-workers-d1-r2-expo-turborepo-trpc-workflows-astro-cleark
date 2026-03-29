---
name: setup-alert
description: Configure monitoring alerts for critical SEO and GEO metrics
argument-hint: "<metric type> <threshold>"
---

# Setup Alert Command

Configures proactive **monitoring alerts for critical SEO and GEO metrics**, defines intelligent thresholds, and establishes response playbooks.

## Usage

```
/seo:setup-alert ranking-drop threshold=-5 keywords="primary keywords"
/seo:setup-alert traffic-change threshold=-20%
/seo:setup-alert indexing-issue
/seo:setup-alert backlink-change threshold=lost-domain-rating-70+
/seo:setup-alert geo-visibility threshold=-30%
/seo:setup-alert core-web-vitals threshold=poor
/seo:setup-alert all-critical (sets up standard alert package)
```

**Arguments:**
- Alert type (required): ranking-drop, traffic-change, indexing-issue, backlink-change, geo-visibility, core-web-vitals, technical-error, conversion-rate, all-critical
- `threshold=X` (required for some types): Numeric or percentage threshold
- `keywords="list"` (optional): Specific keywords to monitor
- `pages="list"` (optional): Specific pages/URLs to monitor
- `severity=high|medium|low` (optional): Alert priority level
- `notification=email|slack|sms` (optional): Delivery method

## Workflow

1. **Parse Alert Configuration** -- Identify alert type(s). If `all-critical`, set up the standard package (ranking drop, traffic change, indexing issue, Core Web Vitals, backlink loss).
2. **Configure Alerts** -- Invoke `alert-manager`. Define thresholds based on business context, set severity levels with notification frequency, generate structured configurations (trigger conditions, data sources, false positive filters), and create response playbooks for each alert type.
3. **Compile Output** -- Format configurations and playbooks into the template below.

## Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALERT CONFIGURATION SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Successfully configured [X] alert(s)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTIVE ALERTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Per alert: Type, Severity, Threshold, Scope, Notification, Status

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTIFICATION SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Recipients, channels, and routing rules per severity level]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSE PLAYBOOKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Per alert type: immediate actions, investigation steps, recovery, escalation]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TESTING & VALIDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Steps to verify alerts are working: test triggers, review playbooks, schedule threshold review]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Tips

- Start with conservative (loose) thresholds and tighten over time to prevent alert fatigue
- Use digest notifications for non-critical alerts (daily for medium, weekly for low)
- Use `all-critical` for a quick standard setup, then customize thresholds
- Review alert effectiveness monthly and disable low-value alerts

## Related Skills

- [alert-manager](../monitor/alert-manager/) -- Full alert configuration and management
- [rank-tracker](../monitor/rank-tracker/) -- Ranking monitoring and tracking
