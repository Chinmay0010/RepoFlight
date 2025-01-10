import { createConnection } from "mysql";

export function createConnectionObject(){
    return createConnection({
        host: 'localhost',
        user : 'root',
        password: 'cdac',
        database: 'mydb',

    });
}

export function establishConection(){
    const connection=createConnectionObject();
    createConnectionObject().connect((error) =>{
        if (error){
            console.log(error);
        }
        else{
            console.log("Connected to MY SQL Database");
        }
    });
}
