import React, { useEffect, useState } from 'react';
import './styles.scss';

import {
    ArrowLeftOutlined,
    PlusOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import {
    Card,
    Col,
    Row,
    Input,
    Divider,
    Table,
    Modal,
    Button,
    Form,
    Space,
    Radio,
} from 'antd';
import Highlighter from 'react-highlight-words';
import illustrations from '../../../../assets/images/banner-pbr.svg';
import newTemplateModal from '../../../../assets/images/newTemplateModal.svg';
import pdfIcon from '../../../../assets/images/pdfIcon.svg';
import { useHistory } from 'react-router-dom';

const { Search } = Input;

function paperBatchRecords() {
    let history = useHistory();
    const initialTableDataSource = [
        {
            key: '1',
            name: 'Template001',
            id: 'ID00001',
            creator: 'Nelson',
            createdOn: '30 March 2022',
        },
        {
            key: '2',
            name: 'Template002',
            id: 'ID00002',
            creator: 'Derek',
            createdOn: '1 November 2021',
        },
        {
            key: '3',
            name: 'Template003',
            id: 'ID00003',
            creator: 'Nelson',
            createdOn: '1 March 2021',
        },
        {
            key: '4',
            name: 'Template004',
            id: 'ID00004',
            creator: 'Derek',
            createdOn: '1 November 2021',
        },
        {
            key: '5',
            name: 'Template005',
            id: 'ID00005',
            creator: 'Derek',
            createdOn: '1 March 2021',
        },
    ];

    const [resultDate, setResultDate] = useState('');
    const [newTemplateModalVisible, setNewTemplateModalVisible] =
        useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [tableDataSource, setTableDataSource] = useState(
        initialTableDataSource
    );
    const [form] = Form.useForm();

    useEffect(() => {
        updateDate();
    }, []);

    ////////////////////////
    function getColumnSearchProps(dataIndex) {
        return {
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        // ref={node => {
                        //   this.searchInput = node;
                        // }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        style={{
                            marginBottom: 8,
                            display: 'block',
                        }}
                    />
                    <Space>
                        <Button
                            type='primary'
                            onClick={() =>
                                handleSearch(selectedKeys, confirm, dataIndex)
                            }
                            icon={<SearchOutlined />}
                            size='small'
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => handleReset(clearFilters)}
                            size='small'
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                        <Button
                            type='link'
                            size='small'
                            onClick={() => {
                                confirm({ closeDropdown: false });
                                setSearchText(selectedKeys[0]);
                                setSearchedColumn(dataIndex);
                            }}
                        >
                            Filter
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined
                    style={{ color: filtered ? '#1890ff' : undefined }}
                />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    // setTimeout(() => this.searchInput.select());
                }
            },
            render: (text) =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: '#ffc069',
                            padding: 0,
                        }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                ) : (
                    text
                ),
        };
    }

    function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    }

    function handleReset(clearFilters) {
        clearFilters();
        setSearchText('');
    }
    //////////////////////

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
            sorter: (a, b) => a.id.length - b.id.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            ...getColumnSearchProps('creator'),
            sorter: (a, b) => a.creator.length - b.creator.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Created on',
            dataIndex: 'createdOn',
            key: 'createdOn',
            ...getColumnSearchProps('createdOn'),
            sorter: (a, b) => a.createdOn.length - b.createdOn.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];

    const updateDate = () => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const latestDate = date.getDate();
        const year = date.getFullYear();
        const resultDate = month + ' ' + latestDate + ',' + ' ' + year;
        setResultDate(resultDate);
    };

    const newTemplateModalHandler = () => {
        setNewTemplateModalVisible(true);
    };

    const handleCancel = () => {
        setNewTemplateModalVisible(false);
    };

    const handleTemplateSubmit = () => {
        history.push('/dashboard/pbr_template');
    };

    function globalTemplateSearch(value) {
        if (!value) {
            setTableDataSource(initialTableDataSource);
        } else {
            const filterdDataArr = tableDataSource.filter((o) =>
                Object.keys(o).some((k) =>
                    String(o[k]).toLowerCase().includes(value.toLowerCase())
                )
            );
            setTableDataSource(filterdDataArr);
        }
    }

    return (
        <div className='pbr-container'>
            <div className='custom-wrapper pbr-wrapper'>
                <div className='sub-header'>
                    <div className='sub-header-title'>
                        <ArrowLeftOutlined className='header-icon' />
                        <span className='header-title'>
                            Paper Batch Records
                        </span>
                    </div>
                </div>
            </div>
            <Row className='p-28'>
                <Col span={24} className='banner'>
                    <Card bordered={false}>
                        <div className='card-body-div'>
                            <div className='text-descp'>
                                <h2>Howdy {localStorage.getItem('user')},</h2>
                                <p>
                                    In the mood to draw up some snippets today?
                                </p>
                            </div>
                            <img src={illustrations} alt='banner' />
                            <h6>{resultDate}</h6>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row className='landing-content p-28'>
                <Col span={24}>
                    <Card bordered={false}>
                        <Row>
                            <Col span={6} />
                            <Col span={12} className='p36'>
                                <Search
                                    placeholder='Search by template ID, name, creator or date of creation'
                                    allowClear
                                    enterButton='Search'
                                    size='large'
                                    onSearch={globalTemplateSearch}
                                />
                            </Col>
                            <Col span={6} />
                        </Row>
                        <Row>
                            <Col span={6} />
                            <Col span={12} className='p36'>
                                <div
                                    className='create-new'
                                    onClick={newTemplateModalHandler}
                                >
                                    <PlusOutlined />
                                    <p>Create new template</p>
                                </div>
                            </Col>
                            <Col span={6} />
                        </Row>
                        <Row className='recent-charts'>
                            <Col span={6} />
                            <Col span={12} className='p36'>
                                <h3>Recently created templates</h3>
                                <Divider />
                                <div className='pbrTemplates-tableBlock'>
                                    <Table
                                        className='pbrTemplates-table'
                                        pagination={false}
                                        columns={columns}
                                        dataSource={tableDataSource}
                                        // rowKey={(record) => record.id}
                                    />
                                </div>
                            </Col>
                            <Col span={6} />
                        </Row>
                    </Card>
                </Col>
            </Row>

            <Modal
                className='newTemplateModal'
                title='Create new template'
                centered
                visible={newTemplateModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key='submit'
                        type='primary'
                        className='templateSubmitBtn'
                        onClick={handleTemplateSubmit}
                    >
                        Lets Go!
                    </Button>,
                ]}
                width={750}
            >
                <div className='newTemplate-modalBody'>
                    <Row className='recent-charts'>
                        <Col span={12} className='newTemplate-imgBlock'>
                            <img src={newTemplateModal} alt='banner' />
                        </Col>
                        <Col span={12} className='newTemplate-contentBlock'>
                            <Form
                                layout='vertical'
                                form={form}
                                className='formNewTemplate'
                            >
                                <div className='formNewTemplateDiv'>
                                    <Form.Item
                                        label='Template name'
                                        name='templateName'
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label='Status' name='status'>
                                        <Input placeholder='Draft' disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label='Material number'
                                        name='materialNumber'
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Batch number'
                                        name='batchNumber'
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>

                                <Radio.Group
                                    // onChange={onChange}
                                    defaultValue='a'
                                    className='radioPdfBlock'
                                >
                                    <Radio.Button value='a'>
                                        <div className='pdfListBlock'>
                                            <img src={pdfIcon} alt='pdfIcon' />
                                            <span>loremipsum23.pdf</span>
                                        </div>
                                    </Radio.Button>
                                    <Radio.Button value='b'>
                                        <div className='pdfListBlock'>
                                            <img src={pdfIcon} alt='pdfIcon' />
                                            <span>loremipsum23.pdf</span>
                                        </div>
                                    </Radio.Button>
                                    <Radio.Button value='c'>
                                        <div className='pdfListBlock'>
                                            <img src={pdfIcon} alt='pdfIcon' />
                                            <span>loremipsum23.pdf</span>
                                        </div>
                                    </Radio.Button>
                                    <Radio.Button value='d'>
                                        <div className='pdfListBlock'>
                                            <img src={pdfIcon} alt='pdfIcon' />
                                            <span>loremipsum23.pdf</span>
                                        </div>
                                    </Radio.Button>
                                </Radio.Group>
                                {/* <div className='pdfListBlock'>
                                    <img src={pdfIcon} alt='pdfIcon' />
                                    <span>loremipsum23.pdf</span>
                                </div>
                                <div className='pdfListBlock'>
                                    <img src={pdfIcon} alt='pdfIcon' />
                                    <span>loremipsum23.pdf</span>
                                </div>
                                <div className='pdfListBlock'>
                                    <img src={pdfIcon} alt='pdfIcon' />
                                    <span>loremipsum23.pdf</span>
                                </div>
                                <div className='pdfListBlock'>
                                    <img src={pdfIcon} alt='pdfIcon' />
                                    <span>loremipsum23.pdf</span>
                                </div> */}
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    );
}

export default paperBatchRecords;
