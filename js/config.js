let respecConfig = {
  useLogo: true,
  useLabel: true,

  // TODO: title is verplicht! Neem hieronder de titel van het document op
  title: "GeoBIM BIM naar Geo brengen",
  //-- specStatus is verplicht! (activeer 1 van de volgende)
  specStatus: "wv",                 // Werkversie
  //specStatus: "cv",               // Consultatieversie
  //specStatus: "vv",               // Versie ter vaststelling
  //specStatus: "def",              // Vastgestelde versie
  //specStatus: "basis",            // Basis Document

  //-- specType is verplicht bij alle andere dan BASIS
  //specType: "NO",                 // Norm
  //specType: "ST",                 // Standaard
  //specType: "IM",                 // Informatie Model
  specType: "PR",                 // Praktijkrichtlijn
  //specType: "HR",                   // HandReiking
  //specType: "WA",                 // Werkafspraak
  //specType: "BD",                 // Beheer Documentatie
  //specType: "AL",                 // Algemeen document
  //specType: "BP",                 // Best Practice

  //-- pubDomain is verplicht! (komt in de URL)
  //-- zie: https://geonovum.github.io/handleiding-tooling/ReSpec/#pubdomain
  //-- TODO: vul pubDomain in
  pubDomain: "3dbv",

  //-- license: voor de geldende gebruiksvoorwaarden. Default is cc-by.
  //license: "cc-by-nd",            // bronvermelding, geen afgeleide werken (default)
  //license: "cc0",                 // Public Domain Dedication
  license: "cc-by",                 // Attribution, met bronvermelding

  //-- TODO shortName is verplicht! (komt in de URL: kies logische afkorting)
  shortName: "GeoBIM_BIM_naar_Geo",
  
  //edDraftURI = De URI van de draft version. Deze wordt automatisch afgeleid van de github URI; maar kan hier overschreven worden. 
	//edDraftURI: ["https://geonovum.github.io", "/", "shortName"],

  //-- publishDate is verplicht. Als je werkversie gekozen hebt  dan pakt Respec
  //-- de pushdate maar de publishDate is nog steeds verplicht.
  publishDate: "2025-03-28",
  
  //-- publishVersion is verplicht. Hij mag wel leeg zijn [], maar niet de lege string zijn "".
  publishVersion: [],
 
  //-- Voor dit blok geldt: alleen als er eerdere versies zijn en altijd beide aan/uit! 
  //previousPublishDate: "2014-05-01",
  //previousMaturity: "CV",

  //-- Deze gebruiken we niet binnen Geonovum
  //prevVersion: "0.0.1",

  //-- TODO: de namen van de Editor(s) / Redacteur(en)
  //-- vul in: per Editor: name:, company:, companyURL:
  editors:
    [
      {
        name: "Rolf Jonker",
        company: "Geonovum",
        companyURL: "https://www.geonovum.nl",
      }
    ],

  //-- de namen van de auteur(s) 
  //-- vul in: per auteur: name:, company:, companyURL: 
  authors:
    [
      {
        name: "Jasper van der Vaart",
        company: "GISmantike",
        companyURL: "https://gismantike.nl/",
      },
      {
        name: "Jantien Stoter",
        company: "TU Delft",
        companyURL: "https://3d.bk.tudelft.nl/",
      },
      {
        name: "Lex Ransijn",
        company: "VDC Base",
        companyURL: "https://vdcbase.com/",
      },
      {
        name: "Wouter Lubbers",
        company: "Semmtech",
        companyURL: "https://semmtech.com/",
      },
      {
        name: "Amir Hakim",
        company: "Future Insight",
        companyURL: "https://www.futureinsight.nl/",
      },
      {
        name: "Dirkjan Schenau",
        company: "Van Hattum en Blankevoort",
        companyURL: "https://www.vhbinfra.nl/",
      }
    ],

  // TODO: Vul de github URL in.
  //neem hier de URL van de github repository op waar het respec document in staat
  github: "https://github.com/Geonovum/GeoBIM_BIM_naar_Geo",

  // Create PDF and link to file in header (optional):
  // TODO: Change the filename as preferred.
  //alternateFormats: [
  //    {
  //        label: "pdf",
  //        uri: "static/template.pdf",
  //    },
  //],

  // Lokale lijst voor bibliografie
  // - Kijk eerst naar de beschikbare www.specref.org .
  // - Kijk daarna in de organisatieconfig.
  // - Voeg dan pas hieronder toe.
  localBiblio: 
  {
    // ---------- Normen (ISO / CEN / NEN) ----------
    "ISO19650-1": {
      id: "ISO19650-1",
      title: "ISO 19650-1:2018 Organization and digitization of information about buildings and civil engineering works, including building information modelling (BIM) — Information management using building information modelling — Part 1: Concepts and principles",
      href: "https://www.iso.org/standard/68078.html",
      status: "Definitief",
      publisher: "ISO",
      date: "2018"
    },
    "ISO19650-4": {
      id: "ISO19650-4",
      title: "ISO 19650-4:2022 Organization and digitization of information about buildings and civil engineering works, including building information modelling (BIM) — Information management using building information modelling — Part 4: Information exchange",
      href: "https://www.iso.org/standard/78246.html",
      status: "Definitief",
      publisher: "ISO",
      date: "2022"
    },
    "ISO16739-1": {
      id: "ISO16739-1",
      title: "ISO 16739-1:2024 Industry Foundation Classes (IFC) for data sharing in the construction and facility management industries — Part 1: Data schema",
      href: "https://www.iso.org/standard/84123.html",
      status: "Definitief",
      publisher: "ISO",
      date: "2024-03"
    },
    "ISO7817-1": {
      id: "ISO7817-1",
      title: "ISO 7817-1:2024 Building information modelling — Level of information need — Part 1: Concepts and principles",
      href: "https://www.iso.org/standard/82914.html",
      status: "Definitief",
      publisher: "ISO",
      date: "2024-06"
    },
    "EN17632-1": {
      id: "EN17632-1",
      title: "NEN-EN 17632-1:2022 Building information modelling (BIM) — Semantic modelling and linking (SML) — Part 1: Generic modelling patterns",
      href: "https://www.nen.nl/nen-en-17632-1-2022-en-304869",
      status: "Definitief",
      publisher: "NEN / CEN",
      date: "2022"
    },
    "NEN2660-2": {
      id: "NEN2660-2",
      title: "NEN 2660-2:2022 Regels voor informatiemodellering van de gebouwde omgeving — Deel 2: Praktische configuratie, uitbreiding en implementatie van NEN 2660-1",
      href: "https://www.nen.nl/en/nen-2660-2-2022-nl-291667",
      status: "Definitief",
      publisher: "NEN",
      date: "2022"
    },
    NEN3610: {
      id: "NEN3610",
      title: "NEN 3610:2022 Basismodel geo-informatie — Termen, definities, relaties en algemene regels voor de uitwisseling van informatie over aan de aarde gerelateerde ruimtelijke objecten",
      href: "https://connect.nen.nl/Standard/Detail/3666820",
      status: "Definitief",
      publisher: "NEN",
      date: "2022-06-01"
    },
    NEN2580: {
      id: "NEN2580",
      title: "NEN 2580:2007 Oppervlakten en inhouden van gebouwen — Termen, definities en bepalingsmethoden",
      href: "https://www.nen.nl/",
      status: "Definitief",
      publisher: "NEN",
      date: "2007"
    },

    // ---------- OGC / buildingSMART / CityJSON / BIMForum ----------
    CITYGML30: {
      id: "CITYGML30",
      title: "OGC City Geography Markup Language (CityGML) Part 1: Conceptual Model Standard, versie 3.0 (OGC 20-010)",
      href: "https://docs.ogc.org/is/20-010/20-010.html",
      status: "Definitief",
      publisher: "Open Geospatial Consortium",
      date: "2021"
    },
    "CITYGML30-GUIDE": {
      id: "CITYGML30-GUIDE",
      title: "OGC CityGML 3.0 Conceptual Model Users Guide (OGC 20-066)",
      href: "https://docs.ogc.org/guides/20-066.html",
      status: "Definitief",
      publisher: "Open Geospatial Consortium",
      date: "2021"
    },
    CITYGML20: {
      id: "CITYGML20",
      title: "OGC City Geography Markup Language (CityGML) Encoding Standard, versie 2.0 (OGC 12-019)",
      href: "https://www.ogc.org/standards/citygml/",
      status: "Definitief",
      publisher: "Open Geospatial Consortium",
      date: "2012"
    },
    CITYJSON20: {
      id: "CITYJSON20",
      title: "CityJSON Community Standard 2.0 (OGC 20-072r5)",
      href: "https://www.cityjson.org/specs/",
      status: "Definitief",
      publisher: "CityJSON / Open Geospatial Consortium",
      date: "2023-09-27"
    },
    "3DTILES": {
      id: "3DTILES",
      title: "3D Tiles Specification, versie 1.1 (OGC 22-025r4)",
      href: "https://docs.ogc.org/cs/22-025r4/22-025r4.html",
      status: "Definitief",
      publisher: "Open Geospatial Consortium",
      date: "2023-01-12"
    },
    IDS10: {
      id: "IDS10",
      title: "Information Delivery Specification (IDS), versie 1.0",
      href: "https://www.buildingsmart.org/standards/bsi-standards/information-delivery-specification-ids/",
      status: "Definitief",
      publisher: "buildingSMART International",
      date: "2024-06-01"
    },
    BSDD: {
      id: "BSDD",
      title: "buildingSMART Data Dictionary (bSDD)",
      href: "https://search.bsdd.buildingsmart.org/",
      status: "Online dienst",
      publisher: "buildingSMART International"
    },
    "BIMFORUM-LOD": {
      id: "BIMFORUM-LOD",
      title: "Level of Development (LOD) Specification",
      href: "https://bimforum.org/resource/lod-level-of-development-lod-specification/",
      status: "Definitief",
      publisher: "BIMForum"
    },

    // ---------- Nederlandse standaarden en afspraken ----------
    IMGEO: {
      id: "IMGEO",
      title: "IMGeo/BGT — Objectcatalogus Basisregistratie Grootschalige Topografie",
      href: "https://docs.geostandaarden.nl/imgeo/catalogus/bgt/",
      status: "Definitief",
      publisher: "Geonovum"
    },
    IMKL: {
      id: "IMKL",
      title: "IMKL — Informatiemodel Kabels en Leidingen",
      href: "https://docs.geostandaarden.nl/kl/imkl/",
      status: "Definitief",
      publisher: "Geonovum"
    },
    IMBAG: {
      id: "IMBAG",
      title: "Praktijkhandleiding BAG",
      href: "https://imbag.github.io/praktijkhandleiding/",
      status: "Definitief",
      publisher: "Kadaster"
    },
    "BAG-HISTORIE": {
      id: "BAG-HISTORIE",
      title: "Specificatie BAG historiemodel",
      href: "https://www.kadaster.nl/documents/1953498/2762071/Specificatie+BAG+historiemodel.pdf/09c12207-d198-0ebd-024c-6ad640338f13",
      status: "Definitief",
      publisher: "Kadaster",
      date: "2018"
    },
    IMBOR: {
      id: "IMBOR",
      title: "IMBOR — Informatiemodel Beheer Openbare Ruimte",
      href: "https://www.crow.nl/kennisproducten/imbor/",
      status: "Definitief",
      publisher: "CROW"
    },
    "3DTILING": {
      id: "3DTILING",
      title: "Handreiking 3D Tiling",
      href: "https://docs.geostandaarden.nl/3d/3d-tiling/",
      publisher: "Geonovum"
    },
    "GEOBIM-GEOREF": {
      id: "GEOBIM-GEOREF",
      title: "Praktijkrichtlijn Georefereren GeoBIM",
      href: "https://nl-digigo.github.io/GeoBIM_Georefereren/",
      publisher: "DigiGO / Geonovum"
    },
    "ILS-RUIMTEN": {
      id: "ILS-RUIMTEN",
      title: "ILS voor ruimten in de Omgevingswet",
      href: "https://www.digigo.nu/ils-voor-ruimten/",
      publisher: "DigiGO"
    },
    "BIM-BASIS-ILS": {
      id: "BIM-BASIS-ILS",
      title: "BIM basis ILS",
      href: "https://www.digigo.nu/ilsen-en-richtlijnen/bim-basis-ils/",
      publisher: "DigiGO"
    },
    "ILS-OE": {
      id: "ILS-OE",
      title: "ILS Ontwerp en Engineering",
      href: "https://www.digigo.nu/ilsen-en-richtlijnen/ils-ontwerp-en-engineering/",
      publisher: "DigiGO"
    },
    NLCS: {
      id: "NLCS",
      title: "Nederlandse CAD-Standaard (NLCS)",
      href: "https://www.digigo.nu/standaarden/nlcs/",
      publisher: "DigiGO"
    },

    // ---------- Wetenschappelijke literatuur ----------
    BILJECKI2016: {
      id: "BILJECKI2016",
      title: "An improved LOD specification for 3D building models",
      authors: ["F. Biljecki", "H. Ledoux", "J. Stoter"],
      href: "https://pure.tudelft.nl/ws/portalfiles/portal/4377508/Biljecki2016to.pdf",
      publisher: "Computers, Environment and Urban Systems, 59, 25–37",
      date: "2016"
    },
    BILJECKI2021: {
      id: "BILJECKI2021",
      title: "Extending CityGML for IFC-sourced 3D city models",
      authors: ["F. Biljecki", "J. Lim", "J. Crawford", "D. Moraru", "H. Tauscher", "A. Konde", "K. Adouane", "S. Lawrence", "P. Janssen", "R. Stouffs"],
      href: "https://doi.org/10.1016/j.autcon.2020.103440",
      publisher: "Automation in Construction, 121, 103440",
      date: "2021"
    },
    DONKERS2013: {
      id: "DONKERS2013",
      title: "Automatic generation of CityGML LoD3 building models from IFC models (masterthesis)",
      authors: ["S. Donkers"],
      href: "https://repository.tudelft.nl/record/uuid:31380219-f8e8-4c66-a2dc-548c3680bb8d",
      publisher: "TU Delft",
      date: "2013"
    },
    FLOROS2018: {
      id: "FLOROS2018",
      title: "Investigating interoperability capabilities between IFC and CityGML LoD 4 — Retaining semantic information",
      authors: ["G. S. Floros", "C. Ellul", "E. Dimopoulou"],
      href: "https://isprs-archives.copernicus.org/articles/XLII-4-W10/33/2018/",
      publisher: "ISPRS Archives, XLII-4/W10, 33–40",
      date: "2018"
    },
    VANDERVAART2024: {
      id: "VANDERVAART2024",
      title: "Enriching lower LoD 3D city models with semantic data computed by the voxelisation of BIM sources",
      authors: ["J. van der Vaart", "J. Stoter", "G. Agugiaro", "K. Arroyo Ohori", "A. Hakim", "S. El Yamani"],
      href: "https://doi.org/10.5194/isprs-annals-X-4-W5-2024-297-2024",
      publisher: "ISPRS Annals, X-4/W5-2024, 297–308",
      date: "2024"
    },
    VANDERVAART2025: {
      id: "VANDERVAART2025",
      title: "Defining LoDs to support BIM-based 3D building abstractions in GIS",
      authors: ["J. van der Vaart", "K. Arroyo Ohori", "J. Stoter", "S. El Yamani"],
      href: "https://isprs-archives.copernicus.org/articles/XLVIII-3-W4-2025/55/2026/",
      publisher: "ISPRS Archives, XLVIII-3/W4-2025, 55–62",
      date: "2025"
    },
    WANG2024: {
      id: "WANG2024",
      title: "Streamlining BIM models for GIS integration: an advanced approach to building envelope extraction",
      authors: ["Wang", "Cheng", "Chen", "Zhang"],
      href: "https://doi.org/10.1080/17538947.2024.2368708",
      publisher: "International Journal of Digital Earth, 17(1), 2368708",
      date: "2024"
    },
    PETERS2026: {
      id: "PETERS2026",
      title: "Automatische modellering van onderdoorgangen in de 3DBAG",
      authors: ["R. Peters", "et al."],
      href: "https://research.tudelft.nl/en/publications/automatische-modellering-van-onderdoorgangen-in-de-3dbag/",
      publisher: "TU Delft",
      date: "2026"
    }
  }
};
