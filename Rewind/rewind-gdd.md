# REWIND — Game Design Document

**Genre:** Evidence-based sequencing mystery (detective daily / case campaign)
**Lane:** A (React) — scene inspection + card ordering; no engine needed
**Cognitive functions:** Temporal relations & sequencing, inferential thinking from evidence, systematic scene exploration, hypothesis revision, precision at output
**Math bridge:** Ordering/transitivity on a timeline, elapsed-time reasoning (melted, dried, cooled = rate clues), interval logic
**Sessions:** 3–6 min per case; campaign + daily

---

## Premise & arc

You are the junior investigator of the **Department of Small Mysteries** — the town office that handles cases too odd for the police and too interesting to ignore: *Who tipped the flour barrel in the bakery? In what order did the parade floats collide? How exactly did the cat end up on the chandelier?*

Your gift: you arrive **after** everything happened, and you can read a scene like a story told backwards.

Your partner is **Inspector Prune**, a magnificently jaded veteran one week from retirement (she has been one week from retirement for eleven years). She drives, drinks tea, and delivers the mediation prompts as world-weary wisdom ("Evidence first, story second, rookie. Every time.").

Arc (~20 cases in 4 chapters + daily mode):
- **Chapter 1 — Small Mysteries (1–5):** single-room scenes, 4–5 event cards, direct physical clues. Tutorial via Prune's remarks.
- **Chapter 2 — The Chain Jobs (6–11):** multi-room scenes; some events caused others (causal chains: the ball broke the vase, the vase startled the cat…). Testimony cards appear — witnesses who are *honestly mistaken* about order ("I'm SURE the lights went out first…") that physical evidence can overrule. Trusting testimony over evidence is the chapter's designed trap.
- **Chapter 3 — The Prankster (12–17):** a serial prankster stages scenes designed to *mislead* — planted evidence (a "melted" candle that was never lit; check the wick). Now you must judge which clues are trustworthy. The prankster leaves a signature only visible when you've sequenced correctly.
- **Chapter 4 — The Long Game (18–20):** the prankster's identity case — evidence spans multiple earlier scenes (return visits with new eyes). Finale reveal: the prankster is the department's *founder*, testing whether the town still had a true sequencer before funding the department's future. Prune knew. Prune un-retires. Warm ending.
- **Daily mode:** one seeded scene per day, shareable result grid (order-correctness as emoji strip, Wordle-style).

## Core mechanic — Read the scene, order the story

**Phase 1 — INSPECT:** a detailed illustrated scene. Tap objects to examine: each yields a clue note ("the candle has burned 3/4 down", "the footprints cross OVER the spilled flour", "the tea is still warm"). A magnifier count shows clues remaining undiscovered. You may stop inspecting anytime — but you don't know what you haven't found (systematic-exploration pressure, gentler than Lighthouse's: nothing punishes mid-inspection, but Phase 2 with missing clues is much harder).

**Phase 2 — SEQUENCE:** event cards (illustrated moments: "the vase tipped", "someone opened the window", "the cat jumped") appear shuffled on a timeline track. Drag into order. Clue notes stay pinned alongside for cross-reference.
- Cards **snap with a soft click**; conflicts you've created between two cards and a clue you hold cause the clue note to *glow amber* (not auto-solve — it flags "these three things can't all be true," you find why).
- Some cases include **interval pegs**: not just order but rough elapsed time ("at least an hour passed here" — because the tea went cold, because the paint dried). Rate-based reasoning: melt, dry, cool, burn.

**Commit economy:** 3 submission stamps per case (draft freely, commit scarcely — same output discipline as Family Tree Detective). Wrong submission: the FIRST out-of-order pair flashes, nothing else ("one thing is out of order after the window opened" — a hint that narrows without solving).

**Phase 3 — THE REPLAY (the reward):** on success, the scene **animates forward in time** — you watch the whole silly disaster unfold exactly as you deduced it, cat chandelier physics and all. This replay is the game's signature moment and the reason to finish every case. Prune slow-claps.

## Feedback & juice
- Inspection: tap-to-magnify zoom with a lens wobble; each found clue stamps a note into your casebook with a satisfying scribble sound.
- The timeline: cards lift with shadow on drag, snap with click, amber-glow conflicts pulse gently.
- The replay is where the juice budget goes: full slapstick animation of the reconstructed sequence, with each event card highlighting as its moment plays. Screenshotable end card: the scene + your solved timeline + case title.
- Prune's reaction lines per case rating (found all clues + first-stamp solve = "…Not bad, rookie." — the highest praise she is capable of).

## Cognitive-function & mediation hooks
- Error classification: submitting with undiscovered clues remaining = **input** (acted on incomplete scene reading); all clues found but order wrong = **elaboration** (misread a relation — did they treat testimony as fact?); one adjacent-pair swap on an otherwise perfect line = **output**. Chapter 2 adds a special flag: *testimony-over-evidence* errors tracked separately (a beautiful, teachable bias metric).
- Post-case, Prune asks ONE reflection question: "What told you the window came first?" → strategy naming: *anchored the endpoints / built causal chains / used the rate clues (melt, cool, dry) / distrusted the witness.*
- Bridging: "When do you figure out what happened from what's left behind?" (science labs, arguments between siblings, history class — this transfers everywhere).
- Teacher projector mode: inspect together, then small groups argue an order before any stamp — the disagreement is the mediation.

## Art & tone
Storybook detective: warm flat-illustration scenes (SVG style, one Lospec palette — muted warm range with one accent for interactables), casebook UI with paper texture, a friendly slab or rounded serif display font. Prune's portrait: 3 expressions, all variations of unimpressed. Tone: Wes-Anderson-for-kids; disasters, never crimes against people.

## Technical notes
- `sequenceEngine.ts` (pure TS): case model (events as a DAG + interval constraints), clue → constraint compilation, consistency/conflict detection for the amber glow, first-out-of-order-pair identification for hints, solvability + uniqueness verification, daily-seed generation (template scenes with parameterized event/clue sets).
- `cases.json`: scene layers, hotspots, clues, events, story beats. Replay animations as declarative keyframe sequences per event (data, not code) so new cases don't require new animation code.
- React + Framer Motion; timeline drag via layout animations. Touch-first; keyboard reordering supported.

## MVP
Chapter 1 (5 cases) with full inspect → sequence → replay loop, the casebook, conflict-glow, stamp economy, Prune's dialogue, and ONE fully-realized slapstick replay (case 1's should be the best 10 seconds in the game). Acceptance test: a student finishes a case and immediately starts the next one to see another replay.
