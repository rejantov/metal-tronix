export type Language = "en" | "sq" | "de";

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      products: "Products",
      history: "Our Story",
      contact: "Contact",
      getQuote: "Get a Quote",
    },
    // Hero Section
    hero: {
      tagline: "Precision Metal Fabrication",
      title: "Engineering Excellence in Every Cut",
      subtitle:
        "From prototype to production, Metal Tronix delivers precision laser cutting, press brake forming, and custom metal fabrication with tolerances that exceed industry standards.",
      cta: "Request a Quote",
      ctaSecondary: "View Our Work",
      stats: {
        laserPower: "6kW Fiber Laser Power",
        tolerance: "±0.005\" Tolerances",
        experience: "37+ Years Experience",
      },
    },
    // Services Section
    services: {
      title: "Our Services",
      subtitle: "Capabilities",
      description:
        "Comprehensive metal fabrication services with state-of-the-art equipment and decades of expertise.",
      laserCutting: {
        title: "CNC Laser Cutting",
        description:
          "High-precision fiber laser cutting with minimal kerf width. Capable of processing steel up to 1\" thick, stainless up to 0.5\", and aluminum up to 0.375\".",
        features: [
          "6kW IPG fiber source",
          "0.004\" kerf width",
          "N2/O2 assist gas options",
          "Edge quality Ra 125μin",
        ],
      },
      brakeFoming: {
        title: "Press Brake Forming",
        description:
          "CNC press brake operations with back-gauge accuracy to ±0.0005\". Complex multi-bend parts with tight angular tolerances.",
        features: [
          "350-ton capacity",
          "14' bed length",
          "±0.5° angular tolerance",
          "Air bend & bottom bend",
        ],
      },
      tubeCutting: {
        title: "Tube & Pipe Cutting",
        description:
          "Rotary axis laser cutting for round, square, and rectangular tubing. Complex contours and notching with precision fit-up.",
        features: [
          "Up to 6\" diameter",
          "DOM & HREW tubing",
          "Cope cuts & notches",
          "Weld prep bevels",
        ],
      },
      customFab: {
        title: "Custom Fabrication",
        description:
          "Complete fabrication services including welding, hardware insertion, and assembly. MIG, TIG, and spot welding capabilities.",
        features: [
          "AWS D1.1 certified",
          "PEM hardware insertion",
          "Sub-assembly & kitting",
          "Finishing coordination",
        ],
      },
    },
    // Capabilities Section
    capabilities: {
      title: "Technical Capabilities",
      subtitle: "Specifications",
      materials: {
        title: "Materials We Process",
        items: [
          { name: "Carbon Steel", spec: "10-22 gauge, up to 1\" plate" },
          { name: "Stainless Steel", spec: "304, 316, 430 - up to 0.5\"" },
          { name: "Aluminum", spec: "5052, 6061 - up to 0.375\"" },
          { name: "Specialty Alloys", spec: "AR400/500, Hardox, Copper" },
        ],
      },
      technical: {
        title: "Technical Specs",
        items: [
          { name: "Positional Accuracy", spec: "±0.002\" / 10\"" },
          { name: "Repeatability", spec: "±0.0005\"" },
          { name: "Max Sheet Size", spec: '60" × 120"' },
          { name: "Min Feature Size", spec: "0.5× material thickness" },
        ],
      },
    },
    // CTA Section
    cta: {
      title: "Ready to Start Your Project?",
      description:
        "From single prototypes to production runs, we deliver precision metal fabrication with quick turnaround times. Upload your DXF, DWG, or STEP files for a rapid quote.",
      button: "Get Your Quote Today",
      features: [
        "24-48 hour quote turnaround",
        "DXF, DWG, STEP file support",
        "Prototype to Kanban programs",
      ],
    },
    // Products Page
    products: {
      title: "Our Work",
      subtitle: "Portfolio",
      description:
        "Browse our gallery of precision metal fabrication projects. From intricate laser-cut components to complex multi-bend assemblies.",
      filterAll: "All Projects",
      categories: {
        laserCutting: "Laser Cutting",
        brakeForming: "Press Brake Forming",
        tubePipe: "Tube & Pipe",
        customFab: "Custom Fabrication",
        assemblies: "Assemblies",
      },
      viewDetails: "View Details",
      close: "Close",
      specs: {
        material: "Material",
        thickness: "Thickness",
        tolerance: "Tolerance",
        finish: "Finish",
        quantity: "Quantity",
      },
    },
    // Contact Page
    contact: {
      title: "Get in Touch",
      subtitle: "Contact Us",
      description:
        "Ready to start your next project? Request a quote or reach out with any questions about our capabilities.",
      form: {
        title: "Request a Quote",
        name: "Full Name",
        namePlaceholder: "John Smith",
        email: "Email Address",
        emailPlaceholder: "john@company.com",
        company: "Company",
        companyPlaceholder: "Your Company Name",
        phone: "Phone",
        phonePlaceholder: "(555) 123-4567",
        service: "Service Needed",
        servicePlaceholder: "Select a service",
        serviceOptions: {
          laserCutting: "CNC Laser Cutting",
          brakeForming: "Press Brake Forming",
          tubeCutting: "Tube & Pipe Cutting",
          customFab: "Custom Fabrication",
          assembly: "Assembly Services",
          other: "Other / Multiple Services",
        },
        material: "Primary Material",
        materialPlaceholder: "Select material",
        materialOptions: {
          carbonSteel: "Carbon Steel (A36, 1018, etc.)",
          stainlessSteel: "Stainless Steel (304, 316, etc.)",
          aluminum: "Aluminum (5052, 6061, etc.)",
          arPlate: "AR Plate (AR400, AR500, Hardox)",
          copper: "Copper / Brass",
          other: "Other / Multiple Materials",
        },
        quantity: "Estimated Quantity",
        quantityPlaceholder: "Select quantity range",
        quantityOptions: {
          prototype: "Prototype (1-5 pieces)",
          small: "Small Run (6-50 pieces)",
          medium: "Medium Run (51-500 pieces)",
          production: "Production (500+ pieces)",
          kanban: "Kanban / Blanket Order",
        },
        message: "Project Details",
        messagePlaceholder:
          "Describe your project, including dimensions, tolerances, finish requirements, etc.",
        fileNote:
          "You can send CAD files (DXF, DWG, STEP) to quotes@metaltronix.com after submitting this form.",
        submit: "Submit Quote Request",
        submitting: "Sending...",
        success: "Quote request submitted! We'll be in touch within 24-48 hours.",
      },
      info: {
        title: "Contact Information",
        address: {
          label: "Address",
          value: "1234 Industrial Parkway\nManufacturing District\nYour City, ST 12345",
        },
        phone: {
          label: "Phone",
          value: "(555) 123-4567",
        },
        email: {
          label: "Email",
          value: "quotes@metaltronix.com",
        },
        hours: {
          label: "Hours",
          value: "Monday - Friday: 7:00 AM - 5:00 PM\nSaturday: By appointment",
        },
      },
      certifications: {
        title: "Certifications & Standards",
        items: [
          "ISO 9001:2015 Certified",
          "AS9100D Aerospace",
          "ITAR Registered",
          "AWS D1.1 Welding",
        ],
      },
    },
    // History Page
    history: {
      title: "Our Story",
      subtitle: "Since 1987",
      description:
        "For over three decades, Metal Tronix has been at the forefront of precision metal fabrication, growing from a small garage operation to a state-of-the-art manufacturing facility.",
      founderQuote:
        '"We started with a single plasma cutter and a vision. Today, we run six fiber lasers, twelve press brakes, and employ over 150 skilled craftspeople. But our mission remains the same: deliver precision that exceeds expectations."',
      founderName: "James Mitchell",
      founderTitle: "Founder & CEO",
      facility: {
        title: "Our Facility",
        description:
          "Our 50,000 sq ft manufacturing facility houses the latest in CNC laser cutting and press brake technology. Climate-controlled environment ensures material stability and consistent quality.",
      },
      values: {
        title: "Our Values",
        precision: {
          title: "Precision First",
          description:
            "Every cut, every bend, every weld meets or exceeds specified tolerances. We measure twice and cut once.",
        },
        partnership: {
          title: "Partnership",
          description:
            "We're not just a vendor - we're an extension of your engineering team. Your success is our success.",
        },
        innovation: {
          title: "Innovation",
          description:
            "Continuous investment in the latest technology keeps us at the cutting edge of metal fabrication.",
        },
        integrity: {
          title: "Integrity",
          description:
            "Honest communication, fair pricing, and reliable delivery. We do what we say we'll do.",
        },
      },
    },
    // Timeline
    timeline: {
      items: [
        {
          year: "1987",
          title: "Founded",
          description:
            "James Mitchell starts Metal Tronix in a 2,000 sq ft garage with a single plasma cutter and manual press brake.",
        },
        {
          year: "1995",
          title: "First CNC Laser",
          description:
            "Invested in first CO2 laser cutting system. Expanded to 8,000 sq ft facility.",
        },
        {
          year: "2003",
          title: "ISO Certification",
          description:
            "Achieved ISO 9001 certification. Added second laser and three CNC press brakes.",
        },
        {
          year: "2010",
          title: "Aerospace Expansion",
          description:
            "AS9100 certification opens aerospace market. Moved to current 30,000 sq ft facility.",
        },
        {
          year: "2018",
          title: "Fiber Laser Technology",
          description:
            "Transitioned to high-power fiber lasers. Added tube cutting capabilities.",
        },
        {
          year: "2024",
          title: "50,000 Sq Ft Facility",
          description:
            "Completed major expansion. Six fiber lasers, twelve press brakes, 150+ employees.",
        },
      ],
    },
    // Footer
    footer: {
      description:
        "Precision metal fabrication services including CNC laser cutting, press brake forming, and custom fabrication. Serving manufacturers nationwide since 1987.",
      services: "Services",
      company: "Company",
      contact: "Contact",
      aboutUs: "About Us",
      careers: "Careers",
      quality: "Quality",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },
  sq: {
    // Navigation
    nav: {
      home: "Ballina",
      products: "Produktet",
      history: "Historia Jonë",
      contact: "Kontakti",
      getQuote: "Merr Ofertë",
    },
    // Hero Section
    hero: {
      tagline: "Përpunimi Preciz i Metalit",
      title: "Ekselencë Inxhinierike në Çdo Prerje",
      subtitle:
        "Nga prototipi deri në prodhim, Metal Tronix ofron prerje precize me lazer, formim me presa dhe përpunim të personalizuar të metalit me toleranca që tejkalojnë standardet e industrisë.",
      cta: "Kërko Ofertë",
      ctaSecondary: "Shiko Punët Tona",
      stats: {
        laserPower: "6kW Fuqi Lazeri Fibër",
        tolerance: '±0.005" Toleranca',
        experience: "37+ Vite Përvojë",
      },
    },
    // Services Section
    services: {
      title: "Shërbimet Tona",
      subtitle: "Kapacitetet",
      description:
        "Shërbime gjithëpërfshirëse të përpunimit të metalit me pajisje të teknologjisë së fundit dhe dekada përvojë.",
      laserCutting: {
        title: "Prerje Lazer CNC",
        description:
          "Prerje lazer fibër me precizitet të lartë dhe gjerësi minimale prerjeje. I aftë të përpunojë çelik deri në 1\" trashësi.",
        features: [
          "Burim fibër IPG 6kW",
          '0.004" gjerësi prerjeje',
          "Opsione gazi N2/O2",
          "Cilësi skaje Ra 125μin",
        ],
      },
      brakeFoming: {
        title: "Formim me Presa",
        description:
          "Operacione presa CNC me saktësi matësi prapa deri në ±0.0005\". Pjesë komplekse me shumë përkulje.",
        features: [
          "Kapacitet 350 tonë",
          "14' gjatësi shtrati",
          "±0.5° tolerancë këndore",
          "Përkulje ajri & fund",
        ],
      },
      tubeCutting: {
        title: "Prerje Tubash & Gypash",
        description:
          "Prerje lazer me bosht rrotullues për tuba të rrumbullakëta, katrore dhe drejtkëndore.",
        features: [
          "Deri në 6\" diametër",
          "Tuba DOM & HREW",
          "Prerje konturesh",
          "Prerje për saldim",
        ],
      },
      customFab: {
        title: "Përpunim i Personalizuar",
        description:
          "Shërbime të plota përpunimi përfshirë saldim, futje pajisjesh dhe montim.",
        features: [
          "Certifikuar AWS D1.1",
          "Futje pajisjesh PEM",
          "Nën-montim & grupim",
          "Koordinim përfundimi",
        ],
      },
    },
    // Capabilities Section
    capabilities: {
      title: "Kapacitetet Teknike",
      subtitle: "Specifikimet",
      materials: {
        title: "Materialet që Përpunojmë",
        items: [
          { name: "Çelik Karboni", spec: "10-22 gauge, deri në 1\" pllakë" },
          { name: "Çelik Inox", spec: "304, 316, 430 - deri në 0.5\"" },
          { name: "Alumin", spec: "5052, 6061 - deri në 0.375\"" },
          { name: "Lidhje Speciale", spec: "AR400/500, Hardox, Bakër" },
        ],
      },
      technical: {
        title: "Specifikimet Teknike",
        items: [
          { name: "Saktësia Pozicionale", spec: '±0.002" / 10"' },
          { name: "Përsëritshmëria", spec: '±0.0005"' },
          { name: "Madhësia Max e Fletës", spec: '60" × 120"' },
          { name: "Madhësia Min e Veçorisë", spec: "0.5× trashësia materialit" },
        ],
      },
    },
    // CTA Section
    cta: {
      title: "Gati të Filloni Projektin Tuaj?",
      description:
        "Nga prototipe të vetme deri në prodhim serik, ofrojmë përpunim preciz të metalit me kohë të shpejta dorëzimi.",
      button: "Merr Ofertën Sot",
      features: [
        "24-48 orë kohë përgjigjeje",
        "Mbështetje skedarësh DXF, DWG, STEP",
        "Prototip deri në programe Kanban",
      ],
    },
    // Products Page
    products: {
      title: "Puna Jonë",
      subtitle: "Portofoli",
      description:
        "Shfletoni galerinë tonë të projekteve të përpunimit preciz të metalit.",
      filterAll: "Të Gjitha Projektet",
      categories: {
        laserCutting: "Prerje Lazer",
        brakeForming: "Formim me Presa",
        tubePipe: "Tuba & Gypa",
        customFab: "Përpunim i Personalizuar",
        assemblies: "Montime",
      },
      viewDetails: "Shiko Detajet",
      close: "Mbyll",
      specs: {
        material: "Materiali",
        thickness: "Trashësia",
        tolerance: "Toleranca",
        finish: "Përfundimi",
        quantity: "Sasia",
      },
    },
    // Contact Page
    contact: {
      title: "Na Kontaktoni",
      subtitle: "Kontakti",
      description:
        "Gati të filloni projektin tuaj të ardhshëm? Kërkoni ofertë ose na kontaktoni për pyetje.",
      form: {
        title: "Kërko Ofertë",
        name: "Emri i Plotë",
        namePlaceholder: "Filan Fisteku",
        email: "Adresa Email",
        emailPlaceholder: "filan@kompania.com",
        company: "Kompania",
        companyPlaceholder: "Emri i Kompanisë Tuaj",
        phone: "Telefoni",
        phonePlaceholder: "+355 69 123 4567",
        service: "Shërbimi i Kërkuar",
        servicePlaceholder: "Zgjidhni shërbimin",
        serviceOptions: {
          laserCutting: "Prerje Lazer CNC",
          brakeForming: "Formim me Presa",
          tubeCutting: "Prerje Tubash & Gypash",
          customFab: "Përpunim i Personalizuar",
          assembly: "Shërbime Montimi",
          other: "Tjetër / Shërbime të Shumta",
        },
        material: "Materiali Primar",
        materialPlaceholder: "Zgjidhni materialin",
        materialOptions: {
          carbonSteel: "Çelik Karboni (A36, 1018, etj.)",
          stainlessSteel: "Çelik Inox (304, 316, etj.)",
          aluminum: "Alumin (5052, 6061, etj.)",
          arPlate: "Pllakë AR (AR400, AR500, Hardox)",
          copper: "Bakër / Bronz",
          other: "Tjetër / Materiale të Shumta",
        },
        quantity: "Sasia e Vlerësuar",
        quantityPlaceholder: "Zgjidhni rangun e sasise",
        quantityOptions: {
          prototype: "Prototip (1-5 copë)",
          small: "Seri e Vogël (6-50 copë)",
          medium: "Seri e Mesme (51-500 copë)",
          production: "Prodhim (500+ copë)",
          kanban: "Kanban / Porosi Bllok",
        },
        message: "Detajet e Projektit",
        messagePlaceholder:
          "Përshkruani projektin tuaj, përfshirë dimensionet, tolerancat, kërkesat e përfundimit, etj.",
        fileNote:
          "Mund të dërgoni skedarë CAD (DXF, DWG, STEP) në quotes@metaltronix.com pas dorëzimit të formularit.",
        submit: "Dërgo Kërkesën për Ofertë",
        submitting: "Duke dërguar...",
        success: "Kërkesa për ofertë u dërgua! Do t'ju kontaktojmë brenda 24-48 orëve.",
      },
      info: {
        title: "Informacione Kontakti",
        address: {
          label: "Adresa",
          value: "1234 Rruga Industriale\nZona Prodhuese\nQyteti, 12345",
        },
        phone: {
          label: "Telefoni",
          value: "+355 69 123 4567",
        },
        email: {
          label: "Email",
          value: "quotes@metaltronix.com",
        },
        hours: {
          label: "Orari",
          value: "E Hënë - E Premte: 07:00 - 17:00\nE Shtunë: Me takim",
        },
      },
      certifications: {
        title: "Certifikime & Standarde",
        items: [
          "ISO 9001:2015 Certifikuar",
          "AS9100D Hapësinor",
          "ITAR Regjistruar",
          "AWS D1.1 Saldim",
        ],
      },
    },
    // History Page
    history: {
      title: "Historia Jonë",
      subtitle: "Që nga 1987",
      description:
        "Për më shumë se tre dekada, Metal Tronix ka qenë në ballë të përpunimit preciz të metalit.",
      founderQuote:
        '"Filluam me një prestar plazme dhe një vizion. Sot, kemi gjashtë lazer fibër, dymbëdhjetë presa dhe mbi 150 punëtorë të aftë. Por misioni ynë mbetet i njëjtë: të ofrojmë precizitet që tejkalon pritshmeritë."',
      founderName: "James Mitchell",
      founderTitle: "Themelues & CEO",
      facility: {
        title: "Objekti Ynë",
        description:
          "Objekti ynë prodhues 50,000 sq ft strehon teknologjinë më të fundit në prerje lazer CNC dhe presa.",
      },
      values: {
        title: "Vlerat Tona",
        precision: {
          title: "Preciziteti i Parë",
          description:
            "Çdo prerje, çdo përkulje, çdo saldim plotëson ose tejkalon tolerancat e specifikuara.",
        },
        partnership: {
          title: "Partneriteti",
          description:
            "Nuk jemi thjesht furnitor - jemi zgjerim i ekipit tuaj inxhinierik.",
        },
        innovation: {
          title: "Inovacioni",
          description:
            "Investim i vazhdueshëm në teknologjinë më të fundit na mban në majën e përpunimit të metalit.",
        },
        integrity: {
          title: "Integriteti",
          description:
            "Komunikim i ndershëm, çmime të drejta dhe dorëzim i besueshëm.",
        },
      },
    },
    // Timeline
    timeline: {
      items: [
        {
          year: "1987",
          title: "Themelimi",
          description:
            "James Mitchell fillon Metal Tronix në një garazh 2,000 sq ft me një prestar plazme.",
        },
        {
          year: "1995",
          title: "Lazeri i Parë CNC",
          description:
            "Investim në sistemin e parë të prerjes lazer CO2. Zgjerim në objekt 8,000 sq ft.",
        },
        {
          year: "2003",
          title: "Certifikim ISO",
          description:
            "Arritëm certifikimin ISO 9001. Shtuam lazerin e dytë dhe tre presa CNC.",
        },
        {
          year: "2010",
          title: "Zgjerim Hapësinor",
          description:
            "Certifikimi AS9100 hap tregun hapësinor. Transferim në objektin aktual 30,000 sq ft.",
        },
        {
          year: "2018",
          title: "Teknologjia Lazer Fibër",
          description:
            "Kalim në lazer fibër me fuqi të lartë. Shtim kapacitete prerje tubash.",
        },
        {
          year: "2024",
          title: "Objekt 50,000 Sq Ft",
          description:
            "Përfundoi zgjerimi i madh. Gjashtë lazer fibër, dymbëdhjetë presa, 150+ punonjës.",
        },
      ],
    },
    // Footer
    footer: {
      description:
        "Shërbime përpunimi preciz të metalit përfshirë prerje lazer CNC, formim me presa dhe përpunim të personalizuar. Duke shërbyer prodhuesit që nga 1987.",
      services: "Shërbimet",
      company: "Kompania",
      contact: "Kontakti",
      aboutUs: "Rreth Nesh",
      careers: "Karriera",
      quality: "Cilësia",
      rights: "Të gjitha të drejtat e rezervuara.",
      privacy: "Politika e Privatësisë",
      terms: "Kushtet e Shërbimit",
    },
  },
  de: {
    // Navigation
    nav: {
      home: "Startseite",
      products: "Produkte",
      history: "Unsere Geschichte",
      contact: "Kontakt",
      getQuote: "Angebot Anfordern",
    },
    // Hero Section
    hero: {
      tagline: "Präzise Metallverarbeitung",
      title: "Ingenieursexzellenz in Jedem Schnitt",
      subtitle:
        "Vom Prototyp bis zur Produktion liefert Metal Tronix präzises Laserschneiden, Abkanten und kundenspezifische Metallverarbeitung mit Toleranzen, die Industriestandards übertreffen.",
      cta: "Angebot Anfordern",
      ctaSecondary: "Unsere Arbeit Ansehen",
      stats: {
        laserPower: "6kW Faserlaser-Leistung",
        tolerance: "±0,005\" Toleranzen",
        experience: "37+ Jahre Erfahrung",
      },
    },
    // Services Section
    services: {
      title: "Unsere Dienstleistungen",
      subtitle: "Fähigkeiten",
      description:
        "Umfassende Metallverarbeitungsdienstleistungen mit modernster Ausrüstung und jahrzehntelanger Erfahrung.",
      laserCutting: {
        title: "CNC-Laserschneiden",
        description:
          "Hochpräzises Faserlaserschneiden mit minimaler Schnittbreite. Verarbeitung von Stahl bis 25mm, Edelstahl bis 12mm.",
        features: [
          "6kW IPG Faserquelle",
          "0,1mm Schnittbreite",
          "N2/O2 Schneidgas-Optionen",
          "Kantenqualität Ra 3,2μm",
        ],
      },
      brakeFoming: {
        title: "Abkanten",
        description:
          "CNC-Abkantoperationen mit Anschlaggenauigkeit von ±0,01mm. Komplexe Teile mit mehrfachen Biegungen.",
        features: [
          "350 Tonnen Kapazität",
          "4,2m Bettlänge",
          "±0,5° Winkeltoleranz",
          "Luft- & Grundbiegen",
        ],
      },
      tubeCutting: {
        title: "Rohr- & Profilschneiden",
        description:
          "Rotationsachsen-Laserschneiden für runde, quadratische und rechteckige Rohre.",
        features: [
          "Bis zu 150mm Durchmesser",
          "Nahtlose & geschweißte Rohre",
          "Konturschnitte & Ausklinkungen",
          "Schweißnahtvorbereitung",
        ],
      },
      customFab: {
        title: "Kundenspezifische Fertigung",
        description:
          "Komplette Fertigungsdienstleistungen einschließlich Schweißen, Hardwareeinsatz und Montage.",
        features: [
          "AWS D1.1 zertifiziert",
          "PEM Hardware-Einsatz",
          "Unterbaugruppen & Kitting",
          "Oberflächenkoordination",
        ],
      },
    },
    // Capabilities Section
    capabilities: {
      title: "Technische Fähigkeiten",
      subtitle: "Spezifikationen",
      materials: {
        title: "Materialien die wir Verarbeiten",
        items: [
          { name: "Kohlenstoffstahl", spec: "0,5-3mm, bis zu 25mm Platte" },
          { name: "Edelstahl", spec: "304, 316, 430 - bis zu 12mm" },
          { name: "Aluminium", spec: "5052, 6061 - bis zu 10mm" },
          { name: "Speziallegierungen", spec: "AR400/500, Hardox, Kupfer" },
        ],
      },
      technical: {
        title: "Technische Daten",
        items: [
          { name: "Positionsgenauigkeit", spec: "±0,05mm / 250mm" },
          { name: "Wiederholgenauigkeit", spec: "±0,01mm" },
          { name: "Max. Blechgröße", spec: "1500mm × 3000mm" },
          { name: "Min. Merkmalsgröße", spec: "0,5× Materialdicke" },
        ],
      },
    },
    // CTA Section
    cta: {
      title: "Bereit Ihr Projekt zu Starten?",
      description:
        "Von Einzelprototypen bis zur Serienproduktion liefern wir präzise Metallverarbeitung mit schnellen Lieferzeiten.",
      button: "Holen Sie Sich Ihr Angebot",
      features: [
        "24-48 Stunden Angebotszeit",
        "DXF, DWG, STEP Dateiunterstützung",
        "Prototyp bis Kanban-Programme",
      ],
    },
    // Products Page
    products: {
      title: "Unsere Arbeit",
      subtitle: "Portfolio",
      description:
        "Durchstöbern Sie unsere Galerie präziser Metallverarbeitungsprojekte.",
      filterAll: "Alle Projekte",
      categories: {
        laserCutting: "Laserschneiden",
        brakeForming: "Abkanten",
        tubePipe: "Rohr & Profil",
        customFab: "Sonderfertigung",
        assemblies: "Baugruppen",
      },
      viewDetails: "Details Ansehen",
      close: "Schließen",
      specs: {
        material: "Material",
        thickness: "Dicke",
        tolerance: "Toleranz",
        finish: "Oberfläche",
        quantity: "Menge",
      },
    },
    // Contact Page
    contact: {
      title: "Kontaktieren Sie Uns",
      subtitle: "Kontakt",
      description:
        "Bereit für Ihr nächstes Projekt? Fordern Sie ein Angebot an oder kontaktieren Sie uns bei Fragen.",
      form: {
        title: "Angebot Anfordern",
        name: "Vollständiger Name",
        namePlaceholder: "Max Mustermann",
        email: "E-Mail-Adresse",
        emailPlaceholder: "max@firma.de",
        company: "Firma",
        companyPlaceholder: "Ihr Firmenname",
        phone: "Telefon",
        phonePlaceholder: "+49 123 456789",
        service: "Benötigte Dienstleistung",
        servicePlaceholder: "Wählen Sie eine Dienstleistung",
        serviceOptions: {
          laserCutting: "CNC-Laserschneiden",
          brakeForming: "Abkanten",
          tubeCutting: "Rohr- & Profilschneiden",
          customFab: "Kundenspezifische Fertigung",
          assembly: "Montageservices",
          other: "Andere / Mehrere Dienstleistungen",
        },
        material: "Primäres Material",
        materialPlaceholder: "Material auswählen",
        materialOptions: {
          carbonSteel: "Kohlenstoffstahl (S235, S355, etc.)",
          stainlessSteel: "Edelstahl (1.4301, 1.4404, etc.)",
          aluminum: "Aluminium (5052, 6061, etc.)",
          arPlate: "Verschleißplatte (AR400, Hardox)",
          copper: "Kupfer / Messing",
          other: "Andere / Mehrere Materialien",
        },
        quantity: "Geschätzte Menge",
        quantityPlaceholder: "Mengenbereich auswählen",
        quantityOptions: {
          prototype: "Prototyp (1-5 Stück)",
          small: "Kleinserie (6-50 Stück)",
          medium: "Mittelserie (51-500 Stück)",
          production: "Produktion (500+ Stück)",
          kanban: "Kanban / Rahmenauftrag",
        },
        message: "Projektdetails",
        messagePlaceholder:
          "Beschreiben Sie Ihr Projekt, einschließlich Abmessungen, Toleranzen, Oberflächenanforderungen, etc.",
        fileNote:
          "Sie können CAD-Dateien (DXF, DWG, STEP) an quotes@metaltronix.com senden.",
        submit: "Angebotsanfrage Absenden",
        submitting: "Wird gesendet...",
        success: "Angebotsanfrage gesendet! Wir melden uns innerhalb von 24-48 Stunden.",
      },
      info: {
        title: "Kontaktinformationen",
        address: {
          label: "Adresse",
          value: "Industriestraße 1234\nGewerbegebiet\nIhre Stadt, 12345",
        },
        phone: {
          label: "Telefon",
          value: "+49 123 456789",
        },
        email: {
          label: "E-Mail",
          value: "quotes@metaltronix.com",
        },
        hours: {
          label: "Öffnungszeiten",
          value: "Montag - Freitag: 07:00 - 17:00 Uhr\nSamstag: Nach Vereinbarung",
        },
      },
      certifications: {
        title: "Zertifizierungen & Standards",
        items: [
          "ISO 9001:2015 Zertifiziert",
          "AS9100D Luft- und Raumfahrt",
          "ITAR Registriert",
          "AWS D1.1 Schweißen",
        ],
      },
    },
    // History Page
    history: {
      title: "Unsere Geschichte",
      subtitle: "Seit 1987",
      description:
        "Seit über drei Jahrzehnten ist Metal Tronix an der Spitze der präzisen Metallverarbeitung.",
      founderQuote:
        '"Wir begannen mit einem einzigen Plasmaschneider und einer Vision. Heute betreiben wir sechs Faserlaser, zwölf Abkantpressen und beschäftigen über 150 qualifizierte Fachkräfte. Aber unsere Mission bleibt dieselbe: Präzision liefern, die Erwartungen übertrifft."',
      founderName: "James Mitchell",
      founderTitle: "Gründer & CEO",
      facility: {
        title: "Unsere Anlage",
        description:
          "Unsere 4.600 m² große Fertigungsanlage beherbergt die neueste CNC-Laserschneid- und Abkanttechnologie.",
      },
      values: {
        title: "Unsere Werte",
        precision: {
          title: "Präzision Zuerst",
          description:
            "Jeder Schnitt, jede Biegung, jede Schweißnaht erfüllt oder übertrifft die festgelegten Toleranzen.",
        },
        partnership: {
          title: "Partnerschaft",
          description:
            "Wir sind nicht nur ein Lieferant - wir sind eine Erweiterung Ihres Engineering-Teams.",
        },
        innovation: {
          title: "Innovation",
          description:
            "Kontinuierliche Investitionen in neueste Technologie halten uns an der Spitze der Metallverarbeitung.",
        },
        integrity: {
          title: "Integrität",
          description:
            "Ehrliche Kommunikation, faire Preise und zuverlässige Lieferung.",
        },
      },
    },
    // Timeline
    timeline: {
      items: [
        {
          year: "1987",
          title: "Gründung",
          description:
            "James Mitchell gründet Metal Tronix in einer 185 m² großen Garage mit einem Plasmaschneider.",
        },
        {
          year: "1995",
          title: "Erster CNC-Laser",
          description:
            "Investition in erstes CO2-Laserschneidsystem. Erweiterung auf 740 m² Anlage.",
        },
        {
          year: "2003",
          title: "ISO-Zertifizierung",
          description:
            "ISO 9001 Zertifizierung erreicht. Zweiter Laser und drei CNC-Abkantpressen hinzugefügt.",
        },
        {
          year: "2010",
          title: "Luft- und Raumfahrt-Erweiterung",
          description:
            "AS9100 Zertifizierung öffnet Luft- und Raumfahrtmarkt. Umzug in 2.800 m² Anlage.",
        },
        {
          year: "2018",
          title: "Faserlaser-Technologie",
          description:
            "Umstellung auf Hochleistungs-Faserlaser. Rohrschneidfähigkeiten hinzugefügt.",
        },
        {
          year: "2024",
          title: "4.600 m² Anlage",
          description:
            "Große Erweiterung abgeschlossen. Sechs Faserlaser, zwölf Abkantpressen, 150+ Mitarbeiter.",
        },
      ],
    },
    // Footer
    footer: {
      description:
        "Präzise Metallverarbeitungsdienstleistungen einschließlich CNC-Laserschneiden, Abkanten und Sonderfertigung. Seit 1987 für Hersteller tätig.",
      services: "Dienstleistungen",
      company: "Unternehmen",
      contact: "Kontakt",
      aboutUs: "Über Uns",
      careers: "Karriere",
      quality: "Qualität",
      rights: "Alle Rechte vorbehalten.",
      privacy: "Datenschutz",
      terms: "AGB",
    },
  },
} as const;

export type Translations = typeof translations.en;
