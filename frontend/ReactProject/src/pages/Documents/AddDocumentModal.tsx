import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Autocomplete, TextField } from '@mui/material';

interface ProjectOption {
  id: number;
  label: string;
}

interface AddDocumentModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (file: File | null, projectId: number | null) => void;
  projects: any;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  show,
  onClose,
  onSubmit,
  projects
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectOption | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedFile, selectedProject?.id ?? null);
    setSelectedFile(null);
    setSelectedProject(null);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" size="lg">
      <form onSubmit={handleSubmit}>
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Upload Document</h2>
          <button type="button" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className=" px-6 py-4 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Project</label>
          <Autocomplete
            disablePortal
            value={selectedProject}
            options={projects}
            onChange={(event, newValue) => setSelectedProject(newValue)}
            renderInput={(params) => (
              <TextField {...params} size="small" placeholder="Select Project" />
            )}
          />
        </div>
        <div className="px-6 py-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select File</label>
            <input
              type="file"
              accept="*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                         file:rounded file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

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
            Upload
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddDocumentModal;
