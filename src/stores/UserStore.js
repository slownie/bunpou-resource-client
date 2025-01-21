import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore("userState", {
  state: () => ({
    user: null,
  }),

  actions: {
    async signup(email, password) {
      const res = await fetch(
        "https://bunpou-resource-server.vercel.app/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "true",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (res.ok) {
        const user = await res.json();
        this.user = user;
      }
    },

    async login(email, password) {
      const res = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "true",
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const user = await res.json();
        this.user = user;
      }
    },

    async logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
