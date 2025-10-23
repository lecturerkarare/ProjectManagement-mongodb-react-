import { useAppDispatch } from '../../redux/stores';
import { useParams } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';
import { GetProjectById } from '../../redux/feature/project/projectAction';
import { GetProjectArgs, IProject } from '../../redux/feature/project/types';
import { convertToSimpleDate } from '../../utils/util';
const ProjectDetails: React.FC = () => {
  const [project, setProject] = useState<IProject | null>(null);

  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const args: GetProjectArgs = {
      projectId: projectId
    };
    const fetchedProject = async () => {
      try {
        const project = await dispatch(GetProjectById(args));
        setProject(project.payload);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchedProject();
  }, [dispatch, projectId]);

  return (
    <Fragment>
      <h6 className="font-thin text-lg">Project Details</h6>
      {project && (
        <div className="container  max-w-full mx-auto p-4 bg-white shadow-md rounded-md mt-4">
          <div className="flex flex-row space-x-24 mt-2  ">
            <p className=" font-semibold">Project Title :</p>
            <p className="">{project.title}</p>
          </div>
          <div className=" flex flex-row space-x-24 mt-2">
            <p className=" font-semibold">Project Status :</p>
            <p className=" ">{project.status}</p>
          </div>
          <div className=" flex flex-row space-x-24 mt-2">
            <p className=" font-semibold">Start Date :</p>
            <p className=" "> {convertToSimpleDate(new Date(project.startDate ?? new Date()))}</p>
          </div>
          <div className=" flex flex-row space-x-24 mt-3">
            <p className=" font-semibold">End Date :</p>
            <p className=" "> {convertToSimpleDate(new Date(project.endDate ?? new Date()))}</p>
          </div>
          <div className=" flex flex-row space-x-24 mt-2">
            <p className=" font-semibold">Description:</p>
            <p className=" ">{project.description}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProjectDetails;
