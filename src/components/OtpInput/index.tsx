import {
  ElementRef,
  forwardRef,
  useContext,
  ComponentPropsWithoutRef,
} from "react";
import { DashIcon } from "@radix-ui/react-icons";
import { OTPInput, OTPInputContext } from "input-otp";

import { cn } from "@/lib/utils";
import { IHookOtpInput } from "./type";
import { Controller, useFormContext } from "react-hook-form";
import HookErrorMessage from "../HookErrorMessage";

const InputOTP = forwardRef<
  ElementRef<typeof OTPInput>,
  ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <DashIcon />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

const HookOtpInput = ({
  required,
  validate,
  name,
  defaultValue,
  maxLength,
  label,
  ...rest
}: IHookOtpInput) => {
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
        <div className="flex flex-col gap-1">
          {label && label}
          <InputOTP
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChange={onChange}
            {...field}
            {...rest}
          >
            <InputOTPGroup>
              {Array.from({ length: maxLength }).map((_, idx) => (
                <InputOTPSlot index={idx} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {error && <HookErrorMessage message={error?.message} />}
        </div>
      )}
    />
  );
};

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  HookOtpInput,
};
