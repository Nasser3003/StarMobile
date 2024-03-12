
export class Plan {
    id: number;
    planType: string;
    price: number;
    quota: number;
    signalRange: string;

    constructor (
        id: number,
        planType: string,
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
