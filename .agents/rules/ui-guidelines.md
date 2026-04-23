# UI Modification Guidelines

When working on Frontend components, pages, or stylesheets (`.jsx`, `.js`, `.css`), you MUST adhere to the following strict rules regarding User Interface (UI) design:

## 1. Preserve Existing UI Design
- **No Unauthorized Alterations**: You must NOT alter, overwrite, or break the existing UI design, layouts, color schemes, or structural styling without explicit permission.
- **Maintain CSS Standards**: Continue using the project's established styling approach (e.g., Vanilla CSS). Do not introduce new CSS frameworks (like TailwindCSS) unless explicitly requested by the user.

## 2. Mandatory Review for Existing UI Changes
- If a task explicitly requests changing the design of an existing UI component, OR if fixing a bug unavoidably results in a visual change, you **MUST STOP and request a Review** from the user.
- Ask the user: *"This change will affect the existing UI design. Do you approve these visual changes?"* and wait for their confirmation before applying the code edits.

## 3. Creating New UI Elements
- **Additions are Allowed**: If a new feature requires an entirely new page or component, you are permitted to build and add new UI elements.
- **Design Consistency**: When creating new UI, you must ensure it harmoniously blends with the existing design system. Observe and inherit the project's current aesthetic (e.g., modern typography, consistent padding/margins, and premium look) rather than creating generic or unstyled components.
