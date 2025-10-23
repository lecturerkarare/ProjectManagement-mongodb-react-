import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IUserForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface CreateUserModalProps {
  show: boolean;
  onClose: () => void;
  onSubmitUser: (data: IUserForm) => void;
  isEdit: boolean;
  selectedUsersDetails: any;
  roles: any;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  show,
  onClose,
  isEdit,
  selectedUsersDetails,
  onSubmitUser,
  roles
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<IUserForm>();
  const [selectedRole, setSelectedRole] = useState(null);

  const onSubmit: SubmitHandler<IUserForm> = (data) => {
    if (selectedRole) {
      const payload = {
        ...data,
        role: [selectedRole.id]
      };
      onSubmitUser(payload);
    } else {
      toast.error('Please select a role');
    }
  };

  useEffect(() => {
    if (isEdit && selectedUsersDetails) {
      reset({
        firstname: selectedUsersDetails.firstName || '',
        lastname: selectedUsersDetails.lastName || '',
        email: selectedUsersDetails.emalAddress || ''
       
      });

      setSelectedRole(roles.find((r: any) => r.name === selectedUsersDetails.role) || null);
    }
  }, [isEdit, selectedUsersDetails, reset, roles]);
  return (
    <Modal show={show} onHide={onClose} backdrop="static" size="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEdit ? 'Update User' : 'Create User'}
          </h2>
          <button type="button" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
        </div>

        <Modal.Body>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                {...register('firstname', { required: 'First name is required' })}
                className="form-control"
                placeholder="Enter first name"
              />
              {errors.firstname && (
                <small className="text-danger">{errors.firstname.message}</small>
              )}
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                {...register('lastname', { required: 'Last name is required' })}
                className="form-control"
                placeholder="Enter last name"
              />
              {errors.lastname && <small className="text-danger">{errors.lastname.message}</small>}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              className="form-control"
              placeholder="Enter email"
            />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
          </div>
          {!isEdit && (
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required', minLength: 6 })}
                className="form-control"
                placeholder="Enter password"
              />
              {errors.password && <small className="text-danger">{errors.password.message}</small>}
            </div>
          )}

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Role</label>
            <Autocomplete
              disablePortal
              value={selectedRole}
              options={roles}
              getOptionLabel={(option: any) => option.name}
              onChange={(event, newValue) => setSelectedRole(newValue)}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Select Role" />
              )}
            />
          </div>
        </Modal.Body>

        <div className="px-6 py-4 border-t flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            {isEdit ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
