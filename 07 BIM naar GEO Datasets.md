# BIM naar Geo-datasets

Op het moment van schrijven worden BIM-modellen beperkt ingezet als bron voor het voeden van geo-basisregistraties en landelijke of regionale geo-datasets. In de praktijk worden deze registraties veelal bijgewerkt via afzonderlijke, vernieuwde inmetingen, administratieve processen of andere gegevensbronnen. De toenemende beschikbaarheid van kwalitatief hoogwaardige open BIM-modellen biedt een kans om dit proces te verbeteren. Door relevante gegevens uit BIM-modellen op een gestandaardiseerde en geautomatiseerde wijze te ontsluiten, kunnen geo-datasets actueler, consistenter en efficiënter worden gecreëerd en beheerd, terwijl dubbele gegevensverzameling wordt verminderd.

Om een BIM-model te kunnen converteren naar een geo-dataset, moet het voldoen aan vooraf gedefinieerde modeleisen. Als de benodigde geometrie, attributen of classificaties in BIM ontbreken, kan geo-informatie voor een bepaalde geo-dataset niet of niet volledig uit het BIM-model worden afgeleid. De modeleisen voor BIM verschillen per geo-dataset. Dit komt doordat elke geo-datasets een eigen informatiemodel, objectdefinities en attribuutvereisten kent. Het beoogde doel (de target geo-dataset) bepaalt daarom welke informatie in het BIM-model aanwezig moet zijn om een succesvolle conversie mogelijk te maken.

## Overzicht van landelijke datasets
Onderstaande tabel geeft een aantal landelijke en regionale datasets, met het informatiemodel en het LOD van de geometrie. De tabel is niet uitputtend.

Overzicht van een aantal nationale/regionale datasets 

| Naam | Informatiemodel/structuur | Geometrie LOD | Domein |
|--|--|--|--|
|BGT| IMBGT [[IMGEO]]| LOD0 |  Landelijke grootschalige topografie (Infra en gebouwen)|
|BAG| [IMBAG](https://www.geobasisregistraties.nl/documenten/2018/03/12/catalogus-2018) | LOD0 | Landelijk (NL) (gebouwen) |
|3DBAG| [3DBAG Schema](https://docs.3dbag.nl/nl/schema/layers/) | lod12_3d, lod12_2d, lod13_3d, lod13_2d,lod22_3d, lod22_2d | Landelijk (NL) (gebouwen)|
|3DBasisvoorziening| [Productbeschrijving 3D Basisvoorziening](https://3d.kadaster.nl/productbeschrijving/) | LOD2.2 en LOD1.3 voor gebouwen, LOD1.2 voor wegen, water en terrein | Landelijk (NL) (gebouwen)|
|NWB|[NWB Basisstructuur](https://docs.ndw.nu/handleidingen/nwb/nwb-basisstructuur/) |LOD0 | Landelijk, wegennet (NL)|
|SpoorInBeeld |[spoorinbeeld datastructuur](https://360geo.freshdesk.com/support/solutions/articles/103000031417-datastructuur-algemeen-or-datastructure-in-general)|nvt (Pointclouds en luchtfoto's)| 3D Spoortracés Nederland|
|Beeldmateriaal |[Beeldmateriaal product en dienstcatalogus](https://cuatro.sim-cdn.nl/beeldmateriaal/uploads/gebruikershandleiding_beeldmateriaal_0.pdf?cb=9ScYg8fF)|nvt (Pointclouds en luchtfoto's)|Landelijk / stedelijk|
|1GiS|[Data-eisen 1GIS](https://standaarden.rws.nl/#/standaard/6058-1-1)|LOD0| Landelijk, beheerde water/wegen-infrastructuur|
|assetmanagementmodellen|IMBOR [[IMBOR]]|LOD0 (gekoppeld aan IMBGT)| Assetbeheer openbare ruimte| 

## BIM-eisen per Geo-dataset
De vereisten die per Geo-dataset gesteld moeten worden aan een BIM-model zijn op te delen in twee categorieën: geometrische vereisten en semantische vereisten. De geometrische vereisten beschrijven de benodigde geometrische representatie en het vereiste detailniveau (LOD), terwijl de semantische vereisten betrekking hebben op de benodigde attributen, classificaties en eigenschappen voor de betreffende geo-dataset. De vereisten stelt men vast in informatieleveringsspecificaties (ILS'en). Hoe een ILS is opgebouwd en welke generieke eisen gelden, staat in [InformatieLeveringsSpecificatie (ILS)](#informatieleveringsspecificatie-ils-en-information-delivery-specification-ids).


Het opdelen van ILS'en in afzonderlijke specificaties maakt hergebruik van informatie-eisen mogelijk. Door geometrische eisen en semantische eisen apart te definiëren, kunnen onderdelen van een ILS opnieuw worden toegepast voor verschillende geo-datasets. Hierdoor hoeft niet voor iedere nieuwe toepassing een volledige ILS opnieuw te worden opgesteld en kunnen bestaande specificaties efficiënter worden beheerd en onderhouden. Zo kan de ILS-Gebouw-LOD0vlak worden hergebruikt voor BGT en BAG. De conversie verschilt wel: de BGT gebruikt de voetafdruk op maaiveld, de BAG het bovenaanzicht (dakomtrek volgens de BAG-regels (zonder dakoverstekken)), zie [Uitbreidingen & aanpassingen van de LOD-frameworks](#uitbreidingen-aanpassingen-van-de-lod-frameworks). Ook een generieke ILS-Basisregistratie, met begrippen als identificatie, objectBegintijd, objectEindtijd, relatieveHoogteligging en status, kan bij meerdere registraties worden hergebruikt. Hoe de levenscyclus per registratie verschilt, staat in [Toepassing van levenscyclus in basisregistraties](#toepassing-van-levenscyclus-in-basisregistraties).


## Toepassingsprofielen
Onderstaand overzicht laat zien hoe verschillende ILS'en in samenhang kunnen worden toegepast voor landelijke datasets. Bij elke dataset hoort een transformatieprofiel, bijvoorbeeld BIM2BGT: de afspraken over de LOD-definitie, de ILS, de object- en attribuutmapping en de transformatieregels, zoals aanbevolen in [Uitbreidingen & aanpassingen van de LOD-frameworks](#uitbreidingen-aanpassingen-van-de-lod-frameworks). De eisen die in deze ILS'en thuishoren, zijn uitgewerkt in [Van BIM-eis naar Geo-product](#van-bim-eis-naar-ils-naar-geo-product); de tabel in [Overzicht: welke eisen bij welk Geo-product](#overzicht-van-eisen-per-geo-product) geeft per Geo-product dezelfde samenstelling van ILS'en. Het overzicht is verkennend en bedoeld als inspiratie voor verdere uitwerking.


| ILS Objectgeometrie | ILS Semantiek | Transformatieprofiel | Dataset | 
|--|--|--|--|
| <span class="nowrap">ILS-Gebouw-LOD0vlak<br>ILS-Weg-LOD0vlak<br>ILS-Brug-LOD0vlak<br>ILS-Spoor-LOD0lijn<br>ILS-Terrein-LOD0vlak<br>ILS-Water-LOD0vlak<br>ILS-Meubilair-LOD0punt</span> | <span class="nowrap">ILS-Gebouw<br>ILS-Weg<br>ILS-Brug<br>ILS-Spoor<br>ILS-Terrein<br>ILS-Water<br>ILS-Meubilair<br>ILS-Basisregistratie<br>ILS-BGT</span> |BIM2BGT|BGT|
| <span class="nowrap">ILS-Gebouw-LOD0vlak</span> | <span class="nowrap">ILS-Gebouw<br>ILS-Basisregistratie<br>ILS-BAG</span> |BIM2BAG2D|BAG|
| <span class="nowrap">ILS-Gebouw-LOD12volume<br>ILS-Gebouw-LOD13volume<br>ILS-Gebouw-LOD22volume</span> | <span class="nowrap">ILS-Gebouw<br>ILS-Basisregistratie<br>ILS-BAG</span> |BIM2BAG3D| 3D BAG|
| <span class="nowrap">ILS-Weg-LOD12multivlak<br>ILS-Gebouw-LOD13volume<br>ILS-Gebouw-LOD22volume</span> | <span class="nowrap">ILS-Weg<br>ILS-Gebouw<br>ILS-Basisregistratie<br>ILS-3DBasisvoorziening</span> | BIM2BV3D |3D basisvoorziening|
| <span class="nowrap">ILS-Weg-LOD0lijn</span> | <span class="nowrap">ILS-Weg<br>ILS-NWB</span> |BIM2NWB |NWB |
| <span class="nowrap">ILS-Bebouwing-LOD0vlak<br>ILS-Bebouwing-LOD0lijn<br>ILS-Bebouwing-LOD0punt<br>etc.</span> | <span class="nowrap">ILS-Bebouwing<br>ILS-1GIS</span> |BIM21GIS | 1 GIS |
| <span class="nowrap">ILS-Gebouw-LOD0vlak<br>ILS-Weg-LOD0vlak<br>ILS-Brug-LOD0vlak<br>ILS-Spoor-LOD0lijn<br>ILS-Terrein-LOD0vlak<br>ILS-Water-LOD0vlak<br>ILS-Meubilair-LOD0punt</span> | <span class="nowrap">ILS-Gebouw<br>ILS-Weg<br>ILS-Brug<br>ILS-Spoor<br>ILS-Terrein<br>ILS-Water<br>ILS-Meubilair<br>ILS-IMBOR</span> | BIM2IMBOR |  IMBOR |


