import React from "react";
import "./details.css";
import { useState, useEffect } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
import Sidebar from "../../components/sidebar/Sidebar";

const Details = () => {
  const [numPages, setNumPages] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [PDF, setPDF] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [showPDF, setShowPDF] = useState(true);
  const [folderName, setFolderName] = useState("");
  const [id, setId] = useState("");

  const handleClick = (e) => {
    let selectedOption = e.target.value;
    
    if (selectedOption === "absent") {
      setShowButtons(true);
    } else if (selectedOption === "validé") {
      setShowButtons(false);
    } else {
      setShowButtons(false);
    }
  };

  const fetchPDF = async () => {
    try {
      const response = await fetch("/contrat/process_files");
      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setImageURL("");
      setShowPDF(true);
      setPDF(pdfUrl);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  const fetchImage = async () => {
    try {
      const response = await fetch("/contrat/process_images");
      const imageBlob = await response.blob();
      const url = URL.createObjectURL(imageBlob);
      setImageURL(url);
      setShowPDF(false);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const fetchVersoImage = async () => {
    try {
      const response = await fetch("/contrat/process_images_verso");
      const imageBlob = await response.blob();
      const url = URL.createObjectURL(imageBlob);
      setImageURL(url);
      setShowPDF(false);
    } catch (error) {
      console.error("Error fetching verso image:", error);
    }
  };

  useEffect(() => {
    // Fetch contract details including folderName
    fetchPDF()
      .then((data) => setFolderName(data.folderName))
      .then((data) => setFolderName(data.id))
      .catch((error) =>
        console.error("Error fetching contract details:", error)
      );
  }, [id]);

  const handleRectoClick = () => {
    fetchImage();
  };
  const handleVersoClick = () => {
    fetchVersoImage();
  };

  const handleContratClick = () => {
    fetchPDF();
  };



  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <Sidebar />
      <div className="left-button-component">
        <div className="LD_bt">
          <button className="D_bt" onClick={handleRectoClick}>
            Recto CIN
          </button>
          <button className="D_bt" onClick={handleVersoClick}>
            VERSO CIN
          </button>
          <button className="D_bt" onClick={handleContratClick}>
            Contrat
          </button>
        </div>
      </div>
      <div >
        <div className="pdf-container">
          <div
            className="pdf-document"
            style={{ overflowY: "auto", maxHeight: "600px" }}
          >
            {showPDF && (
              <Document file={PDF} onLoadSuccess={onDocumentLoadSuccess}>
                {[...Array(numPages)].map((_, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    className="pdf-page"
                  />
                ))}
              </Document>
            )}
          </div>
          {!showPDF && (
            <img src={imageURL} alt="Recto CIN" style={{ width: "100%" }} />
          )}
        </div>
      </div>

      <div className="right-button-component">
        <div className="D_label">
          <label
            htmlFor="recto-cin"
            style={{
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Recto CIN :{" "}
          </label>
          <label
            htmlFor="verso-cin"
            style={{
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Verso CIN :{" "}
          </label>
          <label
            htmlFor="contract"
            style={{
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Contract :{" "}
          </label>
          <div className="O_cnt">
            {showButtons && (
              <div style={{ display: "flex", gap: 5 }}>
                <button
                  style={{
                    height: 50,
                    cursor: "pointer",
                    borderRadius: 3,
                    fontFamily: "serif",
                    backgroundColor: "#faf8f8",
                  }}
                >
                  Bloquer CIN
                </button>
                <button
                  style={{
                    height: 50,
                    width: 85,
                    cursor: "pointer",
                    borderRadius: 3,
                    fontFamily: "serif",
                    backgroundColor: "#faf8f8",
                  }}
                >
                  Send SMS
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <select
            id="recto-cin"
            onChange={handleClick}
            style={{ height: 50, textAlign: "center", cursor: "pointer" }}
          >
            <option value="">Choose an option</option>
            <option value="validé">Validé</option>
            <option value="absent">Absent</option>
          </select>

          <select
            id="verso-cin"
            onChange={handleClick}
            style={{ height: 50, textAlign: "center", cursor: "pointer" }}
          >
            <option value="">Choose an option</option>
            <option value="validé">Validé</option>
            <option value="absent">Absent</option>
          </select>
          <select
            id="contract"
            onChange={handleClick}
            style={{ height: 50, textAlign: "center", cursor: "pointer" }}
          >
            <option value="">Choose an option</option>
            <option value="validé">Validé</option>
            <option value="absent">Absent</option>
          </select>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="V_bt">Validé</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
