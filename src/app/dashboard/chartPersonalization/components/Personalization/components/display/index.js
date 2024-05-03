// Fahad Siddiqui
// Mareana Software
// Version 1
// Last modified - 03 March, 2022
import '../Personalization.scss';
import './style.scss';
<Checkbox>Remember me</Checkbox>
import {  Collapse,  Input, Switch,  Checkbox, Select, Row, Col } from 'antd';
import React from 'react';
import {
    DeleteTwoTone
} from '@ant-design/icons';
const { Panel } = Collapse;
const { Option } = Select;

const Display = ({figure,setFigure,legend,setLegend,axes,setAxes, selectedLayout, setselectedLayout}) => {

    const onLegendChange = (e) => {
        setLegend({ ...legend, options: { ...legend.options, show: e } })
        setselectedLayout(prevState => ({
            ...prevState,
            showlegend:e,
            type: 'scatter',
            mode: 'lines',
            // legend: {
            //     x: 1,
            //     xanchor:'right',
            //     y: 1,
            //   }
              legend: {"orientation": "v"}
          }));
    }

    return (
        <>
            <div className='display-section'>

                <Collapse
                    expandIconPosition='right'
                    ghost
                >
                    {/* Figure */}
                    <Panel header="Figure" key='5' style={{ background: 'white !important'}}>
                        <div className='figure-container'>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Lines:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" name='lines' checked={figure.lines} onChange={(e) => setFigure({ ...figure, lines: e })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Line Width:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Select defaultValue="1" onChange={(e) => setFigure({ ...figure, lineWidth: e })}>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Stair Cases:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={figure.stairCases} onChange={(e) => setFigure({ ...figure, stairCases: e })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Area Fill:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>

                                    <Select defaultValue="1" onChange={(e) => setFigure({ ...figure, areaFill: e })}>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Area Gradient:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>

                                    <Select defaultValue="1" onChange={(e) => setFigure({ ...figure, areaGradient: e })}>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Points:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={figure.points} onChange={(e) => setFigure({ ...figure, points: e })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Alert Treshold:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={figure.alertTreshold} onChange={(e) => setFigure({ ...figure, alertTreshold: e })} />
                                </Col>
                            </Row>
                            <div className='figure-inputs header'>
                                Panel Options
                            </div>
                            <div className='figure-inputs'>
                                <label>Title</label>
                                <Input value={figure.panelOptions.title} onChange={(e) => setFigure({ ...figure, panelOptions: { ...figure.panelOptions, title: e.target.value } })} />
                            </div>
                            <div className='figure-inputs'>
                                <label>Title Description</label>
                                <Input.TextArea maxLength={100} value={figure.panelOptions.desc} onChange={(e) => setFigure({ ...figure, panelOptions: { ...figure.panelOptions, desc: e.target.value } })} />
                            </div>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={24}>
                                    <label>Transparent Background:</label>
                                </Col>
                                <Col className="gutter-row" span={24}>
                                    <Switch size="small" checked={figure.panelOptions.transparentBackground} onChange={(e) => setFigure({ ...figure, panelOptions: { ...figure.panelOptions, transparentBackground: e } })} />
                                </Col>
                            </Row>
                        </div>
                    </Panel>

                    {/* Legend */}
                    <Panel header='Legend' key='6'>
                        <div className='figure-container'>
                            <div className="header option-header">Options</div>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Show:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={legend.options.show} onChange={onLegendChange} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>At table:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={legend.options.atTable} onChange={(e) => setLegend({ ...legend, options: { ...legend.options, atTable: e } })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>To right:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={legend.options.toRight} onChange={(e) => setLegend({ ...legend, options: { ...legend.options, toRight: e } })} />
                                </Col>
                            </Row>
                            <div className="header">Values</div>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Min:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={legend.values.min} onChange={(e) => setLegend({ ...legend, values: { ...legend.values, min: e } })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Max:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={legend.values.max} onChange={(e) => setLegend({ ...legend, values: { ...legend.values, max: e } })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Avg:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={legend.values.avg} onChange={(e) => setLegend({ ...legend, values: { ...legend.values, avg: e } })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Current:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={legend.values.current} onChange={(e) => setLegend({ ...legend, values: { ...legend.values, current: e } })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Total:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={legend.values.total} onChange={(e) => setLegend({ ...legend, values: { ...legend.values, total: e } })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Decimal:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={legend.values.decimal} onChange={(e) => setLegend({ ...legend, values: { ...legend.values, decimal: e } })} />
                                </Col>
                            </Row>
                            <div className="header">Hide Series</div>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>With only null:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={legend.hideSeries.withOnlyNull} onChange={(e) => setLegend({ ...legend, hideSeries: { ...legend.hideSeries, withOnlyNull: e } })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>with only Zero:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={legend.hideSeries.withOnlyZero} onChange={(e) => setLegend({ ...legend, hideSeries: { ...legend.hideSeries, withOnlyZero: e } })} />
                                </Col>
                            </Row>
                        </div>
                    </Panel>

                    {/* Axes */}
                    <Panel header='Axes' key='7'>
                        <div className='figure-container'>
                            <div className="header option-header">Left X</div>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Show:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={axes.leftX.show} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, show: e } })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Unit:</label>
                                </Col>
                                <Col className="gutter-row select-top" span={10}>
                                <Select defaultValue="Short" value={axes.leftX.unit} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, unit: e } })}>
                                    <Option value="Short">Short</Option>
                                    <Option value="Long">Long</Option>
                                </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Scale:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Select defaultValue="Linear" value={axes.leftX.scale} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, scale: e } })}>
                                    <Option value="Linear">Linear</Option>
                                </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Y Min:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Select defaultValue="Auto" value={axes.leftX.ymin} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, ymin: e } })}>
                                    <Option value="Auto">Auto</Option>
                                </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Y Max:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Select defaultValue="Auto" value={axes.leftX.ymax} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, ymax: e } })}>
                                    <Option value="Auto">Auto</Option>
                                </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Decimal:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Select defaultValue="Auto" value={axes.leftX.decimal} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, decimal: e } })}>
                                    <Option value="Auto">Auto</Option>
                                </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Label:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Select defaultValue="Auto" value={axes.leftX.label} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, label: e } })}>
                                    <Option value="Auto">Auto</Option>
                                </Select>
                                </Col>
                            </Row>
                            <div className="header">right X</div>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Show:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Switch size="small" checked={axes.rightX.show} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, show: e } })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Unit:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Select value={axes.rightX.unit} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, unit: e } })}>
                                    <Option value="Short">Short</Option>
                                    <Option value="Long">Long</Option>
                                </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Scale:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Select value={axes.rightX.scale} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, scale: e } })}>
                                    <Option value="Linear">Linear</Option>
                                </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Y Min:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Select value={axes.rightX.ymin} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, ymin: e } })}>
                                    <Option value="Auto">Auto</Option>
                                </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Y Max:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Select value={axes.rightX.ymax} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, ymax: e } })}>
                                    <Option value="Auto">Auto</Option>
                                </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Decimal:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Select value={axes.rightX.decimal} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, decimal: e } })}>
                                    <Option value="Auto">Auto</Option>
                                </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Label:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Select value={axes.rightX.label} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, label: e } })}>
                                    <Option value="Auto">Auto</Option>
                                </Select>
                                </Col>
                            </Row>
                            <div className="header">X - Axis</div>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Show:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Switch size="small" checked={axes.xaxis.show} onChange={(e) => setAxes({ ...axes, xaxis: { ...axes.xaxis, show: e } })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                <label>Unit:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                <Select value={axes.xaxis.unit} onChange={(e) => setAxes({ ...axes, xaxis: { ...axes.xaxis, unit: e } })}>
                                    <Option value="Short">Short</Option>
                                    <Option value="Long">Long</Option>
                                </Select>
                                </Col>
                            </Row>
                        </div>
                    </Panel>

                </Collapse>

            </div>
        </>
    );

}


export default Display;
