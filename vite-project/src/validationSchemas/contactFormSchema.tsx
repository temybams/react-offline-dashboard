import * as yup from "yup";

const contactFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phoneNumber: yup
    .string()
    .matches(
      /^(\+?(\d{1,3}))?([-. ])?(\()?\d{3}(\))?([- ])?\d{3}([- ])?\d{4}$/,
      "Invalid phone number format"
    )
    .trim()
    .min(11, "Phone number must be at least 11 characters")
    .max(14, "Phone number must not exceed 14 characters")
    .required("Phone Number is required"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  addresses: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required("Address is required"),
      })
    )
    .min(1, "At least one address is required")
    .max(5, "No more than 5 addresses allowed"),
  longitude: yup.number().required("Longitude is required"),
  latitude: yup.number().required("Latitude is required"),
});

export default contactFormSchema;
