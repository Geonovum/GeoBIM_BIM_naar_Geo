# Eisen aan model en mapping

## Eisen aan het BIM-model

### Waarom eisen vóóraf worden gesteld

Een BIM-model is zelden vanzelf geschikt voor hergebruik in een geografisch informatiesysteem. Een model dat prima voldoet voor ontwerp, calculatie of uitvoering, kan tegelijkertijd onbruikbaar zijn voor conversie naar GEO: de georeferentie ontbreekt, objecten zijn gemodelleerd als generieke bouwdelen zonder typering, of de geometrie is weliswaar visueel correct maar niet gesloten. Zulke tekortkomingen zijn achteraf niet of alleen tegen hoge kosten te herstellen, omdat de informatie die nodig is voor de conversie op dat moment eenvoudigweg nooit is vastgelegd.

Een succesvolle transformatie van BIM naar een GIS-formaat begint daarom vóór het modelleerwerk, met expliciete afspraken over wat er geleverd wordt, in welke vorm en met welke kwaliteit. Die afspraken zijn geen administratieve last: ze zijn de enige manier om automatische conversie betrouwbaar en herhaalbaar te maken. Zonder kaders blijft elke conversie handwerk, en daarmee een eenmalige exercitie in plaats van een reproduceerbaar proces.

Voor het vastleggen van die afspraken biedt de [ISO 19650](https://www.iso.org/sectors/building-construction/building-information-modelling)-reeks — de internationale norm voor informatiemanagement in de gebouwde omgeving — het procesframework: wie levert welke informatie, wanneer, in welke vorm en op basis waarvan wordt die informatie geaccepteerd.

### Van informatiebehoefte naar model: de keten van ISO 19650

ISO 19650 gaat uit van een ketenbenadering. Informatie wordt niet alleen voor de eigen organisatie gecreëerd, maar juist voor uitwisseling en hergebruik door andere partijen. Dat uitgangspunt is voor GeoBIM essentieel: de partij die het BIM-model maakt is doorgaans niet de partij die er in de GEO-omgeving mee verder werkt.

De norm kent daarvoor een cascade van informatiebehoeften. Elke eis in een ILS is uiteindelijk te herleiden tot een organisatiedoel; omgekeerd is een eis zonder herleidbaar doel een eis die geschrapt kan worden. Het expliciet maken van die keten is de meest effectieve manier om te voorkomen dat een ILS uitgroeit tot een verlanglijst.

| Behoefte/Eis | Voorbeeld |
|--------------|-----------|
| Organizational Information Requirement (OIR) | "Wij willen vastgoed beheren en daarom hebben wij informatie nodig." |
| Asset Information Requirements (AIR) | "Voor vastgoedbeheer hebben wij de gegevens nodig van materiaal, onderhoud, levensduur, constructie en gebruik." |
| Asset Information Model (AIM) | "In het assetbeheersysteem kennen wij het object 'Gebouw' met de attributen 'materiaal', 'levensduur', 'constructie' en 'gebruik', en de activiteit 'onderhoud' die een koppeling krijgt naar een gebouw." |
| Project Information Requirements (PIR) | "Voor de renovatie van dit vastgoedproject hebben wij informatie nodig om het ontwerp, de realisatie en de toekomstige overdracht naar beheer mogelijk te maken." |
| Exchange Information Requirements (EIR) | "Deze bestaande asset- en projectinformatie moet door deze betrokken partijen op afgesproken momenten en in afgesproken formats worden geleverd." |
| Project Information Model (PIM) | "Tijdens het project wordt deze informatie vastgelegd in het Project Information Model; materiaal, levensduur en constructie worden na oplevering doorgegeven aan het Asset Information Model." |

  <figure id="ISO-19650-dataproducten-en-relaties" style="display: block; text-align: center; margin: 0 auto;">
          <img src="media/06_eisen/ISO_19650_Datasets.png" alt="ISO 19650 dataproducten en relaties" style="width: 100%; max-width: 800px; height: auto; display: block; margin: 0 auto;"/>
          <figcaption>
            <a class="self-link" href="#fig-19650-dataproducten-en-relatie"></bdi></a>
            <span class="fig-title">
            ISO 19650 dataproducten en relaties
            </span>
          </figcaption>
    </figure>

Een ILS is in deze termen de Nederlandse invulling van een EIR. <mark>Redactie: de herziening van ISO 19650 (DIS 2026) vervangt de term EIR door IPR en gaat van een 8- naar een 9-stapsproces. Overweeg een korte transitieparagraaf, zodat deze praktijkrichtlijn bij publicatie niet direct verouderde terminologie hanteert.</mark>

### Generieke eisen aan het BIM-model voor conversie naar GEO

Onderstaande onderwerpen komen in vrijwel elke BIM-naar-GEO-toepassing terug. Ze zijn geordend van drager (bestand) naar inhoud (geometrie en semantiek). Welke van deze eisen daadwerkelijk gelden en hoe streng, hangt af van het GEO-product dat gemaakt moet worden; die koppeling wordt gelegd in *Van BIM-eis naar GEO-product*.

#### 1. Bestandsformaat en schema

Leg vast in welk schema geleverd wordt. IFC4 en IFC4X3_ADD2 (gepubliceerd als ISO 16739-1:2024) zijn de schema's waarop de huidige generatie IDS- en conversiesoftware is gebouwd; IFC2X3 wordt door veel gereedschap nog ondersteund, maar mist `IfcMapConversion` en `IfcProjectedCRS` en is daarmee ongeschikt voor een sluitende georeferentie. Waar bestaande software nog IFC2X3 oplevert, is dat een reden om de leveringsafspraak op de exportinstellingen te richten en niet op het beschikbare bestand.

> **Eis** — Het model wordt geleverd als IFC volgens schema IFC4 of IFC4X3_ADD2. Het gebruikte schema wordt in de leveringsafspraak benoemd; het bestand is schemavalide.

#### 2. Bestandsnaamgeving en informatiecontainers

Bestandsnaamconventies beschrijven afspraken voor het eenduidig identificeren en beheren van informatiebestanden. De bestandsnaam bevat alleen de metadata die nodig is voor beheer en uitwisseling — projectcode, discipline, status, versie — en is niet bedoeld om inhoudelijke informatie over objecten of eigenschappen vast te leggen. Die informatie hoort in het model of de dataset zelf. ISO 19650-4 biedt hiervoor een uitgewerkte conventie.

#### 3. Eenheden en maatvoering

Consistent gebruik van eenheden voorkomt schaalfouten bij conversie. Fouten van factor 1000 (millimeter versus meter) of 0,3048 (voet versus meter) zijn in de praktijk de meest voorkomende oorzaak van modellen die "ergens anders" of onherkenbaar groot in de GIS-omgeving belanden. Leg vast welke eenheden gelden, laat de eenheden expliciet in `IfcUnitAssignment` opnemen, en toets bij ontvangst of de bounding box van het model binnen een plausibele orde van grootte valt.

#### 4. Georeferentie

Georeferentie is de meest kritische eis: zonder correcte georeferentie is elk ander gegeven in het model ruimtelijk waardeloos. Per project wordt een methode van georeferentie gekozen en vastgelegd. In Nederland gaat het doorgaans om het RD-stelsel (EPSG:28992) in combinatie met NAP-hoogte (EPSG:5709); de samengestelde CRS is EPSG:7415.

##### Level of Georeferencing

Voor het niveau waarop de georeferentie is vastgelegd, hanteert de praktijkrichtlijn [Georefereren GeoBIM](https://nl-digigo.github.io/GeoBIM_Georefereren/) het begrip *level van georeferentie-informatie*, teruggaand op het onderzoek van Clemen en Görne naar *Level of Georeferencing*:

| Level | Wat is vastgelegd | Wat is daarmee mogelijk |
|-------|-------------------|-------------------------|
| 10 | Een adres | De locatie is bekend; plaatsing, rotatie en schaal niet |
| 20 | Eén coördinaat (lengte- en breedtegraad) | Plaatsing in 2D en 3D; geen rotatie of schaal |
| 30 | Verplaatsing van het grondvlak ten opzichte van het modelnulpunt | Plaatsing en rotatie ten opzichte van het noorden; geen CRS, geen schaal |
| 40 | Georeferentie van het totaalmodel als aparte entiteit | Plaatsing en rotatie, expliciet geduid; geen CRS, geen schaal |
| **50** | **Bron- en doelcoördinatenstelsel plus translatie, rotatie en schaling** | **Volledige, expliciete transformatie tussen modelstelsel en projectiestelsel** |
| 60 | Koppeling van modelpunten aan ingemeten punten | Berekening van een volledige transformatie uit referentiepunten |

De richtlijn beveelt **level 50 aan voor de integratie van BIM-modellen en geodata**, en level 60 voor constructiedoeleinden. Voor BIM naar GEO is level 50 dus het werkbare minimum: alles daaronder mist ofwel het coördinatenstelsel, ofwel de schaal, ofwel beide.

In IFC wordt level 50 gedragen door twee entiteiten: `IfcProjectedCRS` voor het doelstelsel en `IfcMapConversion` voor de transformatie — `Eastings`, `Northings`, `OrthogonalHeight` voor de verschuiving, `XAxisAbscissa` en `XAxisOrdinate` voor de rotatie, en `Scale` voor de schaling.

Voor RDNAP is er een nuance. De richtlijn beveelt `IfcMapConversionScaled` aan, een subtype van `IfcMapConversion` dat in IFC4X3_ADD2 is toegevoegd en met `FactorX`, `FactorY` en `FactorZ` een afzonderlijke schaal per as toestaat. Dat is nauwkeuriger dan één enkele `Scale`, en voor de combinatie van RD en NAP ook nodig. Een ILS die alleen `IfcMapConversion` benoemt, sluit die aanbevolen route dus per ongeluk uit — zie *Wat een IDS wél en niet kan toetsen* voor waarom dat in IDS niet vanzelf goed gaat.

Twee aandachtspunten die in de praktijk telkens terugkeren:

- **Ware noorden versus modelnoorden.** De rotatie hoort in `IfcMapConversion` (`XAxisAbscissa`/`XAxisOrdinate`) te staan en niet in de plaatsing van de geometrie. Een model dat "gedraaid gemodelleerd" is zonder dat die rotatie is vastgelegd, komt scheef in de kaart terecht.
- **Afstand tot de oorsprong.** Modellen met een willekeurige lokale oorsprong ver van de gerefereerde nulpositie leiden tot precisieverlies. Toets bij ontvangst of de modelgeometrie zich in de buurt van de opgegeven oorsprong bevindt.

> **Eis** — Het model bevat een georeferentie op level 50: `IfcProjectedCRS` met een expliciete EPSG-aanduiding, en `IfcMapConversion` of `IfcMapConversionScaled` met verschuiving, rotatie en schaling. Voor Nederlandse projecten is de doel-CRS EPSG:7415 (RD + NAP), of EPSG:28992 (RD) in combinatie met EPSG:5709 (NAP) als verticaal datum.

#### 5. Ruimtelijke structuur

De conversie naar GEO leunt op de hiërarchie in het model. Een `IfcWall` die niet in een `IfcBuildingStorey` zit en een `IfcBuildingStorey` die niet aan een `IfcBuilding` hangt, zijn niet toe te wijzen aan een gebouw of bouwlaag — en daarmee niet af te leiden naar een pand, een gebouwhoogte of een verdiepingsoppervlak.

> **Eis** — De ruimtelijke structuur `IfcProject → IfcSite → IfcBuilding → IfcBuildingStorey` is volledig aanwezig. Elk fysiek element is via `IfcRelContainedInSpatialStructure` gekoppeld aan de bouwlaag waarin het zich bevindt.

#### 6. Semantische typering

Voor een betrouwbare conversie is het noodzakelijk dat objecten zijn toegewezen aan een passende entiteit uit een nationaal of internationaal informatiemodel, in dit geval het IFC-schema. Een model waarin gevels, daken en vloeren allemaal als `IfcBuildingElementProxy` zijn geëxporteerd, bevat geometrisch alles en semantisch niets.

Naast de entiteit is het `PredefinedType` van belang: het onderscheid tussen `IfcSlab.FLOOR` en `IfcSlab.ROOF` bepaalt of een vlak als grond- of als dakvlak wordt geïnterpreteerd, en een `IfcSpace` met `PredefinedType = GFA` of `PARKING` is iets anders dan een `IfcSpace` met `PredefinedType = SPACE`.

> **Eis** — Elk object is getypeerd met de meest specifieke passende IFC-entiteit en een ingevuld `PredefinedType`. Gebruik van `IfcBuildingElementProxy` is toegestaan alleen wanneer geen passende entiteit bestaat, en dan met een `ObjectType` uit de afgesproken termenlijst.

#### 7. Nationale typering: het USERDEFINED-patroon

De opsommingen in het IFC-schema zijn internationaal vastgesteld en dekken de nationale werkelijkheid nooit volledig. `IfcSpaceTypeEnum` kent in IFC4 zes waarden — `SPACE`, `PARKING`, `GFA`, `INTERNAL`, `EXTERNAL` en `USERDEFINED` — terwijl het Nederlandse bouwregelgevingsdomein tientallen ruimtelijke begrippen onderscheidt: verblijfsgebied, verblijfsruimte, functiegebied, functieruimte, gebruiksgebied, bedgebied, restruimte, buitenruimte, tarraruimte, brandcompartiment, subbrandcompartiment, vluchtroute. Die begrippen zijn juridisch gedefinieerd en niet onderling uitwisselbaar; ze zijn evenmin terug te brengen tot de zes internationale waarden zonder betekenisverlies.

Het IFC-schema voorziet hier zelf in. Het patroon is: **`PredefinedType = USERDEFINED`, met de nationale term in `ObjectType`** bij een occurrence, of in `ElementType` wanneer het type-object (`IfcSpaceType`) de drager is. Dat is geen omweg maar de bedoelde route — de `CorrectPredefinedType`-where-rule van `IfcSpace` schrijft voor dat `ObjectType` moet bestaan zodra `PredefinedType` de waarde `USERDEFINED` heeft. Wie deze combinatie gebruikt, blijft dus volledig binnen het schema en binnen de validatieregels ervan.

De verwachting is dat elk land dit pad bewandelt: nationale ruimtelijke concepten in de eigen taal en de eigen regelgeving, ondergebracht in een eigen, gepubliceerde `USERDEFINED`-lijst. Deze praktijkrichtlijn onderschrijft die aanpak, om drie redenen:

- **Het is schemaconform.** Er wordt geen eigen property set en geen eigen entiteit geïntroduceerd. Generieke IFC-software leest het model zonder aanpassing; alleen de betekenis van de term vraagt om een externe bron.
- **Het is toetsbaar.** `ObjectType` is een gewoon IFC-attribuut en dus met een IDS-attribuutfacet te selecteren én te verifiëren. Een eigen Pset zou dat ook kunnen, maar zou de eis buiten het schema plaatsen en de IDS moeilijker combineerbaar maken met andere bron-ILS'en.
- **Het is uitwisselbaar.** Zolang de termenlijst als classificatie in de [bSDD](https://search.bsdd.buildingsmart.org/) is gepubliceerd, heeft elke term een URI met een definitie erachter. Daarmee is een nationale term internationaal interpreteerbaar zonder dat het schema hoeft te veranderen, en is de vertaalslag naar een GEO-objecttype een mapping tussen twee URI's in plaats van tussen twee tekstwaarden.

De prijs van het patroon is dat `ObjectType` een vrij tekstveld is: zonder afspraak levert het precies hetzelfde interpretatieprobleem op als een ontbrekende typering. De termenlijst moet daarom vast, gepubliceerd en versiebeheerd zijn, en de ILS moet de toegestane waarden opsommen — niet slechts eisen dat het veld gevuld is.

> **Eis** — Waar geen passend `PredefinedType` bestaat, wordt `PredefinedType = USERDEFINED` gebruikt in combinatie met een waarde uit een gepubliceerde nationale termenlijst in `ObjectType` (occurrence) of `ElementType` (type-object). De ILS somt de toegestane waarden op en verwijst naar de bSDD-URI van de betreffende classificatie. Er wordt geen eigen property set geïntroduceerd om nationale typering vast te leggen.

Een uitgewerkt voorbeeld van dit patroon, ontleend aan de ILS voor Ruimten in de Omgevingswet, staat in de bijlage.

#### 8. Classificatie

Door middel van classificatie kan een object verder worden gespecificeerd en eenduidig worden gecategoriseerd volgens een gestandaardiseerde systematiek. In Nederland zijn [NL-SfB](https://ketenstandaard.nl/nlbe-sfb-facts/), [NLCS](https://www.digigo.nu/standaarden/nlcs/) en [ETIM](https://www.etim-international.com/) gangbaar. Classificatie wordt in IFC vastgelegd via `IfcClassificationReference` en `IfcRelAssociatesClassification` — niet als eigenschap in een property set, omdat IFC bij een classificatiereferentie ook de naam, versie en bron van het classificatiesysteem meeneemt.

Let bij het formuleren van eisen op het detailniveau van de code. NL-SfB-code 31 staat voor *buitenwandopeningen* en omvat zowel ramen (31.2x), deuren (31.3x) als puien (31.4x). Een regel die 31 rechtstreeks aan `IfcWindow` koppelt, is dus te grof; gebruik de subcodes, of laat de eis meerdere entiteiten toe. Voor eenduidige verwijzing is het aan te raden classificatiecodes te ontsluiten via de [bSDD](https://search.bsdd.buildingsmart.org/), zodat de eis naar een URI verwijst in plaats van naar een tekstuele code.

**Classificatie van ruimten met de nationale termenlijst.** Classificatie is niet voorbehouden aan bouwdelen. Waar een nationale ruimtetypering volgens het `USERDEFINED`-patroon in `ObjectType` is vastgelegd (zie *Nationale typering*), verdient het aanbeveling om diezelfde term óók als classificatie aan het object te hangen, uit de bSDD-publicatie waarin de termenlijst is opgenomen. Voor de Nederlandse ruimtebegrippen is dat de dictionary *Omgevingswet Ruimten* van buildingSMART Nederland, waarin onder meer verblijfsgebied, verblijfsruimte, functiegebied, functieruimte, gebruiksgebied, bedgebied, restruimte, buitenruimte, tarraruimte, brandcompartiment, subbrandcompartiment en vluchtroute zijn gedefinieerd.

De classificatiewaarde is in dat geval **identiek aan de `ObjectType`-waarde**. Dat lijkt dubbelop en is het bewust:

- **`ObjectType` is de typering waar het IFC-schema zelf mee werkt.** Elke IFC-applicatie leest het attribuut, ook zonder enige kennis van de Nederlandse begrippenset. Het is de drager van de typering in het model.
- **De classificatie is de drager van de betekenis.** `IfcClassificationReference` neemt naast de code ook de naam, bron, editie en `Location` van het classificatiesysteem mee. Daarmee verwijst de term naar een definitie op een URI, met een versie erbij — informatie die `ObjectType` als vrij tekstveld nooit kan dragen.

Voor conversie naar GEO is dat tweede het bruikbare deel. Een mapping van "Verblijfsruimte" naar een geo-objecttype op basis van een tekstwaarde is een afspraak die nergens is vastgelegd en bij elke spellingswijziging breekt. Een mapping tussen twee URI's is een verifieerbare koppeling tussen twee gedefinieerde begrippen. De classificatie maakt de nationale typering met andere woorden *machine-oplosbaar*, terwijl `ObjectType` haar *schemaconform* houdt. Beide zijn nodig.

Twee praktische aandachtspunten:

- **Consistentie is per term te toetsen, niet generiek.** IDS kent geen variabelen en kan de waarde van het ene facet niet vergelijken met die van het andere. De eis "classificatie is gelijk aan `ObjectType`" is dus niet in één specificatie uit te drukken. Zij wordt afgedwongen door per begrip één specificatie te schrijven die op `ObjectType` selecteert en de bijbehorende classificatie verplicht stelt. Dat is precies de opbouw die de ILS voor Ruimten in de Omgevingswet al hanteert: één specificatie per begrip, met de bSDD-URI als `identifier`.
- **Leg de schrijfwijze van het classificatiesysteem vast.** Het classificatiefacet in IDS vergelijkt met `IfcClassification.Name` in het IFC-bestand. Systeemnaam, code en URI-fragment kunnen van elkaar verschillen — een dictionary die *Omgevingswet Ruimten* heet, kan in de URI `Omgevingswet-Ruimten` dragen. De ILS moet daarom expliciet voorschrijven welke exacte tekenreeks in `IfcClassification.Name` hoort te staan, en welke waarden voor `Source`, `Edition` en `Location` gelden. Zonder die afspraak matcht het facet niet en faalt een verder correct model.

> **Eis** — Objecten met een nationale typering volgens het `USERDEFINED`-patroon dragen daarnaast een `IfcClassificationReference` met dezelfde term, uit de bSDD-publicatie waarin die termenlijst is opgenomen. De ILS legt de exacte schrijfwijze van de systeemnaam, de editie en de `Location`-URI vast, en dwingt de koppeling tussen term en classificatie per begrip af.

#### 9. Attributen en properties

Objecten krijgen afgesproken vaste attributen en properties, zoals:

- **Status object** — In ontwerp, In aanleg, In gebruik, Buiten gebruik
- **Maatregel** — Verwijderen, Aanleggen, Repareren, Onderhouden, Vervangen
- **Materiaal** — via [IfcRelAssociatesMaterial](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcRelAssociatesMaterial.htm) en [IfcMaterial](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcMaterial.htm), met [N.A.A.KT](https://www.digigo.nu/ilsen-en-richtlijnen/tools-voor-informatiemanagement/naa-k-t/)-classificatie
- **[ITSO](https://www.digigo.nu/ilsen-en-richtlijnen/bim-basis-infra/3-9-in-te-storten-onderdelen-itso/)-indicatie** — in te storten onderdelen
- **IsExternal** — het onderscheid tussen binnen en buiten, doorslaggevend voor elke omhullende- of gevelextractie

Geef bij het formuleren van deze eisen de voorkeur aan gestandaardiseerde property sets (`Pset_*` uit het IFC-schema) boven eigen, nationale of projectgebonden sets. Elke eigen Pset is een eigenschap die generieke conversiesoftware niet kent en die dus per project opnieuw gemapt moet worden. Is een eigen set onvermijdelijk, hanteer dan de naamgevingsconventie uit NPR-CEN/TR 17654 en publiceer de definities in de bSDD.

#### 10. Geometrierepresentatie

Dit is het onderwerp dat in ILS'en het vaakst ontbreekt en in conversies het vaakst misgaat. Een model kan semantisch volledig in orde zijn en toch geen bruikbaar GEO-object opleveren, omdat de geometrie niet aan de eisen van een GIS-omgeving voldoet.

GIS-formaten gaan uit van gesloten, oriënteerbare volumes en vlakken. BIM-software staat daarentegen veel toe wat visueel klopt maar topologisch niet: open volumes, dubbele of overlappende vlakken, vlakken met nuldikte, zelfdoorsnijdende solids en booleaanse constructies die pas bij het uitrekenen van de vorm blijken te falen. Een omhullende laat zich niet betrouwbaar afleiden uit een verzameling losse vlakken die net niet op elkaar aansluiten.

> **Eis** — Objecten die tot een volume of oppervlak in de GEO-dataset moeten leiden, zijn gemodelleerd als gesloten (watertight), niet-zelfdoorsnijdende solids. Bij voorkeur wordt geleverd in `SweptSolid`, `Brep` of `Tessellation`; representaties die sterk leunen op booleaanse aftrekkingen en half-space-clipping worden vermeden. Elk object heeft een `Body`-representatie.

Twee toevoegingen die specifiek voor hogere detailniveaus tellen:

- **Openingen.** Ramen en deuren worden gemodelleerd in een daadwerkelijke sparing (`IfcOpeningElement` via `IfcRelVoidsElement`) die het element vult (`IfcRelFillsElement`). Openingsvlakken in de GEO-dataset worden uit die relatie afgeleid; een raam dat als los volume tegen een dichte wand is geplaatst, levert geen opening op.
- **Ruimten.** Waar interne geometrie nodig is, worden `IfcSpace`-objecten geleverd met sluitende begrenzing, zonder overlap en zonder gaten, zodat de ruimten optellen tot de bouwlaag en de bouwlagen tot het gebouw.

#### 11. Doublures en doorsnijdingen

Er is sprake van een **doublure** als hetzelfde fysieke object op dezelfde locatie meer dan eens voorkomt binnen een aspectmodel, coördinatiemodel of project. Er is sprake van een **doorsnijding** als twee objecten deels door elkaar heen steken. Beide zijn in een BIM-omgeving vaak onschuldig — de visualisatie klopt — maar leiden in een GIS-omgeving tot dubbeltellingen in oppervlakte- en volumeberekeningen en tot onbetrouwbare clashcontroles.

#### 12. Metadata

Een IFC-model bevat in de header metadata over zichzelf: opsteller, applicatie, gebruikt schema, tijdstip van export. Die metadata is noodzakelijk maar niet voldoende voor publicatie in een GEO-context.

Aanvullende metadata in DCAT- of GeoDCAT-vorm bevordert publicatie, catalogisering, vindbaarheid, interpreteerbaarheid en hergebruik. Dit sluit aan op de aanbeveling in [Technical guidelines for digital building logbooks](https://www.ecorys.com/app/uploads/2019/02/DBL-Technical-Guidelines-for-DBLs.pdf) van Ecorys, TNO, Arcadis en Contecht.

   <figure id="Physical_and_information_objects" style="display: block; text-align: center; margin: 0 auto;">
          <img src="media/06_eisen/Physical_and_information_object.png" alt="Semantisch model fysieke objecten en informatie objecten" style="width: 100%; max-width: 800px; height: auto; display: block; margin: 0 auto;"/>
          <figcaption>
            <a class="self-link" href="#fig-Physical_and_information_objects"></bdi></a>
            <span class="fig-title">
            Semantisch model fysieke objecten en informatie objecten
            </span>
          </figcaption>
    </figure>

### Wat betekent dit praktisch voor GeoBIM-gebruik?

Door deze afspraken wordt een BIM-model geschikt voor koppeling en hergebruik binnen een GEO-omgeving. Objecten kunnen automatisch worden herkend en vertaald naar geo-objecten doordat geometrie, semantiek, classificatie en metadata eenduidig zijn vastgelegd. De noodzaak voor handmatige bewerking neemt af en BIM-informatie wordt betrouwbaarder bruikbaar voor beheer, analyse en besluitvorming.

Concreet betekent dit:

- **Georeferentie zorgt ervoor dat BIM en GEO ruimtelijk op elkaar aansluiten.** Een object uit het BIM-model — bijvoorbeeld een brug of een leiding — komt op de juiste positie in een GIS-kaart terecht.
- **Typering en classificatie maken objecten herkenbaar.** Een `IfcWall`, `IfcPipeSegment` of `IfcBridgePart` kan worden gekoppeld aan het juiste GEO-objecttype.
- **Attributen en properties zorgen dat relevante informatie behouden blijft.** Materiaal, status, levensfase of beheerinformatie wordt meegenomen naar de GEO-dataset.
- **Sluitende geometrie maakt afleiding mogelijk.** Volumes, oppervlakten, hoogten en voetafdrukken zijn alleen berekenbaar uit gesloten geometrie.
- **Gestandaardiseerde metadata maakt datasets vindbaar en begrijpelijk.** Gebruikers weten wat het model bevat, wie het heeft gemaakt, welke versie het is en waarvoor het geschikt is.
- **Het voorkomen van doublures en doorsnijdingen voorkomt interpretatieproblemen.** Objecten worden niet dubbel weergegeven of verkeerd gecombineerd in BIM/GIS-omgevingen.
- **Clashcontroles worden betrouwbaarder.** Doordat objecten eenduidig zijn gemodelleerd en correct zijn gegeorefereerd, zijn geometrische conflicten beter op te sporen.

## Landelijke BIM-afspraken

In Nederland bestaan landelijke BIM-afspraken die zorgen voor een eenduidige werkwijze en die interoperabiliteit, datakwaliteit en samenwerking bevorderen. Conform ISO 19650 zijn deze afspraken opgebouwd uit drie samenhangende onderdelen: de InformatieLeveringsSpecificatie (ILS), het Informatieprotocol (IP) en het BIM Uitvoeringsplan (BUP). Samen beschrijven zij de informatie-eisen, de afspraken over informatiebeheer, verantwoordelijkheden en eigendom, en de inrichting van de BIM-samenwerking.

<figure id="ILS-IP-BUP-digigo" style="display: block; text-align: center; margin: 0 auto;">
      <img src="media/06_eisen/ILS_Protocl_en_BUP.png" alt="Informatie Levering Specificatie (ILS), Informatie Protocol (IP) en Bim Uitvoerings Plan (BUP) als contractuele afspraak over data-creatie, -overdracht en -gebruik." style="width: 100%; max-width: 800px; height: auto; display: block; margin: 0 auto;"/>
      <figcaption>
        <a class="self-link" href="#fig-ILS-IP-BUP-digigo"></bdi></a>
        <span class="fig-title">
        Informatie Levering Specificatie (ILS), Informatie Protocol (IP) en Bim Uitvoerings Plan (BUP) als contractuele afspraak over data-creatie, -overdracht en -gebruik. <br>
        Bron: <a href="https://www.digigo.nu/ilsen-en-richtlijnen/informatieprotocol/">DigiGO</a>.
        </span>
      </figcaption>
</figure>

De rolverdeling is daarbij scherp: de ILS beschrijft *wat* er geleverd wordt, het Informatieprotocol verankert dat *juridisch* en het BUP beschrijft *hoe* het projectteam daaraan gaat voldoen. In deze praktijkrichtlijn ligt de nadruk op de ILS, omdat die de randvoorwaarden bevat die de technische conversie van BIM naar GEO mogelijk maken.

DigiGO beheert een aantal templates en sectorbrede standaarden, waaronder de BIM Basis ILS (gericht op de bouw), de BIM Basis Infra (gericht op infrastructuur), de ILS Ontwerp & Engineering, het nationaal model Informatieprotocol en het nationaal template BIM Uitvoeringsplan. Deze richtlijnen bieden een set afspraken en handvatten voor het gestructureerd en eenduidig uitwisselen van digitale informatie. Organisaties en projecten werken de landelijke sectorafspraken verder uit en leggen die uitwerking vast in contracten.

<figure id="BIM-digigo" style="display: block; text-align: center; margin: 0 auto;">
      <img src="media/06_eisen/BIM landschap.png" alt="Het BIM afspraken landschap" style="width: 100%; max-width: 800px; height: auto; display: block; margin: 0 auto;"/>
      <figcaption>
        <a class="self-link" href="#fig-BIMdigigo"></bdi></a>
        <span class="fig-title">
        Samenwerking in BIM op basis van sectorafspraken
        </span>
      </figcaption>
</figure>

Gestandaardiseerd BIM is een voorwaarde voor BIM-naar-GEO-conversie, maar het is geen voldoende voorwaarde. Aan beide zijden bestaan afspraken — de BIM Basis ILS aan de ene kant, [BGT|IMGeo](https://www.geonovum.nl/geo-standaarden/bgt-imgeo) en de basisregistraties aan de andere — maar een verbindende laag tussen beide werelden ontbreekt. Een model dat volgens de BIM Basis ILS is opgebouwd en een dataset volgens IMGeo sluiten daardoor niet één-op-één op elkaar aan. Een toekomstig toepassingsprofiel kan die koppeling ondersteunen door afspraken vast te leggen over objectidentificatie, geometrie, semantiek en informatie-uitwisseling.

## InformatieLeveringsSpecificatie (ILS)

Een ILS legt vast welke informatie, wanneer en door welke partij geproduceerd moet worden.

In Nederland wordt "ILS" gebruikt als overkoepelende term. Daardoor bevat een ILS in de praktijk vaak elementen van wat volgens de [buildingSMART-terminologie](https://user.buildingsmart.org/knowledge-base/terminology/) een IDM (Information Delivery Manual), een IDS (Information Delivery Specification) of een EIR (Exchange Information Requirements) heet. In de buildingSMART-systematiek omvat een IDM zowel een EIR als een IDS. Dat verschil is meer dan terminologisch: een IDM beschrijft het *proces* en de rollen, een IDS beschrijft de *toetsbare* eis op een informatiecontainer. Wie beide in één document vermengt, krijgt eisen die niet te automatiseren zijn.

Een ILS conform het begrip IDS kan in mens- en/of computerinterpreteerbare vorm worden opgesteld. Voor het laatste zijn twee gangbare routes:

- buildingSMART heeft de standaard [Information Delivery Specification](https://www.buildingsmart.org/standards/bsi-standards/information-delivery-specification-ids/) (IDS) ontwikkeld, sinds versie 1.0 een vastgestelde buildingSMART-standaard. Een IDS is een XML-bestand dat aangeeft welke data vastgelegd moet worden en waaraan die moet voldoen. Hetzelfde bestand kan in uiteenlopende applicaties worden gebruikt om IFC-bestanden tegen die eisen te valideren.
- Vanuit de Nederlandse en Europese normalisatie zijn respectievelijk [NEN 2660-2](https://www.nen.nl/en/nen-2660-2-2022-nl-291667) en *Building information modelling (BIM) — Semantic modelling and linking (SML)* [NEN-EN 17632](https://www.nen.nl/nen-en-17632-1-2022-en-304869) ontwikkeld. Hiermee is het mogelijk om via de Linked Data-standaard SHACL restricties vast te leggen en door de computer te laten valideren.

Om te voorkomen dat voor iedere ILS opnieuw over objecten en kenmerken wordt nagedacht, is het sterk aan te raden een bestaande standaard of ontologie als basis te gebruiken. Voorbeelden zijn de [ILS O&E](https://www.digigo.nu/ilsen-en-richtlijnen/ils-ontwerp-en-engineering/), [IMBOR](https://www.crow.nl/kennisproducten/imbor/) en de [NLCS](https://www.digigo.nu/standaarden/nlcs/). Hergebruik van standaarden vergroot bovendien de herkenbaarheid van de data tussen disciplines.

### Hoe een IDS is opgebouwd

Een IDS-bestand bestaat uit twee delen: een `ids:info`-blok met metadata over de specificatie zelf — titel, auteur, versie, datum, leveringsmoment — en een `ids:specifications`-blok met een lijst van specificaties.

Elke specificatie is een zelfstandige, toetsbare regel en bestaat uit twee helften:

- **Applicability** — op welke objecten de regel van toepassing is. De selectie kan gebeuren op entiteit (`IfcWall`), op classificatie (NL-SfB 31), op eigenschap, op materiaal of op een relatie met een ander object. Met `minOccurs`/`maxOccurs` op de applicability wordt bovendien uitgedrukt hóéveel van die objecten er in het model moeten zitten — zo dwingt `minOccurs="1"` af dat er ten minste één zo'n object aanwezig is.
- **Requirements** — waaraan die objecten moeten voldoen. Ook hier zijn de bouwstenen entiteit, relatie, classificatie, attribuut, eigenschap en materiaal. Per eis is met `cardinality` aan te geven of die verplicht, optioneel of juist verboden is.

Deze bouwstenen heten *facets*. Waarden zijn vast op te geven of te begrenzen met een XML-restrictie: een opsomming van toegestane waarden, een patroon of een numeriek bereik.

Een specificatie leest daarmee altijd als: *"voor alle objecten die aan A voldoen, geldt eis B"*. Zie de bijlage voor uitgewerkte voorbeelden.

Enkele praktische aandachtspunten bij het schrijven:

- Entiteits- en typenamen worden in hoofdletters geschreven (`IFCWALL`, niet `IfcWall`).
- Het `ifcVersion`-attribuut is verplicht en accepteert `IFC2X3`, `IFC4` en `IFC4X3_ADD2`, eventueel meerdere tegelijk.
- Gebruik `description` en `instructions` royaal. `instructions` is bedoeld voor de modelleur en kan door de BIM-applicatie worden getoond — het is de plek om uit te leggen *hoe* aan de eis wordt voldaan, niet alleen *dat* eraan voldaan moet worden.
- Een eigenschap wordt aangesproken op de naam zoals die in het IFC-bestand staat (`baseName`), niet op de vertaalde weergave in de gebruikersinterface.

### Wat een IDS wél en niet kan toetsen

Een veelgemaakte aanname is dat een geslaagde IDS-validatie gelijkstaat aan een bruikbaar model. Dat is niet zo. IDS toetst de *semantische* inhoud van een IFC-bestand: welke entiteiten aanwezig zijn, welke attributen, eigenschappen, classificaties, materialen en relaties zij hebben, en welke waarden daarin zijn toegestaan. Wat een IDS niet toetst is geometrie en topologie: of een volume gesloten is, of twee objecten elkaar doorsnijden, of een contour klopt.

#### Georeferentie: verder te krijgen dan vaak wordt aangenomen

Georeferentie wordt meestal in hetzelfde rijtje gezet — ten onrechte, zo blijkt in de praktijk.

De aanname dat het niet kan, is niet ongegrond. `IfcMapConversion` en `IfcProjectedCRS` zijn afgeleid van `IfcCoordinateOperation` respectievelijk `IfcCoordinateReferenceSystem`, en dus niet van `IfcRoot`. Zij zijn geen objecten in de gebruikelijke zin: ze hebben geen `GlobalId`, geen eigenschappen en geen relaties. De IDS-documentatie is geschreven vanuit objecten — muren, deuren, ruimten — en zegt niets over entiteiten die daarbuiten vallen.

Toch werkt het. De ILS voor Ruimten in de Omgevingswet bevat specificaties die rechtstreeks `IFCMAPCONVERSION` en `IFCPROJECTEDCRS` als applicability nemen, en die door gangbare validatiesoftware worden uitgevoerd. Bij de totstandkoming van deze praktijkrichtlijn is dat nagegaan met de referentie-implementatie uit IfcOpenShell: de specificaties zijn schemavalide, worden uitgevoerd, en gedragen zich zoals bedoeld — een model zonder georeferentie faalt op de `minOccurs`-eis, een model met een onvolledig ingevulde `IfcMapConversion` of een niet-toegestane EPSG-waarde faalt op de attribuuteis.

Daarmee is een aanzienlijk deel van level 50 wél machinaal af te dwingen vanuit de ILS zelf:

| Wat een IDS aantoonbaar kan toetsen | Wat een IDS niet kan toetsen |
|---|---|
| Is er een `IfcMapConversion` of `IfcMapConversionScaled` aanwezig? | Klopt de waarde — ligt het model werkelijk op die coördinaat? |
| Zijn `Eastings`, `Northings`, `OrthogonalHeight`, `XAxisAbscissa`, `XAxisOrdinate` en `Scale` gevuld? | Komt de vastgelegde rotatie overeen met de werkelijke oriëntatie van de geometrie? |
| Is er een `IfcProjectedCRS`, en heeft die een toegestane EPSG-aanduiding? | Is de schaalfactor consistent met de `IfcUnitAssignment` van het model? |
| Is het verticale datum ingevuld? | Ligt de modelgeometrie in de buurt van de opgegeven oorsprong? |

De scheidslijn loopt dus niet tussen "georeferentie wel of niet", maar tussen **aanwezigheid en vorm** — toetsbaar met IDS — en **juistheid** — alleen vast te stellen door de geometrie zelf te bekijken. Dat onderscheid is belangrijk: het eerste vangt de meeste fouten die er in de praktijk zijn, want ontbrekende of half ingevulde georeferentie komt veel vaker voor dan een verkeerd ingevulde.

Eén technisch punt is daarbij beslissend. **IDS kent geen automatische overerving in het entiteitsfacet**; de gebruikershandleiding stelt expliciet dat alle entiteiten afzonderlijk moeten worden opgesomd. Een specificatie op `IFCMAPCONVERSION` treft daardoor géén `IfcMapConversionScaled`, ook al is dat een subtype — precies de route die de praktijkrichtlijn Georefereren voor RDNAP aanbeveelt. Beide moeten dus expliciet in de opsomming staan. De uitgewerkte specificaties staan in de bijlage.

> **Feedback aan de IDS-standaardcommissie van buildingSMART.** Dat dit werkt, berust op implementatiegedrag en niet op een expliciete uitspraak in de standaard. De IDS-documentatie beschrijft het entiteitsfacet in termen van objecten en gaat niet in op entiteiten die niet van `IfcRoot` zijn afgeleid. Software zoals BIM.works voert dergelijke specificaties uit, maar of dat gegarandeerd zo blijft, is nu niet vastgelegd — een implementatie zou zich strikt op de objectgerichte lezing kunnen beroepen en de specificatie negeren, wat erger is dan falen omdat het stil gebeurt.
>
> Voor georeferentie, de meest kritische eis bij elke koppeling tussen BIM en GEO, is dat onbevredigend. Het verzoek aan de commissie is daarom om **expliciet te maken of, en zo ja hoe, niet-`IfcRoot`-entiteiten in het entiteitsfacet zijn toegestaan** — en de conformiteitstestset uit te breiden met een geval voor `IfcMapConversion` en `IfcProjectedCRS`, zodat het gedrag tussen implementaties gelijk is. Deze praktijkrichtlijn gaat in de tussentijd uit van de werkende praktijk, en beveelt aan de georeferentie-eis daarnaast in de tekstuele ILS op te nemen.

#### De controle in drie trappen

Voor BIM-naar-GEO-conversie blijft een controle in drie trappen de aangewezen werkwijze:

1. **Bestandsvalidatie en precondities** — is het IFC-bestand schemavalide, ligt de modelgeometrie in de buurt van de opgegeven oorsprong, en is de omvang van het model plausibel? Een model dat hier faalt, hoeft niet verder getoetst te worden.
2. **Semantische validatie (IDS/SHACL)** — zijn de vereiste objecten, typeringen, classificaties en eigenschappen aanwezig en correct gevuld? **Inclusief de aanwezigheid en vorm van de georeferentie.**
3. **Geometrisch-topologische validatie** — zijn volumes gesloten en niet-zelfdoorsnijdend, zijn er geen doublures of ongewenste doorsnijdingen, telt de opbouw van grof naar fijn op, en kloppen de georeferentiewaarden ten opzichte van de werkelijke geometrie?

Ten opzichte van de gangbare voorstelling verschuift georeferentie hiermee gedeeltelijk van trap 1 naar trap 2. Dat is winst: wat in de ILS staat, kan de indiener zelf vooraf controleren met dezelfde tooling waarmee het bevoegd gezag toetst. Wat in trap 1 en 3 overblijft, vraagt nog steeds om afspraken in de tekstuele ILS en om aanvullende, geometrische controlesoftware. Een ILS voor BIM naar GEO kan dus nog altijd niet uitsluitend uit een IDS-bestand bestaan — maar het IDS-deel is groter dan vaak wordt gedacht.

## Werken met meerdere IDS'en

### Waarom modulair

Voor elke GEO-doeldataset gelden deels dezelfde en deels andere eisen. Een pand dat de BGT moet vullen, een pand dat de BAG moet vullen en een pand dat een 3D-model moet vullen, delen de eisen aan georeferentie, ruimtelijke structuur en typering, maar verschillen in geometrieniveau en in de attributen die meegeleverd moeten worden.

Wie voor elke doeldataset één complete ILS schrijft, kopieert die gedeelde eisen telkens opnieuw. Dat leidt tot onderhoudslast en, onvermijdelijk, tot versies die uit de pas gaan lopen. De modulaire route is om de eisen te knippen in herbruikbare, kleine ILS'en en die per doel samen te stellen:

| Bron-ILS | Bevat | Hergebruik |
|----------|-------|------------|
| `ILS.Gebouw` | ruimtelijke structuur, typering, geometrie-eisen van een bouwwerk | in elke gebouwgerelateerde levering |
| `ILS.Basisregistratie` | generieke attributen die elke basisregistratie nodig heeft (identificatie, status, bronhouder) | in elke levering aan een basisregistratie |
| `ILS.BGT` | de specifieke attributen en geometrie-eisen van BGT\|IMGeo | alleen bij levering aan de BGT |

Een levering van een gebouw aan de BGT is dan de samenstelling `ILS.Gebouw + ILS.Basisregistratie + ILS.BGT`. Een levering aan de BAG hergebruikt de eerste twee en vervangt alleen de derde.

### Samenstellen: hoe het technisch werkt

Een IDS-bestand is een geordende lijst van onderling onafhankelijke specificaties. Elke specificatie draagt haar eigen applicability en haar eigen requirements; er is geen verwijzing van de ene specificatie naar de andere en geen gedeelde context.

Daaruit volgt dat samenstellen eenvoudig is: **de samengestelde IDS bevat de specificatie-elementen van alle bron-ILS'en, ongewijzigd, in één `ids:specifications`-blok.** Het resultaat is zonder verdere bewerking geldig volgens het IDS 1.0-schema, en een validator behandelt de samengevoegde specificaties precies zoals hij de losse bestanden achter elkaar zou behandelen.

De IDS-standaard voorziet deze werkwijze ook expliciet. Het schema merkt bij het `identifier`-attribuut van een specificatie op dat globale uniciteit niet kan worden afgedwongen *"because of the possibility to combine different 'specification' elements from several ids files"*. Samenstellen is dus voorzien — maar de standaard legt niet vast wat er semantisch gebeurt en welke regels daarbij gelden. Dat is precies het gat dat deze praktijkrichtlijn invult.

De betekenis van samenstellen is **additief**. Een model voldoet aan de samengestelde IDS dan en slechts dan als het aan elke afzonderlijke specificatie voldoet. De volgorde van de specificaties doet er niet toe, en een bron-ILS toevoegen kan het geheel alleen strenger maken, nooit soepeler.

### Wanneer spreken twee specificaties elkaar tegen?

Aanscherping is geen tegenspraak. Als de ene bron-ILS eist dat een eigenschap aanwezig is en een andere eist dat diezelfde eigenschap een bepaalde waarde heeft, dan geldt in de samenstelling gewoon de strengste eis. Hetzelfde geldt voor dubbel geformuleerde eisen: dat is redundantie, hinderlijk voor het onderhoud maar niet fout.

Van een echte tegenspraak is sprake wanneer twee specificaties **overlappende applicability** hebben en hun eisen **door geen enkel object tegelijk vervuld kunnen worden**. Drie herkenbare vormen:

1. **`required` tegenover `prohibited`** op hetzelfde facet — bijvoorbeeld de ene ILS eist `Pset_BuildingCommon.YearOfConstruction` en een andere verbiedt die eigenschap.
2. **Disjuncte waardeverzamelingen** — de ene ILS staat als entiteit alleen `IFCWINDOW` toe, de andere alleen `IFCDOOR`, voor dezelfde selectie objecten.
3. **Onverenigbare `ifcVersion`** — bron-ILS'en die op verschillende, elkaar uitsluitende schema's zijn geschreven.

Cruciaal is wat er gebeurt als zo'n tegenspraak niet wordt opgemerkt: **niets zichtbaars.** Een samengestelde IDS met een tegenspraak is gewoon schemavalide, en een validator meldt eenvoudigweg dat één van de twee specificaties faalt — voor elk model, ongeacht de inhoud. De fout presenteert zich dus als "het model voldoet niet", terwijl in werkelijkheid de afspraak niet klopt. Dat is een dure vergissing, omdat hij bij de leverancier van het model terechtkomt in plaats van bij de beheerder van de afspraak.

> Deze eigenschappen zijn nagegaan op de IDS 1.0-schemadefinitie en op werkende bestanden. Drie bron-ILS'en zijn samengevoegd tot één IDS en tegen een IFC-model gevalideerd: alle specificaties slagen, zonder enige aanpassing aan de specificaties zelf. Een opzettelijk tegenstrijdige samenstelling is als schemavalide geaccepteerd zonder waarschuwing, en faalde vervolgens in beide richtingen — bij een model mét de eigenschap faalde de verbiedende specificatie, bij een model zónder die eigenschap de verplichtende. Zie de bijlage.

### Regels voor het samenstellen

Uit het bovenstaande volgen zeven afspraken. Zij vullen aan wat de IDS-standaard openlaat en zijn bedoeld om per doeldataset te worden toegepast.

1. **Elke bron-ILS is een zelfstandig, versiebeheerd bestand.** Bron-ILS'en worden gepubliceerd en beheerd als afzonderlijke artefacten, met een eigen naam, versie en beheerder.
2. **Elke specificatie krijgt een globaal unieke `identifier`.** Omdat de standaard geen uniciteit garandeert, is dit de enige manier om na samenvoeging te kunnen zien uit welke bron een gefaalde eis afkomstig is. Een herkomstprefix (`GEB-01`, `BR-01`, `BGT-01`) volstaat binnen één beheerorganisatie; de robuustere route is de identifier te laten samenvallen met de **bSDD-URI van het begrip waarover de specificatie gaat**, bijvoorbeeld `https://identifier.buildingsmart.org/uri/bsnl/…/class/Verblijfsruimte`. Dan is de identifier per definitie uniek, verwijst hij naar een definitie in plaats van naar een volgnummer, en is de herkomst ook buiten de eigen organisatie herkenbaar. De ILS voor Ruimten in de Omgevingswet past dit toe.
3. **Samenstellen is additief en ongewijzigd.** Specificaties worden bij het samenstellen niet herschreven, samengevoegd of geoptimaliseerd. Wat de bron-ILS zegt, staat ongewijzigd in de samenstelling.
4. **Aanscherpen mag, versoepelen niet.** Een bron-ILS met een smallere scope mag een eis strenger maken dan een generiekere bron-ILS. Het omgekeerde is geen geldige samenstelling maar een ontwerpfout in de afsprakenset.
5. **Tegenspraken worden vóór publicatie opgelost**, door de beheerder van de doeldataset, niet tijdens validatie en niet door de leverancier van het model.
6. **De samengestelde IDS wordt als één bestand per doeldataset en leveringsmoment gepubliceerd**, met een eigen versienummer en een `ids:info` die de gebruikte bron-ILS'en met hun versies benoemt.
7. **Alleen de samengestelde IDS is contractueel.** De bron-ILS'en zijn bouwstenen; de gepubliceerde samenstelling is waaraan geleverd en getoetst wordt. Dat voorkomt dat partijen op verschillende combinaties van bronversies uitkomen.

### Wat een samenstelstap moet controleren

Omdat de standaard zelf niets controleert, hoort de controle in het samenstelproces te zitten. Een samenstelstap — handmatig of met gereedschap — signaleert ten minste:

- specificaties met identieke of overlappende applicability;
- `required` tegenover `prohibited` op hetzelfde facet binnen die overlap;
- waardeverzamelingen die elkaar binnen die overlap uitsluiten;
- dubbel voorkomende `identifier`-waarden;
- onverenigbare `ifcVersion`-declaraties;
- het aantal overgenomen specificaties per bron-ILS, zodat een stilzwijgend weggevallen bron opvalt.

Een samenstelling die op een van deze punten afgaat, wordt niet gepubliceerd.

<mark>Redactie: er is een proof-of-concept-tool die meerdere IDS-bestanden inleest, per fase verdeelt en per eis optioneel/verplicht laat zetten. Hier een verwijzing opnemen bij "optionele configuratietools voor IDS", naast de beschikbare commerciële en gratis IDS-editors. Link nog toe te voegen; beheer en status van de tool zijn nog niet belegd.</mark>

## Van BIM-eis naar GEO-product

### Elke conversiemethode veronderstelt een ILS

Hoofdstuk 9 beschrijft de methoden om BIM naar GEO te brengen. Die methoden staan niet los van dit hoofdstuk: **elke methode veronderstelt eisen aan het BIM-model, of die nu zijn opgeschreven of niet.**

Een methode die een verdiepingsoppervlak afleidt door de bouwlagen uit het IFC-bestand te nemen, werkt alleen als die bouwlagen er zijn, op de juiste hoogte staan en alle relevante objecten eraan gekoppeld zijn. Een methode die kameroppervlakken afleidt uit ruimten, werkt alleen als die ruimten aanwezig en sluitend zijn — én als ze werkelijk kamers zijn en niet, zoals ook mag in IFC, een parkeerplaats of een gebruiksoppervlakteruimte. Dat zijn eisen aan het BIM-model. Ze vormen samen een ILS, ook wanneer die nergens als zodanig is vastgelegd.

Het expliciet maken van die impliciete ILS kost weinig en levert drie dingen op:

- de leverancier van het model weet vooraf waaraan hij moet voldoen, in plaats van achteraf te horen dat de conversie is mislukt;
- een mislukte conversie wordt een aanwijsbare non-conformiteit in plaats van "de tool doet het niet";
- de methode wordt reproduceerbaar tussen verschillende softwarepakketten, omdat de aannames van de ene implementatie zichtbaar worden voor de andere.

> **Begripsafbakening.** *LOD* betekent in de GEO-wereld *level of detail*: het geometrische detailniveau van een geo-object. Dat is iets anders dan de *Level of Information Need* uit ISO 7817-1 en dan het begrip *level of development* uit de BIM-wereld. Deze praktijkrichtlijn houdt de begrippen strikt gescheiden en gebruikt "LOD" uitsluitend in de geo-betekenis.

### Uitgewerkt: de impliciete ILS achter LOD 0.2

De methode voor LOD 0.2 in hoofdstuk 9 leidt uit één brongebouwmodel meerdere vlakproducten af: een dakoppervlak, een grondvoetafdrukoppervlak, een verdiepingsoppervlak en een kameroppervlak. De methode wordt daar beschreven zonder afzonderlijke ILS. Dat is te begrijpen — er hoeft geen nieuwe informatie te worden toegevoegd — maar het betekent niet dat er geen eisen gelden. De methode leunt op de aanwezigheid van specifieke IFC-entiteiten, en dat zijn eisen aan het BIM-model.

Onderstaande tabel maakt die eisen expliciet en geeft ze een specificatienummer, zodat ze als bron-ILS `ILS.Gebouw` gepubliceerd kunnen worden.

| GEO-product (LOD 0.2) | Afgeleid uit | Eis aan het BIM-model | Spec. |
|---|---|---|---|
| Verdiepingsoppervlak | `IfcBuildingStorey` | ten minste één bouwlaag, benoemd, met ingevulde `Elevation` | GEB-01 |
| — | `IfcRelContainedInSpatialStructure` | elk fysiek element is aan een bouwlaag gekoppeld | GEB-02 |
| Kameroppervlak | `IfcSpace` | ruimten aanwezig, sluitend en zonder overlap; `PredefinedType` ingevuld, zodat een kamer te onderscheiden is van een parkeerplaats (`PARKING`) of een gebruiksoppervlakteruimte (`GFA`) | GEB-03 |
| Grondvoetafdrukoppervlak | externe elementen op maaiveldniveau | `IsExternal` gevuld op wanden, vloeren en daken; gesloten geometrie | GEB-04 |
| Dakoppervlak | `IfcRoof` en onderliggende `IfcSlab` | `IfcSlab.PredefinedType` onderscheidt `ROOF` van `FLOOR`; het dak heeft daadwerkelijk geometrie | GEB-05 |
| *alle producten* | `IfcMapConversion` of `IfcMapConversionScaled`, plus `IfcProjectedCRS` | georeferentie op level 50 aanwezig en juist | GEO-01, GEO-02 — aanwezigheid en vorm in IDS; juistheid als geometrische controle |

De laatste regel is de belangrijkste. Zonder georeferentie zijn alle afgeleide vlakken geometrisch correct en ruimtelijk waardeloos. Het is tegelijk de regel die het scherpst laat zien waar de grens van IDS ligt: dát er een `IfcMapConversion` is en dát de zes transformatieattributen gevuld zijn, is met een IDS af te dwingen; of het model daarmee ook werkelijk op de goede plek en in de goede richting terechtkomt, blijkt pas uit de geometrie. Zie *Wat een IDS wél en niet kan toetsen* voor die scheidslijn, en de bijlage voor de uitgewerkte specificaties.

De uitgeschreven specificaties GEB-01 tot en met GEB-05 staan in de bijlage.

### Overzicht: welke eisen bij welk GEO-product

Onderstaande tabel koppelt de generieke eisen uit dit hoofdstuk aan de methoden uit hoofdstuk 9. Zij is bedoeld als leeswijzer, niet als volledige mapping.

| GEO-product | Bron-ILS'en | Aanvullende eisen bovenop de basis |
|---|---|---|
| Omhullende / LOD0-volume | `ILS.Gebouw` | gesloten volumes; ten minste één `IfcProduct` met `Body`-geometrie |
| BGT-vlak | `ILS.Gebouw` + `ILS.Basisregistratie` + `ILS.BGT` | LOD0-vlakgeometrie; IMGeo-attributen |
| BAG-pand | `ILS.Gebouw` + `ILS.Basisregistratie` + `ILS.BAG` | pandafbakening expliciet; `Pset_BuildingCommon` |
| 3D-gebouwmodel | `ILS.Gebouw` + `ILS.Basisregistratie` + `ILS.3D` | `IfcSlab` met `PredefinedType`, `IfcRoof`, `IfcWall`; volledige bouwlaagstructuur |
| 3D-model met openingen | idem + `ILS.Openingen` | `IfcWindow`/`IfcDoor` in echte sparingen; classificatie consistent met typering |

Twee begripskwesties die bij het uitwerken van deze mapping opgelost moeten worden:

- **`IfcBuilding` is niet hetzelfde als een pand.** Een `IfcBuilding` kan meerdere panden omvatten of juist een deel van een pand zijn. De afbakening moet expliciet worden afgesproken: afleiden uit de externe elementen op maaiveldniveau, of expliciet aangeven met bijvoorbeeld een `IfcZone` per pand. <mark>Redactie: dit is een normatieve keuze die nog gemaakt moet worden.</mark>
- **De attributenmapping van de basisregistraties naar IFC is nog niet compleet.** Voor de identificatie bestaat een afspraak; voor de overige attributen nog niet. <mark>Redactie: dit is een aparte werkzaamheid, buiten deze praktijkrichtlijn te beleggen.</mark>

---

> ### Praktijkvoorbeeld 1 — Precondities vóór inhoudelijke toetsing
>
> In een traject rond geautomatiseerde vergunningcontrole wordt een IFC-model van een aanvrager machinaal getoetst aan regels uit het omgevingsplan en het bouwbesluit. Bij het opstellen van die toetsen bleek dat een aanzienlijk deel van de mislukte controles niet werd veroorzaakt door de regels zelf, maar door modellen die de basis niet op orde hadden.
>
> Daarom is een set precondities gedefinieerd die vóór elke inhoudelijke toets wordt uitgevoerd: is een georeferentie aanwezig; bevindt de modelgeometrie zich in de buurt van de gerefereerde oorsprong; valt de bounding box binnen een plausibele maatvoering. Een model dat op een preconditie faalt, wordt niet inhoudelijk getoetst.
>
> Van deze drie is de eerste inmiddels ook in de ILS zelf ondergebracht, als IDS-specificatie op `IfcMapConversion` en `IfcProjectedCRS`. De twee andere blijven geometrische controles: zij vergelijken de vastgelegde waarden met de werkelijke ligging en omvang van het model, en dat is geen semantische toets.
>
> **Voor deze praktijkrichtlijn:** neem de precondities op als eerste trap in de acceptatieprocedure, gescheiden van de semantische validatie — maar breng naar de ILS toe wat in de ILS kan, zodat de indiener het vooraf zelf kan controleren.

> ### Praktijkvoorbeeld 2 — Modulaire ILS'en in de praktijk
>
> Bij het opstellen van een leveringsspecificatie voor ruimtelijke informatie is gekozen voor een opbouw van grof naar fijn — gebouwinhoud → bouwlaaginhoud → gebruiksfunctie → gebieden → ruimten — waarbij elk niveau optelbaar is en niveaus elkaar niet overlappen. Dat model is gepubliceerd in de bSDD en vertaald naar een IDS.
>
> Twee ontwerpkeuzes uit dat traject zijn direct relevant:
>
> - **Geen nationale property sets.** In plaats van een eigen `Pset` wordt gewerkt met de bestaande IFC-attributen `Name`, `ObjectType` en `Description`, met `PredefinedType = USERDEFINED` en een Nederlandse term in `ObjectType`. Daarmee blijft het model leesbaar voor generieke IFC-software — en blijft de bijbehorende IDS combineerbaar met andere bron-ILS'en, omdat er geen eigen naamruimte in het spel is.
> - **Optelbaarheid als toetsbare eis.** Doordat ruimten sluitend en zonder overlap gemodelleerd moeten zijn, is de som van de ruimten per bouwlaag controleerbaar tegen de bouwlaaginhoud. Dit is dezelfde eis die hierboven onder *Geometrierepresentatie* is opgenomen — vanuit een andere behoefte, met dezelfde uitkomst.
>
> **Voor deze praktijkrichtlijn:** een ruimtemodel is een bruikbare tussenlaag tussen bouwdeelgerichte BIM-modellen en objectgerichte GEO-datasets.

> ### Praktijkvoorbeeld 3 — Afleiden in plaats van extra attributen eisen
>
> Voor een toets op maximale bouwhoogte is de gebouwhoogte nodig. Dat begrip bestond niet in de gebruikte leveringsspecificatie, en de eerste reflex was om een attribuut "gebouwhoogte" toe te voegen.
>
> Daarvoor is niet gekozen. In plaats daarvan is een set afgeleide eigenschappen gedefinieerd — referentiepeil, nok- en goothoogte, voetafdrukcontour, oppervlakten per ruimte — die uit de geleverde geometrie worden berekend. De leverancier levert die eigenschappen dus niet, mits de geometrische basis op orde is: een correcte georeferentie, sluitende ruimten en een volledige bouwlaagstructuur.
>
> Dat verschuift de aandacht in de ILS van *meer attributen eisen* naar *de geometrische basis eisen die afleiding mogelijk maakt*. Het voorkomt tegenstrijdigheden tussen een geleverd getal en de geometrie waaruit datzelfde getal berekend kan worden.
>
> **Voor deze praktijkrichtlijn:** onderscheid in de ILS expliciet tussen *te leveren* en *af te leiden* eigenschappen, en stel voor de af te leiden eigenschappen eisen aan de geometrie in plaats van aan het attribuut. Dit is dezelfde redenering als in *Elke conversiemethode veronderstelt een ILS*, van de andere kant benaderd.

---

Zie ook de use case-beschrijving [IFC to CityGML conversion](https://ucm.buildingsmart.org/en/use-cases/3536/en) in de buildingSMART Use Case Management-omgeving.
