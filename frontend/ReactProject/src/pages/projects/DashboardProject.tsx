import React, { useEffect, useMemo, useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/stores';
import { GeAllMyProject, getAllProjects } from '../../redux/feature/project/projectAction';
import { useSelector } from 'react-redux';
import { isAdmin } from '../../utils/util';
import { IProject } from '../../redux/feature/project/types';
import ReusableTable from '../../components/ReusableTable';
import CreateProjectModal from './CreateProject';
export const DashboardProject: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState<number>(50);
  const [page, setPage] = useState<number>(1);

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
    // {
    //   field: 'priority',
    //   headerName: 'PRIORITY',
    //   headerClassName: 'columnHeaders',
    //   minWidth: 120,
    //   flex: 1
    // },
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
    }
  ];

  const projects: IProject[] | undefined = useSelector(
    (state: RootState) => state.project.projects
  );

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionToDispatch = isAdmin() ? getAllProjects() : GeAllMyProject();

        await dispatch(actionToDispatch);
      } catch (error) {}
    };
    fetchData();
  }, [dispatch, isAdmin]);
  const handleOnClick = () => {};

  const rows = useMemo(() => {
    return projects?.map((project, index) => ({
      id: project?._id,
      title: project?.title,
      description: project.description,
      status: project?.status,
      priority: project?.priority,
      startDate: new Date(project?.startDate).toLocaleDateString(),
      endDate: new Date(project?.endDate).toLocaleDateString(),
      createdby: `${project?.user?.firstname} ${project?.user?.lastname}`,
      email: project?.user?.email,
      progress: `${project?.percentageCompleted}%`,
      index: index + 1
    }));
  }, [projects]);

  // const handleCreateProjec = () => {
  //   setModalOpen(true);
  // };
  return (
    <div>
      <h6 className="font-thin text-lg mt-4">My Projects List</h6>

      <div className="mt-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 "
          style={{ width: '200px' }}
        />

        {/* {isAdmin() && (
          <button onClick={handleCreateProjec} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Project
          </button>
        )} */}
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

      {modalOpen && <CreateProjectModal show={modalOpen} onClose={() => setModalOpen(false)} />}
    </div>
  );
};
