# Geometrie BIM naar GEO

## Shell extractie

Zoals eerder beschreven is shell extractie vooral nog een experimentele vorm van BIM naar GIS brengen. Hierdoor zijn er nog geen standaard methodes ontwikkeld en gebruikt iedere software een eigen benadering. Dit hoofdstuk beschrijft de verschillende manieren waarop sommige schil modellen worden gemaakt door software. Dit is een selectie van de processen om een visualisatie te creëren van de complexheid van BIM naar GEO conversie.

### Bounding Box

De simpelste vorm van een schil model is een bounding box representatie van een model/gebouw. Een bounding box is een blok vormige omtrek van een volledig gebouw. Deze bounding box is een LoD1.0 representatie, en kan een LoD1 representatie zijn. De boven en onderkant van de bounding box kunnen ook worden gebruikt als een Lod0 of LoD0.0 representatie.

De bounding box wordt meestal gebaseerd op enkel puntwolk data, complexe volumetrische data is niet nodig. Een puntwolk kan op twee manieren op een BIM model worden gebaseerd. Als eerste kan een point grid op ieder oppervlak van het model gemaakt worden. Dit is een relatief zwaar proces, zeker als het BIM model dat wordt verwerk groot of complex is. Alternatief kan, als tweede, enkel iedere vertex in het BIM model worden gebruikt als punt. Dit is sneller maar mogelijk niet 100% accuraat.

De bounding box creatie klinkt als iets dat zo simpel is dat hier geen verschillende interpretatie mogelijk is. Dit is echter niet het geval. Zo is het bijvoorbeeld op basis van de documentatie onduidelijk op welke manier een LoD1.0 bounding box geroteerd moet zijn. De grootte van de bounding box is bij de meeste BIM input afhankelijk van de rotatie van het model (of de bounding box). Een model met een rechthoekige voetprint heeft een kleine bounding box als de voetprint en de bounding box hetzelfde zijn georiënteerd. Als er, bijvoorbeeld, een draaiing van 45 graden verschil tussen de twee is dan resulteerd dat in een aanzienlijk grotere bounding box.

De IfcEnvelopeExtractor roteerde de bounding box zo dat het volume van de resulterende box het kleinste is. Omdat de meeste plattegronden (en voetprint) rechthoekig zijn zorgt dat ervoor dat dat over het algemeen de bounding box en de voetprint dezelfde oriëntatie hebben. Als er meerdere gebouwen met deze software worden verwerkt dan kan het zo zijn dat de LoD1.0 representaties allemaal anders zijn georiënteerd. Aanvullend wordt voor de LoD0.0 voetprint een nieuwe bounding box gegenereerd om de objecten die zijn geplaatst rond de hoogte van de voetprint. Hierdoor kan de gecreëerde LoD0.0 voetprint verschillen van een klassieke LoD0.0 bron voor hetzelfde gebouw.

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