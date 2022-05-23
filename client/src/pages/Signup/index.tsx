import React from "react";
import SignupForm from "./signupForm";
import {
  LoginWrapper,
  LoginLeftContainer,
  LoginRightContainer,
} from "./signup.style";

const Login = () => {
  return (
    <LoginWrapper>
      <LoginLeftContainer>
        <SignupForm />
      </LoginLeftContainer>
      <LoginRightContainer>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        {/* <div className="content">
          <h1>Sliding Diagonals Background Effect</h1>
        </div> */}
      </LoginRightContainer>
    </LoginWrapper>
  );
};

export default Login;
