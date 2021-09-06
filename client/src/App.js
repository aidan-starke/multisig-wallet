import React, { useEffect, useState } from 'react'
import Data from './components/Data'
import NewTransfer from './components/NewTransfer'
import TransferList from './components/TransferList'
import { getWeb3, getWallet } from './utils'
import { PageHeader } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import ThemeSwitch from './components/ThemeSwitch'

function App () {
  const [web3, setWeb3] = useState()
  const [accounts, setAccounts] = useState()
  const [wallet, setWallet] = useState()
  const [approvers, setApprovers] = useState([])
  const [quorum, setQuorum] = useState()
  const [transfers, setTransfers] = useState([])

  async function init () {
    const web3 = await getWeb3()
    const accounts = await web3.eth.getAccounts()
    const wallet = await getWallet(web3)
    const approvers = await wallet.methods.getApprovers().call()
    const quorum = await wallet.methods.quorum().call()
    const transfers = await wallet.methods.getTransfers().call()
    setWeb3(web3)
    setAccounts(accounts)
    setWallet(wallet)
    setApprovers(approvers)
    setQuorum(quorum)
    setTransfers(transfers)
  }

  async function createTransfer (transfer) {
    await wallet.methods.createTransfer(transfer.amount, transfer.to).send({ from: accounts[0], gas: 1000000 })
    setTransfers(await wallet.methods.getTransfers().call())
  }

  async function approveTransfer (transferId) {
    await wallet.methods.approveTransfer(transferId).send({ from: accounts[0], gas: 1000000 })
    setTransfers(await wallet.methods.getTransfers().call())
  }

  useEffect(() => {
    init()
  }, [])

  if (
    typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof wallet === 'undefined'
    || approvers.length === 0
    || typeof quorum === 'undefined'
  )
    return <div>Loading...</div>

  return (
    <div className="App">
      <PageHeader
        title='Multisig Dapp'
        subTitle='Multisig Dapp deployed to Rinkeby'
        style={{ cursor: 'pointer', border: '1px solid rgb(235, 237, 240)' }}
      />

      <Content style={{ maxWidth: '1000px', margin: 'auto' }}>
        <div style={{ margin: 'auto', display: 'inline-flex', maxWidth: '1000px' }}>
          <Data approvers={approvers} quorum={quorum} style={{ padding: '10px' }} />
          <NewTransfer createTransfer={createTransfer} />
        </div>

        <TransferList transfers={transfers} approveTransfer={approveTransfer} style={{ display: 'block' }} />
      </Content>

      <ThemeSwitch />

      <Footer style={{ textAlign: 'center' }}>MyNFT ©2021 Created by <a href='https://starkemedia.com' target='_blank' rel="noreferrer">StarkeMedia</a></Footer>
    </div>
  )
}

export default App
