type FormGenericErrorProps = {
  message?: string | null;
};

const FormGenericError = (props: FormGenericErrorProps) => {
  if (!props.message) {
    return null;
  }

  return (
    <p className="mb-2 border border-red-200 p-4 text-center text-red-200">
      {props.message}
    </p>
  );
};

export default FormGenericError;
