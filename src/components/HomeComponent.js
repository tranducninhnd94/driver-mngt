import React, { Component } from 'react';
import { Modal, Button, Select, Row, Col, Table, Form, Input, Divider, Popconfirm } from 'antd';

import { systemContants } from '../utils/system.contants';

import { systemService } from '../service/system.service';

const { Option } = Select;


const layout = {
    layout: 'horizontal',
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
};

const tailLayout = {
    wrapperCol: {
        offset: 4
    },
};


class HomeComponent extends Component {
    constructor(props) {
        super(props);

        let arrObjet = [];

        for (const [key, value] of Object.entries(systemContants.objects)) {
            arrObjet.push(key);
        }

        this.state = {
            isCreatingModalVisible: false,
            isUpdatingModalVisible: false,
            arrObjet: arrObjet,
            objectNameSelected: '',
            objectSelected: {},
            requestParams: {},
            columns: [],
            data: [],
            formItems: null
        }
    }

    findPropertyiesByObjectName = (objectName) => {

        for (const [key, value] of Object.entries(systemContants.objects)) {
            if (key === objectName)
                return value;
        }

        return [];
    }

    changeTableColumns = (objectName) => {
        const propeties = this.findPropertyiesByObjectName(objectName);
        let columns = [];

        // push column index
        columns.push({ title: 'STT', dataIndex: 'stt', key: 'stt', render: (text, row, index) => (index + 1) });

        propeties.forEach(el => columns.push({ title: el, dataIndex: el, key: el }));
        this.setState({ columns });

        //push column actionÍ
        columns.push({
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id, record, index) => (<>
                <Button key="update" type="link" onClick={() => this.setState({ isUpdatingModalVisible: true, objectSelected: record })}>Update</Button>
                <Popconfirm
                    key="reject"
                    title="Are you sure to delete this record?"
                    onConfirm={() => {
                        this.deleteObject(id);
                    }}
                    okText="Yes"
                    cancelText="No">
                    <Button key="delete" type="link" danger>Delete</Button>
                </Popconfirm>

            </>)
        })
    }

    changeFormItems = (objectName) => {
        const propeties = this.findPropertyiesByObjectName(objectName);
        let formItems = propeties.map(el => {
            return (
                <Form.Item
                    key={el}
                    name={el}
                    label={el}
                    rules={[]}>
                    <Input />
                </Form.Item>
            );
        })

        this.setState({ formItems });
    }


    extraObject = () => {
        return this.state.arrObjet.map(el => <Option key={el} value={el}>{el}</Option>)
    }


    handleSelectBoxChange = (objectName) => {
        this.setState({ objectNameSelected: objectName });
        this.changeTableColumns(objectName);
        this.changeFormItems(objectName);
        this.loadDataTable(objectName);
    }


    loadDataTable = (objectName) => {

        const { requestParams } = this.state;

        let data = [
        ];

        systemService.loadObject(objectName, requestParams)
            .then(response => {
                data = response.data.data;;
            }).catch(error => {
                console.log("error: ", error);
            })

        this.setState({ data });
    }

    createObject = (body) => {
        console.log("createObject with body: ", body);
        const { objectNameSelected } = this.state;
        systemService.createObject({ ...body, objectType: objectNameSelected })
            .then(result => {
                console.log("result: ", result);

                //load data
                this.loadDataTable(objectNameSelected);
                this.setState({ isCreatingModalVisible: false });
            }).catch(error => {
                console.log("error: ", error);
            })
    }

    updateObject = (body) => {
        console.log("updateObject with body: ", body);
        const { objectNameSelected } = this.state;
        systemService.updateObject({ ...body, objectType: objectNameSelected })
            .then(result => {
                console.log("result: ", result);

                //load data
                this.loadDataTable(objectNameSelected);
                this.setState({ isUpdatingModalVisible: false });

            }).catch(error => {
                console.log("error: ", error);
            })
    }

    deleteObject = (id) => {
        console.log("deleteObject with id: ", id);
        const { objectNameSelected } = this.state;
        systemService.deleteObject(objectNameSelected, id)
            .then(result => {
                console.log("result: ", result);

                //load data
                this.loadDataTable(objectNameSelected);

            }).catch(error => {
                console.log("error: ", error);
            })
    }

    loadOneObject = (id) => {
        console.log("deleteObject with id: ", id);
        const { objectNameSelected } = this.state;
        systemService.loadOneObject(objectNameSelected, id)
            .then(result => {
                console.log("result: ", result);
            }).catch(error => {
                console.log("error: ", error);
            })
    }

    searchObject = (body) => {
        console.log("search with body: ", body);
        let requestParams = {};
        for (const [key, value] of Object.entries(body)) {
            if (value) {
                requestParams[key] = value;
            }
        }

        this.setState({ requestParams });

        let data = [];
        const { objectNameSelected } = this.state;

        systemService.loadObject(objectNameSelected, body)
            .then(response => {
                data = response.data.data;
                this.setState({ data });
            }).catch(error => {
                console.log("error: ", error);
            })
    }

    render() {
        return <>
            <Row style={{ marginTop: '64px' }}>
                <Col offset={3} span={18}>
                    <Row>
                        <Col span={2}>
                            Select Object
                    </Col>
                        <Col span={6}>
                            <Select style={{ width: '90%' }} onChange={this.handleSelectBoxChange} >
                                {this.extraObject()}
                            </Select>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" style={{ marginLeft: '24px' }} onClick={() => this.setState({ isCreatingModalVisible: true })}>Create New Object</Button>
                        </Col>
                    </Row>
                </Col>

                <Col offset={3} span={18} style={{ marginTop: '24px' }}>
                    <Divider orientation="left" plain>Search properties</Divider>
                </Col>

                <Col offset={3} span={18} style={{ marginTop: '8px' }} >
                    <Form ref={this.formRef} name="control-ref"
                        onFinish={this.searchObject}
                        initialValues={{}} preserve={false}
                        layout="horizontal"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 14 }}>
                        {this.state.formItems}
                        {this.state.formItems ? <Form.Item wrapperCol={{ offset: 2 }}>
                            <Button type="primary" htmlType="submit">
                                Search
                        </Button>
                        </Form.Item> : ''}
                    </Form>
                </Col>

                <Col offset={3} span={18} style={{ marginTop: '24px' }}>
                    <Divider orientation="left" plain>Data Table</Divider>
                </Col>

                <Col offset={3} span={18}>
                    <Table style={{ marginTop: '32px' }} bordered={true} columns={this.state.columns} dataSource={this.state.data} rowKey="id" />
                </Col>

            </Row>


            <Modal title="Create Object"
                destroyOnClose={true}
                visible={this.state.isCreatingModalVisible}
                onOk={() => this.setState({ isCreatingModalVisible: false })}
                onCancel={() => this.setState({ isCreatingModalVisible: false })}
                footer={null} width={800}>

                <Form  {...layout} ref={this.formRef} name="control-ref"
                    onFinish={this.createObject}
                    initialValues={{}} preserve={false}>

                    {this.state.formItems}
                    {this.state.formItems ? <Form.Item  {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Create Object
                        </Button>
                    </Form.Item> : ''}
                </Form>

            </Modal>

            <Modal title="Update Object"
                destroyOnClose={true}
                visible={this.state.isUpdatingModalVisible}
                onOk={() => this.setState({ isUpdatingModalVisible: false })}
                onCancel={() => this.setState({ isUpdatingModalVisible: false })} footer={null} width={800}>

                <Form  {...layout} ref={this.formRef} name="control-ref"
                    onFinish={this.updateObject}
                    initialValues={this.state.objectSelected} preserve={false}>

                    {this.state.formItems}
                    {this.state.formItems ? <Form.Item  {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Update Object
                        </Button>
                    </Form.Item> : ''}
                </Form>

            </Modal>

        </>

    }

}

export default HomeComponent;