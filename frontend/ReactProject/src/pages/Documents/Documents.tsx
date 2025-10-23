import { useEffect, useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import AddDocumentModal from './AddDocumentModal';
import { getAllProjects, GeAllMyProject } from '../../redux/feature/project/projectAction';
import { IProject } from '../../redux/feature/project/types';
import { RootState, useAppDispatch } from '../../redux/stores';
import { isAdmin } from '../../utils/util';
import { useSelector } from 'react-redux';
import axiosFileHttp from '../../utils/fileAxios';

const BASE_URL = 'http://localhost:3001/'; 

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const projects: IProject[] | undefined = useSelector(
    (state: RootState) => state.project.projects
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionToDispatch = isAdmin() ? getAllProjects() : GeAllMyProject();
        await dispatch(actionToDispatch);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleCreateDocument = () => {
    setModalOpen(true);
  };

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
      fetchDocuments();
    } catch (error: any) {
      console.error('Error uploading file:', error?.response?.data || error.message);
    }
  };

  const projectOptions: any[] =
    projects?.map((project) => ({
      id: project._id,
      label: project.title
    })) ?? [];

  const fetchDocuments = async () => {
    try {
      const res = await axiosFileHttp.get('/file/documents');
      const files = res.data?.result || [];

      const formattedDocs = files.map((file: any) => ({
        id: file._id,
        name: file.name,
        path: file.path?.replace(/\\/g, '/'), // Corrected here
        uploadedAt: file.createdAt,
        uploader: file.uploadedBy?.firstname + ' ' + file.uploadedBy?.lastname,
        projectTitle: file.project?.title || 'No Project',
        projectId: file.project?._id || null
      }));

      console.log(formattedDocs, 'dd');
      setDocuments(formattedDocs);
    } catch (err) {
      console.error('Failed to fetch files:', err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Documents</h2>

      <div className="mt-4 flex justify-end items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleCreateDocument}>
          Add Document
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-blue-600 mb-2">{doc.projectTitle}</h3>

            <div className="mb-3">
              {doc.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                <a
                  href={`${BASE_URL}${doc.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block">
                  <img
                    src={`${BASE_URL}${doc.path}`}
                    alt={doc.name}
                    className="w-full h-40 object-cover rounded cursor-pointer"
                  />
                </a>
              ) : (
                <a
                  href={`${BASE_URL}${doc.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block">
                  <FaFileAlt className="w-full h-40 text-gray-400 cursor-pointer" />
                </a>
              )}
            </div>

            <p className="font-semibold text-gray-800 truncate">{doc.name}</p>
            <p className="text-sm text-gray-500">
              Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">By: {doc.uploader}</p>
          </div>
        ))}
      </div>

      {modalOpen && (
        <AddDocumentModal
          onSubmit={handleDocumentSubmit}
          projects={projectOptions}
          show={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Documents;
