# Eisen aan het BIM-model 

Een succesvolle transformatie van een BIM model naar een GIS bestandsformaat begint al bij het maken van de juiste afspraken vóór de start van het modelleerwerk. Zonder duidelijke kaders is de kans groot dat het BIM-model geometrisch te complex of data-technisch te vervuild is voor gebruik in een geografisch informatiesysteem.

Ook voor deze processen sluiten we aan bij de ISO 19650 reeks, de internationale norm voor informatiemanagement in de gebouwde omgeving. Deze norm biedt de processen om vast te leggen wie welke informatie moet leveren, wanneer en hoe.

## Afspraken voor samenwerking

Als eerste zijn er afspraken nodig voor het opstellen van BIM modellen. In Nederland beheert DigiGO twee richtlijnen hiervoor: BIM basis ILS (met een focus op de bouw) en BIM basis Infra (met een focus op infrastructuur). Deze richtlijnen bieden een set afspraken voor het gestructureerd en eenduidig uitwisselen van digitale informatie. Dit is essentieel voor GeoBIM toepassingen, waar geografische context, coördinaten en objectinformatie centraal staan. Daarnaast kan de opdrachtgever aanvullende voorwaarden voor de opdrachtnemers stellen binnen het BIM protocol. <!-- Of BIM UitvoeringsPlan? -->

<figure id="BIM-digigo" style="display: block; text-align: center; margin: 0 auto;">
      <img src="./media/06_eisen/BIM landschap.png" alt="Het BIM afspraken landschap" style="width: 100%; max-width: 800px; height: auto; display: block; margin: 0 auto;"/>
      <figcaption>
        <a class="self-link" href="#fig-BIMdigigo"></bdi></a>
        <span class="fig-title">
        Samenwerking in BIM op basis van sectorafspraken
        </span>
      </figcaption>
</figure>

**Belangrijke afspraken die aansluiten bij GeoBIM**
- Bestandsnaamconventies: Uniform gebruik van namen met o.a. projectnaam, discipline (NLCS), status en beschrijving. Dit ondersteunt automatische koppeling en herkenning in GeoBIM omgevingen. <!-- Metadatabeschrijving?  -->
- Eenheden (meters / millimeters): Consistent gebruik van eenheden voorkomt schaalfouten bij georeferentie en mapping.<!-- Opgelost in Georeferentie? Daarnaar verwijzen -->
- Coördinatenstelsel: Er wordt per project een vast coördinatenstelsel gekozen, cruciaal om BIM modellen correct te koppelen aan GIS data.
Meestal gaat het om het RD-stelsel (EPSG:28992), maar dit wordt projectafhankelijk vastgelegd.
- Referentiepunt / Lokaal nulpunt: Een gemeenschappelijk referentiepunt dicht bij het projectgebied voorkomt numerieke instabiliteit en maakt integratie in GeoBIM eenvoudiger.
- Objectnaamgeving & classificatie: Uniforme coderingen volgens NL-SfB, NLCS of ETIM zorgen dat GeoBIM systemen automatisch objecttypen herkennen en koppelen aan GIS kaartlagen. <!-- Is dat zo? Waar dan? -->
- Metadata & eigenschappen: Objecten krijgen vaste metadata, zoals:
    - Status (nieuw, bestaand, tijdelijk, vervallen, revisie) 
    - Materiaal
    - ITSO-indicatie (in te storten onderdelen)

    Deze gegevens zijn rechtstreeks bruikbaar voor analyses, thematische kaarten en data validatie in GeoBIM.
-	Voorkomen van doublures en doorsnijdingen: Belangrijk voor clashcontrole en correcte weergave in gecombineerde BIM GIS omgevingen.

**Wat betekent dit praktisch voor GeoBIM gebruik?**
GeoBIM profiteert van deze afspraken doordat:
- BIM modellen consistent gegeorefereerd zijn <!-- Klopt. Afdwingen in ILS? -->
- objecten voorspelbare, uniforme classificaties hebben
- metadata standaard aanwezig is
- integratie tussen BIM-model, GIS-kaart en projectdata eenvoudiger wordt
- automatische validaties (bijvoorbeeld via platforms zoals ACC, Navisworks of GeoBIM dashboards) betrouwbaarder worden. 

## Eisen aan het BIM-model (ILS) <!-- Voorstel: inhoud van deze paragraaf opdelen in algemene afspraken (hierboven) en ILS (hieronder) -->
-> Afwijkingen Stuk Jasper(voor welke extractie welke eisen). 

Eisen voor shell extractie 
De eisen aan het BIM-model voor een shell extractie zijn beperkt. Het is van belang dat georeferentie in het model aanwezig is. (IFCMapConversion).
Daarnaast dient er minimaal een IFCProduct  aanwezig te zijn die geometrie bezit. <!-- IS IFC_Space ook goed? -->
De extractie-software werkt voor de actieve schema's (2x3, 4 en 4x3)

De ILS/IDS voor deze beknopte eisenset zou kunnen zijn: 

- <mark> Nog in te vullen </mark>

Afhankelijk van het soort extractie gelden meer eisen. 

Eisen voor 1 op 1 mapping: 
De eisen voor een 1 op 1 mapping zijn al iets uitgebreider. Het is van belang dat georeferentie in het model aanwezig is. (IFCMapConversion).
Daarnaast dient er minimaal een IFCProduct aanwezig te zijn die geometrie bezit. <!-- IS IFC_Space ook goed? -->
De extractie-software werkt voor de actieve schema's (2x3, 4 en 4x3).

<mark> Heb je IfcRoof nodig? </mark>

De extractie kan filteren op: IfcBeam, IfcColumn, IfcCovering, IfcCurtainWall, IfcDoor, IfcMember, IfcPlate, IfcRoof, IfcSlab, IfcWall, IfcWallStandardCase, IfcWindow. Wat betekent dit voor een ILS? 

Daarnaast is een remedie voor de bestandgroote te filteren op isExternal property Wat betekent dit voor een ILS? 

Toevoegen -> Welke datasets. BAG 2D 
-> ILS -> IDS for making LOD 1.0 (BAG 2D) geometrie 

-> Voor PAND-geometrie is alles nodig van IfcBuilding? -> Kan groter zijn dan Pand. Hoe dit te doen? 
-> Voor PAND-attribuut is YearOfConstruction nodig (IfcPsetBuildingCommon) ILS? 


LOD2.2 maakt Roofsurface, Groundsurface en Wallsurface. Het is handig als in het IFCModel IfcWall, IfcRoof en IfcSlab zit en

Daarnaast is IFCBuildingStorey handig. 

Bij LOD 3.2 
-> Hier moet raam aanwezig zijn: 

-> Classificatie volgens NL-Sfb 
(als classificatie = Nl-Sfb 31 raam -> dan moet entity = IfcWindow) 

```xml 
<specification>
  <applicability>
    <classification system="NL-SfB" value="31"/>
  </applicability>

  <requirements>
    <entity name="IfcWindow"/>
  </requirements>
</specification>
```


-> IDS for making BAG attributes (BAG 2D) attributes

-> IFC naar CityGML Mapping



-> https://ucm.buildingsmart.org/en/use-cases/3536/en

## Informatie Leverings Specificatie
In een ILS (informatie leveringsspecificatie) wordt vastgelegd welke informatie wanneer, en door welke partij geproduceerd moet worden. In deze richtlijn ligt hierbij de focus op _welke informatie_ geleverd moet worden. Het gaat dan om afspraken voor classificatie en het vastleggen van relevante kenmerken van objecten. Deze afspraken kunnen in tekst vastgelegd worden, of in computer-interpreteerbare vorm. Voor het laatste zijn twee gangbare methoden:
- BuildingSMART heeft de standaard [Information Delivery Specification](https://www.buildingsmart.org/standards/bsi-standards/information-delivery-specification-ids/) (IDS) ontwikkeld. Dit is een XML-bestand dat aangeeft welke data vastgelegd dient te worden en waar de data aan moet voldoen (bijvoorbeeld datatypes). Tegelijkertijd kan dit bestand gebruikt worden om IFC-bestanden te valideren tegen deze eisen.
- Vanuit Nederlandse en Europese normalisatie zijn respectievelijk de normen [NEN 2660-2](https://www.nen.nl/en/nen-2660-2-2022-nl-291667) en [NEN-EN 17632](https://www.nen.nl/nen-en-17632-1-2022-en-304869) ontwikkeld. Hiermee is het mogelijk om, middels de Linked Data-standaard SHACL, restricties vast te leggen en door de computer te laten valideren.

Zo kan de voorwaarde dat elk object een status dient te hebben als volgt worden vastgelegd conform IDS:

```xml
<specification>
  <applicability>
    <entity>
      <name>
        <simpleValue>IFCOBJECT</simpleValue>
      </name>
    </entity>
  </applicability>
  <requirements>
    <property dataType="IFCLABEL" minOccurs="1" maxOccurs="unbounded">
      <name>
        <simpleValue>status</simpleValue>
      </name>
      <value>
        <restriction base="string">
          <enumeration>
            <value>nieuw</value>
            <value>bestaand</value>
            <value>tijdelijk</value>
            <value>vervallen</value>
            <value>revisie</value>
          </enumeration>
        </restriction>
      </value>
    </property>
  </requirements>
</specification>
```

Of, in SHACL:

```
PREFIX nen2660: <https://w3id.org/nen2660/def#>
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX ex: <https://example.org/>

ex:StatusShape
  a sh:NodeShape ;
  sh:targetClass nen2660:PhysicalObject ;
  sh:property [
    sh:path ex:status ;
    sh:class ex:StatusLijst ;
  ]
.

ex:Nieuw a ex:StatusLijst .
ex:Bestaand a ex:StatusLijst .
ex:Tijdelijk a ex:StatusLijst .
ex:Vervallen a ex:StatusLijst .
ex:Revisie a ex:StatusLijst .
```

Om te voorkomen dat voor iedere ILS opnieuw nagedacht moet worden over objecten en kenmerken, is het sterk aan te raden om een standaard of ontologie te gebruiken als basis voor de ILS. Voorbeelden hiervan zijn de [ILS O&E](https://www.digigo.nu/ilsen-en-richtlijnen/ils-ontwerp-en-engineering/), [IMBOR](https://www.crow.nl/kennisproducten/imbor/) en de [NLCS](https://www.digigo.nu/standaarden/nlcs/). Daarnaast helpt het gebruik van standaarden om de herkenbaarheid van de data te vergroten tussen verschillende disciplines. 
