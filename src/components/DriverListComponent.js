import React, { Component } from 'react';
import {  Button, Select, Row, Col, Table,Divider, DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Value',
        dataIndex: 'value',
        key: 'value'
    }
];

class DriverComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drivers: [],
            requestParams: {},
            data:[]
        }
    }


    handleSelectBoxChange = (driverName) => {
        const { requestParams } = this.state;
        requestParams['driverName'] = driverName;
        this.setState({ requestParams });

    }

    extraDriversList = () => {
        return this.state.drivers.map(el => <Option key={el.name} value={el.name}>{el.name}</Option>)
    }


    render() {
        return <>
            <Row style={{ marginTop: '64px' }}>
                <Col offset={3} span={18}>
                    <Row>
                        <Col span={2}> Select Driver </Col>
                        <Col span={6}>
                            <Select style={{ width: '90%' }} onChange={this.handleSelectBoxChange} >
                                {this.extraDriversList()}
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col offset={3} span={18} style={{marginTop: '32px'}}>
                    <Row>
                        <Col span={2}> Select Time </Col>
                        <Col span={8}>
                            <Space direction="vertical" size={12}>
                                <RangePicker showTime />
                            </Space>
                        </Col>
                        <Col span={10}>
                            <Button type="primary">Search</Button>
                        </Col>
                    </Row>
                </Col>
                <Col offset={3} span={18} style={{ marginTop: '24px' }}>
                    <Divider orientation="left" plain>Data Table</Divider>
                </Col>

                <Col offset={3} span={18}>
                    <Table style={{ marginTop: '32px' }} bordered={true} columns={columns} dataSource={this.state.data} rowKey="id" />
                </Col>

            </Row>
        </>


    }
}

export default DriverComponent;