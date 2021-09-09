
export class State {
  constructor() {
    this.currentUser = null;
  }
  set currentUser(user) {
    this._currentUser = user;
   // addToStorageCurrentUser(user, "currentUser");
  }
  get currentUser() {
    return this._currentUser;
  }
}
