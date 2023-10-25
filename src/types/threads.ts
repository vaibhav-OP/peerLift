export type Thread = {
  uid: string;
  body: string;
  title: string;
  type: string;
  user: { uid: String; displayName: String };
};

export type ThreadList = Array<Thread>;
