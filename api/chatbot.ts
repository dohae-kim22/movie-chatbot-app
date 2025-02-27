import { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY,
});

async function sendMessages(messages: OpenAI.ChatCompletionMessageParam[]) {
  const findTuneData: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "You are a chatbot that provides recommendations and movie information! In all responses, always enclose all of the movie titles in {{}} and display the release year in parentheses like {{English Title}}(Year of Release)! Never recommend a movie that the user directly says they like, instead recommend movies that are similar to that one.",
    },
    {
      role: "assistant",
      content:
        "The movie {{Parasite}}(2019) is a globally acclaimed film by director Bong Joon-ho. With its realistic yet artistic direction and superb performances, it has garnered significant audience acclaim.",
    },
    {
      role: "assistant",
      content:
        "{{Sing}}(2016) is an animated film that leads audiences into laughter with its comic yet emotional story.",
    },
    {
      role: "assistant",
      content:
        "I recommend the {{John Wick}}(2014) series! In these action-packed films, Keanu Reeves delivers captivating action performances, blending stylish action with a compelling story of revenge.",
    },
    {
      role: "assistant",
      content:
        "Of course! For a movie featuring Charlize Theron as Furiosa, you might want to check out {{Monster}}(2003) and {{Mad Max: Fury Road}}(2015).",
    },
    {
      role: "assistant",
      content:
        "If you’re looking for a lighthearted film, I recommend {{Becoming Jane}}(2007), a romantic film about the youth of Jane Austen, exploring love and fate.",
    },
    {
      role: "assistant",
      content:
        "I recommend the horror-thriller film {{The Host}}(2006), directed by Bong Joon-ho. Set along the Han River, this film depicts the appearance of a monster and the events that follow, focusing on family love and sacrifice.",
    },
    {
      role: "assistant",
      content:
        "Directed by Christopher Nolan, {{Interstellar}}(2014) is a representative science fiction film that balances scientific exploration and human emotions.",
    },
    {
      role: "assistant",
      content:
        "I recommend {{Amadeus}}(1984). Directed by Miloš Forman, this film centers around the relationship between two talented musicians, Wolfgang Amadeus Mozart and Antonio Salieri.",
    },
    {
      role: "assistant",
      content:
        "I recommend {{Peninsula}}(2020). This action-thriller is set in a post-apocalyptic world after a zombie outbreak, offering intense battles and thrilling moments.",
    },
    {
      role: "assistant",
      content:
        "The Matrix series currently has three films. {{The Matrix}}(1999) is a groundbreaking movie that explores the conflict between cyber-future and reality. {{The Matrix Reloaded}}(2003) continues the story of the first film. {{The Matrix Revolutions}}(2003) is the final installment of the series, featuring complex plotlines and stunning visual effects.",
    },
  ];

  const chatCompletion = await openAi.chat.completions.create({
    messages: [...findTuneData, ...messages],
    model: "gpt-3.5-turbo",
  });

  return chatCompletion.choices[0].message;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { messages } = JSON.parse(request.body);

  const res = await sendMessages(messages);

  response.status(200).json(res);
}
