declare interface IEShopWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  SearchPlaceHolder: string;
  ItemsNotFoundMessage: string;
  BuyButtonLabel: string;
  CancelButtonLabel: string;
  SaveButtonLabel: string;
  LoadingMessage: string;
  SuccessMessage: string,
  ErrorMessage: string
}

declare module 'EShopWebPartStrings' {
  const strings: IEShopWebPartStrings;
  export = strings;
}
