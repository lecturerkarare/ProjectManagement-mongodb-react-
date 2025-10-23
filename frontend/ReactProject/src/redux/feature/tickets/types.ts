import { IProject } from '../project/types';

export interface ITicket {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  dueDate: Date;
  project: IProject;
  assignedTo: any;
}

export  interface GetTicketArgs {
    ticketId: string  |undefined
  }
  export interface UpdateTicketArgs {
    ticketId: string;
    ticketData: IProject;
  }
  interface TicketState {
    loading: boolean;
    tickets: ITicket[] ;
    error: null | unknown;
    success: boolean;
  }

  export const initialState: TicketState = {
    loading: false,
    tickets: []  , 
    error: null,
    success: false,
  };