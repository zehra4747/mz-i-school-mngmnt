#! /usr/bin/env node
import inquirer from "inquirer";
console.log("-------SCHOOL MANAGEMENT PROGRAM-------");
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let contEnroll = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select an option:\n",
        choices: ["Enroll a Student", "Show Student Status"]
    });
    if (action.ans === "Enroll a Student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Please enter your name: "
        });
        let trimmedStudent = (studentName.ans).trim().toLowerCase();
        let stdNamecheck = students.map(obj => obj.name);
        if (stdNamecheck.includes(trimmedStudent) === false) {
            if (trimmedStudent !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log("\n\tYour Account has been created");
                console.log(`Welcome! ${trimmedStudent}`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please a course:",
                    choices: ['IT', 'English', 'Finance']
                });
                let courseFee = 0;
                switch (course.ans) {
                    case "IT":
                        courseFee = 5000;
                        break;
                    case "English":
                        courseFee = 4000;
                        break;
                    case "Finance":
                        courseFee = 3500;
                        break;
                }
                let courseConf = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this course"
                });
                if (courseConf.ans === true) {
                    let Student = new student(studentId, trimmedStudent, [course.ans], courseFee);
                    students.push(Student);
                    console.log("Enrolled!");
                }
            }
            else {
                console.log("invalid");
            }
        }
        else {
            console.log("This name already exists");
        }
    }
    else if (action.ans === "Show Student Status") {
        if (students.length !== 0) {
            let stdNamecheck = students.map(e => e.name);
            let selectedStd = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please select name",
                choices: stdNamecheck
            });
            let foundStd = students.find(Student => Student.name === selectedStd.ans);
            console.log("Student Information");
            console.log(foundStd);
            console.log("\n");
        }
        else {
            console.log("Record is empty");
        }
    }
    let userConf = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to continue?"
    });
    if (userConf.ans === false) {
        contEnroll = false;
    }
} while (contEnroll);
