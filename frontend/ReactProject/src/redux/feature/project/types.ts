export interface  IProject  {
    _id:string
    title: string;
    description: string;
    startDate:  string;
    status:string
    endDate: string;
    assignedTo:any
  };


 export  interface GetProjectArgs {
    projectId: string  |undefined
  }
  
interface ProjectState {
    loading: boolean;
    projects: IProject[] ;
    error: null | unknown;
    success: boolean;
  }
  
  export const initialState: ProjectState = {
    loading: false,
    projects: []  , 
    error: null,
    success: false,
  };
  
  export interface UpdateProjectArgs {
    projectId: string;
    projectData: IProject;
  }