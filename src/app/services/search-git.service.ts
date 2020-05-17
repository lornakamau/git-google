import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Users } from '../models/users'; 
import { Repositories } from '../models/repositories';
import { ActivatedRoute } from '@angular/router';
import { RepositoriesByName } from '../models/repositories-by-name';

@Injectable({
  providedIn: 'root'
})
export class SearchGitService {

  user:Users; 
  repos:Repositories[] = [];
  username:string;
  reposByName:RepositoriesByName[] = [];
  reponame: string;
  numberOfRepos: number;
  repositories =[]

  constructor( private http:HttpClient, private route: ActivatedRoute ) {
    this.user = new Users("","","","",0,0,0,new Date (),"","");
  }
  
  userInfoRequest(username){
    interface userApiResponse{
      name:string;
      login:string;
      bio:string;
      url: string;
      followers: number;
      following: number;
      public_repos : number; //check this out
      created_at : Date;
      avatar_url:string;
      email: string;
    }
    let promise = new Promise((resolve,reject)=>{
      this.http.get<userApiResponse>(`${environment.gitUrl}${username}?client_id=${environment.API_Key}`).toPromise().then(response=>{
        this.user.name =  response.name
        this.user.login = response.login
        this.user.bio =  response.bio
        this.user.url =  response.url
        this.user.followers =  response.followers
        this.user.following =  response.following
        this.user.public_repos =  response.public_repos
        this.user.created_at =  response.created_at
        this.user.avatar_url =  response.avatar_url
        this.user.email = response.email
        resolve()
      },
      error=>{
        this.user.login= "User not found"
        console.log("an error occured")
        reject(error)
      })
    })
    return promise
  }

  userRepoRequest(username){
    interface repoApiResponse{
    name:string,
    description:string,
    language:string,
    html_url: string
    }
    let promise = new Promise((resolve,reject)=>{
      let arrayLength = this.repos.length;
      for(let i=0; i<arrayLength; i++){ //removing initial values from repos array before pushing to the array
        this.repos.pop()
      }
      this.http.get<repoApiResponse>(`${environment.gitUrl}${username}/repos?client_id=${environment.API_Key}`).toPromise().then(response=>{
        for(let i=0; i<response["length"]; i++){
          let repo = new Repositories("","","","",0,new Date());
        repo.name =  response[i]["name"]
        repo.description =  response[i]["description"]
        repo.language =  response[i]["language"]
        repo.html_url =  response[i]["html_url"]
        repo.forks = response[i]["forks"]
        repo.updated_at = response[i]["updated_at"]
        this.repos.push(repo)
        }
        resolve()
      },
      error=>{
        console.log("an error occured")
        reject(error)
      })
    })
    return promise
  }

  // https://api.github.com/search/repositories?q=lorna+portfolio
  repoByNameRequest(reponame){
    interface repoByNameApiResponse{
      total_count:number,
      items: []
      } 
      let promise = new Promise((resolve,reject)=>{
        let arrayLength = this.reposByName.length;
        for(let i=0; i<arrayLength; i++){ //removing initial values from array before pushing to the array
          this.reposByName.pop()
        }
        this.http.get<repoByNameApiResponse>(`https://api.github.com/search/repositories?q=${reponame}`).toPromise().then(response=>{
          this.numberOfRepos =response.total_count
          // this.repositories = response.items
          for(let i=0; i<response.items.length; i++){
            let repoByName = new RepositoriesByName ("","","","",0,new Date());
          repoByName.name =  response.items[i]["name"]
          repoByName.description =  response.items[i]["description"]
          repoByName.language =  response.items[i]["language"]
          repoByName.html_url =  response.items[i]["html_url"]
          repoByName.forks = response.items[i]["forks"]
          repoByName.updated_at = response.items[i]["updated_at"]
          this.reposByName.push(repoByName)
          }
          resolve()
          console.log(this.reposByName)
        },
        error=>{
          console.log("an error occured")
          reject(error)
        })
      })
      return promise
  }
  
}
  
      
