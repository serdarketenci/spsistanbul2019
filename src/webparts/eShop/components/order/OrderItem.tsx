import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import OrderItemMessage from './OrderItemMessage';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Order } from '../../models/Order';
import * as strings from 'EShopWebPartStrings';
import { IProduct } from '../../models';
import { IEShopService } from '../../services';

export interface IOrderItemProps {
    product: IProduct;
    service: IEShopService;
}

enum DialogContentType {
    Loading,
    Form,
    SuccessMessage,
    ErrorMessage
}

export default function OrderItem(props: IOrderItemProps) {
    const initialOrder: Order = new Order(props.product.UniqueId, 1);
    const [order, setOrder] = React.useState(initialOrder);
    const [hideDialog, setHideDialog] = React.useState(true);
    const [dialogContentType, setDialogContentType] = React.useState(DialogContentType.Form);

    const productContent = (<div>
        <Label>{props.product.Title}</Label>
        <Label>{`${(order.Quantity * props.product.Price).toFixed(2)} TRY`}</Label>
        <Slider
            min={1}
            max={15}
            step={1}
            defaultValue={1}
            showValue={true}
            onChange={(value) => {
                setOrder({ ...order, ["Quantity"]: value });
            }}
        />
    </div>);

    const successContent = (<div>
        <OrderItemMessage
            iconName="Accept"
            iconColor="#107c10"
            message={strings.SuccessMessage}
        />
    </div>);

    const errorContent = (<div>
        <OrderItemMessage
            iconName="HeartBroken"
            iconColor="#a80000"
            message={strings.ErrorMessage}
        />
    </div>);

    let content = null;
    if (dialogContentType === DialogContentType.Loading) content = <Spinner label={`${strings.LoadingMessage}...`} />;
    else if (dialogContentType === DialogContentType.Form) content = productContent;
    else if (dialogContentType === DialogContentType.SuccessMessage) content = successContent;
    else if (dialogContentType === DialogContentType.ErrorMessage) content = errorContent;

    const onClosedDialog = () => {
        setHideDialog(true);
        setOrder({ ...order, ["Quantity"]: 1 });
        setDialogContentType(DialogContentType.Form);
    };

    const onSave = () => {
        setDialogContentType(DialogContentType.Loading);

        props.service.buy(order.ProductId,order.Quantity)
        .then(()=>{
            setDialogContentType(DialogContentType.SuccessMessage);
        })
        .catch(()=>{
            setDialogContentType(DialogContentType.ErrorMessage);
        });
    };

    return (<div>
        <DefaultButton text={strings.BuyButtonLabel} onClick={() => { setHideDialog(false); }} allowDisabledFocus />
        <Dialog
            hidden={hideDialog}
            onDismiss={onClosedDialog}
            dialogContentProps={{
                type: DialogType.close
            }}
            modalProps={{
                isBlocking: false,
                styles: { main: { maxWidth: 450 } }
            }}
        >
            <div>
                {content}
            </div>

            <DialogFooter>
                <PrimaryButton disabled={dialogContentType !== DialogContentType.Form} onClick={onSave} text={strings.SaveButtonLabel} />
                <DefaultButton onClick={onClosedDialog} text={strings.CancelButtonLabel} />
            </DialogFooter>
        </Dialog>
    </div>);
}
