# BIM naar Geo-datasets


Op het moment van schrijven worden BIM-modellen beperkt ingezet als bron voor het voeden van geo-basisregistraties en landelijke of regionale geo-datasets. In de praktijk worden deze registraties veelal bijgewerkt via afzonderlijke inmetingen, administratieve processen of andere gegevensbronnen. De toenemende beschikbaarheid van kwalitatief hoogwaardige open BIM-modellen biedt een kans om dit proces te verbeteren. Door relevante gegevens uit BIM-modellen op een gestandaardiseerde en geautomatiseerde wijze te ontsluiten, kunnen geo-datasets actueler, consistenter en efficiënter worden gecreëerd en beheerd, terwijl dubbele gegevensverzameling wordt verminderd.

Om een BIM-model te kunnen converteren naar een geo-dataset, moet het voldoen aan vooraf gedefinieerde modeleisen. Als de benodigde geometrie, attributen of classificaties in BIM ontbreken, kan geo-informatie voor een bepaalde geo-dataset niet of niet volledig uit het BIM-model worden afgeleid. De modeleisen voor BIM verschillen per geo-dataset. Dit komt doordat elke geo-datasets een eigen informatiemodel, objectdefinities en attribuutvereisten heeft. Het beoogde doel (de target geo-dataset) bepaalt daarom welke informatie in het BIM-model aanwezig moet zijn om een succesvolle conversie mogelijk te maken.

Onderstaande tabel geeft een aantal belangrijke landelijke datasets weer inclusief het informatiemodel dat wordt gebruikt en het Level Of Detail van de geometrie. De onderstaand weergegeven tabel is niet limitatief:

Overzicht van een aantal nationale/regionale datasets 

| Naam	| informatiemodel/structuur | Geometrie LOD | Domein| 
|--|--|--|--|
|BGT| [IMBGT](https://docs.geostandaarden.nl/imgeo/catalogus/bgt/)| LOD 0 |  Landelijke grootschalige topografie (Infra en gebouwen)|
|BAG| [IMBAG](https://www.geobasisregistraties.nl/documenten/2018/03/12/catalogus-2018) | LOD 0 |	Landelijk (NL) (gebouwen) |
|3DBAG| [3DBAG Schema](https://docs.3dbag.nl/nl/schema/layers/) | lod12_3d, lod12_2d, lod13_3d, lod13_2d,lod22_3d, lod22_2d | Landelijk (NL) (gebouwen)|
|3DBasisvoorziening| [Productbeschrijving 3D Basisvoorziening](https://3d.kadaster.nl/productbeschrijving/) | lod2.2, lod1.3 voor gebouwen Lod1.2 voor wegen, water en terrein | Landelijk (NL) (gebouwen)|
|NWB|[NWB Basisstructuur](https://docs.ndw.nu/handleidingen/nwb/nwb-basisstructuur/) |LOD 0 |	Landelijk, wegennet (NL)|
|SpoorInBeeld |[spoorinbeeld datastructuur](https://360geo.freshdesk.com/support/solutions/articles/103000031417-datastructuur-algemeen-or-datastructure-in-general)|nvt (Pointclouds en luchtfoto's)|	3D	Spoortracés Nederland|
|Beeldmateriaal	|[Beeldmateriaal product en dienstcatalogus](https://cuatro.sim-cdn.nl/beeldmateriaal/uploads/gebruikershandleiding_beeldmateriaal_0.pdf?cb=9ScYg8fF)|nvt (Pointclouds en luchtfoto's)|Landelijk / stedelijk|
|1GiS|[Data-eisen 1GIS](https://standaarden.rws.nl/#/standaard/6058-1-1)|LOD 0| Landelijk, beheerde water/wegen-infrastructuur|
|assetmanagementmodellen|[IMBOR](https://www.crow.nl/Onderwerpen/assetmanagement-en-beheer-openbare-ruimte/datagedreven-werken/imbor-de-standaard-voor-beheer-van-de-openbare-ruimte/)|LOD 0 (gekoppeld aan IMBGT)| Assetbeheer openbare ruimte| 

De vereisten die per GEO-dataset gesteld moeten worden aan een BIM-model zijn op te delen in twee categorieën: geometrische vereisten en semantische vereisten. De geometrische vereisten beschrijven de benodigde geometrische representatie en het vereiste detailniveau (LOD), terwijl de semantische vereisten betrekking hebben op de benodigde attributen, classificaties en eigenschappen voor de betreffende geo-dataset. De vereisten stelt men in Informatie Levering Specificaties (ILS'en).

Het opdelen van Informatie Levering Specificaties in afzonderlijke specificaties maakt hergebruik van informatie-eisen mogelijk. Door geometrische eisen en semantische eisen apart te definiëren, kunnen onderdelen van een ILS opnieuw worden toegepast voor verschillende geo-datasets. Hierdoor hoeft niet voor iedere nieuwe toepassing een volledige ILS opnieuw te worden opgesteld en kunnen bestaande specificaties efficiënter worden beheerd en onderhouden. Zo kan een ILS Gebouw voor het maken van een LOD0_vlak worden hergebruikt voor BGT en BAG (ondanks dat de conversie iets anders is). Ook een generieke ILS basisregistraties waarin concepten zijn opgenomen als objectbegintijd, objecteindtijd, identificatie, relatieveHoogteligging en status kan worden hergebruikt bij meerdere registraties.

Onderstaand overzicht laat zien hoe verschillende ILS'en in samenhang kunnen worden toegepast voor landelijke datasets. Het dient als een verkennend toepassingsprofiel en is bedoeld als inspiratie voor verdere uitwerking.

| ILS Geometrie | ILS Informatiemodel | Transformatieprofiel | Dataset | 
|--|--|--|--|
|ILS Gebouw LOD0_vlak, <br> ILS Weg LOD0_vlak, <br> ILS Brug LOD0_vlak, <br> ILS Spoor lod0_lijn, <br> ILS Terrein LOD0_vlak, <br>ILS Water LOD0_vlak <br> ILS meubilair LOD0_punt| ILS basisregistratie, ILS BGT|BIM2BGT|BGT|
|ILS Gebouw LOD 0_vlak|ILS basisregistratie, ILS BAG|BIM2BAG2D|BAG|
|ILS Gebouw LOD 1.2_volume <br> ILS Gebouw LOD 1.3_volume <br> ILS Gebouw LOD 2.2_volume |ILS basisregistratie, ILS BAG|BIM2BAG3D| 3D BAG|
|ILS Weg LOD 1.2_multivlak <br> ILS Gebouw LOD 1.3_volume <br> ILS Gebouw LOD 2.2_volume |ILS basisregistratie, ILS 3DBasisvoorziening| BIM2BV3D |3D basisvoorziening|
|ILS Weg LOD 0_lijn |ILS NWB|BIM2NWB |NWB |
|ILS Bebouwing LOD 0_vlak <br> ILS Bebouwing LOD 0_lijn <br> ILS Bebouwing LOD 0_punt <br> etc. |ILS 1 GIS |BIM21GIS | 1 GIS |
|ILS Gebouw LOD0_vlak, <br> ILS Weg LOD0_vlak, <br> ILS Brug LOD0_vlak, <br> ILS Spoor lod0_lijn, <br> ILS Terrein LOD0_vlak, <br>ILS Water LOD0_vlak <br> ILS meubilair LOD0_punt |ILS IMBOR | BIM2IMBOR |  IMBOR |


