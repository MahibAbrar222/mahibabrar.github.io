export interface Project {
  slug: string;
  title: string;
  category: string;
  badge?: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  caseStudyUrl?: string; // আলাদা পেজ বা রিডমি লিঙ্ক
  featured: boolean;
  metrics?: {
    rps?: number;
    latency?: string;
  };
}

export const projectsData: Project[] = [
  {
    slug: "captcha-solver-poc",
    title: "Domain-Specific CAPTCHA Solver API",
    category: "Computer Vision & ML Inference",
    badge: "PoC / Benchmark Ready",
    description: "High-performance FastAPI & ONNX inference service utilizing a custom OpenCV preprocessing pipeline (grayscale, thresholding, polygon masking) for rapid 4-digit CAPTCHA solving.",
    techStack: ["FastAPI", "ONNX Runtime", "OpenCV", "Python", "NumPy"],
    githubUrl: "https://github.com/itsmahibabrar/captcha-recogniton-api", // আপনার আসল লিঙ্ক দেবেন
    //caseStudyUrl: "/projects/captcha-solver-poc", // পোর্টফোলিওর কেস স্টাডি রুট
    featured: true,
    metrics: {
      rps: 147,
      latency: "297ms"
    }
  },
  {
    slug: "ssc-open-mcq-bank",
    title: "SSC Open MCQ Bank",
    category: "Data Infrastructure",
    badge: "Open Source",
    description: "A strictly validated, schema-driven dataset compiled directly from public national examinations to break data monopolies and democratize Bangladeshi EdTech.",
    techStack: ["JSON Schema", "Open Data", "EdTech"],
    githubUrl: "https://github.com/itsmahibabrar/ssc-open-mcq-bank",
    featured: true
  },
  {
    slug: "bangla-quran-mcp",
    title: "Bangla Quran MCP",
    category: "Model Context Protocol",
    badge: "Open Source",
    description: "Provides MCP access to Quran resources in Bangla with reliable endpoints and clean responses.",
    techStack: ["TypeScript", "MCP", "APIs"],
    githubUrl: "https://mcpize.com/mcp/bangla-quran-mcp",
    featured: true
  },
  {
    slug: "minecraft-server-status",
    title: "Minecraft Server Status MCP",
    category: "Realtime",
    badge: "Service Tooling",
    description: "Queries Minecraft Java Edition servers for up-to-date status, latency, and MOTD in a single call.",
    techStack: ["Realtime", "MCP", "Game Ops"],
    githubUrl: "https://mcpize.com/mcp/minecraft-server-status",
    featured: true
  }
];
