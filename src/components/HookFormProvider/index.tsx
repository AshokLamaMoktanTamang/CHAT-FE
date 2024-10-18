import { FC, ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  UseFormProps,
  ValidateResult,
  useForm,
} from "react-hook-form";

export interface HookInputBaseProps {
  required?: boolean;
  validate?: (
    value: string | number | boolean | Record<string, any>
  ) => ValidateResult | Promise<ValidateResult>;
}

export interface HookFormProviderProps
  extends UseFormProps<FieldValues, Record<string, unknown>>,
    HookInputBaseProps {
  children?: ReactNode;
}

const HookFormProvider: FC<HookFormProviderProps> = ({ children, ...rest }) => {
  const methods = useForm(rest);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default HookFormProvider;
