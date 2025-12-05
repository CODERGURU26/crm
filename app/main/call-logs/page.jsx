'use client'
import fetcher from "@/app/lib/fetcher";
import { Button, Divider, Form, Input, Modal, Skeleton, Table, Select } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

const CallLogsPage = () => {
  // ✅ Add fallbackData to prevent null errors
  const { data: logs, isLoading, error } = useSWR('/logs', fetcher, { 
    fallbackData: [],
    revalidateOnFocus: false 
  })
  const { data: customers } = useSWR('/customer', fetcher, { 
    fallbackData: [],
    revalidateOnFocus: false 
  })

  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingLog, setEditingLog] = useState(null)

  const [form] = Form.useForm()
  const [editForm] = Form.useForm()

  // ✅ Create Log
  const addLog = async (values) => {
    try {
      await axios.post('/logs', values)
      toast.success("Log Added Successfully!", { position: "top-center" })
      form.resetFields()
      setOpen(false)
      mutate('/logs')
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message, { position: "top-center" })
    }
  }

  // ✅ Update Log
  const updateLog = async (values) => {
    try {
      await axios.put(`/logs/${editingLog._id}`, values)
      toast.success("Log Updated Successfully!", { position: "top-center" })
      setEditOpen(false)
      setEditingLog(null)
      mutate('/logs')
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message, { position: "top-center" })
    }
  }

  // ✅ Delete Log
  const deleteLog = async (id) => {
    try {
      await axios.delete(`/logs/${id}`)
      toast.success("Log Deleted Successfully!", { position: "top-center" })
      mutate('/logs')
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message, { position: "top-center" })
    }
  }

  // ✅ Show error if API fails
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 text-lg">Failed to load data</p>
          <p className="text-gray-500">{error.message}</p>
        </div>
      </div>
    )
  }

  if (isLoading) return <Skeleton active paragraph={{ rows: 8 }} />

  const columns = [
    {
      key: 'customer',
      title: 'Customer',
      dataIndex: 'customer',
      render: (customer) => customer?.fullname || "Unknown"
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          status === 'calling' ? 'bg-blue-100 text-blue-700' :
          status === 'busy' ? 'bg-orange-100 text-orange-700' :
          status === 'waiting' ? 'bg-yellow-100 text-yellow-700' :
          status === 'not received' ? 'bg-gray-100 text-gray-700' :
          status === 'switched off' ? 'bg-red-100 text-red-700' :
          status === 'denied' ? 'bg-purple-100 text-purple-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {status}
        </span>
      )
    },
    {
      key: 'startsAt',
      title: 'Start Time',
      render: (item) => item.startsAt ? moment(item.startsAt).format('DD MMM YYYY, hh:mm A') : "—"
    },
    {
      key: 'endsAt',
      title: 'End Time',
      render: (item) => item.endsAt ? moment(item.endsAt).format('DD MMM YYYY, hh:mm A') : "—"
    },
    {
      key: 'followUp',
      title: 'Follow Up',
      render: (item) => item.followUp ? moment(item.followUp).format('DD MMM YYYY') : "—"
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
              setEditingLog(item)
              setEditOpen(true)
              editForm.setFieldsValue({
                customer: item.customer?._id,
                status: item.status,
                followUp: item.followUp ? moment(item.followUp).format("YYYY-MM-DD") : null
              })
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            className="!text-rose-600 !border-rose-600 !border-2"
            onClick={() => deleteLog(item._id)}
          />
        </div>
      )
    }
  ]

  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">📞 Calls & Logs</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="!bg-indigo-600"
          onClick={() => setOpen(true)}
        >
          Add Log
        </Button>
      </div>

      <Divider />

      <Table
        columns={columns}
        dataSource={logs || []}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      {/* Add Log Modal */}
      <Modal 
        onCancel={() => {
          setOpen(false)
          form.resetFields()
        }} 
        maskClosable={false} 
        open={open} 
        footer={null} 
        title="Add Call Log"
      >
        <Divider />
        <Form form={form} layout="vertical" onFinish={addLog}>
          <Form.Item label="Customer" rules={[{ required: true, message: 'Please select a customer' }]} name="customer">
            <Select 
              placeholder="Select Customer" 
              size="large"
              showSearch
              filterOption={(input, option) =>
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
              }
            >
              {customers?.map(c => (
                <Select.Option key={c._id} value={c._id}>
                  {c.fullname}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Status" rules={[{ required: true, message: 'Please select a status' }]} name="status">
            <Select size="large">
              <Select.Option value="calling">🔵 Calling</Select.Option>
              <Select.Option value="busy">🟠 Busy</Select.Option>
              <Select.Option value="waiting">🟡 Waiting</Select.Option>
              <Select.Option value="not received">⚪ Not Received</Select.Option>
              <Select.Option value="switched off">🔴 Switched Off</Select.Option>
              <Select.Option value="denied">🟣 Denied</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Follow Up Date" name="followUp">
            <Input type="date" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block className="!bg-indigo-600">
              Add Log
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Log Modal */}
      <Modal 
        onCancel={() => {
          setEditOpen(false)
          setEditingLog(null)
          editForm.resetFields()
        }} 
        maskClosable={false} 
        open={editOpen} 
        footer={null} 
        title="Edit Call Log"
      >
        <Divider />
        <Form form={editForm} layout="vertical" onFinish={updateLog}>
          <Form.Item label="Customer" rules={[{ required: true, message: 'Please select a customer' }]} name="customer">
            <Select 
              placeholder="Select Customer" 
              size="large"
              showSearch
              filterOption={(input, option) =>
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
              }
            >
              {customers?.map(c => (
                <Select.Option key={c._id} value={c._id}>
                  {c.fullname}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Status" rules={[{ required: true, message: 'Please select a status' }]} name="status">
            <Select size="large">
              <Select.Option value="calling">🔵 Calling</Select.Option>
              <Select.Option value="busy">🟠 Busy</Select.Option>
              <Select.Option value="waiting">🟡 Waiting</Select.Option>
              <Select.Option value="not received">⚪ Not Received</Select.Option>
              <Select.Option value="switched off">🔴 Switched Off</Select.Option>
              <Select.Option value="denied">🟣 Denied</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Follow Up Date" name="followUp">
            <Input type="date" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block className="!bg-indigo-600">
              Update Log
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CallLogsPage