import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import React, { useState } from "react";
import Alert from "./components/Alert";
import Calk from './components/Calk';
import Footer from './components/Footer';


function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);
  const [calkVisible, setCalkVisible] = useState(false);
  const [text, setText] = useState(""); // State to hold the text

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#1b1b1b"; // Body dark mode color
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "rgb(239, 240, 241)"; // Body light mode color
      showAlert("Light mode has been enabled", "success");
    }
  };

  const handleToggleCalk = () => {
    setCalkVisible((prevState) => !prevState);
  };

  const handleToggleTextForm = () => {
    setCalkVisible((prevState) => !prevState);
  };

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
    <>
        <header>
          <Navbar
          title="Textsheet"
          mode={mode}
          toggleMode={toggleMode}/>
        <Alert alert={alert} className='alerted' />
        </header>
        <main>
            {calkVisible ? (
              <Calk mode={mode} toggleTextFormVisibility={handleToggleTextForm} />
            ) : (
              <TextForm
                text={text} // Pass the text state
                onTextChange={handleTextChange} // Pass the handler to update text
                showAlert={showAlert}
                heading="Write and download in PDF or Txt Format"
                mode={mode}
                toggleCalkVisibility={handleToggleCalk}
              />
            )}
        </main>
        <footer 
        style={{
          marginTop: '7vh',
        }}>
          <Footer/>
        </footer>
    </>
  );
}

export default App;
