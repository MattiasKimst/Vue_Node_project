import { createRouter, createWebHashHistory } from "vue-router";
import MainView from "../views/MainView";
import SignupView from "../views/SignupView";
import LoginView from "../views/LoginView";
import AddPostView from "../views/AddPostView";
import ContactUsView from "../views/ContactUsView";
import UpdatePostView from "../views/UpdatePostView.vue";
import store from "../store"; // Import your Vuex store

const authGuard = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        // Redirect to login if not authenticated
        next("/login");
    } else {
        next();
    }
};

const routes = [
    {
        path: "/",
        name: "main",
        component: MainView,
        beforeEnter: authGuard,
    },
    {
        path: "/signup",
        name: "signup",
        component: SignupView,
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/addpost",
        name: "add-post",
        component: AddPostView,
        beforeEnter: authGuard,
    },
    {
        path: "/contact",
        name: "contactus",
        component: ContactUsView,
    },
    {
        path: "/updatepost/:postId",
        name: "updatepost",
        component: UpdatePostView,
        beforeEnter: authGuard,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
