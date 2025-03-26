
export interface Component {
  id: string;
  type: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  specs: Record<string, string | number>;
  description: string;
}

export interface PCBuild {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  purpose: string[];
  rating: number;
  components: Component[];
}

export const componentTypes = [
  { id: 'cpu', name: 'CPU' },
  { id: 'motherboard', name: 'Motherboard' },
  { id: 'gpu', name: 'Graphics Card' },
  { id: 'memory', name: 'RAM' },
  { id: 'storage', name: 'Storage' },
  { id: 'case', name: 'Case' },
  { id: 'psu', name: 'Power Supply' },
  { id: 'cooler', name: 'CPU Cooler' },
];

// Mock component data
export const components: Component[] = [
  {
    id: "cpu1",
    type: "cpu",
    name: "Intel Core i9-13900K",
    brand: "Intel",
    price: 589.99,
    image: "https://m.media-amazon.com/images/I/51J9KifKmxL._AC_SL1500_.jpg",
    rating: 4.8,
    specs: {
      cores: 24,
      threads: 32,
      baseClock: "3.0 GHz",
      boostClock: "5.8 GHz",
      tdp: 125,
      socket: "LGA 1700",
    },
    description:
      "The Intel Core i9-13900K is a high-performance desktop processor with 24 cores and 32 threads, featuring Intel's latest architecture for gaming and content creation.",
  },
  {
    id: "cpu2",
    type: "cpu",
    name: "AMD Ryzen 9 7950X",
    brand: "AMD",
    price: 549.99,
    image: "https://m.media-amazon.com/images/I/41W6gPkF9LL._AC_SL1500_.jpg",
    rating: 4.9,
    specs: {
      cores: 16,
      threads: 32,
      baseClock: "4.5 GHz",
      boostClock: "5.7 GHz",
      tdp: 170,
      socket: "AM5",
    },
    description:
      "The AMD Ryzen 9 7950X is a powerhouse processor with 16 cores and 32 threads, designed for extreme gaming and professional content creation.",
  },
  {
    id: "cpu3",
    type: "cpu",
    name: "Intel Core i5-13600K",
    brand: "Intel",
    price: 319.99,
    image: "https://m.media-amazon.com/images/I/51SgxU9f+ML._AC_SL1500_.jpg",
    rating: 4.7,
    specs: {
      cores: 14,
      threads: 20,
      baseClock: "3.5 GHz",
      boostClock: "5.1 GHz",
      tdp: 125,
      socket: "LGA 1700",
    },
    description:
      "The Intel Core i5-13600K offers an excellent balance of gaming and productivity performance with 14 cores and 20 threads at a mid-range price point.",
  },
  {
    id: "gpu1",
    type: "gpu",
    name: "NVIDIA GeForce RTX 4090",
    brand: "NVIDIA",
    price: 1599.99,
    image: "https://m.media-amazon.com/images/I/71RsYU3q7PL._AC_SL1500_.jpg",
    rating: 4.9,
    specs: {
      memory: "24GB GDDR6X",
      coreClock: "2.23 GHz",
      boostClock: "2.52 GHz",
      tdp: 450,
      ports: "HDMI 2.1, 3x DisplayPort 1.4a",
    },
    description:
      "The GeForce RTX 4090 is NVIDIA's flagship graphics card featuring the Ada Lovelace architecture, delivering unparalleled gaming performance and ray tracing capabilities.",
  },
  {
    id: "gpu2",
    type: "gpu",
    name: "AMD Radeon RX 7900 XTX",
    brand: "AMD",
    price: 999.99,
    image: "https://m.media-amazon.com/images/I/818WxMRLMLl._AC_SL1500_.jpg",
    rating: 4.7,
    specs: {
      memory: "24GB GDDR6",
      coreClock: "1.9 GHz",
      boostClock: "2.5 GHz",
      tdp: 355,
      ports: "HDMI 2.1, 2x DisplayPort 2.1",
    },
    description:
      "The AMD Radeon RX 7900 XTX features the RDNA 3 architecture and 24GB of memory, offering powerful gaming performance and excellent value compared to the competition.",
  },
  {
    id: "motherboard1",
    type: "motherboard",
    name: "ASUS ROG Maximus Z790 Hero",
    brand: "ASUS",
    price: 629.99,
    image: "https://m.media-amazon.com/images/I/81+S5KatrQL._AC_SL1500_.jpg",
    rating: 4.8,
    specs: {
      socket: "LGA 1700",
      chipset: "Intel Z790",
      memorySlots: 4,
      maxMemory: "128GB DDR5",
      pciSlots: "PCIe 5.0 x16, PCIe 4.0 x16, PCIe 3.0 x4",
      sataConnectors: 6,
    },
    description:
      "The ASUS ROG Maximus Z790 Hero is a premium motherboard for Intel 12th and 13th gen processors, featuring high-end components, robust power delivery, and extensive connectivity options.",
  },
  {
    id: "memory1",
    type: "memory",
    name: "Corsair Vengeance RGB Pro 32GB",
    brand: "Corsair",
    price: 129.99,
    image: "https://m.media-amazon.com/images/I/51JzInf5g7L._AC_SL1200_.jpg",
    rating: 4.8,
    specs: {
      capacity: "32GB (2x16GB)",
      type: "DDR5",
      speed: "6000MHz",
      cas: "CL36",
      voltage: "1.35V",
    },
    description:
      "Corsair Vengeance RGB Pro DDR5 memory offers high performance, RGB lighting, and XMP 3.0 support for easy overclocking in a premium package.",
  },
  {
    id: "storage1",
    type: "storage",
    name: "Samsung 990 Pro 2TB",
    brand: "Samsung",
    price: 179.99,
    image: "https://m.media-amazon.com/images/I/517eEoejnML._AC_SL1000_.jpg",
    rating: 4.9,
    specs: {
      capacity: "2TB",
      interface: "PCIe 4.0 x4",
      readSpeed: "7450 MB/s",
      writeSpeed: "6900 MB/s",
      formFactor: "M.2 2280",
    },
    description:
      "The Samsung 990 Pro is a high-performance PCIe 4.0 NVMe SSD that delivers incredible speed and reliability for gaming and professional workloads.",
  },
  {
    id: "case1",
    type: "case",
    name: "Lian Li O11 Dynamic EVO",
    brand: "Lian Li",
    price: 169.99,
    image: "https://m.media-amazon.com/images/I/71VGNnkeQNL._AC_SL1500_.jpg",
    rating: 4.8,
    specs: {
      type: "Mid Tower",
      motherboardSupport: "E-ATX, ATX, Micro-ATX, Mini-ITX",
      dimensions: "464 x 285 x 459 mm",
      gpuLength: "up to 420mm",
      fanSupport: "10 x 120mm or 7 x 140mm",
      radiatorSupport: "360mm top, side, bottom",
    },
    description:
      "The Lian Li O11 Dynamic EVO is a premium case featuring a dual-chamber design, excellent airflow, and extensive water-cooling support with a sleek glass panel design.",
  },
  {
    id: "psu1",
    type: "psu",
    name: "Corsair RM1000x",
    brand: "Corsair",
    price: 189.99,
    image: "https://m.media-amazon.com/images/I/71PblfvLdVL._AC_SL1500_.jpg",
    rating: 4.9,
    specs: {
      wattage: 1000,
      efficiency: "80+ Gold",
      modular: "Fully Modular",
      fanSize: "135mm",
    },
    description:
      "The Corsair RM1000x is a high-quality 1000W power supply with 80 Plus Gold certification, fully modular cables, and a quiet fan for reliable, efficient power delivery.",
  },
  {
    id: "cooler1",
    type: "cooler",
    name: "NZXT Kraken Z73",
    brand: "NZXT",
    price: 279.99,
    image: "https://m.media-amazon.com/images/I/71iVCFKb6kS._AC_SL1500_.jpg",
    rating: 4.7,
    specs: {
      type: "Liquid",
      radiatorSize: "360mm",
      fans: "3 x 120mm",
      compatibility: "Intel & AMD",
      display: "LCD Display",
    },
    description:
      "The NZXT Kraken Z73 is a premium 360mm AIO liquid cooler featuring a customizable LCD display and three Aer P radiator fans for excellent cooling performance.",
  },
];

// Mock PC builds data
export const pcBuilds: PCBuild[] = [
  {
    id: "build1",
    name: "Ultimate Gaming Rig",
    description: "High-end gaming PC with top-tier components for 4K gaming and streaming",
    price: 3499.99,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
    category: "high-end",
    purpose: ["gaming", "streaming", "content creation"],
    rating: 4.9,
    components: [
      components.find(c => c.id === "cpu1")!,
      components.find(c => c.id === "gpu1")!,
      components.find(c => c.id === "motherboard1")!,
      components.find(c => c.id === "memory1")!,
      components.find(c => c.id === "storage1")!,
      components.find(c => c.id === "case1")!,
      components.find(c => c.id === "psu1")!,
      components.find(c => c.id === "cooler1")!,
    ],
  },
  {
    id: "build2",
    name: "Mid-Range Powerhouse",
    description: "Balanced build for 1440p gaming and productivity tasks",
    price: 1799.99,
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6",
    category: "mid-range",
    purpose: ["gaming", "work", "everyday use"],
    rating: 4.7,
    components: [
      components.find(c => c.id === "cpu3")!,
      components.find(c => c.id === "gpu2")!,
      components.find(c => c.id === "motherboard1")!,
      components.find(c => c.id === "memory1")!,
      components.find(c => c.id === "storage1")!,
      components.find(c => c.id === "case1")!,
      components.find(c => c.id === "psu1")!,
      components.find(c => c.id === "cooler1")!,
    ],
  },
];

// Function to get components by type
export const getComponentsByType = (type: string) => {
  return components.filter(component => component.type === type);
};

// Function to calculate total price of components
export const calculateTotalPrice = (componentList: Component[]) => {
  return componentList.reduce((total, component) => total + component.price, 0);
};
