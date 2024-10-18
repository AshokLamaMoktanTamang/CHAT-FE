import { useFormContext, ValidateResult } from "react-hook-form";
import { FC, DetailedHTMLProps, FormHTMLAttributes, useEffect } from "react";

interface HookInputBaseProps {
  required?: boolean;
  validate?: (
    value: string | number | boolean | Record<string, any>
  ) => ValidateResult | Promise<ValidateResult>;
}

export interface HookFormProps
  extends Omit<
      DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
      "onSubmit"
    >,
    HookInputBaseProps {
  onSubmit?: (value: any) => Promise<void> | void;
}

const HookForm: FC<HookFormProps> = ({ children, onSubmit, ...rest }) => {
  const { handleSubmit, reset } = useFormContext();

  useEffect(() => reset, []);

  return (
    <form onSubmit={onSubmit && handleSubmit(onSubmit)} {...rest}>
      {children}
    </form>
  );
};

export default HookForm;
