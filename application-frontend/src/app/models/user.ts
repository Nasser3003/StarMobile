
export class User {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    
    constructor (
        email: string,
        first_name: string,
        last_name: string,
        password: string,
    ) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
    }
}
