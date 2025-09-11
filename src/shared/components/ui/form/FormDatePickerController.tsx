import React from 'react';
import { Control, Controller, FieldError, FieldPath, FieldValues } from 'react-hook-form';
import { FormDatePicker } from './FormDatePicker';

interface FormDatePickerControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  error?: FieldError;
  rules?: Record<string, any>;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  format?: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
}

export const FormDatePickerController = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  rules,
  minimumDate,
  maximumDate,
  mode = 'date',
  format = 'YYYY-MM-DD',
}: FormDatePickerControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <FormDatePicker
          label={label}
          placeholder={placeholder}
          value={value}
          onValueChange={onChange}
          error={error?.message}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          mode={mode}
          format={format}
        />
      )}
    />
  );
};
