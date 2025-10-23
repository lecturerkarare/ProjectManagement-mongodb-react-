import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosHttp from '../../../utils/setAuthToken';
import { GetTicketArgs, ITicket, UpdateTicketArgs } from './types';

export const createTicket = createAsyncThunk(
  'ticket/create',
  async (TicketData: ITicket, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await axiosHttp.post(`/ticket/create`, TicketData, config);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllTickets = createAsyncThunk(
  'Ticket/getAllTickets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosHttp.get('/ticket/all');

      return response.data.result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);
export const GeAllMyTicket = createAsyncThunk(
  'Ticket/GeAllMyTicket',
  async (_, { rejectWithValue }) => {
    try {
      const result = await axiosHttp.get(`/ticket/mine`);
      return result.data.result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const GetTicketById = createAsyncThunk(
  'Ticket/GetTicketById',
  async ({ ticketId }: GetTicketArgs, { rejectWithValue }) => {
    try {
      const response = await axiosHttp.get(`/ticket/${ticketId}`);
      return response.data.result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const deleteTicketById = createAsyncThunk(
  'Ticket/deleteTicketById',
  async ({ ticketId }: GetTicketArgs, { rejectWithValue }) => {
    try {
      const response = await axiosHttp.delete(`/ticket/${ticketId}`);
      return response.data.result;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const UpdateTicketById = createAsyncThunk(
  'Ticket/UpdateTicketById',
  async ({ ticketId, ticketData }: UpdateTicketArgs, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await axiosHttp.patch(`/ticket/${ticketId}`, ticketData, config);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const assignTicketById = createAsyncThunk(
  'Ticket/assignTicketById',
  async (
    { TicketId, TicketData }: { TicketId: string; TicketData: ITicket },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await axiosHttp.patch(`/Ticket/assignTo/${TicketId}`, TicketData, config);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
