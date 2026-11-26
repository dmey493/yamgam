# Hark!

A festive Advent devotional app for Umade. One short night-time devotion for each of the 27 nights from Sunday, November 29 to Friday, December 25, 2026. Each night: a verse, a 2–3 minute teaching (heard and read), a hymn, a prayer, and a calendar door to open. The mascot is Hark the aardvark.

The app is one self-contained HTML file, `Hark.html`. Do not edit it by hand: edit the pieces in `src/` and rebuild.

## Build

```
python3 tools/build.py
```

This writes `Hark.html` from the files in `src/`, in this order:

| File | What it holds |
| --- | --- |
| `src/head4.html` | Page head, the Build Signature comment, and all CSS |
| `src/hymns.js` | Lyrics for the seven hymns (public domain) |
| `src/nights.js` | The 27 nights in their original historical order: message, verse, credit, hymn, prayer |
| `src/teach.js` | The teachings (each author's own words in modern English), the weekly-theme order, the four week themes |
| `src/state.js` | Saved progress (localStorage key `hark-v2`), dates, streaks |
| `src/engine.js` | Sound, confetti, and Hark the aardvark's rig and animation |
| `src/views4.js` | Every screen: calendar, cards, extras, the night flow, transitions, the gift |
| `tools/engine_patches.py` | Small patches applied to `engine.js` at build time (running legs, singing, colours) |

## How the season is organised

- Nights are grouped by theme, one theme a week, not by history: Week 1 God with us, Week 2 He comes for you, Week 3 He is coming again, Week 4 Joy to the world, then Christmas Day (Luke 2).
- `ORDER` in `src/teach.js` maps each calendar night to an entry in `src/nights.js`.
- Doors show calendar dates. Later weeks stay wrapped until their first date arrives. Missed nights stay open.
- Dates and places from church history appear only in the timeline under Extras.
- "Preview all" in Extras opens every night for testing before its date.

## Design rules

- Built with the app-flavor skill: Swiss Grid look, calendar Board layout, Precision motion with spring accents.
- Home is a dark green board: white doors to do, red doors done, bright green for tonight.
- Every step of a night has its own colour field; type is gold on dark fields and ink on light ones.
- Hark carries you between steps (a run, a page turn, a blind drop) and reacts throughout.

## Audio

- Narration is recorded in ElevenLabs with the voice "Julian" (deep, mature British).
- Put each mp3 in `audio/` as `night-01.mp3`, `night-02.mp3` and so on, using calendar night numbers.
- Set `audio` on the matching night in `src/teach.js` to its https URL; the reader plays it and highlights each sentence.

## Still to do

1. Write the last six teachings: Luther's Advent sermon (Dec 6), Bernard (Dec 8), Ryle (Dec 16), Edwards (Dec 19), Calvin (Dec 21), Chesterton (Dec 24).
2. Add verse text and a written prayer for nights 8–27, and the Luke 2 reading for Christmas Day.
3. Record the narration and wire it in.
4. Check the teachings written from memory against their sources: the O Antiphons, the Heidelberg answers and Cranmer's prayer.
5. Later: nativity scene, kid mode, timeline map, more gift-opening moves.
