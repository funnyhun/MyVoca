# Project Logging Guidelines

When recording changes, creating work logs, or summarizing completed tasks for this project, you MUST strictly adhere to the following directory structure and file formatting rules:

## 1. Storage Location & Naming Convention
- **Root Folder**: All log files must be stored in the `logs` directory at the root of the workspace.
- **Date Subfolder**: You must create a sub-directory using the current date in the format `YYYY-MM-DD` (e.g., `logs/2026-04-01`).
- **File Naming**: The final artifact must be saved as `logs/:date/:appropriate_name.md`. Choose a concise, descriptive filename in lowercase with hyphens (e.g., `logs/2026-04-21/quiz-ui-fix.md`).

## 2. Mandatory Log Header
Every log file MUST begin with a clear Title and a List of Modified Files. Do not skip this requirement.

**Required Template:**
```md
# [Task/Feature Title]

**Modified Files:**
- `path/to/modified_file1.jsx`
- `path/to/modified_file2.css`
- `path/to/new_file.js`

## Description of Changes
(Write the detailed summary of the work done here...)
```

## 3. General Principles
- Only log significant changes, bug fixes, or feature completions that require tracking.
- Keep the description concise but informative enough to understand what logic or UI was altered.
