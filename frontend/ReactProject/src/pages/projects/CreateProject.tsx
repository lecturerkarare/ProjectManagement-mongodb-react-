import { isAdmin, isManager } from '../../utils/util';
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

export enum Status {
  NOTSTARTED = 'NOTSTARTED',
  COMPLETED = 'COMPLETED',
  ONHOLD = 'ONHOLD',
  ONGOING = 'ONGOING'
}

export interface IProjectForm {
  title: string;
  description: string;
  status: Status;
  priority: string;
  startDate: string;
  endDate: string;
}

interface CreateProjectModalProps {
  show: boolean;
  onClose: () => void;
  onSubmitProject: (data: any) => void;
  selectedProjectDetails: any;
  isEdit: any;
  users: any;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  show,
  onClose,
  users,
  isEdit,
  selectedProjectDetails,
  onSubmitProject
}) => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors }
  } = useForm<IProjectForm>();

  const [assignedUsers, setAssignedUsers] = useState<any[]>([]);

  const onSubmit: SubmitHandler<IProjectForm> = (data) => {
    const finalData = {
      ...data,
      assignedTo: assignedUsers.map((user: any) => user?.id)
    };
    onSubmitProject(finalData);
    reset();
    setAssignedUsers([]);
    onClose();
  };

  const formatDateToInput = (dateStr: string) => {
    const [month, day, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isEdit && selectedProjectDetails) {
      const formattedData = {
        ...selectedProjectDetails,
        startDate: formatDateToInput(selectedProjectDetails.startDate),
        endDate: formatDateToInput(selectedProjectDetails.endDate)
      };
      reset(formattedData);
      // Handle assignedTo (array or object)
      if (selectedProjectDetails?.assignedTo) {
        let selected: any[] = [];
        if (Array.isArray(selectedProjectDetails.assignedTo)) {
          // Case 1: assignedTo is an array of user IDs
          selected = users.filter((user) => selectedProjectDetails.assignedTo.includes(user.id));
        } else if (selectedProjectDetails.assignedTo?._id) {
          // Case 2: assignedTo is a single user object
          selected = users.filter((user) => user.id === selectedProjectDetails?.assignedTo?._id);
        }
        setAssignedUsers(selected);
      }
    }
  }, [isEdit, selectedProjectDetails, users, reset]);

  const statusOptions = Object.values(Status);
console.log(isManager(),'dde')
  return (
    <Modal show={show} onHide={onClose} size="lg" backdrop="static">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEdit ? 'Update Project' : 'Create Project'}
          </h2>
          <button type="button" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
        </div>

        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              className="form-control"
              placeholder="Enter Project Title"
            />
            {errors.title && <small className="text-danger">{errors.title.message}</small>}
          </div>

          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                {...register('startDate', { required: 'Start Date is required' })}
                className="form-control"
              />
              {errors.startDate && (
                <small className="text-danger">{errors.startDate.message}</small>
              )}
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">End Date</label>
              <input
                type="date"
                {...register('endDate', { required: 'End Date is required' })}
                className="form-control"
              />
              {errors.endDate && <small className="text-danger">{errors.endDate.message}</small>}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="form-control"
              placeholder="Enter Project Description"
            />
            {errors.description && (
              <small className="text-danger">{errors.description.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <Controller
              control={control}
              name="status"
              rules={{ required: 'Status is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  SelectProps={{ native: true }}
                  className="form-control">
                  <option value="">Select Status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </TextField>
              )}
            />
            {errors.status && <small className="text-danger">{errors.status.message}</small>}
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Users</label>
            <Autocomplete
              multiple
              disablePortal
              options={users}
              value={assignedUsers}
              getOptionLabel={(option: any) => `${option?.firstName} ${option?.lastName}` || ''}
              onChange={(event, newValue) => setAssignedUsers(newValue)}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Select Users" />
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
       {(isAdmin() || isManager()) && (
  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
    {isEdit ? 'Update' : 'Save'}
  </button>
)}

        </div>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
