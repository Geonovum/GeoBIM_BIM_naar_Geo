# Eisen aan het BIM-model 

## Informatie Levering Specificatie
<mark>Jeffrey?</mark>


**ILS Infra**
De informatie levering specificatie voor Infra biedt een uniforme taal en set afspraken voor het gestructureerd en eenduidig uitwisselen van digitale informatie in de infrastructuursector. Dit is essentieel voor GeoBIM toepassingen, waar geografische context, coördinaten en objectinformatie centraal staan. Daarnaast kan de opdrachtgever de aanvullende voorwaardes voor de opdrachtnemers stellen binnen het BIM protocol. 


**Belangrijke afspraken die aansluiten bij GeoBIM**
- Bestandsnaamconventies
Uniform gebruik van namen met o.a. projectnaam, discipline (NLCS), status en beschrijving. Dit ondersteunt automatische koppeling en herkenning in GeoBIM omgevingen. <!-- Metadatabeschrijving?  -->
- Eenheden (meters / millimeters) 
Consistente gebruik van eenheden voorkomt schaalfouten bij georeferentie en mapping.<!-- Opgelost in Georeferentie? Daarnaar verwijzen -->
- Coördinatenstelsel 
Er wordt per project een vast coördinatenstelsel gekozen, cruciaal om BIM modellen correct te koppelen aan GIS data.
Meestal gaat dit om RD stelsel (EPSG:28992), maar dit wordt projectafhankelijk vastgelegd.
- Referentiepunt / Lokaal nulpunt
Een gemeenschappelijk referentiepunt dicht bij het projectgebied voorkomt numerieke instabiliteit en maakt integratie in GeoBIM eenvoudiger.
- Objectnaamgeving & classificatie 
Uniforme coderingen volgens NL-SfB, NLCS of ETIM zorgen dat GeoBIM systemen automatisch objecttypen herkennen en koppelen aan GIS kaartlagen. <!-- Is dat zo? Waar dan? -->
- Metadata & eigenschappen
Objecten krijgen vaste metadata, zoals:
    - status (nieuw, bestaand, tijdelijk, vervallen, revisie) 
    - materiaal
    - ITSO-indicatie (in te storten onderdelen)
Deze gegevens zijn rechtstreeks bruikbaar voor analyses, thematische kaarten en data validatie in GeoBIM.
-	Voorkomen van doublures en doorsnijdingen
Belangrijk voor clashcontrole en correcte weergave in gecombineerde BIM GIS omgevingen.

**Wat betekent dit praktisch voor GeoBIM gebruik?**
GeoBIM profiteert van BIM Basis Infra doordat:
- BIM modellen consistent gegeorefereerd zijn <!-- Klopt. Afdwingen in ILS? -->
- objecten voorspelbare, uniforme classificaties hebben
- metadata standaard aanwezig is
- integratie tussen BIM-model, GIS-kaart en projectdata eenvoudiger wordt
- automatische validaties (bijvoorbeeld via platforms zoals ACC, Navisworks of GeoBIM dashboards) betrouwbaarder worden. 

## Eisen aan het BIM-model (ILS) 
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

