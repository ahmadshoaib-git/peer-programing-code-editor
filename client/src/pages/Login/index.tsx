import React from "react";
import LoginForm from "./login";
import {
  LoginWrapper,
  LoginLeftContainer,
  HeaderHeading,
  LoginRightContainer,
} from "./login.style";

const Login = () => {
  return (
    <LoginWrapper>
      <LoginLeftContainer>
        <LoginForm />
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
