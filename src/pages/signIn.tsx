import * as React from "react";
import type { ReactElement } from "react";

import { useUserAuth } from "@/common/store/zustand/useUserAuth";

import { PublicLayout } from "@/common/templates";

const SignIn = () => {
  const signIn = useUserAuth((state) => state.signIn);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email")! as string;
    const password = data.get("password")! as string;

    await signIn({
      email: 'admin@mail.com',
      password: '123456'
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="contents">
        <div className="w-80 flex flex-col gap-6 justify-center items-center text-center">
          <h2 className="w-full text-lg font-normal font-pressStart2P">
            Next.js <br />
            Autentication
          </h2>

          <input
            className="w-full h-10 indent-3 text-black text-base bg-green-100 placeholder:text-sm placeholder:text-green-900 rounded-md outline-none"
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
            // required
          />

          <input
            className="w-full h-10 indent-3 text-black text-base bg-green-100 placeholder:text-sm placeholder:text-green-900 rounded-md outline-none"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            // required
          />
          <button
            type="submit"
            className="w-full py-3 text-white font-bold bg-green-600 hover:bg-green-800 rounded-md transition-colors duration-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

SignIn.getLayout = function getLayout(page: ReactElement) {
  return (
    <PublicLayout>
      {page}
    </PublicLayout>
  )
}

export default SignIn;
