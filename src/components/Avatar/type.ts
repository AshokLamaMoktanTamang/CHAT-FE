import { ComponentPropsWithoutRef } from "react";
import { Root, Image, Fallback } from "@radix-ui/react-avatar";

export interface IFullAvatar extends ComponentPropsWithoutRef<typeof Root> {
  src?: string;
  fallback?: string;
  imageConfig?: Omit<ComponentPropsWithoutRef<typeof Image>, "src">;
  fallbackConfig?: ComponentPropsWithoutRef<typeof Fallback>;
}
