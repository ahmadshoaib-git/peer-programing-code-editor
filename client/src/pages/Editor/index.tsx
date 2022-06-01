import React from "react";
import { useQuery } from "react-query";
import { useParams, Navigate } from "react-router-dom";
import { Layout } from "src/common";
import EditorSideBar from "./EditorSideBar";
import { CodeEditor } from "src/components";
import { getProjectById, getProjectFileDataById } from "./service";

const Editor = () => {
  const param = useParams();
  const [loading, setLoading] = React.useState(false);
  const [projectData, setProjectData] = React.useState<any>(undefined);
  const [codeData, setCodeData] = React.useState<any>(undefined);

  React.useEffect(() => {
    if (!param.id) <Navigate to="/" />;
    fetchData(param.id);
  }, []);

  const fetchData = async (id: any) => {
    try {
      setLoading(true);
      const data = await getProjectById(id);
      setLoading(false);
      setProjectData(data?.data);
      const newFiles = JSON.parse(data?.data?.projectDetail?.filesCode);
      setCodeData([
        {
          id: newFiles[0]?.id,
          code: newFiles[0]?.code,
        },
      ]);
      return data.data;
    } catch (err) {
      console.log(">> ", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCodeByNodeId = async (nodeId: any) => {
    const result = await getProjectFileDataById(projectData._id, nodeId);
    console.log("*******************************");
    console.log(result.data.code);
    const newResult: any = JSON.parse(result.data);
    console.log(`newResult > ${newResult}`);
    console.log(`newResult.id > ${newResult["id"]}`);
    console.log(`newResult.code > ${newResult["code"]}`);
    console.log("*******************************");
    setCodeData([
      {
        id: newResult?.id,
        code: newResult?.code,
      },
    ]);
  };

  console.log(`projectData >${projectData}`);

  return (
    <>
      {loading ? (
        <>Loading ...</>
      ) : (
        <>
          {projectData ? (
            <Layout
              sideBarContent={
                <EditorSideBar
                  data={projectData}
                  fetchCodeByNodeId={fetchCodeByNodeId}
                />
              }
            >
              <CodeEditor data={codeData} />
            </Layout>
          ) : (
            <>No Data !!!</>
          )}
        </>
      )}
    </>
  );
};

export default React.memo(Editor);
