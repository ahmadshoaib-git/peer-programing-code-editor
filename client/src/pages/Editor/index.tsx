import React from "react";
import { useQuery } from "react-query";
import { useParams, Navigate } from "react-router-dom";
import { Layout } from "src/common";
import EditorSideBar from "./EditorSideBar";
import { CodeEditor } from "src/components";
import { getProjectById } from "./service";

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
      setCodeData(JSON.parse(data?.data?.projectDetail?.filesCode));
      return data.data;
    } catch (err) {
      console.log(">> ", err);
    } finally {
      setLoading(false);
    }
  };

  console.log(`projectData >${projectData}`);

  return (
    <>
      {loading ? (
        <>Loading ...</>
      ) : (
        <>
          {projectData ? (
            <Layout sideBarContent={<EditorSideBar data={projectData} />}>
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
