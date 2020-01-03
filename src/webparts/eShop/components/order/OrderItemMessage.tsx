import * as React from 'react';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { Label } from 'office-ui-fabric-react/lib/Label';


export interface IOrderItemMessageProps {
    message: string; 
    iconName: string; 
    iconColor: string;
  }

export default function OrderItemMessage(props:IOrderItemMessageProps) {
    const iconClass = mergeStyles({
        fontSize: 70,
        height: 50,
        width: 50,
        margin: '0 25px',
        color: props.iconColor
    });

    const containerClass = mergeStyles({
        textAlign:"center"
    });

    return (<div className={containerClass}>
        <Icon
            iconName={props.iconName}
            className={iconClass}
        />
        <Label>{props.message}</Label>
    </div>);
}
