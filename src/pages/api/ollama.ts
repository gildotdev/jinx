import { APIRoute } from 'astro';
import ollama from 'ollama';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  console.log(data.get('query'));

  const search = data.get('query') || undefined;

  if (search) {
    console.log(search);
    const promptResponse = await ollama
      .chat({
        model: 'llama3.2',
        messages: [{ role: 'user', content: search as string }],
      })
      .then((response) => {
        console.log(response);

        return new Response(
          JSON.stringify({
            message: response.message.content,
          }),
          { status: 200 }
        );
      });

    return promptResponse;
  } else {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
      }),
      { status: 400 }
    );
  }
};
