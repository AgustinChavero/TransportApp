export interface Company {
  id: string;
  name: string;
  rating: number;
  evaluation: Evaluation[];
  createdAt: string;
}

export interface Evaluation {
  comment: string;
  userId: string;
  rating: number;
}
