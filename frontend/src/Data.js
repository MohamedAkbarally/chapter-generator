import React, { useState } from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function formatTime(durationFloat, useHours) {
  const duration = parseInt(durationFloat);
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  function pad(number) {
    return number.toString().padStart(2, "0");
  }

  if (useHours) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  } else {
    return `${pad(minutes)}:${pad(seconds)}`;
  }
}

export default function Data({ start_time, options }) {
  const [optionIdx, setOptionIdx] = useState(0);
  return (
    <div className="d-flex bg-light align-items-center mt-2 py-2 px-4">
      <div className="me-4  blue link-primary ">{formatTime(start_time)}</div>
      <div className="fw-bold fs-5 flex-grow-1">{options[optionIdx]}</div>
      <button type="button" className="btn btn-light ms-2">
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    </div>
  );
}
