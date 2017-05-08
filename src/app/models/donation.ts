import { Beneficiary } from "./beneficiary";

export class Donation {
    id: number;
    date: Date;
    amount: number;
    beneficiary: Beneficiary;
    receiptUrl: string;
}