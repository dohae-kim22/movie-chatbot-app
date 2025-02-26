import Store from "../core/store";

interface IMessage {
  role: "assistant" | "user";
  content: string;
}

interface IState {
  chatText: string;
  messages: IMessage[];
  loading: boolean;
}

const defaultMessages: IMessage[] = [
  {
    role: "assistant",
    content:
      " I'd be happy to recommend some movies. Could you share your favorite genre or movie title?",
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
    const message = res.json();
  } catch (error) {
    console.log("sendMessages error : ", error);
  } finally {
    store.state.loading = false;
  }
}

export function resetMessages() {
  store.state.messages = defaultMessages;
}
