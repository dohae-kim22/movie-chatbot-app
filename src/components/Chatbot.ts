import Component from "../core/component";
import chatbotStore, { sendMessages } from "../store/chatbot";
import movieStore, { searchMovies } from "../store/movie";

export default class Chatbot extends Component {
  constructor() {
    super();
    chatbotStore.subscribe("messages", () => {
      this.render();
    });
    chatbotStore.subscribe("loading", () => {
      this.render();
    });
  }

  render() {
    this.el.classList.add("chat-bot");
    this.el.innerHTML = /* html */ `
    <div class="chats">
        <ul>
            ${chatbotStore.state.messages
              .map(
                (message) => `
                    ${
                      message.role === "assistant"
                        ? /* html */ `
                        <div class="assistant-icon">
                            <span class="material-symbols-outlined">person</span>
                        </div>`
                        : ""
                    } 
                    <li class=${message.role}>${
                  typeof message.content === "string"
                    ? message.content.replace(
                        /{{(.*?)}}/g,
                        (match, title) =>
                          `<span class="title" data-title=${title.toLowerCase()}>${title}</span>`
                      )
                    : ""
                }</li>`
              )
              .join("")} 
                ${
                  chatbotStore.state.loading
                    ? /* html */ `<div class="assistant-icon">
                                        <span class="material-symbols-outlined">person</span>
                                    </div>
                                    <li class="assistant"><div class="loader"></div></li>`
                    : ""
                }
        </ul>
        <div class="input">
            <input />
            <button class="btn btn-primary">
                <span class="material-symbols-outlined icon">send</span>
            </button>
        </div>
    </div>
    <div class="btn btn-circle chat-starter">
        <span class="material-symbols-outlined icon-open">3p</span>
        <span class="material-symbols-outlined icon-close">cancel</span>
    </div>
    `;

    // Input
    const inputEl = this.el.querySelector("input");
    inputEl?.addEventListener("input", () => {
      chatbotStore.state.chatText = inputEl.value;
    });

    inputEl?.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        sendMessages();
      }
    });

    const sendBtn = this.el.querySelector(".input .btn");
    sendBtn?.addEventListener("click", () => {
      sendMessages();
    });

    // Open / Close Chatbot
    const chatStartBtn = this.el.querySelector(".chat-starter");
    chatStartBtn?.addEventListener("click", (event) => {
      event.stopPropagation();
      this.el.classList.toggle("chatbot-on");
      if (this.el.classList.contains("chatbot-on")) {
        setTimeout(() => {
          inputEl?.focus();
        }, 300);
      }
    });

    window.addEventListener("click", () => {
      this.el.classList.remove("chatbot-on");
    });

    const chatEl = this.el.querySelector(".chats");
    chatEl?.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    const chatListEl = this.el.querySelector(".chats ul");
    chatListEl?.scrollTo(0, chatListEl.scrollHeight || 0);

    inputEl?.focus();

    // Click Recommended Movie by Chatbot
    const titleEl = this.el.querySelectorAll<HTMLElement>(".chats .title");
    titleEl.forEach((el) => {
      el.addEventListener("click", () => {
        const searchInputEL =
          document.querySelector<HTMLInputElement>(".search input");
        if (!searchInputEL) return;
        const title = el.dataset.title || "";
        searchInputEL.value = title;
        movieStore.state.searchText = title;
        searchMovies(1);
      });
    });
  }
}
