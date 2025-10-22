'use client'
import fetcher from "@/app/lib/fetcher";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, Skeleton, Table } from "antd";
import useSWR, { mutate } from "swr";
import axios from "axios";

const CustomersPage = () => {
    const { data, error, isLoading } = useSWR('/customer', fetcher)
    console.log(data, error)

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
                        <Button icon={<EditOutlined />} className="!text-violet-600 !border-violet-600 !border-2"/>
                    </div>
                    <div>
                        <Button onClick={()=>deleteCustomers(item._id)} icon={<DeleteOutlined/>} className="!text-rose-600 !border-rose-600 !border-2"/>
                    </div>
                   </div>
                )
            }
        }
    ]

    const deleteCustomers = async (id)=>{
        await axios.delete(`/customer/${id}`)
        mutate('/customer')
    }
    return (
        <>
            <div>
                <Table
                    columns={column}
                    dataSource={data}
                    rowKey="_id"
                />
                <Modal open footer={null} title="Add Customers">
                <Divider/>

                <Form layout="vertical">
                    <Form.Item
                        label="Customers Name:"  
                        rules={[{required : true}]} 
                        name="fullname"                 
                    >
                        <Input size="large" placeholder="Mr. Gururaj"/>
                    </Form.Item>

                      <Form.Item
                        label="Email:"  
                        rules={[{required : true}]} 
                        name="email"                    
                    >
                        <Input size="large" placeholder="example@gmail.com"/>
                    </Form.Item>

                      <Form.Item
                        label="Mobile:"  
                        rules={[{required : true}]} 
                        name="mobile"                    
                    >
                        <Input size="large" placeholder="+91 9999999999"/>
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" htmlType="submit">Add Now</Button>
                    </Form.Item>
                </Form>
                </Modal>
            </div>
        </>
    );
};

export default CustomersPage;
