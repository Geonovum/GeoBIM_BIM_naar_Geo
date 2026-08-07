# Voorbeeld ILS 


in IDS:

```xml 
<ids:ids xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://standards.buildingsmart.org/IDS http://standards.buildingsmart.org/IDS/1.0/ids.xsd" xmlns:ids="http://standards.buildingsmart.org/IDS">
  <!--Edited with usBIM.IDSeditor 2.4.8 (http://www.accasoftware.com)-->
  <ids:info>
    <ids:title>New ids file</ids:title>
  </ids:info>
  <ids:specifications>
    <ids:specification ifcVersion="IFC4X3_ADD2" name="Een BIM-model bevat een IFC Task met een status">
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
              <xs:enumeration value="In ontwerp" />
              <xs:enumeration value="In aanleg" />
              <xs:enumeration value="In gebruik" />
              <xs:enumeration value="Buiten gebruik" />
            </xs:restriction>
          </ids:value>
        </ids:attribute>
      </ids:requirements>
    </ids:specification>
    <ids:specification ifcVersion="IFC4X3_ADD2" name="Een BIM-model bevat een IFC Task met een predefinedtype">
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
            <ids:simpleValue>PredefinedType</ids:simpleValue>
          </ids:name>
          <ids:value>
            <xs:restriction base="xs:string">
              <xs:enumeration value="ADJUSTMENT" />
              <xs:enumeration value="ATTENDANCE" />
              <xs:enumeration value="CALIBRATION" />
              <xs:enumeration value="CONSTRUCTION" />
              <xs:enumeration value="DEMOLITION" />
              <xs:enumeration value="DISMANTLE" />
              <xs:enumeration value="DISPOSAL" />
              <xs:enumeration value="EMERGENCY" />
              <xs:enumeration value="INSPECTION" />
              <xs:enumeration value="INSTALLATION" />
              <xs:enumeration value="LOGISTIC" />
              <xs:enumeration value="MAINTENANCE" />
              <xs:enumeration value="MOVE" />
              <xs:enumeration value="OPERATION" />
              <xs:enumeration value="REMOVAL" />
              <xs:enumeration value="RENOVATION" />
              <xs:enumeration value="SAFETY" />
              <xs:enumeration value="SHUTDOWN" />
              <xs:enumeration value="STARTUP" />
              <xs:enumeration value="TESTING" />
              <xs:enumeration value="TROUBLESHOOTING" />
            </xs:restriction>
          </ids:value>
        </ids:attribute>
      </ids:requirements>
    </ids:specification>
    <ids:specification ifcVersion="IFC4X3_ADD2" name="Een BIM-model heeft element">
      <ids:applicability minOccurs="1" maxOccurs="unbounded">
        <ids:entity>
          <ids:name>
            <ids:simpleValue>IFCBUILTELEMENT</ids:simpleValue>
          </ids:name>
        </ids:entity>
      </ids:applicability>
      <ids:requirements />
    </ids:specification>
    <ids:specification ifcVersion="IFC4X3_ADD2" name="Er is een IFC RelassignsToProduct ">
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


```
PREFIX nen2660: <https://w3id.org/nen2660/def#>
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX ex: <https://example.org/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

ex:ActivityShape
    a sh:NodeShape ;
    sh:targetClass nen2660:Activity ;

    # transforms moet naar een Object verwijzen
    sh:property [
        sh:path nen2660:transforms ;
        sh:class nen2660:Object ;
        sh:minCount 1 ;
        sh:message "Iedere Activity moet minstens 1 object veranderen." ;
    ] ;

    # hasState moet één van de toegestane waarden zijn
    sh:property [
        sh:path nen2660:hasState ;
        sh:in (
            "In ontwerp"
            "In aanleg"
            "In gebruik"
            "Buiten gebruik"
        ) ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:message "Iedere Activity moet precies één status hebben." ;
    ] ;

    sh:property [
        sh:path ex:activityType ;
        sh:class ex:ActivityType ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:message "Iedere Activity moet precies één ActivityType hebben." ;
    ] .

    ex:ADJUSTMENT,
    ex:ATTENDANCE,
    ex:CALIBRATION,
    ex:CONSTRUCTION,
    ex:DEMOLITION,
    ex:DISMANTLE,
    ex:DISPOSAL,
    ex:EMERGENCY,
    ex:INSPECTION,
    ex:INSTALLATION,
    ex:LOGISTIC,
    ex:MAINTENANCE,
    ex:MOVE,
    ex:OPERATION,
    ex:REMOVAL,
    ex:RENOVATION,
    ex:SAFETY,
    ex:SHUTDOWN,
    ex:STARTUP,
    ex:TESTING,
    ex:TROUBLESHOOTING
    a ex:ActivityType .
```

