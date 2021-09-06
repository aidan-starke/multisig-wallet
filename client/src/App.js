import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import NewTransfer from './components/NewTransfer'
import TransferList from './components/TransferList'
import { getWeb3, getWallet } from './utils'

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
      Multisig Dapp
      <Header approvers={approvers} quorum={quorum} />
      <NewTransfer createTransfer={createTransfer} />
      <TransferList transfers={transfers} approveTransfer={approveTransfer} />
    </div>
  )
}

export default App
