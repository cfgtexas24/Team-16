import Resume from "./ResumePDF";
import { PDFViewer } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { getDecodedToken } from "../../lib/auth";
import AppLayout from "../../components/AppLayout";

function ViewDocInDevelopment() {
  
  
  const [resumeData, setResumeData] = useState(null);
  
  useEffect(() => {
    async function getResumeData() {
      const decodedToken = getDecodedToken();
      if (!decodedToken) {
          return;
      }
      const { email } = decodedToken;
      
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/client/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      console.log(json);
      setResumeData(json.client);
    }
    getResumeData();
  }, []);
  
  useEffect(
      () => {
          console.log(resumeData);
      },
      [resumeData]
  )
  
  return (
    <AppLayout title="Resume Generator">
      {resumeData ?
        <PDFViewer height={650} width={460}><Resume {...resumeData} /></PDFViewer> :
        <p>Loading...</p>}
    </AppLayout>
  );
}
export default ViewDocInDevelopment;
