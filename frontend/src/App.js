import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect, useState } from 'react';
import Data from "./Data";

function Form() {
  return (
    <div className="my-4">
      <p className="text-secondary">Enter the URL of the video you would like to generate chapter titles for:</p>
      <div className="d-flex bd-highlight align-items-center">
        <div className="py-2 flex-grow-1 input-group-lg">
          <input type="text" className="form-control" placeholder="Search" />
        </div>
        <button type="button" className="ms-2 py-2 px-4 btn btn-primary btn-lg">Generate</button>
      </div >
    </div>
  );
}

function Result({ result }) {
  const { loading, data } = result
  return (
    loading ? <div className="text-center" style={{ paddingTop: 80 }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div> :
      (<div className="my-4">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" className="btn me-2 fw-bold">
            <span className="me-2" aria-hidden="true">
              <FontAwesomeIcon icon={faClipboard} />
            </span>
            Copy
          </button>
        </div>
        {data.map((item) => (
          <Data key={item.options[0]} options={item.options} start_time={item.start_time} />
        ))}
      </div>)
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2023 Mohamed Akbarally. All rights reserved.</p>
    </footer>
  );
}


const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [result, setResult] = useState();

  useEffect(() => {
    postData();
  }, []);

  const postData = async () => {
    setResult({ loading: true });
    try {
      const response = await fetch(`${apiUrl}/fetch_chapters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: 'John Doe' })
      });
      const jsonData = await response.json();
      setResult({ loading: false, data: jsonData });
      console.log("done")
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div className="App">
      <div className="d-flex border" style={{ height: 70, alignItems: 'stretch' }}>
        <h5 className="my-auto px-4">Youtube Chapter Generator 2</h5>
      </div>
      <div className="container p-4">
        <Form />
        {result && <Result result={result} />}

      </div>
    </div>
  );
}

export default App;
