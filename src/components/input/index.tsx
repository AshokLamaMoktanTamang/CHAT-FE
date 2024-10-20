import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { HookInputBaseProps } from "../HookFormProvider";
import { Controller, useFormContext } from "react-hook-form";
import HookErrorMessage from "../HookErrorMessage";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorNode?: ReactNode;
  error?: boolean;
  label?: ReactNode;
}

export interface HookInputProps
  extends Omit<InputProps, "onChange">,
    HookInputBaseProps {
  name: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, errorNode, error = false, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && label}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-400 focus-visible:ring-0",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && errorNode}
      </div>
    );
  }
);
Input.displayName = "Input";

const HookInput = forwardRef<HTMLInputElement, HookInputProps>(
  ({ name, required, validate, disabled, defaultValue, ...rest }, ref) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        rules={{ validate, required: required && "Required" }}
        control={control}
        defaultValue={defaultValue}
        render={({
          field: { value, onChange, ...field },
          fieldState: { error },
        }) => (
          <Input
            {...rest}
            {...field}
            ref={ref}
            value={value || ""}
            onChange={({ target: { value } }) => {
              onChange(value);
            }}
            defaultValue={defaultValue}
            disabled={disabled}
            error={Boolean(error)}
            errorNode={error && <HookErrorMessage message={error.message} />}
          />
        )}
      />
    );
  }
);

export { Input, HookInput };
