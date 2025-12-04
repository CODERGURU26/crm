'use client'
import fetcher from "@/app/lib/fetcher";
import { DeleteOutlined, DownloadOutlined, EditOutlined, ImportOutlined, SearchOutlined, UploadOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, Skeleton, Table } from "antd";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '@ant-design/v5-patch-for-react-19';
import useSWR, { mutate } from "swr";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import moment from "moment/moment";
import lodash from 'lodash'
import * as XLS from 'xlsx'

const CustomersPage = () => {
    const { data, error, isLoading } = useSWR('/customer', fetcher)
    const [importCustomer, setImportCustomer] = useState(false)
    const [open, setOpen] = useState(false)
    const [filter, setFilter] = useState([])
    const [editOpen, setEditOpen] = useState(false)
    const [editingCustomer, setEditingCustomer] = useState(null)

    const [form] = Form.useForm()
    const [editForm] = Form.useForm()

    // ✅ Handles both single and bulk insert
    const addCustomer = async (values) => {
        try {
            const { data } = await axios.post('/customer', values)
            toast.success(`${Array.isArray(data) ? data.length : 1} Customer(s) Added Successfully!`, { position: 'top-center' })
            setOpen(false)
            setImportCustomer(false)
            mutate('/customer')
        } catch (err) {
            toast.error(err.message, { position: 'top-center' })
        }
    }

    // ✅ Update Customer
    const updateCustomer = async (values) => {
        try {
            const { data } = await axios.put(`/customer/${editingCustomer._id}`, values)
            toast.success('Customer Updated Successfully!', { position: 'top-center' })
            setEditOpen(false)
            setEditingCustomer(null)
            mutate('/customer')
        } catch (err) {
            toast.error(err.message, { position: 'top-center' })
        }
    }

    // ✅ Search with debounce
    const onSearch = lodash.debounce((event) => {
        const key = event.target.value.trim().toLowerCase()
        if (!key) {
            setFilter(data)
            return
        }
        const filtered = data.filter((item) => item.fullname.toLowerCase().includes(key))
        setFilter(filtered)
    }, 500)

    // ✅ Download sample file
    const downloadSample = () => {
        const a = document.createElement("a")
        a.href = "/Sample.xlsx"
        a.download = 'Sample.xlsx'
        a.click()
        a.remove()
    }

    // ✅ Import Excel file with header normalization
    const ImportXlsFile = (e) => {
        const input = e.target
        const file = input.files[0]
        const ext = file.name.split(".").pop()

        if (ext !== "xls" && ext !== "xlsx")
            return toast.error("Invalid File Format!", { position: "top-center" })

        const reader = new FileReader()
        reader.readAsArrayBuffer(file)

        reader.onload = (e) => {
            const temp = []
            const result = new Uint8Array(e.target.result)
            const excelFile = XLS.read(result, { type: "array" })
            const key = excelFile.SheetNames[0]
            const sheet = excelFile.Sheets[key]
            const data = XLS.utils.sheet_to_json(sheet)

            if (data.length === 0)
                return toast.error('File Is Empty!', { position: "top-center" })

            for (let item of data) {
                const fullname = item["Full Name"] || item.fullname
                const email = item["Email"] || item.email
                const mobile = item["Mobile"] || item.mobile

                if (fullname && email && mobile) {
                    temp.push({ fullname, email, mobile })
                }
            }

            if (temp.length > 0) {
                addCustomer(temp)
            } else {
                toast.error("No valid records found!", { position: "top-center" })
            }
        }
    }

    if (isLoading) return <Skeleton />

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
            key: 'created',
            title: 'Created',
            render: (item) => (
                <label>{moment(item.createdAt).format('DD MMM YYYY, hh:mm A')}</label>
            )
        },
        {
            key: 'actions',
            title: 'Actions',
            render: (item) => (
                <div className="flex gap-2">
                    <Button
                        icon={<EditOutlined />}
                        className="!text-violet-600 !border-violet-600 !border-2"
                        onClick={() => {
                            setEditingCustomer(item)
                            setEditOpen(true)
                            editForm.setFieldsValue(item)
                        }}
                    />
                    <Button
                        onClick={() => deleteCustomers(item._id)}
                        icon={<DeleteOutlined />}
                        className="!text-rose-600 !border-rose-600 !border-2"
                    />
                </div>
            )
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
                        prefix={<SearchOutlined className="!text-gray-500 mr-1" />}
                        onChange={onSearch}
                    />

                    <Button
                        size="large"
                        icon={<ImportOutlined />}
                        onClick={() => setImportCustomer(true)}>Import Customer
                    </Button>

                    <Button
                        size="large"
                        type="primary"
                        className="!bg-indigo-600"
                        icon={<UserAddOutlined />}
                        onClick={() => setOpen(true)}>Add Customer
                    </Button>
                </div>

                <Divider />

                <Table
                    columns={column}
                    dataSource={filter.length > 0 ? filter : data}
                    rowKey="_id"
                />

                {/* Add Customer Modal */}
                <Modal onCancel={() => setOpen(false)} maskClosable={false} open={open} footer={null} title="Add Customers">
                    <Divider />
                    <Form form={form} layout="vertical" onFinish={addCustomer}>
                        <Form.Item label="Customers Name:" rules={[{ required: true }]} name="fullname">
                            <Input size="large" placeholder="Mr. Gururaj" />
                        </Form.Item>
                        <Form.Item label="Email:" rules={[{ required: true }]} name="email">
                            <Input size="large" placeholder="example@gmail.com" />
                        </Form.Item>
                        <Form.Item label="Mobile:" rules={[{ required: true }]} name="mobile">
                            <PhoneInput country={'in'} inputClass="!w-full" />
                        </Form.Item>
                        <Form.Item>
                            <Button icon={<UserAddOutlined />} type="primary" size="large" htmlType="submit">Add Now</Button>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Edit Customer Modal */}
                <Modal onCancel={() => setEditOpen(false)} maskClosable={false} open={editOpen} footer={null} title="Edit Customer">
                    <Divider />
                    <Form form={editForm} layout="vertical" onFinish={updateCustomer}>
                        <Form.Item label="Customers Name:" rules={[{ required: true }]} name="fullname">
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item label="Email:" rules={[{ required: true }]} name="email">
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item label="Mobile:" rules={[{ required: true }]} name="mobile">
                            <PhoneInput
                                country={'in'}
                                inputClass="!w-full"
                                value={editingCustomer?.mobile}
                                onChange={(value) => editForm.setFieldsValue({ mobile: value })}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button icon={<EditOutlined />} type="primary" size="large" htmlType="submit">Update Now</Button>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Import Customer Modal */}
                <Modal open={importCustomer} footer={null} title="Import Customer Records" onCancel={() => setImportCustomer(false)}>
                    <Divider />
                    <div className="grid grid-cols-2">
                        <div className="space-y-4">
                            <h1 className="text-lg font-semibold">Download XLS File Format</h1>
                            <Button icon={<DownloadOutlined />} size="large" onClick={downloadSample}>Download Sample</Button>
                        </div>
                                                <div className="flex justify-center">
                            <Button className="!w-[100px] !h-[100px] flex flex-col !text-lg relative">
                                <UploadOutlined className="text-3xl" />
                                Upload XLS
                                <Input
                                    type="file"
                                    accept=".xls,.xlsx"
                                    className="!w-full !h-full !absolute !top-0 !left-0 !opacity-0"
                                    onChange={ImportXlsFile}
                                />
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default CustomersPage
