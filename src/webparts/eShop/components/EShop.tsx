import * as React from 'react';
import { IEShopProps } from './IEShopProps';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Product } from '../models';
import ProductItem from './product/ProductItem';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import * as strings from 'EShopWebPartStrings';


export default function EShop(props: IEShopProps) {
  const initialProductsList: Product[] = null;
  const [products, setProductsList] = React.useState(initialProductsList);
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    props.service.getAll().then((items: Product[]) => {
      setProductsList(items);
    });
  }, []);

  var content = null;
  if (products === null) content = <Spinner size={SpinnerSize.large} />;
  else if (products.length === 0) content = <div>{strings.ItemsNotFoundMessage}.</div>;
  else content = (
    <div>
      <ul>
        {products.filter(p=>p.Title.toLocaleLowerCase().indexOf(filter) > -1).map((item: Product) => (
          <ProductItem key={item.UniqueId} service={props.service} product={item}/>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <SearchBox
        placeholder={strings.SearchPlaceHolder}
        value={filter}
        onSearch={newValue => console.log('value is ' + newValue)}
        onChange={value => setFilter(value)}
      />
      {content}
    </div>
  );
}