import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from '../components/Form';
import Button from '../components/Form/Button';
import axiosClient from '../api/axiosClient';
import { useMutation } from 'react-query';

type LoginFormInputsType = {
  username: string;
  password: string;
};

const loginUser = async (data: LoginFormInputsType) => {
  const response = await axiosClient.post('/login', data);
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
  const isDisabled = formState.isSubmitting;

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log('==== login successful: ', data);
    },
    onError: (data) => {
      console.log('===== login failed: ', data);
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputsType> = (
    data: LoginFormInputsType,
  ) => {
    mutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="block max-w-[350px] my-4 mx-auto px-4"
      >
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
        <Button type="submit" disabled={isDisabled}>
          Login
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginPage;
