import {v4 as uuid} from 'uuid'

export class User {

  readonly id?: string;
  public firstName: string
  public lastName: string
  public email: string
  public password: string
  public created_at: Date;
  public updated_at: Date;


  constructor(
    id: string,
    firstName: string, 
    lastName: string,
    email: string,
    password: string
    ){

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.created_at = new Date();
    this.updated_at = new Date();


    if(!id){
      this.id = uuid()
    }
  }
}
