# Soorten informatie

Zowel BIM- als Geo-modellen maken deel uit van een breder informatielandschap. In de ISO 19650-1 wordt informatie in drie soorten onderverdeeld:

* Geometrisch: 2D- of 3D-modellen, met bijvoorbeeld vormen en hun dimensies
* Alfanumeriek: Gestructureerde data die niet over geometrieën gaat, zoals de kenmerken van objecten.
* Documentatie: Ongestructureerde data zoals PDF-bestanden en foto's.

Deze soorten informatie worden ieder op een andere manier verwerkt, zowel door mensen als software. Het maken van dit onderscheid helpt daarmee ook om de juiste keuzes te maken bij het converteren en beheren van informatie. De nadruk van deze praktijkrichtlijn ligt op geometrische informatie, maar de overige soorten zullen ook behandeld worden.

## Documentatie

Omdat documentatie ongestructureerde data bevat, kan deze niet uitgedrukt worden in BIM- of GIS-standaarden. Hierdoor is dit soort informatie ook niet geschikt voor conversie. Er kan wel een link bestaan tussen (geometrische) objecten en documenten (bijvoorbeeld _IfcRelAssociatesDocument_ in IFC of _externalReference_ in CityGML). Het kan nodig zijn om documenten die gekoppeld zijn aan een BIM model ook te behouden in een Geo-context.

## Alfanumeriek

Alfanumerieke informatie kan op allerlei plaatsen en vormen worden bijgehouden. De scheiding tussen alfanumerieke en overige informatie wordt daarom vaak ook niet zo scherp gemaakt in de praktijk. Zo kan het materiaal of bouwjaar van een object als attribuut in een BIM- of GIS-model opgenomen zijn, in een PDF of spreadsheet staan, of als gestructureerde data in een apart systeem beheerd worden. Ook kunnen objecten geclassificeerd worden naar diverse classificatie-systemen, zoals NL-SfB, NLCS of IMBOR.

Wat de conversie van BIM naar Geo betreft geldt hetzelfde als voor de 1-op-1 conversie van objecten: het is technisch goed mogelijk om kenmerken van BIM naar Geo te kopiëren, de vraag is alleen welke informatie daadwerkelijk relevant is. In een IFC-model kunnen bijvoorbeeld gedetailleerde kenmerken zitten over materiaaleigenschappen of fabrikantdata. Voor het meeste GIS-gebruik is deze informatie niet relevant en zal deze voornamelijk extra ruis opleveren.

# BIM & GEO modellen

BIM en GIS modellen spelen ieder een unieke rol die onlosmakelijke met elkaar verbonden zijn. BIM modellen representeren een gebouw op een architectonische schaal terwijl GIS modellen hetzelfde gebouw kunnen representeren op een stedelijke schaal. De gebouwen gemodelleerd in BIM modellen hebben een hoog detail niveau. Objecten zoals kozijnen, deurklinken en scharnieren zijn in een gedetailleerde en precieze manier gemodelleerd. GIS objecten die dezelfde gebouwen representeren zijn veel simpeler. Kleine details die aanwezig zijn in BIM modellen worden over het algemeen niet, of niet expliciet, gemodelleerd in GIS.

Er zijn een aantal redenen voor deze verschillen:

* Een GIS model bevat informatie over grote clusters van gebouwen, mogelijk zelfs van complete steden. De informatie opslaan op een BIM schaal voor deze gebieden zal zeer zware modellen opleveren die lastig, zo niet onmogelijk, zijn om mee te werken.
* GIS data/formats zijn ontwikkeld om te werken met andere bronnen dan BIM data. Waar in BIM vaak met de hand wordt gemodelleerd (al dan niet aangevuld door programmeren/ai) worden de meeste GIS modellen gebaseerd op in-situ metingen. Voor gebouwen zijn deze meeting vaak LiDAR scans. Deze scans kunnen ruis in de data, en occlusion (gaten in de metingen) bevatten en hebben een beperkte resolutie. Met deze data is het niet mogelijk om snel op grote schaal zeer gedetailleerd modellen te creëren.
* GIS modellen spelen, vaker, een publieke rol dan BIM data. GIS data is beschikbaar voor gebruikers om te downloaden en te verwerken. Als GIS data alle informatie over de opgeslagen gebouwen zou bevatten, zoals in BIM modellen, zou dit mogelijk tot data veiligheid problemen zorgen. Aanvullend zal er dan ook zoveel data beschikbaar zijn waardoor de gebruiker door het bomen het bos niet meer zou kunnen zien. Bovendien zit in BIM modellen data waarvoor het niet in het belang van de ontwerper is om deze data te delen. Op deze data kan ook auteursrechten op rusten.

Om enerzijds in een GIS-omgeving te kunnen worden toegepast en anderzijds in een BIM-omgeving zijn GIS-data en BIM-data op een verschillende manier opgebouwd. Geometrisch gezien is een gebouw in een BIM model geconstrueerd uit verschillende losse objecten. Wanden, vloeren en deuren zijn allemaal volumetrische objecten die samen een bouwwerk vormen. In GIS modellen is deze omsluiting gerepresenteerd als een enkel object. Losse objecten, zoals losse wanden, vloeren en deuren, komen in GIS modellen relatief weinig voor. Een gebouw in GIS kan worden gezien als een gesloten schil die de grens tussen het gebouw en de lucht aanduidt.

![Wireframe representatie van een BIM en GIS model.](media/2_achtergrond/Verschil_IFC_GIS.JPG "Een wireframe representatie van een BIM model (links) en een exterieur GIS model (rechts).")

De manier waarop ruimtes binnen het gebouw worden gerepresenteerd zijn daarentegen wel vergelijkbaar tussen BIM en volumetrische GIS modellen. Beide gebruiken een enkele volumtrische vorm om een unieke ruimte aan te duiden. Deze volumetrische vorm kan worden gezien als een gesloten schil die de grens tussen het gebouw en de lucht van een ruimte aanduidt of een ruimte in een gebouw.

![Representatie van de kamers in een BIM en GIS model.](media/2_achtergrond/Verschil_IFC_GIS_kames.JPG "Representatie van de kamers in een BIM model (links) en GIS model (rechts).")

Over het algemeen is een gebouw in een BIM-bestand op het hoogst beschikbare detailniveau gerepresenteerd. In een GIS-bestand is dit vaak niet het geval. Een gebouw kan op meerde manieren gerepresenteerd worden in een enkel GIS-bestand. Dit kan variëren van zeer gedetailleerde volumetrische vormen tot zeer versimpelde non-volumetrische oppervlakte. Deze variatie in beschikbare representaties is aanwezig om toepassingen op verschillende detailniveaus mogelijk te maken, maar ook omdat GIS data bronnen niet altijd alle data beschikbaar hebben om alle gebouwen op dezelfde manier te reconstrueren. Het is dus mogelijk om lagere precisie data te combineren met hogere precisie data als er maar beperkte data bronnen beschikbaar zijn. Om de verschillende kwaliteit van de representaties aan te douden wordt de term “Level of Detail” (LoD) gebruikt.

## Level of Detail & Level of Development

“Level of Detail” (LoD) lijkt erg veel op de BIM term “Level of Development” (LoD). Niet alleen de afkortingen lijken erg op elkaar maar ook overlapt wat ermee wordt beschreven. Hierdoor worden de twee termen vaak met elkaar verwisselt. Echter wordt de term "Level of Development” steeds minder gebruikt in de BIM-wereld en is het “Level of Detail” concept juist een breed ingebed concept in de GIS-wereld.

In BIM wordt “Level of Development” gebruikt om het ontwikkelniveau (en daarmee gepaard gaand detailniveau) aan te duiden van zowel de geometrie als de verbonden informatie. Er bestaan verschillende intrepetaties over hoeveel niveaus er zijn. Onafhankelijk van het framework dat wordt aangehouden worden deze niveaus aangeduid met een nummer dat bestaat uit 3 getallen (bijv. LoD400).

In BIM komt de term “Level of Detail” ook voor. Vaak wordt dit gebruikt als een synoniem voor “Level of Development”. Wij kiezen ervoor om de term “Level of Development” aan te houden als het over BIM gaat en “Level of Detail” als het over GIS gaat om een duidelijk onderscheid te houden tussen beide termen.

In GIS wordt “Level of Detail” gebruikt om aan te geven hoe gedetailleerd de geometrie is van een GIS model. Het onderscheid zich van BIM LoD doordat informatie buiten de geometrie minder of totaal niet belangrijk zijn voor de classificatie. Soms wordt bij GIS LoD frameworks globale informatie over het type oppervlaktes betrokken. Maar in de praktijk worden deze frameworks ook toegepast zonder deze extra informatie.

De CityGML3.0 standaard definieert 4 hoofdniveaus, allemaal aangegeven met een enkel getal (bijv. LoD2). Deze hoofdniveaus worden breed ondersteunt, maar zijn ook vrij open en flexibel. De TUD heeft deze hoofdniveaus verfijnd, waarbij voor ieder hoofdnieveau vier andere, subniveaus worden beschreven. Dit heeft geresulteerd in 16 verschillende niveaus beschreven met 2 getallen gescheiden door een punt (bijv. LoD2.2). Deze indeling wordt in de praktijk ook veel gebruikt.

### CityGML

De CityGML3.0 standaard beschrijft vier opvolgende niveaus (LoD0 tot LoD3) waarbij de geometrie van een model meer gedetailleerd wordt met een hoger LoD. Dit framework gebruikt geen attributen of andere semantische informatie voor een onderscheid tussen de niveaus. De documentatie van ieder niveau is vrij algmeen, om verschillende interpretaties en daarmee implementaties mogelijk te maken. Vaak zijn daarom verfijningen nodig om data eisen voor specifieke toepassingen te beschrijven. Doordat de documentatie zo algemeen is was het moeilijk om op basis van alleen de CityGML3.0 standaard de niveaus te beschrijven. Op basis van meerdere bronnen kon de volgende definitie worden gegeven ten aanzien van gebouwen:

* LoD0: Een representatie van een gebouw of vertrek met niet volumetrische geometrie zoals een punt, vlak (polygoon) of meerdere vlakken (voor bijvoorbeeld de 'footprint' of 'roofprint').
* LoD1: Een representatie van een gebouw of vertrek als een blok vorm.
* LoD2: Een representatie van een gebouw of vertrek als een volume met (meestal) verticale muren, waarbij de vlakken die het dak representeren zijn verfijnd.  
* LoD3: Een representatie van een gebouw of vertrek als een schil. Dit is de enige LoD die gevelopeningen ondersteunt.

![Voorbeeld van de 4 LoDs beschreven door de CityGML3.0 standaard](media/2_achtergrond/LoDCityGML.png "De 4 LoD beschreven door de [CityGML3.0 standaard](https://docs.ogc.org/guides/20-066.html#overview-section-levelsofdetail)")

De CityGML3.0 standaard ondersteunt de in CityGML2.0 beschreven LoD4 niet meer. LoD4 was bedoeld voor de binnenkant van gebouwen. De in CityGML3.0 standaard beschreven LoDs kunnen worden gebruikt voor zowel exterieur als interieur. Terwijl in CityGML2.0 LoD0 tot LoD3 alleen gebruikt werd voor het beschrijven van het exterieur van een gebouw. Daarnaast was LoD4 anders opgebouwd dan LoD0-3. LoD0-3 volgt de GIS structuur waarbij de buitenkant een enkele schil is die het model representeerd. LoD4 volgt een BIM achtige structuur waarbij de representatie van het gebouw bestaat uit losse objecten. Daarom kan LoD4 worden geïnterpreteerd als een (gefilterde) 1:1 conversie van een BIM model. Ondanks het feit dat LoD4 officieel niet meer wordt ondersteund, komt het in de praktijk nog voor om moeizame/trage/complexe conversie te vermijden.

Ook al wordt het niet expliciet genoemd, in de praktijk lijkt het LoD framework vooral toepasbaar op gebouwen. Bouwwerken zoals bruggen, tunnels en sluizen worden in de documentatie niet zo uitgebreid beschreven als gebouwen. In theorie kunnen de LoDs toegepast worden op deze bouwwerken omdat het LoD framework van CityGML open en flexibel is. De bruikbaarheid van deze abstracties kan echter in twijfel worden getrokken omdat gebouwen en infrasctuctuur bouwwerken erg van vorm verschillen.

![Voorbeeld van de 4 LoDs beschreven door de CityGML3.0 standaard toegepast op een brug model](media/2_achtergrond/LoDCityGMLBrug.png "De 4 LoD beschreven door de [CityGML3.0 standaard](https://docs.ogc.org/guides/20-066.html#overview-section-levelsofdetail) toegepast op een brug model")

### Verfijnd LoD framework 3D Geoinformation, TU Delft

Het CityGML LoD framework is relatief open en generiek. Dit maakt het makkelijk om een model in het framework te passen. Maar maakt het ook moeilijk om vast te stellen hoe een abstractie verschilt van het originele gebouw. In 2016 heeft [Biljecki et al.](https://pure.tudelft.nl/ws/portalfiles/portal/4377508/Biljecki2016to.pdf) daarom een verfijning geschreven dat voortbouwt op het LoD framework beschreven in de CityGML standaard. Dit is gedaan door iedere CityGML LoD op te splitsen in 4 sub groepen. Zo wordt bijvoorbeeld LoD1 opgesplitst in LoD1.0, 1.1, 1.2 en 1.3. Het eerste nummer van de verfijnde LoD komt overeen met de CityGML LoD. Het tweede nummer geeft de verdere verfijning aan. De documentatie van de verfijnde LoD is uitgebreider dan die van de CityGML standaard, maar zou op sommige punten verbeterd kunnen worden om de definitie van een bepaald LoD nog beter te beschrijven.

Wat dat betreft is een standaard nooit af. Ontwikkelingen in 3D data inwinning en modellering alsmede gebruik in de praktijk en de zo opgedane ervaringen, leiden voortdurend tot inzichten die de standaard en LoD beschrijvingen kunnen verbeteren.

Op basis van meerdere bronnen kunnen de LoDs van het verfijnde framework op de volgende manier worden gedefinieerd:

* LoD0.0: Een bounding surface om een gebouw of cluster van gebouwen.
* LoD0.1: Een 2D projectie van alle "grote" elementen van een gebouw (>4m, > 10m2) geplaatst op grondniveau.
* LoD0.2: Een 2D projectie van alle elementen van een gebouw geplaatst op grondniveau en optioneel aangevuld door een kopie van dit oppervlakte op de tophoogte van het gebouw.
* LoD0.3: Een 2D projectie van alle elementen van een gebouw geplaatst op grondniveau en aangevuld met een 2D projectie van alle losse dakelementen geplaatst op de tophoogte van ieder element.
* LoD1.0: Een bounding box om een gebouw of cluster van gebouwen.
* LoD1.2: Een opwaartse extrusie van het LoD0.2 grondoppervlak naar de maximale gebouwhoogte (vaak de noklijn).
* LoD1.3: Een neerwaartse extrusie van ieder LoD0.3 dakelement tot grondniveau en samengevoegd tot een enkel volume.
* LoD2.0: Een neerwaartse extrusie van ieder groot dak element (>4m, > 10m2) tot grondniveau samengevoegd tot een enkel volume.
* LoD2.1: Een neerwaartse extrusie van ieder dak element tot grondniveau samengevoegd tot een enkel volume.
* LoD2.2: Een neerwaartse extrusie van ieder dak element en dak bovenbouw (zoals dakkapellen) met minimale omvang tot grondniveau samengevoegd tot een enkel volume.
* LoD2.3: LoD2.2 uitgebreid met expliciet gemodelleerde overhang als deze groter is dan 0.2m.
* LoD3.0: LoD2.2 aangevuld met gedetailleerde informatie, zoals ramen, schoorstenen en dakkappelen. LoD3.2 detail op het dak.
* LoD3.1: LoD2.2 aangevuld met gedetailleerde informatie verkregen vanaf de grond. Deze LoD kan uitkragingen/overhang, ramen en deuren bevatten. LoD3.2 detail op de gevel (façade).
* LoD3.2: Gedetailleerd schilmodel van het gebouw met elementen die groter zijn dan (bijvoorbeeld) 1m.
* LoD3.3: Gedetailleerd schilmodel van het gebouw met elementen die groter zijn dan (bijvoorbeeld) 0.2m.

![Voorbeeld van de 16 LoD beschrven door de TUD](media/2_achtergrond/lodtud.png "De 16 LoD beschreven door de [TUD](https://3d.bk.tudelft.nl/lod/) in 2016")

Het framework is niet expliciet over het gebruik van een footprint of geprojecteerde dak contour bij de verschillende LoD-representaties. In de documentatie wordt het, in praktijk veel gebruikte, geprojecteerde dak contour bij LoD0.2, 0.3 en 1.2 genoemd. Maar het gebruik van de footprint wordt niet uitgesloten. In de praktijk wordt soms ook de footprint contour gebruikt. De footprint-gebaseerde geometrie kan worden uitgebreid naar LoD1.3 en/of 2.2 waar een volumetrische vorm wordt gegenereerd door een opwaartse extrusie van de footprint, welke wordt verfijnd met dakvlakken.

Net zoals bij het CityGML LoD framework lijkt dit framework vooral toepasbaar op gebouwen. Bouwwerken zoals bruggen, tunnels en sluizen worden niet beschreven in de documentatie. In theorie kunnen de LoDs toegepast worden op deze bouwwerken omdat het framework open en flexibel maar de bruikbaarheid is niet uitgebreid onderzocht.

Meer informatie over het [TUD LoD framework](https://repository.tudelft.nl/record/uuid:2d49a066-4e79-4608-b31f-bce54d92d0b5).

### Uitbreidingen & aanpassingen van de LoD frameworks

In meer of mindere mate worden deze twee LoD frameworks gebruikt in de praktijk. Maar dit betekent niet dat ze geen beperkingen kennen. Zoals eerder opgemerkt, is een standaard nooit af. En ook voor deze twee frameworks geldt dat er nog steeds aspecten zijn die niet duidelijk zijn gedefinieerd. Modellen zoals deze in de praktijk beschikbaar zijn passen niet altijd helemaal op deze LoD frameworks. Ook zijn er nieuwe technologieën beschikbaar die het mogelijk maken om nieuwe data bronnen te gebruiken om GIS modellen te genereren. De CityGML1.0 LoD standaard werd geïntroduceerd in 2008 en versie 3.0 is nog steeds in grote lijnen vergelijkbaar met de 1.0 versie. De TUD verfijning is uit 2016. Het is daarom ook belangrijk dat er onderzoek gedaan wordt naar uitbreidingen en aanpassingen van deze twee bestaande LoD frameworks. Voor deze praktijk richtlijn is het met name relevant om te kijken naar BIM als nieuwe data bron voor 3D GIS bestanden en welke nieuwe (of aangepaste) LoDs hiermee kunnen worden gegenereerd.  

Recentelijk is er onderzoek gedaan naar mogelijke alternatieve LoDs voor GIS modellen die rekening houden met BIM als data bron. Dit onderzoek kan worden gevonden in dit document: ... . In appendix ... kan de implementatie in een BIM2GEO converter van het TUD LoD framework worden gevonden. In plaats van vervangende LoD zijn hier kleine aanpassingen gedaan in het LoD framework om rekening te houden de unieke beperkingen maar ook mogelijkheden van BIM.

## Bestandstype

### CityGML XML & CityGML CityJSON

CityGML is een open conceptueel datamodel voor het opslaan van 3D GIS data. CityGML defineert verschillende objecten (classes) en hun relaties voor de meeste relevantie topografische objecten zoals gebruikt in stedelijke en regionale modellen. In tegenstelling tot mesh bestand types zoals OBJ en STL maakt CityGML het mogelijk om ook attributen voor ieder object op te slaan.

Naast een datamodel is CityGML ook een data encoding. De gelijke benaming van het datamodel en data encoding kan tot verwarring leiden. Voor het conceptuele data model CityGML, is zowel een CityGML, JSON en linked data encoding beschikbaar.

De GML encoding is gebaseerd op een XML datamodel. XML is een vrij zwaar datatype wat ook lastig is om te lezen door gebruikers. Een alternatief is [CityJSON](https://3d.bk.tudelft.nl/opendata/cityjson/3dcities/v2.0/DenHaag_01.city.json), een encoding gebaseerd op een JSON datamodel. Deze encoding is lichter dan XML en ook makkelijker door gebruikers te begrijpen. Een CityGML bestand in de XML encoding is ongeveer 7 keer zwaarder dan een CityGML bestand in de CityJSON encoding (zie tabel hieronder en zie [CityJSON bestandsgrootte](https://www.cityjson.org/filesize/) voor meer informatie). CityJSON komt echter ook met beperkingen. Zo is niet het gehele CityGML datamodel in de CityJSON encoding beschikbaar. Ook is CityJSON vatbaarder voor niet standaard gebruik.

Er is software beschikbaar die CityGML bestanden van de ene naar de andere encoding kan omzetten, waardoor afhankelijk van de toepassing de ene of de andere encodig kan worden gebruikt.

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

Meer informatie over CityGML kan worden gevonden op de [OGC website](https://www.ogc.org/standards/citygml/). OGC heeft het data model voor de GML/XML encoding ontwikkeld. De CityJSON encoding is ontwikkeld onder leiding van de TU Delft en is later door OGC vastgesteld als community standaard. Meer over CityJSON kan worden gevonden op de [CitySJON website](https://www.cityjson.org/).

### GeoJSON

GeoJSON is een datamodel voor het uitwisselen van geospatiale gegevens. Het is, net zoals CityGML CityJSON, gebaseerd op de JSON encoding. De manier waarop de data is opgeslagen is echter anders. Ten opzichte van CityGML heeft GeoJSON meer beperkingen. Maar, de GeoJSON bestanden zijn over het algemeen minder zwaar en worden door meer GIS applicaties ondersteunt dan CityJSON.

```json

"type": "Feature",
    "properties": {
    "objectID": "GUID_DBDABF53-7DD5-4C2F-BE7F-51F29A0CBA16_1 Park",
    "roofType": "1000",
    "RelativeEavesHeight": 3.133,
    "RelativeRidgeHeight": 3.133,
    "AbsoluteEavesHeight": 7.717,
    "AbsoluteRidgeHeight": 7.717
    },

      ...
}
```