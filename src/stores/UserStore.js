import { defineStore } from "pinia";
import { ref } from "vue";
import router from "@/router";

export const useUserStore = defineStore("userState", () => {
  // State Variables
  const user = ref(null);
  if (localStorage.getItem("user") !== undefined) {
    user.value = localStorage.getItem("user");
  }
  const error = ref(null);

  // Auth Actions
  async function signup(email, password) {
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
      localStorage.setItem("user", JSON.stringify(json));
      router.go();
    }
  }

  async function login(email, password) {
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
      localStorage.setItem("user", JSON.stringify(json));
      router.go();
    }
  }

  async function logout() {
    this.user = null;
    localStorage.removeItem("user");
    router.go("/");
  }

  // Data Actions
  async function addSentence(sentenceObject) {
    const userID = this.user._id;
    try {
      const res = await fetch(
        "https://bunpou-resource-server.vercel.app/api/users/addSentence",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userID, sentenceObject }),
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

  async function removeSentence(sentenceObject) {}

  return { user, error, signup, login, logout, addSentence };
});
