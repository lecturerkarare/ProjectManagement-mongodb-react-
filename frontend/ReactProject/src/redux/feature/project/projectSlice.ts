import { createSlice } from "@reduxjs/toolkit";
import { GeAllMyProject, GetAllProjectDashboard, GetProjectById, GetUserProjectDashboard, UpdateProjectById, assignProjectById, createProject, deleteProjectById, getAllProjects } from "./projectAction";
import { initialState } from "./types";

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(createProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createProject.fulfilled, (state,{payload}) => {
        state.loading = false;
        state.success = true;
        if (payload) {
          state.projects = [...state.projects, payload];
        }
      });
      

    builder.addCase(createProject.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getAllProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getAllProjects.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        if (payload) {
        state.projects=payload
        }
      });
      
 
    builder.addCase(getAllProjects.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(GeAllMyProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(GeAllMyProject.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.success = true;
          if (payload) {
          state.projects=payload
          }
        });
        
   
      builder.addCase(GeAllMyProject.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
      builder.addCase(GetProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(GetProjectById.fulfilled, (state,) => {
          state.loading = false;
          state.success = true;
          
        });
    
     
        builder.addCase(GetProjectById.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        });
        builder.addCase(GetUserProjectDashboard.pending, (state) => {
          state.loading = true;
          state.error = null;
        });
    
        builder.addCase(GetUserProjectDashboard.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            
          });
        
   
      builder.addCase(GetUserProjectDashboard.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
      builder.addCase(GetAllProjectDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(GetAllProjectDashboard.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
          
        });
      
 
    builder.addCase(GetAllProjectDashboard.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
   
      builder.addCase(assignProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(assignProjectById.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
          
        });
      
 
    builder.addCase(assignProjectById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

   
      builder.addCase(UpdateProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(UpdateProjectById.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
          
        });
      
 
    builder.addCase(UpdateProjectById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(deleteProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(deleteProjectById.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
          
        });
      
 
    builder.addCase(deleteProjectById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});


export const projectReducer = projectSlice.reducer;
