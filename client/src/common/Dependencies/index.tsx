import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { Input, Button, Notify } from "src/components";
import AddDependencyModal from "../Modals/AddDependencyModal";
import { saveNewDependency, deleteDependency } from "./service";
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
  const [loading, setLoading] = React.useState(false);
  const [dependencyData, setDependencyData] = React.useState([]);
  const { projectData } = useSelector((state: RootState) => {
    return state.projectEditor;
  });
  React.useEffect(() => {
    let tempDependencyData = projectData?.projectDetail?.dependencyFile || [];
    tempDependencyData = JSON.parse(tempDependencyData);
    setDependencyData(tempDependencyData);
  }, [projectData]);

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
  const saveDependency = async (data: any) => {
    try {
      setLoading(true);
      const response = await saveNewDependency(
        projectData._id,
        data.dependencyName,
        data.dependencyCDN
      );
      console.log(response);
      const { message, dependencies } = response?.data;
      setDependencyData(dependencies || []);
      setOpenDependencyModal(false);
      Notify(message, "success");
    } catch (err) {
      Notify(`Unabled to save dependency!`, "error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const deleteDependencyHandler = async (cdn: any) => {
    try {
      setLoading(true);
      const response = await deleteDependency(projectData._id, cdn);
      const { message, dependencies } = response?.data;
      setDependencyData(dependencies || []);
      Notify(message, "success");
      console.log(response);
    } catch (err) {
      Notify(`Unabled to delete dependency!`, "error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = (data: any) => {
    saveDependency(data);
  };
  console.log(dependencyData);
  return (
    <Container>
      <DependencyList>
        {dependencyData.length > 0 &&
          dependencyData.map((dData: any, index: any) => {
            const classToApply = dData?.type === "permanent" ? "disabled" : "";
            const getOnClick = (cdn: any) => {
              if (dData.type !== "permanent") {
                return deleteDependencyHandler(cdn);
              }
              return () => {};
            };
            const getIcon = () => {
              if (dData.type === "permanent") {
                return <FaDesktop className="svg-lower" />;
              }
              return (
                <MdCancel
                  className={classToApply}
                  onClick={() => getOnClick(dData?.cdn)}
                />
              );
            };
            return (
              <li key={index.toString()}>
                {getIcon()}
                <span>{dData.name}</span>
              </li>
            );
          })}
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
            <Button loading={loading} htmlType="submit" onClick={() => {}}>
              Add
            </Button>
          </div>
        </CustomForm>
      </AddDependencyModal>
    </Container>
  );
};

export default React.memo(Dependencies);
