export class Device {

    brand: string;
    description: string;
    id: number;
    model: string;
    price: number;

    constructor(
        brand: string,
        description: string,
        id: number,
        model: string,
        price: number
    ) {
        this.brand = brand;
        this.description = description;
        this.id = id;
        this.model = model;
        this.price = price;
    }

}
