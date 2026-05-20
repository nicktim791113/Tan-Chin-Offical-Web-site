export type Lang = "zh" | "en";

export type Material = {
  slug: string;
  name: Record<Lang, string>;
  eyebrow: Record<Lang, string>;
  summary: Record<Lang, string>;
  traits: Record<Lang, string[]>;
  applications: Record<Lang, string[]>;
  image: string;
  products: string[];
};

export type Product = {
  id: string;
  material: string;
  name: Record<Lang, string>;
  image: string;
};

export type ApplicationCase = {
  id: string;
  industry: Record<Lang, string>;
  title: Record<Lang, string>;
  challenge: Record<Lang, string>;
  solution: Record<Lang, string>;
  evidence: Record<Lang, string[]>;
  image: string;
  materials: string[];
};

export type ServiceStep = {
  id: string;
  title: Record<Lang, string>;
  text: Record<Lang, string>;
};

export const nav = {
  zh: [
    ["about", "公司簡介", "/zh/about/"],
    ["process", "MIM製程", "/zh/mim-process/"],
    ["materials", "材料能力", "/zh/materials/"],
    ["applications", "應用案例", "/zh/applications/"],
    ["equipment", "製程能力", "/zh/equipment/"],
    ["quality", "品質控管", "/zh/quality/"],
    ["catalog", "電子型錄", "/zh/catalog/"],
    ["contact", "聯絡我們", "/zh/contact/"]
  ],
  en: [
    ["about", "About", "/en/about/"],
    ["process", "MIM Process", "/en/mim-process/"],
    ["materials", "Materials", "/en/materials/"],
    ["applications", "Applications", "/en/applications/"],
    ["equipment", "Equipment", "/en/equipment/"],
    ["quality", "Quality", "/en/quality/"],
    ["catalog", "Catalog", "/en/catalog/"],
    ["contact", "Contact", "/en/contact/"]
  ]
} as const;

export const copy = {
  zh: {
    langName: "繁體中文",
    switchLabel: "English",
    switchHref: "/en/",
    brand: "震欣科技",
    brandEn: "TANCHIN TECHNOLOGY",
    heroTitle: "為未來機械打造的金屬射出成型",
    heroKicker: "AI-Ready Metal Injection Molding",
    heroText:
      "震欣科技專注 MIM 金屬射出成型，協助客戶把複雜形狀、特殊材料與高精度需求轉化為可量產的精密金屬零件。",
    primaryCta: "開始詢問製造可行性",
    secondaryCta: "探索材料能力",
    statsTitle: "精密製造，不只成型",
    processTitle: "MIM 製程智慧",
    materialsTitle: "材料矩陣",
    galleryTitle: "客製樣品展示",
    qualityTitle: "品質不是最後檢查，是每一步的控制系統",
    contactTitle: "把你的圖面交給我們判斷可行性"
  },
  en: {
    langName: "English",
    switchLabel: "繁體中文",
    switchHref: "/zh/",
    brand: "TANCHIN",
    brandEn: "TANCHIN TECHNOLOGY",
    heroTitle: "Metal Injection Molding for Future Machines",
    heroKicker: "AI-Ready Metal Injection Molding",
    heroText:
      "TANCHIN turns complex geometry, advanced materials, and precision requirements into manufacturable MIM metal components.",
    primaryCta: "Start an Inquiry",
    secondaryCta: "Explore Materials",
    statsTitle: "Precision manufacturing beyond forming",
    processTitle: "MIM Process Intelligence",
    materialsTitle: "Material Matrix",
    galleryTitle: "Customized Sample Gallery",
    qualityTitle: "Quality is controlled throughout the process",
    contactTitle: "Send us your drawing or requirement"
  }
};

export const stats = [
  { value: "100g", zh: "MIM零件重量能力", en: "MIM part weight capability" },
  { value: "1000+", zh: "客製零件開發經驗", en: "custom parts developed" },
  { value: "ISO", zh: "9001:2015品質系統", en: "9001:2015 quality system" },
  { value: "X-RAY", zh: "3D電腦斷層檢測", en: "3D CT inspection capability" }
];

export const processSteps = [
  {
    zh: ["金屬粉末與結合劑", "混拌金屬粉末與結合劑，建立可射出的粒狀原料。"],
    en: ["Powder + Binder", "Metal powder and binder are compounded into moldable feedstock."]
  },
  {
    zh: ["射出成型", "使用客製模具成型複雜毛胚，保留幾何自由度。"],
    en: ["Injection Molding", "Custom tooling forms complex green parts with geometric freedom."]
  },
  {
    zh: ["脫脂與燒結", "去除結合劑後高溫燒結，使零件緻密化並取得金屬強度。"],
    en: ["Debinding + Sintering", "Binder is removed and parts are sintered into dense metal components."]
  },
  {
    zh: ["後加工與檢驗", "依需求整形、加工、熱處理、表面處理並完成品質確認。"],
    en: ["Finishing + Inspection", "Secondary processing and inspection complete the production loop."]
  }
];

export const products: Product[] = [
  { id: "nickel-01", material: "nickel-alloy-steel", name: { zh: "鎳合金鋼", en: "Nickel-Alloy Steel" }, image: "/assets/products/nickel-01.png" },
  { id: "nickel-02", material: "nickel-alloy-steel", name: { zh: "鎳合金鋼", en: "Nickel-Alloy Steel" }, image: "/assets/products/nickel-02.png" },
  { id: "chrome-mo-01", material: "chrome-mo-steel", name: { zh: "鉻鉬合金鋼 4140", en: "Chrome-Mo. Steel 4140" }, image: "/assets/products/chrome-mo-01.png" },
  { id: "chrome-mo-02", material: "chrome-mo-steel", name: { zh: "鉻鉬合金鋼 SCM435", en: "Chrome-Mo. Steel SCM435" }, image: "/assets/products/chrome-mo-02.png" },
  { id: "nickel-cr-mo-01", material: "nickel-cr-mo-steel", name: { zh: "鎳鉻鉬合金鋼 8620", en: "Nickel-Cr.-Mo. Steel 8620" }, image: "/assets/products/nickel-cr-mo-01.png" },
  { id: "nickel-cr-mo-02", material: "nickel-cr-mo-steel", name: { zh: "鎳鉻鉬合金鋼 8640", en: "Nickel-Cr.-Mo. Steel 8640" }, image: "/assets/products/nickel-cr-mo-02.png" },
  { id: "stainless-174ph-01", material: "stainless-steel", name: { zh: "不鏽鋼 17-4PH", en: "Stainless Steel 17-4PH" }, image: "/assets/products/stainless-174ph-01.png" },
  { id: "stainless-316l-01", material: "stainless-steel", name: { zh: "不鏽鋼 316L", en: "Stainless Steel 316L" }, image: "/assets/products/stainless-316l-01.png" },
  { id: "high-speed-01", material: "high-speed-steel", name: { zh: "高速鋼", en: "High-Speed Steel" }, image: "/assets/products/high-speed-01.png" },
  { id: "other-01", material: "other-materials", name: { zh: "其他材質", en: "Other Materials" }, image: "/assets/products/other-material-01.png" }
];

export const materials: Material[] = [
  {
    slug: "nickel-alloy-steel",
    name: { zh: "鎳合金鋼", en: "Nickel-Alloy Steel" },
    eyebrow: { zh: "韌性 / 耐磨 / 耐蝕", en: "Toughness / Wear / Corrosion" },
    summary: {
      zh: "適合需要韌性、耐磨耗及穩定機械性質的精密結構零件。",
      en: "For precision structural components requiring toughness, wear resistance, and stable mechanical performance."
    },
    traits: { zh: ["韌性佳", "耐磨耗", "適合複雜結構"], en: ["Good toughness", "Wear resistant", "Complex geometry ready"] },
    applications: { zh: ["機械零件", "工具零件", "客製結構件"], en: ["Machinery parts", "Tool components", "Custom structures"] },
    image: "/assets/products/nickel-01.png",
    products: ["nickel-01", "nickel-02"]
  },
  {
    slug: "chrome-mo-steel",
    name: { zh: "鉻鉬合金鋼", en: "Chrome-Mo. Steel" },
    eyebrow: { zh: "強度 / 熱處理 / 工業用途", en: "Strength / Heat Treatment / Industrial" },
    summary: {
      zh: "常用於需要強度、硬度與加工穩定度的客製金屬零件。",
      en: "A practical family for custom parts requiring strength, hardness, and stable processing."
    },
    traits: { zh: ["強度穩定", "可熱處理", "工業應用廣"], en: ["Stable strength", "Heat-treatable", "Broad industrial use"] },
    applications: { zh: ["傳動件", "機械五金", "結構零件"], en: ["Transmission parts", "Hardware", "Structural parts"] },
    image: "/assets/products/chrome-mo-01.png",
    products: ["chrome-mo-01", "chrome-mo-02"]
  },
  {
    slug: "nickel-cr-mo-steel",
    name: { zh: "鎳鉻鉬合金鋼", en: "Nickel-Cr.-Mo. Steel" },
    eyebrow: { zh: "強韌 / 精密 / 耐用", en: "Tough / Precise / Durable" },
    summary: {
      zh: "兼具鎳、鉻、鉬元素優勢，適合對強韌性與耐用度有要求的零件。",
      en: "Combines Ni, Cr, and Mo advantages for durable components with demanding mechanical requirements."
    },
    traits: { zh: ["綜合強韌性", "耐用性佳", "適合高要求件"], en: ["Balanced toughness", "Durable", "Demanding parts"] },
    applications: { zh: ["機械結構", "精密金屬件", "耐用零件"], en: ["Mechanical structures", "Precision metal parts", "Durable components"] },
    image: "/assets/products/nickel-cr-mo-01.png",
    products: ["nickel-cr-mo-01", "nickel-cr-mo-02"]
  },
  {
    slug: "stainless-steel",
    name: { zh: "不鏽鋼", en: "Stainless Steel" },
    eyebrow: { zh: "17-4PH / 316L / 耐蝕", en: "17-4PH / 316L / Corrosion Resistance" },
    summary: {
      zh: "包含析出硬化型與耐酸耐鹼不鏽鋼，適合高質感、耐蝕與精密需求。",
      en: "Includes precipitation-hardening and corrosion-resistant stainless grades for refined precision parts."
    },
    traits: { zh: ["耐蝕", "表面質感佳", "可用於特殊環境"], en: ["Corrosion resistant", "Fine surface quality", "Special environment use"] },
    applications: { zh: ["醫療零件", "精密結構", "外觀件"], en: ["Medical parts", "Precision structures", "Visible components"] },
    image: "/assets/products/stainless-174ph-01.png",
    products: ["stainless-174ph-01", "stainless-316l-01"]
  },
  {
    slug: "high-speed-steel",
    name: { zh: "高速鋼", en: "High-Speed Steel" },
    eyebrow: { zh: "硬度 / 耐磨 / 工具用途", en: "Hardness / Wear / Tooling" },
    summary: {
      zh: "適合需要硬度與耐磨耗特性的特殊零件與工具類應用。",
      en: "For specialty components and tool applications that demand hardness and wear resistance."
    },
    traits: { zh: ["硬度高", "耐磨耗", "特殊用途"], en: ["High hardness", "Wear resistant", "Specialty use"] },
    applications: { zh: ["工具件", "耐磨零件", "特殊客製件"], en: ["Tool parts", "Wear parts", "Special custom parts"] },
    image: "/assets/products/high-speed-01.png",
    products: ["high-speed-01"]
  },
  {
    slug: "other-materials",
    name: { zh: "其他材質", en: "Other Materials" },
    eyebrow: { zh: "依需求評估", en: "Requirement-Based Evaluation" },
    summary: {
      zh: "依照客戶產品條件、材料需求與量產目標，評估可行的 MIM 材料選項。",
      en: "MIM material options can be evaluated based on product requirements and production goals."
    },
    traits: { zh: ["客製評估", "材料彈性", "共同開發"], en: ["Custom evaluation", "Material flexibility", "Co-development"] },
    applications: { zh: ["新產品開發", "特殊需求", "替代製程"], en: ["New product development", "Special requirements", "Process alternatives"] },
    image: "/assets/products/other-material-01.png",
    products: ["other-01"]
  }
];

export const applicationCases: ApplicationCase[] = [
  {
    id: "compact-mechanism",
    industry: { zh: "精密機械 / 傳動結構", en: "Precision machinery / transmission" },
    title: { zh: "把多段加工零件整合為可量產 MIM 結構件", en: "Consolidating machined parts into manufacturable MIM structures" },
    challenge: {
      zh: "零件幾何複雜、孔位與薄壁集中，傳統加工成本高且尺寸一致性不易控制。",
      en: "Complex geometry, concentrated holes, and thin walls made traditional machining costly and difficult to stabilize."
    },
    solution: {
      zh: "前期以圖面評估成型方向、收縮補償與後加工基準，導入鉻鉬合金鋼或鎳鉻鉬合金鋼進行強度與耐用度平衡。",
      en: "The design is reviewed for molding direction, shrinkage compensation, and secondary machining references, with chrome-moly or nickel-chrome-moly steel selected for strength and durability."
    },
    evidence: {
      zh: ["幾何整合", "熱處理條件評估", "尺寸檢測與批量穩定性確認"],
      en: ["Geometry consolidation", "Heat-treatment evaluation", "Dimensional and batch stability checks"]
    },
    image: "/assets/products/chrome-mo-01.png",
    materials: ["chrome-mo-steel", "nickel-cr-mo-steel"]
  },
  {
    id: "corrosion-resistant-part",
    industry: { zh: "醫療 / 儀器 / 外觀結構", en: "Medical / instruments / visible structures" },
    title: { zh: "耐蝕與外觀需求兼具的不鏽鋼精密零件", en: "Stainless precision parts balancing corrosion resistance and appearance" },
    challenge: {
      zh: "客戶需要小型精密零件，同時兼顧耐蝕、表面質感與穩定量產。",
      en: "The part required corrosion resistance, refined appearance, and repeatable production in a compact geometry."
    },
    solution: {
      zh: "依使用環境評估 316L 或 17-4PH，並把成型、燒結、後加工與表面處理條件納入同一套製程規劃。",
      en: "316L or 17-4PH is evaluated by environment, with molding, sintering, finishing, and surface treatment planned as one process path."
    },
    evidence: {
      zh: ["材料等級建議", "表面需求協調", "ISO 品質流程控管"],
      en: ["Material grade recommendation", "Surface requirement alignment", "ISO quality process control"]
    },
    image: "/assets/products/stainless-316l-01.png",
    materials: ["stainless-steel"]
  },
  {
    id: "wear-resistant-tooling",
    industry: { zh: "工具 / 耐磨零件 / 特殊機構", en: "Tooling / wear parts / special mechanisms" },
    title: { zh: "高硬度與耐磨需求的特殊材質開發", en: "Special material development for hardness and wear resistance" },
    challenge: {
      zh: "使用環境需要高硬度、耐磨耗，且形狀不適合以單純切削方式大量製造。",
      en: "The application needed high hardness and wear resistance while the geometry was not ideal for mass machining."
    },
    solution: {
      zh: "透過高速鋼或其他特殊材質評估，先確認材料可行性，再規劃模具、燒結與必要後加工。",
      en: "High-speed steel or other special materials are evaluated first, then tooling, sintering, and required finishing are planned."
    },
    evidence: {
      zh: ["特殊材質評估", "耐磨用途開發", "共同開發與試作"],
      en: ["Special material evaluation", "Wear-use development", "Co-development and prototyping"]
    },
    image: "/assets/products/high-speed-01.png",
    materials: ["high-speed-steel", "other-materials"]
  }
];

export const serviceSteps: ServiceStep[] = [
  {
    id: "drawing-review",
    title: { zh: "圖面與用途判斷", en: "Drawing and application review" },
    text: {
      zh: "先確認零件尺寸、功能面、受力位置、外觀面與預估數量，判斷是否適合 MIM。",
      en: "We review dimensions, functional surfaces, load points, appearance requirements, and estimated volume to judge MIM suitability."
    }
  },
  {
    id: "material-process",
    title: { zh: "材料與製程路線", en: "Material and process route" },
    text: {
      zh: "依強度、耐蝕、硬度、表面與成本目標，建議材料、模具策略、燒結與後加工方式。",
      en: "Material, tooling, sintering, and finishing routes are suggested based on strength, corrosion, hardness, surface, and cost goals."
    }
  },
  {
    id: "prototype-qa",
    title: { zh: "試作、檢測與修正", en: "Prototype, inspection, and tuning" },
    text: {
      zh: "用樣件與檢測資料修正尺寸、收縮、加工基準與品質控制條件。",
      en: "Samples and inspection data are used to tune dimensions, shrinkage, machining references, and quality controls."
    }
  },
  {
    id: "production-transfer",
    title: { zh: "量產移轉", en: "Production transfer" },
    text: {
      zh: "建立可追蹤的製程條件與檢驗重點，讓客製零件從開發進入穩定量產。",
      en: "Traceable process conditions and inspection points are set so custom parts can move from development into stable production."
    }
  }
];

export const buyerSignals = [
  {
    zh: ["適合詢問震欣的情況", "零件小而複雜、傳統加工成本高、需要耐磨/耐蝕/高強度、預計量產或長期供應。"],
    en: ["When to ask TANCHIN", "Small complex parts, high machining cost, wear/corrosion/strength needs, and expected production demand."]
  },
  {
    zh: ["初次詢問請提供", "2D/3D 圖面、材料或使用環境、關鍵尺寸、表面要求、預估數量與目前製程痛點。"],
    en: ["Useful inquiry inputs", "2D/3D drawings, material or environment, critical dimensions, surface requirements, estimated volume, and current process pain points."]
  },
  {
    zh: ["我們會協助判斷", "MIM 可行性、材料選項、模具方向、後加工需求、品質檢查重點與量產風險。"],
    en: ["What we help evaluate", "MIM feasibility, material options, tooling direction, finishing needs, inspection points, and production risks."]
  }
];

export const equipment = [
  {
    image: "/assets/equipment/injection-machine.jpg",
    zh: ["射出成型設備", "使用穩定射出設備與客製模具，形成複雜幾何毛胚。"],
    en: ["Injection Molding Equipment", "Stable injection equipment and custom tooling form complex green parts."]
  },
  {
    image: "/assets/equipment/sintering-furnace.jpg",
    zh: ["真空燒結爐", "透過燒結條件控制，使零件緻密化並取得金屬強度。"],
    en: ["Vacuum Sintering Furnace", "Sintering control densifies parts and delivers metal strength."]
  }
];

export const timeline = [
  ["1980", "成立並投入精密零件製造", "Founded for precision component manufacturing"],
  ["1996", "引進並專研 MIM 金屬射出成型技術", "Introduced and researched MIM technology"],
  ["2015", "已開發超過 1000 項客製化零件", "Developed over 1000 custom components"],
  ["2017", "通過 ISO 9001:2015 品質管理系統", "Certified to ISO 9001:2015"],
  ["2023", "增設金屬 X-RAY 3D 電腦斷層設備", "Added metal X-ray 3D CT capability"]
];

export function t(lang: Lang, zh: string, en: string) {
  return lang === "zh" ? zh : en;
}

export function getMaterial(slug: string) {
  return materials.find((material) => material.slug === slug);
}

export function materialProducts(slug: string) {
  return products.filter((product) => product.material === slug);
}
