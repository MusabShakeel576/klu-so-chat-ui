import Chat from "@/components/chat";
import Form from "@/components/form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-y-4 container mx-auto py-10 px-4 sm:px-0">
      <div className="flex justify-end grow h-0">
        <Chat />
      </div>
      <div className="flex-none">
        <Form />
      </div>
    </main>
  )
}
