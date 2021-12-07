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
        // Set states to be able to interact with web3 elements in other functions
        setAccount(account);
        setCrowdfunding(crowdfunding);
        setWeb3(web3);
        setAllProjects(allProjects);
        return account, allProjects;
    }

    async function addDonation(project_index) {
        let donationAmount = prompt("Enter donation amount");
        const newDonation = await crowdfunding.methods
            .newDonation(project_index)
            .send({
                from: account,
                value: web3.utils.toWei(donationAmount, "ether"),
            });
        getAllProjects();
    }

    function convertUnixToDate(deadline) {
        var date = new Date(deadline * 1000);
        var shortDate = String(
            date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getFullYear()
        );
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
        <div className="App h-full">
            <h1 className="text-5xl">Blockchain Crowdfunding</h1>
            <h2 className="text-2xl">Hello, {account}</h2>
            <div className="flex flex-wrap w-full">
                {allProjects.map((project, index) => {
                    return (
                        <div key={index} className="w-1/2 ">
                            <div className="bg-gray-100 text-grey-500 rounded m-4 p-4">
                                <p className="">Creator: {project.creator}</p>
                                <p>Projectname: {project.projectName}</p>
                                <p>
                                    Funding:
                                    {web3.utils.fromWei(
                                        String(project.currentFunding),
                                        "ether"
                                    )}
                                    <span className="font-bold"> Ξ</span>
                                </p>
                                <p>
                                    Goal:
                                    {web3.utils.fromWei(
                                        String(project.fundingGoal),
                                        "ether"
                                    )}
                                    <span className="font-bold"> Ξ</span>
                                </p>
                                <p>
                                    Deadline:
                                    {convertUnixToDate(project.deadline)}
                                </p>
                                {project.fundingGoal ==
                                project.currentFunding ? (
                                    <button className="bg-gray-400 p-2 rounded-md ">
                                        FUNDED!
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => addDonation(index)}
                                        className="bg-green-400 p-2 rounded-md "
                                    >
                                        Donate!
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <form className="flex flex-col w-1/3 content-center">
                <div className="rounded m-4 p-4">
                    <div class="md:flex md:items-center">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 md:text-right mb-1 md:mb-0 pr-4" for="inline-project-name">
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
                            <label class="block text-gray-500 md:text-right mb-1 md:mb-0 pr-4" for="inline-goal">
                                Goal:
                        </label>
                        </div>
                        <div class="md:w-2/3 md:mb-3">
                            <input className="form-input bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-goal"
                                type="number"
                                name="fundingGoal"
                                onChange={(e) => setFundingGoal(e.target.value)}
                            />
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 md:text-right mb-1 md:mb-0 pr-4" for="inline-deadline">
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
                            className="bg-green-300 p-2 rounded-md m-auto"
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
