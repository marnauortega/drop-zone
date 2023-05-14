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
    console.log(session.accessToken);

    console.log(file);

    try {
      const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=media", {
        // ?uploadType=media
        method: "POST",
        body: file,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // const formData = new FormData();
    // formData.append("name", file.name);
    // formData.append("type", file.type);
    // formData.append("data", await file.arrayBuffer());

    // try {
    //   const response = await fetch("/api/drive", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   const data = await response.json();
    //   console.log("data", data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  if (session) console.log(session);

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
      {!session && <button onClick={() => signIn("google")}>Sign in</button>}
    </main>
  );
}
