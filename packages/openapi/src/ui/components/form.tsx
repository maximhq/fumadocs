import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { cva } from 'class-variance-authority';
import { createContext, forwardRef, useContext, useId } from 'react';
import { cn } from '@maximai/fumadocs-ui/components/api';

const Form = FormProvider;

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = createContext<FormFieldContextValue>({
  name: '',
});

interface FormItemContextValue {
  id: string;
}

const FormItemContext = createContext<FormItemContextValue>({ id: '' });

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>): React.ReactElement {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

function useFormField(): {
  id: string;
  name: string;
  formItemId: string;
  formDescriptionId: string;
  isError: boolean;
} {
  const fieldContext = useContext(FormFieldContext);
  const { id } = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    isError: Boolean(fieldState.error),
  };
}

const FormItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        className={cn('flex flex-col gap-1', className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

export const labelVariants = cva(
  'text-xs font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

const FormLabel = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  const { isError, formItemId } = useFormField();

  return (
    <label
      ref={ref}
      className={cn(labelVariants(), isError && 'text-red-500', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { isError, formItemId, formDescriptionId } = useFormField();
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={formDescriptionId}
      aria-invalid={isError}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-xs text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormField };
