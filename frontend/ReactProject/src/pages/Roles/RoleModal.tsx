import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IRoleForm {
  name: string;
  description: string;
}

interface CreateRoleModalProps {
  show: boolean;
  onClose: () => void;
  onSubmitRole: (data: IRoleForm) => void;
  selectedRoleDetails:any
  isEdit:any
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({ show, onClose,isEdit,selectedRoleDetails, onSubmitRole }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<IRoleForm>();

  const onSubmit: SubmitHandler<IRoleForm> = (data) => {
    onSubmitRole(data);
    reset();
    onClose();
  };
useEffect(() => {
  if (isEdit && selectedRoleDetails) {
    reset({
      name: selectedRoleDetails.name || '',
      description: selectedRoleDetails.description || '',
    });
  }
}, [isEdit, selectedRoleDetails, reset]);
  return (
    <Modal show={show} onHide={onClose} backdrop="static" size="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">{isEdit?"Update Role":"Create Role"}</h2>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Role name is required' })}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter role name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            {isEdit?"Update":"Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRoleModal;
