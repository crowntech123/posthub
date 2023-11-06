import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

//services are constructed so that I can just use the service that method provide under the hood which backend service provider is up to me I can use my own created backend logic or firebase, appwrite

// service is a class and has  one object through which I can  access many functionalities
export class AuthService {
  //client & account are properties
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.loginAccount({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("error while creating account(signup)", error);
    }
  }
  async loginAccount({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("error while login account(login)", error);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }
  async logout() {
    try {
      //deletesession and deletesessions are different with s u can delete the sessions from each browser where user is logged in
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
