import colors from '../../lib/colors';
import {SVGProps} from 'react';

const GoPrevPaginationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.267957 5.9278L5.20973 1.08302C5.32403 0.970873 5.4766 0.909092 5.63929 0.909092C5.80198 0.909092 5.95456 0.970873 6.06885 1.08302L6.43278 1.43972C6.66959 1.67215 6.66959 2.04992 6.43278 2.282L2.28305 6.35036L6.43739 10.4232C6.55168 10.5354 6.61479 10.6849 6.61479 10.8443C6.61479 11.0039 6.55168 11.1534 6.43739 11.2656L6.07346 11.6222C5.95907 11.7344 5.80659 11.7961 5.6439 11.7961C5.48121 11.7961 5.32863 11.7344 5.21433 11.6222L0.267957 6.77301C0.153389 6.66051 0.0904623 6.5103 0.0908218 6.35063C0.0904623 6.19033 0.153389 6.04022 0.267957 5.9278Z"
      fill={colors.grey3}
    />
  </svg>
);

export default GoPrevPaginationIcon;
