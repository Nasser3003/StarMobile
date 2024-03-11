
export class Plan {
    id: number;
    planType: string;
    price: number;
    dataCap: number;
    signalRange: string;

    constructor (
        id: number,
        planType: string,
        price: number,
        dataCap: number,
        signalRange: string
    ) {
        this.id = id;
        this.planType = planType;
        this.price = price;
        this.dataCap = dataCap;
        this.signalRange = signalRange;
    }
}
