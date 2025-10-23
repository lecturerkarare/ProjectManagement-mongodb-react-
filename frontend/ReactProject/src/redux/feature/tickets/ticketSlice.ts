import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./types";
import { GeAllMyTicket, GetTicketById, UpdateTicketById, createTicket, deleteTicketById, getAllTickets } from "./ticketActions";

const ticketslice = createSlice({
  name: "project",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(createTicket.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createTicket.fulfilled, (state,{payload}) => {
        state.loading = false;
        state.success = true;
        if (payload) {
          state.tickets = [...state.tickets, payload];
        }
      });
      

    builder.addCase(createTicket.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getAllTickets.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getAllTickets.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        if (payload) {
        state.tickets=payload
        }
      });
      
 
    builder.addCase(getAllTickets.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(GeAllMyTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(GeAllMyTicket.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.success = true;
          if (payload) {
          state.tickets=payload
          }
        });
        
   
      builder.addCase(GeAllMyTicket.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
      builder.addCase(GetTicketById.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(GetTicketById.fulfilled, (state,) => {
          state.loading = false;
          state.success = true;
          
        });
    
     
        builder.addCase(GetTicketById.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        });
       
      
   
      builder.addCase(UpdateTicketById.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(UpdateTicketById.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
          
        });
      
 
    builder.addCase(UpdateTicketById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(deleteTicketById.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(deleteTicketById.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
          
        });
      
 
    builder.addCase(deleteTicketById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});


export const projectReducer = ticketslice.reducer;
