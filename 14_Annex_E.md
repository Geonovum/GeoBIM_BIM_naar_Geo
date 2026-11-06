# Voorbeeld ILS

Deze bijlage laat zien hoe dezelfde eisen uit een ILS op twee manieren machineleesbaar kunnen worden vastgelegd en afgedwongen: als IDS voor IFC-modellen en als SHACL voor linked data volgens NEN 2660-2 [[NEN2660-2]] (zie [InformatieLeveringsSpecificatie (ILS)](#informatieleveringsspecificatie-ils-en-information-delivery-specification-ids)). Het voorbeeld gaat over maatregelen en de status daarvan, zoals beschreven in het hoofdstuk [Levenscyclus van BIM naar Geo](#levenscyclus-van-bim-naar-geo). Dat hoofdstuk is leidend: de maatregel komt uit de GWSW-maatregelenlijst en kan worden aangevuld met het IFC-taaktype.

Het hoofdstuk Levenscyclus onderscheidt drie begrippen, die in dit voorbeeld elk op hun eigen plek staan:

- **Maatregel**: wat er met een object gebeurt, bijvoorbeeld Aanleggen of Verwijderen. Hoort bij de maatregel.
- **Status maatregel**: hoe ver de maatregel is, bijvoorbeeld Gepland of Uitgevoerd. Hoort bij de maatregel.
- **Status functioneren**: in welke fase het bouwwerk zelf zich bevindt, bijvoorbeeld In ontwerp of In gebruik. Hoort bij het bouwwerk, niet bij de maatregel, en valt daarom buiten dit voorbeeld.

Beide voorbeelden leggen dezelfde eisen vast:

| Nr. | Eis | IFC (IDS) | NEN 2660-2 (SHACL) |
|---|---|---|---|
| MAAT-01 | Het model bevat ten minste één maatregel, en elke maatregel heeft precies één status maatregel: Gepland, In voorbereiding, In uitvoering, Uitgevoerd of Vervallen. | `IfcTask.Status` | `ex:statusMaatregel` |
| MAAT-02 | Elke maatregel heeft precies één maatregel uit de GWSW-maatregelenlijst: Aanleggen, Buiten gebruik stellen, Conserveren, Onderhouden, Onderzoeken, Renoveren, Repareren, Vervangen of Verwijderen. | `IfcTask.ObjectType` | `ex:maatregel` |
| MAAT-03 | Aanvullend: als een IFC-taaktype is ingevuld, komt dat uit de IFC-lijst (`IfcTaskTypeEnum`). | `IfcTask.PredefinedType` | `ex:ifcTaakType` |
| MAAT-04 | Elke maatregel is gekoppeld aan het object dat hij verandert. | `IfcRelAssignsToProduct` | `nen2660:transforms` |

Beide voorbeelden zijn gecontroleerd: de IDS is geldig volgens het IDS 1.0-schema van buildingSMART, en de SHACL-shapes zijn getest op voorbeeldgegevens die wel en niet aan de eisen voldoen.

## In IDS

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ids:ids xmlns:ids="http://standards.buildingsmart.org/IDS" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://standards.buildingsmart.org/IDS http://standards.buildingsmart.org/IDS/1.0/ids.xsd">
  <ids:info>
    <ids:title>Voorbeeld ILS maatregelen</ids:title>
    <ids:version>1.1</ids:version>
    <ids:description>Eisen aan maatregelen in een BIM-model volgens het hoofdstuk Levenscyclus van BIM naar Geo, als voorbeeld bij de praktijkrichtlijn BIM naar Geo.</ids:description>
  </ids:info>
  <ids:specifications>
    <ids:specification name="Het model bevat ten minste één maatregel met een geldige status maatregel" ifcVersion="IFC4X3_ADD2" identifier="MAAT-01">
      <ids:applicability minOccurs="1" maxOccurs="unbounded">
        <ids:entity>
          <ids:name>
            <ids:simpleValue>IFCTASK</ids:simpleValue>
          </ids:name>
        </ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:attribute cardinality="required">
          <ids:name>
            <ids:simpleValue>Status</ids:simpleValue>
          </ids:name>
          <ids:value>
            <xs:restriction base="xs:string">
              <xs:enumeration value="Gepland"/>
              <xs:enumeration value="In voorbereiding"/>
              <xs:enumeration value="In uitvoering"/>
              <xs:enumeration value="Uitgevoerd"/>
              <xs:enumeration value="Vervallen"/>
            </xs:restriction>
          </ids:value>
        </ids:attribute>
      </ids:requirements>
    </ids:specification>
    <ids:specification name="Elke maatregel heeft een maatregel uit de GWSW-maatregelenlijst" ifcVersion="IFC4X3_ADD2" identifier="MAAT-02">
      <ids:applicability minOccurs="0" maxOccurs="unbounded">
        <ids:entity>
          <ids:name>
            <ids:simpleValue>IFCTASK</ids:simpleValue>
          </ids:name>
        </ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:attribute cardinality="required">
          <ids:name>
            <ids:simpleValue>ObjectType</ids:simpleValue>
          </ids:name>
          <ids:value>
            <xs:restriction base="xs:string">
              <xs:enumeration value="Aanleggen"/>
              <xs:enumeration value="Buiten gebruik stellen"/>
              <xs:enumeration value="Conserveren"/>
              <xs:enumeration value="Onderhouden"/>
              <xs:enumeration value="Onderzoeken"/>
              <xs:enumeration value="Renoveren"/>
              <xs:enumeration value="Repareren"/>
              <xs:enumeration value="Vervangen"/>
              <xs:enumeration value="Verwijderen"/>
            </xs:restriction>
          </ids:value>
        </ids:attribute>
      </ids:requirements>
    </ids:specification>
    <ids:specification name="Een eventueel ingevuld IFC-taaktype komt uit de IFC-lijst" ifcVersion="IFC4X3_ADD2" identifier="MAAT-03">
      <ids:applicability minOccurs="0" maxOccurs="unbounded">
        <ids:entity>
          <ids:name>
            <ids:simpleValue>IFCTASK</ids:simpleValue>
          </ids:name>
        </ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:attribute cardinality="optional">
          <ids:name>
            <ids:simpleValue>PredefinedType</ids:simpleValue>
          </ids:name>
          <ids:value>
            <xs:restriction base="xs:string">
              <xs:enumeration value="ADJUSTMENT"/>
              <xs:enumeration value="ATTENDANCE"/>
              <xs:enumeration value="CALIBRATION"/>
              <xs:enumeration value="CONSTRUCTION"/>
              <xs:enumeration value="DEMOLITION"/>
              <xs:enumeration value="DISMANTLE"/>
              <xs:enumeration value="DISPOSAL"/>
              <xs:enumeration value="EMERGENCY"/>
              <xs:enumeration value="INSPECTION"/>
              <xs:enumeration value="INSTALLATION"/>
              <xs:enumeration value="LOGISTIC"/>
              <xs:enumeration value="MAINTENANCE"/>
              <xs:enumeration value="MOVE"/>
              <xs:enumeration value="OPERATION"/>
              <xs:enumeration value="REMOVAL"/>
              <xs:enumeration value="RENOVATION"/>
              <xs:enumeration value="SAFETY"/>
              <xs:enumeration value="SHUTDOWN"/>
              <xs:enumeration value="STARTUP"/>
              <xs:enumeration value="TESTING"/>
              <xs:enumeration value="TROUBLESHOOTING"/>
              <xs:enumeration value="USERDEFINED"/>
              <xs:enumeration value="NOTDEFINED"/>
            </xs:restriction>
          </ids:value>
        </ids:attribute>
      </ids:requirements>
    </ids:specification>
    <ids:specification name="Maatregelen zijn gekoppeld aan het object dat zij veranderen" ifcVersion="IFC4X3_ADD2" identifier="MAAT-04">
      <ids:applicability minOccurs="1" maxOccurs="unbounded">
        <ids:entity>
          <ids:name>
            <ids:simpleValue>IFCRELASSIGNSTOPRODUCT</ids:simpleValue>
          </ids:name>
        </ids:entity>
      </ids:applicability>
      <ids:requirements>
        <ids:attribute cardinality="required">
          <ids:name>
            <ids:simpleValue>RelatingProduct</ids:simpleValue>
          </ids:name>
        </ids:attribute>
        <ids:attribute cardinality="required">
          <ids:name>
            <ids:simpleValue>RelatedObjects</ids:simpleValue>
          </ids:name>
        </ids:attribute>
      </ids:requirements>
    </ids:specification>
  </ids:specifications>
</ids:ids>
```

IDS kan niet per maatregel controleren of die aan een object is gekoppeld, omdat het partOf-facet de relatie `IfcRelAssignsToProduct` niet ondersteunt. MAAT-04 controleert daarom dat het model ten minste één volledig ingevulde koppeling tussen maatregel en object bevat. SHACL kan deze eis wel per maatregel controleren.

## In SHACL

```turtle
@prefix nen2660: <https://w3id.org/nen2660/def#> .
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix ex: <https://example.org/> .

# MAAT-01 (deel 1): het model bevat ten minste één maatregel
ex:MaatregelAanwezigShape
    a sh:NodeShape ;
    sh:targetNode nen2660:Activity ;
    sh:property [
        sh:path [ sh:inversePath rdf:type ] ;
        sh:minCount 1 ;
        sh:message "Het model bevat geen enkele maatregel (nen2660:Activity)." ;
    ] .

ex:MaatregelShape
    a sh:NodeShape ;
    sh:targetClass nen2660:Activity ;

    # MAAT-01 (deel 2): precies één status maatregel
    sh:property [
        sh:path ex:statusMaatregel ;
        sh:in ( "Gepland" "In voorbereiding" "In uitvoering" "Uitgevoerd" "Vervallen" ) ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:message "Iedere maatregel heeft precies één status maatregel uit de toegestane lijst." ;
    ] ;

    # MAAT-02: precies één maatregel uit de GWSW-maatregelenlijst
    sh:property [
        sh:path ex:maatregel ;
        sh:in ( "Aanleggen" "Buiten gebruik stellen" "Conserveren" "Onderhouden" "Onderzoeken" "Renoveren" "Repareren" "Vervangen" "Verwijderen" ) ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:message "Iedere maatregel heeft precies één maatregel uit de GWSW-maatregelenlijst." ;
    ] ;

    # MAAT-03: een eventueel IFC-taaktype komt uit de IFC-lijst (aanvullend)
    sh:property [
        sh:path ex:ifcTaakType ;
        sh:in ( "ADJUSTMENT" "ATTENDANCE" "CALIBRATION" "CONSTRUCTION" "DEMOLITION" "DISMANTLE" "DISPOSAL" "EMERGENCY" "INSPECTION" "INSTALLATION" "LOGISTIC" "MAINTENANCE" "MOVE" "OPERATION" "REMOVAL" "RENOVATION" "SAFETY" "SHUTDOWN" "STARTUP" "TESTING" "TROUBLESHOOTING" "USERDEFINED" "NOTDEFINED" ) ;
        sh:maxCount 1 ;
        sh:message "Een IFC-taaktype komt uit de IFC-lijst (IfcTaskTypeEnum)." ;
    ] ;

    # MAAT-04: gekoppeld aan ten minste één object dat de maatregel verandert
    sh:property [
        sh:path nen2660:transforms ;
        sh:class nen2660:Object ;
        sh:minCount 1 ;
        sh:message "Iedere maatregel verandert ten minste één object." ;
    ] .
```
