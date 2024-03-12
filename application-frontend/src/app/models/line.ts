import { Device } from "./device";

export class Line {
    device: Device;
    id: number;
    number: string;

    constructor(device: Device, id: number, number: string) {
        this.id = id;
        this.device = device;
        this.number = number;
    }
}
