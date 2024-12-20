import React from "react";
import SignUpForm from "./SignUpForm";
import Simple from "components/layout/AuthLayout/Simple";

const SignUp = () => {
  return (
    <Simple>
      <>
        <div className="mb-8">
          <h3 className="mb-1">Sign Up</h3>
          <p>And lets get started with your free trial</p>
        </div>
        <SignUpForm disableSubmit={false} />
      </>
    </Simple>
  );
};

export default SignUp;
