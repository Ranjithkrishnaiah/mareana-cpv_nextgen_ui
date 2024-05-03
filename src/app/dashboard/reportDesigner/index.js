import React, { useEffect } from 'react';
import DesignCharts from './components/reportDesignerNew';
import ReportGenerator from '../reportGenerator/components/reportGenerator';
import {useSelector,useDispatch} from 'react-redux'

function Report()
{
    const screen = useSelector((state)=>state.reportDesignerReducer.screen)
    console.log(screen)

    useEffect(()=>
    {

    },[])
    return (
        <div>
            {screen ?
           <div><ReportGenerator/></div> :
          <div><DesignCharts/></div> 
            }

        </div>
    )
}
export default Report;