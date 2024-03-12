import { Device } from "./device";

export class Line {
    device: Device;
    id: number;
    number: string;

    constructor(id: number, device: Device, number: string) {
        this.id = id;
        this.device = device;
        this.number = number;
    }
}
