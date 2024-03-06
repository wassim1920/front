import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PDF from './pdf.pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import "./pdfpage.css"


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);

  const [pdfSrc, setPdfSrc] = useState({PDF});

  // 

  return (
    <div>
    <div className="middle-space-component">
      {pdfSrc ? (
        <embed src={pdfSrc} type="application/pdf" width="100%" height="100%" />
      ) : (
        <FontAwesomeIcon icon={faFilePdf} size="2xl" />
      )}
    </div>
   
    <div className="pdf-container">
      <div className="pdf-document">
        <Document file={PDF}>
          <Page pageNumber={1} className="pdf-page" /> 
        </Document>
      </div>
      <p className="page-info">
        Page 1 of {numPages} 
      </p>
    </div>
    </div>
  );
};

export default PDFViewer;
