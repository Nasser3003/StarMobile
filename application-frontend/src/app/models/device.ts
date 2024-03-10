import { Line } from "./line";
import { Plan } from "./plan";

export class Device {

    brand: string;
    description: string;
    id: number;
    model: string;
    price: number;
    line: Line;
    plan: Plan;

    constructor(
        brand: string,
        description: string,
        id: number,
        model: string,
        price: number,
        line: Line,
        plan: Plan

    ) {
        this.brand = brand;
        this.description = description;
        this.id = id;
        this.model = model;
        this.price = price;
        this.line = line;
        this.plan = plan;
    }

}
