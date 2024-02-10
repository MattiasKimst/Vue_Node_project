// store/index.js
import { createStore } from "vuex";

export default createStore({
    state: {
        posts: [],
        isAuthenticated: false,
        user: null,
        jwtToken: null,
    },
    mutations: {
        resetAllLikes: (state) => {
            state.posts.forEach((post) => {
                post.likes = 0;
            });
        },
        addLikeToPost: (state, args) => {
            state.posts.forEach(post => {
                if (post.id === args.postIndex) post.likes++;
            });
        },
        setPosts: (state, args) => {
            state.posts = args.posts;
        },
        authenticateUser: (state, { user, jwtToken }) => {
            state.isAuthenticated = true;
            state.user = user;
            state.jwtToken = jwtToken;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.jwtToken = null;
        },
        setUser(state, user) {
            state.user = user;
            state.isAuthenticated = true;
        },
    },
    actions: {
        addLikeToPostAct: (act, args) => {
            act.commit("addLikeToPost", args);
        },
        resetAllLikesAct: (act) => {
            act.commit("resetAllLikes");
        },
        setPostsAct: (act, args) => {
            act.commit("setPosts", args);
        },
        authenticateUserAct: (act, { user, jwtToken }) => {
            act.commit("authenticateUser", { user, jwtToken });
        },
        logoutAct: (act) => {
            act.commit("logout");
        },
        async login({ commit }, credentials) {
            try {
                // Make API request to authenticate the user
                // Example: replace with your actual API endpoint
                const response = await fetch("http://localhost:3000/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                });

                const data = await response.json();

                if (response.ok) {
                    // Authentication successful, commit mutation to update state
                    commit("authenticateUser", {user: data.user_id, jwtToken: null}); // Replace with your mutation
                } else {
                    // Authentication failed, handle error (e.g., show error message)
                    console.error("Login failed:", data.error);
                }
            } catch (error) {
                console.error("An error occurred during login:", error);
            }
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        user: (state) => state.user,
        jwtToken: (state) => state.jwtToken,
    },
    modules: {},
});
