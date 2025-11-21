# Methodes van BIM naar Geo Brengen

| Applicatie | IFC direct openen | 1:1 conversie | Gefilterde 1:1 conversie | Shell extractie | CityGML LoD support | CityJSON LoD support |
|-|-|-|-|-|-|-|
| ESRI ArcGIS Pro| ✅ | ✅ | ✅ | 🔶 | ❌ | ❌ |
| Save Software FME| ❌ | ✅ | ✅ | 🔶 | ❌ | ❌ |
| IFC2GeoJSON | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| BIMShell | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| IfcEnvelopeExtractor | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |

✅ = volledige support
🔶 = gedeeltelijke/non-standaard support
❌ = geen support

# BIM bestanden in GIS omgeving brengen

## ESRI ArcGIS Pro

# 1:1 vertaling

## Save Software FME

## IFC2GeoJSON

# Vertaling naar GIS conforme objecten

## BIMShell

## IfcEnvelopeExtractor

De IfcEnvelopeExtractor is een open source C++ applicatie die BIM modellen in de IFC encoding kan omzetten naar Wavefront OBJ, STEP en CityGML CityJSON. Deze omzetting is niet een 1:1 omzetting van IFC naar een ander GIS bestandstype. De applicatie zet de geometrie van het input bestand om naar GIS representaties volgens de GIS syntax. De conversie volgt hierbij het LoD framework van Biljecki et al. Aanvullend zijn er een aantal experimentele LoDs en een 1:1 conversie beschikbaar. De tool support de conversie van IFC naar in totaal 17 verschillende LoDs, zie appendix ... voor meer informatie.

De applicatie is toegankelijk via de [GitHub pagina](https://github.com/tudelft3d/IFC_BuildingEnvExtractor). Hier zijn de source code en gecompilde executables beschikbaar. De gecompilde executables zijn beschikbaar voor zowel Windows als Linux (Ubuntu). Gedetaillerde informatie over de methodes die ontwikkeld zijn in de code om de conversie uit te voeren, kan worden gevonden in het [technische report](https://research.tudelft.nl/en/publications/bim2geo-converter/) van versie 0.2.6. Dit report is gebaseerd op een eerdere versie van de code, versie 0.3.x is de huidige versie, waarbij de dieper liggende logica gelijk of vergelijkbaar is gebleven.

Controle over de applicatie kan op twee manieren worden uitgeoefend, via een Graphical User Interface (GUI) of via een configuratie bestand (ConfigJSON). De GUI is makkelijker en sneller om mee te werken, zeker voor gebruikers die geen programmeer ervaring hebben. De GUI geeft echter enkel controle over een sub-set van alle beschikbare instellingen. Dit is gedaan om de menu's overzichtelijk te houden. De beschikbare instellingen zijn gekozen op basis van wat de meest gebruikte instellingen zijn. Als deze instellingen te beperkend zijn moet er met de ConfigJSON gewerkt worden. De ConfigJSON is een lijst met instellingen in een JSON encoding.

### Workflow

#### bestands correctie

Niet ieder model kan door de IfcEnvelopeExtractor direct verwerkt worden. De software applicatie is ontwikkeld om te werken op veel verschillende modellen, maar niet ieder probleem kan ontweken worden. Daarom moeten modellen mogelijk handmatige gecorrigeerd worden voordat ze kunnen worden verwerkt. Er zijn aantal onderwerpen waarvan het aangeraden wordt om te controleren/corrigeren voor verwerking. Als alleen de buitenkant van het gebouw/bouwwerkt geexporteerd/converteerd moet worden hoeft alleen de georeferentie en het IfcClass gebruik gechecked te worden. Als ook de binnenkant geexporteerd/converteerd moet worden is het ook aangeraden dat de IfcSpace hiërarchie en de IfcBuildingStorey gerelateerde objecten gechecked worden.

##### Georeferencing

De IfcEnvelopeExtractor neemt de georeferentie over van het IFC bestand. Dit betekend dat als het model correct gegeorefereerd is dat het GIS model direct op de correcte locatie zal worden geplaatst. Echter is de aanwezigheid en kwaliteit van de georeferentie in IFC niet altijd gegarandeerd. Applicaties zoals [IfcGref](https://ifcgref.bk.tudelft.nl/) maken het mogelijk om correcte georeferentie data van een bestand te controleren en eventueel toe te voegen of te corrigeren. De online versie van IfcGref kan IFC bestanden van maximaal 100mb verwerken. Als de bestanden zwaarder zijn dan 100mb kan vanaf de [GitHub pagina](https://github.com/tudelft3d/ifcgref) de code verkregen worden om de applicatie lokaal te gebruiken. De 100mb limiet is dan niet meer aanwezig.

##### Class gebruik

De IfcEnvelopeExtractor gebruikt maar een sub-set van de IfcClasses die beschikbaar zijn in een volledig IFC bestand. De classes die gebruikt worden zijn classes die tastbare objecten/geometrie vertegenwoordigen die ruimtes van elkaar scheiden. Bijvoorbeeld wanden, deuren en ramen. Deze objecten scheiden kamers van elkaar, maar ook de kamers binnen een gebouw en de lucht aan de buitenkant van een gebouw. Meubels en leidingen zijn ook tastbaar, maar scheiden niet ruimtes van elkaar, dus meestal spelen deze geen rol bij het overzetten van IFC naar GIS.

Standaard gebruikt de applicatie twaalf verschillende classes: IfcBeam, IfcColumn, IfcCovering, IfcCurtainWall, IfcDoor, IfcMember, IfcPlate, IfcRoof, IfcSlab, IfcWall, IfcWallStandardCase, IfcWindow classes. Deze kleine selectie uit de [700+ classes](https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2_TC1/HTML/link/alphabeticalorder-entities.htm) is voor de meeste gebouwen genoeg om een correcte extractie uit te voeren. Echter kan het zijn dat een gebouw andere classes gebruikt die belangrijk zijn voor de overzetting. In dat geval kan de lijst aangepast en/of uitgebreid worden via de GUI en de ConfigJSON. Ook zijn deze twaalf verschillende classes gekozen op basis van gebouwen, mogelijk hebben bruggen of tunnels andere eisen.

Deze filtering van object class is belangrijk om de processen die de applicatie uitvoert simpel te houden. Zelfs met correcte class selectie zijn dit zware processen die mogelijk traag en instabiel kunnen zijn. Het is daarom belangrijk dat de classes die geselecteerd zijn ook echt de functie uitvoeren waarvoor ze bedoeld waren. Als een IfcSlab wordt gebruikt om een weg te representeren die naast een gebouw ligt, dan heeft de applicatie maar een beperkte mogelijkheid om dit correct te detecteren als deel van de omligging en niet deel van het gebouw. Vaak zal dus deze weg worden gezien als deel van het gebouw, met alle gevolgen van dien. Een class waar vaak problemen mee optreden is de IfcBuildingElementProxy class. Deze class wordt vaak, incorrect, gebruikt voor alle objecten waarvan het onduidelijk is onder welke class ze eigenlijk behoren. De objecten die deze class gebruiken kunnen dus een combinatie zijn van voor de applicatie belangrijke en onbelangrijke objecten. De applicatie zal dus of deze objecten allemaal negeren (als er niet gefilterd wordt op IfcBuildingElementProxy) of allemaal gebruiken (als er wel gefilterd wordt op IfcBuildingElementProxy).

Het is belangrijk dat de classes in een bestand dus correct gebruikt worden. Alle classes die deel maken van een gebouw kunnen niet gebruikt worden om de omgeving te modelleren. Het gebruik IfcBuildingElementProxy wordt afgeraden. Als deze class wel gebruikt wordt, wordt het aangeraden om het gebruik ervan zoveel mogelijk te beperken. Ook is het belangrijk dat alle objecten die in die class gebruikt worden of wel belangrijk zijn voor de extractie, of allemaal onbelangrijk.

Als dit niet het geval is zal een IFC bestand met de hand moeten worden gecorrigeerd voordat de applicatie het bestand kan verwerken. Met de hand kunnen veel objecten verwijderd worden of de class type van een object veranderd worden.

##### IfcSpace gebruik

De IfcEnvelopeExtractor maakt het ook mogelijk om binnenruimtes te exporteren. Bij v3.0.x is dit nog steeds zwaar gebaseerd op de IfcSpace class in het IFC bestand. Een IFC bestand kan drie verschillende compositie type kamers hebben: COMPLEX, ELEMENT en PARTIAL. COMPLEX betekend dat de IfcSpace een groep of cluster van kamers/ruimtes representeert. ELEMENT betekend dat de IfcSpace een enkele kamer/ruimte representeert. PARTIAL betekend dat de IfcSpace een deel van een kamer/ruimte representeert. De applicatie gebruikt alleen de ELEMENT IfcSpace objecten.

In bijna ieder model waarbij kamers/ruimtes zijn gegroepeerd is de compositie type incorrect. Bijna alle IfcSpace objecten hebben type ELEMENT. Het maakt geen verschil of deze objecten gebruikt worden om daadwerkelijk een kamer/ruimte te representeren of om een groep kamers/ruimtes te groeperen. Vaak is dit niet de fout van de modelleur maar de fout van de BIM software. Applicaties zoals Revit zullen altijd incorrect IfcSpace objecten schrijven naar IFC.

Dit zorgt er helaas voor dat als er complexe groeperingen van ruimtes in een IFC bestand aanwezig zijn dat deze altijd met de hand zullen moeten worden gecorrigeerd als interieur  output gewild is. Als geen interieur output gewild is dan kunnen de foutive IfcSpace objecten negeert worden. Net zoals bij de tastbare objecten negeerd de applicatie objecten die niet direct nodig zijn.

##### IfcBuildingStorey gerelateerde objecten

De IfcEnvelopeExtractor maakt het mogelijk om verdiepingen of informatie gerelateerd aan de verdiepingen te exporteren. Voor LoD0.2 en LoD0.3 export word een horizontale doorsnede gemaakt door het gebouw om een oppervlakte, of groep van oppervlaktes te maken. Voor LoD0.2 wordt dit door alle gebruikte objecten van het IFC model gedaan. Maar voor de LoD0.3 doorsnede worden alleen de objecten gebruikt die via IfcRelContainedInSpatialStructure objecten aan de verdieping (IfcBuildingStorey) gerelateerd zijn.

Deze relatie tussen verdieping/IfcBuildingStorey en de andere producten is soms incorrect en moet gecorrigeerd worden als dat mogelijk is. Het beste is als dit direct gecorrigeerd kan worden in de bron waar de modellen vandaan komen. Als deze relatie verkeerd is in IFC dan is het waarschijnlijk ook incorrect in Revit, ArchiCAD of andere bron. Als het bronbestand niet beschikbaar is dan kan als alternatief een IFC editor gebruikt worden. Het veranderen van de relatie tussen objecten en verdiepingen is relatief makkelijk en door veel IFC editors ondersteunt.

Een groter probleem is als een object met de goede verdieping is gerelateerd maar zo hoog is dat het meer dan een enkele verdieping overbrugt. Over het algemeen wordt het afgeraden dit soort objecten in een IFC model te hebben. Er is tot nu toe geen oplossing voor dit probleem gevonden. Het is in theorie mogelijk om hetzelfde object via twee (of meer) verschillende IfcRelContainedInSpatialStructure te relateren aan twee (of meer) verschillende verdiepingen. Dit is echter geen standaardoplossing en de meeste IFC viewers en editors zullen hier niet goed mee omgaan.

#### Applicatie instellen

Zoals eerder vermeld kan de applicatie op twee manieren ingesteld worden, via de GUI en via de ConfigJSON. Als eerste behandelen we de GUI. Aanvullend worden via de ConfigJSON alle instellingen behandeld die niet via de GUI configureerbaar zijn.

##### GUI

De GUI is opgedeeld in groepen van instellingen die aan elkaar gerelateerd zijn.

De eerste groep zijn de algemene I/O instellingen. Waar staat de input opgeslagen en waar moet de output naar geschreven worden. Dit kan worden geconfigureerd door de bestandslocaties in de text balken in te vullen of via de "browse" button. De applicatie support meerdere input bestanden. Dut modellen die zijn opgesplits in aspect modellen kunnen door de applicatie gebruikt worden. Het is aan te raden om modellen/bestanden waarvan het bekend is dat ze geen belang spelen voor het omzetten van de geometrie naar GIS niet bij te selecteren. Bijvoorbeeld modellen met alleen leidingen hoeven niet als input gebruikt te worden. Om de IFC objecten te selecteren die belangrijk zijn voor de omzetting leest het programma ieder IFC bestand in om vervolgens de selectie te maken. Als de selectie gedeeltelijk van te voren gemaakt kan worden door bepaalde bestanden buiten te sluiten dan zal dit het omzettingsprocess versnellen.

De tweede groep zijn de gewilde output LoD. Dit is een lijst aan beschikbare LoD die de tool kan genereren. Afhankelijk van het doel van de GIS export kan hier een selectie van gemaakt worden. De LoD zijn gesorteerd in complexiteit. De eerste rij is relatief simpel te genereren, de tweede rij is lastiger en de derde rij zijn vrij complex.

Onderaan deze groep is het ook mogelijk om extra output te genereren in .obj of .STEP. De tool zal altijd een CityJSON bestand genereren. Maar het is mogelijk om kopien te maken in .obj en .STEP. Deze bestanden zullen niet de semantische informatie bevatten die de CityJSON output bezit. De bestanden supporten ook geen multi LoD, daarom wordt iedere LoD in een los bestand geplaatst. Deze kopie bestanden hebben dezelfde naam als de gekozen output naam, maar ze zullen eLoDxx en iLoDxx toegevoegd hebben om de buiten en binnenkant van het gebouw te representeren. Waarbij de xx vervangen wordt door de daadwerkelijke LoD.

De derde groep zijn de aanvullende instellingen. Dit zijn instellingen die een abstractie extra detail kan geven, of juist detail kan wegnemen. Zo kan bijvoorbeeld via deze instellingingen gekozen worden voor alleen een export van het interieur. Er zijn twee instellingen die niet extreem buidelijk zijn en extra uitleg nodig hebben.

Als eerste is dat "Footprint based abstraction". "Footprint based abstraction" wil zeggen dat de modellen worden gelimiteerd door de voetprint. Voor LoD1.2, 1.3 en 2.2 worden de oppervlaktes die het dak representeren naar de voetprint hoogte geextrudeerd. Dit betekend dat het dak de omvang van het gebouw bepaald. Als het dak over de voetprint van het gebouw heenhangt dan wordt het uiteindelijk grondoppervlak van de LoD1.2, 1.3 en 2.2 abstractie groter dan de daadwerkelijke voetprint. Als "Footprint based abstraction" wordt aangezet dan worden de dakoppervlaktes eerst bijgesneden zodat er nergens overhang is over de voetprint. Hierdoor zijn de grondoppervlaktes van LoD1.2, 1.3 en 2.2 identiek aan de voetprint van het gebouw. Een bijeffect hiervan is dat als er overhang in het gebouw aanwezig is de dakoppervlaktes nu kleiner zijn de de LoD0.2, 0.3 en 0.4.

Alse tweede is dat "Approximate areas and volumes". Zoals het woord "approximate" al suggereerd is dit een inschatting en niet de daadwerkelijke waarde. IFC is een complex format en het is niet altijd mogelijk om een gesloten volume te creeeren. Hierdoor is het niet altijd mogelijk om een correcte inschatting te maken van het volume van een model. Als "Approximate areas and volumes" wordt aangezet dan worden de volumes en oppervlaktes van de meeste objecten die geexporteerd worden berekend met behulp van de voxelisatie. De kwaliteit en betrouwbaarhied van deze resultaten zijn erg afhangkelijk van de grootte van de voxels die zijn gekozen.

##### ConfigJSON

#### Samenvoegen van GIS bestanden

De output van de BIM2Geo converter is een model van een enkel bouwwerk, of (afhankelijk van de BIM model) een relatief kleine cluster van gebowuen. Om dit model in de omgeving the plaatsen is het mogelijk om de CityJSON output samen te voegen met een CityJSON tegel van bijvoorbeeld de 3D bag. Op dit moment is het nog niet mogelijk om dit direct met de BIM2Geo converter te doen. Een alternatieve oplossing is het gebruiken van [cijo](https://github.com/cityjson/cjio) (CityJSON/io).
