import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Controller, Control } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  control: Control<any>;
  isDisabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  control,
  isDisabled = false,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input
            {...field}
            id={name}
            placeholder={placeholder}
            isDisabled={isDisabled}
  
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default InputField;
