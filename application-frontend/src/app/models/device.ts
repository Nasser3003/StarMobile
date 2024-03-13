import { Line } from "./line";
import { Plan } from "./plan";

export class Device {

    id?: number;
    brand: string;
    model: string;
    description: string;
    price: number;
    // line?: Line;
    picturePath: string;
    
    constructor(
        brand: string,
        model: string,
        description: string,
        price: number,
        // line: Line,
        picturePath: string,

    ) {
        this.picturePath = picturePath;
        this.brand = brand;
        this.description = description;
        this.model = model;
        this.price = price;
        // this.line = line;
    }

}
