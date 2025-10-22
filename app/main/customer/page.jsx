'use client'
import fetcher from "@/app/lib/fetcher";
import { DeleteOutlined, EditOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, Skeleton, Table } from "antd";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '@ant-design/v5-patch-for-react-19';
import useSWR, { mutate } from "swr";
import axios from "axios";
import { useState } from "react";

const CustomersPage = () => {
    const { data, error, isLoading } = useSWR('/customer', fetcher)
    console.log(data, error)
    const [open, setOpen] = useState(false)

    const addCustomer = (values) => {

    }

    if (isLoading)
        return <Skeleton />

    const column = [
        {
            key: 'fullname',
            title: 'Fullname',
            dataIndex: 'fullname'
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email'
        },
        {
            key: 'mobile',
            title: 'Mobile',
            dataIndex: 'mobile'
        },
        {
            key: 'actions',
            title: 'Actions',
            render: (item) => {
                return (
                    <div className="flex gap-2">
                        <div>
                            <Button icon={<EditOutlined />} className="!text-violet-600 !border-violet-600 !border-2" />
                        </div>
                        <div>
                            <Button onClick={() => deleteCustomers(item._id)} icon={<DeleteOutlined />} className="!text-rose-600 !border-rose-600 !border-2" />
                        </div>
                    </div>
                )
            }
        }
    ]

    const deleteCustomers = async (id) => {
        await axios.delete(`/customer/${id}`)
        mutate('/customer')
    }
    return (
        <>
            <div>
                <div className="flex gap-2 mb-5">
                    <Input 
                    placeholder="Search Customer" 
                    prefix={<SearchOutlined
                    className="!text-gray-500 mr-1"/>} />

                    <Button 
                    size="large" 
                    type="primary" 
                    className="!bg-indigo-600" 
                    icon={<UserAddOutlined/>}
                    onClick={()=>setOpen(true)}>Add Customer</Button>
                </div>
                <Divider/>
                <Table
                    columns={column}
                    dataSource={data}
                    rowKey="_id"
                />
                <Modal onCancel={()=>setOpen(false)} maskClosable={false} open={open} footer={null} title="Add Customers">
                    <Divider />

                    <Form layout="vertical" onFinish={addCustomer}>
                        <Form.Item
                            label="Customers Name:"
                            rules={[{ required: true }]}
                            name="fullname"
                        >
                            <Input size="large" placeholder="Mr. Gururaj" />
                        </Form.Item>

                        <Form.Item
                            label="Email:"
                            rules={[{ required: true }]}
                            name="email"
                        >
                            <Input size="large" placeholder="example@gmail.com" />
                        </Form.Item>

                        <Form.Item
                            label="Mobile:"
                            rules={[{ required: true }]}
                            name="mobile"
                        >
                            <PhoneInput
                                country={'in'}
                                inputClass="!w-full"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button icon={<UserAddOutlined />} type="primary" size="large" htmlType="submit">Add Now</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default CustomersPage;
