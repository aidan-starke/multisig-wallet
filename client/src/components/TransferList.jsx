import { Button, Card, Table } from 'antd'
import React from 'react'

function TransferList ({ transfers, approveTransfer }) {
    const data = transfers.map(transfer => (
        {
            key: transfer.id,
            id: transfer.id,
            amount: transfer.amount,
            to: transfer.to,
            approvals: transfer.approvals,
            sent: transfer.sent ? 'yes' : 'no',
            action: transfer.approvals === '0' ? <a onClick={() => approveTransfer(transfer.id)}>Approve</a> : null
        }
    ))

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
        },
        {
            title: 'Approvals',
            dataIndex: 'approvals',
            key: 'approvals',
        },
        {
            title: 'Sent',
            dataIndex: 'sent',
            key: 'sent',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        }
    ]

    return (
        <Card style={{ margin: '10px' }}>
            <h2>Transfers</h2>
            <Table dataSource={data} columns={columns} />
        </Card>
    )
}

export default TransferList