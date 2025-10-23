export interface IComments{
    _id: string;
    comments:string
    commentedBy:string
}
export enum CommentType {
    TICKETCOMMENT='TICKETCOMMENT',
    TASKCOMMENT='TASKCOMMENT',
    PROJECTCOMMENT='PROJECTCOMMENT'


}