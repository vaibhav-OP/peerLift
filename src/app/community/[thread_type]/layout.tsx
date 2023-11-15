import TextHeader from "@/components/Header/TextHeader";

export default function ThreadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TextHeader heading="test" />
      <div className="relative h-full overflow-x-auto flex flex-col">
        {children}
      </div>
    </>
  );
}
