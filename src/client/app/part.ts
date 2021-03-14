export class Part {
    constructor(name: string, price: string, type: string) {
        this.name = name;
        this.price = price;
        this.type = type;
    }

    name: string;
    price: string;
    type: string;
}