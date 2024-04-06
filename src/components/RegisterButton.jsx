import { useFormik } from "formik";
import { userValidationSchema } from "../schema/shemaValidation";

export default function RegisterButton() {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    validationSchema: userValidationSchema,
  });
  return (
    <button
      disabled={isSubmitting}
      className="text-white bg-cyan-800 border-2 border-cyan-800 border-solid rounded-md w-64 h-12 font-medium hover:bg-white hover:text-cyan-800 mx-4"
    >
      Sign Up
    </button>
  );
}
