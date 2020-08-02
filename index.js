const Manager = require("./Render/ManagerRender");
const Engineer = require("./Render/EngineerRender");
const Intern = require("./Render/InternRender");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./Render/HtmlRender");
const team = [];
const idArray = [];

const appMenu = () => {
    const createManager = () => {
    console.log("Select your team members");
        inquirer.prompt([
            {
                type: 'input',
                name: "managerName",
                message: "Manager's name?",
                validate: answer => {
                    if (answer !== '') {
                        return true;
                    }
                    return "Minimum character name is 1.";
                }
            },
            {
                type: 'input',
                name: 'managerId',
                message: "Manager's ID number",
                validate: answer => {
                    const valCheck = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (valCheck) {
                        return true;
                    }
                    return "Invalid ID format."
                }
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: "Manager's email?",
                validate: answer => {
                    const valCheck = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (valCheck) {
                        return true;
                    }
                    return "Invalid email"
                }
            },
            {
                type: 'input',
                name: "managerPhoneNumber",
                message: "Manager's office phone number",
                validate: answer => {
                    const valCheck = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (valCheck) {
                        return true;
                    }
                    return "Invalid phone input"
                }
            }
        ]).then(answer => {
            const manager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.managerOfficeNumber);
            team.push(manager);
            idArray.push(answer.managerId);
            createTeam();
        });
    }


    const createTeam = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'memberChoice',
                message: 'Select team member type:',
                choices: [
                    "Engineer",
                    "Intern",
                    "None"
                ]
            }
        ]).then(userChoice => {
            switch(userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    };

    const addEngineer = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "Engineer's name:",
                validate: answer => {
                    if (answer !== "") {
                    return true;
                    }
                    return "Minimun input is 1 character";
                }
            },
            {
            type: "input",
            name: "engineerId",
            message: "Engineer's ID number",
            validate: answer => {
                const valCheck = answer.match(
                    /^[1-9]\d*$/
                    );
                    if (valCheck) {
                        return true;
                    }
                    return "Invalid ID format."
                }
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: "engineer's email?",
                validate: answer => {
                    const valCheck = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (valCheck) {
                        return true;
                    }
                    return "Invalid email"
                }
            },
            {
                type: 'input',
                name: "engineerPhoneNumber",
                message: "engineer's office phone number",
                validate: answer => {
                    const valCheck = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (valCheck) {
                        return true;
                    }
                    return "Invalid phone input"
                }
            }
        ]).then(answer => {
            const engineer = new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerPhoneNumber);
            team.push(engineer);
            idArray.push(answer.managerId);
            createTeam();
        });
    }

    const addIntern = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "Intern's name:",
                validate: answer => {
                    if (answer !== "") {
                    return true;
                    }
                    return "Minimun input is 1 character";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "Intern's ID number",
                validate: answer => {
                    const valCheck = answer.match(
                        /^[1-9]\d*$/
                        );
                        if (valCheck) {
                            return true;
                        }
                        return "Invalid ID format."
                    }
                },
                {
                    type: 'input',
                    name: 'internEmail',
                    message: "Intern's email?",
                    validate: answer => {
                        const valCheck = answer.match(
                            /\S+@\S+\.\S+/
                        );
                        if (valCheck) {
                            return true;
                        }
                        return "Invalid email"
                    }
                },
                {
                    type: 'input',
                    name: "internPhoneNumber",
                    message: "Intern's office phone number",
                    validate: answer => {
                        const valCheck = answer.match(
                            /^[1-9]\d*$/
                        );
                        if (valCheck) {
                            return true;
                        }
                        return "Invalid phone input"
                    }
                }
            ]).then(answer => {
                const intern = new Intern(answer.internName, answer.internId, answer.internEmail, answer.internPhoneNumber);
                team.push(intern);
                idArray.push(answer.managerId);
                createTeam();
        });
    }

    const buildTeam = () => {
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(team), "utf-8")
    }

    createManager()
   
}

    appMenu()