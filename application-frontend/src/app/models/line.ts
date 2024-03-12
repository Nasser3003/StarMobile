import { Device } from "./device";

export class Line {
    id?: number;
    device: Device;
    number: string;

    constructor(id: number, device: Device, number: string) {
        this.id = id;
        this.device = device;
        this.number = number;
    }
}
