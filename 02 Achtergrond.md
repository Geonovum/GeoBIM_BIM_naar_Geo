# BIM & GEO modellen

BIM en GIS modellen spelen ieder een unieke rol die onlosmakelijke met elkaar verbonden zijn. BIM modellen representeren een gebouw op een architectonische schaal terwijl GIS modellen hetzelfde gebouw kunnen representeren op een stedelijke schaal. De gebouwen gemodelleerd in BIM modellen hebben een hoog detail niveau. Objecten zoals kozijnen, deurklinken en scharnieren zijn in een gedetailleerde en precieze manier gemodelleerd. GIS objecten die dezelfde gebouwen representeren zijn veel simpeler. Kleine details die aanwezig zijn in BIM modellen worden over het algemeen niet, of niet expliciet, gemodelleerd in GIS.

Er zijn een aantal redenen voor deze verschillen:

* Een GIS model bevat informatie over grote clusters van gebouwen, mogelijk zelfs van complete steden. De informatie opslaan op een BIM schaal voor deze gebieden zal zeer zware modellen opleveren die lastig, zo niet onmogelijk, zijn om mee te werken.
* GIS data/formats zijn ontwikkeld om te werken met andere bronnen dan BIM data. Waar in BIM vaak met de hand wordt gemodelleerd (al dan niet aangevuld door programmeren/ai) worden de meeste GIS modellen gebaseerd op in-situ metingen. Voor gebouwen zijn deze meeting vaak LiDAR scans. Deze scans kunnen ruis in de data, en occlusion (gaten in de metingen) bevatten en hebben een beperkte resolutie. Met deze data is het niet mogelijk om snel op grote schaal zeer gedetailleerd modellen te creëren.
*GIS modellen spelen, vaker, een publieke rol dan BIM data. GIS data is beschikbaar voor gebruikers om te downloaden en te verwerken. Als GIS data alle informatie over de opgeslagen gebouwen zou bevatten, zoals in BIM modellen, zou dit mogelijk tot data veiligheid problemen zorgen. Aanvullend zal er dan ook zoveel data beschikbaar zijn waardoor de gebruiker door het bomen het bos niet meer zou kunnen zien. Bovendien zit in BIM modellen data waarvoor het niet van belang van de ontwerper is om deze data te delen en kunnen hier auteursrechten op rusten.

Om enerzijds in een GIS-omgeving te kunnen worden toegepast en anderzijds in een BIM-omgeving zijn GIS-data en BIM-data op een verschillende manier opgebouwd. Geometrisch gezien is een gebouw in een BIM model geconstrueerd uit verschillende losse objecten. Wanden, vloeren en deuren zijn allemaal volumetrische objecten die samen een bouwwerk vormen. In GIS modellen is deze omsluiting gerepresenteerd als een enkel object. Losse objecten, zoals losse wanden, vloeren en deuren, komen in GIS modellen relatief weinig voor. Een gebouw in GIS kan worden gezien als een gesloten schil die de grens tussen het gebouw en de lucht aanduidt.

De manier waarop ruimtes binnen het gebouw worden gerepresenteerd zijn daarentegen wel vergelijkbaar tussen BIM en volumetrische GIS modellen. Beide gebruiken een enkele volumtrische vorm om een unieke ruimte aan te duiden. Deze volumetrische vorm kan worden gezien als een gesloten schil die de grens tussen het gebouw en de lucht van een ruimte aanduidt of een ruimte in een gebouw.

Over het algemeen is een gebouw in een BIM-bestand op het hoogst beschikbare detailniveau gerepresenteerd. In een GIS bestand is dit vaak niet het geval. Een gebouw kan op meerde manieren gerepresenteerd worden in een enkel 3D GIS-bestand. Dit kan variëren van zeer gedetailleerde volumetrische vormen tot een zeer versimpelde non-volumetrische oppervlakte. Deze variatie in beschikbare representaties is aanwezig om toepassingen op verschillende detailniveaus mogelijk te maken, maar ook omdat GIS data bronnen niet altijd alle data beschikbaar hebben om alle gebouwen op dezelfde manier te reconstrueren. Het is dus mogelijk om lagere precisie data te combineren met hogere precisie data als er maar beperkte data bronnen beschikbaar zijn. De verschillende kwaliteit representaties worden “Level of Detail” (LoD) genoemd.

## Level of Detail & Level of Development

“Level of Detail” (LoD) lijkt erg veel op de BIM term “Level of Development” (LoD). Niet alleen de afkortingen lijken erg op elkaar maar ook wat ermee wordt beschreven. Hierdoor worden de twee termen door elkaar gebruikt, al wordt de term "Level of Development' steeds minder gebruikt in de BIM-wereld en is het LoD concept juist een breed ingebed concept in de GIS-wereld.

In BIM wordt “Level of Development” gebruikt om het ontwikkelniveau (en daarmee gepaard gaand detailniveau) aan te duiden van zowel de geometrie als de verbonden informatie van een BIM model is. Er bestaan verschillende zienswijzen over hoeveel niveaus er zijn. Deze worden aangeduid met een nummer dat bestaat uit 3 getallen (bijv. LoD400).

In BIM wordt de term “Level of Detail” ook gebruikt. Vaak wordt dit gebruikt als een synoniem voor “Level of Development”. Wij kiezen ervoor om de term “Level of Development” aan te houden als het over BIM gaat en “Level of Detail” als het over GIS gaat om het duidelijker te houden.

In GIS wordt “Level of Detail” gebruikt om aan te geven hoe gedetailleerd de geometrie is van een GIS model. Hier wordt ook vaak globale informatie over het type oppervlaktes aan toegevoegd, maar in de praktijk wordt GIS LoD ook vaak gebruikt zonder dit vlak-element. Het grote verschil tissen BIM LoD en GIS LoD is dat in de meest gebruikte GIS LoD frameworks over het algemeen alle andere attributen niet als belangrijk worden beschouwd. In GIS, worden de hoofdniveaus (LoD1, LoD2, LoD3) breed ondersteund, Maar er zijn in de loop der tijd verschillende verfijningen voorgesteld.
De CityGML3.0 standaard definieert 4 hoofdniveaus, allemaal aangegeven met een enkel getal (bijv. LoD2). De TUD heeft deze hoofdniveaus verfijnd, waarbij op ieder niveau vier andere, subniveaus worden beschreven. Dit heeft geresulteerd in 16 verschillende niveaus beschreven met 2 getallen gescheiden door een punt (bijv. LoD2.2). Deze indeling wordt in de praktijk ook veel gebruikt.

### CityGML

De CityGML3.0 standaard beschrijft 4 opvolgende niveaus (LoD0-3) waarbij de geometrie van een model meer gedetailleerd wordt met een hoger LoD. Dit framework gebruikt geen attributen of andere semantische informatie voor een onderscheid tussen de niveaus. De documentatie van ieder niveau is vrij beperkt en open voor interpretatie. Op basis van meerdere bronnen kon de volgende definitie worden opgebouwd:

* LoD0: Een representatie van een gebouw of kamer met niet volumetrische geometrie zoals een punt, oppervlakte of meerdere oppervlaktes.
* LoD1: Een representatie van een gebouw of kamer als een blok vorm.
* LoD2: Een representatie van een gebouw of kamer als een blok vorm waarbij de oppervlaktes die het dak representeren zijn verfijnd.  
* LoD3: Een representatie van een gebouw of kamer als een schil. Dit is de enige LoD die gevelopeningen en overhang ondersteunt.

![Voorbeeld van de 4 LoD beschrven door de CityGML3.0 standaard](media/2_achtergrond/LoDCityGML.png "De 4 LoD beschreven door de [CityGML3.0 standaard](https://docs.ogc.org/guides/20-066.html#overview-section-levelsofdetail)")

De CityGML3.0 standaard ondersteunt de in CityGML2.0 beschreven LoD4 niet meer. De in CityGML3.0 standaard beschreven LoD kunnen worden gebruikt voor zowel exterieur als interieur. In CityGML2.0 kon LoD0-3 alleen gebruikt worden voor het beschrijven van het exterieur van een gebouw. LoD4 was in CityGML2.0 de enige representatie van een gebouw met interieur. Daarnaast was LoD4 anders opgebouwd dan LoD0-3. LoD0-3 waren schillen terwijl LoD4 dit niet was. Objecten zoals ramen, vloeren en meubels werden ondersteunt in LoD4. LoD4 kon worden geïnterpreteerd als een 1:1 conversie van een BIM model in de GIS omgeving. Ondanks het feit dat LoD4 officieel niet meer ondersteunt, komt het in de praktijk nog voor om moeizame/trage/complexe conversie te ontwijken.

Ook al wordt het niet expliciet genoemd lijkt het dat het LoD framework vooral toepasbaar is op gebouwen. Bouwwerken zoals bruggen, tunnels en sluizen worden niet direct behandeld. In theorie kunnen de LoDs toegepast worden op deze bouwwerken omdat het framework zo open en flexibel is.

<!-- TODO:Een afbeelding toevoegen van een brug or ander infrastructuur object dat is versimpelt volgens het LoD framework -->

### TUD

Het CityGML LoD framework is relatief open. Dit maakt het makkelijk om een model in het framework te passen. Maar maakt het ook moeilijk om te begrijpen hoe een model verschilt van het gebouw dat het op een versimpelde wijze representeert. In 2016 heeft Biljecki et al. een verfijning geschreven dat voortbouwt op het LoD framework beschreven in de CityGML standaard. Dit is gedaan door iedere CityGML LoD op te splitsen in 4 sub groepen. Zo wordt bijvoorbeeld LoD1 opgesplitst in LoD1.0, 1.1, 1.2 en 1.3. Het eerste nummer van de verfijnde LoD komt dus overeen met de CityGML LoD. Het tweede nummer geeft de verdere verfijning aan. De documentatie van de verfijnde LoD is beter dan die van de CityGML standaard maar helaas is er nog steeds niet altijd even duidelijk. Op basis van meerdere bronnen kon de volgende definitie worden opgebouwd:

* LoD0.0: Een bounding surface om een gebouw of cluster van gebouwen.
* LoD0.1: Een 2D projectie van alle "grote" elementen van een gebouw (>4m, > 10m2) geplaatst op grondniveau.
* LoD0.2: Een 2D projectie van alle elementen van een gebouw geplaatst op grondniveau en optioneel aangevuld door een kopie van dit oppervlakte op de tophoogte van het gebouw.
* LoD0.3: Een 2D projectie van alle elementen van een gebouw geplaatst op grondniveau en aangevuld met een 2D projectie van alle losse dakelementen geplaatst op de tophoogte van ieder element.
* LoD1.0: Een bounding box om een gebouw of cluster van gebouwen.
* LoD1.1: Een opwaartse extrusie van LoD0.1 naar de maximale gebouwhoogte.
* LoD1.2: Een opwaartse extrusie van het LoD0.2 grondoppervlak naar de maximale gebouwhoogte.
* LoD1.3: Een neerwaartse extrusie van ieder LoD0.3 dakelement tot grondniveau en samengevoegd tot een enkel volume.
* LoD2.0: Een neerwaartse extrusie van ieder groot dak element (>4m, > 10m2) tot grondniveau samengevoegd tot een enkel volume.
* LoD2.1: Een neerwaartse extrusie van ieder dak element tot grondniveau samengevoegd tot een enkel volume.
* LoD2.2: Een neerwaartse extrusie van ieder dak element en dak bovenbouw (zoals dakkapellen) tot grondniveau samengevoegd tot een enkel volume.
* LoD2.3: LoD2.2 uitgebreid met expliciet gemodelleerde overhang als deze groter is dan 0.2m.
* LoD3.0: LoD2.2 aangevuld met gedetailleerde informatie verkregen vanuit de lucht. Dit kan ramen, schoorstenen en dakkappelen bevatten. LoD3.2 detail op het dak.
* LoD3.1: LoD2.2 aangevuld met gedetailleerde informatie verkregen vanaf de grond. Dit kan uitkragingen/overhang, ramen en deuren bevatten. LoD3.2 detail op de façade.
* LoD3.2: Gedetailleerd schilmodel van het gebouw met elementen die groter zijn dan 1m.
* LoD3.3: Gedetailleerd schilmodel van het gebouw met elementen die groter zijn dan 0.2m.

![Voorbeeld van de 16 LoD beschrven door de TUD](media/2_achtergrond/lodtud.png "De 16 LoD beschreven door de [TUD](https://3d.bk.tudelft.nl/lod/) in 2016")

Er is enige onzekerheid over het gebruik van een voetprint of geprojecteerde dak contour. De documentatie lijkt te wijzen op het gebruik van een geprojecteerde dak contour bij LoD0.2, 0.3 en 1.2. Dit is echter nergens expliciet genoemd. In de praktijk zijn er situaties waar de footprint contour wordt gebruikt. Dit gebruik wordt dan ook uitgebreid naar LoD1.3 en/of 2.2 waar een volumetrische vorm wordt gemaakt door een opwaartse extrusie van de voetprint te verfijnen met de dakoppervlaktes.

Net zoals bij het CityGML LoD framework lijkt dit framework vooral toepasbaar op gebouwen. Bouwwerken zoals bruggen, tunnels en sluizen. In theorie kunnen de LoDs toegepast worden op deze bouwwerken omdat het framework zo open en flexibel is. Bouwwerken zoals bruggen, tunnels en sluizen worden niet direct behandeld. In theorie kunnen de meeste LoDs toegepast worden op deze bouwwerken maar de bruikbaarheid is niet uitgebreid onderzocht.

Meer informatie over het [TUD LoD framework](https://repository.tudelft.nl/record/uuid:2d49a066-4e79-4608-b31f-bce54d92d0b5).
### Uitbreidingen & aanpassingen

In meer of mindere mate worden deze twee LoD frameworks aangehouden. Maar dit betekent niet dat ze perfect zijn. Er zijn nog steeds aspecten die niet duidelijk zijn gedefinieerd en bepaalde niveaus passen slecht op de werkelijkheid. Ook zijn er nieuwe technologieën beschikbaar die het mogelijk maken om nieuwe bronnen te gebruiken om GIS modellen op te baseren. De CityGML1.0 LoD standaard werd geïntroduceerd in 2008 en is in 3.0 nog steeds vergelijkbaar met de 1.0 versie. De TUD verscherping komt uit 2016, bijna 10 jaar geleden. Het is daarom ook belangrijk dat er onderzoek gedaan wordt naar uitbreidingen en aanpassingen van deze twee bestaande LoD frameworks.  

Ook BIM als bron brengt unieke problemen met zich mee waar maar in beperkte mate rekening mee wordt gehouden bij de beschreven LoD frameworks. Recentelijk is er onderzoek gedaan naar mogelijke alternatieve LoD die hier rekening mee houden. Dit onderzoek kan worden gevonden in dit document: ... . In appendix ... kan de implementatie in een BIM2GEO converter van het TUD LoD framework worden gevonden. In plaats van vervangende LoD zijn hier kleine aanpassingen gedaan in het LoD framework om rekening te houden de unieke beperkingen maar ook mogelijkheden van BIM.

## Bestandstype

### CityGML XML & CityGML CityJSON

CityGML is een open datamodel voor het opslaan van 3D GIS data. CityGML defineerd verschillende objecten (classes) en hun relaties voor de meeste relevantie topografische objecten gebruikt in stedelijke en regionale modellen. In tegenstelling tot mesh bestand types zoals OBJ en STL maakt CityGML het mogelijk om ook attributen voor ieder object op te slaan.

CityGML is zowel een encoding als een datamodel. Dit kan voor onduidelijkheden zorgen. CityGML komt voor een in GML en een CityJSON encoding. De GML encoding is gebaseerd op een XML datamodel. XML is een vrij zwaar datatype wat lastig is door menselijke gebruikers te doorgronden. Een alternatief is de CityJSON encoding. Dit is een encoding gebaseerd op een JSON datamodel. Deze encoding is lichter dan XML en ook makkelijker door menselijke gebruikers te begrijpen. Een CityGML bestand in de XML encoding is ongeveer 7 keer zwaarder dan een CityGML bestand in de CityJSON encoding (zie tabel hieronder, zie [CityJSON bestandsgrootte](https://www.cityjson.org/filesize/) voor meer informatie ). CityJSON komt echter ook met nadelen. Zo is niet het gehele CityGML datamodel is inbegrepen in de CityJSON encoding. CityJSON is vatbaarder voor niet standaard gebruik. Ook word CityGML XML door meer GIS software ondersteunt dan CityGML CityJSON.

Er is software beschikbaar die CityGML bestanden van encoding kan omzetten. Dit overbrugt de problemen die aanwezig zijn bij het beperken tot een enkele encoding.

| dataset | CityJSON v2.0 | CityGML-XML v3.0 | textures | details | compression |
|-|-|-|-|-|-|
| 3DBAG      | 7.0MB | 40MB    | none | Buildings in LoD 0, 1.2, 1.3, 2.2; multiple attributes                                          | **5.7X**   |
| Den Haag   | 2.7MB | 19MB    | none | 'Tile 01', Buildings (in LoD2) and Terrain are merged                                           | **7.0X**   |
| Ingolstadt | 4.8MB | 40MB    | none | Buildings in LoD3; multiple attributes                                                          | **8.3X**   |
| Montréal   | 5.6MB | 53MB   | none | Tile 'VM05'. Buildings in LoD2                                                                  | **9.5X**   |
| New York   | 110MB | 682MB  | none | Tile 'DA13'. Buildings in LoD2                                                                  | **6X**     |
| Railway    | 4.5MB | 39MB   | ZIP  | CityGML demo. Buildings, Railway, Terrain, Vegetation (with Geometry Templates), Water, Tunnels | **8.7X**   |
| Rotterdam  | 2.7MB | 18MB   | ZIP  | Neighbourhood 'Delfshaven'. Buildings in LoD2                                                   | **6.7X**   |
| Vienna     | 5.6MB | 40MB   | ZIP  | Buildings in LoD2                                                                               | **7.1X**   |
| Zürich     | 293MB | 2100MB | none | Buildings in LoD2                                                                               | **7X**     |

In de onderstaande code fragmenten kan de [XML](https://3d.bk.tudelft.nl/opendata/cityjson/3dcities/citygml/DenHaag_01.xml) (boven) en [CityJSON](https://3d.bk.tudelft.nl/opendata/cityjson/3dcities/v2.0/DenHaag_01.city.json) (onder) encoding van CityGML vergeleken worden. Deze twee fragmenten laten de definitie zien van hetzelfde object met een aantal attributen. De geometrie is verwijderd uit de fragmenten. Het is duidelijk te zien dat de XML encoding veel meer karakters nodig heeft om dezelfde informatie over te brengen. Dit draagt bij aan de extra bestandsgrootte.

```xml
<cityObjectMember>
	<bldg:Building gml:id="GUID_DBDABF53-7DD5-4C2F-BE7F-51F29A0CBA16">
		<gml:name>{DBDABF53-7DD5-4C2F-BE7F-51F29A0CBA16}</gml:name>
		<bldg:consistsOfBuildingPart>
	<bldg:BuildingPart gml:id="GUID_DBDABF53-7DD5-4C2F-BE7F-51F29A0CBA16_1">
		<gml:name>{DBDABF53-7DD5-4C2F-BE7F-51F29A0CBA16}</gml:name>
		<gen:doubleAttribute name="RelativeEavesHeight"><gen:value>3.133</gen:value></gen:doubleAttribute>
		<gen:doubleAttribute name="AbsoluteEavesHeight"><gen:value>7.717</gen:value></gen:doubleAttribute>
		<gen:doubleAttribute name="RelativeRidgeHeight"><gen:value>3.133</gen:value></gen:doubleAttribute>
		<gen:doubleAttribute name="AbsoluteRidgeHeight"><gen:value>7.717</gen:value></gen:doubleAttribute>

            ...

    </bldg:BuildingPart>
</cityObjectMember>
```

```json
"GUID_DBDABF53-7DD5-4C2F-BE7F-51F29A0CBA16_1": {
    "type": "BuildingPart",
    "attributes": {
        "roofType": "1000",
        "RelativeEavesHeight": 3.133,
        "RelativeRidgeHeight": 3.133,
        "AbsoluteEavesHeight": 7.717,
        "AbsoluteRidgeHeight": 7.717
    },

    ...

}
```

Meer informatie over CityGML kan worden gevonden op de [OGC website](https://www.ogc.org/standards/citygml/). Het OGC behandeld vooral het data model en de GML/XML encoding. Meer informatie over de CityJSON encoding kan worden gevonden op de [CitySJON website](https://www.cityjson.org/).

### GeoJSON

GeoJSON is een datamodel voor het uitwisselen van geospatiale gegevens. Het is, net zoals CityGML CityJSON, gebaseerd op de JSON encoding. De manier waarop de data is opgeslagen is echter anders. Ten opzichte van CityGML heeft GeoJSON meer beperkingen. Maar, de GeoJSON bestanden zijn over het algemeen minder zwaar en worden door meer GIS applicaties ondersteunt dan CityJSON.



