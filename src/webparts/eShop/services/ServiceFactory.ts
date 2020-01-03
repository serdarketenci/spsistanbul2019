import { EnvironmentType } from '@microsoft/sp-core-library';
import { IEShopService, EShopServiceMock, EShopService } from '.';



export class ServiceFactory {
    public static getEShopService(environmentType: EnvironmentType): IEShopService {
        var eShopService: IEShopService;
        if (environmentType === EnvironmentType.Local) {
            eShopService = new EShopServiceMock();
        } else {
            eShopService = new EShopService();
        }
        return eShopService;
    }
}