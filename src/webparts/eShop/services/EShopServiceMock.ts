import { IEShopService } from "./IEShopService";
import {Product} from "../models";
export class EShopServiceMock implements IEShopService{

    private mockData: Product[] = [
        { UniqueId: "1", Title: "Bags", Price: 210, ImageUri:"https://www.kaft.com/static/images/productcategory/bag-hover.png" },
        { UniqueId: "2", Title: "T-Shirt", Price: 50, ImageUri:"https://www.kaft.com/static/images/tee3d/0349_1_E.jpg" },
        { UniqueId: "3", Title: "Hoodie", Price: 140 , ImageUri:"https://www.kaft.com/static/images/hoodie2/0424_1.jpg"},
        { UniqueId: "10", Title: "Beanie", Price: 70 , ImageUri:"https://www.kaft.com/static/images/cache/922/bere_kleurendokocean_9070_922_922.jpg"}
    ];

    public getAll():Promise<Product[]>{
        return new Promise<Product[]>(resolve => {
            resolve(this.mockData);
        });
    }

    public buy(uniqueid: string, quantity: number): Promise<void> {

        return new Promise<void>(resolve => resolve());
    }
}