import { IProduct } from ".";

export class Product implements IProduct {
    constructor(options:IProduct) {
        this.ImageUri = options.ImageUri;
        this.Price = options.Price;
        this.Title = options.Title;
        this.UniqueId = options.UniqueId;
    }
    public UniqueId: string;
    public Title: string;
    public Price: number;
    public ImageUri:string;
}