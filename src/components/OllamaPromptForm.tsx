import { useState } from "react";
import type { FormEvent } from "react";

export default function Form() {

  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/ollama", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }


return (
<div id="container">
  <main className="max-w-xl">
    <section id="hero">
      <form onSubmit={submit}>
        <label className="font-bold text-xl" htmlFor="query">
          what is it?
        </label><br />
        <textarea name="query" className="text-black p-2 w-full" /><br />
        <button className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-full">Query</button>
      </form>
      {responseMessage && 
      <div id="response" className="bg-emerald-900 rounded-xl p-5 mt-5">{responseMessage}</div>}
    </section>
  </main>
</div>
);
}
