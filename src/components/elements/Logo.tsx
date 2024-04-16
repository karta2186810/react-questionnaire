import { FC, SVGProps } from 'react';

export const Logo: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <path
        d="M300,400V50H150V0H400V400ZM0,400V0H50V400Zm100-50V300h50v50Zm100-25H150V300h50V152H150V275H100V100H275V325ZM50,50V0h50V50Z"
        fill="currentColor"
      />
    </svg>
  );
};
