import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Users } from '../models/users'; 
import { Repositories } from '../models/repositories';

@Injectable({
  providedIn: 'root'
})
export class SearchGitService {
  gitUserApi = `${environment.gitAPI} + users/`;
  gitUserAccount = "https://github.com/";
  gitRepoApi = `${environment.gitAPI} + search/repositories?q=`
  repos =[];
  allrepos = [];

  constructor( private http:HttpClient ) { }

  getUser(name){
    interface userApiResponse{
      name:string;
      bio:string;
      login:string;
      url: string;
      followers: number;
      following: number;
      public_repos : number;
      created_at:Date;
      avatar_url :string;
   }
   let user = new Users ("", "","","",0,0,0, new Date(),"");
   let promise = new Promise((resolve , reject)=>{
     let userRequest = this.gitUserApi + name + (environment.accesstoken)
     this.http.get<userApiResponse>(userRequest).toPromise().then(response=>{
      user.name = response["name"]
      user.bio = response["bio"]
      user.url = this.gitUserAccount + name;
      user.login = response["login"]
      user.followers  = response["followers"]
      user.following = response["following"]
      user.repos = response["public_repos"]
      user.created_at = response["created_at"]
      user.avatar_url = response["avatar_url"]

      resolve()
      console.log(response)
    },
    error=>{
      user.name = "User not found";
      reject(error)
    })
  })
  return user
  }

  getRepos(name){
    interface repoApiResponse{
      name:string;
      description:string;
      language:string;
      url:string;
    }
    let promise = new Promise((resolve,reject)=>{
      this.repos.length = 0;
      let repoRequest = this.gitUserApi + name + "/repos" +(environment.accesstoken)
      this.http.get<repoApiResponse>(repoRequest).toPromise().then(response=>{
        for(let i=0; i< response["length"]; i++){
          let userRepo = new Repositories ("","","","")
          userRepo.name= response[i]["name"];
          userRepo.description= response[i]["description"];
          userRepo.language= response[i]["language"];
          userRepo.url= this.gitUserAccount + name + "/" + userRepo.name;
          this.repos.push(userRepo)
        }
        resolve()
      }),error =>{
        confirm("repo not found")
        reject(error)
      }
    })
    return this.repos;
  }
}
