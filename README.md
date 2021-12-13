# Decentralized Crowdfunding Platform Driven by Blockchain

Crowdfunding dApp provides a novel way of funding a project by raising cryptocurrency donations from contributors via public ethereum blockchain technology without the need for any middleman to manage the data flows. 


In the system, we allow Campaign Creators (CCs) and Campaign Backers (CBs) to interact through creation and funding of blockchain related projects. In its most fundamental form, CCs are able to create projects that they seek funding for, whereas the CBs can back the projects they find intriguing. To make these interactions seamless, we develop a frontend that makes interaction with the blockchain and, by extension, our deployed smart contract possible.

When a new project is created, the CC will give it a title, a deadline, and a funding goal. CBs can choose a project they believe in, and contribute by investing a certain amount of cryptocurrency into a project. The contract will be fully automated with the help of Solidity and no centralized third party will be required for the process. If the funding goal is not reached, the contributors will get their money back. Therefore, CCs are incentivised to heavily consider what would be a reasonable amount of funding required for their project. Funds will be held in smart contracts and after successful completion of campaign, the CCs will be able to withdraw the automatically transferred funds to their personal wallets.




### Hardhat Note
This project demonstrates a Hardhat use case. It comes with a contract, a test for that contract, a script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Simple hardhat tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
