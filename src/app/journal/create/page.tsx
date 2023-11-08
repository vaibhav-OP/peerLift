import { TextHeader } from "@/components/Header";

export default function CreateJournalPage() {
  return (
    <>
      <TextHeader heading="Post Journal" />
      <section className="px-5 sm:px-8 border-t border-text/10 py-3">
        <h6 className="text-center text-base font-bold">
          What’s on your mind?
        </h6>

        <form className="w-full h-full flex flex-col gap-3 mt-3">
          <input
            type="text"
            name="title"
            placeholder="title"
            required
            className="bg-secondary placeholder:text-text/60 py-5 px-8 rounded-2xl outline-none"
          />
          <br />
          <textarea
            name="body"
            placeholder="Start Journaling......"
            className="bg-secondary placeholder:text-text/60 max-h-96 py-5 px-8 rounded-2xl outline-none flex-grow"
          />
          <br />
          <button
            type="submit"
            className="bg-text text-background text-xl px-6 py-2 rounded-full">
            Log Journal
          </button>
        </form>
      </section>
    </>
  );
}
