export enum workspaceActions  {
  VIEWDETAILS = 'VIEWDETAILS',
  VIEWDASHBOARD = 'VIEWDASHBOARD'
}
export type Iworkspace = {
  _id?: string;
  title: string;
  description: string;
  
  action :workspaceActions
};
