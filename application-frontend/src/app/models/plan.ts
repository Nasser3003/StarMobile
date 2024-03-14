import { Line } from "./line";
import { User } from "./user";

export class Plan {
    id?: number;
    planType: string;
    price: number;
    quota: number;
    signalRange: string;
    lines?: Line[];
    user?: User;

    constructor (
        planType: string,
        price: number,
        quota: number,
        signalRange: string
    ) {
        this.planType = planType;
        this.price = price;
        this.quota = quota;
        this.signalRange = signalRange;
    }

    getLinesArray() {
        return this.lines;
    }
}
