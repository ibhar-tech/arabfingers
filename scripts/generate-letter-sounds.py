#!/usr/bin/env python3
"""Generate natural-sounding letter pronunciation audio files using edge-tts."""

import asyncio
import os
import edge_tts

LETTERS = [
    ("alef", "ألف", "Alef"),
    ("ba", "باء", "Ba"),
    ("ta", "تاء", "Ta"),
    ("tha", "ثاء", "Tha"),
    ("jeem", "جيم", "Jeem"),
    ("hha", "حاء", "Hha"),
    ("kha", "خاء", "Kha"),
    ("dal", "دال", "Dal"),
    ("thal", "ذال", "Thal"),
    ("ra", "راء", "Ra"),
    ("zay", "زاي", "Zay"),
    ("seen", "سين", "Seen"),
    ("sheen", "شين", "Sheen"),
    ("sad", "صاد", "Sad"),
    ("dad", "ضاد", "Dad"),
    ("tah", "طاء", "Tah"),
    ("zah", "ظاء", "Zah"),
    ("ain", "عين", "Ain"),
    ("ghain", "غين", "Ghain"),
    ("fa", "فاء", "Fa"),
    ("qaf", "قاف", "Qaf"),
    ("kaf", "كاف", "Kaf"),
    ("lam", "لام", "Lam"),
    ("meem", "ميم", "Meem"),
    ("noon", "نون", "Noon"),
    ("ha", "هاء", "Ha"),
    ("waw", "واو", "Waw"),
    ("ya", "ياء", "Ya"),
]

AR_VOICE = "ar-SA-ZariyahNeural"
EN_VOICE = "en-US-AnaNeural"

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "sounds", "letters")


async def generate(name: str, ar_text: str, en_text: str):
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    ar_path = os.path.join(OUTPUT_DIR, f"{name}-ar.mp3")
    en_path = os.path.join(OUTPUT_DIR, f"{name}-en.mp3")

    if not os.path.exists(ar_path):
        comm = edge_tts.Communicate(ar_text, AR_VOICE, rate="-15%")
        await comm.save(ar_path)
        print(f"  ✓ {ar_path}")

    if not os.path.exists(en_path):
        comm = edge_tts.Communicate(en_text, EN_VOICE, rate="-10%")
        await comm.save(en_path)
        print(f"  ✓ {en_path}")


async def main():
    print(f"Generating {len(LETTERS)} letter sounds...")
    for name, ar, en in LETTERS:
        await generate(name, ar, en)
    print("Done!")


if __name__ == "__main__":
    asyncio.run(main())
