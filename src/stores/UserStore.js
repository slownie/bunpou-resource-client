import { defineStore } from "pinia";
import router from "@/router";

export const useUserStore = defineStore("userState", {
  state: () => ({
    user: null,
    error: null,
  }),

  actions: {
    // Auth Actions
    async signup(email, password) {
      this.error = null;
      const res = await fetch(
        "https://bunpou-resource-server.vercel.app/api/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const json = await res.json();

      if (!res.ok) {
        this.error = json.error;
      }

      if (res.ok) {
        this.user = json;
      }
    },

    async login(email, password) {
      this.error = null;
      const res = await fetch(
        "https://bunpou-resource-server.vercel.app/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const json = await res.json();

      if (!res.ok) {
        this.error = json.error;
      }

      if (res.ok) {
        this.user = json;
      }
    },

    async logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },

  // Data Actions
  async addSentence(sentenceObject) {
    const userID = this.user._id;
    try {
      const res = await fetch(
        "https://bunpou-resource-server.vercel.app/api/users/addSentence",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({userID, sentenceObject}),
        }
      );
      if (res.ok) {
        // Add the new sentence to the pinia state
        this.user.sentenceBank.append(sentenceObject);
      }
    } catch (error) {
      this.error = error;
    }
  }
});
