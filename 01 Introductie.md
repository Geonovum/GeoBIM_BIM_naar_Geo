# Introductie

Building Information Modelling (BIM) en Geografisch informatiesystemen (GIS) worden algemeen erkend als aanvullende bronnen van informatie. Waar BIM modellen worden gebruikt om een enkel gebouw of bouwwerk in hoog detail te representeren worden GIS modellen gebruikt om grotere regio's te representeren met minder detail. Het integreren van deze twee databronnen kan zeer nuttig zijn voor zowel de BIM als GIS velden.

Ondanks het feit dat BIM en GIS gedeeltelijk dezelfde bouwwerken modelleren op verschillende schaal en detail niveau is de integratie tussen beide lastig. Beide velden hebben een andere modelleer benadering die overbrugt moet worden om succesvol BIM-modellen naar GIS te brengen.

Het essentiële verschil tussen BIM en GIS is dat in BIM alle objecten los van elkaar gemodelleerd zijn. Iedere wand, deur en vloer zijn losse gesloten objecten. In GIS wordt een gebouw gerepresenteerd als een enkel gesloten object. Er is geen scheiding tussen verschillende objecten die samen het gebouw vormen. Er zijn verschillende manieren om dit verschil te overbruggen. Er zijn softwarepakketten die het mogelijk maken om BIM modellen en GIS modellen in dezelfde omgeving te openen. Dit is vrij makkelijk voor de gebruiker en stelt weinig eisen aan de BIM modellen. De keerzijde is dat dit de mogelijkheden beperkt van de BIM modellen in de GIS omgeving en het bindt de gebruiker vaak aan een enkele software omgeving/leverancier. Er zijn software pakketten die het mogelijk maken om BIM modellen (gedeeltelijk) 1:1 te vertalen naar een GIS data formaat. Ook dit stelt relatief weinig eisen aan de BIM modellen maar resulteert in modellen die vooral voor visualisatie bruikbaar zijn. Als laatste zijn er software oplossing die BIM modellen omzetten naar GIS conforme bestanden. Deze oplossingen resulteren in goed bruikbare GIS modellen, maar stellen relatief strenge eisen aan de BIM modellen die gebruikt kunnen worden als input.

De laatste oplossing is interessant voor het integreren van BIM in een GIS omgeving. Helaas zijn de eisen aan de BIM modellen vaak onduidelijk en slecht gedocumenteerd. Aanvullend moeten er extra stappen genomen worden om aan deze eisen te voldoen omdat niet alle BIM modelleersoftware modellen op een correcte manier opslaat. Vaak is een expert nodig om de BIM modellen aan te passen voordat ze voldoen aan alle eisen. De uitdaging hier is het ontwikkelen van breed gedragen, gestandaardiseerde oplossingen met duidelijke handreikingen zodat deze oplossingen ook beschikbaar komen voor klein-tot-middelgrote projecten waar niet altijd de benodigde expertise beschikbaar is.

# Leeswijzer

# Toepassingsgebied

# BIM & GEO modellen

BIM en GIS modellen spelen ieder een unieke rol die onlosmakelijke met elkaar verbonden zijn. BIM modellen representeren een gebouw op een architectonische schaal terwijl GIS modellen hetzelfde gebouw kunnen representeren op een stedelijke schaal. De gebouwen gemodelleerd in BIM modellen hebben een hoog detail niveau. Objecten zoals kozijnen, deurklinken en scharnieren zijn in een gedetailleerde en precieze manier gemodelleerd. GIS objecten die dezelfde gebouwen representeren zijn veel simpeler. Kleine details die aanwezig zijn in BIM modellen worden over het algemeen niet, of niet expliciet, gemodelleerd in GIS.

Er zijn een aantal verklaringen die hiervoor kunnen worden aangewezen:

* Een GIS model bevat informatie over grote clusters van gebouwen, mogelijk zelfs van complete steden. De informatie opslaan op een BIM schaal voor deze gebieden zal zeer zware modellen opleveren die lastig zijn om mee te werken.
* GIS data/formats zijn ontwikkeld om te werken met andere bronnen dan BIM data. Waar in BIM vaak met de hand wordt gemodelleerd (al dan niet aangevuld door programmeren/ai) worden de meeste GIS modellen gebaseerd op in-situ metingen. Voor gebouwen zijn deze meeting vaak LiDAR scans. Deze scans hebben vaak ruis in de data, occlusion (gaten in de metingen) en een beperkte resolutie. Met deze data is het niet mogelijk om snel op grote schaal zulke gedetailleerd modellen te creëren.
*GIS modellen spelen, vaker, een publieke rol dan BIM data. GIS data is beschikbaar voor gebruikers om te downloaden en te verwerken. Als GIS data alle informatie over de opgeslagen gebouwen zou bevatten, zoals in BIM modellen, zou dit mogelijk tot data veiligheid problemen zorgen. Aanvullend zal er dan ook zoveel data beschikbaar zijn dat de gebruiker door het bomen het bos niet meer zou kunnen zien.

Om de verschillen rollen uit te kunnen voeren zijn GIS en BIM op een verschillende manier opgebouwd. Geometrisch gezien is een gebouw in een BIM model geconstrueerd uit verschillende losse objecten. Wanden, vloeren en deuren zijn allemaal volumetrische objecten die samen een omsluiting vormen. In GIS modellen is deze omsluiting gerepresenteerd als een enkel object. Losse objecten, zoals losse wanden, vloeren en deuren, komen in GIS modellen relatief weinig voor.  Een gebouw in GIS kan worden gezien als een gesloten schil die de overgang tussen het gebouw en de lucht aanduidt.

In contrast zijn de manier waarop ruimtes binnen het gebouw worden gerepresenteerd vergelijkbaar tussen BIM en volumetrische GIS modellen. Beide gebruiken een enkele volumtrische vorm om een unieke ruimte aan te duiden. Deze volumetrische vorm kan worden gezien als een gesloten schil die de overgang tussen het gebouw en de lucht van een ruimte aanduidt.

Over het algemeen is een gebouw in een BIM-bestand op enkele op de hoogst beschikbare manier gerepresenteerd. In een GIS bestand is dit vaak niet het geval. Een gebouw kan op meerde manieren gerepresenteerd worden in een enkel bestand. Dit kan gaan van zeer gedetailleerde volumetrische vormen tot een zeer versimpelde non-volumetrische oppervlakte. Deze variatie in beschikbare representaties is aanwezig om werken op verschillende schalen te vergemakkelijken, maar ook omdat GIS data bronnen niet altijd alle data beschikbaar hebben om alle gebouwen op dezelfde manier te reconstrueren. Het is dus mogelijk om lagere precisie data te combineren met hogere precisie data als er maar beperkte bronnen beschikbaar zijn. De verschillende kwaliteit representaties worden “Level of Detail” (LoD) genoemd.

## Level of Detail & Level of Development

“Level of Detail” (LoD) lijkt erg veel op de BIM term “Level of Development” (LoD). Niet alleen de afkortingen lijken erg op elkaar maar ook wat ermee wordt beschreven. Hierdoor worden de twee termen vaak door elkaar gehaald.

In BIM wordt “Level of Development” gebruikt om aan te geven hoe gedetailleerd zowel de geometrie en de verbonden informatie van een BIM model is. Er is enige onenigheid over hoeveel niveaus er zijn, maar ze worden aangeduid met een nummer dat bestaat uit 3 getallen (bijv. LoD400).

In BIM wordt de term “Level of Detail” ook gebruikt. Vaak wordt dit gebruikt als een synoniem voor “Level of Development”. Wij ervoor gekozen om de term “Level of Development” aan te houden als het over de BIM term gaat en “Level of Detail” als het over de GIS term gaat om het zo, hopelijk, iets duidelijker te houden.

In GIS wordt “Level of Detail” gebruikt om aan te geven hoe gedetailleerd de geometrie is van een GIS model. Hier wordt ook vaak globale informatie over het type oppervlaktes aan toegevoegd, maar in de praktijk wordt GIS LoD ook vaak gebruikt zonder dit element. Het grote verschil tissen BIM LoD en GIS LoD is dat in de meest gebruikte GIS LoD frameworks over het algemeen alle andere attributen niet als belangrijk wordt beschouwd. Net als bij BIM is er enige onenigheid over hoeveel niveaus bestaan. De twee meest gebruikte frameworks geven twee verschillende hoeveelheden. De CityGML3.0 standaard geeft 4 verschillende niveaus, allemaal aangegeven met een enkel getal (bijv. LoD2). De TUD ontwikkelde standaard split de niveaus beschreven door de CityGML3.0 standaard in 4en. Dit komt uit op 16 verschillende niveaus beschreven met 2 getallen gescheiden door een punt (bijv. LoD2.2).

### CityGML

De CityGML3.0 standaard beschrijft 4 opvolgende niveaus (LoD0-3) waarbij de geometrie van een model meer gedetailleerd wordt met een hoger LoD. Dit framework gebruikt geen attributen of andere semantische informatie voor een onderscheid tussen de niveaus. De documentatie van ieder niveau is vrij beperkt en open voor interpretatie. Op basis van meerdere bronnen kon de volgende definitie worden opgebouwd:

* LoD0: Een representatie van een gebouw of kamer met niet volumetrische geometrie zoals een punt, oppervlakte of meerdere oppervlaktes.
* LoD1: Een representatie van een gebouw of kamer als een blok vorm.
* LoD2: Een representatie van een gebouw of kamer als een blok vorm waarbij de oppervlaktes die het dak representeren zijn verfijnd.  
* LoD3: Een representatie van een gebouw of kamer als een schil. Dit is de enige LoD die gevelopeningen en overhang ondersteunt.

De CityGML3.0 standaard ondersteunt de in CityGML2.0 beschreven LoD4 niet meer. De in CityGML3.0 standaard beschreven LoD kunnen worden gebruikt voor zowel exterieur als interieur. In CityGML2.0 kon LoD0-3 alleen gebruikt worden voor het beschrijven van het exterieur van een gebouw. LoD4 was in CityGML2.0 de enige representatie van een gebouw met interieur. Daarnaast was LoD4 anders opgebouwd dan LoD0-3. LoD0-3 waren schillen terwijl LoD4 dit niet was. Objecten zoals ramen, vloeren en meubels werden ondersteunt in LoD4. LoD4 kon worden geïnterpreteerd als een 1:1 conversie van een BIM model in de GIS omgeving. Ondanks het feit dat LoD4 officieel niet meer ondersteunt, komt het in de praktijk nog voor om moeizame/trage/complexe conversie te ontwijken.

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

Er is enige onzekerheid over het gebruik van een voetprint of geprojecteerde dak contour. De documentatie lijkt te wijzen op het gebruik van een geprojecteerde dak contour bij LoD0.2, 0.3 en 1.2. Dit is echter nergens expliciet genoemd. In de praktijk zijn er situaties waar de footprint contour wordt gebruikt. Dit gebruik wordt dan ook uitgebreid naar LoD1.3 en/of 2.2 waar een volumetrische vorm wordt gemaakt door een opwaartse extrusie van de voetprint te verfijnen met de dakoppervlaktes.

### Uitbreidingen & aanpassingen

In meer of mindere mate worden deze twee LoD frameworks aangehouden. Maar dit betekent niet dat ze perfect zijn. Er zijn nog steeds aspecten die niet duidelijk zijn gedefinieerd en bepaalde niveaus passen slecht op de werkelijkheid. Ook zijn er nieuwe technologieën beschikbaar die het mogelijk maken om nieuwe bronnen te gebruiken om GIS modellen op te baseren. De CityGML1.0 LoD standaard werd geïntroduceerd in 2008 en is in 3.0 nog steeds vergelijkbaar met de 1.0 versie. De TUD verscherping komt uit 2016, bijna 10 jaar geleden. Het is daarom ook belangrijk dat er onderzoek gedaan wordt naar uitbreidingen en aanpassingen van deze twee bestaande LoD frameworks.  

Ook BIM als bron brengt unieke problemen met zich mee waar maar in beperkte mate rekening mee wordt gehouden bij de beschreven LoD frameworks. Recentelijk is er onderzoek gedaan naar mogelijke alternatieve LoD die hier rekening mee houden. Dit onderzoek kan worden gevonden in dit document: ... . In appendix ... kan de implementatie in een BIM2GEO converter van het TUD LoD framework worden gevonden. In plaats van vervangende LoD zijn hier kleine aanpassingen gedaan in het LoD framework om rekening te houden de unieke beperkingen maar ook mogelijkheden van BIM.

## Bestandstype

### CityGML XML & CityGML CityJSON

### GeoJSON 