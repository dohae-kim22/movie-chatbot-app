import Store from "../core/store";
import OpenAI from "openai";

interface IState {
  chatText: string;
  messages: OpenAI.ChatCompletionMessageParam[];
  loading: boolean;
}

const defaultMessages: OpenAI.ChatCompletionMessageParam[] = [
  {
    role: "assistant",
    content: "Hey! What’s your favorite movie genre or title?",
  },
];

const store = new Store<IState>({
  chatText: "",
  messages: defaultMessages,
  loading: false,
});
export default store;

export async function sendMessages() {
  if (!store.state.chatText.trim()) return;
  if (store.state.loading) return;
  store.state.loading = true;
  store.state.messages = [
    ...store.state.messages,
    {
      role: "user",
      content: store.state.chatText,
    },
  ];

  try {
    const res = await fetch("/api/chatbot", {
      method: "POST",
      body: JSON.stringify({
        messages: store.state.messages,
      }),
    });
    const message = await res.json();
    store.state.messages.push(message);
  } catch (error) {
    console.log("sendMessages error : ", error);
  } finally {
    store.state.loading = false;
  }
}

export function resetMessages() {
  store.state.messages = defaultMessages;
}
