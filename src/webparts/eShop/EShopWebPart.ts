import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { setup as pnpSetup } from "@pnp/common";

import * as strings from 'EShopWebPartStrings';
import EShop from './components/EShop';
import { IEShopProps } from './components/IEShopProps';
import { IEShopService, ServiceFactory } from './services';

export interface IEShopWebPartProps {
  service:IEShopService;
  description: string;
}

export default class EShopWebPart extends BaseClientSideWebPart<IEShopWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnpSetup({spfxContext: this.context});

    });
  }

  public render(): void {
    
    const element: React.ReactElement<IEShopProps > = React.createElement(
      EShop,
      {
        description: this.properties.description,
        service: ServiceFactory.getEShopService(Environment.type)
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
