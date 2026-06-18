# Entiteit en Attribuut BIM naar GEO

Voor het transformeren van BIM- naar GEO-informatie is het mappen van entiteiten en attributen van belang. Waar geometrie vooral de vorm en locatie van een ding vastlegt, beschrijft de entiteit wat het ding is en bevatten attributen gegevens over eigenschappen zoals materiaal, functie, voorkomen, afmeting of classificatie. Bij de transformatie van BIM naar Geo moeten naast geometrie ook deze entiteiten en attributen correct worden vertaald tussen standaarden. Omdat BIM- en GEO-standaarden verschillen in datastructuur, niveaus van detail en semantische definitie is dit een uitdaging. 

## Entiteit mapping 
Er zijn verschillende entiteit-mappingen beschikbaar tussen BIM en Geo. Zie hiervoor de Master Thesis van de TU Delft: [Automatic generation of CityGML LoD3 building models from IFC models](https://repository.tudelft.nl/record/uuid:31380219-f8e8-4c66-a2dc-548c3680bb8d) van Sjors Donkers (2013). En ook de Universiteit Singapore heeft een [ifc2citygml](https://ifc2citygml.github.io/) mapping (2019), de technische universiteit Munich heeft deze [mapping](https://github.com/tum-gis/ifc-to-citygml3) van ifc naar Citygml 3. 
De Universiteit van Hong Kong heeft ifc naar cityGML mappingen in een [bimgis](https://cejcheng.people.ust.hk/bimgis/) omgeving, en de technische universiteit Athene heeft onderstaande mapping.
![Mapping entiteiten IFC naar GEO](./media/Mapping_IFC-naar_Geo_Entiteiten.png) [(2018) George Floros](https://www.researchgate.net/figure/Semantic-mapping-from-IFC-to-CityGML-LoD-4_fig3_327604195)

Het is niet mogelijk om elke entiteit in IFC naar het basis CityGML-model te mappen. Men zal een keuze moeten maken in welke entiteiten hierbij van belang zijn. Het is mogelijk om één uitbreiding of meerdere uitbreidingen op CityGML te maken om IFC-entiteiten een plek te bieden. Dit is beschreven bij Biljecki in [Extending CityGML for IFC-sourced 3D city models](https://doi.org/10.1016/j.autcon.2020.103440)

![IFC naar CityGML met een ADE](./media/IFC_naar_CityGML_en_ADE.png)

Een voorbeeld van een ADE voor IFC-entiteiten in CityGML is weergegeven in [bijlage 2](#-Entiteit-en-Attribuutmapping-tussen-BIM-en-GEO)

Er zijn naast verschillende Level Of Details ook verschillende decompositie-niveaus die men vanuit één gedetailleerd BIM-model kan genereren. Zie [bijlage 1](#Entiteit-en-Attribuutmapping-tussen-BIM-en-GEO)

Zoals in de [BIM basis ILS - hoofdstuk classificatie](https://www.digigo.nu/ilsen-en-richtlijnen/bim-basis-ils/3-6-classificatiesystematiek/)aangegeven dient men naast het juist gebruik maken van entiteiten ook gebruik te maken van classificatie in BIM. Ook dit kan men gebruiken om te mappen. Er zijn verschillend BIM Classificatie standaarden als: 
- NL-SFB
- NLCS
- ETIM
- NEN2767-4
- IMBOR

of soms domein-specifieke standaarden als SATO van Rijkswaterstaat voor Tunnels. 

<aside class="note" title="Entiteit-mapping op basis van Entiteit of op basis van Clasificatie">
  <p><strong>AANBEVELING:</strong> Maak afspraken over de manier van mappen. Of men op basis van entiteit of classificatie mapt. En wat leidend is wanneer classificatie en entiteitgebruik elkaar tegenspreken. </p>
</aside>

## Mapping van Attributen
Entiteitmapping beschrijft hoe objecttypen uit een BIM-model worden gekoppeld aan objecttypen in een GEO-model, terwijl attribuutmapping beschrijft hoe de eigenschappen van deze objecten worden vertaald en overgenomen tussen beide modellen.

Hier zijn verschillende opties. 

- 1-op-1 mapping 
- Many-to-one mapping / aggregatie
- One-to-many mapping
- Afgeleide of berekende attributen
- Transformaties tussen hiërarchische niveaus

### 1-op-1 mapping
Sommige attributen kan men direct, 1-op-1, mappen. Zo komt het attribuut "name" van een "IfcBuilding" eovereen met het attribuut "naam" van een "IMBOR:Gebouw". Beide attributen hebben dezelfde betekenis en kunnen daarom zonder aanvullende transformatie aan elkaar worden gekoppeld. De 1-op-1 mappingen vormen vaak een zeer beperkt deel van een totale attribuuttransformatie. Door verschillen in doel, structuur en detailniveau tussen BIM- en GEO-informatiemodellen moeten veel attributen worden afgeleid, geaggregeerd of via aanvullende transformatieregels worden bepaald.

### Many-to-one mapping
Een model kent bijvoorbeeld het attribuut: "Lengte", "Breedte", "hoogte". Een ontvangend model kent bijvoorbeeld "afmetingen" (l,b,h)	IMBOR.
Bijvoorbeeld "straat", "huisnummer", "postcode", Bij een ander model een attribuut "adres". 

### One-to-many mapping
Objecttype = fietspad in BIM. In GEO is dit CityGML functie = fietspad en type verharding = asfalt. 
Name = "Bank type B12 groen" in IMBOR: objecttype: Bank, typeaanduiding, kleur, groen 
NLCS-naam is ook een goede hiervoor. 

### Afgeleide of berekende attributen
meerder buildingstoreys + geometrie wordt gebouwhoogte in BIM 
De inhoud van de netto ruimten en de products wordt het Bruto Inhoud of er kan een BVO van berekend worden. 

### Transformaties tussen hiërarchische niveaus
Zowel in GEO- als BIM-informatiemodellen komen verschillende decompositieniveaus voor. Attributen van objecten op een hoger decompositieniveau kunnen worden afgeleid of geaggregeerd van objecten op een lager decompositieniveau. Daarbij is vaak sprake van een specifieke relatie tussen een attribuut van een samengesteld object en een attribuut van één of meerdere onderliggende objecttypen waaruit dat object is opgebouwd.

Zo kan een objecttype "elementverharding" op een lager decompositieniveau bestaan uit een band, trottoirkolkdeksels en bestrating. Het attribuut "formaat" van een hoger decompositieniveau betreft het formaat van de stenen of tegels in het bestratingsvlak. Het betreft niet het formaat van een band of een trottoirkolk waaruit het object elementverharding ook bestaat. Een decompositieniveau lager kan het keiformaat van de bestrating afgeleid worden van de hele stenen waaruit het bestratingsvlak bestaat. 

Expliciete afleidings- of aggregatieregels zijn nodig, waarin wordt vastgelegd van welk onderliggend objecttype en attribuut de waarde op een hoger decompositieniveau wordt afgeleid.

<figure id="Afleiding_van_attribuut">
      <img src="./media/Afleiding_van_attribuut.png" alt="Afleiding van attribuut"/>
    <figcaption><a class="self-link" href="#fig-Afleiding_van_attribuut"></bdi></a><span class="fig-title">Afleiding van attribuut</span></figcaption>
</figure>

## Status van objecten van BIM naar GEO
Geo- en BIM-objecten beschrijven hetzelfde fysieke bouwwerk, maar vanuit verschillende perspectieven en detailniveaus. Gedurende de gehele levenscyclus van een gebouw, van ontwerp en realisatie tot beheer, renovatie en sloop,  hebben deze objecten met elkaar een relatie. Wijzigingen in BIM-objecten, zoals aanpassingen aan afmetingen, functies of constructieve elementen, hebben gevolgen voor de geo-objecten. Een consistente koppeling tussen geo- en BIM-data is daarom essentieel om informatie gedurende de levenscyclus van een object actueel en betrouwbaar te houden.

De Gebouwde Omgeving Referentie Architectuur (GEBORA) bestaat uit verschillende onderdelen, zie [GEBORA-onderdelen](https://www.digigo.nu/gebora-onderdelen/). Een van deze onderdelen is de [GEBORA Bouwwerk Levenscyclus](https://www.digigo.nu/gebora-bouwwerk-levenscyclus/). <mark> Aan de hand van dit model iets uitwerken </mark>




