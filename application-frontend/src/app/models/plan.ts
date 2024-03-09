
export class Plan {
    id: number;
    plan_type: number;
    price: number;
    quota: number;
    signal_range: string;

    constructor (
        id: number,
        plan_type: number,
        price: number,
        quota: number,
        signal_range: string
    ) {
        this.id = id;
        this.plan_type = plan_type;
        this.price = price;
        this.quota = quota;
        this.signal_range = signal_range;
    }
}
