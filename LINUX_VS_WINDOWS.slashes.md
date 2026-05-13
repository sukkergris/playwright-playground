# Linux vs Windows: Stier og skråstreger

## Det korte svar

| | Windows | Linux / macOS |
|---|---|---|
| Separator | `\` (backslash) | `/` (forward slash) |
| Eksempel | `C:\Users\theo\file.txt` | `/home/theo/file.txt` |

---

## Hvorfor er de forskellige?

**Windows** arvede sin konvention fra MS-DOS (1981), som brugte `/` til kommando-flags (som `dir /w`), og valgte derfor `\` som sti-separator for at undgå konflikt.

**Unix/Linux** (og macOS, der bygger på Unix) har altid brugt `/` — det er også roden af filsystemet: `/` er det øverste niveau, ligesom `C:\` er det på Windows.

---

## Konkrete problemer det giver

### 1. `.sln`-filer (som vi lige fandt)
Visual Studio på Windows gemmer projekt-stier med backslash:
```
"PlaywrightTests\PlaywrightTests.csproj"
```
På Linux læser Roslyn language-serveren det bogstaveligt — og leder efter en fil med `\` i navnet, som ikke eksisterer. Resultat: ingen IntelliSense.

### 2. Hardkodede stier i kode
```csharp
// Sprænger på Linux:
var path = "logs\\output.txt";

// Virker på begge:
var path = Path.Combine("logs", "output.txt");
```
`Path.Combine` indsætter automatisk den rigtige separator for platformen.

### 3. Shell-scripts og Git
Bash på Linux bruger `/`. Hvis du copy-paster en Windows-sti ind i et shell-script, fejler det.

### 4. Docker og bind mounts
Docker-kommandoer på Windows kræver enten forward slashes eller escaped backslashes:
```sh
# Virker (forward slash):
docker run -v C:/Users/theo/project:/app myimage

# Fejler typisk i shells:
docker run -v C:\Users\theo\project:/app myimage
```

---

## Platform-agnostiske løsninger

### I C\# / .NET
```csharp
Path.Combine("folder", "subfolder", "file.txt")  // korrekt separator automatisk
Path.DirectorySeparatorChar                        // '\' eller '/' afhængig af OS
```

### I Python
```python
from pathlib import Path
Path("folder") / "subfolder" / "file.txt"  # virker på begge platforme
```

### I Node.js
```js
const path = require('path')
path.join('folder', 'subfolder', 'file.txt')  // korrekt separator automatisk
```

---

## En finte: Windows accepterer faktisk `/` i de fleste tilfælde

Win32 API'et understøtter forward slash internt i de fleste funktioner. Det betyder at dette virker i en Windows-terminal:
```
type C:/Users/theo/file.txt
```
Men ikke alle programmer og parsere bruger Win32 direkte — og `.sln`-parseren er tilsyneladende en af dem der ikke normaliserer.

---

## Huske-regel

> **Forward slash `/` virker overalt.**  
> **Backslash `\` virker kun på Windows — og ikke altid.**

Når du skriver stier der skal køre cross-platform: brug altid `/` eller din platforms `Path.Combine`/`path.join`.
