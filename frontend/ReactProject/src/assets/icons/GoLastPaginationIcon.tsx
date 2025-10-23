import colors from '../../lib/colors';
import {SVGProps} from 'react';


const GoLastPaginationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="10"
    height="12"
    viewBox="0 0 10 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.73204 6.01871L1.79027 1.17393C1.67597 1.06178 1.5234 1 1.36071 1C1.19802 1 1.04544 1.06178 0.931145 1.17393L0.567218 1.53063C0.330408 1.76306 0.330408 2.14083 0.567218 2.37291L4.71695 6.44127L0.562614 10.5141C0.448316 10.6263 0.385209 10.7758 0.385209 10.9352C0.385209 11.0948 0.448316 11.2443 0.562614 11.3565L0.926541 11.7131C1.04093 11.8253 1.19341 11.8871 1.3561 11.8871C1.51879 11.8871 1.67137 11.8253 1.78567 11.7131L6.73204 6.86391C6.84661 6.75141 6.90954 6.60121 6.90918 6.44153C6.90954 6.28124 6.84661 6.13112 6.73204 6.01871Z"
      fill={colors.grey3}
    />
    <path
      d="M9 1L9 11"
      stroke={colors.grey3}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default GoLastPaginationIcon;
