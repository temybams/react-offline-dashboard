import React from "react";
import { Box, VStack, Button, HStack, IconButton } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import contactFormSchema from "../validationSchemas/contactFormSchema";
import InputField from "../components/InputField";
import { useContactForm } from "../hooks/useContactForm";

const AddContactForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(contactFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const { onSubmit } = useContactForm();

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={50}
      p={12}
      borderWidth={1}
      borderRadius="lg"
      bg="white"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <InputField
            name="name"
            label="Name"
            control={control}
            placeholder="Enter name"
          />
          <InputField
            name="phoneNumber"
            label="Phone Number"
            control={control}
            placeholder="Enter phone number"
          />
          <InputField
            name="email"
            label="Email"
            control={control}
            placeholder="Enter email"
          />

          <InputField
            name={`addresses[0].value`}
            label="Address 1"
            control={control}
            placeholder="Enter address"
          />

          {fields.slice(1).map((item, index) => (
            <HStack key={item.id} spacing={2}>
              <InputField
                name={`addresses[${index + 1}].value`}
                label={`Address ${index + 2}`}
                control={control}
                placeholder={`Enter address ${index + 2}`}
              />
              <IconButton
                aria-label="Remove address"
                icon={<MinusIcon />}
                onClick={() => remove(index + 1)}
                isDisabled={fields.length <= 2}
              />
            </HStack>
          ))}
          <Button
            mt={2}
            leftIcon={<AddIcon />}
            onClick={() => append({ value: "" })}
          >
            Add Address
          </Button>

          <InputField
            name="longitude"
            label="Longitude"
            control={control}
            placeholder="Enter longitude"
          />
          <InputField
            name="latitude"
            label="Latitude"
            control={control}
            placeholder="Enter latitude"
          />

          <Button
            type="submit"
            colorScheme="blue"
            bg="#5925dc"
            width="full"
            isLoading={isSubmitting}
          >
            Add Contact
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddContactForm;
