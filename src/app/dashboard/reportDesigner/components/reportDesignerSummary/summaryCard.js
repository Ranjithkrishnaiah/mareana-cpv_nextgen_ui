import React from 'react';

import { Card } from 'antd';

import './style.scss';
import TableSummary from './summaryTable';

function Summary() {
    return (
        <div>
            <Card className = "summary-card" >
                <p className = "summary-note">Note</p>
                <p>
                    <ul>
                        <li className = "summary-li">
                            To Create Multiple sections, please click on add multiple sections
                        </li>
                        <li className = "summary-li">
                            To Create Multiple sections, please click on add multiple sections
                        </li>
                    </ul>
                </p>
                <TableSummary/>
            </Card>

        </div>

    );
}

export default Summary;