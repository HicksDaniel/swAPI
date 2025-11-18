import { createAuth0Client } from "@auth0/auth0-spa-js";

// DOM elements
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const errorDetails = document.getElementById("error-details");
const app = document.getElementById("app");
const loggedOutSection = document.getElementById("logged-out");
const loggedInSection = document.getElementById("logged-in");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const profileContainer = document.getElementById("profile");

// Initialize Auth0 client
let auth0Client: any;
export async function initAuth0() {
  try {
    auth0Client = await createAuth0Client({
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: "https://localhost:3000",
      },
    });

    // Check if user is returning from login
    if (
      window.location.search.includes("code=") &&
      window.location.search.includes("state=")
    ) {
      await handleRedirectCallback(auth0Client);
    }
    return auth0Client;
  } catch (err) {
    console.error(err.message);
  }
}

// Handle redirect callback
async function handleRedirectCallback(auth0Client: any) {
  try {
    await auth0Client.handleRedirectCallback();
    // Clean up the URL to remove query parameters
    window.history.replaceState({}, document.title, window.location.pathname);
  } catch (err) {
    console.error(err.message);
  }
}

export async function login() {
  await auth0Client.loginWithRedirect();
}
