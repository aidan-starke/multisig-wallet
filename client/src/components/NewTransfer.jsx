import { Button, Input, Form, Card } from "antd"
import React, { useState } from "react"

function NewTransfer ({ createTransfer }) {
    const [transfer, setTransfer] = useState()

    function onFinish (values) {
        const { amount, to } = values
        createTransfer({ amount, to })
    }

    function onFinishFailed (errorInfo) {
        console.log('Failed:', errorInfo)
    }

    function submit (e) {
        e.preventDefault()
        createTransfer(transfer)
    }

    function updateTransfer (value, field) {
        console.log(value, field)
        setTransfer({ ...transfer, [field]: value })
    }

    return (
        <Card style={{ margin: '10px', width: '1000px' }}>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label='Amount'
                    name='amount'
                    rules={[{ required: true, message: 'Please input an amount!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='To'
                    name='to'
                    rules={[{ required: true, message: 'Please input an approver address!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item style={{ textAlign: 'center', margin: 0 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default NewTransfer