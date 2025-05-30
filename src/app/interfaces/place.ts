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
  user: User;
  latitude?: number | null;
  longitude?: number | null;
  reviews: Review[];
  averageRating?: number;  // Optional if returned from API
  reviewCount?: number;    // Optional if returned from API
}
