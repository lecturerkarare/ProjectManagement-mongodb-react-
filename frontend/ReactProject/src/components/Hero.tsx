import React from 'react';
import bug from '../assets/Bugfixingamico.svg';

const Hero: React.FC = () => {
  return (
    <div className="mt-32">
      <div className="container mx-auto px-4 flex flex-col items-center md:flex-row md:items-start">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:ml-20">
          <h4 className="text-xl  font-bold  text-gray-800 ">
            Streamline your Ticket Management Operations: Helping to Track Tickets Across the Team
            from Creation to Closure
          </h4>
          <p className="mt-3 text-lg">
            Efficient ticket management is the cornerstone of effective operations for any
            organization. Whether you're a customer service team, an IT department, or a project
            management team, having a robust ticket management system in place can significantly
            streamline your workflow and enhance productivity.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img src={bug} className="w-custom-width" alt="bug" />
        </div>
      </div>
      <div className="container mx-auto px-4 flex flex-col items-center  md:items-start w-full ">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Value and Mission</h2>
        <p className="text-lg">
          Our ticket management system is designed to simplify the process of tracking and resolving
          tickets across your organization. Whether you're an IT department handling technical
          issues or a customer service team managing user inquiries, our system provides a
          centralized platform for efficient ticket management.
        </p>
      </div>
    </div>
  );
};

export default Hero;
