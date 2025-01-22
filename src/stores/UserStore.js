import { defineStore } from "pinia";
import router from "@/router";

export const useUserStore = defineStore("userState", {
  state: () => ({
    user: null,
    error: null,
  }),

  actions: {
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
});
