import { Passage } from "./Passages";

export interface ToPay {
  passageId: string; // Update the type to a string or the appropriate type for passageId
  id: any;
  name: string | Passage;
  img: string | Passage | null;
  unit_price: number | Passage | null;
  quantity: number | Passage;
  description: string;
}
