# Praktijkvoorbeelden IDS

## Praktijkvoorbeeld 1 — Precondities vóór inhoudelijke toetsing

 In een traject rond geautomatiseerde vergunningcontrole wordt een IFC-model van een aanvrager machinaal getoetst aan regels uit het omgevingsplan en het bouwbesluit. Bij het opstellen van die toetsen bleek dat een aanzienlijk deel van de mislukte controles niet werd veroorzaakt door de regels zelf, maar door modellen die de basis niet op orde hadden.

 Daarom is een set precondities gedefinieerd die vóór elke inhoudelijke toets wordt uitgevoerd: is een georeferentie aanwezig; bevindt de modelgeometrie zich in de buurt van de gerefereerde oorsprong; valt de bounding box binnen een plausibele maatvoering. Een model dat op een preconditie faalt, wordt niet inhoudelijk getoetst.

 Van deze drie is de eerste inmiddels ook in de ILS zelf ondergebracht, als IDS-specificatie op `IfcMapConversion` en `IfcProjectedCRS`. De twee andere blijven geometrische controles: zij vergelijken de vastgelegde waarden met de werkelijke ligging en omvang van het model, en dat is geen semantische toets.

 Voor deze praktijkrichtlijn: neem de precondities op als eerste trap in de acceptatieprocedure, gescheiden van de semantische validatie — maar breng naar de ILS toe wat in de ILS kan, zodat de indiener het vooraf zelf kan controleren.

 ### Praktijkvoorbeeld 2 — Modulaire ILS'en in de praktijk

 Bij het opstellen van een leveringsspecificatie voor ruimtelijke informatie is gekozen voor een opbouw van grof naar fijn — gebouwinhoud → bouwlaaginhoud → gebruiksfunctie → gebieden → ruimten — waarbij elk niveau optelbaar is en niveaus elkaar niet overlappen. Dat model is gepubliceerd in de bSDD en vertaald naar een IDS.

 Twee ontwerpkeuzes uit dat traject zijn direct relevant:

 - Geen nationale property sets. In plaats van een eigen `Pset` wordt gewerkt met de bestaande IFC-attributen `Name`, `ObjectType` en `Description`, met `PredefinedType = USERDEFINED` en een Nederlandse term in `ObjectType`. Daarmee blijft het model leesbaar voor generieke IFC-software — en blijft de bijbehorende IDS combineerbaar met andere bron-ILS'en, omdat er geen eigen naamruimte in het spel is.
 - Optelbaarheid als toetsbare eis. Doordat ruimten sluitend en zonder overlap gemodelleerd moeten zijn, is de som van de ruimten per bouwlaag controleerbaar tegen de bouwlaaginhoud. Dit is dezelfde eis die hierboven onder *Geometrierepresentatie* is opgenomen — vanuit een andere behoefte, met dezelfde uitkomst.

 Voor deze praktijkrichtlijn: een ruimtemodel is een bruikbare tussenlaag tussen bouwdeelgerichte BIM-modellen en objectgerichte GEO-datasets.

 ### Praktijkvoorbeeld 3 — Afleiden in plaats van extra attributen eisen

 Voor een toets op maximale bouwhoogte is de gebouwhoogte nodig. Dat begrip bestond niet in de gebruikte leveringsspecificatie, en de eerste reflex was om een attribuut "gebouwhoogte" toe te voegen.

 Daarvoor is niet gekozen. In plaats daarvan is een set afgeleide eigenschappen gedefinieerd — referentiepeil, nok- en goothoogte, voetafdrukcontour, oppervlakten per ruimte — die uit de geleverde geometrie worden berekend. De leverancier levert die eigenschappen dus niet, mits de geometrische basis op orde is: een correcte georeferentie, sluitende ruimten en een volledige bouwlaagstructuur.

 Dat verschuift de aandacht in de ILS van *meer attributen eisen* naar *de geometrische basis eisen die afleiding mogelijk maakt*. Het voorkomt tegenstrijdigheden tussen een geleverd getal en de geometrie waaruit datzelfde getal berekend kan worden.

 Voor deze praktijkrichtlijn: onderscheid in de ILS expliciet tussen *te leveren* en *af te leiden* eigenschappen, en stel voor de af te leiden eigenschappen eisen aan de geometrie in plaats van aan het attribuut. Dit is dezelfde redenering als in *Elke conversiemethode veronderstelt een ILS*, van de andere kant benaderd.