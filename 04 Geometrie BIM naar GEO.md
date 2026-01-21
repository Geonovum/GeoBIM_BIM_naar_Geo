# Geometrie BIM naar GEO

## Shell extractie

Zoals eerder beschreven is shell extractie vooral nog een experimentele vorm van BIM naar GIS brengen. Hierdoor zijn er nog geen standaard methodes ontwikkeld en gebruikt iedere software een eigen benadering. Dit hoofdstuk beschrijft de verschillende manieren waarop sommige schil modellen worden gemaakt door software. Dit is een selectie van de processen om een visualisatie te creëren van de complexheid van BIM naar GEO conversie.

### Voxelisatie

Een alternative shell extractie methode die wordt gebruikt is voxelisatie. Voxelisatie benaderd de vorm van een gebouw/bouwwerk met behulp van VOlumetriche piXELS (voxels). De resulterende vorm kan worden gezien als een blokkendoos representatie van het input model. Dit is op dit moment geen standaard GIS vorm die wordt ondersteund door de geaccepteerde LoD frameworks. Echter wordt dit wel als belangrijk beschouwd. Voxelisatie kan namelijk aspecten van een gebouw opslaan die verder alleen in hele complexe LoD modellen beschikbaar is (LoD3+), zoals overhang en gevelopeningen.

Voxelisatie komt echter met unieke problemen waarvoor nog geen standaard methode voor is opgesteld. Zo is de vorm van het gevoxeliseerde model afhankelijk van de voxelgrootte en de rotatie van de grid dat gebruikt werd tijdens de voxelisatie.

<!-- niet standaard, wel handig -->
<!-- voxelgrootte en rotatie -->
<!-- onbetrouwbare data -->

### Hoge resolutie schil



<!-- verschil in pre-filtering, classe selectie, voxel filtering -->
<!-- verschil in output van een enkele tool -->
<!-- verschil in surface detection, ray casting, voxel assisted ray casting, alpha shapes -->