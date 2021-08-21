import {
  BaseModel
} from "./BaseModel";
import {
  getFromStorage,
  addToStorage
} from "../utils";

export class User extends BaseModel {
  constructor(login, password) {
    super();
    this.login = login;
    this.password = password;
    this.storageKey = "users";
    this.tasks = []
  }
  get hasAccess() {
    
    let access = false;
    let users = getFromStorage(this.storageKey);
    if (users.length == 0) return false;


    users.forEach(element => {
      

      
        if (element.login == this.login && element.password == this.password){
          
         return access = true;

        }
          
      
    });



    // for (let user of users) {
    //   if (user.login == this.login && user.password == this.password)
    //     window.alert('hasAccess true')
    //   return true;
    // }


    //
    return access;
  }
  static save(user) {
    try {
      addToStorage(user, user.storageKey);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}