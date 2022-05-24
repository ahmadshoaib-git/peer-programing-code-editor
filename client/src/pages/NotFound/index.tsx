import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components";
import { NotfoundContainer, CustomResult } from "./notfound.style";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <NotfoundContainer>
      <CustomResult
        title="Page not found!"
        extra={
          <Button type="primary" key="console" onClick={() => navigate(`/`)}>
            Go to Dashboard
          </Button>
        }
      />
    </NotfoundContainer>
  );
};

export default NotFound;
