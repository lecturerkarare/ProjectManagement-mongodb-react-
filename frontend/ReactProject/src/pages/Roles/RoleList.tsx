import React, { useEffect, useMemo, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import ReusableTable from '../../components/ReusableTable';
import CreateRoleModal from './RoleModal';
import axiosHttp from '../../utils/setAuthToken';
import { toast } from 'react-toastify';
import { isAdmin } from '../../utils/util';
import { IconButton } from '@mui/material';
import TrashIcon from '../../assets/icons/TrashIcon';
import VisibilityIcon from "@mui/icons-material/Visibility";
export interface IRole {
  _id: string;
  name: string;
  description: string;
}

export const RoleList: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<IRole[]>([]);
  const [rowsPerPage] = useState<number>(50);
  const [page, setPage] = useState<number>(1);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRoleDetails, setSelectedRolesDetails] = useState(null);
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'ROLE NAME', minWidth: 150, flex: 1 },
    { field: 'description', headerName: 'DESCRIPTION', minWidth: 250, flex: 2 },
     {
    field: "view",
    headerName: "View",
    headerClassName: "columnHeaders",
    sortable: false,
    minWidth: 50,
    renderCell: (params) => (
      <IconButton
        onClick={() => {
          // handle view logic here
        }}
        title="View"
        color="primary"
      >
        <VisibilityIcon />
      </IconButton>
    ),
  },
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
  ];

  const fetchRoles = async () => {
    try {
      const res = await axiosHttp.get('/role/allRoles');
      const result = res.data?.result || [];

      const withId = result.map((role: any) => ({
        id: role._id,
        name: role.name,
        description: role.description
      }));

      setRoles(withId);
      setFilteredRoles(withId);
    } catch (err) {
      console.error('Failed to fetch roles', err);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    const filtered = roles.filter((role) =>
      `${role.name} ${role.description}`.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredRoles(filtered);
  }, [searchValue, roles]);

  const handleCreateRole = async (data: { name: string; description: string }) => {
    try {
      if (isEdit && selectedRoleDetails?.id) {
        await axiosHttp.patch(`/role/update/${selectedRoleDetails?.id}`, data);
        toast.success('Role updated successfully');
      } else {
        await axiosHttp.post('/role/create-role', data);
        toast.success('Role created successfully');
      }

      setTimeout(() => {
        setModalOpen(false);
        fetchRoles();
      }, 1500);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to save role');
    }
  };

  const handleOnClick = (params: any) => {
    setIsEdit(true);
    setModalOpen(true);
    setSelectedRolesDetails(params.row);
  };
  const handleSelectionOnDelete = async (params: any) => {
    setModalOpen(false);
    await axiosHttp.delete(`/role/delete/${params?.id}`);
    fetchRoles();
  };

  return (
    <div>
      <h6 className="font-thin text-lg">Role List</h6>

      <div className="mt-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
          style={{ width: '200px' }}
        />

        {isAdmin() && (
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Role
          </button>
        )}
      </div>

      <div className="mt-3">
        <ReusableTable
          rows={filteredRoles}
          columns={columns}
          count={Math.ceil(filteredRoles.length / rowsPerPage)}
          page={page}
          setPage={setPage}
          handleOnClick={handleOnClick}
        />
      </div>

      {modalOpen && (
        <CreateRoleModal
          show={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmitRole={handleCreateRole}
          isEdit={isEdit}
          selectedRoleDetails={selectedRoleDetails}
        />
      )}
    </div>
  );
};
