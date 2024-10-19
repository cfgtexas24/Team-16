import Resume from './ResumePDF';
import { PDFViewer } from '@react-pdf/renderer';
import AppLayout from "../../components/AppLayout";

function ViewDocInDevelopment() {
  return (
    <AppLayout title="Career Tools"> {/* Wrap the content in AppLayout */}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <PDFViewer height={650} width={460} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Resume />
      </PDFViewer>
    </div>
    </AppLayout>
  )
}

export default ViewDocInDevelopment;