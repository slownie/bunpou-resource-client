import { ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router";

export const useUserStore = defineStore("userState", () => {
  // State Variables
  const email = ref(null);
  const userID = ref(null);
  const learnedSentences = ref(null);
  const srsDone = ref(false);
  const error = ref(null);
  const loading = ref(false);

  if (localStorage.getItem("user") !== null) {
    let localObject = JSON.parse(localStorage.getItem("user"));
    email.value = localObject.email;
    userID.value = localObject.userID;
    learnedSentences.value = localObject.learnedSentences;
    srsDone.value = localObject.srsDone;
  }

  // Auth Actions
  async function signup(email, password) {
    this.error = null;
    this.loading = true;
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
      /** JSON Format
       * {
       *  email: ""
       *  learnedSentences: []
       *  srsDone: false
       *  etc
       * }
       */
      this.email = json.email;
      this.userID = json.userID;
      this.learnedSentences = json.learnedSentences;
      this.srsDone = json.srsDone;

      this.loading = false;

      const saveData = {
        email: json.email,
        token: json.token,
        userID: json.userID,
        learnedSentences: json.learnedSentences,
        srsDone: json.srsDone,
      };
      localStorage.setItem("user", JSON.stringify(saveData));
      router.go();
    }
  }

  async function login(email, password) {
    this.error = null;
    this.loading = true;
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
      this.email = json.email;
      this.userID = json.userID;
      this.learnedSentences = json.learnedSentences;
      this.srsDone = json.srsDone;

      this.loading = false;

      const saveData = {
        email: json.email,
        token: json.token,
        userID: json.userID,
        learnedSentences: json.learnedSentences,
        srsDone: json.srsDone,
      };
      localStorage.setItem("user", JSON.stringify(saveData));
      router.go();
    }
  }

  async function logout() {
    this.email = null;
    this.userID = null;
    this.learnedSentences = null;
    this.srsDone = null;
    localStorage.removeItem("user");
    router.go("/");
  }

  // Data Actions
  async function addSentence(sentenceObject) {
    const sendUserID = userID.value;
    this.error = null;
    const res = await fetch(
      "https://bunpou-resource-server.vercel.app/api/users/addSentence",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: sendUserID,
          sentenceObject: sentenceObject,
        }),
      }
    );
    const json = await res.json();
    if (!res.ok) {
      this.error = json.error;
    }

    if (res.ok) {
      this.error = json.message;
      learnedSentences.value.push(sentenceObject);

      const saveData = JSON.parse(localStorage.getItem("user"));
      saveData.learnedSentences.push(sentenceObject);
      console.log(saveData.learnedSentences);
      console.log(saveData);

      this.learnedSentences = saveData.learnedSentences;
      localStorage.setItem("user", JSON.stringify(saveData));
    }
  }

  async function removeSentence(sentenceObject) {}

  async function changeSRS(srsValue) {
    this.error = null;
    const res = await fetch(
      "https://bunpou-resource-server.vercel.app/api/users/changeSRS",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, srsValue }),
      }
    );
    const json = await res.json();

    if (!res.ok) {
      this.error = json.error;
    }

    if (res.ok) {
      this.error = json.message;
      this.srsDone = srsValue;
    }
  }

  return {
    email,
    userID,
    learnedSentences,
    srsDone,
    error,
    loading,
    signup,
    login,
    logout,
    addSentence,
    changeSRS,
  };
});
