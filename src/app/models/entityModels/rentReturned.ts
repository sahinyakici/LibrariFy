import { RentModel } from "./rent";

export interface ReturnRent extends RentModel{
  rentalId: string|null;
}
