import { OTPInput } from "input-otp";
import { ComponentPropsWithoutRef } from "react";
import { HookInputBaseProps } from "../HookFormProvider";

export type IHookOtpInput = HookInputBaseProps &
  Omit<ComponentPropsWithoutRef<typeof OTPInput>, "children" | "render"> & {
    name: string;
    label?: string
  };
