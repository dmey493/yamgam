"""Builds index.html from the pieces in src/. Run: python3 tools/build.py"""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
S = ROOT / "src"
engine = (S / "engine.js").read_text()
import base64, json
SFX = {n: base64.b64encode((ROOT / "audio" / f"sfx-{n}.mp3").read_bytes()).decode() for n in ["bell", "scurry", "sparkle", "finale"]}
engine = "const SFX_DATA=" + json.dumps(SFX) + ";\n" + engine
exec((ROOT / "tools" / "engine_patches.py").read_text())
engine = engine.replace('const cols=["#E63946","#27A85A","#FFC53D","#FFFFFF","#0E5136"]', 'const cols=["#FFFFFF","#0F5C3F","#FFC83D","#141414","#1B2A4E"]').replace("c:cols[i%5]", "c:cols[i%5]")
teach = (S / "teach.js").read_text().replace("So that the Vine might be crowned", "So that the Cluster of grapes might be crowned")
out = ((S / "head4.html").read_text() + "/* ===================== CONTENT ===================== */\n"
       + (S / "hymns.js").read_text() + (S / "nights.js").read_text() + teach + (S / "timeline.js").read_text()
       + (S / "state.js").read_text() + engine + (S / "timeline_view.js").read_text() + (S / "views4.js").read_text())
(ROOT / "Hark.html").write_text(out)
print("Hark.html", len(out), "bytes")
