import * as React from 'react';
import Button from '../Button/Button';
require('./Modal.scss');

export const Modal = (props: any) => {
    const closeBtn = props.hideClose ? '' : (<Button className="header-container__close-btn" onClick={props.onCloseClick}>X</Button>);
    return (
        <div className={ `modal ${props.name}-modal`}>
            <div>
                <div className="header-container">
                    <h3>{props.title}</h3>
                    {closeBtn}
                </div>
                {props.children}
            </div>
        </div>
    );
}
