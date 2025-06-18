export type Tenant = {
  name: string;
  domain: string;
  email: string;
  plan: "Enterprise" | "Starter" | "Professional";
  status: "Active" | "Inactive";
  createdDate?: string;
  products: number;
  tags?: string[];
};