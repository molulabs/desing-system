"""Builds assets/fonts/native/*.ttf from the woff2 the web ships, so React Native draws the same
glyphs. React Native loads TrueType, one file per weight: the variable IBM Plex Sans is cut into
static instances, and each latin + latin-ext pair is merged into one file.

Each file's family, full and PostScript names equal its file name, the name the app uses: Android
and expo-font's loadAsync go by the file or key, iOS by the PostScript name.

Needs fontTools and brotli; without them installed, run it in a container:

    docker run --rm -u "$(id -u):$(id -g)" -e HOME=/tmp -v "$PWD:/ds" -w /ds python:3.12-slim \\
        sh -c 'pip install -q --target /tmp/lib fonttools brotli && PYTHONPATH=/tmp/lib python scripts/native-fonts.py'
"""

import io
from pathlib import Path

from fontTools.merge import Merger
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

FONTS = Path(__file__).resolve().parent.parent / "assets" / "fonts"
OUT = FONTS / "native"

# name → (woff2 files to merge, weight to cut from a variable font or None)
FAMILIES = {
    "IBMPlexSans-Regular": (["ibm-plex-sans-latin", "ibm-plex-sans-latin-ext"], 400),
    "IBMPlexSans-Medium": (["ibm-plex-sans-latin", "ibm-plex-sans-latin-ext"], 500),
    "IBMPlexSans-SemiBold": (["ibm-plex-sans-latin", "ibm-plex-sans-latin-ext"], 600),
    "IBMPlexMono-Regular": (["ibm-plex-mono-400-latin", "ibm-plex-mono-400-latin-ext"], None),
    "IBMPlexMono-Medium": (["ibm-plex-mono-500-latin", "ibm-plex-mono-500-latin-ext"], None),
    "tabler-icons": (["tabler-icons"], None),
}


def truetype(file, weight):
    """The woff2 as an in-memory TrueType file, cut to the weight when it is variable."""
    font = TTFont(FONTS / f"{file}.woff2")

    if weight is not None:
        font = instantiateVariableFont(font, {"wght": weight}, updateFontNames=False)

    font.flavor = None
    buffer = io.BytesIO()
    font.save(buffer)
    buffer.seek(0)

    return buffer


def rename(font, name):
    for record in font["name"].names:
        if record.nameID in (1, 4, 6, 16):
            record.string = name
        elif record.nameID in (2, 17):
            record.string = "Regular"


def build(name, files, weight):
    if len(files) == 1:
        font = TTFont(truetype(files[0], weight))
    else:
        font = Merger().merge([truetype(file, weight) for file in files])

    rename(font, name)
    font.save(OUT / f"{name}.ttf")


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)

    for name, (files, weight) in FAMILIES.items():
        build(name, files, weight)
        print(f"{name}.ttf", (OUT / f"{name}.ttf").stat().st_size // 1024, "KB")
