export class UserModel {
 
    constructor(
        public firstName: string,
        public lastName: string,
        public sex: string,
        public email: string,
        public password: string,
        public _id?: string,
        public role?: string
    ){}

}