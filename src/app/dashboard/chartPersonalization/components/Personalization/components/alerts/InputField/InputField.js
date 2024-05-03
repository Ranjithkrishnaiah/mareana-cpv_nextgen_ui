import React from 'react';

import { Input } from 'antd';
import './styles.scss';

const InputField = (props) => {
    return (
        <div className='alert_field'>
            <p>{props.label}</p>
                <Input
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChangeInput}
                disabled={props.disabled}
                onClick={props.onChangeClick}
                type={props.type}
                suffix={props.suffix}
            />
        
            
        </div>
    )



};

export default InputField;
