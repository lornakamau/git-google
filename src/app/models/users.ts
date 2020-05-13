export class Users {
    public displayRepos:boolean;
    constructor(
        public name:string,
        public login:string,
        public bio:string,
        public url: string,
        public followers: number,
        public following: number,
        public repos : number,
        public created_at : Date,
        public avatar_url:string){
            this.displayRepos = false
        }
}
