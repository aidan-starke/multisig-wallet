import React from 'react'
import { Divider, List } from 'antd'

function Data ({ approvers, quorum }) {
    return (
        <div style={{ margin: '10px' }}>
            <List
                size="small"
                header={<h3>Approvers</h3>}
                footer={<h4>Quorum: {quorum}</h4>}
                bordered
                dataSource={approvers}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
            <Divider style={{ margin: 0 }} />
        </div>
    )
}

export default Data