
export class User {
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    password: string; // need to secure this when/if we get time
    
    constructor (
        email: string,
        first_name: string,
        id: number,
        last_name: string,
        password: string,
    ) {
        this.email = email;
        this.first_name = first_name;
        this.id = id;
        this.last_name = last_name;
        this.password = password;
    }
}
