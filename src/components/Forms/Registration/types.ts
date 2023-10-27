export type UserDetails = {
  displayName: string;
  age: number;
  bio: string;
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
