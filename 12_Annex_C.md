# Levenscyclus

Onderstaande beelden visualiseren de flow van wijzigingen bij BIM en Geo. 

## Situatie

Stel men heeft in Geo de volgende entiteitsinstanties: 

Weg 123, Weg 124, Weg 125, Parkeervak 123, Voetpad 123, Voetpad 124, Groenvak 123, Groenvak 124, Pand 123, Pand 124 en Pand 125.

En stel men heeft in BIM entiteitsinstanties op een lager decompositieniveau (kleinere onderdelen):

Tegelvlak 123, Band 123, Band 124, Hoekstuk 123, Kaasstuk 123 en Opsluitband 123.

En stel men heeft een connectie gemaakt tussen BIM en Geo.

<figure id="Situatie_weg_en_elementen">
      <img src="media/levenscyclus/Weg_of_verharding_bestaande_uit_elementen.png" alt="Situatie_weg_en_elementen"/>
    <figcaption><a class="self-link" href="#Situatie_weg_en_elementen"></a><span class="fig-title">Wegen die bestaan uit weginrichtingselementen</span></figcaption>
</figure>

## Vervangen van elementen

Men zou elementen van het voetpad kunnen vervangen. In onderstaande situatie is een wijziging aangebracht:  
- Band 123 is verwijderd en Band 125 is aangelegd (1-op-1-vervanging).
- Band 124 is verwijderd en Band 126 is aangelegd (1-op-1-vervanging).
- Hoekstuk 123 is verwijderd en Hoekstuk 124 is aangelegd (1-op-1-vervanging).
- Kaasstuk 123 is verwijderd en Kaasstuk 124 is aangelegd (1-op-1-vervanging). 

Deze maatregelen hebben de status *Uitgevoerd*.

In de huidige BGT zit geen koppeling tussen een BGT-object en de objecten waaruit deze kan bestaan. Voetpad 123 blijft in dat geval bestaan. 

Bij een koppeling tussen BGT-objecten en de objecten waaruit deze bestaan, blijft Voetpad 123 bestaan, maar krijgt een nieuwe versie. 

versie huidig:
```turtle
@prefix nen2660: <https://w3id.org/nen2660/def#> .
@prefix example: <https://example.org/> .

example:voetpad_123 nen2660:hasPart
    example:band_123, 
    example:band_124, 
    example:hoekstuk_123, 
    example:kaasstuk_123 .
```
versie nieuw:
```turtle
@prefix nen2660: <https://w3id.org/nen2660/def#> .
@prefix example: <https://example.org/> .

example:voetpad_123 nen2660:hasPart
    example:band_125, 
    example:band_126, 
    example:hoekstuk_124, 
    example:kaasstuk_124 .
```

<figure id="Vervangen_van_elementen">
      <img src="media/levenscyclus/Weg_of_verharding_bestaande_uit_elementen_elementen_vervangen.png" alt="Vervangen_van_elementen"/>
    <figcaption><a class="self-link" href="#Vervangen_van_elementen"></a><span class="fig-title">Verandering in wegen die bestaan uit weginrichtingselementen, door vervanging van weginrichtingselementen</span></figcaption>
</figure>

## Nieuwe weg in een bestaande weg

Men zou een nieuw voetpad kunnen maken. In onderstaande situatie is een nieuw voetpad gemaakt door: 
- Een deel van Tegelvlak 123 is verwijderd en Tegelvlak 125 is aangelegd. 
  - Het ene blijvende deel van Tegelvlak 123 blijft Tegelvlak 123. Het andere blijvende deel wordt Tegelvlak 124, omdat het niet meer aansluit op Tegelvlak 123.   
- Band 123 is verwijderd en Band 126 is aangelegd (1-op-1-vervanging).
- Band 124 is verwijderd en Band 127 is aangelegd (1-op-1-vervanging).
- Hoekstuk 123 is verwijderd en Hoekstuk 124 is aangelegd (1-op-1-vervanging).
- Kaasstuk 123 is verwijderd en Kaasstuk 124 is aangelegd (1-op-1-vervanging). 

Deze maatregelen hebben de status *Uitgevoerd*.

Dan blijft het Voetpad 123 bestaan, maar krijgt een nieuwe versie en geometrie. Voetpad 125 ontstaat als nieuw object met de attributen en waarden van Voetpad 123. Voetpad 126 ontstaat met nieuwe attributen.   

<figure id="Nieuwe_weg_in_een_bestaande_weg">
      <img src="media/levenscyclus/Weg_of_verharding_bestaande_uit_elementen_nieuw_voetpad_in_bestaand_voetpad.png" alt="Nieuwe_weg_in_een_bestaande_weg"/>
    <figcaption><a class="self-link" href="#Nieuwe_weg_in_een_bestaande_weg"></a><span class="fig-title">Verandering in wegen die bestaan uit weginrichtingselementen, door een nieuwe weg in een bestaande weg</span></figcaption>
</figure>

## Nieuwe weg in een bestaand onbegroeid terrein

Men zou nieuwe wegen kunnen maken in bestaand onbegroeid terrein. In onderstaande situatie is een nieuwe situatie gemaakt door: 
- Onbegroeid terreindeel 123 is verwijderd en Tegelvlak 123 en 124, Band 125 en 126, Hoekstuk 124, Kaasstuk 124 enzovoort zijn aangelegd. 

Deze maatregelen hebben de status *Uitgevoerd*.

Dan ontstaan Weg 123, 124 en 125, Voetpad 123 en 124, Parkeervak 123 enzovoort. 

<figure id="Nieuwe_weg_in_een_onbegroeid_terrein">
      <img src="media/levenscyclus/Weg_of_verharding_bestaande_uit_elementen_nieuw_voetpad_in_bestaand_onbegroeid_terreindeel.png" alt="Nieuwe weg in een onbegroeid terrein"/>
    <figcaption><a class="self-link" href="#Nieuwe_weg_in_een_onbegroeid_terrein"></a><span class="fig-title">Nieuwe weg in een onbegroeid terrein</span></figcaption>
</figure>
