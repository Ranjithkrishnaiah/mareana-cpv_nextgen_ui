import React from 'react';
import { Card } from 'antd';
import { BarChartOutlined ,ProjectOutlined,LayoutOutlined,FileDoneOutlined,FolderOpenOutlined,FileSyncOutlined} from '@ant-design/icons';
import './styles.scss';

 
const customCard = (props) => {
    return (
        <div className={props.count===0?'approval-cards-disabled':props.active===props.desc?'approval-cards-active':'approval-cards'} >
            <div className={props.count===0?'circle_icon-disabled':'circle_icon'} >
                {props.desc=='View Approval' && <LayoutOutlined />}
                {props.desc=='Param Data Approval' && <ProjectOutlined />}
                {props.desc=='Chart Approval' && <BarChartOutlined />}
                {props.desc=='Report Approval' && <FileDoneOutlined />}
                {props.desc=='PBR Approval' && <FolderOpenOutlined />}
                {props.desc=='Data Load Screen Approval' && <FileSyncOutlined />}
            </div>
            <div className={props.count===0?'card_desc-disabled':'card_desc'}>
                <p className={props.count===0?'approve-title-disabled':'approve-title'}>{props.count}</p>
                <p className={props.count===0?'approve-desc-disabled':'approve-desc'}>{props.desc}</p>
            </div>

        </div>

    )
}

export default customCard;
