export type Lang = "zh" | "en" | "ja";

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
  ],
  ja: [
    ["about", "会社概要", "/ja/about/"],
    ["process", "MIM工程", "/ja/mim-process/"],
    ["materials", "材料対応", "/ja/materials/"],
    ["applications", "適用事例", "/ja/applications/"],
    ["equipment", "製造能力", "/ja/equipment/"],
    ["quality", "品質管理", "/ja/quality/"],
    ["catalog", "電子カタログ", "/ja/catalog/"],
    ["contact", "お問い合わせ", "/ja/contact/"]
  ]
} as const;

export const languages = [
  { lang: "zh", label: "中文", href: "/zh/" },
  { lang: "en", label: "English", href: "/en/" },
  { lang: "ja", label: "日本語", href: "/ja/" }
] as const;

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
  },
  ja: {
    langName: "日本語",
    switchLabel: "繁體中文",
    switchHref: "/zh/",
    brand: "震欣科技",
    brandEn: "TANCHIN TECHNOLOGY",
    heroTitle: "次世代機械のための金属射出成形",
    heroKicker: "AI-Ready Metal Injection Molding",
    heroText:
      "TANCHINはMIM金属射出成形により、複雑形状、特殊材料、高精度要求を量産可能な精密金属部品へつなげます。",
    primaryCta: "製造可否を相談する",
    secondaryCta: "材料対応を見る",
    statsTitle: "成形だけで終わらない精密製造",
    processTitle: "MIM工程の知見",
    materialsTitle: "材料マトリクス",
    galleryTitle: "カスタムサンプルギャラリー",
    qualityTitle: "品質は最終検査ではなく、各工程の管理です",
    contactTitle: "図面や要件をお送りください"
  }
};

export const ui = {
  zh: {
    allMaterialsLink: "查看全部材料",
    askSimilarParts: "詢問類似零件",
    applicationEyebrow: "Application Intelligence",
    applicationTitle: "從產品問題出發的客製 MIM 解法",
    applicationText:
      "國際採購與工程端最在意的不是製程名稱，而是零件能不能穩定、可量產、可檢驗。這一層把震欣的材料、模具、燒結與品質能力轉成更清楚的應用情境。",
    applicationCompactLink: "查看應用與客製流程",
    challengeLabel: "客戶痛點",
    approachLabel: "震欣解法",
    serviceEyebrow: "Custom Service Flow",
    serviceTitle: "從圖面到量產的合作節奏",
    serviceText: "客製零件不是只報價，而是需要先把材料、模具、尺寸收縮、後加工與品質檢查串成一條可靠路線。",
    contactPanelEyebrow: "Project Start",
    contactPanelText: "提供零件圖面、材質、數量或使用環境，我們可以協助判斷 MIM 製程可行性。",
    nameCompanyLabel: "姓名 / 公司",
    materialLabel: "材料",
    notSureYet: "尚未確定",
    requirementLabel: "需求說明",
    prepareInquiry: "送出詢問草稿",
    footerLine: "精密金屬射出成型與客製化金屬零件製造。",
    footerContact: "聯絡資訊",
    materialTraits: "材料特性",
    applications: "應用範圍",
    samples: "Samples",
    askMaterial: "詢問此材料"
  },
  en: {
    allMaterialsLink: "View all materials",
    askSimilarParts: "Ask about similar parts",
    applicationEyebrow: "Application Intelligence",
    applicationTitle: "Custom MIM solutions from product challenges",
    applicationText:
      "Engineering and sourcing teams care less about process names and more about stability, manufacturability, and inspectability. This layer translates TANCHIN's material, tooling, sintering, and quality capabilities into application scenarios.",
    applicationCompactLink: "View applications and service flow",
    challengeLabel: "Challenge",
    approachLabel: "TANCHIN approach",
    serviceEyebrow: "Custom Service Flow",
    serviceTitle: "From drawing review to production transfer",
    serviceText: "Custom components need more than a quotation; material, tooling, shrinkage, finishing, and inspection must be connected into a reliable route.",
    contactPanelEyebrow: "Project Start",
    contactPanelText: "Send your drawing, material, quantity, or application context. We can help evaluate MIM feasibility.",
    nameCompanyLabel: "Name / Company",
    materialLabel: "Material",
    notSureYet: "Not sure yet",
    requirementLabel: "Requirement",
    prepareInquiry: "Prepare Inquiry",
    footerLine: "Precision MIM manufacturing and customized metal components.",
    footerContact: "Contact",
    materialTraits: "Material Traits",
    applications: "Applications",
    samples: "Samples",
    askMaterial: "Ask about this material"
  },
  ja: {
    allMaterialsLink: "すべての材料を見る",
    askSimilarParts: "類似部品を相談する",
    applicationEyebrow: "Application Intelligence",
    applicationTitle: "製品課題から考えるカスタムMIM提案",
    applicationText:
      "調達・設計部門が重視するのは工程名ではなく、安定性、量産性、検査性です。TANCHINの材料、金型、焼結、品質能力を具体的な用途へ落とし込みます。",
    applicationCompactLink: "適用事例とサービスを見る",
    challengeLabel: "課題",
    approachLabel: "TANCHINの提案",
    serviceEyebrow: "Custom Service Flow",
    serviceTitle: "図面確認から量産移行まで",
    serviceText: "カスタム部品は見積だけではなく、材料、金型、収縮、後加工、検査を一つの確実なルートとして組み立てる必要があります。",
    contactPanelEyebrow: "Project Start",
    contactPanelText: "図面、材料、数量、使用環境をお送りください。MIM工程の可否評価をサポートします。",
    nameCompanyLabel: "氏名 / 会社名",
    materialLabel: "材料",
    notSureYet: "未定",
    requirementLabel: "ご要望",
    prepareInquiry: "相談内容を準備する",
    footerLine: "精密MIM製造とカスタム金属部品。",
    footerContact: "お問い合わせ",
    materialTraits: "材料特性",
    applications: "用途",
    samples: "サンプル",
    askMaterial: "この材料について相談する"
  }
} as const;

export const stats = [
  { value: "100g", zh: "MIM零件重量能力", en: "MIM part weight capability", ja: "MIM部品重量対応" },
  { value: "1000+", zh: "客製零件開發經驗", en: "custom parts developed", ja: "カスタム部品開発実績" },
  { value: "ISO", zh: "9001:2015品質系統", en: "9001:2015 quality system", ja: "9001:2015品質システム" },
  { value: "X-RAY", zh: "3D電腦斷層檢測", en: "3D CT inspection capability", ja: "3D CT検査対応" }
];

export const processSteps = [
  {
    zh: ["金屬粉末與結合劑", "混拌金屬粉末與結合劑，建立可射出的粒狀原料。"],
    en: ["Powder + Binder", "Metal powder and binder are compounded into moldable feedstock."],
    ja: ["金属粉末とバインダー", "金属粉末とバインダーを混練し、射出可能なフィードストックを作ります。"]
  },
  {
    zh: ["射出成型", "使用客製模具成型複雜毛胚，保留幾何自由度。"],
    en: ["Injection Molding", "Custom tooling forms complex green parts with geometric freedom."],
    ja: ["射出成形", "専用金型で複雑なグリーンパーツを成形し、形状自由度を確保します。"]
  },
  {
    zh: ["脫脂與燒結", "去除結合劑後高溫燒結，使零件緻密化並取得金屬強度。"],
    en: ["Debinding + Sintering", "Binder is removed and parts are sintered into dense metal components."],
    ja: ["脱脂と焼結", "バインダーを除去した後に焼結し、緻密な金属部品へ仕上げます。"]
  },
  {
    zh: ["後加工與檢驗", "依需求整形、加工、熱處理、表面處理並完成品質確認。"],
    en: ["Finishing + Inspection", "Secondary processing and inspection complete the production loop."],
    ja: ["後加工と検査", "必要に応じて加工、熱処理、表面処理、検査を行い品質を確認します。"]
  }
];

export const products: Product[] = [
  { id: "nickel-01", material: "nickel-alloy-steel", name: { zh: "鎳合金鋼", en: "Nickel-Alloy Steel", ja: "ニッケル合金鋼" }, image: "/assets/products/nickel-01.png" },
  { id: "nickel-02", material: "nickel-alloy-steel", name: { zh: "鎳合金鋼", en: "Nickel-Alloy Steel", ja: "ニッケル合金鋼" }, image: "/assets/products/nickel-02.png" },
  { id: "chrome-mo-01", material: "chrome-mo-steel", name: { zh: "鉻鉬合金鋼 4140", en: "Chrome-Mo. Steel 4140", ja: "クロムモリブデン鋼 4140" }, image: "/assets/products/chrome-mo-01.png" },
  { id: "chrome-mo-02", material: "chrome-mo-steel", name: { zh: "鉻鉬合金鋼 SCM435", en: "Chrome-Mo. Steel SCM435", ja: "クロムモリブデン鋼 SCM435" }, image: "/assets/products/chrome-mo-02.png" },
  { id: "nickel-cr-mo-01", material: "nickel-cr-mo-steel", name: { zh: "鎳鉻鉬合金鋼 8620", en: "Nickel-Cr.-Mo. Steel 8620", ja: "ニッケルクロムモリブデン鋼 8620" }, image: "/assets/products/nickel-cr-mo-01.png" },
  { id: "nickel-cr-mo-02", material: "nickel-cr-mo-steel", name: { zh: "鎳鉻鉬合金鋼 8640", en: "Nickel-Cr.-Mo. Steel 8640", ja: "ニッケルクロムモリブデン鋼 8640" }, image: "/assets/products/nickel-cr-mo-02.png" },
  { id: "stainless-174ph-01", material: "stainless-steel", name: { zh: "不鏽鋼 17-4PH", en: "Stainless Steel 17-4PH", ja: "ステンレス鋼 17-4PH" }, image: "/assets/products/stainless-174ph-01.png" },
  { id: "stainless-316l-01", material: "stainless-steel", name: { zh: "不鏽鋼 316L", en: "Stainless Steel 316L", ja: "ステンレス鋼 316L" }, image: "/assets/products/stainless-316l-01.png" },
  { id: "high-speed-01", material: "high-speed-steel", name: { zh: "高速鋼", en: "High-Speed Steel", ja: "高速度鋼" }, image: "/assets/products/high-speed-01.png" },
  { id: "other-01", material: "other-materials", name: { zh: "其他材質", en: "Other Materials", ja: "その他材料" }, image: "/assets/products/other-material-01.png" }
];

export const materials: Material[] = [
  {
    slug: "nickel-alloy-steel",
    name: { zh: "鎳合金鋼", en: "Nickel-Alloy Steel", ja: "ニッケル合金鋼" },
    eyebrow: { zh: "韌性 / 耐磨 / 耐蝕", en: "Toughness / Wear / Corrosion", ja: "靭性 / 耐摩耗 / 耐食" },
    summary: {
      zh: "適合需要韌性、耐磨耗及穩定機械性質的精密結構零件。",
      en: "For precision structural components requiring toughness, wear resistance, and stable mechanical performance.",
      ja: "靭性、耐摩耗性、安定した機械特性が求められる精密構造部品に適しています。"
    },
    traits: { zh: ["韌性佳", "耐磨耗", "適合複雜結構"], en: ["Good toughness", "Wear resistant", "Complex geometry ready"], ja: ["靭性に優れる", "耐摩耗性", "複雑構造に対応"] },
    applications: { zh: ["機械零件", "工具零件", "客製結構件"], en: ["Machinery parts", "Tool components", "Custom structures"], ja: ["機械部品", "工具部品", "カスタム構造部品"] },
    image: "/assets/products/nickel-01.png",
    products: ["nickel-01", "nickel-02"]
  },
  {
    slug: "chrome-mo-steel",
    name: { zh: "鉻鉬合金鋼", en: "Chrome-Mo. Steel", ja: "クロムモリブデン鋼" },
    eyebrow: { zh: "強度 / 熱處理 / 工業用途", en: "Strength / Heat Treatment / Industrial", ja: "強度 / 熱処理 / 工業用途" },
    summary: {
      zh: "常用於需要強度、硬度與加工穩定度的客製金屬零件。",
      en: "A practical family for custom parts requiring strength, hardness, and stable processing.",
      ja: "強度、硬度、安定した加工性が必要なカスタム金属部品に適した材料群です。"
    },
    traits: { zh: ["強度穩定", "可熱處理", "工業應用廣"], en: ["Stable strength", "Heat-treatable", "Broad industrial use"], ja: ["安定した強度", "熱処理対応", "幅広い工業用途"] },
    applications: { zh: ["傳動件", "機械五金", "結構零件"], en: ["Transmission parts", "Hardware", "Structural parts"], ja: ["伝動部品", "機械金物", "構造部品"] },
    image: "/assets/products/chrome-mo-01.png",
    products: ["chrome-mo-01", "chrome-mo-02"]
  },
  {
    slug: "nickel-cr-mo-steel",
    name: { zh: "鎳鉻鉬合金鋼", en: "Nickel-Cr.-Mo. Steel", ja: "ニッケルクロムモリブデン鋼" },
    eyebrow: { zh: "強韌 / 精密 / 耐用", en: "Tough / Precise / Durable", ja: "強靭 / 精密 / 高耐久" },
    summary: {
      zh: "兼具鎳、鉻、鉬元素優勢，適合對強韌性與耐用度有要求的零件。",
      en: "Combines Ni, Cr, and Mo advantages for durable components with demanding mechanical requirements.",
      ja: "Ni、Cr、Moの特性を活かし、強靭性と耐久性が求められる部品に適しています。"
    },
    traits: { zh: ["綜合強韌性", "耐用性佳", "適合高要求件"], en: ["Balanced toughness", "Durable", "Demanding parts"], ja: ["バランスの良い靭性", "耐久性に優れる", "高要求部品に対応"] },
    applications: { zh: ["機械結構", "精密金屬件", "耐用零件"], en: ["Mechanical structures", "Precision metal parts", "Durable components"], ja: ["機械構造", "精密金属部品", "耐久部品"] },
    image: "/assets/products/nickel-cr-mo-01.png",
    products: ["nickel-cr-mo-01", "nickel-cr-mo-02"]
  },
  {
    slug: "stainless-steel",
    name: { zh: "不鏽鋼", en: "Stainless Steel", ja: "ステンレス鋼" },
    eyebrow: { zh: "17-4PH / 316L / 耐蝕", en: "17-4PH / 316L / Corrosion Resistance", ja: "17-4PH / 316L / 耐食性" },
    summary: {
      zh: "包含析出硬化型與耐酸耐鹼不鏽鋼，適合高質感、耐蝕與精密需求。",
      en: "Includes precipitation-hardening and corrosion-resistant stainless grades for refined precision parts.",
      ja: "析出硬化系や耐食性ステンレス鋼に対応し、外観品質や精密性が求められる部品に適しています。"
    },
    traits: { zh: ["耐蝕", "表面質感佳", "可用於特殊環境"], en: ["Corrosion resistant", "Fine surface quality", "Special environment use"], ja: ["耐食性", "良好な表面品質", "特殊環境に対応"] },
    applications: { zh: ["醫療零件", "精密結構", "外觀件"], en: ["Medical parts", "Precision structures", "Visible components"], ja: ["医療部品", "精密構造", "外観部品"] },
    image: "/assets/products/stainless-174ph-01.png",
    products: ["stainless-174ph-01", "stainless-316l-01"]
  },
  {
    slug: "high-speed-steel",
    name: { zh: "高速鋼", en: "High-Speed Steel", ja: "高速度鋼" },
    eyebrow: { zh: "硬度 / 耐磨 / 工具用途", en: "Hardness / Wear / Tooling", ja: "硬度 / 耐摩耗 / 工具用途" },
    summary: {
      zh: "適合需要硬度與耐磨耗特性的特殊零件與工具類應用。",
      en: "For specialty components and tool applications that demand hardness and wear resistance.",
      ja: "硬度と耐摩耗性が求められる特殊部品や工具用途に適しています。"
    },
    traits: { zh: ["硬度高", "耐磨耗", "特殊用途"], en: ["High hardness", "Wear resistant", "Specialty use"], ja: ["高硬度", "耐摩耗性", "特殊用途"] },
    applications: { zh: ["工具件", "耐磨零件", "特殊客製件"], en: ["Tool parts", "Wear parts", "Special custom parts"], ja: ["工具部品", "耐摩耗部品", "特殊カスタム部品"] },
    image: "/assets/products/high-speed-01.png",
    products: ["high-speed-01"]
  },
  {
    slug: "other-materials",
    name: { zh: "其他材質", en: "Other Materials", ja: "その他材料" },
    eyebrow: { zh: "依需求評估", en: "Requirement-Based Evaluation", ja: "要件に応じた評価" },
    summary: {
      zh: "依照客戶產品條件、材料需求與量產目標，評估可行的 MIM 材料選項。",
      en: "MIM material options can be evaluated based on product requirements and production goals.",
      ja: "製品条件、材料要件、量産目標に合わせてMIM材料の選択肢を評価します。"
    },
    traits: { zh: ["客製評估", "材料彈性", "共同開發"], en: ["Custom evaluation", "Material flexibility", "Co-development"], ja: ["カスタム評価", "材料の柔軟性", "共同開発"] },
    applications: { zh: ["新產品開發", "特殊需求", "替代製程"], en: ["New product development", "Special requirements", "Process alternatives"], ja: ["新製品開発", "特殊要件", "代替工程"] },
    image: "/assets/products/other-material-01.png",
    products: ["other-01"]
  }
];

export const applicationCases: ApplicationCase[] = [
  {
    id: "compact-mechanism",
    industry: { zh: "精密機械 / 傳動結構", en: "Precision machinery / transmission", ja: "精密機械 / 伝動構造" },
    title: { zh: "把多段加工零件整合為可量產 MIM 結構件", en: "Consolidating machined parts into manufacturable MIM structures", ja: "複数工程の切削部品を量産可能なMIM構造部品へ統合" },
    challenge: {
      zh: "零件幾何複雜、孔位與薄壁集中，傳統加工成本高且尺寸一致性不易控制。",
      en: "Complex geometry, concentrated holes, and thin walls made traditional machining costly and difficult to stabilize.",
      ja: "複雑形状、集中した穴位置、薄肉部により、従来加工ではコストと寸法安定性が課題でした。"
    },
    solution: {
      zh: "前期以圖面評估成型方向、收縮補償與後加工基準，導入鉻鉬合金鋼或鎳鉻鉬合金鋼進行強度與耐用度平衡。",
      en: "The design is reviewed for molding direction, shrinkage compensation, and secondary machining references, with chrome-moly or nickel-chrome-moly steel selected for strength and durability.",
      ja: "図面段階で成形方向、収縮補正、後加工基準を確認し、クロムモリブデン鋼またはニッケルクロムモリブデン鋼で強度と耐久性を両立します。"
    },
    evidence: {
      zh: ["幾何整合", "熱處理條件評估", "尺寸檢測與批量穩定性確認"],
      en: ["Geometry consolidation", "Heat-treatment evaluation", "Dimensional and batch stability checks"],
      ja: ["形状統合", "熱処理条件の評価", "寸法検査とロット安定性の確認"]
    },
    image: "/assets/products/chrome-mo-01.png",
    materials: ["chrome-mo-steel", "nickel-cr-mo-steel"]
  },
  {
    id: "corrosion-resistant-part",
    industry: { zh: "醫療 / 儀器 / 外觀結構", en: "Medical / instruments / visible structures", ja: "医療 / 計測器 / 外観構造" },
    title: { zh: "耐蝕與外觀需求兼具的不鏽鋼精密零件", en: "Stainless precision parts balancing corrosion resistance and appearance", ja: "耐食性と外観品質を両立するステンレス精密部品" },
    challenge: {
      zh: "客戶需要小型精密零件，同時兼顧耐蝕、表面質感與穩定量產。",
      en: "The part required corrosion resistance, refined appearance, and repeatable production in a compact geometry.",
      ja: "小型精密部品に耐食性、表面品質、安定量産を同時に求められました。"
    },
    solution: {
      zh: "依使用環境評估 316L 或 17-4PH，並把成型、燒結、後加工與表面處理條件納入同一套製程規劃。",
      en: "316L or 17-4PH is evaluated by environment, with molding, sintering, finishing, and surface treatment planned as one process path.",
      ja: "使用環境に合わせて316Lまたは17-4PHを評価し、成形、焼結、後加工、表面処理を一つの工程計画として組み立てます。"
    },
    evidence: {
      zh: ["材料等級建議", "表面需求協調", "ISO 品質流程控管"],
      en: ["Material grade recommendation", "Surface requirement alignment", "ISO quality process control"],
      ja: ["材料グレード提案", "表面要件の調整", "ISO品質プロセス管理"]
    },
    image: "/assets/products/stainless-316l-01.png",
    materials: ["stainless-steel"]
  },
  {
    id: "wear-resistant-tooling",
    industry: { zh: "工具 / 耐磨零件 / 特殊機構", en: "Tooling / wear parts / special mechanisms", ja: "工具 / 耐摩耗部品 / 特殊機構" },
    title: { zh: "高硬度與耐磨需求的特殊材質開發", en: "Special material development for hardness and wear resistance", ja: "高硬度・耐摩耗要求に向けた特殊材料開発" },
    challenge: {
      zh: "使用環境需要高硬度、耐磨耗，且形狀不適合以單純切削方式大量製造。",
      en: "The application needed high hardness and wear resistance while the geometry was not ideal for mass machining.",
      ja: "高硬度と耐摩耗性が必要で、形状も切削だけで量産するには不向きでした。"
    },
    solution: {
      zh: "透過高速鋼或其他特殊材質評估，先確認材料可行性，再規劃模具、燒結與必要後加工。",
      en: "High-speed steel or other special materials are evaluated first, then tooling, sintering, and required finishing are planned.",
      ja: "高速度鋼またはその他特殊材料を先に評価し、材料可否を確認してから金型、焼結、必要な後加工を計画します。"
    },
    evidence: {
      zh: ["特殊材質評估", "耐磨用途開發", "共同開發與試作"],
      en: ["Special material evaluation", "Wear-use development", "Co-development and prototyping"],
      ja: ["特殊材料評価", "耐摩耗用途開発", "共同開発と試作"]
    },
    image: "/assets/products/high-speed-01.png",
    materials: ["high-speed-steel", "other-materials"]
  }
];

export const serviceSteps: ServiceStep[] = [
  {
    id: "drawing-review",
    title: { zh: "圖面與用途判斷", en: "Drawing and application review", ja: "図面と用途の確認" },
    text: {
      zh: "先確認零件尺寸、功能面、受力位置、外觀面與預估數量，判斷是否適合 MIM。",
      en: "We review dimensions, functional surfaces, load points, appearance requirements, and estimated volume to judge MIM suitability.",
      ja: "寸法、機能面、荷重点、外観面、想定数量を確認し、MIM適性を判断します。"
    }
  },
  {
    id: "material-process",
    title: { zh: "材料與製程路線", en: "Material and process route", ja: "材料と工程ルート" },
    text: {
      zh: "依強度、耐蝕、硬度、表面與成本目標，建議材料、模具策略、燒結與後加工方式。",
      en: "Material, tooling, sintering, and finishing routes are suggested based on strength, corrosion, hardness, surface, and cost goals.",
      ja: "強度、耐食性、硬度、表面、コスト目標に合わせて材料、金型、焼結、後加工の方向を提案します。"
    }
  },
  {
    id: "prototype-qa",
    title: { zh: "試作、檢測與修正", en: "Prototype, inspection, and tuning", ja: "試作・検査・調整" },
    text: {
      zh: "用樣件與檢測資料修正尺寸、收縮、加工基準與品質控制條件。",
      en: "Samples and inspection data are used to tune dimensions, shrinkage, machining references, and quality controls.",
      ja: "サンプルと検査データをもとに寸法、収縮、加工基準、品質管理条件を調整します。"
    }
  },
  {
    id: "production-transfer",
    title: { zh: "量產移轉", en: "Production transfer", ja: "量産移行" },
    text: {
      zh: "建立可追蹤的製程條件與檢驗重點，讓客製零件從開發進入穩定量產。",
      en: "Traceable process conditions and inspection points are set so custom parts can move from development into stable production.",
      ja: "追跡可能な工程条件と検査ポイントを設定し、カスタム部品を開発段階から安定量産へ移行します。"
    }
  }
];

export const buyerSignals = [
  {
    zh: ["適合詢問震欣的情況", "零件小而複雜、傳統加工成本高、需要耐磨/耐蝕/高強度、預計量產或長期供應。"],
    en: ["When to ask TANCHIN", "Small complex parts, high machining cost, wear/corrosion/strength needs, and expected production demand."],
    ja: ["TANCHINに相談しやすいケース", "小型で複雑な部品、切削コストが高い部品、耐摩耗・耐食・高強度が必要な部品、量産や長期供給を見込む案件。"]
  },
  {
    zh: ["初次詢問請提供", "2D/3D 圖面、材料或使用環境、關鍵尺寸、表面要求、預估數量與目前製程痛點。"],
    en: ["Useful inquiry inputs", "2D/3D drawings, material or environment, critical dimensions, surface requirements, estimated volume, and current process pain points."],
    ja: ["初回相談であると良い情報", "2D/3D図面、材料または使用環境、重要寸法、表面要求、想定数量、現在の工程課題。"]
  },
  {
    zh: ["我們會協助判斷", "MIM 可行性、材料選項、模具方向、後加工需求、品質檢查重點與量產風險。"],
    en: ["What we help evaluate", "MIM feasibility, material options, tooling direction, finishing needs, inspection points, and production risks."],
    ja: ["評価を支援する内容", "MIM可否、材料選択、金型方向、後加工要否、品質検査ポイント、量産リスク。"]
  }
];

export const equipment = [
  {
    image: "/assets/equipment/injection-machine.jpg",
    zh: ["射出成型設備", "使用穩定射出設備與客製模具，形成複雜幾何毛胚。"],
    en: ["Injection Molding Equipment", "Stable injection equipment and custom tooling form complex green parts."],
    ja: ["射出成形設備", "安定した射出設備と専用金型で複雑形状のグリーンパーツを成形します。"]
  },
  {
    image: "/assets/equipment/sintering-furnace.jpg",
    zh: ["真空燒結爐", "透過燒結條件控制，使零件緻密化並取得金屬強度。"],
    en: ["Vacuum Sintering Furnace", "Sintering control densifies parts and delivers metal strength."],
    ja: ["真空焼結炉", "焼結条件の管理により部品を緻密化し、金属強度を引き出します。"]
  }
];

export const timeline = [
  ["1980", "成立並投入精密零件製造", "Founded for precision component manufacturing", "精密部品製造を目的に設立"],
  ["1996", "引進並專研 MIM 金屬射出成型技術", "Introduced and researched MIM technology", "MIM金属射出成形技術を導入し研究を開始"],
  ["2015", "已開發超過 1000 項客製化零件", "Developed over 1000 custom components", "1000件以上のカスタム部品を開発"],
  ["2017", "通過 ISO 9001:2015 品質管理系統", "Certified to ISO 9001:2015", "ISO 9001:2015品質マネジメントシステム認証取得"],
  ["2023", "增設金屬 X-RAY 3D 電腦斷層設備", "Added metal X-ray 3D CT capability", "金属X-RAY 3D CT検査設備を増設"]
];

export function t(lang: Lang, zh: string, en: string, ja = en) {
  if (lang === "zh") return zh;
  if (lang === "ja") return ja;
  return en;
}

export function getMaterial(slug: string) {
  return materials.find((material) => material.slug === slug);
}

export function materialProducts(slug: string) {
  return products.filter((product) => product.material === slug);
}
