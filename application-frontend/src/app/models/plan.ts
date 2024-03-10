
export class Plan {
    id: number;
    planType: number;
    price: number;
    quota: number;
    signalRange: string;

    constructor (
        id: number,
        planType: number,
        price: number,
        quota: number,
        signalRange: string
    ) {
        this.id = id;
        this.planType = planType;
        this.price = price;
        this.quota = quota;
        this.signalRange = signalRange;
    }
}
