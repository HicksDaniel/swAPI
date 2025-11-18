export function RenderLogin() {
  return `<div class="app-container">
      <!-- Loading State -->
      <div id="loading" class="loading-state">
      <div class="loading-text">Loading...?</div>
      </div>
      
      <!-- Error State -->
      <div id="error" class="error-state" style="display: none">
      <div class="error-title">Oops!</div>
      <div class="error-message">Something went wrong</div>
      <div id="error-details" class="error-sub-message"></div>
      </div>

      <!-- Main Content -->
      <div id="app" class="main-card-wrapper" style="display: none">
      <img
      src="https://cdn.auth0.com/quantum-assets/dist/latest/logos/auth0/auth0-lockup-en-ondark.png"
      alt="Auth0 Logo"
      class="auth0-logo"
      />
      <h1 class="main-title">Welcome to SWAPI Test
        <p class="action-text">Get started by signing in to your account</p>
          <button id="login-btn" class="button login">Log In</button>
          </div>

          <!-- Logged In State -->
        <div id="logged-in" class="logged-in-section" style="display: none">
        <div class="logged-in-message">✅ Successfully authenticated!</div>
          <h2 class="profile-section-title">Your Profile</h2>
          <div id="profile" class="profile-card"></div>
          <button id="logout-btn" class="button logout">Log Out</button>
          </div>
          </div>
          </div>`;
}
