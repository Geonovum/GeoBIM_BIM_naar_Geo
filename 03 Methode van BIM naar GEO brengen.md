# Methodes van BIM naar Geo brengen

Er zijn verschillende methodes om BIM-modellen naar een GIS-omgeving te brengen. Ze lopen op van eenvoudig, met weinig eisen aan het BIM-model, tot complex, met strenge eisen maar een beter bruikbaar GIS-model:

1. [Direct BIM/IFC openen in Geo](#direct-bim-ifc-openen-in-geo): BIM- en GIS-modellen worden samen in één softwareomgeving geopend, zonder conversie.
1. [Directe 1-op-1-vertaling](#directe-1-op-1-vertaling): ieder BIM-object wordt omgezet naar een object in een GIS-formaat, zoals GeoJSON of CityJSON.
1. [Gefilterde 1-op-1-vertaling](#gefilterde-1-op-1-vertaling): alleen van een selectie wordt ieder BIM-object omgezet naar een object in een GIS-formaat, bijvoorbeeld alle objecten die samen de buitengevel vormen. Een variant hierop is een hybride model met alleen de buitenoppervlakken (LoDe.1).
1. [Shell-extractie](#shell-extractie): uit het BIM-model wordt een gesloten schil afgeleid die het GIS-datamodel volgt.

Iedere methode heeft een andere uitkomst en past bij andere toepassingen.

## Direct BIM/IFC openen in Geo

Er zijn softwarepakketten die het mogelijk maken om BIM en GIS-modellen te openen in één omgeving of viewer. Dit kan met open en soms ook met gesloten formaat. Dit is voor de gebruiker een makkelijke manier van integratie. De eisen waaraan een BIM-model moet voldoen zijn laag en het openen van het model in de GIS-omgeving is relatief snel. Dit is ideaal voor renders en visualisaties, visuele analyses en analyses binnen het ecosysteem van de viewer. De applicaties die dit faciliteren zijn vaak commerciële en/of closed-source software, die een geïntegreerde en stabiele gebruikerservaring bieden, maar waarbij dit ten koste gaat van interoperabiliteit door de gebondenheid aan het ecosysteem van de leverancier. Integratie tussen verschillende software van andere leveranciers buiten dit ecosysteem brengt vaak problemen met zich mee. Dit kan een gebruiker beperken tot een relatief kleine selectie aan analysemogelijkheden. Het maakt het ook lastig om met andere partijen samen te werken en de data al dan niet publiekelijk te delen.

Voorbeelden (niet limitatief) van toepassingen waarin Geo en BIM in één omgeving kunnen worden geopend zijn: 
- [ArcGIS-GeoBIM](https://www.esri.com/en-us/arcgis/products/arcgis-geobim/) 
- [Autodesk Forma](https://www.autodesk.com/nl/solutions/bim/bim-gis-collaboration) 
- [Autodesk Infraworks](https://www.autodesk.com/learn/ondemand/tutorial/use-the-connector-for-arcgis-to-import-data-into-infraworks), 
- [Autodesk Civil 3D](https://www.autodesk.com/learn/ondemand/module/how-to-connect-arcgis-data-to-infraworks-and-civil-3d) 
- [Bentley OpenCities](https://www.bentley.com/software/opencities-planner/)
- [FME](https://support.safe.com/hc/en-us/articles/25407588693901-Working-with-BIM-Data-and-FME)

Hoewel de onderliggende implementatie van het openen van BIM in Geo doorgaans niet openbaar inzichtelijk is, bieden sommige oplossingen wel transparantie in de vorm van configureerbare en inzichtelijke workflows. Hierdoor is het conversieproces deels te volgen, maar blijft de exacte werking van de software vaak verborgen.

# Directe 1-op-1-vertaling 

Een andere methode om BIM naar Geo te brengen is een zo direct mogelijke 1-op-1 vertaling van alle elementen in het BIM-bestand naar GEO. Hierbinnen kan onderscheid worden gemaakt tussen alleen de directe vertaling van de geometrie of een complete directe mapping inclusief attributen. Het verschil tussen de twee is dat de mapping inclusief de attributen ook de attributen van het IFC-model zo veel als mogelijk intact houdt, terwijl een conversie van de geometrie alleen de geometrie overzet en de attributen negeert. Een 1-op-1-conversie van enkel de geometrie resulteert meestal in structureel andere bestanden (zoals obj) terwijl een 1-op-1-mapping meestal de IFC-structuur (in beperkte mate) vasthoudt. De bestanden die ontstaan door deze 1-op-1-mapping kunnen dus worden gezien als een IFC-model/structuur met een GIS-extensie. Eén IFC-instantie resulteert in dit geval in één feature. 

Dit soort omzetting is een makkelijk en relatief snel proces. Tijdens de conversie kunnen weinig fouten optreden. Het resulterende bestand kan worden geopend door iedere software die de GIS-encoding ondersteunt. In dat opzicht is het veelzijdiger dan de vorige optie die de gebruiker bindt aan een softwareomgeving. Maar ook al heeft een 1-op-1 vertaald bestand een GIS-encoding, het voldoet niet aan een GIS-datamodel. Ook zijn lang niet alle IFC-attributen te mappen naar Geo-attributen en vice versa. Dit beperkt de bruikbaarheid van deze modellen.

Aanvullend is de overzetting van de geometrie geen volledige 1-op-1-vertaling. Impliciete IFC-geometrie moet tijdens de conversie worden omgezet naar expliciete geometrie. Hoe nauwkeurig dat gebeurt, bepaalt mede de bestandsgrootte van het resultaat (zie [Meshing](#meshing)).

## Vertaling naar GeoJSON
Het GeoJSON-formaat zelf is beschreven in het hoofdstuk [GeoBIM informatielandschap](#geojson). Bij een 1-op-1-vertaling wordt elke IFC-instantie één GeoJSON-feature. Drie eigenschappen van GeoJSON bepalen hoe die vertaling eruitziet:

* **Geen objecttypen.** GeoJSON kent geen classificatie van features. De IFC-entiteit (bijvoorbeeld `IfcDoor`) en de IFC-attributen worden daarom als gewone properties opgenomen.
* **Alleen eenvoudige geometrietypen.** GeoJSON ondersteunt punten, lijnen en vlakken (Simple Features), maar geen volumes. Een volumetrisch IFC-object wordt daardoor een verzameling losse vlakken (`MultiPolygon`).
* **WGS 84-coördinaten.** Volgens de standaard gebruikt GeoJSON lengte- en breedtegraad in WGS 84. Coördinaten uit een RD-georefereerd BIM-model moeten dus worden omgerekend.

Voorbeeld input IFC van een deur
```step
#14632=IFCLOCALPLACEMENT(#39,#14631);
#14638=IFCARBITRARYPROFILEDEFWITHVOIDS(.AREA.,'schuifdeur',#14635,(#14637));
#14639=IFCCARTESIANPOINT((-610.4975218658434,90.,1173.));
#14640=IFCAXIS2PLACEMENT3D(#14639,#8,#6);
#14641=IFCEXTRUDEDAREASOLID(#14638,#14640,#9,45.000000000000014);
#14647=IFCCARTESIANPOINT((610.49752186588501,190.,1173.));
#14648=IFCAXIS2PLACEMENT3D(#14647,#8,#6);
#14649=IFCEXTRUDEDAREASOLID(#14646,#14648,#9,44.999999999999957);
#14673=IFCSHAPEREPRESENTATION(#24,'Body','SweptSolid',(#14641,#14649,#14657,#14665));
#14674=IFCAXIS2PLACEMENT3D(#3,$,$);
#14675=IFCREPRESENTATIONMAP(#14674,#14673);
#14681=IFCMAPPEDITEM(#14675,#14680);
#14682=IFCSHAPEREPRESENTATION(#24,'Body','MappedRepresentation',(#14681));
#14683=IFCPRODUCTDEFINITIONSHAPE($,$,(#14682));
#14676=IFCDOORLININGPROPERTIES('3eXLmp4cX03h4AXAglt$F2',#18,'31_DO_UN_schuifdeur_1:schuifdeur:1392587',$,$,$,$,$,$,$,$,$,$,$,$,$,$);
#14677=IFCDOORPANELPROPERTIES('3eXLmp4cX03h4AXAclt$F2',#18,'31_DO_UN_schuifdeur_1:schuifdeur:1392587:1',$,$,.NOTDEFINED.,$,.NOTDEFINED.,$);
#14678=IFCDOORTYPE('1OJKL0e9$_jjm9svY6UTPd',#18,'31_DO_UN_schuifdeur_1:schuifdeur',$,$,(#14676,#14677),(#14675),'1879716',$,.DOOR.,.NOTDEFINED.,$,$);
#14679=IFCMATERIAL('Materiaal RAL 7039',$,'Paint');
#14687=IFCCARTESIANPOINT((21710.,1853.0049562681011,66.999999998957193));
#14688=IFCAXIS2PLACEMENT3D(#14687,#9,#8);
#14689=IFCLOCALPLACEMENT(#14632,#14688);
#14690=IFCDOOR('3eXLmp4cX03h4AXAklt$F2',#18,'31_DO_UN_schuifdeur_1:schuifdeur:1392587',$,'31_DO_UN_schuifdeur_1:schuifdeur',#14689,#14683,'1392587',2346.0000000001569,2720.995043731768,.DOOR.,.NOTDEFINED.,$);
```
Resulteert na vertaling naar GeoJSON in: 

```json
{
    "type":"FeatureCollection",
    "features":[
        {
            "type": "Feature",
            "properties": {
                "IfcEntity": "IfcDoor",
                "color": "#adaaa3",
                "opacity": 100,
                "GlobalId": "3eXLmp4cX03h4AXAklt$F2",
                "Name": "31_DO_UN_schuifdeur_1:schuifdeur:1392587",
                "Objecttype": "31_DO_UN_schuifdeur_1:schuifdeur",
                "Tag": "1392587",
                "PredefinedType": "DOOR",
                "OperationType": "NOTDEFINED"
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [[[[4.5989088, 51.8795927, 1.213], ...
                    , [4.5989190, 51.8796017, 1.093]]]]
            }
        }
    ]
}
```
Vertaling van BIM naar GEO kan resulteren in een kleinere bestandsgrootte. Maar wanneer het BIM-model veel impliciete geometrie bevat, beschreven door een functie, resulteert het expliciet maken van deze geometrie, beschreven door grenzen en coördinaten, juist in een toename van de bestandsgrootte. 
 
| model | Bestandsgrootte IFC (KB) | Bestandsgrootte GeoJSON 1-op-1-mapping (KB)|  
|-|-|-|
| A20 Corridor    | 7.787     | 2.094  |   
| aisc_sculpture_param    | 314   | 4.206 |   
| ifcbridge-model01 | 14.817  | 26.049 |    
| ifcbridge-model04 | 55  | 296 |    
| ifcbridge-model05 | 25 | 205 | 
| tabel_chairs | 705 | 48.641 |
| kievitsweg_R25 | 13.706 | 65.386 |

Een voorbeeld van een tool om IFC naar GeoJSON te converteren is [ifc2gis-converter](https://citygeometrix.com/ifc2gis/)

## CityGML en CityJSON
Het is ook mogelijk om een IFC 1-op-1-vertaling naar de CityGML (JSON encoding) te maken. Het datamodel van CityGML geeft de optie om IFC-types te vertalen naar CityGML-types. Zo heeft CityGML bijvoorbeeld de types "Building", "BuildingPart" en "BuildingRoom" voor een gebouwmodel of "Bridge", "BridgePart" en "BridgeFurniture" voor een brugmodel. Gebruik van deze types bij de 1-op-1-mapping geeft meer betekenis aan de dataset dan de directe GeoJSON-vertaling. De IFC-attributen kunnen direct worden vertaald naar de CityGML "attributes".

## Complicaties

Zoals vermeld kunnen veel viewers en analysesoftware de 1-op-1 vertaalde GeoJSON, CityJSON of CityGML-bestanden openen. Hoewel het in CityJSON/CityGML mogelijk is om extra betekenis van het model aan te duiden, geldt voor al deze 1-op-1 vertaalde modellen dat analyses maar beperkt kunnen worden toegepast. Analysesoftware verwacht vaak een specifiek geo-gebaseerd datamodel. Doordat het vertaalde 1-op-1-model hier niet aan voldoet, kan dit resulteren in trage, onbetrouwbare of niet-functionele analyses.

Bijvoorbeeld: Een zonlichtsimulatie test alle vlakken die mogelijk zonlicht ontvangen. Bij een shell-extractie zal deze analyse snel gedaan kunnen worden, zie [shell-extractie](#shell-extractie), omdat met deze abstractie de buitenkant van een bouwwerk bekend is. Bij een directe 1-op-1-vertaling is dat niet het geval en zal deze analyse op alle oppervlaktes van het model gedaan moeten worden. Dit resulteert in een traag proces dat mogelijk niet succesvol is.   

Een ander probleem is dat door het expliciet maken van de impliciete IFC-geometrie, de bestanden van een  1-op-1-mapping kunnnen erg zwaar zijn. Een stedelijk model gevuld met dit soort modellen zal veel problemen kunnen geven. De oorspronkelijke IFC-modellen hebben daarom soms een kleinere bestandsgrootte. Goed geoptimaliseerde IFC- of IFCZIP-modellen kunnen zelfs enkele malen kleiner zijn.

| Model | Bestandsgrootte IFC (KB) | Bestandsgrootte CityJSON 1-op-1-mapping (KB) | Bestandsgrootte gefilterde CityJSON 1-op-1-mapping (KB)* | Bestandsgrootte CityJSON LoD3.2 shell-extractie (KB) |
| - | - | - | - | - |
| Huis 1    | 490     | 177 (36%)      | 106 (22%)   | 31 (6%)    |
| Huis 2    | 2.511   | 450 (18%)      | 238 (9%)    | 84 (3%)    |
| kantoor 1 | 10.678  | 2.114 (20%)    | 1.094 (10%) | 577 (5%)   |
| kantoor 2 | 20.795  | 16.210 (78%)   | 5.756 (28%) | 667 (3%)   |
| Flat      | 199.709 | 492.584 (246%) | 14.017 (7%) | 3.052 (2%) |

*Enkel de IfcBeam-, IfcColumn-, IfcCovering-, IfcCurtainWall-, IfcDoor-, IfcMember-, IfcPlate-, IfcRoof-, IfcSlab-, IfcWall-, IfcWallStandardCase- en IfcWindow-klassen en gerelateerde attributen zijn overgezet

# Gefilterde 1-op-1-vertaling
Een beperkte remedie voor de grote bestanden die ontstaan bij een directe 1-op-1-vertaling is een gefilterde 1-op-1-mapping. Hierbij worden alleen specifieke objecten vertaald. Bijvoorbeeld alleen objecten die deel uitmaken van de buitengevel van een gebouw zet men om naar een GIS-encoding. Dit kan op een aantal verschillende manieren geïmplementeerd worden. De meest voorkomende maakt gebruik van een objectattribuut (bijvoorbeeld [isExternal](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/property/IsExternal.htm) in IFC). Dit is een gemakkelijke en snelle filtering en zal tijdens de conversie weinig problemen opleveren. Deze methode vertrouwt echter op het correcte gebruik van de attributen door de makers van het model. Het correcte gebruik van attributen kan niet altijd worden gegarandeerd. Mensen maken fouten of zijn onbekend met het attribuut of het belang ervan. Mogelijk moet daarom het resulterende model gecorrigeerd worden. Een detectie met behulp van raycasting zoals LoD4.2 van de [IfcEnvelopeExtractor](https://github.com/tudelft3d/IFC_BuildingEnvExtractor) is complexer en trager maar wordt niet beïnvloed door het correct gebruik van attributen.

![Verschil tussen een gefilterde en ongefilterde 1-op-1-vertaling/mapping](media/03_methodes/VerschilFiltered_1_1.jpg "Wireframe-representatie die het verschil tussen een gefilterde (rechts) en ongefilterde (links) 1-op-1-vertaling/mapping weergeeft")

De filtering binnen de 1-op-1-mapping kan verder door worden gezet dan alleen de filtering van externe objecten. Zo heeft de [IfcEnvelopeExtractor](https://github.com/tudelft3d/IFC_BuildingEnvExtractor) als een van de mogelijke outputs LoDe.1. Deze output bevat alleen de externe surfaces van een BIM-model. Dit kan worden gezien als een hybride GIS-model dat tussen een 1-op-1-mapping en [shell-extractie](#shell-extractie) in valt. Deze hybride modellen hebben geen volumetrische objecten zoals in modellen uit een 1-op-1-mapping. Net zoals schilmodellen hebben deze hybride modellen een relatief klein aantal surfaces. De hybride modellen hebben ook een kleine bestandsgrootte. Ze onderscheiden zich echter weer van schilmodellen doordat ze niet lucht-dicht (waterdicht) volumetrisch zijn. Voor sommige GIS-gerelateerde operaties zijn deze modellen echter een uitkomst.

Ook is het mogelijk om specifieke entiteiten om te zetten. Zo kan men kiezen om wel de muren (geclassificeerd als IfcWall) maar niet het meubilair (geclassificeerd als IfcFurniture) 1-op-1 te vertalen.

# Shell-extractie

Een bestand dat volledig een GIS-datamodel volgt, kan alleen worden gecreëerd door een vorm van shell-extractie toe te passen. Bij shell-extractie wordt een schilmodel gegenereerd van een BIM-model. Dit is dus een ander principe dan het hierboven genoemde 'filteren' op basis van een bepaald attribuut of eigenschap. De shell-extractie draagt bij aan een betere interoperabiliteit, hoewel hierbij een deel van de oorspronkelijke data verloren gaat. Dit geldt zowel voor de geometrie als de attributen. Volumetrische externe objecten zoals wanden (buitenmuren) en daken worden oppervlaktes die deel zijn van een volumetrische schil. Interne elementen kunnen volledig vervallen. Dit proces is dus ook niet omkeerbaar.

![Wireframe-representatie van een BIM en GIS-model.](media/2_achtergrond/Verschil_IFC_GIS.JPG "Een wireframe-representatie die het verschil tussen een bron-BIM-model (links) en een GIS-model (rechts) na shell-extractie weergeeft")

Aanvullend is shell-extractie een complex proces waarbij problemen kunnen optreden, mede afhankelijk van de kwaliteit van de inputmodellen. Schilmodellen met een hoge precisie kunnen alleen gecreëerd worden indien de input BIM-modellen voldoen aan strenge eisen. Deze eisen zijn niet alleen semantisch (dat wil zeggen eisen om specifieke attributen te gebruiken) maar ook geometrisch. Dit maakt het lastig om deze eisen af te dwingen met een InformatieLeveringSpecificatie (ILS/IDS). Zelfs als alle eisen nageleefd worden, zijn er situaties waarbij het schilmodel niet correct gemaakt kan worden.

Schilmodellen met een lagere nauwkeurigheid of precisie stellen lagere eisen aan het input BIM-model. Zo kunnen blokmodellen of voxelisaties worden gemaakt van bijna alle BIM-modellen, ook van schets- en kladmodellen. Hoe hoger de verwachte precisie van het GIS-model, hoe strenger de eisen aan het inputmodel en hoe complexer het proces om de shell-extractie te creëren.

Het genereren van schilmodellen van BIM-bestanden is momenteel vooral beschikbaar in experimentele onderzoekssoftware. Verschillende methodes worden nog steeds (door)ontwikkeld en onderzocht. Er is nog geen standaard methode voor deze conversie. De beschikbare softwareoplossingen werken op basis van verschillende methodes en kunnen daardoor ook andere output genereren op basis van dezelfde BIM input. Daarnaast werkt niet alle shell-extractie software volgens het LoD framework dat in GIS wordt aangehouden. Zo genereert de toepassing [BIMShell](https://bimshell.app/) alleen een schil van hoge kwaliteit en een voxelisatie. De toepassing [IfcEnvelopeExtractor](https://github.com/tudelft3d/IFC_BuildingEnvExtractor) volgt een aangepaste interpretatie van het LoD framework van [Biljecki et al.](https://pure.tudelft.nl/ws/portalfiles/portal/4377508/Biljecki2016to.pdf). Output kan daardoor verschillen tussen verschillende toepassingen en softwarepakketten.

<aside class="note" title="Shell-extractie metadata">
  <p><strong>AANBEVELING:</strong> Leg bij shellextractie vast welke software, welk LoD-niveau, welke parameters en welke extrusiebron is gebruikt, zodat de output reproduceerbaar en vergelijkbaar is. </p>
</aside>

Ondanks deze problemen leveren deze schilmodellen, gegenereerd op basis van een BIM-bron, ook veel voordelen. De resulterende modellen hebben een kleine bestandsgrootte en worden ondersteund door vrijwel alle beschikbare GIS-software. Deze modellen zijn daarnaast ook het meest geschikt vanwege hun geometrische kwaliteit voor complexe GIS analyses.

![Verschil tussen de kwaliteit van de modellen van de huidige 3DBAG en de theoretisch mogelijke kwaliteit van BIM-gebaseerde GIS-schilmodellen](media/03_methodes/Verschil_3Dbag_BIM.jpg "De modellen in de 3DBAG met de hoogste kwaliteit zijn de LoD2.2 modellen (links). GIS-geometrie op basis van BIM-modellen zou hogere kwaliteit modellen in LoD3.2/LoD3.3 (rechts) kunnen leveren.")

Deze schilmodellen zijn niet alleen waardevol voor de realisatie of analyse van het gebouw dat is omgezet (ook in relatie tot de omgeving) maar zij kunnen ook worden gebruikt om bestaande stedelijke modellen aan te vullen of te verrijken. BIM-modellen bevatten meer geometrisch detail dan een remote-sensingmeting (zoals laserscans) waarop de meeste stedelijke modellen zijn gebaseerd. De GIS-modellen van een BIM bron kunnen daardoor dus ook een hogere kwaliteit/meer detail bieden. GIS-schilmodellen van een BIM bron kunnen aanvullend worden gebruikt in stedelijke GIS-modellen. Daarnaast kan een beschikbaar BIM-model van een nieuw gebouw sneller worden omgezet naar een GIS-schilmodel dan dat dit gebouw kan worden ingemeten en omgezet kan worden naar een GIS-model. Daardoor kunnen de modellen ook gebruikt worden om een stedelijk model sneller te updaten. Een belangrijke voorwaarde hiervoor is dat de BIM-modellen van deze nieuwe gebouwen beschikbaar zijn.

![De spoorzone van Delft is een gebied waar veel nieuwbouw plaatsvindt en laat zien dat 3DBAG met vertraging wordt bijgewerkt.](media/03_methodes/3DBAG_missingreps.JPG "De spoorzone van Delft is een gebied waar veel nieuwbouw plaatsvindt en laat zien dat 3DBAG vertraagd update. Twee gebouwen zijn wel aanwezig in 2DBAG (de grijze omtrekken) maar een 3D-representatie is nog niet beschikbaar. BIM-gebaseerde GIS-modellen kunnen hier een uitkomst bieden, indien BIM-modellen beschikbaar zijn.")


# Vergelijking van de methodes

De tabel hieronder zet bovenstaande methodes naast elkaar. De tabel laat zien dat geen enkele methode voor alle toepassingen de beste is. De beoogde toepassing bepaalt wat zwaarder weegt: snelheid, interoperabiliteit, volledigheid van de informatie, bestandsgrootte of analysemogelijkheden.

| | Direct openen | 1-op-1-vertaling | Gefilterde 1-op-1-vertaling | Hybride model (LoDe.1) | Shell-extractie |
|---|---|---|---|---|---|
| **Eisen aan het BIM-model** | Laag | Laag | Laag tot middel: afhankelijk van correct gebruik van attributen zoals IsExternal | Middel | Hoog: semantisch én geometrisch |
| **Conversieproces** | Geen conversie | Eenvoudig en snel | Eenvoudig (filter op attribuut) of complexer (detectie met raycasting) | Complex | Complex, vooral experimentele software |
| **Interoperabiliteit** | Laag: gebonden aan het ecosysteem van de leverancier | Open GIS-formaat, maar volgt geen GIS-datamodel | Open GIS-formaat, maar volgt geen GIS-datamodel | Open GIS-formaat, deels aansluitend op GIS-datamodel | Hoog: volgt het GIS-datamodel |
| **Bestandsgrootte** | Groot | Groot, kan groter worden dan het IFC-bestand | Kleiner (circa 7–28% van IFC) | Klein | Klein (circa 1–6% van IFC) |
| **Analysemogelijkheden** | Alleen binnen de software | Beperkt en vaak traag | Beperkt | Geschikt voor een deel van de GIS-bewerkingen (niet waterdicht) | Ruim, ook complexe ruimtelijke analyses |
| **Informatieverlies** | Geen | Weinig: niet alle attributen zijn te mappen | Objecten buiten het filter vervallen | Volumes en interne objecten vervallen | Veel, en niet omkeerbaar |
| **Geschikt voor** | Visualisatie en analyses in één softwarepakket | Visualisatie en delen in een open formaat | Visualisatie van het exterieur met lichtere bestanden | Visualisatie in een 3D-stadsmodel | Analyses, aanvullen en actualiseren van stedelijke modellen |


