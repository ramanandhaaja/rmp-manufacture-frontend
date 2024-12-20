import React from "react";
import SignInForm from "./SignInForm";
import Simple from "components/layout/AuthLayout/Simple";
// import { LogoSvg } from 'assets/svg'

const SignIn = () => {
  return (
    <Simple
      content={
        <div className="mb-0">
          <div className="w-[388px] h-[65px] py-3 flex-col justify-center items-start gap-1 inline-flex mb-[40px]">
            <img src="/img/others/logo-auth.png" alt="pic" />
          </div>
        </div>
      }
    >
      {/* <div className="mb-8 ">
        <h3 className="mb-1">Welcome back!</h3>
        <p>Please enter your credentials to sign in!</p>
      </div> */}
      <SignInForm disableSubmit={false} />
    </Simple>
  );
};

export default SignIn;
