import * as readline from "readline";

function askQuestion(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer: string) => {
            rl.close();
            resolve(answer);
        })
    })
}

type Status = "pending" | "completed";

interface ToDo {
    id: number,
    name: string,
    status: Status,
    description: string | undefined,
    date: Date 
}

async function createTodo(id: number): Promise<ToDo> {
    const name = await askQuestion("What is the name of your ToDo?\n");

    if (name.trim() === "") {
        throw new Error("Name cannot be empty");
    }

    const description = await askQuestion("Add a description to the ToDo (optional)\n");

    const todo :ToDo = {
        id: id,
        name: name,
        status: "pending",
        description: description === "" ? undefined : description,
        date: new Date()
    }

    return todo;
}

async function main() {
    let option = 0;
    let idCounter = 1;
    let toDos: ToDo[] = [];

    while(option != 5) {
        console.log("---------------");
        console.log("1 - Create ToDO");
        console.log("2 - List ToDos");
        console.log("3 - Complete ToDo");
        console.log("4 - Delete ToDo");
        console.log("5 - Exit");

        const answerText = await askQuestion('What do you want to do?\n');
    
        option = parseInt(answerText, 10);

        if (isNaN(option) || option > 5 || option < 1) {
            console.log("Please insert a valid number");
        }

        switch (option) {
            case 1:
                try {    
                    let todo = await createTodo(idCounter);
                    toDos.push(todo);
                    console.log(todo);  
                    idCounter++; 
                } catch (error) {
                    console.error("Name cannot be empty");
                }
                break;
            case 2:
                toDos.forEach((toDo) => console.log(toDo));
                break;
            default:
                break;
        }
    }

    console.log("Exiting program");
}

// Calling the main function
main();