"use client";

import { Post as devType } from "@/types/interfaces";
import Link from "next/link";
import styles from "./About.module.css";

const developer: devType = {
  userId: 9999,
  id: "9999",
  title: "Front End Developer",
  body: "This app was built with Nextjs, Tailwind and React as a challenge.",
  email: "matiasncalvar@gmail.com",
  name: "Matias Calvar",
  initials: "MC",
};

const AboutCard = () => {
  return (
    <div className={styles.AboutCard + " flex justify-center h-auto"}>
      <div className="my-10">
        <div
          key={developer.id}
          className={`m-2.5 bg-white w-[1000px] rounded-md shadow-md p-5 `}
        >
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center rounded-full bg-bi-red w-8 h-8 mr-2 text-white`}
            >
              {developer.initials}
            </div>

            <p className="text-bold">{developer.name}</p>
            <p className="text-bold mx-5 text-gray-400 select-none text-sm">
              {developer.email}
            </p>
          </div>
          <p className="font-medium mt-1">{developer.title}</p>
          <p className="text-sm my-1">{developer.body}</p>

          <p className="mt-2 text-xs text-end">
            <Link href={"https://www.linkedin.com/in/matiascalvar/"}>
              See more
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutCard;
