import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import Wallet from './contracts/Wallet.json'

async function getWeb3 () {
    return new Promise((resolve, reject) => {
        let provider = detectEthereumProvider()

        if (provider) {
            provider.request({ method: 'eth_accounts' })
                .then((accounts) => console.log(accounts))
                .catch((error) => console.error(error))

            try {
                const web3 = new Web3(window.ethereum)
                resolve(web3)
            } catch (err) {
                reject(err)
            }
        } reject('Install Metamask')
    })
}

async function getWallet (web3) {
    const networkId = await web3.eth.net.getId()
    const deployedNetwork = Wallet.networks[networkId]
    return new web3.eth.Contract(
        Wallet.abi,
        deployedNetwork && deployedNetwork.address
    )
}

export { getWeb3, getWallet }