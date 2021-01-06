import React, { useState, useEffect } from 'react';
import { Table, Radio, Divider, Row, Button, Modal, Col, Form, Input, Space } from 'antd';
import './index.css'


export default function Demo() {

    const [selectionType, setSelectionType] = useState('checkbox');
    const [listItems, setListItems] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false)

    const tailLayout = {
        wrapperCol: { offset: 0, span: 24 },
    };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    useEffect(() => {
        async function fetchListItems() {
            const requestUrl = 'https://5fd1ce3eb485ea0016eeecfc.mockapi.io/api/user';
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();
            setListItems(responseJSON)
        }
        fetchListItems();
    }, [])

    function addEmployee() {
        if (listItems == null) {
            listItems = []
        }
        if (dish && count) {
                dishes.push({ dish, count });
            }
            // setState({ dishes: dishes });
            setDish(dishes)
            props.addDishes(dishes);
        }
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <Button style={{}}type="text" >Edit</Button>
                <Button type="text" danger  >Delete</Button>
              </Space>
            ),
          },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const openModal = () => {
        setIsOpenModal(true);
    };
    const closeModal = () => {
        setIsOpenModal(false);
    };

    const handleOk = () => {
        setIsOpenModal(false);
    };
    const handleCancel = () => {
        setIsOpenModal(false);
    };




    return (

        <div>

            {/* <Row>
                <Button type="primary" onClick={openModal}>
                    Add
                </Button>
            </Row> */}
            <Row>
                <Button type="primary" onClick={openModal}>
                    Add
                </Button>
                <Modal
                    title="Add new employee"
                    visible={isOpenModal}
                    footer={null}
                    onCancel={closeModal}
                >
                    <Form {...layout}
                    className="form"
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item {...tailLayout}
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your employee\'s name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailLayout}
                            label="Age"
                            name="age"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Employee\'s age!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item {...tailLayout}>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Form.Item>
                    </Form>

                </Modal>
            </Row>
            <Row>
                <Radio.Group
                    onChange={({ target: { value } }) => {
                        setSelectionType(value);
                    }}
                    value={selectionType}
                >
                </Radio.Group>

                <Divider />
                <Col span={18} offset={3}>
                    <Table
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={listItems}
                    />
                </Col>
            </Row>

        </div>
    );
}


