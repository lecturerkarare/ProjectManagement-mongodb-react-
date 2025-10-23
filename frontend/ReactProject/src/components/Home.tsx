import React, { useEffect, useState } from 'react';
import { FaUsers, FaClipboardList, FaHourglassHalf, FaRegCheckCircle } from 'react-icons/fa';
import { DashboardProject } from '../pages/projects/DashboardProject';
import axiosHttp from '../utils/setAuthToken';
import { jwtDecode } from 'jwt-decode';

interface CardData {
  title: string;
  value: number;
  icon: JSX.Element;
  bgColor: string;
}

interface ProjectStatusCount {
  completed_count: number;
  pending_count: number;
  ongoing_count: number;
  onhold_count: number;
  all_count: number;
}

export const Home: React.FC = () => {
  const getuserDetails = localStorage.getItem('token');

  const [projectStatusCount, setProjectStatusCount] = useState<ProjectStatusCount>({
    completed_count: 0,
    pending_count: 0,
    ongoing_count: 0,
    onhold_count: 0,
    all_count: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(decoded));
      } catch (err) {
        console.error('Invalid token', err);
      }
    }
    const fetchProjectStatus = async () => {
      try {
        const { data } = await axiosHttp.get('/project/status/count');
        console.log('Status Count Response:', data.result);
        setProjectStatusCount(data.result);
      } catch (error) {
        console.error('Error fetching project status counts:', error);
      }
    };

    fetchProjectStatus();
  }, []);

const cards: CardData[] = [
  {
    title: 'All Projects',
    value: projectStatusCount.all_count,
    icon: <FaClipboardList size={24} />,
    bgColor: 'bg-blue-100'
  },
  {
    title: 'Completed Projects',
    value: projectStatusCount.completed_count,
    icon: <FaRegCheckCircle size={24} />,
    bgColor: 'bg-emerald-100'
  },
  {
    title: 'Pending Projects',
    value: projectStatusCount.pending_count,
    icon: <FaHourglassHalf size={24} />,
    bgColor: 'bg-orange-100'
  },
  {
    title: 'Ongoing Projects',
    value: projectStatusCount.ongoing_count,
    icon: <FaHourglassHalf size={24} />,
    bgColor: 'bg-yellow-100'
  },
  {
    title: 'On-Hold Projects',
    value: projectStatusCount.onhold_count,
    icon: <FaHourglassHalf size={24} />,
    bgColor: 'bg-red-100'
  }
];


  return (
  <div className="mt-6 px-4">
  <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {cards.map((card, index) => (
      <div
        key={index}
        className={`rounded-lg shadow-md p-4 flex items-center justify-between ${card.bgColor}`}>
        <div>
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="text-2xl font-bold">{card.value}</p>
        </div>
        <div className="text-gray-700">{card.icon}</div>
      </div>
    ))}
  </div>
  <DashboardProject />
</div>

  );
};
