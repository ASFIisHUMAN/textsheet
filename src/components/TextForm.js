import React, { useState, useRef ,useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"; // Required for fonts
import { saveAs } from "file-saver"; // Required for downloading the PDF

pdfMake.vfs = pdfFonts.pdfMake.vfs;


export default function TextForm(props) {
  const [text, setText] = useState("");
  const [downloadFileName, setDownloadFileName] = useState("");
  const textAreaRef = useRef(null);
  const [findWord, setFindWord] = useState('');
  const [replaceWord, setReplaceWord] = useState('');
  const [fontSize, setFontSize] = useState('12');
  const [pageSize, setPageSize] = useState("A4");
  const [customFontSize, setCustomFontSize] = useState("6");
  const [selectedFileType, setSelectedFileType] = useState("txt");


  useEffect(() => {
    // When the component mounts, set the text from props into state    
    setText(props.text);
  }, [props.text]);
  
  const fontorcustom = () => {
    if (fontSize === 'custom') {
      return +customFontSize; // Convert customFontSize to a number
    } else {
      return parseInt(fontSize); // Convert fontSize to a number
    }
  };
  

  const handlePDFDownload = () => {
    if (downloadFileName === "") {
      props.showAlert("Please enter a file name.", "warning");
    } else if (props.text === "") {
      props.showAlert("Please enter some text to generate a PDF.", "warning");
    } else {
      const pdfContent = {
        content: [{ text: props.text }],
        pageSize: pageSize,
        defaultStyle: {
          fontSize: fontorcustom(),
        }
      };

      const pdfDocGenerator = pdfMake.createPdf(pdfContent);

      pdfDocGenerator.getBlob((pdfBlob) => {
        // Save the PDF Blob using FileSaver.js
        saveAs(pdfBlob, downloadFileName + ".pdf");

        props.showAlert("PDF download started successfully!", "success");
      });
    }
  };


  
  const slect = () => {
    if (selectedFileType === "txt") {
      return "text/plain";
    }
    if (selectedFileType === "json") {
      return "application/json";
    }
    if (selectedFileType === "python") {
      return "text/x-python";
    }
    if (selectedFileType === "cpp") {
      return "text/x-c++src";
    }
    if (selectedFileType === "java") {
      return "text/x-java";
    }
    if (selectedFileType === "html") {
      return "text/html";
    }
    if (selectedFileType === "css") {
      return "text/css";
    }
    if (selectedFileType === "xml") {
      return "application/xml";
    }
    if (selectedFileType === "markdown") {
      return "text/markdown";
    }
    if (selectedFileType === "csv") {
      return "text/csv";
    }
    if (selectedFileType === "yaml") {
      return "text/yaml";
    }
    if (selectedFileType === "php") {
      return "application/x-httpd-php";
    }
    if (selectedFileType === "sql") {
      return "application/sql";
    }
    if (selectedFileType === "javascript") {
      return "text/javascript";
    }
    if (selectedFileType === "typescript") {
      return "application/typescript";
    }
    if (selectedFileType === "doc") {
      return "application/msword";
    }
    if (selectedFileType === "docx") {
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }
    if (selectedFileType === "xls") {
      return "application/vnd.ms-excel";
    }
    if (selectedFileType === "xlsx") {
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }
    if (selectedFileType === "ppt") {
      return "application/vnd.ms-powerpoint";
    }
    if (selectedFileType === "pptx") {
      return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    }
    if (selectedFileType === "odt") {
      return "application/vnd.oasis.opendocument.text";
    }
    if (selectedFileType === "ods") {
      return "application/vnd.oasis.opendocument.spreadsheet";
    }
    if (selectedFileType === "odp") {
      return "application/vnd.oasis.opendocument.presentation";
    }
  };
  
const showpdf =()=>{
  const l= document.querySelector('.pdfform');
  l.style.display="flex"; 
}
const hidepf =()=>{
  const z= document.querySelector('.pdfform');
  z.style.display="none";
  
}
  // Function to handle file download
  const handleFileDownload = () => {
    if (downloadFileName === "") {
      // If downloadFileName is empty, show an alert
      props.showAlert("Please enter a file name.", "warning");
    } else {
      // Create a new Blob with the text content
      const blob = new Blob([props.text], { type: slect() });

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = downloadFileName;

      // Programmatically trigger the anchor element to initiate download
      document.body.appendChild(a);
      a.click();

      // Remove the temporary anchor element
      document.body.removeChild(a);

      // Show a success alert
      props.showAlert("Txt file download started", "success");
    }
  };
  const handleUpClick = () => {
    let newText = props.text.toUpperCase();
    props.onTextChange(newText); // Update text using the handler
    props.showAlert('Converted to uppercase!', 'success');
    textAreaRef.current.focus();
  };

  const formatText = () => {
    let newText = props.text.split('.').map((sentence) => {
      const trimmedSentence = sentence.trim();
      if (trimmedSentence.length === 0) return ''; // Ignore empty sentences 
      const firstLetter = trimmedSentence[0].toUpperCase(); 
      const restOfSentence = trimmedSentence.slice(1);
      return firstLetter + restOfSentence;
    }).join('. '); 
    props.onTextChange(newText);
    props.showAlert('Converted to uppercase!', 'success');
    textAreaRef.current.focus();
  };

  const handleLoClick = () => {
    let newText = props.text.toLowerCase();
    props.onTextChange(newText);
    props.showAlert('Converted to lowercase!', 'success');
    textAreaRef.current.focus();
  };

  const handleClearClick = () => {
    let newText = '';
    props.onTextChange(newText);
    props.showAlert('Everything Cleared!', 'success');
    textAreaRef.current.focus();
  };

 

  const handleInsertBulletPoint = () => {
    if (textAreaRef.current && props.text.length === 0) {
      props.onTextChange(() => "• ");
      textAreaRef.current.focus();
    }
    if(textAreaRef.current && props.text.length !== 0){
      props.onTextChange((prevText) => prevText + "\n• ");
      textAreaRef.current.focus();
    }
  };
  

  const handleCopy = () => {
    navigator.clipboard.writeText(props.text);
    props.showAlert('Copied to Clipboard!', 'success');
  };

  const handleExtraSpaces = () => {
    let newText = props.text.split(/[ ]+/);
    props.onTextChange(newText.join(' '));
    props.showAlert('Extra spaces removed!', 'success');
    textAreaRef.current.focus();
  };

  const handleTextAreaChange = (e) => {
    props.onTextChange(e.target.value);
  };


 

  
  const handleFindReplace = () => {
    if (props.text.length === 0) {
      props.showAlert('Sorry the editor is empty!', 'danger');
      let newFindword ='';
      setFindWord(newFindword);
      setReplaceWord(newFindword);
      return;
    }

    let newText = props.text.split(findWord).join(replaceWord);
    props.onTextChange(newText);
    props.showAlert('Text replaced successfully!', 'success');
 let newFindword ='';
 setFindWord(newFindword)
 setReplaceWord(newFindword)
  };
 

  const handleToggleCalk = () => {
    props.toggleCalkVisibility();
  };
 // style={{ backgroundColor: props.mode === 'dark' ? '#393e42' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }}
  return (
    <>
      <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h1 className="mb-4">{props.heading}</h1>
           <div className="mb-3">
           <textarea
            ref={textAreaRef}
            value={props.text}
            className="form-control"
            style={{
              backgroundColor: props.mode === 'dark' ? '#393e42' : 'white',
              color: props.mode === 'dark' ? 'white' : '#042743',
            }}
            onChange={handleTextAreaChange}
            rows="8"
          ></textarea>         

           </div>
           <div className="btn-container">
            <div className="up-btc">
        <button disabled={props.text.length === 0} className="btn btn-primary capital mx-1 my-1" onClick={handleUpClick}> 
        <i className="fa-solid fa-font"></i><i className="fa-solid fa-arrow-up"></i>
        </button>
        <button disabled={props.text.length === 0} className="btn btn-primary smaller mx-1 my-1" onClick={handleLoClick}>
        <i><h4>a</h4></i><i className="fa-solid fa-arrow-down"></i>
          </button>
        <button disabled={props.text.length === 0} className="btn btn-danger mx-1 my-1" onClick={handleClearClick}><i className="fa-solid fa-trash"></i></button>
        <button disabled={props.text.length === 0} className="btn btn-success mx-1 my-1" onClick={handleCopy}>
        <i className="fa-regular fa-clipboard"></i>
        </button></div>
        <div className="do-btc">
        <button disabled={props.text.length === 0} className="btn btn-primary rexsp mx-1 my-1" onClick={handleExtraSpaces}>R.E.S</button>
        <button disabled={props.text.length === 0} className="btn btn-primary mx-1 format my-1" onClick={formatText}>Format</button>
        <button className="btn btn-primary bulleti mx-1 my-1" onClick={handleInsertBulletPoint}>
        <i className="fa-solid fa-list-ul"></i>
          </button></div>
          </div>
          <div className="input-group mb-3">
          <input
            type="text"
            className={`form-control mx-1 my-1 pbg-${props.mode==='light'?'light':'dark'}`}
            placeholder="Word to find"
            value={findWord}
            onChange={(e) => setFindWord(e.target.value)}
            style={{
              backgroundColor: props.mode === 'dark' ? '#393e42' : 'white',
              color: props.mode === 'dark' ? 'white' : '#042743',
            }}
          />
          <input
            type="text"
            className={`form-control mx-1 my-1 pbg-${props.mode==='light'?'light':'dark'}`}
            placeholder="Replace with"
            value={replaceWord}
            onChange={(e) => setReplaceWord(e.target.value)}
            style={{
              backgroundColor: props.mode === 'dark' ? '#393e42' : 'white',
              color: props.mode === 'dark' ? 'white' : '#042743',
            }}
          />
          <button disabled={findWord.length===0} className="fnr btn btn-primary mx-1 my-1" onClick={handleFindReplace}>
            Replace
          </button>
        </div>
      </div>
      <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h2>Your text summary</h2>
        <b>
        <p>
          {props.text.split(/\s+/).filter((element) => {return element.length !== 0;}).length}{' '}Words and {props.text.length} Characters</p>
        {/* <p>{0.008 * props.text.split(/\s+/).filter((element) => element.length !== 0).length} Minutes read</p> */}
        {/* <p>{props.text.split(/[.?•]/).filter((line) => line.trim() !== "").length} Lines , includes</p> */}
        <p>{props.text.split(/(?<=[.?!•\n])\s+/).filter((line) => line.trim() !== "").length} Lines</p>
        <p>{props.text.split('•').length - 1} Bullet Points and {props.text.split('?').length - 1} Question Marks</p>
       </b>

       {/* calculator trigger */}
        {props.mode === "light" || props.mode === "dark" ? (
        <button
          className="btn btn-primary btn-clkt mx-1 my-1 gap-2"
          onClick={handleToggleCalk}
        >
        <i className="fa-solid fa-calculator"></i>Calculator
        </button>
      ) : null}

        <h2>Preview</h2>
        <pre className={`prev prev-${props.mode==='light'?'light':'dark'}`}>{props.text.length > 0 ? text : 'Nothing to preview!'}</pre>

        <div className="mb-3">
        <input
          type="text"
          className={`form-control pbg-${props.mode==='light'?'light':'dark'}`}
          placeholder="Enter file name for download"
          value={downloadFileName}
          onChange={(e) => setDownloadFileName(e.target.value)}
          style={{ backgroundColor: props.mode === "dark" ? "#393e42" : "white", color: props.mode === "dark" ? "white" : "#042743"}}
        />
      </div>
      <div className="btn-container">
      <select
  className="form-select mx-1 my-1"
  value={selectedFileType}
  onChange={(e) => setSelectedFileType(e.target.value)}
>
<option value="txt">TXT (Plain Text)</option>
  <option value="json">JSON (JavaScript Object Notation)</option>
  <option value="python">Python</option>
  <option value="cpp">C++</option>
  <option value="java">Java</option>
  <option value="html">HTML (Hypertext Markup Language)</option>
  <option value="css">CSS (Cascading Style Sheets)</option>
  <option value="xml">XML (eXtensible Markup Language)</option>
  <option value="markdown">Markdown</option>
  <option value="csv">CSV (Comma-Separated Values)</option>
  <option value="yaml">YAML (YAML Ain't Markup Language)</option>
  <option value="php">PHP: Hypertext Preprocessor</option>
  <option value="sql">SQL (Structured Query Language)</option>
  <option value="typescript">TypeScript</option>
  <option value="javascript">JavaScript</option>
  <option value="doc">DOC (Microsoft Word Document)</option>
  <option value="docx">DOCX (Microsoft Word Open XML Document)</option>
  <option value="xls">XLS (Microsoft Excel Spreadsheet)</option>
  <option value="xlsx">XLSX (Microsoft Excel Open XML Spreadsheet)</option>
  <option value="ppt">PPT (Microsoft PowerPoint Presentation)</option>
  <option value="pptx">PPTX (Microsoft PowerPoint Open XML Presentation)</option>
  <option value="odt">ODT (OpenDocument Text)</option>
  <option value="ods">ODS (OpenDocument Spreadsheet)</option>
  <option value="odp">ODP (OpenDocument Presentation)</option>
  </select>
      <button
        disabled={props.text.length === 0 || downloadFileName.trim() === ""}
        className="btn btn-success mx-1 my-1 gap-2"
        onClick={handleFileDownload}
      >
        <i className="fa-solid fa-download"></i> Download
      </button>
      <button
         disabled={props.text.length === 0 || downloadFileName.trim() === ""}
         className="btn btn-primary my-1 mx-1 gap-2"
         onClick={showpdf}
      >
      <i className="fa-solid fa-download"></i> PDF
      </button>
      </div>
      </div>
      

      <div className="pdfform" >
        <label htmlFor="closefd"/>
        <div className={`dform-contained df-${props.mode}`}>
          <nav><button
           className="closef"
           onClick={hidepf}
            id="closefd">
              <i className="fa-solid fa-xmark"></i></button></nav>
          <main className="mmain">
            <div className="lmain">
              <h3 className={`cld-${props.mode}`}>Adjust Page size and Font size</h3>
           <h5 className={`cld-${props.mode}`}>• Set Font size</h5>   
          <select
            className="form-select mx-1 my-1 selew"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value='12'>Small</option>
            <option value="16">Medium</option>
            <option value="20">Large</option>
            <option value="custom">Custom</option>
          </select>
          {fontSize === "custom" && (
            <input
              type="number"
              className="form-control mx-1 my-1"
              placeholder="Custom Font Size"
              value={customFontSize}
              onChange={(e) => setCustomFontSize(e.target.value)}
              required
            />
          )}

<h5 className={`cld-${props.mode}`}>• Set Page size</h5>  
          <select
          id="paes"
            className="form-select mx-2 my-1 selew"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
          >
            <option value="A0">A0</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="A3">A3</option>
            <option value="A4">A4</option>
            <option value="A5">A5</option>
            <option value="A6">A6</option>
            <option value="A7">A7</option>
            <option value="A8">A8</option>
            <option value="A9">A9</option>
            <option value="A10">A10</option>
            <option value="Letter">Letter (8.5 x 11 inc)</option>
            <option value="Legal">Legal (8.5 x 14 inc)</option>
            <option value="Ledger">Ledger (17 x 11 inc)</option>
            <option value="Tabloid">Tabloid (11 x 17 inc)</option>
            <option value="Executive">Executive (7.25 x 10.5 inc)</option>
            <option value="ANSI-A">ANSI A</option>
            <option value="ANSI-B">ANSI B</option>
            <option value="ANSI-C">ANSI C</option>
            <option value="ANSI-D">ANSI D</option>
            <option value="ANSI-E">ANSI E</option>
            <option value="Arch-A">Arch A</option>
            <option value="Arch-B">Arch B</option>
            <option value="Arch-C">Arch C</option>
            <option value="Arch-D">Arch D</option>
            <option value="Arch-E">Arch E</option>
          </select>
      <button
        disabled={props.text.length === 0 || downloadFileName.trim() === ""}
        className="btn btn-success mx-1 my-1 gap-2"
        onClick={handlePDFDownload}
      >
        <i className="fa-solid fa-download"></i> PDF
      </button></div>
      <div className="rmain">
        <div className={`pdfprev pdffrev-${props.mode} cld-${props.mode} `}  style={
          {
            fontSize: fontSize === "custom" ? `${+customFontSize}pt` :`${+fontSize}pt` 
          }
        }
        >The PDF font will be like this...</div>
      </div>  
          </main>
        </div>
      </div>
    </>
  );
}
