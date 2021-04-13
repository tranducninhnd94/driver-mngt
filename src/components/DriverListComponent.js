import React, { Component } from 'react';
import { Button, Select, Row, Col, Table, Divider, DatePicker, Space } from 'antd';

import { systemService } from '../service/system.service';

const { RangePicker } = DatePicker;
const { Option } = Select;

const dateFormat = 'DD/MM/YYYY';

const columns = [
    {
        title: 'key',
        dataIndex: 'key',
        key: 'key'
    },
    {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        render: value => JSON.stringify(value)
    }
];

class DriverComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectBoxTypes: [
                { name: 'Drivers & Salary', type: 'driver_salary' },
                { name: 'Vehicle & Profit', type: 'vehicle_profit' },
                { name: 'Vehicle & Guarantee', type: 'vehicle_guarantee' }
            ],
            requestParams: {},
            data: [
               
            ]
        }
    }


    setStartEndDate = (date, dateString) => {
        const { requestParams } = this.state;
        requestParams['startedDate'] = dateString[0];
        requestParams['endedDate'] = dateString[1];
        this.setState({ requestParams });
    }


    handleSelectBoxChange = (type) => {
        const { requestParams } = this.state;
        requestParams['type'] = type;
        this.setState({ requestParams });

    }

    extraSelectBoxTypes = () => {
        return this.state.selectBoxTypes.map(el => <Option key={el.type} value={el.type}>{el.name}</Option>)
    }

    searchData = () => {
        const { requestParams } = this.state;
        let data = [];
        console.log("requestparams: ", requestParams);

        systemService.searchData(requestParams)
            .then(response => {
                data = response.data;
                this.setState({data});
            }).catch(error => {
                console.log("error: ", error);
            })
    }


    render() {
        return <>
            <Row style={{ marginTop: '64px' }}>
                <Col offset={3} span={18}>
                    <Row>
                        <Col span={2}> Select Driver </Col>
                        <Col span={6}>
                            <Select style={{ width: '90%' }} onChange={this.handleSelectBoxChange} >
                                {this.extraSelectBoxTypes()}
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col offset={3} span={18} style={{ marginTop: '32px' }}>
                    <Row>
                        <Col span={2}> Select Time </Col>
                        <Col span={8}>
                            <Space direction="vertical" size={12}>
                                <RangePicker onChange={this.setStartEndDate} format={dateFormat} />
                            </Space>
                        </Col>
                        <Col span={10}>
                            <Button type="primary" onClick={this.searchData}>Search</Button>
                        </Col>
                    </Row>
                </Col>
                <Col offset={3} span={18} style={{ marginTop: '24px' }}>
                    <Divider orientation="left" plain>Data Table</Divider>
                </Col>

                <Col offset={3} span={18}>
                    <Table style={{ marginTop: '32px' }} bordered={true} columns={columns} dataSource={this.state.data} rowKey="key" />
                </Col>

            </Row>
        </>


    }
}

export default DriverComponent;