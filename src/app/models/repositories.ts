export class Repositories {
    // public showRepo: boolean
    constructor(
    public name:string,
    public description:string,
    public language:string,
    public html_url: string,
    public forks:number,
    public updated_at:Date ){
      // this.showRepo=true;
  }
}
