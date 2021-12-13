# Decentralized Crowdfunding Platform Driven by Blockchain

Final Project for Blockchain, Cryptocurrencies and Smart Contracts 2021 Course at Copenhagen Business School.

Crowdfunding dApp provides a novel way of funding a project by raising cryptocurrency donations from contributors via public ethereum blockchain technology without the need for any middleman to manage the data flows. 


In the system, we allow Campaign Creators (CCs) and Campaign Backers (CBs) to interact through creation and funding of blockchain related projects. In its most fundamental form, CCs are able to create projects that they seek funding for, whereas the CBs can back the projects they find intriguing. To make these interactions seamless, we develop a frontend that makes interaction with the blockchain and, by extension, our deployed smart contract possible.

When a new project is created, the CC will give it a title, a deadline, and a funding goal. CBs can choose a project they believe in, and contribute by investing a certain amount of cryptocurrency into a project. The contract will be fully automated with the help of Solidity and no centralized third party will be required for the process. If the funding goal is not reached, the contributors will get their money back. Therefore, CCs are incentivised to heavily consider what would be a reasonable amount of funding required for their project. Funds will be held in smart contracts and after successful completion of campaign, the CCs will be able to withdraw the automatically transferred funds to their personal wallets.




## Installation Instructions
Before you start:
* Make sure that you have [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) installed.
* Setup the [metamask](https://metamask.io/) extension.

1. Navigate into the project directory and run the following command:

    `npm install`

    This will install the packages needed for the project.

2. Afterwards, you can run the following commands to make sure that Hardhat is configured correctly:
    ```shell
    npx hardhat accounts
    npx hardhat compile
    ```

3. If it compiles correctly, we can start the project.
Run the following command in one terminal tab:

    `npx hardhat node --network localhost`
When running this command, a list of available test accounts will be displayed. Select any account that you want to use for the project. Take the private key of the account and set it up in the metamask extension. Once this is done, you should be able to see it has 1000 ETH in the account.


4. Open a second terminal tab and run the following command:
    
    `npx hardhat run scripts/deploy.js`

5. Open another terminal tab and go to the frontend directory `cd frontend/`. 

6. Run the following command:  
`npm run dev` (If this command does not work, you may have to run `npm install` in this directory first)

7. Now frontend should be running on port 3000. https://localhost:3000/

