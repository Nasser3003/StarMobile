import { Line } from "./line";
import { Plan } from "./plan";

export class Device {

    brand: string;
    description: string;
    id: number;
    model: string;
    price: number;
    line: Line;
    picturePath: string;
    
    constructor(
        picturePath: string,
        brand: string,
        description: string,
        id: number,
        model: string,
        price: number,
        line: Line,

    ) {
        this.picturePath = picturePath;
        this.brand = brand;
        this.description = description;
        this.id = id;
        this.model = model;
        this.price = price;
        this.line = line;
    }

}
