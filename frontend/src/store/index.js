// store/index.js
import {createStore} from "vuex";

export default createStore({
    state: {
        posts: [],
        isAuthenticated: false,
        user: null,
        jwtToken: null,
        userName: '', // Add property to store user's name
        profilePictureUrl: '' // Add property to store profile picture URL

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
        authenticateUser: (state, {user, jwtToken}) => {
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
        setUserProfile(state, {userName, profilePictureUrl}) {
            state.userName = userName;
            state.profilePictureUrl = profilePictureUrl;
        }
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
        authenticateUserAct: (act, {user, jwtToken}) => {
            act.commit("authenticateUser", {user, jwtToken});
        },
        logoutAct: (act) => {
            act.commit("logout");
        },
        async login({commit, dispatch}, credentials) { // Add 'dispatch' to the arguments
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

                    // Fetch user profile data to update username and profile picture
                    await dispatch('fetchUserProfile');

                    // Optionally, you can navigate to a different route after login
                    // router.push('/dashboard'); // Replace with your route
                } else {
                    // Authentication failed, handle error (e.g., show error message)
                    console.error("Login failed:", data.error);
                }
            } catch (error) {
                console.error("An error occurred during login:", error);
            }
        },

        async fetchUserProfile({commit}) {
            try {
                const response = await fetch('/api/userProfile');
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const userProfile = await response.json();
                commit('setUserProfile', {
                    userName: userProfile.name,
                    profilePictureUrl: userProfile.profilePictureUrl
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        user: (state) => state.user,
        jwtToken: (state) => state.jwtToken,
        userName: (state) => state.userName,
        profilePictureUrl: (state) => state.profilePictureUrl
    },
    modules: {},
});
