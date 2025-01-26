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
      try {
        const res = await fetch(
          "https://bunpou-resource-server.vercel.app/api/users/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );
        // Update Pinia state
        const user = await res.json();
        this.user = user;
        this.error = null;

        // Browser Related
        localStorage.setItem("user", user);
        router.push("/"); // Go to homepage
      } catch (error) {
        this.error = error;
      }
    },

    async login(email, password) {
      const res = await fetch(
        "https://bunpou-resource-server.vercel.app/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
      }

      if (res.ok) {
        const user = await res.json();
        this.user = user;
        window.location.reload();
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
