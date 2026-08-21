# Bijlage F — Voorbeeld-IDS'en

<mark>Redactie: bijlageletter nog vast te stellen; deze bijlage sluit aan op de bestaande bijlage met het voorbeeld voor status en maatregel.</mark>

Deze bijlage bevat de uitgeschreven specificaties bij het hoofdstuk *Eisen aan model en mapping*. De voorbeelden zijn opgesteld volgens buildingSMART IDS 1.0 en gevalideerd tegen het bijbehorende XML-schema.

De bijlage is opgebouwd volgens de modulaire werkwijze uit *Werken met meerdere IDS'en*: eerst drie bron-ILS'en, dan de samenstelling daarvan tot één gepubliceerde IDS, en tot slot een voorbeeld van wat er misgaat wanneer twee bron-ILS'en elkaar tegenspreken.

## F.1 Leeswijzer

Elke specificatie draagt een `identifier` met een herkomstprefix, zodat na samenvoeging zichtbaar blijft uit welke bron-ILS een gefaalde eis afkomstig is:

| Prefix | Bron-ILS | Onderwerp |
|--------|----------|-----------|
| `GEB-` | `ILS.Gebouw` | ruimtelijke structuur, typering en geometrie van een bouwwerk |
| `BR-` | `ILS.Basisregistratie` | generieke attributen voor levering aan een basisregistratie |
| `BGT-` | `ILS.BGT` | specifieke eisen voor levering aan de BGT |

In alle voorbeelden is `ifcVersion="IFC4 IFC4X3_ADD2"` aangehouden. Entiteits- en typenamen staan in hoofdletters; dat is een eis van de IDS-standaard.

## F.2 ILS.Gebouw

Deze bron-ILS maakt de eisen expliciet die de LOD 0.2-methode uit hoofdstuk 9 impliciet aan het BIM-model stelt. De nummers corresponderen met de tabel in *Uitgewerkt: de impliciete ILS achter LOD 0.2*.

Let bij het lezen op twee dingen. De specificaties GEB-01 en GEB-03a gebruiken `minOccurs="1"` op de applicability: dat dwingt af dat het model daadwerkelijk bouwlagen respectievelijk ruimten bevat. GEB-02 en GEB-03b gebruiken `minOccurs="0"`: die eisen gelden voorwaardelijk — *als* er wanden zijn, moeten ze aan een bouwlaag hangen; *als* een ruimte `USERDEFINED` is, moet `ObjectType` gevuld zijn — maar dwingen hun aanwezigheid niet af.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ids:ids xmlns:ids="http://standards.buildingsmart.org/IDS"
         xmlns:xs="http://www.w3.org/2001/XMLSchema"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://standards.buildingsmart.org/IDS http://standards.buildingsmart.org/IDS/1.0/ids.xsd">
  <ids:info>
    <ids:title>ILS.Gebouw</ids:title>
    <ids:version>0.1</ids:version>
    <ids:description>Eisen aan de ruimtelijke structuur, typering en geometrie van een bouwwerk, benodigd voor afleiding van vlakproducten naar GEO.</ids:description>
    <ids:purpose>Bron-ILS, bedoeld om samengesteld te worden met een basisregistratie- en een datasetspecifieke ILS.</ids:purpose>
  </ids:info>
  <ids:specifications>

    <!-- GEB-01: verdiepingsoppervlak -->
    <ids:specification name="Bouwlagen aanwezig en op hoogte"
                       ifcVersion="IFC4 IFC4X3_ADD2"
                       identifier="GEB-01"
                       description="Het model bevat ten minste een bouwlaag, met naam en met een ingevulde hoogteligging."
                       instructions="Gebruik de bouwlaagfunctie van de BIM-applicatie; modelleer bouwlagen niet als losse groepen.">
      <ids:applicability minOccurs="1" maxOccurs="unbounded">
        <ids:entity>
          <ids:name><ids:simpleValue>IFCBUILDINGSTOREY</ids:simpleValue></ids:name>
        </ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:attribute cardinality="required">
          <ids:name><ids:simpleValue>Name</ids:simpleValue></ids:name>
        </ids:attribute>
        <ids:attribute cardinality="required">
          <ids:name><ids:simpleValue>Elevation</ids:simpleValue></ids:name>
        </ids:attribute>
      </ids:requirements>
    </ids:specification>

    <!-- GEB-02: elementen gekoppeld aan een bouwlaag -->
    <ids:specification name="Elementen gekoppeld aan een bouwlaag"
                       ifcVersion="IFC4 IFC4X3_ADD2"
                       identifier="GEB-02"
                       description="Elk fysiek element is opgenomen in de bouwlaag waarin het zich bevindt."
                       instructions="Elementen die niet aan een bouwlaag hangen, kunnen niet aan een verdiepings- of pandvlak worden toegewezen.">
      <ids:applicability minOccurs="0" maxOccurs="unbounded">
        <ids:entity>
          <ids:name>
            <xs:restriction base="xs:string">
              <xs:enumeration value="IFCWALL"/>
              <xs:enumeration value="IFCWALLSTANDARDCASE"/>
              <xs:enumeration value="IFCSLAB"/>
              <xs:enumeration value="IFCROOF"/>
              <xs:enumeration value="IFCCOLUMN"/>
              <xs:enumeration value="IFCBEAM"/>
              <xs:enumeration value="IFCCOVERING"/>
              <xs:enumeration value="IFCCURTAINWALL"/>
              <xs:enumeration value="IFCPLATE"/>
              <xs:enumeration value="IFCMEMBER"/>
            </xs:restriction>
          </ids:name>
        </ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:partOf relation="IFCRELCONTAINEDINSPATIALSTRUCTURE" cardinality="required">
          <ids:entity>
            <ids:name><ids:simpleValue>IFCBUILDINGSTOREY</ids:simpleValue></ids:name>
          </ids:entity>
        </ids:partOf>
      </ids:requirements>
    </ids:specification>

    <!-- GEB-03a: ruimten aanwezig en getypeerd -->
    <ids:specification name="Ruimten getypeerd"
                       ifcVersion="IFC4 IFC4X3_ADD2"
                       identifier="GEB-03a"
                       description="Het model bevat ruimten, elk met een ingevuld type, zodat een kamer te onderscheiden is van een parkeerplaats of een gebruiksoppervlakteruimte."
                       instructions="Een IfcSpace hoeft geen kamer te zijn. Vul PredefinedType altijd in; laat NOTDEFINED niet staan. Bestaat er geen passende internationale waarde, gebruik dan USERDEFINED met een nationale term in ObjectType.">
      <ids:applicability minOccurs="1" maxOccurs="unbounded">
        <ids:entity>
          <ids:name><ids:simpleValue>IFCSPACE</ids:simpleValue></ids:name>
        </ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:entity>
          <ids:name><ids:simpleValue>IFCSPACE</ids:simpleValue></ids:name>
          <ids:predefinedType>
            <xs:restriction base="xs:string">
              <xs:enumeration value="SPACE"/>
              <xs:enumeration value="PARKING"/>
              <xs:enumeration value="GFA"/>
              <xs:enumeration value="INTERNAL"/>
              <xs:enumeration value="EXTERNAL"/>
              <xs:enumeration value="USERDEFINED"/>
            </xs:restriction>
          </ids:predefinedType>
        </ids:entity>
      </ids:requirements>
    </ids:specification>

    <!-- GEB-03b: nationale typering afdwingen bij USERDEFINED -->
    <ids:specification name="Nationaal ruimtetype benoemd"
                       ifcVersion="IFC4 IFC4X3_ADD2"
                       identifier="GEB-03b"
                       description="Een ruimte met PredefinedType USERDEFINED draagt de nationale term in ObjectType."
                       instructions="Dit is de where-rule CorrectPredefinedType van IfcSpace, hier expliciet als leveringseis. Gebruik uitsluitend termen uit de gepubliceerde nationale termenlijst.">
      <ids:applicability minOccurs="0" maxOccurs="unbounded">
        <ids:entity>
          <ids:name><ids:simpleValue>IFCSPACE</ids:simpleValue></ids:name>
          <ids:predefinedType><ids:simpleValue>USERDEFINED</ids:simpleValue></ids:predefinedType>
        </ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:attribute cardinality="required">
          <ids:name><ids:simpleValue>ObjectType</ids:simpleValue></ids:name>
        </ids:attribute>
      </ids:requirements>
    </ids:specification>

    <!-- GEB-04: grondvoetafdruk, binnen/buiten-onderscheid -->
    <ids:specification name="Binnen-buitenonderscheid op wanden"
                       ifcVersion="IFC4 IFC4X3_ADD2"
                       identifier="GEB-04a"
                       description="Alle wanden hebben een expliciete waarde voor IsExternal, zodat de buitencontour afleidbaar is."
                       instructions="Vul IsExternal in Pset_WallCommon; laat de eigenschap niet leeg.">
      <ids:applicability minOccurs="0" maxOccurs="unbounded">
        <ids:entity>
          <ids:name>
            <xs:restriction base="xs:string">
              <xs:enumeration value="IFCWALL"/>
              <xs:enumeration value="IFCWALLSTANDARDCASE"/>
            </xs:restriction>
          </ids:name>
        </ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:property dataType="IFCBOOLEAN" cardinality="required">
          <ids:propertySet><ids:simpleValue>Pset_WallCommon</ids:simpleValue></ids:propertySet>
          <ids:baseName><ids:simpleValue>IsExternal</ids:simpleValue></ids:baseName>
        </ids:property>
      </ids:requirements>
    </ids:specification>

    <!-- GEB-05: dak- en grondvlak onderscheiden -->
    <ids:specification name="Vloeren en daken onderscheiden"
                       ifcVersion="IFC4 IFC4X3_ADD2"
                       identifier="GEB-05"
                       description="Elke vloerplaat heeft een ingevuld type, zodat grondvlak en dakvlak te onderscheiden zijn."
                       instructions="Een dakvlak modelleren als IfcSlab met PredefinedType ROOF; een begane-grondvloer als BASESLAB of FLOOR.">
      <ids:applicability minOccurs="0" maxOccurs="unbounded">
        <ids:entity>
          <ids:name><ids:simpleValue>IFCSLAB</ids:simpleValue></ids:name>
        </ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:entity>
          <ids:name><ids:simpleValue>IFCSLAB</ids:simpleValue></ids:name>
          <ids:predefinedType>
            <xs:restriction base="xs:string">
              <xs:enumeration value="FLOOR"/>
              <xs:enumeration value="ROOF"/>
              <xs:enumeration value="BASESLAB"/>
              <xs:enumeration value="LANDING"/>
            </xs:restriction>
          </ids:predefinedType>
        </ids:entity>
      </ids:requirements>
    </ids:specification>

  </ids:specifications>
</ids:ids>
```

Voor `IfcRoof` en `IfcSlab` in dakfunctie geldt dat `IfcRoof` in IFC4 een samenstelling is: de zichtbare geometrie zit in de onderliggende `IfcSlab`-objecten met `PredefinedType = ROOF`. Een ILS die alleen `IfcRoof` eist, kan daardoor een model accepteren zonder dakgeometrie. GEB-05 dekt daarom de slabs af; een aanvullende specificatie op `IFCROOF` is alleen zinvol wanneer het dak ook semantisch als geheel benoemd moet worden.

Analoog aan GEB-04a gelden GEB-04b voor `IFCSLAB` met `Pset_SlabCommon` en GEB-04c voor `IFCROOF` met `Pset_RoofCommon`. Die zijn hier weggelaten omdat ze alleen in propertySet en applicability verschillen.

## F.3 ILS.Basisregistratie

Een minimale bron-ILS met een attribuut dat elke basisregistratie nodig heeft. In een uitgewerkte versie horen hier ook identificatie, status en bronhouder in.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ids:ids xmlns:ids="http://standards.buildingsmart.org/IDS"
         xmlns:xs="http://www.w3.org/2001/XMLSchema"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://standards.buildingsmart.org/IDS http://standards.buildingsmart.org/IDS/1.0/ids.xsd">
  <ids:info>
    <ids:title>ILS.Basisregistratie</ids:title>
    <ids:version>0.1</ids:version>
    <ids:description>Generieke attributen die bij levering aan een basisregistratie in het model aanwezig moeten zijn.</ids:description>
  </ids:info>
  <ids:specifications>

    <ids:specification name="Bouwjaar aanwezig"
                       ifcVersion="IFC4 IFC4X3_ADD2"
                       identifier="BR-01"
                       description="Elk bouwwerk heeft een bouwjaar."
                       instructions="Vul YearOfConstruction in Pset_BuildingCommon op het IfcBuilding-object.">
      <ids:applicability minOccurs="1" maxOccurs="unbounded">
        <ids:entity>
          <ids:name><ids:simpleValue>IFCBUILDING</ids:simpleValue></ids:name>
        </ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:property dataType="IFCLABEL" cardinality="required">
          <ids:propertySet><ids:simpleValue>Pset_BuildingCommon</ids:simpleValue></ids:propertySet>
          <ids:baseName><ids:simpleValue>YearOfConstruction</ids:simpleValue></ids:baseName>
        </ids:property>
      </ids:requirements>
    </ids:specification>

  </ids:specifications>
</ids:ids>
```

## F.4 ILS.BGT

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ids:ids xmlns:ids="http://standards.buildingsmart.org/IDS"
         xmlns:xs="http://www.w3.org/2001/XMLSchema"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://standards.buildingsmart.org/IDS http://standards.buildingsmart.org/IDS/1.0/ids.xsd">
  <ids:info>
    <ids:title>ILS.BGT</ids:title>
    <ids:version>0.1</ids:version>
    <ids:description>Aanvullende eisen bij levering van een bouwwerk aan de BGT.</ids:description>
  </ids:info>
  <ids:specifications>

    <ids:specification name="Bouwwerk benoemd"
                       ifcVersion="IFC4 IFC4X3_ADD2"
                       identifier="BGT-01"
                       description="Elk bouwwerk draagt een naam waarmee het in de dataset herleidbaar is.">
      <ids:applicability minOccurs="1" maxOccurs="unbounded">
        <ids:entity>
          <ids:name><ids:simpleValue>IFCBUILDING</ids:simpleValue></ids:name>
        </ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:attribute cardinality="required">
          <ids:name><ids:simpleValue>Name</ids:simpleValue></ids:name>
        </ids:attribute>
      </ids:requirements>
    </ids:specification>

  </ids:specifications>
</ids:ids>
```

## F.5 De samengestelde IDS

De samenstelling van de drie bron-ILS'en is het bestand waaraan daadwerkelijk geleverd en getoetst wordt. De specificaties zijn ongewijzigd overgenomen; alleen het `ids:info`-blok is nieuw en benoemt welke bronnen in welke versie zijn verwerkt.

Hieronder is de samenstelling verkort weergegeven met één specificatie per bron; in de volledige samenstelling volgen alle specificaties van alle drie de bron-ILS'en achter elkaar.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ids:ids xmlns:ids="http://standards.buildingsmart.org/IDS"
         xmlns:xs="http://www.w3.org/2001/XMLSchema"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://standards.buildingsmart.org/IDS http://standards.buildingsmart.org/IDS/1.0/ids.xsd">
  <ids:info>
    <ids:title>ILS.BGT.Gebouw (samengesteld)</ids:title>
    <ids:version>0.1</ids:version>
    <ids:description>Samenstelling van ILS.Gebouw 0.1, ILS.Basisregistratie 0.1 en ILS.BGT 0.1. Alleen deze samenstelling is contractueel; de bron-ILS'en zijn bouwstenen.</ids:description>
    <ids:milestone>Levering bouwwerk aan de BGT</ids:milestone>
  </ids:info>
  <ids:specifications>

    <ids:specification name="Bouwlagen aanwezig en op hoogte"
                       ifcVersion="IFC4 IFC4X3_ADD2" identifier="GEB-01">
      <ids:applicability minOccurs="1" maxOccurs="unbounded">
        <ids:entity><ids:name><ids:simpleValue>IFCBUILDINGSTOREY</ids:simpleValue></ids:name></ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:attribute cardinality="required"><ids:name><ids:simpleValue>Name</ids:simpleValue></ids:name></ids:attribute>
        <ids:attribute cardinality="required"><ids:name><ids:simpleValue>Elevation</ids:simpleValue></ids:name></ids:attribute>
      </ids:requirements>
    </ids:specification>

    <ids:specification name="Bouwjaar aanwezig"
                       ifcVersion="IFC4 IFC4X3_ADD2" identifier="BR-01">
      <ids:applicability minOccurs="1" maxOccurs="unbounded">
        <ids:entity><ids:name><ids:simpleValue>IFCBUILDING</ids:simpleValue></ids:name></ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:property dataType="IFCLABEL" cardinality="required">
          <ids:propertySet><ids:simpleValue>Pset_BuildingCommon</ids:simpleValue></ids:propertySet>
          <ids:baseName><ids:simpleValue>YearOfConstruction</ids:simpleValue></ids:baseName>
        </ids:property>
      </ids:requirements>
    </ids:specification>

    <ids:specification name="Bouwwerk benoemd"
                       ifcVersion="IFC4 IFC4X3_ADD2" identifier="BGT-01">
      <ids:applicability minOccurs="1" maxOccurs="unbounded">
        <ids:entity><ids:name><ids:simpleValue>IFCBUILDING</ids:simpleValue></ids:name></ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:attribute cardinality="required"><ids:name><ids:simpleValue>Name</ids:simpleValue></ids:name></ids:attribute>
      </ids:requirements>
    </ids:specification>

  </ids:specifications>
</ids:ids>
```

Merk op dat `BR-01` en `BGT-01` dezelfde applicability hebben — alle bouwwerken — maar verschillende eisen stellen. Dat is geen tegenspraak maar een stapeling: een bouwwerk moet zowel een bouwjaar als een naam hebben. Dit is het normale geval bij samenstellen.

Validatie van deze samenstelling tegen een model met één bouwwerk, één bouwlaag, een naam en een bouwjaar levert drie geslaagde specificaties op.

## F.6 Wat er gebeurt bij een tegenspraak

Onderstaande samenstelling bevat een bewuste fout: een tweede bron-ILS verbiedt de eigenschap die de eerste verplicht stelt, voor dezelfde selectie objecten.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ids:ids xmlns:ids="http://standards.buildingsmart.org/IDS"
         xmlns:xs="http://www.w3.org/2001/XMLSchema"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://standards.buildingsmart.org/IDS http://standards.buildingsmart.org/IDS/1.0/ids.xsd">
  <ids:info>
    <ids:title>Voorbeeld van een tegenspraak</ids:title>
    <ids:description>Niet gebruiken. Illustreert dat de standaard een onvervulbare samenstelling niet signaleert.</ids:description>
  </ids:info>
  <ids:specifications>

    <ids:specification name="Bouwjaar verplicht"
                       ifcVersion="IFC4 IFC4X3_ADD2" identifier="BR-01">
      <ids:applicability minOccurs="1" maxOccurs="unbounded">
        <ids:entity><ids:name><ids:simpleValue>IFCBUILDING</ids:simpleValue></ids:name></ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:property dataType="IFCLABEL" cardinality="required">
          <ids:propertySet><ids:simpleValue>Pset_BuildingCommon</ids:simpleValue></ids:propertySet>
          <ids:baseName><ids:simpleValue>YearOfConstruction</ids:simpleValue></ids:baseName>
        </ids:property>
      </ids:requirements>
    </ids:specification>

    <ids:specification name="Bouwjaar verboden"
                       ifcVersion="IFC4 IFC4X3_ADD2" identifier="X-01">
      <ids:applicability minOccurs="0" maxOccurs="unbounded">
        <ids:entity><ids:name><ids:simpleValue>IFCBUILDING</ids:simpleValue></ids:name></ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:property dataType="IFCLABEL" cardinality="prohibited">
          <ids:propertySet><ids:simpleValue>Pset_BuildingCommon</ids:simpleValue></ids:propertySet>
          <ids:baseName><ids:simpleValue>YearOfConstruction</ids:simpleValue></ids:baseName>
        </ids:property>
      </ids:requirements>
    </ids:specification>

  </ids:specifications>
</ids:ids>
```

Dit bestand is schemavalide. Een validator meldt geen fout in de specificatie zelf, maar rapporteert bij elk model dat één van beide specificaties faalt: bevat het model een bouwjaar, dan faalt `X-01`; ontbreekt het bouwjaar, dan faalt `BR-01`. Geen enkel model kan slagen.

De consequentie is dat de fout zich manifesteert als een modelfout bij de leverancier, terwijl hij in werkelijkheid in de afspraak zit. Daarom hoort de controle op tegenspraken in het samenstelproces, vóór publicatie — zie *Wat een samenstelstap moet controleren*.

## F.7 Nationale ruimtetypen: het USERDEFINED-patroon in de praktijk

De volgende voorbeelden zijn ontleend aan de *ILS voor Ruimten in de Omgevingswet*, de leveringsspecificatie voor ruimtemodellering bij vergunningaanvragen. Zij laten zien hoe een nationale begrippenset binnen het IFC-schema wordt ondergebracht, zonder eigen property sets en zonder schema-uitbreiding.

Het Nederlandse bouwregelgevingsdomein onderscheidt ruimtelijke begrippen die het internationale `IfcSpaceTypeEnum` niet kent. In plaats van die begrippen in een eigen `Pset` te zetten, worden zij vastgelegd als `PredefinedType = USERDEFINED` met de Nederlandse term in `ObjectType`, en gepubliceerd als classificatie in de bSDD. Zie *Nationale typering: het USERDEFINED-patroon* voor de onderbouwing.

### De term als selectiecriterium

Het aardige van dit patroon is dat `ObjectType` niet alleen een eis is, maar ook een **selectiecriterium**. In onderstaande specificatie zit de nationale term in de *applicability*: de specificatie geldt voor precies die ruimten die als verblijfsruimte zijn aangemerkt, en stelt daar vervolgens de eisen aan die het Besluit bouwwerken leefomgeving aan een verblijfsruimte stelt.

Daarmee wordt de nationale begrippenset de as waarlangs de hele ILS is georganiseerd — één specificatie per begrip, elk met een bSDD-URI als `identifier`.

```xml
<ids:specification name="9.12b Verblijfsruimte"
                   ifcVersion="IFC4 IFC4X3_ADD2"
                   identifier="https://identifier.buildingsmart.org/uri/bsnl/Omgevingswet-Ruimten/0.3.0/class/Verblijfsruimte"
                   description="Verblijfsruimte als IfcSpace of IfcZone">
  <ids:applicability minOccurs="1" maxOccurs="unbounded">
    <ids:entity>
      <ids:name>
        <xs:restriction base="xs:string">
          <xs:enumeration value="IFCSPACE"/>
          <xs:enumeration value="IFCZONE"/>
        </xs:restriction>
      </ids:name>
    </ids:entity>
    <ids:attribute>
      <ids:name><ids:simpleValue>ObjectType</ids:simpleValue></ids:name>
      <ids:value><ids:simpleValue>Verblijfsruimte</ids:simpleValue></ids:value>
    </ids:attribute>
  </ids:applicability>
  <ids:requirements>
    <ids:classification uri="https://identifier.buildingsmart.org/uri/bsnl/Omgevingswet-Ruimten/0.3.0/class/Verblijfsruimte"
                        cardinality="required">
      <ids:value><ids:simpleValue>Verblijfsruimte</ids:simpleValue></ids:value>
      <ids:system><ids:simpleValue>Omgevingswet Ruimten</ids:simpleValue></ids:system>
    </ids:classification>
    <ids:attribute cardinality="required"
                   instructions="Verdere typering van de ruimte conform de gehanteerde nomenclatuur. Voorbeeld: Slaapkamer">
      <ids:name><ids:simpleValue>Name</ids:simpleValue></ids:name>
    </ids:attribute>
    <ids:attribute cardinality="required">
      <ids:name><ids:simpleValue>Description</ids:simpleValue></ids:name>
      <ids:value>
        <xs:restriction base="xs:string">
          <xs:pattern value="Functioneel Nuttige Inhoud|Netto Inhoud|Nuttige inhoud|Programma van Eisen inhoud"/>
        </xs:restriction>
      </ids:value>
    </ids:attribute>
  </ids:requirements>
</ids:specification>
```

Let op wat hier gebeurt met de drie IFC-attributen. `ObjectType` draagt het **juridische begrip** (Verblijfsruimte), `Name` de **functionele aanduiding** (Slaapkamer) en `Description` de **bepalingsmethode** waarmee de inhoud is bepaald. Drie betekenislagen, drie standaardattributen, geen enkele eigen property set. Dat is precies wat het patroon bruikbaar maakt voor conversie naar GEO: elk van die lagen is met generieke IFC-software leesbaar en met een IDS-attribuutfacet te selecteren.

<mark>Redactie: in de gepubliceerde v1.1 staat de classificatiefacet op `cardinality="optional"`. Hierboven is `required` aangehouden, conform de eis in *Classificatie*; dit is een wijzigingsvoorstel richting de beheerder van de ILS.</mark>

### De classificatie als tweede drager

De classificatiefacet in de specificatie hierboven doet het werk dat `ObjectType` niet kan doen. De term `Verblijfsruimte` krijgt via `IfcClassificationReference` een `Location`-URI, een systeemnaam en een editie mee — en daarmee een definitie waar een conversieregel naar kan verwijzen. De waarde is identiek aan `ObjectType`; de betekenis eromheen is dat niet.

De begrippen zijn gepubliceerd als bSDD-dictionary *Omgevingswet Ruimten* van buildingSMART Nederland, versie 0.3.0 (`bsnl`, nl-NL). Elke term heeft daarin een eigen URI van de vorm:

```
https://identifier.buildingsmart.org/uri/bsnl/Omgevingswet-Ruimten/0.3.0/class/Verblijfsruimte
```

Twee dingen om vast te leggen in de ILS voordat dit werkt:

- **De schrijfwijze van de systeemnaam.** Het IDS-classificatiefacet vergelijkt `system` met `IfcClassification.Name` in het IFC-bestand. De dictionary heet *Omgevingswet Ruimten* met een spatie, terwijl het URI-fragment `Omgevingswet-Ruimten` met een koppelteken draagt. Kies één schrijfwijze voor `IfcClassification.Name` en houd die aan in alle specificaties.
- **De schrijfwijze van de term zelf.** Klassecode en klassenaam kunnen in de bSDD verschillen — `Kadastraal-Perceel` tegenover `Kadastraal Perceel`, `Tarra-Ruimte` tegenover `Tarra Ruimte`. Omdat `ObjectType` en de classificatiewaarde gelijk moeten zijn, moet de ILS expliciet zeggen of de **naam** of de **code** de te leveren waarde is.

Naast de specificaties per begrip staat één generieke regel die borgt dat elke nationaal getypeerde ruimte überhaupt een classificatie uit dit systeem draagt — ongeacht welke term:

```xml
<ids:specification name="Ruimte geclassificeerd volgens de nationale termenlijst"
                   ifcVersion="IFC4 IFC4X3_ADD2"
                   identifier="NL-RUI-01"
                   description="Elke ruimte met een nationale typering draagt een classificatie uit de bSDD-dictionary Omgevingswet Ruimten."
                   instructions="Voeg een IfcClassificationReference toe met dezelfde term als ObjectType, en verwijs met Location naar de bSDD-URI.">
  <ids:applicability minOccurs="0" maxOccurs="unbounded">
    <ids:entity>
      <ids:name><ids:simpleValue>IFCSPACE</ids:simpleValue></ids:name>
      <ids:predefinedType><ids:simpleValue>USERDEFINED</ids:simpleValue></ids:predefinedType>
    </ids:entity>
  </ids:applicability>
  <ids:requirements>
    <ids:classification uri="https://identifier.buildingsmart.org/uri/bsnl/Omgevingswet-Ruimten/0.3.0"
                        cardinality="required">
      <ids:system><ids:simpleValue>Omgevingswet Ruimten</ids:simpleValue></ids:system>
    </ids:classification>
  </ids:requirements>
</ids:specification>
```

Deze regel toetst alleen dát er geclassificeerd is, niet *waarmee*. De koppeling tussen de term in `ObjectType` en dezelfde term in de classificatie is niet generiek uit te drukken: **IDS kent geen variabelen en kan de waarde van het ene facet niet vergelijken met die van het andere.** Die koppeling wordt daarom per begrip afgedwongen — één specificatie per term, die op `ObjectType` selecteert en de bijbehorende classificatiewaarde verplicht stelt, zoals `9.12b Verblijfsruimte` hierboven.

Dat verklaart meteen waarom de opbouw "één specificatie per begrip" hier geen omslachtigheid is maar een noodzaak: het is de enige manier waarop de gelijkheid van typering en classificatie machinaal controleerbaar wordt.

### De sluitregel

De specificatie hierboven vertrouwt erop dat `ObjectType` gevuld is. Om dat af te dwingen — en om te voorkomen dat een model wél `ObjectType = Verblijfsruimte` draagt maar `PredefinedType = SPACE` in plaats van `USERDEFINED` — hoort er één generieke specificatie naast te staan die het patroon zelf bewaakt:

```xml
<ids:specification name="Nationale ruimtetypering conform IFC"
                   ifcVersion="IFC4 IFC4X3_ADD2"
                   identifier="NL-RUI-00"
                   description="Ruimten met een nationale typering gebruiken PredefinedType USERDEFINED met de nationale term in ObjectType."
                   instructions="Kies uitsluitend termen uit de gepubliceerde nationale termenlijst.">
  <ids:applicability minOccurs="0" maxOccurs="unbounded">
    <ids:entity>
      <ids:name><ids:simpleValue>IFCSPACE</ids:simpleValue></ids:name>
      <ids:predefinedType><ids:simpleValue>USERDEFINED</ids:simpleValue></ids:predefinedType>
    </ids:entity>
  </ids:applicability>
  <ids:requirements>
    <ids:attribute cardinality="required">
      <ids:name><ids:simpleValue>ObjectType</ids:simpleValue></ids:name>
      <ids:value>
        <xs:restriction base="xs:string">
          <xs:enumeration value="Functiegebied"/>
          <xs:enumeration value="Verblijfsgebied"/>
          <xs:enumeration value="Gebruiksgebied"/>
          <xs:enumeration value="Bedgebied"/>
          <xs:enumeration value="Restgebied"/>
          <xs:enumeration value="Buitengebied"/>
          <xs:enumeration value="Functieruimte"/>
          <xs:enumeration value="Verblijfsruimte"/>
          <xs:enumeration value="Bedruimte"/>
          <xs:enumeration value="Restruimte"/>
          <xs:enumeration value="Buitenruimte"/>
        </xs:restriction>
      </ids:value>
    </ids:attribute>
  </ids:requirements>
</ids:specification>
```

Deze specificatie doet drie dingen tegelijk. Zij maakt de where-rule `CorrectPredefinedType` van `IfcSpace` — die voorschrijft dat `ObjectType` bestaat zodra `PredefinedType` de waarde `USERDEFINED` heeft — tot een expliciete leveringseis. Zij beperkt `ObjectType` tot de gepubliceerde termenlijst, zodat het vrije tekstveld niet opnieuw een interpretatieprobleem wordt. En zij is met één regel uit te breiden wanneer de termenlijst groeit, zonder dat de specificaties per begrip hoeven te veranderen.

> **Voor andere landen.** Hetzelfde patroon is elders zonder aanpassing toepasbaar: een eigen `USERDEFINED`-lijst in de eigen taal, gepubliceerd in de bSDD onder een eigen naamruimte, plus één sluitregel als hierboven. Het IFC-schema hoeft daarvoor niet te wijzigen, en modellen uit verschillende landen blijven onderling leesbaar — de termen verschillen, het mechanisme niet.

Voor typering op het type-object in plaats van op de occurrence geldt hetzelfde met andere attributen: `IfcSpaceType` draagt `PredefinedType` en `ElementType`, waarbij `ElementType` de rol van `ObjectType` overneemt.

## F.8 Georeferentie in een IDS

Georeferentie wordt vaak buiten de IDS gehouden, in de veronderstelling dat het er niet in past. De ILS voor Ruimten in de Omgevingswet laat zien dat dat maar ten dele klopt: specificaties die rechtstreeks `IFCMAPCONVERSION` en `IFCPROJECTEDCRS` als applicability nemen, zijn schemavalide en worden door gangbare validatiesoftware uitgevoerd. Zie *Wat een IDS wél en niet kan toetsen* voor de onderbouwing en voor de kanttekening richting de IDS-standaardcommissie.

Onderstaande specificaties dwingen level 50 af zoals beschreven in de praktijkrichtlijn [Georefereren GeoBIM](https://nl-digigo.github.io/GeoBIM_Georefereren/).

### GEO-01 — de transformatie

`IfcMapConversionScaled` is een subtype van `IfcMapConversion` en wordt door de praktijkrichtlijn Georefereren aanbevolen voor RDNAP, omdat het een afzonderlijke schaal per as toestaat. **IDS kent geen automatische overerving in het entiteitsfacet** — de gebruikershandleiding stelt expliciet dat alle entiteiten afzonderlijk moeten worden opgesomd. Een specificatie die alleen `IFCMAPCONVERSION` noemt, treft een `IfcMapConversionScaled` dus niet, en keurt daarmee juist de aanbevolen route af. Beide moeten in de opsomming staan.

```xml
<ids:specification name="Georeferentie level 50 aanwezig"
                   ifcVersion="IFC4 IFC4X3_ADD2"
                   identifier="GEO-01"
                   description="Het model bevat een volledig ingevulde transformatie tussen het lokale modelstelsel en het projectiestelsel."
                   instructions="Vul de georeferentie in de BIM-applicatie in; exporteer niet met een lokale oorsprong zonder transformatie. IfcMapConversionScaled is toegestaan en voor RDNAP aanbevolen.">
  <ids:applicability minOccurs="1" maxOccurs="unbounded">
    <ids:entity>
      <ids:name>
        <xs:restriction base="xs:string">
          <xs:enumeration value="IFCMAPCONVERSION"/>
          <xs:enumeration value="IFCMAPCONVERSIONSCALED"/>
        </xs:restriction>
      </ids:name>
    </ids:entity>
  </ids:applicability>
  <ids:requirements>
    <ids:attribute cardinality="required" instructions="Verplaatsing in oostrichting. Voorbeeld: 92370.710706">
      <ids:name><ids:simpleValue>Eastings</ids:simpleValue></ids:name>
    </ids:attribute>
    <ids:attribute cardinality="required" instructions="Verplaatsing in noordrichting. Voorbeeld: 437455.379788">
      <ids:name><ids:simpleValue>Northings</ids:simpleValue></ids:name>
    </ids:attribute>
    <ids:attribute cardinality="required" instructions="Verplaatsing in hoogterichting. Voorbeeld: 1.3092">
      <ids:name><ids:simpleValue>OrthogonalHeight</ids:simpleValue></ids:name>
    </ids:attribute>
    <ids:attribute cardinality="required" instructions="X-component van de vector die de richting van de lokale x-as aangeeft.">
      <ids:name><ids:simpleValue>XAxisAbscissa</ids:simpleValue></ids:name>
    </ids:attribute>
    <ids:attribute cardinality="required" instructions="Y-component van de vector die de richting van de lokale x-as aangeeft.">
      <ids:name><ids:simpleValue>XAxisOrdinate</ids:simpleValue></ids:name>
    </ids:attribute>
    <ids:attribute cardinality="required" instructions="Schaal van de modeleenheden ten opzichte van de eenheden van de doel-CRS.">
      <ids:name><ids:simpleValue>Scale</ids:simpleValue></ids:name>
    </ids:attribute>
  </ids:requirements>
</ids:specification>
```

De `minOccurs="1"` op de applicability doet hier het zware werk: hij dwingt af dat er überhaupt een transformatie in het model zit. Een model zonder georeferentie levert nul toepasbare objecten op en faalt daarmee op deze specificatie.

### GEO-02 — het coördinatenstelsel

```xml
<ids:specification name="Doelcoordinatenstelsel is RD of RD+NAP"
                   ifcVersion="IFC4 IFC4X3_ADD2"
                   identifier="GEO-02a"
                   description="De doel-CRS is EPSG:7415 (RD + NAP) of EPSG:28992 (RD)."
                   instructions="Deze eis geldt voor Nederlandse projecten waarbij de projectomvang in combinatie met de kromming van de aarde geen probleem oplevert.">
  <ids:applicability minOccurs="1" maxOccurs="unbounded">
    <ids:entity>
      <ids:name><ids:simpleValue>IFCPROJECTEDCRS</ids:simpleValue></ids:name>
    </ids:entity>
  </ids:applicability>
  <ids:requirements>
    <ids:attribute cardinality="required">
      <ids:name><ids:simpleValue>Name</ids:simpleValue></ids:name>
      <ids:value>
        <xs:restriction base="xs:string">
          <xs:enumeration value="EPSG:7415"/>
          <xs:enumeration value="EPSG:28992"/>
        </xs:restriction>
      </ids:value>
    </ids:attribute>
  </ids:requirements>
</ids:specification>
```

EPSG:7415 is de samengestelde CRS en bevat de hoogtecomponent al. EPSG:28992 is alleen het horizontale stelsel; daar moet het verticale datum apart worden geduid. Omdat een IDS-specificatie geen voorwaardelijke logica binnen zichzelf kent, wordt die afhankelijkheid als een tweede specificatie geschreven, met de conditie in de *applicability*:

```xml
<ids:specification name="NAP verplicht bij RD zonder hoogtecomponent"
                   ifcVersion="IFC4 IFC4X3_ADD2"
                   identifier="GEO-02b"
                   description="Is de doel-CRS EPSG:28992, dan is het verticale datum EPSG:5709 (NAP)."
                   instructions="Gebruik bij voorkeur EPSG:7415; die bevat de hoogtecomponent al.">
  <ids:applicability minOccurs="0" maxOccurs="unbounded">
    <ids:entity>
      <ids:name><ids:simpleValue>IFCPROJECTEDCRS</ids:simpleValue></ids:name>
    </ids:entity>
    <ids:attribute>
      <ids:name><ids:simpleValue>Name</ids:simpleValue></ids:name>
      <ids:value><ids:simpleValue>EPSG:28992</ids:simpleValue></ids:value>
    </ids:attribute>
  </ids:applicability>
  <ids:requirements>
    <ids:attribute cardinality="required">
      <ids:name><ids:simpleValue>VerticalDatum</ids:simpleValue></ids:name>
      <ids:value><ids:simpleValue>EPSG:5709</ids:simpleValue></ids:value>
    </ids:attribute>
  </ids:requirements>
</ids:specification>
```

Dit patroon — de conditie in de applicability, het gevolg in de requirements — is de manier waarop een "als … dan …"-regel in IDS wordt uitgedrukt. Het komt in deze bijlage vaker terug: ook GEB-03b en de specificaties per ruimtebegrip werken zo.

### Wat deze specificaties niet doen

Zij toetsen **aanwezigheid en vorm**, niet **juistheid**. Of het model met deze waarden werkelijk op de goede plek belandt, of de vastgelegde rotatie overeenkomt met de oriëntatie van de geometrie, en of `Scale` consistent is met de `IfcUnitAssignment` van het model — dat blijft een geometrische controle. In de praktijk vangt de vormcontrole niettemin het merendeel van de fouten: ontbrekende of half ingevulde georeferentie komt aanzienlijk vaker voor dan een verkeerd ingevulde.

### Verificatie

Deze specificaties zijn tegen vijf modellen uitgevoerd:

| Model | GEO-01 | GEO-02a | GEO-02b |
|---|---|---|---|
| IFC4, volledige `IfcMapConversion`, EPSG:28992 + EPSG:5709 | geslaagd | geslaagd | geslaagd |
| IFC4X3, `IfcMapConversionScaled`, EPSG:7415 | geslaagd | geslaagd | n.v.t. |
| Zonder enige georeferentie | **gefaald** — nul toepasbare objecten | **gefaald** | n.v.t. |
| `Scale` leeg, doel-CRS EPSG:4326 | **gefaald** op de attribuuteis | **gefaald** op de waarde | n.v.t. |
| EPSG:28992 zonder `VerticalDatum` | geslaagd | geslaagd | **gefaald** |

De laatste rij laat zien waarom GEO-02b nodig is: een model dat RD als doelstelsel opgeeft zonder het verticale datum te duiden, komt door GEO-02a heen en levert toch hoogten zonder betekenis.

Ter vergelijking: dezelfde test met een specificatie die alléén `IFCMAPCONVERSION` opsomt, faalt op het tweede model — het model dat de door de praktijkrichtlijn aanbevolen RDNAP-route volgt.

## F.9 Aanvullende specificaties

De volgende specificaties horen bij hogere detailniveaus en zijn hier los opgenomen; zij kunnen in een bron-ILS `ILS.Openingen` worden ondergebracht.

### Ramen vullen een sparing

Openingsvlakken in de GEO-dataset worden afgeleid uit de sparing in de wand, niet uit het volume van het kozijn. Een raam dat als los volume tegen een dichte wand is geplaatst, levert geen opening op.

```xml
<ids:specification name="Ramen vullen een sparing"
                   ifcVersion="IFC4 IFC4X3_ADD2"
                   identifier="OPN-01"
                   description="Elk raam vult een sparing in een wand, zodat de opening in de gevel afleidbaar is."
                   instructions="Plaats ramen met de sparingsfunctie van de BIM-applicatie; plaats geen losse volumes tegen een dichte wand.">
  <ids:applicability minOccurs="0" maxOccurs="unbounded">
    <ids:entity>
      <ids:name><ids:simpleValue>IFCWINDOW</ids:simpleValue></ids:name>
    </ids:entity>
  </ids:applicability>
  <ids:requirements>
    <ids:partOf relation="IFCRELVOIDSELEMENT IFCRELFILLSELEMENT" cardinality="required">
      <ids:entity>
        <ids:name>
          <xs:restriction base="xs:string">
            <xs:enumeration value="IFCWALL"/>
            <xs:enumeration value="IFCWALLSTANDARDCASE"/>
            <xs:enumeration value="IFCCURTAINWALL"/>
          </xs:restriction>
        </ids:name>
      </ids:entity>
    </ids:partOf>
  </ids:requirements>
</ids:specification>
```

### Classificatie consistent met typering

Waar classificatie en IFC-entiteit uiteenlopen, is niet vast te stellen welke van beide leidend is. NL-SfB-code 31 staat voor buitenwandopeningen en omvat ramen (31.2x), deuren (31.3x) én puien (31.4x); een regel die 31 rechtstreeks aan `IfcWindow` koppelt is daarom te grof.

```xml
<ids:specification name="Buitenwandopeningen correct getypeerd"
                   ifcVersion="IFC4 IFC4X3_ADD2"
                   identifier="OPN-02"
                   description="Objecten geclassificeerd als NL-SfB 31 zijn getypeerd als venster, deur of vliesgevel.">
  <ids:applicability minOccurs="0" maxOccurs="unbounded">
    <ids:classification>
      <ids:value>
        <xs:restriction base="xs:string">
          <xs:pattern value="31(\..*)?"/>
        </xs:restriction>
      </ids:value>
      <ids:system><ids:simpleValue>NL-SfB</ids:simpleValue></ids:system>
    </ids:classification>
  </ids:applicability>
  <ids:requirements>
    <ids:entity>
      <ids:name>
        <xs:restriction base="xs:string">
          <xs:enumeration value="IFCWINDOW"/>
          <xs:enumeration value="IFCDOOR"/>
          <xs:enumeration value="IFCCURTAINWALL"/>
        </xs:restriction>
      </ids:name>
    </ids:entity>
  </ids:requirements>
</ids:specification>
```

Wie strakker wil sturen, splitst deze specificatie op subcodeniveau: `31.2` vereist `IFCWINDOW`, `31.3` vereist `IFCDOOR` en `31.4` vereist `IFCCURTAINWALL`. Dat is meteen een goed voorbeeld van *aanscherpen zonder tegenspraak*: de striktere variant is een deelverzameling van de ruimere en kan er zonder conflict naast bestaan.
