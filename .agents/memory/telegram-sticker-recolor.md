---
name: Telegram animated sticker recoloring
description: Color edits for Telegram TGS/Lottie stickers must cover both solid fills and gradient stop arrays.
---

Telegram animated stickers use gzipped Lottie JSON. Their visible palette can be split between solid color properties and gradient stop arrays, so a recolor that only edits solid `c` values can leave the main artwork unchanged.

**Why:** The original sticker preview exposed that the dominant red artwork lived in gradient stop data rather than only in solid fill data.

**How to apply:** When recoloring `.tgs` assets, inspect and transform both solid RGB(A) color arrays and the first `4 * p` entries of each gradient's stop array, while leaving white and opacity-stop data intact.