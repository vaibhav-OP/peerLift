export type UserDetails = {
  bio: string;
  age: Date;
  displayName: string;
  gender: "male" | "female";
};

export type Interests =
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

export type InterestArray = Array<Interests>;
