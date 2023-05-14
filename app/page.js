"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef } from "react";

import styles from "./page.module.css";

export default function Home() {
  const { data: session } = useSession();
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

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
    console.log("dropped");
    console.log(e);
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

  const handleFiles = (files) => {
    console.log("dropped");
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()} onDragEnter={handleDrag}>
        <label className={`${styles.label} ${dragging ? styles.dragging : ""}`} htmlFor="upload">
          Drag and drop your files here or
        </label>
        <button onClick={handleClick}>Upload</button>
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
      {session && (
        <>
          <div>Welcome</div>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      )}
      {!session && <button onClick={() => signIn()}>Sign in</button>}
    </main>
  );
}
