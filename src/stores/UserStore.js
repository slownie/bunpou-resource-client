import { defineStore } from "pinia";
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (res.ok) {
        const user = await res.json();
        this.user = user;
        window.location.reload();
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
