import { StaticImageData } from "next/image";

export type UserDetails = {
  bio: string;
  age: Date;
  displayName: string;
  gender: "male" | "female";
};

export type Interests = {
  name:
    | "OCD"
    | "Autism"
    | "Depression"
    | "ADHD & ADD"
    | "Trauma & PTSD"
    | "Disassociation"
    | "Eating Disorder"
    | "Stress & Anxiety"
    | "Physical Problems"
    | "Addiction & Relapse"
    | "Personality Disorder"
    | "Schizophrenia & Psychosis";
  icon: StaticImageData;
};

export type InterestArray = Interests[];
