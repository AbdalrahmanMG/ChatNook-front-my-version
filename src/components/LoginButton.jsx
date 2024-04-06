// import React from "react";
import { useFormik } from "formik";
import { userValidationSchema } from "../schema/shemaValidation";

export default function LoginButton() {
  const { isSubmitting } = useFormik({
    validationSchema: userValidationSchema,
  });
  return (
    <>
      <button
        type="submit"
        disabled={isSubmitting}
        className="text-white bg-cyan-800 border-2 border-cyan-800 border-solid rounded-md w-64 h-12 font-medium hover:bg-white hover:text-cyan-800 mx-4"
      >
        Login
      </button>
    </>
  );
}
