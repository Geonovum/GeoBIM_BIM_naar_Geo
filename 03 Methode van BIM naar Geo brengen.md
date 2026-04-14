# Methodes van BIM naar Geo Brengen

Er zijn een aantal verschillende mogelijkheden om BIM modellen naar een GIS omgeving te brengen. De methodes kunnen worden ingedeeld in een aantal groepen: 

* Direct BIM/IFC openen en combineren met GEO
* (Gefilterde) 1:1 vertaling van BIM naar GEO
* Shell extractie

Iedere methode heeft een andere uitkomst en kan nuttig zijn voor andere doeleinde.

# Direct BIM/IFC openen

Er zijn softwarepakketten die het mogelijk maken om BIM en GIS modellen te openen in een enkele omgeving/viewer. Dit is voor de gebruiker een erg makkelijke manier van integratie. De eisen waaraan een BIM model moet voldoen zijn simpel en het openen van het model in de GIS omgeving is relatief snel. Dit is ideaal voor renders/visualisaties, visuele analyses en analyses binnen het ecosysteem van de viewer. Echter zijn de applicaties die dit faciliteren vaak commerciële en/of closed source software die een gebruiker binden aan de softwareleverancier die dit aanlevert. Integratie tussen verschillende software van andere leveranciers buiten dit ecosysteem brengt vaak problemen met zich mee. Dit kan een gebruiker beperken tot een relatief kleine selectie aan analyse mogelijkheden. Het maakt het ook lastig om met andere partijen samen te werken en de data al dan niet publiekelijk te delen.

<!-- Iemand met meer kennis kan hier meer info over direct BIM/IFC openen aan toevoegen -->

# Directe 1 op 1 vertaling van IFC naar GeoJSON of CityJSON (CityGML) 

Een andere methode om BIM naar Geo te brengen is een directe, 1 op 1, vertaling van het BIM bestand naar een GEO bestand. Hierbinnen kan onderscheid worden gemaakt tussen de overzetting van de geometrie en de mapping van de attributen. Het verschil tussen de twee is dat een 1:1 mapping de attributen van het IFC model intact houdt terwijl een conversie van de geometrie alleen de geometrie overzet en de attributen negeert. Bij 1:1 mapping wordt altijd ook de geometrie overgezet. Een 1:1 conversie van enkel de geometrie resulteert meestal in structureel andere bestanden (zoals obj) terwijl een 1:1 mapping meestal de IFC structuur (al dan niet in beperkte maten) vasthoud. De bestanden die ontstaan door deze 1:1 mapping kunnen dus worden gezien als een IFC model/structuur met een GIS extensie.

Deze soort omzet is een relatief makkelijk en snel proces. Tijdens de conversie kunnen weinig fouten optreden. Het resulterende bestand kan worden geopend door iedere software die de GIS encoding ondersteunt. In dat opzicht is het veelzijdiger dan de vorige optie die de gebruiker bindt aan een software omgeving. Maar ookal heeft een 1:1 vertaald bestand een GIS encoding, het volgt niet een GIS datamodel. Dit beperkt de bruikbaarheid van deze modellen.

Aanvullend is de overzetting van de geometrie niet een volledig 1:1 vertaling. IFC ondersteund expliciete en impliciete geometrie terwijl de meeste GIS formats enkel expliciete geometrie ondersteund. Dit betekend dat tijdens de conversie de impliciete geometrie moet worden overgezet naar breps of meshes. Dit kan op verschillende detailniveaus. Een hoger detailniveau resulteert in een nauwkeurigere representatie maar vergroot ook de bestandsgrootte van het resulterende GIS bestand.

<figure id="Mesh_van_Geometrie">
      <img src="./media\Mesh_van_Geometrie.png" alt="Meshing van geometrie op verschillend detailniveau"/>
    <figcaption><a class="self-link" href="#fig-Mesh_van_Geometrien"></bdi></a><span class="fig-title">Meshing van dezelfde geometrie op verschillend detailniveau</span></figcaption>
</figure>

## GeoJSON
GeoJSON is een zeer populaire codering voor geospatiale vectorgegevens. GeoJSON wordt breed ondersteund, ook in de meeste implementaties van API’s die voldoen aan de OGC API Features Standard. Echter, GeoJSON heeft opzettelijke beperkingen die het gebruik ervan in bepaalde geospatiale toepassingscontexten verhinderen of beperken. Zo is GeoJSON bijvoorbeeld beperkt tot WGS 84-coördinaten, ondersteunt het alleen de oorspronkelijke Simple Features geometrie-types en heeft het geen concept om features te classificeren op basis van hun type.

Elke IFC-instantie wordt een GeoJSON feature. De properties van deze feature kan men gebruiken om de ifc-entiteit en de attributen weer te geven. 

Voorbeeld input IFC 
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
        {"type": "feature",
        "properties":{
            "IfcEntity":"IfcDoor",
            "color":"#adaaa3",
            "opacity":100,
            "GlobalId":"3eXLmp4cX03h4AXAklt$F2",
            "Name":"31_DO_UN_schuifdeur_1:schuifdeur:1392587",
            "Objecttype":"31_DO_UN_schuifdeur_1:schuifdeur",
            "Tag":"1392587",
            "PredefinedType":"DOOR",
            "OperationType":"NOTDEFINED"
            },
        "geometry":{
            "type":"MultiPolygon",
            "coordinates":[[[[100721.51288806152,432633.53123239137,1.2130001068115257],...
            ,[100722.22003947449,432634.5276217804,1.0929999828338646]]]]
            }
        },
    ]
}
```
Vertaling van BIM naar GEO kan resulteren in een kleinere bestandsgrootte. Wanneer het BIM-model veel impliciete geometrie bevat, beschreven door een functie, resulteert het expliciet maken van deze geometrie, beschreven door grenzen, in een toename van de bestandsgrootte. 

| model | Bestandsgrootte IFC (KB) | Bestandsgrootte GeoJSON 1:1 mapping (KB)*|  
|-|-|-|
| A20 Corridor    | 7.787     | 2.094  |   
| aisc_sculpture_param    | 314   | 4.206 |   
| ifcbridge-model01 | 14.817  | 26.049 |    
| ifcbridge-model04 | 55  | 296 |    
| ifcbridge-model05 | 25 | 205 | 
| tabel_chairs | 705 | 48.641 |
| kievitsweg_R25 | 13.706 | 65.386 |

Een voorbeeld tool om van ifc naar geojson te gaan is [ifc2gis converter](https://citygeometrix.com/ifc2gis/)

## CityGML en CityJSON
Het is ook mogelijk om een 1 op 1 vertaling naar CityGML (of de JSON encoding CityJSON) te maken. Het datamodel van CityGML geeft de optie om IFC types te vertalen naar CityGML types. Zo heeft CityGML de bijvoorbeeld de types "Building", "BuildingPart" en "Buildingroom" voor een gebouw-model of "Bridge", "BridgePart" en "BridgeFurniture" voor een brug-model. Gebruik van deze types bij de 1:1 mapping geeft meer betekenis aan de dataset dan de directe GeoJSON vertaling. De IFC-attributen kan direct worden vertaalt naar de CityGML "attributes".

## Complicaties

Zoals vermeld kunnen veel viewers en analyse software de 1:1 vertaalde GeoJSON, CityJSON of CityGML bestanden openen. Ondanks dat in CityJSON/CityGML het mogelijk is om extra betekenis van het model aan te duiden geld voor al deze modellen dat analyses maar beperkt kunnen worden toegepast. Analysesoftware verwacht vaak een specifiek datamodel. Doordat het vertaalde model hier meestal niet aan voldoet kan dit resulteren in trage, onbetrouwbare of niet functionele analyses.

Bijvoorbeeld: Een zonlichtsimulatie test alle vlakken die mogelijk zonlicht ontvangen. Bij een shell extractie zal deze analyse snel gedaan kunnen worden, zie [shell extractie](#shell-extractie), omdat de buitenkant van een bouwwerk bekend is. Bij een directe 1 op 1 vertaling is dat niet het geval en zal deze analyse op alle oppervlaktes van het model gedaan worden. Dit resulteert een traag proces dat mogelijk niet succesvol is.  

Een ander probleem is dat door het expliciet maken van de impliciete IFC geometrie de 1:1 mappings bestanden erg zwaar kunnen zijn. Een stedelijk model gevuld met deze soort modellen zal veel problemen kunnen geven. IFC modellen hebben soms een kleinere bestandsgrootte en goed geoptimaliseerde IFC of IFCZIP modellen kunnen zelfs enkele malen kleiner zijn.

| Model | Bestandsgrootte IFC (KB) | Bestandsgrootte CityJSON 1:1 mapping (KB) | Bestandsgrootte gefilterde CityJSON 1:1 mapping (KB) | Bestandsgrootte CityJSON LoD3.2 shell extractie (KB) |
| - | - | - | - | - |
| Huis 1    | 490     | 177 (36%)      | 106 (22%)   | 31 (6%)    |
| Huis 2    | 2.511   | 450 (18%)      | 238 (9%)    | 84 (1%)    |
| kantoor 1 | 10.678  | 2.114 (20%)    | 1.094 (10%) | 577 (5%)   |
| kantoor 2 | 20.795  | 16.210 (78%)   | 5.756 (28%) | 667 (3%)   |
| Flat      | 199.709 | 492.584 (246%) | 14.017 (7%) | 3.052 (2%) |

*Enkel de IfcBeam, IfcColumn, IfcCovering, IfcCurtainWall, IfcDoor, IfcMember, IfcPlate, IfcRoof, IfcSlab, IfcWall, IfcWallStandardCase, IfcWindow classes en gerelateerde attributen zijn overgezet

Een beperkte remedie voor de problemen is een gefilterde 1:1 mapping. Hierbij worden alleen de objecten die deel uitmaken van de buitengevel van een gebouw naar de GIS encoding omgezet. Dit kan op een aantal verschillende manieren geïmplementeerd worden maar de meest voorkomende maakt gebruik van een object attribuut (bijvoorbeeld [isExternal](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/property/IsExternal.htm) in IFC). Dit is een gemakkelijke en snelle filtering en zal tijdens de conversie weinig problemen opleveren. Echter vertrouwd deze methode op het correcte gebruik van de attributen door de makers van het model. Het correcte gebruik van attributen kan niet altijd worden gegarandeerd (mensen maken fouten, zijn onbekend met het attribuut of het belang ervan) en mogelijk moet daarom het resulterende model gecorrigeerd worden. Een detectie met behulp van raycasting zoals LoD4.2 van de [IfcEnvelopeExtractor](https://github.com/tudelft3d/IFC_BuildingEnvExtractor) is complexer en trager maar wordt niet beïnvloed door het correct gebruik van attributen.

![Verschil tussen een gefilterde en ongefilterde 1:1 vertaling/mapping](media/03_methodes/VerschilFiltered_1_1.jpg "Wireframe representatie die het verschil tussen een gefilterde (rechts) en ongefilterde (links) 1:1 vertaling/mapping weergeeft")

De filtering binnen de 1:1 mapping kan verder door worden gezet dan alleen de filtering van externe objecten. Zo heeft de [IfcEnvelopeExtractor](https://github.com/tudelft3d/IFC_BuildingEnvExtractor) als output LoDe.1. Dit is een non-standaard output die alleen de externe surfaces van een BIM model bevat. Dit kan worden gezien als een hybride GIS model dat tussen een 1:1 mapping en [shell extractie](#shell-extractie) in valt. Deze hybdride modellen hebben geen volumetrische objecten zoals in 1:1 mappings modellen. Net zoals schil modellen hebben deze hybride modellen een relatief klein aantal surfaces. De hybride modellen hebben ook een kleine bestandsgrootte. Ze onderscheiding zich echter weer van schil modellen doordat ze niet lucht-dicht volumetrisch zijn. Voor sommige GIS gerelateerde operaties zijn deze modellen een uitkomst.

![Verschil tussen een e.1 model en ongefilterde 1:1 vertaling/mapping](media/03_methodes/VerschilFiltered_e_1.jpg "Wireframe representatie die het verschil tussen een e.1 representatie (rechts) en ongefilterde (links) 1:1 vertaling/mapping weergeeft")

# Shell extractie

Een bestand dat een GIS data model volgt kan alleen worden gecreëerd door een vorm van shell extractie. Bij shell extractie wordt een schil model gemaakt van één of meer BIM modellen. De shell extractie draagt bij aan een betere interoperabiliteit, hoewel hierbij een deel van de oorspronkelijke data verloren gaat. Dit geldt zowel voor de geometrie als de attributen. Volumetrische externe objecten zoals wanden en daken worden oppervlaktes die deel zijn van een volumetrische schil. Interne elementen kunnen volledig vervallen. Dit proces is dus ook niet omkeerbaar.

![Wireframe representatie van een BIM en GIS model.](media/2_achtergrond/Verschil_IFC_GIS.JPG "Een wireframe representatie van een BIM model (links) en een exterieur GIS model (rechts).")

Aanvullend is shell extractie een complex proces waarbij problemen kunnen optreden. Schil modellen met een hoge precisie kunnen alleen gecreëerd worden van BIM modellen die voldoen aan strenge eisen. Deze eisen zijn niet alleen semantisch maar ook geometrisch. Dit maakt het lastig om deze eisen af te dwingen met een Informatie Levering Specificatie (ILS/IDS). Maar zelfs als alle eisen nageleefd worden zijn er omstandigheden waar het schil model niet correct gemaakt kan worden.

Schil modellen met een lagere precisie stellen ook lagere eisen aan het BIM model dat verwerkt wordt. Zo kunnen blok modellen of voxelisaties worden gemaakt van bijna alle BIM modellen, ook van schets/klad modellen. Hoe hoger de verwachte precisie van het GIS model, hoe strenger de eisen en hoe complexer het proces om ze te creëren.

Het genereren van schil modellen van BIM bestanden is vooral beschikbaar als expermintele software. Verschillende methodes worden nog steeds ontwikkeld en onderzocht, er is nog geen standaard methode voor deze processen gedefineerd. Dit zorgt ervoor dat de beschikbare software werken met andere methodes en dus ook andere output kunnen genereren op basis van dezelfde BIM input. Daarnaast werken niet alle shell extractie software volgens het LoD framework dat in GIS wordt aangehouden. Zo genereert de toepassing[BIMShell](https://bimshell.app/) alleen een hoge kwaliteit schil en een voxelisatie. De toepassing [IfcEnvelopeExtractor](https://github.com/tudelft3d/IFC_BuildingEnvExtractor) volgt een aangepaste/niet standaard intepretatie van het LoD framework van [Biljecki et al.](https://pure.tudelft.nl/ws/portalfiles/portal/4377508/Biljecki2016to.pdf). Dit zorgt ervoor dat de output erg kan verschillen tussen verschillende toepassingen en software pakketten.

<aside class="note" title="Aanbeveling voor shell-extractie standaard?">
  <p><strong>AANBEVELING:</strong> Welke aanbeveling voor shell-extractie doen wij? </p>
</aside>

Ondanks al deze problemen leveren deze schil modellen op basis van een BIM bron ook erg veel voordelen. De resulterende modellen hebben een kleine bestandsgrootte en worden ondersteunt door vrijwel alle beschikbare GIS software. Deze modellen zijn daarnaast ook de enige modellen die voor complexe GIS analyses gebruikt kunnen worden.

![Verschil tussen huidige 3D bag kwaliteit modellen en de theoretisch mogelijke kwaliteit van BIM gebaseerde GIS schil modellen](media/03_methodes/Verschil_3Dbag_BIM.jpg "De hoogste kwaliteit beschikbare modellen in 3DBAG zijn LoD2.2 modellen (links). Als BIM als GIS geometrie op grote schaal zou kunnen worden toegepast zou dit kunnen worden verrijkt naar LoD3.2/3.3 (rechts).")

Deze schil modellen zijn niet alleen waardevol voor de realisatie of analyse van het gebouw dat is omgezet, maar kunnen ook worden gebruik om bestaande stedelijke modellen aan te vullen of te verrijken. De kwaliteit van BIM modellen is hoger dan die van remote-sensing metinging (zoals laserscans) waarop de meeste stedelijke modellen zijn gebaseerd. De GIS modellen van een BIM bron kunnen daardoor dus ook een hogere kwaliteit/meer detail hebben. GIS schil modellen van een BIM bron kunnen dus aanvullend worden gebruikt in stedelijke GIS modellen. Daarnaast kan een BIM model sneller worden omgezet naar een GIS schil model dan de in-situ metingen meestal worden gedaan. Daardoor kunnen de modellen ook gebruikt worden om een stedelijk model sneller te updaten.

![De spoorzone van Delft is een gebied waar veel nieuwbouw plaatsvind en laat zien dat 3DBAG vertraagd update.](media/03_methodes/3DBAG_missingreps.JPG "De spoorzone van Delft is een gebied waar veel nieuwbouw plaatsvind en laat zien dat 3DBAG vertraagd update. Twee gebouwen zijn wel aanwezig in 2Dbag (de grijze uitlijnen) maar een 3D representatie is nog niet beschikbaar. BIM gebaseerde GIS modellen kunnen hier een uitkomst bieden.")
