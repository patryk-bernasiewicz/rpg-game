import { InputHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '../../utils/cn';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  rules?: object;
};

const TextInput = (props: TextInputProps) => {
  const { control } = useFormContext();

  return (
    <div className="mb-4">
      <label
        htmlFor={props.name}
        className="block text-gray-500 text-sm font-bold mb-2"
      >
        {props.label}
      </label>
      <Controller
        name={props.name}
        control={control}
        rules={props.rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              id={props.name}
              type={props.type}
              className={cn(
                'mt-1 block w-full border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
                error && 'border-red-500',
                props.disabled && 'bg-gray-100 text-gray-400',
              )}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default TextInput;
