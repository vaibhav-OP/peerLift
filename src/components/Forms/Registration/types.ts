export type UserDetails = {
  displayName: string;
  age: number;
  bio: string;
  gender: "male" | "female";
};

export type Interests =
  | "ADHD (ADD)"
  | "Anxiety"
  | "Autism"
  | "Depression"
  | "Physical Problems"
  | "Addiction (Relapse)"
  | "Disassociation "
  | "Eating Disorder"
  | "OCD"
  | "Personality Disorder"
  | "Trauma (PTSD)"
  | "Schizophrenia (Psychosis)";

export type InterestArray = Array<Interests>;
