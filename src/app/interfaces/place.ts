import { Review } from "./review";
import { User } from "./user";

export interface Place {
  id: number;
  name: string;
  type: string;
  adresse: string;
  description: string;
  statut: string;
  createAt: string; // ISO date string
  latitude?: number | null;
  longitude?: number | null;
}
