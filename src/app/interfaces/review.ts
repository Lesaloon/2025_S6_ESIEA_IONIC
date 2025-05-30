import { Place } from "./place";
import { User } from "./user";

export interface Review {
  id: number;
  commentaire: string;
  rating: number;
  statut: string;
  createAt: string; // ISO date string
  user: User;
  place: Place;
}
