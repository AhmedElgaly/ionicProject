import { ChildLocation } from "./ChildLocation.class";
import { SchoolLocation } from "./SchoolLocation.class";
import { InitLocation } from "./intLocation.class";

export class Child{
  public  $key:string;
   public Name:string;
   public Age:string;
    public locationChild:ChildLocation;
    public locationSchool:SchoolLocation;
    
    public childSchool:string;
    private parentId: string;
    public get ParentId(): string {
        return this.parentId;
    }
    public set ParentId(value: string) {
        this.parentId = value;
    }
    constructor(){

    }

    
}