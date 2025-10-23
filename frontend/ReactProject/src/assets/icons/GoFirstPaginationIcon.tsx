import colors from '../../lib/colors';
import {SVGProps} from 'react';

const GoFirstPaginationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="10"
    height="12"
    viewBox="0 0 10 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.26796 6.01871L8.20973 1.17393C8.32403 1.06178 8.4766 1 8.63929 1C8.80198 1 8.95456 1.06178 9.06885 1.17393L9.43278 1.53063C9.66959 1.76306 9.66959 2.14083 9.43278 2.37291L5.28305 6.44127L9.43739 10.5141C9.55168 10.6263 9.61479 10.7758 9.61479 10.9352C9.61479 11.0948 9.55168 11.2443 9.43739 11.3565L9.07346 11.7131C8.95907 11.8253 8.80659 11.8871 8.6439 11.8871C8.48121 11.8871 8.32863 11.8253 8.21433 11.7131L3.26796 6.86391C3.15339 6.75141 3.09046 6.60121 3.09082 6.44153C3.09046 6.28124 3.15339 6.13112 3.26796 6.01871Z"
      fill={colors.grey3}
    />
    <path
      d="M1 1L1 11"
      stroke={colors.grey3}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default GoFirstPaginationIcon;
