export class Line {
    deviceID: number;
    id: number;
    number: string;

    constructor(deviceID: number, id: number, number: string) {
        this.deviceID = deviceID;
        this.id = id;
        this.number = number;
    }
}
