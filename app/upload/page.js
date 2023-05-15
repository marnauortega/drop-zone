"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef } from "react";

import styles from "./page.module.css";
import { sohneBreit } from "../layout";

const UploadPage = () => {
  const { data: session } = useSession();
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const [resultMessage, setResultMessage] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files) => {
    const file = files[0];
    try {
      const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=media", {
        method: "POST",
        body: file,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const data = await response.json();
      console.log("data", data);
      setResultMessage(
        <p className={`${sohneBreit.className} ${styles.p}`}>
          {`Yeay, your file ${file.name}`}
          <br />
          has been uploaded!
        </p>
      );
    } catch (error) {
      console.log(error);
      setResultMessage(
        <p className={`${sohneBreit.className} ${styles.p}`}>
          Ouch, something went wrong <br /> Try again dropping a file
        </p>
      );
    }
  };

  return (
    <>
      {session && (
        <header className={styles.header}>
          <p className={sohneBreit.className}>Welcome, {session.user.name}</p>
          <button className={`button ${styles.headerButton}`} onClick={() => signOut()}>
            Sign Out
          </button>
        </header>
      )}
      <div className={styles.formWrapper}>
        <form
          className={`${styles.form} ${dragging ? styles.dragging : ""}`}
          onSubmit={(e) => e.preventDefault()}
          onDragEnter={handleDrag}
        >
          <label className={`${sohneBreit.className} ${styles.label}`} htmlFor="upload">
            {dragging ? "Drop it right here" : "Drag and drop a file here or"}
          </label>
          {resultMessage}
          <button className="button" onClick={handleClick}>
            Click here to upload
          </button>
          <input
            ref={inputRef}
            onChange={handleChange}
            className={styles.input}
            id="upload"
            type="file"
            multiple={true}
          />
          {dragging && (
            <div
              className={styles.surface}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </form>
      </div>
    </>
  );
};

export default UploadPage;
