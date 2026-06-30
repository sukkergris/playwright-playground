# Playwright "Show Browser" fra devcontainer

Mål: Se en headed Playwright-browser inde i VSCode uden XQuartz eller andre host-side opsætninger.

---

## Arkitektur

```
Container: Chromium → Xvfb (virtuel skærm) → x11vnc → websockify/noVNC → port 6080
Host:      VSCode Simple Browser → http://localhost:6080/vnc.html
```

---

## Hvad der er sat op

| Komponent | Status | Detalje |
|---|---|---|
| `Xvfb`, `x11vnc`, `novnc`, `websockify` | ✅ Installeret | Allerede i base image |
| Port 6080 eksponeret | ✅ | `docker-compose.yml` → `${HOST_NOVNC_PORT:-6080}:6080` |
| `pw-codegen.sh` | ✅ | `/xyz/pw-codegen.sh` |

Scriptet starter Xvfb + x11vnc + noVNC og kører derefter `playwright codegen --target=csharp`.

---

## Forsøg

### Forsøg 1 — Åbn `http://localhost:6080/vnc.html` i Simple Browser

**Resultat:** `ERR_CONNECTION_REFUSED` — noVNC var ikke startet endnu.

---

### Forsøg 2 — Start noVNC-stakken manuelt, åbn 6080

Start Xvfb + x11vnc + websockify manuelt. Port 6080 lyttede i containeren.

**Resultat:** `ERR_CONNECTION_REFUSED (-102)` i VSCode Simple Browser.

**Fund:** Docker-compose port-mapping alene er ikke nok. VSCode Simple Browser går igennem VSCode's egen port forwarding-tunnel, ikke host-OS port-mappingen.

---

### Forsøg 3 — Tilføj `forwardPorts` til `devcontainer.json`

Tilføjet `"forwardPorts": [6080]` til `.devcontainer/debian/devcontainer.json`.

**Observation:** VSCode forwardede port 6080 til **6081** på host-siden (`[::1]:6081`) fordi docker-compose allerede holdt 6080.

**URL der virker:** `http://localhost:6081/vnc.html`

**Resultat:** ✅ noVNC UI vises i VSCode Simple Browser — sort skærm (tom virtuel desktop).

---

### Forsøg 4 — Kør `playwright codegen` på virtual display

```sh
DISPLAY=:99 playwright -p /xyz/backend codegen --target=csharp https://example.com
```

**Resultat:**
> _udfyldes_

---

## Næste skridt

- [ ] Teste om headed mode virker i almindelige xUnit-tests (ikke kun codegen)
- [ ] Sætte `Headless = false` i testkonfiguration og køre med `DISPLAY=:99`
- [ ] Fixe port-konflikt: undgå at docker-compose og VSCode begge binder 6080 (fjern docker-compose port-mapping eller brug anden port)
