import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import AuthFailureView from "@/views/AuthFailureView.vue";
import NotFound from "@/views/NotFound.vue";

import { useUserStore } from "../stores/UserStore";
import TestPractice from "@/views/TestPractice.vue";

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
        if (userStore.user) {
          return "/home";
        }
      },
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

    // Only used for testing, comment this out on full release
    {
      path: "/grammarlist/test",
      component: () => import("@/views/TestView.vue"),
    },

    // Practice Views, requires Auth
    {
      path: "/home/srs",
      component: () => import("@/views/practice/SRSPracticeView.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/home/worksheet",
      component: () => import("@/views/practice/WorksheetPracticeView.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/home/jlpt",
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
      path: "/test",
      name: "Test",
      component: TestPractice
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
  if (to.meta.requiresAuth && !userStore.user) {
    return "/authfailure";
  }
});
export default router;
