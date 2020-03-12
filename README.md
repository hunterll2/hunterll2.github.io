# Design Concept
- **Types** -> unieque compnent
- **Modifiers** -> change component position/style/behavior

**Modifier:**
- 1# Hidden

# Structural Components
- Aside
- Main

# Design Component
## Bars
**Types:**
- 1# Fixed -> show normally
- 2# Slider -> show it's handle
- 3# Floater -> float on page

**Sizes:**
- 1# Full
- 2# Larger
- 3# Normal

## Boxes
**Types:**
- 1# Container
- 2# Titled

## Buttons/Links Group
**Types:**
- 1# Titled --> show button title and icon
- 2# Icons -> just show button icon

# Functional Components
- Search Form [null, render on #Larger,Fixed Bar]
- Site Sections [use #LinksGroup, render on #Larger,Fixed Bar]
- Edit Buttons [use #ButtonsGroup, render on #Normal,Fixed Bar]
- Notifications [null, render on #Normal,Fixed Bar, with #Hidden Modifier]
