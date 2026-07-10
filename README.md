# Philipp Kautz – Portfolio

Statische Website – **kein Server, kein Backend, keine Build-Tools**. Die Projekte werden aus **Ordnern** geladen: jedes Projekt hat einen eigenen Ordner mit einer Textdatei und Bildern.

```
site/
├─ index.html          ← Startseite (Featured-Block, Filter, Kachel-Raster)
├─ projekt.html        ← Detailseite für ein einzelnes Projekt (?p=Ordnername)
├─ style.css            ← gesamtes Design, von beiden Seiten genutzt
├─ common.js            ← gemeinsame Lade-/Parse-Logik, von beiden Seiten genutzt
└─ projekte/
   ├─ liste.txt        ← Reihenfolge & welche Ordner es gibt
   ├─ _Vorlage/        ← Kopiervorlage für neue Projekte
   │  └─ projekt.txt
   ├─ Projekt_1/
   │  ├─ projekt.txt   ← Titel, Kategorie, Beschreibung ...
   │  └─ shroom_horizontal.png
   ├─ Projekt_2/
   │  └─ projekt.txt
   └─ ...
```

Jede Kachel im Raster zeigt nur das erste Bild und verlinkt auf `projekt.html?p=<Ordnername>` – dort werden Titel, volle Beschreibung und **alle** Bilder des Projekts angezeigt. Der Featured-Block auf der Startseite zeigt weiterhin alle Bilder direkt an.

## Neues Projekt hinzufügen (3 Schritte)

1. Den Ordner **`projekte/_Vorlage`** kopieren und umbenennen, z. B. zu **`projekte/Projekt_6`**.
2. Im neuen Ordner die **Bilder** ablegen und die **`projekt.txt`** ausfüllen.
3. Den Ordnernamen in **`projekte/liste.txt`** in einer neuen Zeile ergänzen.

Fertig – die Seite zeigt das Projekt automatisch an. Die Filter-Buttons oben entstehen von selbst aus den `kategorie`-Werten.

### Aufbau einer `projekt.txt`

```
titel: SHROOM IT!
untertitel: Pilzmesser mit ausfahrbarer Bürste
kategorie: Produktdesign · 3D-Druck
jahr: 2026
tags: Fusion 360, Compliant Mechanism, 3D-Druck
link: https://www.linkedin.com/
linktext: Auf LinkedIn ansehen
featured: ja
bilder: shroom_horizontal.png
beschreibung: Ein bis drei Sätze ...
```

- **`bilder`** — Dateinamen aus demselben Ordner, mit Komma getrennt. Das erste ist das Hauptbild. Leer lassen = automatische Platzhalter-Kachel.
- **`featured: ja`** — macht das Projekt zum großen Block ganz oben. Nur **ein** Projekt sollte das haben.
- **`link`** leer lassen (`link:`) = kein Link.
- Zeilen mit `#` werden ignoriert (für Notizen).

## Warum die kleine `liste.txt`?

Ein Browser darf aus Sicherheitsgründen **keine Ordner durchsuchen** – er kann also nicht selbst „sehen", welche Projekt-Ordner es gibt. Deshalb steht die Liste der Ordner (und ihre Reihenfolge) einmal zentral in `projekte/liste.txt`. Das ist der einzige Handgriff zusätzlich zum Ordner-Anlegen.

## Name, Bio & Farbe anpassen

- **Name / Untertitel / Bio:** in `index.html` im HTML unter `hero`, `split` bzw. `about`.
- **Akzentfarbe:** in `style.css` oben unter `:root` den Wert `--red` ändern (z. B. `#2547d8` für Blau) – gilt automatisch für beide Seiten.
- **Links (LinkedIn, E-Mail):** in `index.html` und `projekt.html` (Footer) nach `linkedin.com` bzw. `mailto:` suchen.

## Lokal ansehen (wichtig!)

Weil die Seite jetzt Dateien aus Ordnern lädt, funktioniert **einfaches Doppelklicken nicht mehr** (der Browser blockiert das bei `file://`). Zum lokalen Testen einen kleinen Server starten – im Ordner `site/`:

```
python -m http.server
```

Dann im Browser `http://localhost:8000` öffnen. (Alternativen: die „Live Server"-Erweiterung in VS Code, oder einfach direkt auf GitHub Pages testen.)

## Auf GitHub Pages veröffentlichen

1. Auf [github.com](https://github.com) einloggen → **New repository** → Name z. B. `portfolio` → **Public** → **Create**.
2. Den **kompletten Inhalt des Ordners `site/`** hochladen (also `index.html` **und** den Ordner `projekte/`).
3. Repo → **Settings** → **Pages** → Source: **Deploy from a branch**, Branch **main**, Ordner **/ (root)** → **Save**.
4. Nach 1–2 Minuten erreichbar unter `https://DEIN-NAME.github.io/portfolio/`.

Neue Projekte veröffentlichst du, indem du die Ordner/Dateien im Repo ergänzt bzw. bearbeitest – Pages aktualisiert sich automatisch.

> Tipp: Für die kurze URL `dein-name.github.io` nenne das Repository `DEIN-NAME.github.io`.
