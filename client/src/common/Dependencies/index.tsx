import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { Input, Button } from "src/components";
import AddDependencyModal from "../Modals/AddDependencyModal";
import {
  Container,
  DependencyList,
  CustomForm,
  CustomButton,
  ErrorBar,
} from "./dependencies.style";

const schema = yup
  .object({
    dependencyName: yup.string().required(),
    dependencyCDN: yup.string().required(),
  })
  .required();

const Dependencies = () => {
  const [openDependencyModal, setOpenDependencyModal] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      dependencyName: "",
      dependencyCDN: "",
    },
  });
  const onSubmit = (data: any) => console.log(data);
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
      <CustomButton onClick={() => setOpenDependencyModal(true)}>
        Add Dependency
      </CustomButton>
      <AddDependencyModal
        title=""
        innerTitle="Add Dependency"
        closeModal={() => {
          reset();
          setOpenDependencyModal(false);
        }}
        isModalVisible={openDependencyModal}
        handleOkModal={() => {}}
      >
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="dependencyName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input placeholder="Dependency Name" {...field} />
            )}
          />
          <ErrorBar>
            {errors.dependencyName?.type === "required" &&
              "Dependency name is required"}
          </ErrorBar>
          <Controller
            name="dependencyCDN"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input placeholder="Dependency CDN" {...field} />
            )}
          />
          <ErrorBar>
            {errors.dependencyCDN?.type === "required" &&
              "Dependency CDN is required"}
          </ErrorBar>
          <div className="flex-dir-column">
            <Button htmlType="submit" onClick={() => {}}>
              Add
            </Button>
          </div>
        </CustomForm>
      </AddDependencyModal>
    </Container>
  );
};

export default Dependencies;
