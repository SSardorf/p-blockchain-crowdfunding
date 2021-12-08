import Web3 from "web3";
import { useState, useEffect, Fragment } from "react";
import CROWDFUNDING from "./contracts/crowdfunding.json";
import ADDRESS from "./contracts/contract-address.json";

function App() {
    async function getAllProjects() {
        const projects = await crowdfunding.methods.getArr().call();
        setAllProjects(projects);
    }
    async function createProject(name, goal, deadline) {
        //convert goal from wei to ether
        const goalInEther = web3.utils.toWei(String(goal), "ether");
        console.log(goalInEther);
        const newProject = await crowdfunding.methods
            .createProject(name, deadline, goalInEther)
            .send({ from: account });
        getAllProjects();
    }

    async function loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        await window.ethereum.enable();
        const network = await web3.eth.net.getNetworkType();
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const crowdfunding = new web3.eth.Contract(
            CROWDFUNDING.abi,
            ADDRESS.crowdfunding
        );
        const allProjects = await crowdfunding.methods.getArr().call();
        setAccount(account);
        setCrowdfunding(crowdfunding);
        setWeb3(web3);
        setAllProjects(allProjects);
        return account, allProjects;
    }

    async function addDonation(project_index) {
        let donationAmount = prompt("Enter donation amount");
        const newDonation = await crowdfunding.methods.newDonation(project_index).send({ from: account, value: web3.utils.toWei(donationAmount, "ether") });
        getAllProjects();
    }

    function convertUnixToDate(deadline) {
        var date = new Date(deadline * 1000)
        var shortDate = String(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
        return shortDate;
    }

    const [account, setAccount] = useState("");
    const [crowdfunding, setCrowdfunding] = useState("");
    const [allProjects, setAllProjects] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [fundingGoal, setFundingGoal] = useState("");
    const [deadline, setDeadline] = useState("");
    const [web3, setWeb3] = useState("");

    useEffect(() => {
        // Update the document title using the browser API
        console.log(CROWDFUNDING.abi);
        console.log(ADDRESS.crowdfunding);
        loadBlockchainData();
    }, []);

    return (
        <div className="App min-h-screen bg-gradient-to-r from-blue-800 to-purple-600">
            <h1 className="font-extrabold text-transparent ml-4 text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> Blockchain Crowdfunding</h1>
            <h2 className="text-2xl m-4 text-white">Hello, {account}</h2>
            <div className="flex overflow-x-auto space-x-8 mt-6">
                {allProjects.map((project, index) => {
                    return (
                        <div key={index} className="flex-shrink-0 relative w-1/5 rounded m-4 shadow-lg">
                            <div key={index} className="">
                                <div className="flex-shrink-0 bg-black text-white rounded p-4 transform transition duration-500 hover:scale-105">
                                    <p className="py-2 border-b-2 border-white text-center text-white font-semibold uppercase">{project.projectName}</p>
                                    <p className="break-all text-white"> Creator: <span className="text-sm">{project.creator}</span></p>
                                    <p className="text-white"> Funding: {web3.utils.fromWei(String(project.currentFunding), "ether")}</p>
                                    <p className="text-white"> Goal: {web3.utils.fromWei(String(project.fundingGoal), "ether")}</p>
                                    <p className="text-white mb-4 border-b-2 border-white"> Deadline: {convertUnixToDate(project.deadline)}</p>
                                    {project.fundingGoal == project.currentFunding ? <button className="text-gray-400 p-2 rounded-md cursor-not-allowed "> FUNDED! </button>
                                        : <button onClick={() => addDonation(index)} className="items-left flex p-2 rounded-md h-100 hover:text-light-blue ">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                            Donate!
                                        </button>}

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <form className="flex m-4 flex-col w-1/4 rounded mt-6 content-center bg-gray-50">
                <div className="rounded p-4">
                    <p className="py-2 m-2 border-b-2 border-black text-center text-black font-semibold uppercase"> Set up your next crowdfunding project here </p>
                    <div class="md:flex md:items-center">
                        <div class="md:w-1/3">
                            <label class="block text-black md:text-right mb-1 md:mb-0 pr-4" for="inline-project-name">
                                Project name:
                            </label>
                        </div>
                        <div class="md:w-2/3 md:mb-3">
                            <input
                                className="form-input bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-project-name"
                                type="text"
                                name="projectname"
                                onChange={(e) => setProjectName(e.target.value)}
                                placeholder="Project X"
                            />
                        </div>
                    </div>
                    <div class="md:flex md:items-center">
                        <div class="md:w-1/3">
                            <label class="block text-black md:text-right mb-1 md:mb-0 pr-4" for="inline-goal">
                                Goal:
                            </label>
                        </div>
                        <div class="md:w-2/3 md:mb-3">
                            <input className="form-input bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-goal"
                                type="number"
                                name="fundingGoal"
                                placeholder="Amount in ETH"
                                onChange={(e) => setFundingGoal(e.target.value)}
                            />
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-black md:text-right mb-1 md:mb-0 pr-4" for="inline-deadline">
                                Deadline:
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input
                                className="form-input bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-deadline"
                                type="date"
                                name="deadline"
                                //parseInt((new Date('2012.08.10').getTime() / 1000).toFixed(0))
                                onChange={(e) =>
                                    setDeadline(
                                        new Date(e.target.value).getTime() / 1000
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <button
                            type="button"
                            className="flex w-full border-purple-400 items-center justify-center p-2 rounded-full m-auto text-white bg-black hover:bg-light-blue"
                            onClick={() =>
                                createProject(projectName, fundingGoal, deadline)
                            }>
                            Create Project
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default App;
