"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef } from "react";
import googleIcon from "@/public/google.svg";
import Image from "next/image";

import { sohneBreit } from "./layout";

import styles from "./page.module.css";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className={styles.main}>
      <p className={styles.welcome}>Welcome to</p>
      <h1 className={`${sohneBreit.className} ${styles.h1}`}>DDROP</h1>
      <div className={styles.content}>
        <p>Just about the easiest way to upload files to your google drive. Login to unleash the power of the D.</p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/upload" })}
          className={`button ${styles.buttonWithIcon} ${sohneBreit.className}`}
        >
          <Image src={googleIcon} width={30} height={30} alt="" />
          Login with google
        </button>
      </div>
    </main>
  );
}
