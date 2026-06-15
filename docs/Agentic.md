# Uvildig risikovurdering af Netcompany Feniks Build

---

## Indholdsfortegnelse

- [Baggrund](#baggrund)
- [Analysegrundlag og metode](#analysegrundlag-og-metode)
- [Hvad skal Udenrigsministeriet kunne sikre?](#hvad-skal-udenrigsministeriet-kunne-sikre)
- [Nødvendige målinger og hands-on beviser](#nødvendige-målinger-og-hands-on-beviser)
- [Forudsætninger for en succesfuld implementering](#forudsætninger-for-en-succesfuld-implementering)
- [Foreløbig vurdering](#foreløbig-vurdering)

---

## Baggrund

Udenrigsministeriet har anmodet om en uvildig risikovurdering af Netcompanys AI-platform, Feniks Build. Vurderingen har til formål at trykprøve leverandørens centrale påstande og identificere beslutningskritiske risici med særligt fokus på:

- Sikkerhed
- Governance
- Compliance
- Kodekvalitet

Feniks Build positioneres som en platform til agentic AI-understøttet softwareudvikling, hvor AI-agenter kan assistere med analyse, kodegenerering, test, dokumentation og dele af byggeprocessen. Denne type teknologi kan potentielt øge udviklingshastigheden, men introducerer samtidig nye risici knyttet til:

- Databeskyttelse
- Sporbarhed
- Modeladfærd
- Kvalitetssikring
- Menneskelig kontrol

Markedets nye agentic engineering-løsninger følger ofte en genkendelig enterprise-arkitektur, hvor brugen af AI centraliseres gennem kontrollerede adgangspunkter, governance-lag, auditlogs og integrationsgateways. Formålet er at begrænse risikoen for datalækage, uautoriseret værktøjsbrug, prompt injection, manglende sporbarhed og ukontrolleret afhængighed af specifikke AI-modeller.

Nærværende rapport vurderer, om Netcompanys beskrevne arkitektoniske tilgang giver Udenrigsministeriet et tilstrækkeligt grundlag for sikker, kontrolleret og compliant anvendelse af agentic AI i softwareudvikling — eller om løsningen primært introducerer yderligere teknisk og organisatorisk kompleksitet uden tilstrækkeligt dokumenteret risikoreduktion.

---

## Analysegrundlag og metode

Rapporten er en uvildig, desk review-baseret risikovurdering af Netcompanys beskrevne Feniks Build-arkitektur. Den udgør ikke en teknisk audit eller en fuld due diligence, da vurderingen alene bygger på leverandørmateriale og offentligt tilgængelige oplysninger.

Vurderingen skal derfor læses som en foreløbig analyse af platformens beskrevne arkitektur, kontrolmodel og risikoprofil — ikke som en validering af den faktiske implementering.

Det har følgende metodiske konsekvenser:

**Teoretisk evaluering**
Rapporten analyserer de arkitektoniske koncepter, som Netcompany beskriver, herunder eksempelvis LLM Bridge, MCP Gateway, Trust Centre, Product Artefacts og integrationen til EASLEY-platformen. Analysen vurderer, om disse komponenter på konceptuelt niveau adresserer relevante risici ved agentic AI-understøttet softwareudvikling. Deres faktiske implementering, robusthed, ydeevne og driftssikkerhed er ikke verificeret.

**Ingen teknisk adgang**
Der har ikke været adgang til kildekode, detaljerede arkitekturdiagrammer, konfigurationsgrundlag, sikkerhedspolitikker, logdata, CI/CD-pipelines, testresultater eller driftsmiljøer, herunder et eventuelt Gefion-baseret miljø. Platformens reelle sikkerhedsniveau, compliance-status og operationelle modenhed kan derfor ikke valideres objektivt på det foreliggende grundlag.

**Leverandørpåstande behandles som ikke-verificerede**
Leverandørens udsagn om blandt andet "100% model independence", lokal eller europæisk hosting, realtidskontrol via LLM Bridge, governance via Trust Centre og effektivitetsgevinster på op til 45% behandles som leverandørpåstande, indtil de er dokumenteret gennem teknisk audit, uafhængige testresultater, kunderepræsentative benchmarks eller hands-on demonstrationer.

**Afgrænsning af konklusioner**
Når rapporten vurderer, at en arkitektonisk mekanisme kan reducere en given risiko, betyder det alene, at mekanismen på konceptuelt niveau er relevant. Det betyder ikke, at Netcompanys konkrete implementering har dokumenteret den pågældende effekt. Alle beslutningskritiske påstande bør derfor efterprøves særskilt, før de lægges til grund for kontraktindgåelse, produktionsbrug eller strategisk afhængighed.

**Evidensstatus**
I rapporten skelnes der mellem:

| Status | Betydning |
|---|---|
| Dokumenteret | Underbygget af tilgængeligt materiale eller teknisk dokumentation |
| Leverandørpåstand | Angivet af Netcompany, men ikke uafhængigt verificeret |
| Ikke verificeret | Ikke muligt at bekræfte på det foreliggende grundlag |
| Kræver teknisk audit | Kan kun vurderes gennem adgang til system, kode, konfiguration, logs, testmiljø eller driftsdata |

---

## Hvad skal Udenrigsministeriet kunne sikre?

Selvom leverandøren præsenterer et framework, der har til formål at håndtere kompleksiteten ved agentic AI-understøttet softwareudvikling, fritager det ikke Udenrigsministeriet for ansvar vedrørende styring, kontrol og risikohåndtering. For at beskytte ministeriets data og sikre, at investeringen leverer dokumenterbar værdi, bør ministeriet kunne styre, kræve og verificere følgende områder i praksis.

### Return on Investment (ROI) og Total Cost of Ownership (TCO)

Der bør foreligge en detaljeret business case, som sammenholder de samlede omkostninger ved Feniks-platformen med de forventede gevinster. Dette bør blandt andet omfatte:

- EASLEY-licenser
- Infrastruktur- og hostingomkostninger
- Drift og vedligeholdelse af integrationskomponenter
- Governance- og complianceaktiviteter
- Oplæring og kompetenceudvikling
- Eventuelle omkostninger ved leverandørafhængighed eller senere migrering

Det bør dokumenteres, at eventuelle produktivitetsgevinster overstiger de samlede etablerings- og driftsomkostninger, og at reduceret udviklingstid ikke blot erstattes af øgede omkostninger til AI-drift, kvalitetssikring eller governance.

### Sikkerhed

Feniks Build beskriver en arkitektur, hvor AI-relateret trafik kontrolleres gennem komponenter som LLM Bridge og MCP Gateway. På konceptuelt niveau følger dette et velkendt enterprise-mønster, hvor adgang til modeller, værktøjer og data centraliseres gennem kontrollerede integrationspunkter. En sådan arkitektur kan bidrage til at reducere risikoen for datalækage, uautoriseret adgang og ukontrolleret brug af AI-værktøjer.

Den faktiske sikkerhed afhænger imidlertid ikke alene af disse komponenter, men af den samlede implementering, herunder:

- Identitets- og adgangsstyring
- Dataklassificering og filtrering
- Håndtering af prompt injection
- Output-validering
- Værktøjssandboxing
- Logning og overvågning
- Sikker softwareudvikling og deployment

Platformens reelle sikkerhedsniveau kan derfor ikke vurderes uden teknisk dokumentation, testresultater og uafhængig sikkerhedsverifikation.

### Governance

Feniks Build beskriver en governance-model, hvor logning, overvågning og sporbarhed samles i et centralt Trust Centre. Derudover lægges der vægt på en metode, hvor mennesker fortsat godkender væsentlige beslutninger og kodeændringer. Denne tilgang kan bidrage til at reducere risikoen for ukontrolleret automatisering og manglende ansvarlighed. Human-in-the-loop bør dog ikke betragtes som en tilstrækkelig kontrolmekanisme i sig selv.

Den faktiske governance vil afhænge af:

- Klare ansvarsforhold
- Dokumenterede godkendelsesprocesser
- Konsekvent håndhævelse af politikker
- Kvaliteten af de menneskelige reviews
- Mulighed for audit og efterprøvning

Ministeriet bør derfor sikre, at governance ikke alene baseres på procesbeskrivelser, men understøttes af dokumenterbare og målbare kontroller.

### Compliance

Platformens mulighed for lokal eller europæisk hosting kan understøtte krav om datasuverænitet og reducere afhængigheden af ikke-europæisk infrastruktur. Dette dokumenterer imidlertid ikke i sig selv overholdelse af GDPR, sikkerhedskrav eller EU AI Act. Compliance bør vurderes ud fra den samlede behandlingskæde, herunder:

- Databehandlerforhold
- Underdatabehandlere
- Logning og auditspor
- Datalagring og retention
- Adgangsstyring
- Dokumentation af AI-anvendelse
- Risikovurderinger og eventuelle DPIA'er

Påstanden om "100% model independence" kan teoretisk reducere afhængigheden af enkelte modelleverandører. Det er dog ikke dokumenteret, hvilke konsekvenser et modelskifte vil have for kvalitet, hastighed, driftsomkostninger eller brugeroplevelse.

### Standardisering og arkitektonisk styring

Feniks Build beskriver en model, hvor udvikling understøttes af fælles artefakter, arkitekturregler og genanvendelige komponenter. En sådan tilgang kan bidrage til:

- Ensartede udviklingsprocesser
- Reduceret variation i implementeringer
- Højere grad af genbrug
- Mere konsistent arkitektur

Effekten afhænger dog af kvaliteten af de underliggende artefakter, samt af organisationens evne til at vedligeholde og videreudvikle disse over tid. Ministeriet bør derfor sikre, at standardisering understøtter fleksibilitet og vedligeholdbarhed frem for at skabe unødig afhængighed af leverandørspecifikke metoder og værktøjer.

### Kodekvalitet og AI-understøttet udvikling

Feniks Build søger at styre AI-genereret kode gennem faste arkitekturprincipper, genanvendelige artefakter og begrænsning af den kontekst, som AI-modellerne arbejder med. Dette kan reducere risikoen for inkonsistente løsninger og ukontrolleret kompleksitet. Kodekvalitet afhænger imidlertid af mere end den anvendte AI-model og bør vurderes ud fra den samlede udviklingsproces.

Følgende forhold bør dokumenteres:

- Arkitekturoverholdelse
- Testdækning
- Statisk kodeanalyse
- Sikkerhedsscanninger
- Vedligeholdbarhed
- Fejlrate i produktion
- Teknisk gæld over tid

Ministeriet bør kræve objektive målinger af kodekvalitet frem for alene at basere vurderingen på produktivitetsmålinger eller leverandørens egne vurderinger.

---

## Nødvendige målinger og hands-on beviser

For at kunne validere de centrale leverandørpåstande og reducere beslutningsrisikoen bør Udenrigsministeriet anmode Netcompany om at fremlægge dokumentation, demonstrationer og målinger inden en eventuel implementering.

### Effektivitet og produktivitet

Netcompany markedsfører Feniks Build med produktivitetsforbedringer på op til 45%. Ministeriet bør kræve dokumentation baseret på faktiske leverancer frem for teoretiske estimater. Der bør som minimum fremlægges:

- Kundecases med dokumenterede før- og eftermålinger
- Sammenligning af udviklingstid med og uden Feniks Build
- Målinger af udviklingshastighed, fejlrate og leverancekvalitet
- Opgørelse over den tid, der anvendes på review, governance og kvalitetssikring

Målingerne bør baseres på sammenlignelige projekter og være reproducerbare.

### Sikkerhed og kontrolmekanismer

Ministeriet bør kræve dokumentation for, at de beskrevne kontrolmekanismer fungerer i praksis. Der bør som minimum fremlægges:

- Uafhængige penetrationstest-rapporter
- Resultater fra LLM-red teaming
- Dokumentation for håndtering af prompt injection
- Dokumentation for håndtering af følsomme oplysninger og dataklassificering
- Eksempler på auditlogs og sporbarhed
- Dokumentation for integration med eksisterende sikkerhedsovervågning

Der bør gennemføres en praktisk demonstration, hvor forsøg på dataeksfiltration, prompt injection og uautoriseret værktøjsadgang testes under kontrollerede forhold.

### Modeluafhængighed og leverandørafhængighed

Påstanden om modeluafhængighed bør demonstreres i praksis. Ministeriet bør kræve en live-demonstration, hvor:

- Samme opgave udføres på flere forskellige modeller
- Der skiftes mellem cloud-baserede og lokale modeller
- Kvalitet, responstid og omkostninger måles
- Eventuelle ændringer i workflows og governance dokumenteres

Formålet er at vurdere, hvor stor den praktiske afhængighed af specifikke modeller eller platformkomponenter reelt er.

### Kodekvalitet og teknisk gæld

Ministeriet bør kræve objektive kvalitetsmålinger af kode genereret med Feniks Build. Dokumentationen bør omfatte:

- Statisk kodeanalyse
- Testdækning
- Sikkerhedsscanninger
- Arkitekturoverholdelse
- Vedligeholdbarhed
- Fejlrate i produktion
- Udvikling i teknisk gæld over tid

Målingerne bør sammenligne AI-understøttet udvikling med tilsvarende projekter udviklet uden Feniks Build.

### Drift og Total Cost of Ownership

Ud over produktivitetsmålinger bør ministeriet kræve dokumentation for de samlede driftsomkostninger. Der bør fremlægges:

- Omkostninger til licenser
- Infrastruktur- og hostingomkostninger
- Modelomkostninger
- Governance- og complianceomkostninger
- Oplæringsomkostninger
- Omkostninger ved modelskift eller leverandørskifte

Målet er at vurdere den samlede Total Cost of Ownership frem for alene udviklingshastigheden.

### Centrale spørgsmål til leverandøren

Ministeriet bør som minimum kræve svar på følgende spørgsmål:

1. Hvad er den gennemsnitlige AI-relaterede omkostning pr. udviklertime?
2. Hvor stor en andel af den dokumenterede tidsbesparelse anvendes efterfølgende på review, test og governance?
3. Hvilke kompetencer reduceres, og hvilke kompetencer bliver fortsat nødvendige?
4. Hvordan måles kvaliteten af AI-genereret kode over tid?
5. Hvordan dokumenteres effekten af modelskift mellem forskellige LLM'er?
6. Hvordan håndteres leverandørafhængighed på platform-, model- og infrastrukturniveau?
7. Hvilke objektive målinger anvendes til at dokumentere de annoncerede produktivitetsgevinster?

---

## Forudsætninger for en succesfuld implementering

Teknologien alene afgør ikke, om en agentic AI-platform skaber værdi. Realiseringen af de forventede gevinster afhænger i høj grad af organisationens kompetencer, governance og evne til at balancere hastighed med kontrol.

Hvis AI-understøttet udvikling introduceres uden de nødvendige kompetencer og styringsmekanismer, kan øget udviklingshastighed føre til øget teknisk gæld, højere kompleksitet og større operationel risiko.

### Nødvendige kompetencer hos kunden

**Teknisk AI-forståelse**

Projektledelse, arkitekter og tekniske nøglepersoner bør have en grundlæggende forståelse for forskellen mellem deterministiske systemer og probabilistiske AI-modeller. Organisationen bør være i stand til at:

- Identificere fejl og hallucinationer
- Forstå modellernes begrænsninger
- Vurdere kvaliteten af AI-genereret output
- Træffe beslutninger om passende anvendelsesområder for AI

**Arkitektonisk disciplin**

AI kan accelerere både god og dårlig softwareudvikling. Der bør derfor være stærke kompetencer inden for:

- Softwarearkitektur
- Teststrategi
- Sikker udvikling
- Kvalitetssikring
- Teknisk gældshåndtering

Manglende arkitektonisk styring kan medføre, at fejl og uhensigtsmæssige designbeslutninger skaleres hurtigere end ved traditionel udvikling.

**Leverandør- og produktstyring**

Ministeriet bør have kompetencer til løbende at evaluere leverancer baseret på dokumenterbar funktionalitet, kvalitet og risikoreduktion. Styringen bør fokusere på målbare resultater og observerbar værdi frem for alene procesbeskrivelser eller leverandørens egne produktivitetsmålinger.

### Tillid gennem kontroller frem for bureaukrati

Tillid i AI-understøttede udviklingsprojekter bør i videst muligt omfang etableres gennem automatiserede og efterprøvelige kontroller.

**Automatiseret governance**

Kontrolmekanismer bør integreres direkte i udviklingsprocessen gennem automatiserede tests, sikkerhedsscanninger, arkitekturvalidering og compliancekontroller. Formålet er at identificere fejl og afvigelser tidligt i udviklingsforløbet og reducere behovet for manuelle kontrolprocesser. Automatiserede kontroller kan bidrage til både højere kvalitet og hurtigere leverancer, forudsat at de løbende vedligeholdes og valideres.

**Tydelige beslutningsmandater**

For at opnå de forventede produktivitetsgevinster skal ansvar og beslutningskompetence være tydeligt placeret. Udviklingsteams bør have mandat til at træffe tekniske beslutninger inden for fastlagte rammer, mens governance-funktioner fokuserer på risikostyring, compliance og efterprøvning. Målet bør være at etablere en styringsmodel, hvor kontroller fungerer som sikkerhedsnet og beslutningsstøtte frem for som unødige flaskehalse.

**Kontinuerlig læring og tilpasning**

Da både AI-modeller og arbejdsmetoder udvikler sig hurtigt, bør organisationen forvente løbende justering af processer, kontroller og kompetencer. En succesfuld implementering forudsætter derfor, at både leverandør og kunde kontinuerligt evaluerer effekten af platformen og tilpasser governance-modellen i takt med nye erfaringer og risici.

---

## Foreløbig vurdering

Baseret på det tilgængelige materiale fremstår Feniks Build som en relevant og metodisk interessant platform til kontrolleret anvendelse af agentic AI i softwareudvikling.

Den beskrevne arkitektur adresserer på konceptuelt niveau væsentlige risici ved AI-understøttet udvikling, herunder datakontrol, modeladgang, governance, sporbarhed og standardisering af udviklingsprocessen.

Platformens faktiske egnethed for Udenrigsministeriet kan dog ikke bekræftes på det foreliggende grundlag. De mest beslutningskritiske forhold — herunder sikkerhedsniveau, compliance, kodekvalitet, performance, modeluafhængighed og reelle effektivitetsgevinster — kræver yderligere dokumentation og hands-on verifikation.

Det anbefales derfor, at Udenrigsministeriet ikke baserer en endelig beslutning alene på leverandørmateriale. En eventuel videreførelse bør betinges af en kontrolleret proof-of-value-fase med klare acceptkriterier, adgang til relevant teknisk dokumentation og mulighed for uafhængig efterprøvning.
