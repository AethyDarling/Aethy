# Characters

This folder holds one subfolder per character. Each character's folder contains their reference sheets and supporting art.

## The pattern

```
characters/
  example-character/     ← rename/copy this pattern for each character
    ref-sheet.png
    portrait.jpg
    expressions.jpg
    ...
```

- **Folder name:** the character's name, lowercase, hyphens instead of spaces (e.g. `vex`, `sister-maru`). This folder name is what you'll reference in `content/characters.ts`.
- Put everything for that character inside their folder: main reference sheet, close-ups, outfit variants, expression sheets, older art you still want shown.

Look inside `example-character/` for a walkthrough of suggested filenames and formats — then create a real folder per character following the same shape. (You can delete `example-character/` once you have real ones.)

Every character folder needs a matching entry in `content/characters.ts` (name, description, which images to show, `nsfw` flag) or it won't appear on the site.
