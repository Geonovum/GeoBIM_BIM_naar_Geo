# Entiteit en Attribuut BIM naar GEO

Voor het transformeren van BIM- naar GEO-informatie is het mappen van entiteiten en attributen van belang. Waar geometrie vooral de vorm en locatie van een ding vastlegt, beschrijft de entiteit wat het ding is en bevatten attributen gegevens over eigenschappen zoals materiaal, functie, voorkomen, afmeting of classificatie. Bij de transformatie van BIM naar Geo moeten naast geometrie ook deze entiteiten en attributen correct worden vertaald tussen standaarden. Omdat BIM- en GEO-standaarden verschillen in datastructuur, niveaus van detail en semantische definitie is dit een uitdaging. 

## Entiteit mapping 
Er zijn verschillende entiteit-mappingen beschikbaar tussen BIM en Geo. Zie hiervoor de Master Thesis van de TU Delft: [Automatic generation of CityGML LoD3 building models from IFC models](https://repository.tudelft.nl/record/uuid:31380219-f8e8-4c66-a2dc-548c3680bb8d) van Sjors Donkers (2013). En ook de Universiteit Singapore heeft een [ifc2citygml](https://ifc2citygml.github.io/) mapping (2019), de technische universiteit Munich heeft deze [mapping](https://github.com/tum-gis/ifc-to-citygml3) van ifc naar Citygml 3. 
De Universiteit van Hong Kong heeft ifc naar cityGML mappingen in een [bimgis](https://cejcheng.people.ust.hk/bimgis/) omgeving, en de technische universiteit Athene heeft onderstaande mapping.
![Mapping entiteiten IFC naar GEO](./media/Mapping_IFC-naar_Geo_Entiteiten.png) [(2018) George Floros](https://www.researchgate.net/figure/Semantic-mapping-from-IFC-to-CityGML-LoD-4_fig3_327604195)

Het is niet mogelijk om elke entiteit in IFC naar CityGML te mappen. Men zal een keuze moeten maken in welke entiteiten hierbij van belang zijn. Het is mogelijk om een uitbreiding of meerdere uitbreidingen op CityGML te maken om IFC-entiteiten een plek te bieden. Dit is beschreven bij Biljecki in [Extending CityGML for IFC-sourced 3D city models](https://doi.org/10.1016/j.autcon.2020.103440)

![IFC naar CityGML met een ADE](./media/IFC_naar_CityGML_en_ADE.png)

![ADE voor CityGML om IFC te borgen](./media/ADE%20Voor%20CityGML%20om%20IFC%20te%20borgen.png)

Er zijn naast verschillende Level Of Details ook verschillende decompositie-niveaus die men vanuit één gedetailleerd BIM-model kan genereren. Zie [Bijlage 1](#Link nog maken!)

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
Attributen en properties van gebouw in IFC:
<div style="display: flex; gap: 20px;">
  <!-- Eerste tabel -->
 
<table>
    <th> Attribuut </th>
    <th>  Beschrijving</th>
<tr>
    <td> GlobalId	
    <td> IfcGloballyUniqueId
<tr>
    <td> OwnerHistory	
    <td> IfcOwnerHistory
<tr>
    <td> Name	
    <td> IfcLabel
<tr>
    <td> Description	
    <td> IfcText
<tr>
    <td> ObjectType	
    <td> IfcLabel
<tr>
    <td> ObjectPlacement
    <td> IfcObjectPlacement
<tr>
    <td> Representation
    <td> IfcProductRepresentation
<tr>
    <td> LongName
    <td> IfcLabel
<tr>
    <td> CompositionType
    <td> IfcElementCompositionEnum
<tr>
    <td> ElevationOfRefHeight
    <td> IfcLengthMeasure
<tr>
    <td> ElevationOfTerrain
    <td> IfcLengthMeasure
<tr>
    <td> BuildingAddress	
    <td> IfcPostalAddres
<tr>
</table>

<!-- Tweede tabel -->
<table border="1" cellpadding="5">
    <th> Properties</th>
    <th>  Beschrijving</th>
<tr>
    <td> Reference	
    <td> IfcGloballyUniqueId
<tr>
    <td> BuildingID	
    <td> A unique identifier assigned to a building.
<tr>
    <td> IsPermanentID	
    <td> Indicates whether identity is permanent
<tr>
    <td> ConstructionMethod	
    <td> The type of construction action
<tr>
    <td> FireProtectionClass
    <td> Main fire protection class for the building
<tr>
    <td> SprinklerProtection
    <td> Indication whether this object is sprinkler protected (TRUE) or not (FALSE).
<tr>
    <td> SprinklerProtectionAutomatic
    <td> Indication whether this object has an automatic sprinkler protection (TRUE) or not (FALSE). It should only be given, if the property "SprinklerProtection" is set to TRUE.
<tr>
    <td> OccupancyType
    <td> Occupancy type for this object. It is defined according to the presiding national building code.
<tr>
    <td> NetPlannedArea
    <td> Total planned net area of the object.
<tr>
    <td> NumberOfStoreys
    <td> The number of storeys within a building.
<tr>
    <td> YearOfConstruction
    <td> Year of construction of this building.
<tr>
    <td> YearOfLastRefurbishment
    <td> Year of last major refurbishment.
<tr>
    <td> IsLandmarked
    <td> This building is listed as a historic building
<tr>
    <td> ElevationOfRefHeight
    <td> Elevation above sea level of the reference height
<tr>
    <td> ElevationOfTerrain
    <td> Elevation above the minimal terrain level around the foot print of the building
</table>
</div>

<figure id="IMBAG" style="display: block; text-align: center; margin: 0 auto;">
      <img src="./media/Attributen BAG.png" alt="Verschillende LOD's van een kolom" style="width: 100%; max-width: 800px; height: auto; display: block; margin: 0 auto;"/>
      <figcaption>
        <a class="self-link" href="#fig-IMBAG"></bdi></a>
        <span class="fig-title">
        Objecten en attributen uit de Basisregistratie Adressen en Gebouwen <br> 
        <a href="https://www.geobasisregistraties.nl/documenten/2018/03/12/catalogus-2018" target="_blank">Catalogus Basisregistratie Adressen en Gebouwen</a>
        </span>
      </figcaption>
</figure>

<figure id="Attribuut_IMBOR_gebouw" style="display: block; text-align: center; margin: 0 auto;">
      <img src="./media/Attributen Gebouw_IMBOR.png" alt="Attribuut_IMBOR_gebouw" style="width: 100%; max-width: 800px; height: auto; display: block; margin: 0 auto;"/>
      <figcaption>
        <a class="self-link" href="#fig-Attribuut_IMBOR_gebouw"></bdi></a>
        <span class="fig-title">
        Attributen van een gebouw volgens de IMBOR standaard <br> 
        <a href="https://www.geobasisregistraties.nl/documenten/2018/03/12/catalogus-2018" target="_blank">IMBOR 2025</a>
        </span>
      </figcaption>
</figure>

## Status van objecten van BIM naar GEO

<mark>Wouter?</mark>