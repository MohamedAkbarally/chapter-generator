import { faClipboard, faGears } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect, useState } from 'react';
import Data from "./Data";
import Coin from "./res/coins.png";

function Form() {
  return (
    <div class="my-4">
      <p class="text-secondary">Enter the URL of the video you would like to generate chapter titles for:</p>
      <div class="d-flex bd-highlight align-items-center">
        <div class="py-2 flex-grow-1 input-group-lg">
          <input type="text" class="form-control" placeholder="Search" />
        </div>
        <button type="button" class="ms-2 py-2 px-4 btn btn-primary btn-lg">Generate</button>
      </div >
    </div>
  );
}

function Result({ result }) {
  const { loading, data } = result
  return (
    loading ? <div class="text-center" style={{ paddingTop: 80 }}>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div> :
      (<div class="my-4">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" class="btn me-2 fw-bold">
            <span class="me-2" aria-hidden="true">
              <FontAwesomeIcon icon={faClipboard} />
            </span>
            Copy
          </button>
        </div>
        {data.map((item) => (
          <Data options={item.options} start_time={item.start_time} />
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



function App() {
  const [result, setResult] = useState();

  useEffect(() => {
    postData();
  }, []);

  const postData = async () => {
    setResult({ loading: true });
    try {
      const response = await fetch('https://chapter-gen.herokuapp.com/fetch_chapters', {
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
      <div class="d-flex border" style={{ height: 70, alignItems: 'stretch' }}>
        <h5 class="my-auto px-4">Youtube Chapter Generator</h5>
      </div>
      <div class="container p-4">
        <Form />
        {result && <Result result={result} />}

      </div>
    </div>
  );
}

export default App;
