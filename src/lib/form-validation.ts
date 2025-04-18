import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

/**
 * A utility function to create a form with Zod validation
 * @param schema The Zod schema to validate the form against
 * @param defaultValues Optional default values for the form
 * @returns A React Hook Form instance with Zod validation
 */
export function useZodForm<T extends z.ZodType>(schema: T, defaultValues?: z.infer<T>) {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
}
