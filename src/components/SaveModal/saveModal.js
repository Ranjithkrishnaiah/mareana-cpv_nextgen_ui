import React, { useState } from 'react';
import { Modal } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';


function SaveModal(props) {

    const {isSave,setIsSave,id} = props

    const handleCancel = () => {
        setIsSave(false);
    };

    return (
        <div>
            <Modal
                visible={isSave}
                title="Congartulations"
                width={500}
                mask={true}
                onCancel={handleCancel}
                centered={true}
                footer={null}
            >
                <div>
                    <center>
                    <CheckCircleOutlined
                    className='circleIcon'
                    style={{color:'green',fontSize:'40px'}}
                  /> <br/>
                    { id ? <b style={{marginTop:'10px'}}>Report ID :{id}</b> :<></> }
                     <br/>
                        <p style={{marginTop:'7px'}}>Changes have been successfully saved </p>
                    </center>
                </div>

            </Modal>
        </div>
    );
}

export default  SaveModal;