import Web3 from "web3";
import { useState, useEffect } from "react";
import CROWDFUNDING from "./contracts/crowdfunding.json";
import ADDRESS from "./contracts/contract-address.json";

//async function createNewProject(){
//  const newProject = await crowdfunding.methods.createProject("Project 2", 238189321, 20000).send({from: account});
//}

async function loadBlockchainData(func1, func2) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    console.log(network);
    console.log(accounts);
    const crowdfunding = new web3.eth.Contract(
        CROWDFUNDING.abi,
        ADDRESS.crowdfunding
    );
    console.log();
    //const newProject = await crowdfunding.methods.createProject("Project 2", 238189321, 20000).send({from: account});
    const allProjects = await crowdfunding.methods
        .getArr()
        .call({ gasPrice: "1000000", gas: "1000000" });
    func1(account);
    func2(allProjects);
    return account, allProjects;
}

function App() {
    const [account, setAccount] = useState("");
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API
        console.log(CROWDFUNDING.abi);
        console.log(ADDRESS.crowdfunding);
        loadBlockchainData(setAccount, setAllProjects);
    }, []);

    return (
        <div className="App">
            <h1>Hello World!</h1>
            <p>Your Account: {account}</p>
            <button onClick={() => console.log(allProjects)}>
                Log all projects
            </button>
            {allProjects.map((project, index) => {
                return (
                    <div key={index}>
                        <p>Creator: {project.creator}</p>
                        <p>Projectname: {project.projectName}</p>
                        <p>Funding: {project.currentFunding}</p>
                        <p>Goal: {project.fundingGoal}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default App;
