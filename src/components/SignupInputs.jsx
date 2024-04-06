import { useFormik } from "formik";
import { userValidationSchema } from "../schema/shemaValidation";

export default function SignupInputs() {
  const { values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: userValidationSchema,
  });

  return (
    <div className="">
      <label
        htmlFor="name"
        className="block text-sm ml-3 font-medium leading-6 text-gray-900"
      >
        Full Name
      </label>
      <input
        type="text"
        name="fullName"
        id="name"
        value={values.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`block w-5/6 h-10 rounded-md ml-3 mt-2 mb-2 py-1 pl-4 pr-20 bg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-gray-100 ${
          errors.fullName && touched.fullName ? "outline-red-500" : ""
        }`}
      />
      {errors.fullName && touched.fullName && (
        <p className="ms-5 text-red-600">{errors.fullName}</p>
      )}

      <label
        htmlFor="email"
        className="block text-sm ml-3 font-medium leading-6 text-gray-900"
      >
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`block w-5/6 h-10 rounded-md ml-3 mt-2 mb-2 py-1 pl-4 pr-20 bg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-gray-100 ${
          errors.email && touched.email ? "outline-red-500" : ""
        }`}
      />
      {errors.email && touched.email && (
        <p className="ms-5 text-red-600">{errors.email}</p>
      )}

      <label
        htmlFor="password"
        className="block text-sm ml-3 font-medium leading-6 text-gray-900"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`block w-5/6 h-10 rounded-md ml-3 mt-2 mb-2 py-1 pl-4 pr-20 bg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-gray-100 ${
          errors.password && touched.password ? "outline-red-500" : ""
        }`}
      />
      {errors.password && touched.password && (
        <p className="ms-5 text-red-600">{errors.password}</p>
      )}
    </div>
  );
}
