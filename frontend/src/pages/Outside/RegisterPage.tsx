import { AxiosError } from 'axios';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { type UseMutationResult, useMutation } from 'react-query';

import { Button, FormGenericError, TextInput } from '../../components/Form';

type RegisterFormInputsType = {
  username: string;
  password: string;
  verifyPassword: string;
};

type RegisterPayloadType = Omit<RegisterFormInputsType, 'verifyPassword'>;

type RegisterQueryResponse = {
  success: boolean;
  message?: string;
};

const registerUser = async (data: RegisterPayloadType) => {
  console.log('==== data:', data);
  return Promise.resolve({
    success: false,
    message: 'Cyhuhj',
  }) as Promise<RegisterQueryResponse>;
};

const RegisterPage = () => {
  const methods = useForm<RegisterFormInputsType>({
    defaultValues: {
      username: '',
      password: '',
      verifyPassword: '',
    },
  });
  const { formState } = methods;
  const [registerError, setRegisterError] = useState<string | null>(null);
  const isDisabled = formState.isSubmitting;

  const mutation: UseMutationResult<
    RegisterQueryResponse,
    AxiosError<{ message: string }>,
    RegisterPayloadType
  > = useMutation(registerUser, {
    onSuccess: (data) => {
      console.log('==== register successful: ', data);
    },
    onError: (error) => {
      setRegisterError(error.response?.data?.message || null);
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputsType> = (data) => {
    mutation.mutate({
      username: data.username,
      password: data.password,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="block max-w-[350px] mx-auto my-4 px-4"
      >
        <FormGenericError message={registerError} />
        <TextInput
          name="username"
          label="Username"
          rules={{ required: 'Username is required' }}
          disabled={isDisabled}
        />
        <TextInput
          name="password"
          type="password"
          label="Password"
          rules={{ required: 'Password is required' }}
          disabled={isDisabled}
        />
        <TextInput
          name="verifyPassword"
          type="password"
          label="Verify password"
          rules={{ required: 'Password verification is required' }}
          disabled={isDisabled}
        />
        <Button type="submit" disabled={isDisabled}>
          Register
        </Button>
      </form>
    </FormProvider>
  );
};

export default RegisterPage;
