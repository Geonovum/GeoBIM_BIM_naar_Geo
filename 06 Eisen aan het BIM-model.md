# Eisen aan het BIM-model 

## Informatie Levering Specificatie
<mark>Jeffrey?</mark>


**ILS Infra**
De informatie levering specificatie voor Infra biedt een uniforme taal en set afspraken voor het gestructureerd en eenduidig uitwisselen van digitale informatie in de infrastructuursector. Dit is essentieel voor GeoBIM toepassingen, waar geografische context, coördinaten en objectinformatie centraal staan. Daarnaast kan de opdrachtgever de aanvullende voorwaardes voor de opdrachtnemers stellen binnen het BIM protocol. 


**Belangrijke afspraken die aansluiten bij GeoBIM**
- Bestandsnaamconventies
Uniform gebruik van namen met o.a. projectnaam, discipline (NLCS), status en beschrijving. Dit ondersteunt automatische koppeling en herkenning in GeoBIM omgevingen.
- Eenheden (meters / millimeters)
Consistente gebruik van eenheden voorkomt schaalfouten bij georeferentie en mapping.
- Coördinatenstelsel
Er wordt per project een vast coördinatenstelsel gekozen, cruciaal om BIM modellen correct te koppelen aan GIS data.
Meestal gaat dit om RD stelsel (EPSG:28992), maar dit wordt projectafhankelijk vastgelegd.
- Referentiepunt / Lokaal nulpunt
Een gemeenschappelijk referentiepunt dicht bij het projectgebied voorkomt numerieke instabiliteit en maakt integratie in GeoBIM eenvoudiger.
- Objectnaamgeving & classificatie
Uniforme coderingen volgens NL-SfB, NLCS of ETIM zorgen dat GeoBIM systemen automatisch objecttypen herkennen en koppelen aan GIS kaartlagen.
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
- BIM modellen consistent gegeorefereerd zijn
- objecten voorspelbare, uniforme classificaties hebben
- metadata standaard aanwezig is
- integratie tussen BIM-model, GIS-kaart en projectdata eenvoudiger wordt
- automatische validaties (bijvoorbeeld via platforms zoals ACC, Navisworks of GeoBIM dashboards) betrouwbaarder worden. 

## Eisen aan de geometrie in het BIM-model 
-> Afwijkingen Stuk Jasper(voor welke extractie welke eisen). 

ILS -> There is a IFC product. 
-> There is a georeferencing
-> Schema's 2x3, 4 or 4x3 (active ones)


Toevoegen -> Welke datasets. BAG 2D 
-> ILS -> IDS for making LOD 1.0 (BAG 2D) geometrie
-> IDS for making BAG attributes (BAG 2D) attributes

