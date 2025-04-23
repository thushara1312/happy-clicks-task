'use client';


import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useAuthentication } from "@/queries/auth/use-auth";

export default function Login() {
  const router = useRouter();
	const { useLogin } = useAuthentication();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "test@test.com",
			password: "admin",
		},
	});
	const { mutate, isPending,error } = useLogin();
	const onSubmit = async (data: any) => {
		mutate(data, {
			onError: (error: any) => {
				if (error.errors) {
					const apiErrors = error.errors;
					Object.keys(apiErrors).forEach((field) => {
						setError(field as any, {
							type: "server",
							message: apiErrors[field][0],
						});
					});
				}
			},
			onSuccess: (data: any) => {
				console.log(data, "onSuccess");
				router.push("/");
			},
		});
	};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error.message?.body || "An error occurred"}</span>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                type="email"
                // required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                // required
                id="password"
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
							disabled={isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
							{isPending ? "Signing in..." : "Sign in"}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
} 