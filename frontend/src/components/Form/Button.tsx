import type { ButtonHTMLAttributes } from 'react';

import { cn } from '../../utils/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'w-full text-white bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 focus:ring-blue-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
        props.disabled &&
          'text-gray-500 bg-gray-100 cursor-not-allowed hover:bg-gray-100 focus:bg-gray-100',
        props.className,
      )}
    />
  );
};

export default Button;
