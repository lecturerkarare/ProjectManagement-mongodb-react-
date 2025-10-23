import React, { useEffect, useMemo, useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/stores';
import { GeAllMyProject, getAllProjects } from '../../redux/feature/project/projectAction';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { isAdmin, isManager } from '../../utils/util';
import { IProject } from '../../redux/feature/project/types';
import ReusableTable from '../../components/ReusableTable';
import CreateProjectModal, { IProjectForm } from './CreateProject';
import axiosHttp from '../../utils/setAuthToken';
import { toast } from 'react-toastify';
import { IconButton } from '@mui/material';
import TrashIcon from '../../assets/icons/TrashIcon';
import AddDocumentModal from '../Documents/AddDocumentModal';
import axiosFileHttp from '../../utils/fileAxios';
export const ProjectList: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [rowsPerPage] = useState<number>(50);
  const [page, setPage] = useState<number>(1);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [users, setUsers] = useState<any[]>([]);
  const [modaldocumentOpen, setModalOpendocumentOpen] = useState(false);

  const columns = [
    {
      field: 'title',
      headerName: 'TITLE',
      headerClassName: 'columnHeaders',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'description',
      headerName: 'DESCRIPTION',
      headerClassName: 'columnHeaders',
      minWidth: 200,
      flex: 2
    },
    {
      field: 'status',
      headerName: 'STATUS',
      headerClassName: 'columnHeaders',
      minWidth: 120,
      flex: 1
    },
    {
      field: 'startDate',
      headerName: 'START DATE',
      headerClassName: 'columnHeaders',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'endDate',
      headerName: 'END DATE',
      headerClassName: 'columnHeaders',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'createdby',
      headerName: 'CREATED BY',
      headerClassName: 'columnHeaders',
      minWidth: 180,
      flex: 1
    },
    {
      field: 'assignedTo',
      headerName: 'ASSIGNED TO',
      headerClassName: 'columnHeaders',
      minWidth: 180,
      flex: 1
    },
    {
      field: 'view',
      headerName: 'View',
      headerClassName: 'columnHeaders',
      sortable: false,
      minWidth: 50,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            // handle view logic here
          }}
          title="View"
          color="primary">
          <VisibilityIcon />
        </IconButton>
      )
    },

    ...(isAdmin()
      ? [
          {
            field: 'delete',
            headerName: 'Delete',
            headerClassName: 'columnHeaders',
            sortable: false,
            renderCell: (params) => (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleSelectionOnDelete(params);
                }}>
                <TrashIcon />
              </IconButton>
            )
          }
        ]
      : [])
  ];

  const projects: IProject[] | undefined = useSelector(
    (state: RootState) => state.project.projects
  );

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionToDispatch = getAllProjects();

        await dispatch(actionToDispatch);
      } catch (error) {}
    };
    fetchData();
  }, [dispatch, isAdmin]);
  const handleOnClick = (params: any) => {
    setIsEdit(true);
    setModalOpen(true);
    setSelectedProjectDetails(params?.row);
  };

  const rows = useMemo(() => {
    return projects?.map((project, index) => ({
      id: project?._id,
      title: project.title,
      description: project.description,
      status: project.status,
      priority: project.priority,
      startDate: new Date(project.startDate).toLocaleDateString(),
      endDate: new Date(project.endDate).toLocaleDateString(),
      createdby: `${project.user.firstname} ${project.user.lastname}`,
      email: project.user.email,
      progress: `${project.percentageCompleted}%`,
      index: index + 1,
      assignedTo: project?.assignedTo?.firstname
    }));
  }, [projects]);

  const handleCreateProjec = () => {
    setModalOpen(true);
    setIsEdit(false);
  };

  const handleCreateProject = async (data: IProjectForm) => {
    try {
      if (isEdit && selectedProjectDetails?.id) {
        await axiosHttp.patch(`/project/${selectedProjectDetails.id}`, data);
        toast.success('Project updated successfully');
      } else {
        await axiosHttp.post('/project/create', data);
        toast.success('Project created successfully');
      }

      setModalOpen(false);
      dispatch(getAllProjects());
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to save project');
    }
  };
  const handleSelectionOnDelete = async (params: any) => {
    setModalOpen(false);
    await axiosHttp.delete(`/project/${params?.id}`);
    dispatch(getAllProjects());
  };
  const fetchUsers = async () => {
    try {
      const response = await axiosHttp.get('/user/all');
      const result = response.data?.result || [];

      const withId = result.map((user: any) => ({
        id: user._id,
        firstName: user?.firstname || '',
        lastName: user?.lastname || ''
      }));

      setUsers(withId);
      // setFilteredUsers(withId);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const projectOptions: any[] =
    projects?.map((project) => ({
      id: project._id,
      label: project.title
    })) ?? [];
  const handleDocumentSubmit = async (file: File | null, projectId: string | null) => {
    if (!file || !projectId) {
      console.error('File or projectId missing');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axiosFileHttp.post(`/file/create/${projectId}`, formData);

      console.log('File uploaded successfully:', res.data);
    } catch (error: any) {
      console.error('Error uploading file:', error?.response?.data || error.message);
    }
  };

  return (
    <div>
      <h6 className="font-thin text-lg">Projects List</h6>

      <div className="mt-4 flex justify-between items-center">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
          style={{ width: '200px' }}
        />

        {/* Buttons container */}
        {isAdmin() && (
          <div className="flex gap-2">
            {/* <button
              onClick={handleCreateDocument}
              className="bg-blue-500 text-white px-4 py-2 rounded">
              Import File
            </button> */}
            <button
              onClick={handleCreateProjec}
              className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Project
            </button>
          </div>
        )}
      </div>

      <div className="mt-3">
        <ReusableTable
          rows={rows}
          columns={columns}
          count={Math.ceil((projects?.length || 0) / rowsPerPage)}
          page={page}
          setPage={setPage}
          handleOnClick={handleOnClick}
        />
      </div>

      {modalOpen && (
        <CreateProjectModal
          selectedProjectDetails={selectedProjectDetails}
          isEdit={isEdit}
          onSubmitProject={handleCreateProject}
          show={modalOpen}
          onClose={() => setModalOpen(false)}
          users={users}
        />
      )}
      {modaldocumentOpen && (
        <AddDocumentModal
          onSubmit={handleDocumentSubmit}
          projects={projectOptions}
          show={modaldocumentOpen}
          onClose={() => setModalOpendocumentOpen(false)}
        />
      )}
    </div>
  );
};
