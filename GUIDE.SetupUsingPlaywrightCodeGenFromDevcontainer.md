# Playwright Codegen fra Devcontainer

Denne guide viser hvordan `playwright codegen` kører i en devcontainer og vises i en browser-tab via noVNC — uden XQuartz eller andre opsætninger på Mac-siden.

## Hvordan det virker

```
Container: Chromium → Xvfb (virtuel skærm) → x11vnc → websockify/noVNC → port 6080
Mac:       Browser → http://localhost:6080/vnc.html  (live view af Chromium)
```

Chromium renderer lokalt i containeren til en virtuel framebuffer. noVNC streamer den som en web-app på port 6080. Du interagerer med Chromium gennem browser-vinduet — Playwright Inspector fanger alle klik og genererer C#-kode i terminalen.

## Hvad er konfigureret i dette repo

**`Dockerfile.devmachine`** installerer:
- `xvfb` — virtuel X11-skærm
- `x11vnc` — VNC-server der deler Xvfb-displayet
- `novnc` + `websockify` — web-baseret VNC-klient på port 6080

**`docker-compose.yml`** eksponerer port `6080`.

**`pw-codegen.sh`** — wrapper-script der starter Xvfb, x11vnc og noVNC automatisk og kører `playwright codegen`.

## Opsætning (gøres én gang)

Rebuild devcontaineren så de nye pakker installeres:

**VS Code:** `Dev Containers: Rebuild Container`

## Daglig brug

### 1. Start test-appen

```sh
cd /xyz/spa-lit-webcomponents && npm run dev -- --host
```

### 2. Kør codegen

I en ny terminal i containeren:

```sh
./pw-codegen.sh http://localhost:5173
```

Output:
```
Starter Xvfb på display :99...
Starter x11vnc...
Starter noVNC på port 6080...

Åbn i browser: http://localhost:6080/vnc.html
```

### 3. Åbn live-visningen

Gå til **http://localhost:6080/vnc.html** og klik **Connect**.

Du ser nu Chromium-browseren live i din Mac-browser.

### 4. Generer kode

Klik rundt i appen — Playwright Inspector optager alle interaktioner og viser den genererede C#-kode i realtid i terminalen. Kopiér koden ind i dit testprojekt.

### Andre formater og flags

Alle normale `playwright codegen`-flags sendes videre via scriptet:

```sh
# NUnit i stedet for xUnit
./pw-codegen.sh --target=csharp-nunit http://localhost:5173

# Gem direkte til fil
./pw-codegen.sh --output=PlaywrightTests/GeneratedTest.cs http://localhost:5173

# Åbn på en bestemt side
./pw-codegen.sh http://localhost:5173/#/questions
```

## Fejlfinding

**`websockify: command not found`**  
Containeren er ikke rebuildet. Kør `Dev Containers: Rebuild Container`.

**noVNC viser "Failed to connect"**  
En af baggrundprocesserne er crashet. Nulstil og prøv igen:
```sh
pkill -f websockify; pkill x11vnc; pkill Xvfb
./pw-codegen.sh http://localhost:5173
```

**Siden er sort i Chromium**  
Vite-appen kører ikke. Start `npm run dev -- --host` i `spa-lit-webcomponents`.
