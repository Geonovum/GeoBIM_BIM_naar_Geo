# Methodes van BIM naar Geo Brengen

Er zijn een aantal verschillende software pakketten beschikbaar die het mogelijk maken om BIM modellen naar een GIS omgeving te brengen. De methodes die deze applicaties gebruiken kunnen worden ingedeeld in een aantal groepen:

* Direct BIM/IFC openen
* (Gefilterde) 1:1 vertaling/mapping
* Shell extractie

Iedere methode heeft een andere uitkomst en kan nuttig zijn voor andere doeleinde.

# Direct BIM/IFC openen

Er zijn softwarepakketten die het mogelijk maken om BIM en GIS modellen te openen in een enkele omgeving/viewer. Dit is een erg makkelijke manier van integratie. De eisen waaraan een BIM model moet voldoen zijn simpel en het openen van het model in de GIS omgeving is relatief snel. Dit is ideaal voor renders/visualisaties, visuele analyses en analyses binnen de viewer. Echter zijn de applicaties die dit faciliteren vaak commerciële en/of closed source software die een gebruiker binden aan de softwareleverancier die dit aanlevert. Integratie tussen verschillende software van andere leveranciers buiten dit ecosysteem brengt vaak problemen met zich mee. Dit kan een gebruiker beperken tot een relatief kleine selectie aan analyse mogelijkheden. Het maakt het ook lastig om met andere partijen samen te werken en de data al dan niet publiekelijk te delen.

<!-- Iemand met meer kennis kan hier meer info over direct BIM/IFC openen aan toevoegen -->

# 1:1 vertaling

Om vrij te komen van een gesloten software ecosysteem kan worden gekozen voor een 1:1 vertaling van het BIM bestand. Hier binnen kan onderscheid worden gemaakt tussen 1:1 conversie van de geometrie of een complete 1:1 mapping. Het verschil tussen de twee is dat een 1:1 mapping de attributen van het IFC model in tact houd terwijl een 1:1 conversie van de geometrie alleen de geometrie overzet en de attributen negeert.

Zowel een 1:1 conversie van de geometrie als een 1:1 mapping resulteerd in een bestand dat kan worden gezien als een BIM datamodel met een GIS extensie. Deze soort omzet is een makkelijk en relatief snel proces. Tijdens de conversie kunnen weinig fouten optreden. Het resulterende bestand kan worden geopend door iedere software die de GIS encoding ondersteund. In dat opzicht is het veelzijdiger dan de vorige optie die de gebruiker bindt aan een software omgeving.

![Verschil tussen een gefilterde en ongefilterde 1:1 vertaling/mapping](media/03_methodes/VerschilFiltered_1_1.jpg "Wireframe representatie die het verschil tussen een gefilterde (rechts) en ongefilterde (links) 1:1 vertaling/mapping weergeeft")

Een 1:1 vertaald bestand komt met beperkingen. Ookal heeft het bestand een GIS encoding, het volgt niet het GIS datamodel. Dit betekend dat de meeste viewers het bestand wel kunnen openen maar dat analyses maar beperkt gebruik kunnen maken van deze soort bestanden. De analyse software verwacht een ander datamodel en dit kan resulteren in trage, onbetrouwbare of niet functionele analyses. Aanvullend zijn de 1:1 mappings bestanden erg zwaar, een stedelijk model gevuld met deze soort modellen zal veel problemen kunnen geven.

| Model | Bestandsgrootte IFC (KB) | Bestandsgrootte CityJSON 1:1 mapping (KB) | Bestandsgrootte gefilterde CityJSON 1:1 mapping (KB) | Bestandsgrootte CityJSON LoD3.2 shell extractie (KB) |
| - | - | - | - | - |
| Huis 1    | 490     | 177 (36%)      | 106 (22%)   | 31 (6%)    |
| Huis 2    | 2.511   | 450 (18%)      | 238 (9%)    | 84 (1%)    |
| kantoor 1 | 10.678  | 2.114 (20%)    | 1.094 (10%) | 577 (5%)   |
| kantoor 2 | 20.795  | 16.210 (78%)   | 5.756 (28%) | 667 (3%)   |
| Flat      | 199.709 | 492.584 (246%) | 14.017 (7%) | 3.052 (2%) |

Een beperkte remedie voor de bestandsgrootte is een gefilterde 1:1 mapping. Hierbij worden alleen de objecten die deel uitmaken van de buitengevel van een gebouw naar de GIS encoding omgezet. Dit kan op een aantal verschillende manieren geïmplementeerd worden maar de meest voorkomende maakt gebruik van een object attribuut (bijvoorbeeld [isExternal](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/property/IsExternal.htm) in IFC). Dit is een gemakkelijke en snelle filtering en zal tijdens de conversie weinig problemen opleveren. Echter vertrouwd deze methode op het correcte gebruik van de attributen door de makers van het model. Het correcte gebruik van attributen kan niet altijd worden gegarandeerd (mensen maken fouten, zijn onbekend met het attribuut of het belang ervan) en mogelijk moet daarom het resulterende model gecorrigeerd worden.

De 1:1 conversie van alleen de geometrie heeft geometrisch dezelfde beperkingen als de 1:1 mapping. Echter zal het resulterende bestand een kleinere bestandsgrootte hebben door het ontbreken van attribuut data.

# Shell extractie

Een bestand dat het GIS data model volgt kan alleen worden gecreëerd door een vorm van shell extractie. Bij shell extractie wordt een schil model gemaakt van een (of meer) BIM model(len). Dit is een lossy process, zowel voor de geometrie als de attributen gaat data gaat verloren. Volumetrische externe objecten zoals wanden en daken worden non-volumetrische oppervlaktes die deel zijn van een volumetrische schil. Objecten die geen oppervlaktes hebben die deel uitmaken van deze schil zullen volledig vervallen. Door het grote verlies van geometrische data (en de attributen die aan deze geometrie verbonden zijn) is dit proces dus ook niet omkeerbaar.

![Wireframe representatie van een BIM en GIS model.](media/2_achtergrond/Verschil_IFC_GIS.JPG "Een wireframe representatie van een BIM model (links) en een exterieur GIS model (rechts).")

Aanvullen is shell extractie ook een complex proces waarbij problemen kunnen optreden. Schil modellen met een hoge precisie kunnen alleen gecreëerd worden van BIM modellen die voldoen aan strenge eisen. Deze eisen zijn niet alleen semantisch maar ook geometrisch, hierdoor is het lastig deze eisen af te dwingen met een IDS/ILS. Als alle eisen nageleefd worden zijn er helaas nog steeds omstandigheden waar het schil model niet correct gemaakt kan worden.

Echter kan er ook voor worden gekozen om schil modellen te genereren met een lagere precisie. Lagere precisie schil modellen stellen ook lagere eisen aan het BIM model dat verwerkt word. Zo kunnen blok modellen of voxelisaties worden gemaakt van bijna alle BIM modellen, ook van schets/klad modellen. Hoe hoger de verwachte precisie van het GIS model, hoe strenger de eisen en hoe complexer het proces om ze te creëren.

Het geautomatiseerde genereren van schil modellen van BIM bronnen is op dit moment vooral beschikbaar in expermentele software. Verschillende methodes worden nog steeds ontwikkeld en onderzocht, er is dus ook nog geen standaard methode voor deze processen gedefineerd. Dit zorgt ervoor dat de beschikbare software werken met andere methodes en dus ook andere output kunnen genereren op basis van dezelfde BIM input. Daarnaast werken niet alle shell extractie software volgens het LoD framework dat in GIS wordt aangehouden. BIMShell genereerd alleen een hoge kwaliteit schil en een voxelisatie. De IfcEnvelopeExtractor volgt een aangepaste/niet standaard intepretatie van het LoD framework van [Biljecki et al.](https://pure.tudelft.nl/ws/portalfiles/portal/4377508/Biljecki2016to.pdf). Output van beide is erg verschillend.

Ondanks al deze problemen leveren deze schil modellen op basis van een BIM bron ook erg veel voordelen. De resulterende modellen hebben een kleine bestandsgrootte en worden ondersteunt door vrijwel alle beschikbare GIS software. Deze modellen zijn daarnaast ook de enige modellen die voor complexe GIS analyses gebruikt kunnen worden.

![Verschil tussen huidige 3D bag kwaliteit modellen en de theoretisch mogelijke kwaliteit van BIM gebaseerde GIS schil modellen](media/03_methodes/Verschil_3Dbag_BIM.jpg "De hoogste kwaliteit beschikbare modellen in 3DBAG zijn LoD2.2 modellen (links). Als BIM als GIS geometrie op grote schaal zou kunnen worden toegepast zou dit kunnen worden verrijkt naar LoD3.2/3.3 (rechts).")

Deze schil modellen zijn niet alleen waardevol voor de realisatie of analyse van het gebouw dat is omgezet maar kunnen ook worden gebruik om bestaande stedelijke modellen aan te vullen of te verrijken. De kwaliteit van BIM modellen is hoger dan die van remote-sensing metinging (zoals laserscans) waarop de meeste stedelijke modellen zijn gebaseerd. De GIS modellen van een BIM bron kunnen daardoor dus ook een hogere kwaliteit/meer detail hebben. GIS schil modellen van een BIM bron kunnen aanvullend worden gebruikt in stedelijke GIS modellen. Daarnaast kan een BIM model sneller worden omgezet naar een GIS schil model dan de in-situ metingen meestal worden gedaan. Daardoor kunnen de modellen ook gebruikt worden om een stedelijk model sneller te updaten.

![De spoorzone van Delft is een gebied waar veel nieuwbouw plaatsvind en laat zien dat 3DBAG vertraagd update.](media/03_methodes/3DBAG_missingreps.JPG "De spoorzone van Delft is een gebied waar veel nieuwbouw plaatsvind en laat zien dat 3DBAG vertraagd update. Twee gebouwen zijn wel aanwezig in 2Dbag (de grijze uitlijnen) maar een 3D representatie is nog niet beschikbaar. BIM gebaseerde GIS modellen kunnen hier een uitkomst bieden.")

# Hybride extractie

Eventuele middenwegen tussen 1:1 en shell extractie is ook onderzocht. 