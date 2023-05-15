"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useRef } from "react";
import { redirect } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./page.module.css";
import { sohneBreit } from "../layout";
import DashedAnimation from "@/components/DashedAnimation/DashedAnimation";

const UploadPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });
  const [dropped, setDropped] = useState(false);
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

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropped(true);
    setTimeout(() => setDropped(false), 5000);
    setDragging(false);
    if (e.dataTransfer?.files[0]) {
      await handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target?.files[0]) {
      await handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files) => {
    const file = files[0];
    try {
      await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=media", {
        method: "POST",
        body: file,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      setResultMessage(
        <motion.p
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          transition={{ duration: 1, ease: [0, 0, 0, 0.8] }}
          className={`${sohneBreit.className} ${styles.p} ${dropped ? styles.dropped : ""}`}
        >
          Yeay, your file <em>{file.name}</em>
          <br />
          has been uploaded!
        </motion.p>
      );
    } catch (error) {
      setResultMessage(
        <motion.p
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          transition={{ duration: 1, ease: [0, 0, 0, 0.8] }}
          className={`${sohneBreit.className} ${styles.p} ${dropped ? styles.dropped : ""}`}
        >
          Ouch, something went wrong <br /> Try again dropping a file
        </motion.p>
      );
    }
  };

  return (
    <>
      {session && (
        <>
          <header className={styles.header}>
            <p className={sohneBreit.className}>Welcome, {session.user.name.split(" ")[0]}</p>
            <button className={`button ${styles.headerButton}`} onClick={() => signOut()}>
              Sign Out
            </button>
          </header>
          <div className={styles.formWrapper}>
            <form
              className={`${styles.form} ${dragging ? styles.dragging : ""}`}
              onSubmit={(e) => e.preventDefault()}
              onDragEnter={handleDrag}
            >
              <AnimatePresence initial={false} mode="wait">
                <div key={0} className={styles.textWrapper}>
                  {!dropped ? (
                    <motion.label
                      initial={{ opacity: 0, y: 20, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: -20, x: "-50%" }}
                      transition={{ duration: 1, ease: [0, 0, 0, 0.8] }}
                      className={`${sohneBreit.className} ${styles.label}`}
                      htmlFor="upload"
                    >
                      {dragging ? "Drop it right here" : "Drag and drop a file here or"}
                    </motion.label>
                  ) : (
                    resultMessage
                  )}
                </div>
                <button key={2} className="button" onClick={handleClick}>
                  Click here to upload
                </button>
                <input
                  key={3}
                  ref={inputRef}
                  onChange={handleChange}
                  className={styles.input}
                  id="upload"
                  type="file"
                  multiple={true}
                />
                <DashedAnimation key={4} sectors={400} dragging={dragging} />
                {dragging && (
                  <div
                    key={5}
                    className={styles.surface}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  ></div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UploadPage;
