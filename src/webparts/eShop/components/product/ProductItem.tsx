import * as React from 'react';
import {
    DocumentCard,
    DocumentCardPreview,
    DocumentCardTitle,
    IDocumentCardPreviewProps,
    IDocumentCardStyles
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import OrderItem from '../order/OrderItem';
import { IEShopService } from '../../services';
import { IProduct } from '../../models';

export interface IProductItemProps {
    product:IProduct;
    service:IEShopService;
}

export default function ProductItem(props: IProductItemProps) {
    const cardStyles: IDocumentCardStyles = {
        root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 }
    };

    const previewProps: IDocumentCardPreviewProps = {
        previewImages: [
            {
                previewImageSrc: props.product.ImageUri,
                imageFit: ImageFit.cover,
                height: 350
            }
        ]
    };


    return (<DocumentCard
        aria-label={props.product.Title}
        styles={cardStyles}
        className="ms-motion-fadeIn"
    >
        <DocumentCardPreview {...previewProps} />
        <DocumentCardTitle
            title={props.product.Title}
            shouldTruncate={true}
        />
        <DocumentCardTitle
            title={`${props.product.Price.toFixed(0)} TRY`}
            shouldTruncate
            showAsSecondaryTitle
        />
        <OrderItem {...props} />
    </DocumentCard>);
}
