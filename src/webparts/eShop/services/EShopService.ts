import { Product } from "../models";
import { IEShopService } from ".";
import { sp } from '@pnp/sp';
import Constants from "../common/Constants";

export class EShopService implements IEShopService {
    
    private mockData: Product[] = [
        { UniqueId: "1", Title: "Cherry", Price: 1, ImageUri: "" },
        { UniqueId: "2", Title: "Chocolate", Price: 2, ImageUri: "" },
        { UniqueId: "3", Title: "Coffee and Cookie", Price: 2.11, ImageUri: "" },
        { UniqueId: "10", Title: "Vanilla", Price: 2.5, ImageUri: "" }
    ];

    public getAll(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            sp.web.lists.getByTitle(Constants.ProductsListName)
                .items
                .select("Id,Title,Price,ImageUri")
                .getAll()
                .then((data) => {
                    resolve(data.map((item) => {
                        return new Product({
                            UniqueId: item.Id.toString(),
                            Title: item.Title,
                            Price: item.Price,
                            ImageUri: item.ImageUri
                        });
                    }));
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public buy(uniqueid: string, quantity: number): Promise<void> {
        return new Promise((resolve, reject) => {
            sp.web.lists.getByTitle(Constants.OrdersListName)
            .items
            .add({
                ProductId:uniqueid,
                Quantity:quantity
            })
            .then((data) => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });

        });
    }
}