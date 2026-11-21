---
name: Cybersecurity Club at NMSU
description:
colors:
  bg: "#000000"
  surface: "#171b24"
  surface-raised: "#202530"
  ink: "#f4f1f4"
  muted: "#bec0cb"
  line: "#373b47"
  crimson: "#8c1844"
  rose: "#ec879e"
  volt: "#27b7eb"
  ice: "#94cdf0"
  frost: "#d9e8f7"
  success: "#4ade80"
  caution: "#facc15"
  night: "#000000"
  control-border: "#626775"
  footer: "#000000"
typography:
  display:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 6.5vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 3vw, 2.3rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 800
    lineHeight: 1.12
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  introduction:
    fontFamily: "Crimson Text, Georgia, serif"
    fontSize: "clamp(1.3rem, 2.4vw, 1.55rem)"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Fira Code, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  button: "5px"
  surface: "6px"
spacing:
  section: "88px"
  section-mobile: "60px"
  page-inset: "24px"
components:
  button-primary:
    backgroundColor: "{colors.volt}"
    textColor: "{colors.night}"
    rounded: "{rounded.button}"
    padding: "11px 20px"
  button-primary-hover:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.night}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "11px 20px"
  notice:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "clamp(24px, 4vw, 38px)"
---

# Design System: Cybersecurity Club at NMSU

<!-- impeccable:design-map -->
Name: Cybersecurity Club at NMSU
Colors: primary: crimson #8c1844; neutral: bg #000000; primary: volt #27b7eb; primary: ice #94cdf0; neutral: ink #f4f1f4; neutral: muted #bec0cb; neutral: line #373b47; neutral: frost #d9e8f7; success #4ade80; caution #facc15 (+6 more in the sidecar)
Fonts: Figtree (display, headline, title, body); Crimson Text (introduction); Fira Code (label)
Spacing: section 88px, section-mobile 60px, page-inset 24px
Radius: button 5px, surface 6px
North Star: "The Welcoming Workshop"
Don't:
- Don't add a light theme without a new design decision.
- Don't invent sponsors, members, or meeting dates.
- Don't treat the draft brand guide as finalized policy.
Do:
- Do preserve the supplied club artwork and its original proportions.
- Do preserve visible keyboard focus and readable contrast on dark surfaces.
- Do label historical or unverified information and link to its source.
- Do keep the mobile menu and its links keyboard-accessible, and allow actions to wrap at small widths.
- Do keep motion to a few deliberate moments, and honor reduced-motion preferences.
Map: src/lib/main.css
Map: src/layouts/DocsLayout.astro (article layout: code blocks, callouts, file trees)
Map: src/layouts/base.astro
