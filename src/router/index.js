import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import AuthFailureView from "@/views/AuthFailureView.vue";
import NotFound from "@/views/NotFound.vue";

import { useUserStore } from "../stores/UserStore";
import TestView from "@/views/TestView.vue";

// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
// https://stackoverflow.com/questions/65588580/how-to-change-component-rendered-by-router-on-state-change-in-vue

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home/Auth Views
    {
      path: "/",
      name: "Auth",
      component: AuthView,

      // Prevent access if already logged in
      beforeEnter: () => {
        const userStore = useUserStore();
        if (userStore.userID) {
          return "/home";
        }
      },
    },

    {
      path: "/test/:id",
      name: "Test",
      component: TestView
    },

    {
      path: "/home",
      name: "Home",
      component: HomeView,
      meta: { requiresAuth: true },
    },

    // Grammar Points
    {
      path: "/grammarlist",
      name: "grammarlist",
      component: () => import("@/views/GrammarListView.vue"),
    },

    {
      path: "/grammarlist/:id",
      component: () => import("@/views/PointView.vue"),
      props: (route) => ({ id: parseInt(route.params.id) }),
    },

    // Practice Views, requires Auth
    {
      path: "/home/srs",
      component: () => import("@/views/practice/SRSPracticeView.vue"),
      meta: { requiresAuth: true },
    },

    // {
    //   path: "/home/worksheet",
    //   component: () => import("@/views/practice/WorksheetPracticeView.vue"),
    //   meta: { requiresAuth: true },
    // },

    {
      path: "/home/jlpt/:id",
      component: () => import("@/views/practice/JLPTPracticeView.vue"),
      meta: { requiresAuth: true },
    },

    // Using dynamic imports creates a delay that may be confusing to the user
    // Neither of these components are demanding nor need a lot of space so they are loaded normally
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },

    {
      path: "/authfailure",
      name: "AuthFailure",
      component: AuthFailureView,
    },
  ],
});

// Auth Guard
router.beforeEach((to) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.userID) {
    return "/authfailure";
  }
});
export default router;
