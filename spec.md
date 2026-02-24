# Specification

## Summary
**Goal:** Build TraderVerse Academy, a 3D interactive trader education website with four learning modules, a futuristic dark aesthetic, and backend progress tracking.

**Planned changes:**
- Implement a 3D hero landing page using React Three Fiber with floating candlestick formations, animated particles, and gold/amber accents on a dark background
- Create a 3D interactive module card navigation system on the homepage featuring four cards: SMT, ICT, Price Action, and Indicators — with hover/tilt animations
- Build an SMT module page with educational sections covering liquidity sweeps, institutional order flow, displacement, and visual diagrams
- Build an ICT module page covering order blocks, fair value gaps, market structure, kill zones, and optimal trade entry with annotated visuals
- Build a Price Action module page covering candlestick patterns (pin bar, engulfing, doji), support/resistance, trend identification, and breakout patterns with animated chart visualizations
- Build a Technical Indicators module page covering Moving Averages, RSI, MACD, Bollinger Bands, and Volume with chart mockups and reading tips
- Implement a persistent glass-morphism navbar with links to Home, SMT, ICT, Price Action, and Indicators with active link highlighting
- Implement a Motoko backend actor storing per-module completion status (smt, ict, priceAction, indicators) with `getProgress` query and `markComplete` update calls, persisted across upgrades
- Display per-module progress indicators (glowing ring or similar) on the homepage driven by backend state, and add a "Mark as Complete" button on each module page

**User-visible outcome:** Users can explore an immersive 3D trading education site, study four structured learning modules, and track their completion progress across modules with state persisted on the backend.
