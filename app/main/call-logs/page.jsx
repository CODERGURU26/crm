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
  const { data: logs, isLoading } = useSWR('/logs', fetcher)
  const { data: customers } = useSWR('/customer', fetcher)

  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingLog, setEditingLog] = useState(null)

  const [form] = Form.useForm()
  const [editForm] = Form.useForm()

  // ✅ Create Log
  const addLog = async (values) => {
    try {
      const { data } = await axios.post('/logs', values)
      toast.success("Log Added Successfully!", { position: "top-center" })
      setOpen(false)
      mutate('/logs')
    } catch (err) {
      toast.error(err.message, { position: "top-center" })
    }
  }

  // ✅ Update Log
  const updateLog = async (values) => {
    try {
      const { data } = await axios.put(`/logs/${editingLog._id}`, values)
      toast.success("Log Updated Successfully!", { position: "top-center" })
      setEditOpen(false)
      setEditingLog(null)
      mutate('/logs')
    } catch (err) {
      toast.error(err.message, { position: "top-center" })
    }
  }

  // ✅ Delete Log
  const deleteLog = async (id) => {
    try {
      await axios.delete(`/logs/${id}`)
      toast.success("Log Deleted Successfully!", { position: "top-center" })
      mutate('/logs')
    } catch (err) {
      toast.error(err.message, { position: "top-center" })
    }
  }

  if (isLoading) return <Skeleton />

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
      dataIndex: 'status'
    },
    {
      key: 'startsAt',
      title: 'Start Time',
      render: (item) => moment(item.startsAt).format('DD MMM YYYY, hh:mm A')
    },
    {
      key: 'endsAt',
      title: 'End Time',
      render: (item) => moment(item.endsAt).format('DD MMM YYYY, hh:mm A')
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
    <>
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
          dataSource={logs}
          rowKey="_id"
        />

        {/* Add Log Modal */}
        <Modal onCancel={() => setOpen(false)} maskClosable={false} open={open} footer={null} title="Add Log">
          <Divider />
          <Form form={form} layout="vertical" onFinish={addLog}>
            <Form.Item label="Customer" rules={[{ required: true }]} name="customer">
              <Select placeholder="Select Customer">
                {customers?.map(c => (
                  <Select.Option key={c._id} value={c._id}>
                    {c.fullname}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Status" rules={[{ required: true }]} name="status">
              <Select>
                <Select.Option value="calling">Calling</Select.Option>
                <Select.Option value="busy">Busy</Select.Option>
                <Select.Option value="waiting">Waiting</Select.Option>
                <Select.Option value="not received">Not Received</Select.Option>
                <Select.Option value="switched off">Switched Off</Select.Option>
                <Select.Option value="denied">Denied</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Follow Up Date" name="followUp">
              <Input type="date" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Add Now</Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Log Modal */}
        <Modal onCancel={() => setEditOpen(false)} maskClosable={false} open={editOpen} footer={null} title="Edit Log">
          <Divider />
          <Form form={editForm} layout="vertical" onFinish={updateLog}>
            <Form.Item label="Customer" rules={[{ required: true }]} name="customer">
              <Select placeholder="Select Customer">
                {customers?.map(c => (
                  <Select.Option key={c._id} value={c._id}>
                    {c.fullname}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Status" rules={[{ required: true }]} name="status">
              <Select>
                <Select.Option value="calling">Calling</Select.Option>
                <Select.Option value="busy">Busy</Select.Option>
                <Select.Option value="waiting">Waiting</Select.Option>
                <Select.Option value="not received">Not Received</Select.Option>
                <Select.Option value="switched off">Switched Off</Select.Option>
                <Select.Option value="denied">Denied</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Follow Up Date" name="followUp">
              <Input type="date" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Update Now</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  )
}

export default CallLogsPage
