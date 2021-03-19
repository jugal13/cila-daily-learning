const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "login", component: () => import("pages/Login.vue") },
      { path: "register", component: () => import("pages/Register.vue") },
      {
        path: "secret",
        component: () => import("pages/Secret.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
