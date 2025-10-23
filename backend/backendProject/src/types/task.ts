import { Status } from "./project";

export interface ITask{
    _id?:string;
    name?:string
    isCompleted?:boolean
    assignedTo?:string
    startDate?:Date
    dueDate?:Date
    endDate?:Date
    priority:Ipriority
    status?:Status

}
export enum Ipriority{
    HIGH ="HIGH",
    LOW ="LOW",
    MEDIUM ="MEDIUM",
    NONE ="NONE"
}
