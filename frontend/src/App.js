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
        <div className="min-h-screen App bg-gradient-to-r from-blue-800 to-purple-600 via-green-500 animate-gradient-x">

            <h1 className="ml-4 font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> Blockchain Crowdfunding</h1>
            <h2 className="m-4 text-2xl text-white">Hello, {account}</h2>
            <div className="flex mt-6 space-x-8 overflow-x-auto">
                {allProjects.map((project, index) => {
                    return (
                        <div key={index} className="relative flex-shrink-0 w-1/5 m-4 rounded shadow-lg">
                            <div key={index} className="">
                                <div className="flex-shrink-0 p-4 text-white transition duration-500 transform bg-black rounded hover:scale-105">
                                    <p className="py-2 font-semibold text-center text-white uppercase border-b-2 border-white">{project.projectName}</p>
                                    <p className="text-white break-all"> Creator: <span className="text-sm">{project.creator}</span></p>
                                    <p className="text-white"> Funding: {web3.utils.fromWei(String(project.currentFunding), "ether")}</p>
                                    <p className="text-white"> Goal: {web3.utils.fromWei(String(project.fundingGoal), "ether")}</p>
                                    <p className="mb-4 text-white border-b-2 border-white"> Deadline: {convertUnixToDate(project.deadline)}</p>
                                    {project.fundingGoal == project.currentFunding ? <button className="p-2 text-gray-400 rounded-md cursor-not-allowed "> FUNDED! </button>
                                        : <button onClick={() => addDonation(index)} className="flex p-2 rounded-md items-left h-100 hover:text-light-blue ">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                            Donate!
                                        </button>}

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <form className="flex flex-col content-center w-1/4 m-4 mt-6 rounded bg-gray-50">

                <div className="p-4 rounded">

                    <p className="py-2 m-2 font-semibold text-center text-black uppercase border-b-2 border-black"> Set up your next crowdfunding project here </p>
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3">
                            <label className="block pr-4 mb-1 text-black md:text-right md:mb-0">
                                Project name:
                            </label>
                        </div>
                        <div className="md:w-2/3 md:mb-3">
                            <input
                                className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none form-input focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-project-name"
                                type="text"
                                name="projectname"
                                onChange={(e) => setProjectName(e.target.value)}
                                placeholder="Project X"
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3">
                            <label className="block pr-4 mb-1 text-black md:text-right md:mb-0">
                                Goal:
                            </label>
                        </div>
                        <div className="md:w-2/3 md:mb-3">
                            <input className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none form-input focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-goal"
                                type="number"
                                name="fundingGoal"
                                placeholder="Amount in ETH"
                                onChange={(e) => setFundingGoal(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-6 md:flex md:items-center">
                        <div className="md:w-1/3">
                            <label className="block pr-4 mb-1 text-black md:text-right md:mb-0" for="inline-deadline">
                                Deadline:
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none form-input focus:outline-none focus:bg-white focus:border-purple-500"
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
                            className="flex items-center justify-center w-full p-2 m-auto text-white bg-black border-purple-400 rounded-full hover:bg-light-blue"
                            onClick={() =>
                                createProject(projectName, fundingGoal, deadline)
                            }>
                            Create Project
                        </button>
                    </div>
                </div>

            </form>
            <a className="absolute bottom-0 right-0 p-4" href="https://github.com/SSardorf/p-blockchain-crowdfunding">

                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-center text-white fill-current">
                    <title>GitHub repository</title>
                    <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
            </a>
        </div>
    );
}

export default App;
