import TextHeader from "@/components/Header/TextHeader";

export default function ThreadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TextHeader heading="test" />
      {children}
    </>
  );
}
