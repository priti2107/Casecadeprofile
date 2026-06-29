export interface WorkflowStep {
  name: string;
  description: string;
}

export interface ArchitectureData {
  challenges: string[];
  solutions: string[];
  outcomes: string[];
}

export interface IndustryData {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  iconName: "Home" | "Building2" | "GraduationCap" | "HeartPulse" | "ShoppingCart" | "Landmark";
  capabilities: string[];
  technologies: string[];
  outcomes: string[]; // left card Outcomes list (previously removed but kept in typescript definition)
  stats: { label: string; value: string }[];
  workflow: WorkflowStep[];
  architecture: ArchitectureData; // new 3-column data (exactly 5 items each)
  ctaText: string;
}

export const INDUSTRIES_SHOWCASE_DATA: IndustryData[] = [
  {
    id: "real-estate",
    title: "Real Estate & PropTech",
    subtitle: "Vertical 01",
    desc: "End-to-end Salesforce solutions for developers, builders, and brokers—streamlining lead management, sales, bookings, inventory, and customer engagement.",
    iconName: "Home",
    capabilities: [
      "Lead Capture & Routing",
      "Site Visit Scheduling",
      "Channel Partner Portal",
      "Inventory Management",
      "Booking & Payment Tracking",
      "Construction Updates",
      "Customer Support"
    ],
    technologies: ["Sales Cloud", "Experience Cloud", "Service Cloud", "Marketing Cloud", "MuleSoft", "Einstein AI"],
    outcomes: [
      "45K+ Units Managed",
      "12 Days Avg Booking Cycle",
      "98% Automation Accuracy"
    ],
    stats: [
      { value: "45K+", label: "Units Managed" },
      { value: "12 Days", label: "Avg Booking Cycle" }
    ],
    ctaText: "Accelerate Developer Sales",
    workflow: [],
    architecture: {
      challenges: ["Lead Leakage", "Slow Site Visits", "Inventory Conflicts", "Broker Coordination", "Manual Post-Sales"],
      solutions: ["Salesforce CRM", "Lead Automation", "Inventory Management", "Partner Portal", "Customer 360"],
      outcomes: ["Faster Closings", "Higher Lead Conversion", "Real-Time Inventory", "Better Customer Experience", "Increased Revenue"]
    }
  },
  {
    id: "commercial-cre",
    title: "Commercial Real Estate",
    subtitle: "Vertical 02",
    desc: "Digital solutions for leasing and property operations with tenant management, contract automation, maintenance workflows, and portfolio visibility.",
    iconName: "Building2",
    capabilities: [
      "Tenant Onboarding",
      "Lease Automation",
      "Term Sheet Vetting",
      "CAM Invoicing",
      "Maintenance Workflows",
      "Renewals Tracking",
      "Portfolio Analytics"
    ],
    technologies: ["Sales Cloud", "Revenue Cloud", "Service Cloud", "Experience Cloud", "Tableau"],
    outcomes: [
      "18% Vacancy Reduction",
      "25% Faster Sign-offs",
      "95% Renewal Rate"
    ],
    stats: [
      { value: "18%", label: "Vacancy Reduction" },
      { value: "25%", label: "Faster Sign-offs" }
    ],
    ctaText: "Optimize Leasing Performance",
    workflow: [],
    architecture: {
      challenges: ["Tenant Tracking", "Lease Complexity", "Maintenance Requests", "Contract Delays", "Portfolio Visibility"],
      solutions: ["Lease Automation", "Service Cloud", "Contract Workflows", "Property Dashboard", "Analytics"],
      outcomes: ["Faster Leasing", "Reduced Vacancies", "Automated Operations", "Better Asset Visibility", "Higher ROI"]
    }
  },
  {
    id: "healthcare",
    title: "Healthcare",
    subtitle: "Vertical 04",
    desc: "Salesforce-powered patient engagement platform improving appointment scheduling, referral management and patient lifecycle.",
    iconName: "HeartPulse",
    capabilities: [
      "Patient 360 Profiles",
      "Referral Management",
      "Slot Scheduling",
      "Care Checklists",
      "Pharmacy Integration",
      "Billing Clearance",
      "Follow-up Reminders"
    ],
    technologies: ["Health Cloud", "Service Cloud", "Data Cloud", "MuleSoft"],
    outcomes: [
      "28% Readmission Drop",
      "45% Admin Efficiency",
      "4.8 Patient NPS"
    ],
    stats: [
      { value: "28%", label: "Readmission Drop" },
      { value: "4.8/5", label: "Patient NPS Score" }
    ],
    ctaText: "Transform Patient Experience",
    workflow: [],
    architecture: {
      challenges: ["Patient Scheduling", "Manual Records", "Referral Delays", "Billing Errors", "Care Coordination"],
      solutions: ["Patient 360", "Appointment Automation", "Referral Management", "Billing Workflow", "Healthcare Analytics"],
      outcomes: ["Better Patient Care", "Faster Appointments", "Reduced Administrative Work", "Accurate Billing", "Higher Patient Satisfaction"]
    }
  },
  {
    id: "education",
    title: "Education",
    subtitle: "Vertical 03",
    desc: "Student lifecycle management from inquiry to alumni engagement using Salesforce Education Cloud.",
    iconName: "GraduationCap",
    capabilities: [
      "Inquiry Management",
      "Document Vetting",
      "Student Portal",
      "Fee Installments",
      "LMS Sync",
      "Attendance Alerts",
      "Alumni Campaigns"
    ],
    technologies: ["Education Cloud", "Marketing Cloud", "Experience Cloud"],
    outcomes: [
      "50% Application Lift",
      "30% Lower Enrollment Cost",
      "92% Portal Engagement"
    ],
    stats: [
      { value: "50%", label: "Application Lift" },
      { value: "92%", label: "Portal Engagement" }
    ],
    ctaText: "Empower Student Journeys",
    workflow: [],
    architecture: {
      challenges: ["Admission Delays", "Student Tracking", "Fee Management", "Communication Gaps", "Alumni Engagement"],
      solutions: ["Admission CRM", "Student Portal", "Fee Automation", "Communication Hub", "Education Analytics"],
      outcomes: ["Faster Admissions", "Better Student Experience", "Automated Administration", "Higher Engagement", "Improved Retention"]
    }
  },
  {
    id: "d2c-retail",
    title: "D2C & Retail",
    subtitle: "Vertical 05",
    desc: "Commerce automation connecting customer acquisition, orders, payments, delivery and loyalty.",
    iconName: "ShoppingCart",
    capabilities: [
      "Cart Abandonment",
      "Loyalty Engine",
      "Recommendation Engine",
      "Ticket Routing",
      "Exchange Workflows",
      "Segment Builder",
      "Multi-warehouse Sync"
    ],
    technologies: ["Commerce Cloud", "Marketing Cloud", "Service Cloud", "Data Cloud"],
    outcomes: [
      "22% Repeat Purchase",
      "3.4x Campaign ROI",
      "35% Auto-Resolution"
    ],
    stats: [
      { value: "22%", label: "Repeat Purchase" },
      { value: "3.4x", label: "Campaign ROI" }
    ],
    ctaText: "Scale Retail Operations",
    workflow: [],
    architecture: {
      challenges: ["Customer Drop-offs", "Cart Abandonment", "Order Tracking", "Support Delays", "Low Retention"],
      solutions: ["Commerce Cloud", "Customer 360", "Marketing Automation", "Loyalty Programs", "AI Insights"],
      outcomes: ["Higher Sales", "Better Customer Retention", "Faster Support", "Personalized Shopping", "Increased Revenue"]
    }
  },
  {
    id: "financial-services",
    title: "Financial Services",
    subtitle: "Vertical 06",
    desc: "CRM solution for banking, lending and financial institutions with secure onboarding and compliance.",
    iconName: "Landmark",
    capabilities: [
      "Portfolio Rollups",
      "KYC Vetting",
      "Underwriting Audits",
      "Secure Checklists",
      "Advisor Dashboards",
      "Encryption Safeguards",
      "Consent Auditing"
    ],
    technologies: ["Financial Services Cloud", "Shield", "MuleSoft", "Einstein AI"],
    outcomes: [
      "55% Onboarding Acceleration",
      "100% Audit Readiness",
      "22% Asset Growth"
    ],
    stats: [
      { value: "55%", label: "Onboarding Speedup" },
      { value: "100%", label: "Audit Readiness" }
    ],
    ctaText: "Secure Client Trust",
    workflow: [],
    architecture: {
      challenges: ["Lengthy Onboarding", "KYC Delays", "Compliance Risks", "Loan Processing", "Customer Trust"],
      solutions: ["Digital Onboarding", "KYC Automation", "Compliance Workflows", "Financial CRM", "AI Risk Analysis"],
      outcomes: ["Faster Approvals", "Secure Compliance", "Improved Customer Trust", "Reduced Processing Time", "Business Growth"]
    }
  }
];
