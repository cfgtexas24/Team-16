import Resume from './ResumePDF';
import { PDFViewer } from '@react-pdf/renderer';

function ViewDocInDevelopment() {
  return (
    <PDFViewer height={650} width={460}>
      <Resume />
    </PDFViewer>
  )
}

export default ViewDocInDevelopment;