# Toolkit

## Handleiding/HowTo

| Applicatie | BIM/IFC direct openen | 1:1 vertaling | Gefilterde 1:1 vertaling | Shell extractie | CityGML LoD support | CityJSON LoD support |
| - | - | - | - | - | - | - |
| ESRI ArcGIS Pro| ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| IFC2GeoJSON | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Save Software FME | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| IfcConvert | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| BIMShell | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| IfcEnvelopeExtractor | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |

✅ = volledige support
❌ = geen support

# BIM bestanden in GIS omgeving brengen

## ESRI ArcGIS Pro

# 1:1 vertaling/mapping

## Save Software FME

# Shell extraction

## BIMShell

## IfcEnvelopeExtractor

De IfcEnvelopeExtractor is een open source C++ applicatie die BIM modellen in de IFC encoding kan omzetten naar Wavefront OBJ, STEP en CityGML CityJSON. Deze omzetting is niet alleen een 1:1 omzetting van IFC naar een ander GIS bestandstype. De applicatie zet de geometrie van het input bestand om naar GIS representaties volgens de GIS syntax. De conversie volgt hierbij het LoD framework van [Biljecki et al.](https://pure.tudelft.nl/ws/portalfiles/portal/4377508/Biljecki2016to.pdf). Aanvullend zijn er een aantal experimentele LoDs en een 1:1 conversie beschikbaar. De tool support de conversie van IFC naar in totaal 17 verschillende LoDs, zie appendix ... voor meer informatie.

De applicatie is toegankelijk via de [GitHub pagina](https://github.com/tudelft3d/IFC_BuildingEnvExtractor). Hier zijn de source code en gecompilde executables beschikbaar. De gecompilde executables zijn beschikbaar voor zowel Windows als Linux (Ubuntu). Gedetaillerde informatie over de methodes die ontwikkeld zijn in de code om de conversie uit te voeren, kan worden gevonden in het [technische report](https://research.tudelft.nl/en/publications/bim2geo-converter/) van versie 0.2.6. Dit report is gebaseerd op een eerdere versie van de code, versie 0.3.x is de huidige versie, waarbij de dieper liggende logica gelijk of vergelijkbaar is gebleven.

Controle over de applicatie kan op twee manieren worden uitgeoefend, via een Graphical User Interface (GUI) of via een configuratie bestand (ConfigJSON). De GUI is makkelijker en sneller om mee te werken, zeker voor gebruikers die geen programmeer ervaring hebben. De GUI geeft echter enkel controle over een sub-set van alle beschikbare instellingen. Dit is gedaan om de menu's overzichtelijk te houden. De beschikbare instellingen zijn gekozen op basis van wat de meest gebruikte instellingen zijn. Als deze instellingen te beperkend zijn moet er met de ConfigJSON gewerkt worden. De ConfigJSON is een lijst met instellingen in een JSON encoding.

### Workflow

#### bestands correctie

Niet ieder model kan door de IfcEnvelopeExtractor direct verwerkt worden. De software applicatie is ontwikkeld om te werken op veel verschillende modellen, maar niet ieder probleem kan ontweken worden. Daarom moeten modellen mogelijk handmatige gecorrigeerd worden voordat ze kunnen worden verwerkt. Er zijn aantal onderwerpen waarvan het aangeraden wordt om te controleren/corrigeren voor verwerking. Als alleen de buitenkant van het gebouw/bouwwerkt geexporteerd/converteerd moet worden hoeft alleen de georeferentie en het IfcClass gebruik gechecked te worden. Als ook de binnenkant geexporteerd/converteerd moet worden is het ook aangeraden dat de IfcSpace hiërarchie en de IfcBuildingStorey gerelateerde objecten gechecked worden.

**Georeferencing**

De IfcEnvelopeExtractor neemt de georeferentie over van het IFC bestand. Dit betekend dat als het model correct gegeorefereerd is dat het GIS model direct op de correcte locatie zal worden geplaatst. Echter is de aanwezigheid en kwaliteit van de georeferentie in IFC niet altijd gegarandeerd. Applicaties zoals [IfcGref](https://ifcgref.bk.tudelft.nl/) maken het mogelijk om correcte georeferentie data van een bestand te controleren en eventueel toe te voegen of te corrigeren. De online versie van IfcGref kan IFC bestanden van maximaal 100mb verwerken. Als de bestanden zwaarder zijn dan 100mb kan vanaf de [GitHub pagina](https://github.com/tudelft3d/ifcgref) de code verkregen worden om de applicatie lokaal te gebruiken. De 100mb limiet is dan niet meer aanwezig.

**Class gebruik**

De IfcEnvelopeExtractor gebruikt maar een sub-set van de IfcClasses die beschikbaar zijn in een volledig IFC bestand. De classes die gebruikt worden zijn classes die tastbare objecten/geometrie vertegenwoordigen die ruimtes van elkaar scheiden. Bijvoorbeeld wanden, deuren en ramen. Deze objecten scheiden kamers van elkaar, maar ook de kamers binnen een gebouw en de lucht aan de buitenkant van een gebouw. Meubels en leidingen zijn ook tastbaar, maar scheiden niet ruimtes van elkaar, dus meestal spelen deze geen rol bij het overzetten van IFC naar GIS.

Standaard gebruikt de applicatie twaalf verschillende classes: IfcBeam, IfcColumn, IfcCovering, IfcCurtainWall, IfcDoor, IfcMember, IfcPlate, IfcRoof, IfcSlab, IfcWall, IfcWallStandardCase, IfcWindow classes. Deze kleine selectie uit de [700+ classes](https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2_TC1/HTML/link/alphabeticalorder-entities.htm) is voor de meeste gebouwen genoeg om een correcte extractie uit te voeren. Echter kan het zijn dat een gebouw andere classes gebruikt die belangrijk zijn voor de overzetting. In dat geval kan de lijst aangepast en/of uitgebreid worden via de GUI en de ConfigJSON. Ook zijn deze twaalf verschillende classes gekozen op basis van gebouwen, mogelijk hebben bruggen of tunnels andere eisen.

Deze filtering van object class is belangrijk om de processen die de applicatie uitvoert simpel te houden. Zelfs met correcte class selectie zijn dit zware processen die mogelijk traag en instabiel kunnen zijn. Het is daarom belangrijk dat de classes die geselecteerd zijn ook echt de functie uitvoeren waarvoor ze bedoeld waren. Als een IfcSlab wordt gebruikt om een weg te representeren die naast een gebouw ligt, dan heeft de applicatie maar een beperkte mogelijkheid om dit correct te detecteren als deel van de omligging en niet deel van het gebouw. Vaak zal dus deze weg worden gezien als deel van het gebouw, met alle gevolgen van dien. Een class waar vaak problemen mee optreden is de IfcBuildingElementProxy class. Deze class wordt vaak, incorrect, gebruikt voor alle objecten waarvan het onduidelijk is onder welke class ze eigenlijk behoren. De objecten die deze class gebruiken kunnen dus een combinatie zijn van voor de applicatie belangrijke en onbelangrijke objecten. De applicatie zal dus of deze objecten allemaal negeren (als er niet gefilterd wordt op IfcBuildingElementProxy) of allemaal gebruiken (als er wel gefilterd wordt op IfcBuildingElementProxy).

Het is belangrijk dat de classes in een bestand dus correct gebruikt worden. Alle classes die deel maken van een gebouw kunnen niet gebruikt worden om de omgeving te modelleren. Het gebruik IfcBuildingElementProxy wordt afgeraden. Als deze class wel gebruikt wordt, wordt het aangeraden om het gebruik ervan zoveel mogelijk te beperken. Ook is het belangrijk dat alle objecten die in die class gebruikt worden of wel belangrijk zijn voor de extractie, of allemaal onbelangrijk.

Als dit niet het geval is zal een IFC bestand met de hand moeten worden gecorrigeerd voordat de applicatie het bestand kan verwerken. Met de hand kunnen veel objecten verwijderd worden of de class type van een object veranderd worden.

**IfcSpace gebruik**

De IfcEnvelopeExtractor maakt het ook mogelijk om binnenruimtes te exporteren. Bij v3.0.x is dit nog steeds zwaar gebaseerd op de IfcSpace class in het IFC bestand. Een IFC bestand kan drie verschillende compositie type kamers hebben: COMPLEX, ELEMENT en PARTIAL. COMPLEX betekend dat de IfcSpace een groep of cluster van kamers/ruimtes representeert. ELEMENT betekend dat de IfcSpace een enkele kamer/ruimte representeert. PARTIAL betekend dat de IfcSpace een deel van een kamer/ruimte representeert. De applicatie gebruikt alleen de ELEMENT IfcSpace objecten.

In bijna ieder model waarbij kamers/ruimtes zijn gegroepeerd is de compositie type incorrect. Bijna alle IfcSpace objecten hebben type ELEMENT. Het maakt geen verschil of deze objecten gebruikt worden om daadwerkelijk een kamer/ruimte te representeren of om een groep kamers/ruimtes te groeperen. Vaak is dit niet de fout van de modelleur maar de fout van de BIM software. Applicaties zoals Revit zullen altijd incorrect IfcSpace objecten schrijven naar IFC.

Dit zorgt er helaas voor dat als er complexe groeperingen van ruimtes in een IFC bestand aanwezig zijn dat deze altijd met de hand zullen moeten worden gecorrigeerd als interieur  output gewild is. Als geen interieur output gewild is dan kunnen de foutive IfcSpace objecten negeert worden. Net zoals bij de tastbare objecten negeerd de applicatie objecten die niet direct nodig zijn.

**IfcBuildingStorey gerelateerde objecten**

De IfcEnvelopeExtractor maakt het mogelijk om verdiepingen of informatie gerelateerd aan de verdiepingen te exporteren. Voor LoD0.2 en LoD0.3 export word een horizontale doorsnede gemaakt door het gebouw om een oppervlakte, of groep van oppervlaktes te maken. Voor LoD0.2 wordt dit door alle gebruikte objecten van het IFC model gedaan. Maar voor de LoD0.3 doorsnede worden alleen de objecten gebruikt die via IfcRelContainedInSpatialStructure objecten aan de verdieping (IfcBuildingStorey) gerelateerd zijn.

Deze relatie tussen verdieping/IfcBuildingStorey en de andere producten is soms incorrect en moet gecorrigeerd worden als dat mogelijk is. Het beste is als dit direct gecorrigeerd kan worden in de bron waar de modellen vandaan komen. Als deze relatie verkeerd is in IFC dan is het waarschijnlijk ook incorrect in Revit, ArchiCAD of andere bron. Als het bronbestand niet beschikbaar is dan kan als alternatief een IFC editor gebruikt worden. Het veranderen van de relatie tussen objecten en verdiepingen is relatief makkelijk en door veel IFC editors ondersteunt.

Een groter probleem is als een object met de goede verdieping is gerelateerd maar zo hoog is dat het meer dan een enkele verdieping overbrugt. Over het algemeen wordt het afgeraden dit soort objecten in een IFC model te hebben. Er is tot nu toe geen oplossing voor dit probleem gevonden. Het is in theorie mogelijk om hetzelfde object via twee (of meer) verschillende IfcRelContainedInSpatialStructure te relateren aan twee (of meer) verschillende verdiepingen. Dit is echter geen standaardoplossing en de meeste IFC viewers en editors zullen hier niet goed mee omgaan.

#### Applicatie instellen

Zoals eerder vermeld kan de applicatie op twee manieren ingesteld worden, via de GUI en via de ConfigJSON. Als eerste behandelen we de GUI. Aanvullend worden via de ConfigJSON alle instellingen behandeld die niet via de GUI configureerbaar zijn.

**GUI**

![De GUI van de IfcEnvelopeExtractor](media/07_toepassingen/menus.jpg "De GUI van de IfcEnvelopeExtractor bestaat uit een menu (links) en een console (rechts). Via het menu kunnen de meest voorkomende instellingen worden aangepast. Via de console communiceerd de software met de gebruiker")

De GUI is opgedeeld in groepen van instellingen die aan elkaar gerelateerd zijn. In de afbeelding hierboven zijn de groepen weergegeven.

* A: Algemene I/O instellingen
* B: Verwachte output LoD en encoding
* C: Aanvullende instellingen
* D: Numerieke parameters
* E: Geometrische parameters

De eerste groep zijn de algemene I/O instellingen (A). Dit gaat over waar de input bestanden staan en waar de output naartoe moet worden geschreven. Dit kan worden geconfigureerd door de bestandslocaties in de tekst balken in te vullen of via de "browse" button. De applicatie support meerdere input bestanden. Dus modellen die zijn opgesplitst in aspect modellen kunnen door de applicatie gebruikt worden. Het is aan te raden om modellen/bestanden waarvan het bekend is dat ze geen belang spelen voor de omzetting niet als input te gebruiken. Bijvoorbeeld modellen met alleen leidingen hoeven niet als input gebruikt te worden. Om de IFC objecten te selecteren die belangrijk zijn voor de omzetting leest het programma ieder IFC bestand in om vervolgens de selectie te maken. Als de selectie gedeeltelijk van te voren gemaakt kan worden door bepaalde bestanden buiten te sluiten dan zal dit het omzettingsprocess versnellen.

De tweede groep zijn de verwachte output LoD en encoding (B). Afhankelijk van het doel van de GIS export kan hier een selectie van gemaakt worden. De eerste drie rijen van deze lijst is gesorteerd in complexiteit. De vierde rij valt hierbuiten, in deze rij staat de 1:1 vertaling/mapping. Dit zijn meestal relatief trage processen die maar in beperkte mate complex zijn.

![Voorbeeld van de resulterende bestanden als alternatieve encoding output wordt gebruikt](media/07_toepassingen/output_alt_encoding.JPG "Voorbeeld van de resulterende bestanden als alternatieve encoding output wordt gebruikt.")

Onderaan deze groep kan de encoding aangevuld worden. De tool zal altijd een CityJSON bestand genereren. Maar het is mogelijk om extra kopieën te genereren in .obj en/of .STEP encodig. Deze bestanden zijn enkel geometrisch. Semantische data zoals attributen woren niet in deze bestanden opgeslagen. De bestanden ondersteunen ook geen multi LoD, daarom wordt iedere LoD in een los bestand geplaatst. Deze kopieën hebben dezelfde naam als de gekozen output naam, maar ze zullen eLoDxx en iLoDxx toegevoegd hebben om de buiten- en binnenkant van het gebouw te representeren. Waarbij de xx vervangen wordt door de daadwerkelijke LoD. Deze instelling is nog niet volledige ondersteund voor iedere LoD door de software

De derde groep zijn de aanvullende instellingen (C). Dit zijn instellingen die een abstractie extra detail kan geven, of juist detail kan wegnemen. Zo kan bijvoorbeeld via deze instellingingen gekozen worden voor alleen een export van het interieur. Er zijn twee instellingen die niet per se voor zichzelf spreken en extra uitleg nodig hebben.

De eerste is "Footprint based abstraction". "Footprint based abstraction" dicteert of de modellen moeten worden gelimiteerd door de voetafdruk. Voor LoD1.2, 1.3 en 2.2 worden de oppervlaktes die het dak representeren naar de voetafdruk hoogte geëxtrudeerd. Dit betekend dat het dak de omvang van het gebouw bepaald. Als het dak over de voetafdruk van het gebouw heen hangt dan wordt het uiteindelijk grondoppervlak van de LoD1.2, 1.3 en 2.2 abstractie groter dan de daadwerkelijke voetafdruk. Als "Footprint based abstraction" wordt aangezet dan worden de dakoppervlaktes eerst bijgesneden zodat er nergens overhang is over de voetafdruk. Hierdoor zijn de grondoppervlaktes van LoD1.2, 1.3 en 2.2 identiek aan de daadwerkelijke voetafdruk van het gebouw. Een bijeffect hiervan is dat als er overhang in het gebouw aanwezig is de dakoppervlaktes nu kleiner zijn de LoD0.2, 0.3 en 0.4.

![Visualisatie van het verschil tussen een LoD2.2 vorm die gebaseerd is op de roof outline, en een LoD2.2 vorm die is beperkt door de voetafdruk](media/07_toepassingen/footprintrestrictedex.jpg "Visualisatie van het verschil tussen een LoD2.2 vorm die gebaseerd is op de roof outline (midden), en een LoD2.2 vorm die is beperkt door de voetafdruk (rechts). Beide modellen zijn gebaseerd op dezelfde input (links).")

De tweede is "Approximate areas and volumes". Zoals het woord "approximate" suggereert is dit een inschatting en niet de daadwerkelijke waarde. IFC modellen zijn geometrisch complex en het is niet altijd mogelijk om een gesloten schil te creëren. Zonder een geslote schil is het moeilijk de het volume te berekenen. Als "Approximate areas and volumes" wordt aangezet dan worden de volumes en oppervlaktes van de schillen berekend op basis van de voxelisatie. De kwaliteit en betrouwbaarheid van deze resultaten zijn erg afhankelijk van de grootte van de voxels die zijn gekozen.

De vierde groep zijn de Numerieke parameters (D). Dit zijn de enige numerieke controle die de gebruiker over de applicatie heeft. De tool gebruikt voxels voor veel processen, hierdoor is het lastig om een correcte grootte te kiezen. Over het algemeen is iets kleiner dan de grootte van de kleinste nis gedeeld door twee in het model een goede waarde. Mocht dit onbekend zijn dan is 0.2 meter meestal goed.

De voetafdruk hoogte is de waarde waarop de voetafdruk zich bevindt. Voor de meeste input modellen moet dit met de hand gemeten worden. Vaak is 0 correct, maar soms wordt het lokale coördinatensysteem gebruikt om foutieve georeferencie te compenseren. Als het IFC model gemaakt is volgens de [BIM basis ILS](https://www.digigo.nu/ilsen-en-richtlijnen/bim-basis-ils/) van DigiGO dan kan de automatische instelling gebruikt worden om de tool zelf de voetafdruk hoogte te vinden. Het programma zoekt dan naar een verdieping die begint met "00" dat wordt gevolgd door een spatie.

De vijfde groep zijn de Geometrische parameters(E). Deze instellingen gaan over de geometrie van het IFC bestand dat de tool gebruikt. De bovenste rij zijn drie check boxes die gaan over het tekst vak eronder. Dit tekst vak laat alle IFC classes zien de worden gebruikt door de software. De IfcBuildingElementProxy objecten kunnen hier aan toegevoegd worden door "Ignore Proxy Elements" uit te zetten. De standaard objecten worden uit deze lijst gehaald door "Use default div Object" uit te zetten. Er kunnen zelf object classes toegevoegd worden aan het tekst vak door het te ontgrendelen door "Custom div objects" aan te zetten. De software gebruikt alleen bestaande [IfcClasses](https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2_TC1/HTML/link/alphabeticalorder-entities.htm). Dit is niet hoofdletter gevoelig.

De onderste rij zijn weer drie check boxes. Dit zijn nog enkele losse instellingen die gerelateerd zijn aan de geometrie van het IFC bestand. "Use simple geo" dicteerd of void objecten moeten worden toegepast op volumetrische objecten. "Use high precision" dicteerd of een precisie van 1e-6m of 1e-4m moet worden gebruikt. "Use voxel filtering" dicteerd of er moet worden gefilterd met voxel intersecties voordat complexere filters worden toegepast. Voxels gebruiken om te filteren is sneller, maar ook minder precies.

Als de instellingen zijn bepaald kan het programma direct worden gestart door de "Run" knop in te drukken, of een ConfigJSON kan worden gemaakt door de "Generate" knop te drukken.

**ConfigJSON**

#### Samenvoegen van GIS bestanden

De output van de BIM2Geo converter is een model van een enkel bouwwerk, of (afhankelijk van de BIM model) een relatief kleine cluster van gebowuen. Om dit model in de omgeving the plaatsen is het mogelijk om de CityJSON output samen te voegen met een CityJSON tegel van bijvoorbeeld de 3D bag. Op dit moment is het nog niet mogelijk om dit direct met de BIM2Geo converter te doen. Een alternatieve oplossing is het gebruiken van [cijo](https://github.com/cityjson/cjio) (CityJSON/io).

### Output specificatie

De IfcEnvelopeExtractor ondersteunt 12 verschillende "reguliere" LoD. Deze LoD volgen een aangepaste LoD framework dat zowel het framework van de CityGML2.0/3.0 standaard en van [Biljecki et al.](https://pure.tudelft.nl/ws/portalfiles/portal/4377508/Biljecki2016to.pdf) combineerd en op uitbreid. Een deel van de verschillen komt voort uit benodigde interpretatie van regels die niet duidelijk gedefinieerd zijn in de gebruikte/bestaande frameworks. Aanvullend is het framework van [Biljecki et al.](https://pure.tudelft.nl/ws/portalfiles/portal/4377508/Biljecki2016to.pdf) gebaseerd op modellen die zijn gemaakt op basis in-situ metingen gecombineerd met 2D polygonen. Hier zitten andere beperkingen aan dan aan modellen gebaseerd op BIM. Hierdoor zijn niet alle aspecten van het framework passend.

Een deel van de volgende samenvatting van de output kan ook worden gevonden in het technische rapport van de [IfcEnvelopeExtractor V0.2.6](https://repository.tudelft.nl/file/File_5924bb4a-a5e4-42ff-b1ed-48168728d12a?preview=1). Dit document geeft ook een uitgebreide uitleg over de methodes die zijn gebruikt om de abstractie modellen te creëren. Echter is versie V0.3.2 van de software beschikbaar tijdens het schrijven van dit document. V0.3.2 gebruikt een aantal andere regels en methodes. Daarnaast is ook de mogelijke output uitgebreid, LoD4 werd nog niet ondersteunt door v0.2.

Niet iedere LoD die beschikbaar is in het framework van [Biljecki et al.](https://pure.tudelft.nl/ws/portalfiles/portal/4377508/Biljecki2016to.pdf) wordt behandeld in deze lijst. Dat betekend niet dat ze niet belangrijk zijn, alleen dat de exctractor deze LoD niet als output genereerd.

#### LoD0.0

![Visualisatie van LoD0.0 gebaseerd op het institute IFC model van IAI/KIT](media/07_toepassingen/LoD00.jpg "Visualisatie van LoD0.0 gebaseerd op het institute IFC model van IAI/KIT")

2D bounding box representatie van het input BIM model.

De representatie bestaat uit:

* Dak oppervlak
  * $n = 1$
  * Type: _RoofSurface_ of _+ProjectedRoofOutline_ als geen voetafdruk extractie is gekozen.
  * Het bovenoppervlak van de kleinst georiënteerde bounding box om het totale model heen.
* Grond/voetafdruk oppervlak
  * $n = 1$
  * Type: _GroundSurface_
  * Het bovenoppervlak van de kleinst georiënteerde bounding box alle objecten die +-0.5 m zijn geplaatst van de voetafdruk

#### LoD0.2

![Visualisatie van LoD0.2 gebaseerd op het institute IFC model van IAI/KIT](media/07_toepassingen/LoD02.jpg "Visualisatie van LoD0.2 gebaseerd op het institute IFC model van IAI/KIT. Dak en voetafdruk (links), de kamers (midden) en de verdiepingen (rechts) zijn los weergegeven")

Simpel 2.5D oppervlak representatie van het input BIM model waarbij ieder oppervlak een normaal richting heeft van (0,0,1). Het model is 2.5D tussen oppervlaktes van dezelfde bron. Overhangende delen zijn toegestaan tussen oppervlaktes die andere types hebben of een andere bron hebben (zoals verschillende verdiepingen).

De representatie bestaat uit:

* Dak oppervlak
  * $n \geq 1$
  * Type: _RoofSurface_ of _+ProjectedRoofOutline_ als geen voetafdruk extractie is gekozen.
  * Een oppervlak dat is gemaakt door alle top oppervlaktes van de dak structuur to projecteren op de xy vlak. De geprojecteerde oppervlaktes die tegen elkaar rusten worden samengevoegd. Deze oppervlaktes worden op de voetafdruk hoogte geplaatst als geen voetafdruk output wordt gegenereerd. Als er wel voetafdruk output wordt gegenereerd worden deze oppervlaktes op de max z hoogte van het BIM model geplaatst.
* Grond/voetafdruk oppervlak
  * $n \geq 1$
  * Type: _GroundSurface_
  * Een oppervlak dat is gemaakt door een sectie te maken door het hele IFC model ter hoogte van de voetafdruk z waarde. Horizontale oppervlaktes die dicht bij deze sectiehoogte liggen (±0.15m) worden ook aan deze selectie toegevoegd. De resulterende vlakke oppervlaktes worden samengevoegd. De binnenringen die schachten en vergelijkbare elementen representeren worden verwijderd. Deze representatie is identiek voor de LoD0.3 and 0.4 grond/voetafdruk oppervlak.
* Verdiepingsoppervlak
  * Als IFC bestand _IfcBuildingStorey_ objecten bevat $n \geq 1$ anders $n = 0$.
  * Type: _FloorSurface_
  * Oppervlaktes die zijn gemaakt door een sectie te maken door het hele IFC model ter hoogte van iedere verdieping. Horizontale oppervlaktes die dicht bij deze sectiehoogte liggen (±0.15m) worden ook aan deze selectie toegevoegd. De resulterende vlakke oppervlaktes worden samengevoegd.
* Kamer oppervlak
  * Als IFC bestand _IfcSpace_ objecten bevat $n \geq 1$ anders $n = 0$.
  * Type: _+ProjectedCeilingOutline_
  * Oppervlaktes die zijn gemaakt door, per kamer, de plafond oppervlaktes plat te projecteren op de minimale z hoogte van de kamer. Deze vlakke oppervlaktes worden samengevoegd om een oppervlak te maken per kamer.

#### LoD0.3

![Visualisatie van LoD0.3 gebaseerd op het institute IFC model van IAI/KIT](media/07_toepassingen/LoD03.jpg "Visualisatie van LoD0.3 gebaseerd op het institute IFC model van IAI/KIT. Dak en voetafdruk (links) en de verdiepingen (rechts) zijn los weergegeven")

2.5D oppervlak representatie van het input BIM model waarbij ieder oppervlak een normaal richting heeft van (0,0,1). Het model is 2.5D tussen oppervlaktes van dezelfde bron. Overhangende delen zijn toegestaan tussen oppervlaktes die andere types hebben of een andere bron hebben (zoals verschillende verdiepingen).

De representatie bestaat uit:

* Dak oppervlak
  * $n \geq 1$
  * Type: _RoofSurface_
  * Oppervlaktes die zijn gemaakt op basis van de dak structuur van het input model. De top oppervlaktes van het dak worden geïsoleerd en gegroepeerd als ze elkaar aanraken of snijden. Per groep wordt een plat oppervlak gemaakt door deze groepen plat te projecteren, samen te voegen en op de top z hoogte te plaatsen van de originele groep. Overlap tussen de verschillende oppervlaktes wordt geëlimineerd door de lager gelegen oppervlaktes te trimmen.
* Grond/voetafdruk oppervlak
  * $n \geq 1$
  * Type: _GroundSurface_
  * Een oppervlak dat is gemaakt door een sectie te maken door het hele IFC model ter hoogte van de voetafdruk z waarde. Horizontale oppervlaktes die dicht bij deze sectiehoogte liggen (±0.15m) worden ook aan deze selectie toegevoegd. De resulterende vlakke oppervlaktes worden samengevoegd. De binnenringen die schachten en vergelijkbare elementen representeren worden verwijderd. Deze representatie is identiek voor de LoD0.2 and 0.4 grond/voetafdruk oppervlak.
* Verdiepings oppervlak
  * Als IFC bestand _IfcBuildingStorey_ objecten bevat $n \geq 1$ anders $n = 0$.
  * Type: _FloorSurface_ en _OuterFloorSurface_
  * Oppervlaktes die zijn gemaakt door een sectie te maken door het hele IFC model ter hoogte van iedere verdieping. Horizontale oppervlaktes die dicht bij deze sectiehoogte liggen (±0.15m) worden ook aan deze selectie toegevoegd. Voor ieder oppervlak wordt getest of het binnen of buiten het gebouw ligt. Per group worden de vlakke oppervlaktes worden samengevoegd.

#### LoD0.4

![Visualisatie van LoD0.4 gebaseerd op het institute IFC model van IAI/KIT](media/07_toepassingen/LoD04.jpg "Visualisatie van LoD0.4 gebaseerd op het institute IFC model van IAI/KIT.")

2.5D oppervlak representatie van het input BIM model waarbij ieder oppervlak dezelfde vorm behoud als de geometrische bron. Het model is 2.5D tussen oppervlaktes van dezelfde bron. Overhangende delen zijn toegestaan tussen oppervlaktes die andere types hebben of een andere bron hebben (zoals verschillende verdiepingen).

De representatie bestaat uit:

* Dak oppervlak
  * $n \geq 1$
  * Type: _RoofSurface_
  * Oppervlaktes die zijn gemaakt op basis van de dak structuur van het input model. De top oppervlaktes van het dak worden geisoleerd en gegroepeerd als ze elkaar aanraken of snijden. Overlap tussen de verschillende oppervlaktes wordt geelimineerd door de lager gelegen oppervlaktes te trimmen.
* Grond/voetafdruk oppervlak
  * $n \geq 1$
  * Type: _GroundSurface_
  * Een oppervlak dat is gemaakt door een sectie te maken door het hele IFC model ter hoogte van de voetafdruk z waarde. Horizontale oppervlaktes die dicht bij deze sectiehoogte liggen (±0.15m) worden ook aan deze selectie toegevoegd. De resulterende vlakke oppervlaktes worden samengevoegd. De binnenringen die schachten en vergelijkbare elementen representeren worden verwijderd. Deze representatie is identiek voor de LoD0.2 and 0.3 grond/voetafdruk oppervlak.

#### LoD1.0

![Visualisatie van LoD1.0 gebaseerd op het institute IFC model van IAI/KIT](media/07_toepassingen/LoD10.jpg "Visualisatie van LoD1.0 gebaseerd op het institute IFC model van IAI/KIT.")

3D bounding box representatie van het input BIM model.

De representatie bestaat uit:

* Buitenschil
  * $n = 1$
  * Type: _RoofSurface_, _GroundSurface_ of _WallSurface_
  * De kleinst georiënteerde bounding box om het totale model heen.

#### LoD1.2

![Visualisatie van LoD1.2 gebaseerd op het institute IFC model van IAI/KIT](media/07_toepassingen/LoD12.jpg "Visualisatie van LoD1.2 gebaseerd op het institute IFC model van IAI/KIT. Buitenschil (links) en de kamers (rechts) zijn los weergegeven")

2.5D volumetrische representatie van het input BIM model met unform vlakke boven en onder oppervlaktes.

De representatie bestaat uit:

* Buitenschil
  * $n \geq 1$
  * Type: _RoofSurface_, _GroundSurface_ of _WallSurface_
  * Volume kan gemaakt worden op twee manieren:
    * door het LoD0.2 dakoppervlak naar de grondhoogte te extruderen
    * door het LoD0.2 grondoppervlak naar de tophoogte van het gebouw te extruderen.
* Binnenschil
  * Als IFC bestand _IfcBuildingStorey_ objecten bevat $n \geq 1$ anders $n = 0$.
  * Type: _CeilingSurface_, _FloorSurface_ of _InteriorWallSurface_
  * Volume dat per kamer is gemaakt door de LoD0.2 _+ProjectedCeilingOutline_ represenatie te extruderen naar de tophoogte van de kamer.

#### LoD1.3

![Visualisatie van LoD1.3 gebaseerd op het institute IFC model van IAI/KIT](media/07_toepassingen/LoD13.jpg "Visualisatie van LoD1.3 gebaseerd op het institute IFC model van IAI/KIT.")

2.5D volumetrische representatie van het input BIM model met vlakke oppervlaktes. Ieder oppervlak heeft een normaal richting met een z-component dat gelijk is aan 1 of 0.

De representatie bestaat uit:

* Buitenschil
  * $n \geq 1$
  * Type: _RoofSurface_, _GroundSurface_ of _WallSurface_
  * Volume dat is gemaakt door de LoD0.3 dakoppervlaktes naar de grondhoogte te extruderen. De resulterende volumes worden samengevoegd. Het is mogelijk om dit volume bij te trimmen zodat de voetafdruk van dit volume overeen komt de de LoD0.2 voetafdruk.

#### LoD2.2

![Visualisatie van LoD2.2 gebaseerd op het institute IFC model van IAI/KIT](media/07_toepassingen/LoD22.jpg "Visualisatie van LoD2.2 gebaseerd op het institute IFC model van IAI/KIT. Buitenschil (links) en de kamers (rechts) zijn los weergegeven")

2.5D volumetrische representatie van het input BIM model.

De representatie bestaat uit:

* Buitenschil
  * $n \geq 1$
  * Type: _RoofSurface_, _GroundSurface_ of _WallSurface_
  * Volume dat is gemaakt door de LoD0.4 dakoppervlaktes naar de grondhoogte te extruderen. De resulterende volumes worden samengevoegd. Het is mogelijk om dit volume bij te trimmen zodat de voetafdruk van dit volume overeen komt de de LoD0.2 voetafdruk.
* Binnenschil
  * Als IFC bestand _IfcBuildingStorey_ objecten bevat $n \geq 1$ anders $n = 0$.
  * Type: _CeilingSurface_, _FloorSurface_ of _InteriorWallSurface_
  * Volume dat per kamer is gemaakt door de plafondoppervlaktes van de kamer te extruderen naar de minimale vloer hoogte van de kamer.

#### LoD3.2

![Visualisatie van LoD3.2 gebaseerd op het institute IFC model van IAI/KIT](media/07_toepassingen/LoD32.jpg "Visualisatie van LoD3.2 gebaseerd op het institute IFC model van IAI/KIT. Dak en voetafdruk (links) en de kamers (rechts) zijn los weergegeven")

3D volumetrische representatie van het input BIM model.

De representatie bestaat uit:

* Buitenschil
  * $n \geq 1$
  * Type: _RoofSurface_, _GroundSurface_, _WallSurface_, _Window_ of _Door_
  * Volume dat is gemaakt door alle (deels) externe oppervlaktes te filteren met behulp van raycasting. Deze oppervlaktes worden met elkaar getrimd en de getrimde delen die aan de buitenkant van het gebouw liggen worden samengevoegd.
* Binnenschil
  * Als IFC bestand _IfcBuildingStorey_ objecten bevat $n \geq 1$ anders $n = 0$.
  * Type: _CeilingSurface_, _FloorSurface_ of _InteriorWallSurface_
  * Volume dat per kamer is gemaakt door de IfcSpace vorm over te nemen.

#### LoD4.0

![Visualisatie van LoD4.0 gebaseerd op het institute IFC model van IAI/KIT](media/07_toepassingen/LoD40.jpg "Visualisatie van LoD4.0 gebaseerd op het institute IFC model van IAI/KIT.")

3D complex (geen schil) representatie van de objecten die de buitenkant van het input BIM model representeren.

De representatie bestaat uit:

* Complex
  * Als objecten met IsExternal aanwezig zijn $n \geq 1$ anders $n = 0$
  * Type: ieder IfcClass type dat in het model zit met voorafgaand een "+". Zoals bijvoorbeeld _IfcWall_ ->  _+IfcWall_
  * Groep van volumes dat is verzameld door de ruimte scheidende IFC objecten met het attribuut IsExternal dat de waarde True heeft in het model 1:1 over te zetten.

#### LoD4.1

![Visualisatie van LoD4.1 gebaseerd op het institute IFC model van IAI/KIT](media/07_toepassingen/LoD41.jpg "Visualisatie van LoD4.1 gebaseerd op het institute IFC model van IAI/KIT.")

3D complex (geen schil) representatie van de ruimte scheidende objecten van het input BIM model.

De representatie bestaat uit:

* Complex
  * $n \geq 1$
  * Type: ieder IfcClass type dat in het model zit met voorafgaand een "+". Zoals bijvoorbeeld _IfcWall_ ->  _+IfcWall_
  * Groep van volumes dat is verzameld door de IFC objecten die zijn gekozen als ruimte scheidende objecten 1:1 over te zetten.

#### LoD4.2

![Visualisatie van LoD4.2 gebaseerd op het institute IFC model van IAI/KIT](media/07_toepassingen/LoD42.jpg "Visualisatie van LoD4.2 gebaseerd op het institute IFC model van IAI/KIT.")

3D complex (geen schil) representatie van van het input BIM model.

De representatie bestaat uit:

* Complex
  * $n \geq 1$
  * Type: ieder IfcClass type dat in het model zit met voorafgaand een "+". Zoals bijvoorbeeld _IfcWall_ ->  _+IfcWall_
  * Groep van volumes dat is verzameld door de IFC objecten 1:1 over te zetten. Deze abstractie gebruikt geen versimpelde representatie van de ramen en deuren zoals de rest van de abstractie wel doet.

#### LoD5.0/LoDv

![Visualisatie van LoD4.2 gebaseerd op het institute IFC model van IAI/KIT](media/07_toepassingen/LoD50.jpg "Visualisatie van LoD4.2 gebaseerd op het institute IFC model van IAI/KIT.")

3D voxelisatie representatie van het model.

De representatie bestaat uit:

* Buitenschil
  * $n \geq 1$
  * Type: _RoofSurface_, _GroundSurface_, _WallSurface_, _Window_ of _Door_
  * Volume dat is gemaakt door alle externe oppervlaktes van de voxelisatie te isoleren. Op basis van van de soort IFC objecten die de voxels snijden kunnen deze oppervlaktes een type gegeven worden. oppervlaktes met hetzelfde type worden samengevoegd.
* Binnenschil
  * $n \geq 1$.
  * Type: geen types geimplementeerd
  * Volume dat per kamer is door alle interne oppervlaktes van de voxelisatie te isoleren. Dit is niet gebaseerd op de IfcSpace objecten maar de ruimte scheidende objecten. De naam en attributen van de kamer kan wel worden gebaseerd op de IfcSpace objecten.

## IFC2GeoJSON
