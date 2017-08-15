import { sha3, ecsign } from 'ethereumjs-util'
import Web3 from 'web3'
import setup from './setup'

const web3 = new Web3()

const privKey = Buffer.alloc(32, 'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')

const address = '0xbe862AD9AbFe6f22BCb087716c7D89a26051f74C'

const sign = (msgHash, privKey) => {
  if (typeof msgHash === 'string' && msgHash.slice(0, 2) === '0x') {
    msgHash = Buffer.alloc(32, msgHash.slice(2), 'hex')
  }
  const sig = ecsign(msgHash, privKey)
  return `0x${sig.r.toString('hex')}${sig.s.toString('hex')}${sig.v.toString(16)}`
}

const word = 'cat'
const hash = '0x' + sha3(word).toString('hex')
const sig = sign(hash, privKey)

console.log('sha3("cat"): ' + hash)
console.log('signature: ' + sig)

const main = async () => {

  const { ecverify, ECVerify, eth, accounts, web3 } = await setup({
    testRPCProvider: 'http://localhost:8545'
  })

  const result = await ecverify.ecverify(hash, sig, address)
  console.log(result)
}

main()
