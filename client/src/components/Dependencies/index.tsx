import { MdCancel } from "react-icons/md";
import { Container, DependencyList, CustomButton } from "./dependencies.style";
const Dependencies = () => {
  return (
    <Container>
      <DependencyList>
        <li>
          <MdCancel className="disabled" />
          <span>React</span>
        </li>
        <li>
          <MdCancel className="disabled" />
          <span>React DOM</span>
        </li>
        <li>
          <MdCancel className="disabled" />
          <span>React Router DOM</span>
        </li>
        <li>
          <MdCancel />
          <span>React</span>
        </li>
        <li>
          <MdCancel />
          <span>React DOM</span>
        </li>
        <li>
          <MdCancel />
          <span>React Router DOM</span>
        </li>
        <li>
          <MdCancel />
          <span>React</span>
        </li>
        <li>
          <MdCancel />
          <span>React DOM</span>
        </li>
        <li>
          <MdCancel />
          <span>React Router DOM</span>
        </li>
      </DependencyList>
      <CustomButton>Add Dependency</CustomButton>
    </Container>
  );
};

export default Dependencies;
