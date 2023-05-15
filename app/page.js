"use client";

import { motion, optimizedAppearDataAttribute } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef } from "react";
import googleIcon from "@/public/google.svg";
import Image from "next/image";

import { sohneBreit } from "./layout";

import styles from "./page.module.css";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  if (session) redirect("/upload");

  return (
    <>
      {!session && (
        <main className={styles.main}>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0, 0, 0, 0.8] }}
            className={styles.welcome}
          >
            Welcome to
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0, 0, 0, 0.8], delay: 0.5 }}
            className={`${sohneBreit.className} ${styles.h1}`}
          >
            DDROP
          </motion.h1>
          <div className={styles.contentWrapper}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
              className={`border ${styles.content}`}
            >
              <p>
                Just about the easiest way to upload files to your google drive. Login to unleash the power of the D.
              </p>
              <button
                onClick={() => signIn("google", { callbackUrl: "/upload" })}
                className={`button ${styles.buttonWithIcon} ${sohneBreit.className}`}
              >
                <Image src={googleIcon} width={22} height={22} alt="" />
                Login with google
              </button>
            </motion.div>
          </div>
        </main>
      )}
    </>
  );
}
