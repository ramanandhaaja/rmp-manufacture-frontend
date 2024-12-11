import { useForm } from "react-hook-form";
import Button from "../components/Button";
import useAuth from "../utils/hooks/useAuth";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signIn } = useAuth();

  const onSubmit = async (data) => {
    const response = await signIn(data);
    console.log(response);
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex items-center justify-center h-screen min-w-[50vw]">
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 flex flex-col items-center justify-center">
              <div className="flex flex-col w-1/2">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button title="Login" color="bg-indigo-900" />
            </div>
          </form>
        </div>
      </div>

      <div className="bg-gray-200 h-screen min-w-[50vw]"></div>
    </div>
  );
};
export default LoginPage;
