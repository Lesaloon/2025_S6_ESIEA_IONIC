export interface User {
  id: number;
  email: string;
  pseudo: string;
  photo?: string | null;
  roles: string[];
  status: string;
  createAt: string; // ISO date string
}
