import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getMeFn, loginUserFn, signUpUserFn } from "../../api/auth";
import { useStateContext } from "../../context/auth/auth.context";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import GoogleLoginBtn from "../../components/auth/GoogleLoginBtn";
import AppleLoginBtn from "../../components/auth/AppleLoginBtn";

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(3, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const Auth = () => {
  const [toggleRegister, setToggleRegister] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = ((location.state as any)?.from.pathname as string) || "/";

  const stateContext = useStateContext();

  const query = useMutation(["authUser"], getMeFn, {
    retry: false,
    onSuccess: (data) => {
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
  });

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: loginUser } = useMutation((userData: LoginInput) =>
    toast.promise(loginUserFn(userData), {
      pending: "Logging in...",
      success: {
        render: () => {
          query.mutate();
          navigate(from);
          return "Logged in!";
        },
      },
      error: {
        render: (error) => {
          console.log(error);
          return (error as any).data.response.data.message as string;
        },
      },
    })
  );

  const { mutate: registerUser } = useMutation((userData: LoginInput) =>
    toast.promise(signUpUserFn(userData), {
      pending: "Creating your account...",
      success: {
        render: () => {
          query.mutate();
          navigate(from);
          return "Succes! you're now logged in!";
        },
      },
      error: {
        render: (error) => {
          console.log(error);
          return (error as any).data.response.data.message as string;
        },
      },
    })
  );

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
    register,
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) =>
    toggleRegister ? registerUser(values) : loginUser(values);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            {toggleRegister
              ? "Create a new account"
              : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-white">
            Or{" "}
            <button
              className="font-medium text-blue-500 hover:text-blue-600"
              onClick={() => setToggleRegister((val) => !val)}
            >
              {!toggleRegister
                ? "Create a new account"
                : "Sign in to your account"}
            </button>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-md shadow-black drop-shadow-md">
          <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register("email", { required: true })}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full appearance-none rounded-md border bg-gray-700 px-3 py-2 text-gray-300 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("password", { required: true })}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full appearance-none rounded-md border bg-gray-700 px-3 py-2 text-gray-300 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-white"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-500 hover:text-blue-600"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {toggleRegister ? "Register" : "Sign in"}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-800 px-2 text-white">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <GoogleLoginBtn />

                <AppleLoginBtn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
