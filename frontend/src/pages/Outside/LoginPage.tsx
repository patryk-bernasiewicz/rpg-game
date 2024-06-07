import { AxiosError } from 'axios';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { type UseMutationResult, useMutation } from 'react-query';
import { Link } from 'react-router-dom';

import axiosClient from '../../api/axiosClient';
import { Button, FormGenericError, TextInput } from '../../components/Form';

type LoginFormInputsType = {
  username: string;
  password: string;
};

type LoginQueryResponse = {
  success: boolean;
  message?: string;
};

const loginUser = async (data: LoginFormInputsType) => {
  const response = await axiosClient.post('/api/login', data);
  return response.data;
};

const LoginPage = () => {
  const methods = useForm<LoginFormInputsType>({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { formState } = methods;
  const [loginError, setLoginError] = useState<string | null>(null);
  const isDisabled = formState.isSubmitting;

  const mutation: UseMutationResult<
    LoginQueryResponse,
    AxiosError<{ message: string }>,
    LoginFormInputsType
  > = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log('==== login successful: ', data);
    },
    onError: (error) => {
      setLoginError(error.response?.data?.message || null);
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputsType> = (data) => {
    mutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="block max-w-[350px] my-4 mx-auto px-4"
      >
        <FormGenericError message={loginError} />
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
        <div className="my-1">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <Button type="submit" disabled={isDisabled}>
          Login
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginPage;
