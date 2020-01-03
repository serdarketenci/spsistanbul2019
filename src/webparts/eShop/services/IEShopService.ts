import {IProduct, IOrder} from '../models';

export interface IEShopService{
    getAll():Promise<IProduct[]>;
    buy(uniqueId:string, quantity:number):Promise<void>;
}