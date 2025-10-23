import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import ReusableTable from '../../components/ReusableTable';
import CreateUserModal from './CreateUser';
import axiosHttp from '../../utils/setAuthToken';
import { toast } from 'react-toastify';
import { IRole } from '../Roles/RoleList';
import { IconButton } from '@mui/material';
import TrashIcon from '../../assets/icons/TrashIcon';
import VisibilityIcon from "@mui/icons-material/Visibility";
interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  emalAddress: string;
  branchName: string;
  role: string;
}

export const MemberList: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [rowsPerPage] = useState<number>(50);
  const [page, setPage] = useState<number>(1);
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUsersDetails, setSelectedUsersDetails] = useState(null);
  const [roles, setRoles] = useState<IRole[]>([]);
  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'FIRST NAME', minWidth: 150, flex: 1 },
    { field: 'lastName', headerName: 'LAST NAME', minWidth: 150, flex: 1 },
    { field: 'emalAddress', headerName: 'EMAIL ADDRESS', minWidth: 150, flex: 1 },
    { field: 'role', headerName: 'ROLE', minWidth: 150, flex: 1 },
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
  const fetchUsers = async () => {
    try {
      const response = await axiosHttp.get('/user/all');
      const result = response.data?.result || [];

      const withId = result.map((user: any) => ({
        id: user._id,
        firstName: user?.firstname || '',
        lastName: user?.lastname || '',

        emalAddress: user?.email || '',

        role: user.role?.[0]?.name || '—'
      }));

      setUsers(withId);
      setFilteredUsers(withId);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      `${user.firstName} ${user.lastName} ${user.userName} ${user.emalAddress} ${user.branchName} ${user.role}`
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchValue, users]);

  const handleOnClick = (params: any) => {
    setSelectedUsersDetails(params?.row);

    setIsEdit(true);
    setModalOpen(true);
  };

  const handleCreateProject = () => {
    setModalOpen(true);
     setIsEdit(false)
  };

  const handleCreateUser = async (data: any) => {
    try {
      if (isEdit && selectedUsersDetails?.id) {
        await axiosHttp.patch(`/user/${selectedUsersDetails?.id}`, data);
        toast.success('User updated successfully');
      } else {
        await axiosHttp.post('/auth/signup', data);
        toast.success('User created successfully');
      }

      setTimeout(() => {
        setModalOpen(false);
        setIsEdit(false);
        setSelectedUsersDetails(null);
        fetchUsers();
      }, 1500);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to save user');
    }
  };

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
    } catch (err) {
      console.error('Failed to fetch roles', err);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);
  const handleSelectionOnDelete = async (params: any) => {
    setModalOpen(false);
    await axiosHttp.delete(`/user/${params?.id}`);
    fetchUsers()
  };

  return (
    <div>
      <h6 className="font-thin text-lg">Users List</h6>

      <div className="mt-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
          style={{ width: '200px' }}
        />

        <button onClick={handleCreateProject} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add User
        </button>
      </div>

      <div className="mt-3">
        <ReusableTable
          rows={filteredUsers}
          columns={columns}
          count={Math.ceil(filteredUsers.length / rowsPerPage)}
          page={page}
          setPage={setPage}
          handleOnClick={handleOnClick}
        />
      </div>

      {modalOpen && (
        <CreateUserModal
          show={modalOpen}
          onSubmitUser={handleCreateUser}
          onClose={() => setModalOpen(false)}
          selectedUsersDetails={selectedUsersDetails}
          isEdit={isEdit}
          roles={roles}
        />
      )}
    </div>
  );
};
