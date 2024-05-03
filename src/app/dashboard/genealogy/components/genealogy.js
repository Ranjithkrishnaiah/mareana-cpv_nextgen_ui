/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 16 March, 2022
 * @Last Changed By - Dinesh
 */

import React, { useState } from 'react';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import Filter from './genealogyFilter';
import TreePlot from './TreePlot/TreePlot';
import response from '../treePlot.json';
import forwardJson from '../forward.json';
import batchIcon from '../../../../assets/images/material.png';
import { useDispatch } from 'react-redux';
import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../../duck/actions/commonActions';
import {
  getBackwardData,
  getBatchInfo,
  getProcessInfo,
  getForwardData,
} from '../../../../services/genealogyService';
import popupicon from '../../../../assets/images/popup.png';
import GenealogyDrawer from '../components/genealogyDrawer/index.js';
import GenealogyDataTable from './genealogyDataTable';

const { TabPane } = Tabs;

const initialPanes = [
  { title: ' ', content: '', key: '1', closable: false, class: '' },
];
function Genealogy() {
  const [chartType, setchartType] = useState('backward');
  const [isBackward, setisBackward] = useState(true);
  const [isForward, setisForward] = useState(false);
  const [genealogyData, setGenealogyData] = useState([]);
  const [showTree, setShowTree] = useState(false);
  const [productCode, setProductCode] = useState('');
  const [activateKey, setActivateKey] = useState('1');
  const [isDrawer, setIsDrawer] = useState(false);
  const [batchInfo, setBatchInfo] = useState([]);
  const [processInfo, setProcessInfo] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [panes, setPanes] = useState(initialPanes);

  const [showView, setShowView] = useState(false);

  const dispatch = useDispatch();

  const onClickNode = (node) => {
    if (node.clickType === 'backward') {
      setGenealogyData([]);
      let _reqBackward = {
        levels: 5,
        batch_id: node.nodeId,
        backward: true,
      };
      getBackwardGeneology(_reqBackward);
      setActivateKey('2');
      setchartType('backward');
      setProductCode(node.product);
    } else if (node.clickType === 'forward') {
      setGenealogyData([]);
      let _reqFor = {
        levels: 5,
        batch_id: node.nodeId,
        backward: false,
      };
      getForwardGeneology(_reqFor);
      setActivateKey('2');
      setchartType('forward');
      setProductCode(node.product);
    } else if (node.clickType === 'view') {
      let nodeSplit = node.nodeId.split('|');
      let _reqBatchInfo = {
        ///batch-info?entity_type=Lims&relation_id=batch_to_lims&batch_id=ABV4103
        entity_type: 'Lims',
        relation_id: 'batch_to_lims',
        batch_id: 'ABV4103',
        // nodeSplit[2],
      };
      let _reqProcessInfo = {
        entity_type: 'Batch',
        process_order_id: '1338|1.02279687E8',
        relation_id: 'input_process_order_to_batch',
      };

      getNodeBatchInfo(_reqBatchInfo);
      getNodeProcessInfo(_reqProcessInfo);
      setIsDrawerOpen(true);
    }
  };

  const selectedParameter = (param) => {
    const product = param && param.product.split('-');
    const plant = param && param.plant.split('-');
    const selectedValue = plant[0] + '|' + product[0] + '|' + param.batch;
    setGenealogyData([]);
    if (param.treeType === 'Backward') {
      let _reqBack = {
        levels: 5,
        batch_id: '1338|1089084|394154',
        //selectedValue.replace(/\s/g, ''),
        backward: true,
      };
      //setActivateKey('2');
      setisBackward(true);
      setisForward(false);
      getBackwardGeneology(_reqBack);
      setchartType('backward');
      setProductCode(product[0]);
    } else {
      let _reqFor = {
        levels: 5,
        batch_id: selectedValue.replace(/\s/g, ''),
        backward: false,
      };
      //  setActivateKey('2');
      setisBackward(false);
      setisForward(true);
      getForwardGeneology(_reqFor);
      setchartType('forward');
      setProductCode(product[0]);
    }

    initialPanes.push({
      title: '',
      content: '',
      key: '2',
      closable: true,
      class: 'tree-wrap site-drawer-render-in-current-wrapper',
    });
    setPanes(initialPanes);
  };
  /**
   * TODO: get backward genealogy data from selected parameters or from on node click
   */
  const getBackwardGeneology = async (_reqBack) => {
    try {
      dispatch(showLoader());

      const backwardRes = await getBackwardData(_reqBack);

      if (backwardRes.length > 0) {
        setGenealogyData(backwardRes);
        setisBackward(true);
        setisForward(false);
        setShowTree(true);
        setActivateKey('2');
        dispatch(hideLoader());
      } else if (backwardRes.status === 400) {
        setGenealogyData([]);
        dispatch(hideLoader());
        dispatch(showNotification('error', 'No Data Found'));
        setActivateKey('1');
      }
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', error));
    }
  };
  /**
   * TODO: get forward genealogy data from selected parameters or from on node click
   */
  const getForwardGeneology = async (_reqFor) => {
    try {
      dispatch(showLoader());
      const forwardRes = await getForwardData(_reqFor);
      if (forwardRes.length > 0) {
        setGenealogyData(forwardRes);
        setisBackward(false);
        setisForward(true);
        setShowTree(true);
        setActivateKey('2');
        dispatch(hideLoader());
      } else if (forwardRes.status === 400) {
        dispatch(hideLoader());
        dispatch(showNotification('error', 'No Data Found'));
        setActivateKey('1');
      }

      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', error));
    }
  };

  /**
   * TODO: get bacth info of node
   */
  const getNodeBatchInfo = async (_reqBatch) => {
    try {
      dispatch(showLoader());
      const batchRes = await getBatchInfo(_reqBatch);
      setBatchInfo(batchRes);
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', 'No Data Found'));
    }
  };

  /**
   *TODO: get Process Info of node
   */
  const getNodeProcessInfo = async (_reqProcessInfo) => {
    try {
      dispatch(showLoader());
      const processRes = await getProcessInfo(_reqProcessInfo);
      if (processRes.length > 0) {
        setProcessInfo(processRes);
      }
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', 'No Data Found'));
    }
  };
  const handleChangeTab = (activateKey) => {
    setActivateKey(activateKey);
  };

  const isDrawerVisible = (val) => {
    setIsDrawer(val);

    setShowView(true);
    setIsDrawerOpen(false);
    initialPanes.push({
      title: '',
      content: '',
      key: '3',
      closable: true,
      class: '',
    });
    setPanes(initialPanes);
    setActivateKey('3');
  };
  const onEditTab = (targetKey, action) => {
    remove(targetKey);
  };

  const remove = (targetKey) => {
    let newActiveKey = activateKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActivateKey(newActiveKey);
  };
  console.log('genealogyData', genealogyData);
  return (
    <div className='custom-wrapper'>
      <div className='sub-header'>
        <div className='sub-header-title'>
          <ArrowLeftOutlined className='header-icon' />
          <span className='header-title'>Genealogy</span>
        </div>
      </div>
      <div className='custom-content-layout'>
        <Tabs
          className='custom-tabs'
          activeKey={activateKey}
          onChange={handleChangeTab}
          onEdit={onEditTab}
          hideAdd
          type='editable-card'
        >
          {panes &&
            panes.map((item) => (
              <TabPane
                tab={
                  item.key === '1' ? (
                    'Select Parameter'
                  ) : item.key === '2' ? (
                    <>
                      <p className='tab-label'>
                        <img className='tree-type-icon' src={batchIcon} />
                        {productCode} - {chartType}
                      </p>
                    </>
                  ) : item.key === '3' ? (
                    <>
                      <p className='tab-label'>
                        <img className='tree-type-icon' src={popupicon} />
                        Popout - {productCode}
                      </p>
                    </>
                  ) : (
                    ''
                  )
                }
                key={item.key}
                closable={item.closable}
                className={item.class}
              >
                {item.key === '1' ? (
                  <Filter parameterDetails={selectedParameter} />
                ) : item.key === '2' ? (
                  <>
                    {genealogyData && genealogyData.length > 0 && (
                      <TreePlot
                        chartType={chartType}
                        Backward={isBackward}
                        Forward={isForward}
                        data={genealogyData[0]}
                        nodeClick={onClickNode}
                        //handleChartClick={handleClickNode}
                      />
                    )}
                    <GenealogyDrawer
                      drawerVisible={isDrawerOpen}
                      isDrawer={isDrawerVisible}
                      batchInfo={batchInfo}
                      processInfo={processInfo}
                    />
                  </>
                ) : item.key === '3' ? (
                  <div className='popout-table'>
                    <div className='drawer-title'>
                      <img className='tree-type-icon' src={batchIcon} />
                      <p>35735735 - Material</p>
                      <span>
                        <DownloadOutlined />
                      </span>
                    </div>
                    <GenealogyDataTable
                      className={
                        isDrawer ? 'drawer-collapse' : 'popout-collapse'
                      }
                      batchInfo={batchInfo}
                      processInfo={processInfo}
                    />
                  </div>
                ) : (
                  ''
                )}
              </TabPane>
            ))}
        </Tabs>
      </div>
    </div>
  );
}

export default Genealogy;
