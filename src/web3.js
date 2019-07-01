import Web3 from 'web3'
import {web3Cf} from '../config'
let web3 = new Web3(web3Cf.url)
const provider = web3.currentProvider
// provider.on('error', () => {
//     console.error(`web3 not connect!`)
//     web3 = new Web3(web3Cf.url)
// })
export default web3

