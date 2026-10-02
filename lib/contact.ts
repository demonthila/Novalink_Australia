export const projectTypes = ["Custom Software", "Website", "UI/UX Design", "Digital Marketing", "Branding / SEO", "Other"] as const;
export const budgets = ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+", "Not sure yet"] as const;

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

export type Errors = Partial<Record<keyof Enquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the client form and the API route. */
export function validateEnquiry(d: Enquiry): Errors {
  const e: Errors = {};
  if (!d.name.trim()) e.name = "Enter your name.";
  if (!EMAIL.test(d.email.trim())) e.email = "Enter a valid email address, like name@company.com.";
  if (!(projectTypes as readonly string[]).includes(d.projectType)) e.projectType = "Choose a project type.";
  if (d.message.trim().length < 20) e.message = "Describe your project in at least 20 characters.";
  if (d.message.length > 5000) e.message = "Keep the description under 5,000 characters.";
  return e;
}

export type Application = {
  name: string;
  email: string;
  phone: string;
  position: string;
  coverLetter: string;
  portfolio: string;
};
export type AppErrors = Partial<Record<keyof Application | "cv", string>>;

export const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const CV_MAX = 5 * 1024 * 1024;

export function validateApplication(d: Application, cv: { type: string; size: number } | null): AppErrors {
  const e: AppErrors = {};
  if (!d.name.trim()) e.name = "Enter your full name.";
  if (!EMAIL.test(d.email.trim())) e.email = "Enter a valid email address.";
  if (!/^[+\d][\d\s()-]{6,}$/.test(d.phone.trim())) e.phone = "Enter a phone number, including country code.";
  if (d.coverLetter.trim().length < 30) e.coverLetter = "Write at least 30 characters about why you’re a fit.";
  if (d.portfolio && !/^https?:\/\/\S+\.\S+/.test(d.portfolio.trim())) e.portfolio = "Enter a full link starting with https://";
  if (!cv) e.cv = "Attach your CV (PDF or Word).";
  else if (!CV_TYPES.includes(cv.type)) e.cv = "Upload a PDF or Word document.";
  else if (cv.size > CV_MAX) e.cv = "Keep the file under 5 MB.";
  return e;
}
