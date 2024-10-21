
function App() {
  const handleLogin = () => {

    const width = 600;
    const height = 700;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const popup = window.open(
      "http://localhost:3002/auth/google",
      "Google Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const timer = setInterval(() => {
      if (popup?.closed) {
        clearInterval(timer);
        // Optionally check if user is logged in or perform any actions after closing popup
        console.log("Popup closed");
        // Here you could check if the user is authenticated by making an API call
      }
    }, 1000);
  };

  const handleProtected = () => {
    const checkAuthStatus = async () => {
      const response = await fetch(
        "http://localhost:3002/protected",
        {
          method: "GET",
          credentials: "include", // Important for sending cookies
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User is authenticated:", data);
        alert("User is authenticated");
        // Handle authenticated user data here
      } else {
        console.log("User is not authenticated");
        alert("User is not authenticated");
      }
    };

    // Call this function after redirection from Google login
    checkAuthStatus();
  };

 const handleLogout= ()=>{
  fetch("http://localhost:3002/logout", {
      method: "GET",
      credentials: "include", // Important for sending cookies
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful logout
          console.log("User logged out successfully");
          alert("User logged out successfully");
          // Redirect to the home page or perform any other actions
        } else {
          // Handle logout failure
          console.log("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
 }

  return (
    <>
    <title> Home Page</title>
      <h1 style={{ marginTop: "10rem", marginLeft: "10rem" }}>Atta boy</h1>
      <button
        style={{
          marginTop: "10rem",
          background: "#32CD32",
          marginLeft: "10rem",
          fontSize: "4rem",
          padding: "1rem",
        }}
        onClick={() => handleLogin()}
      >
        {" "}
        Auth
      </button>

      <button
        style={{ marginTop: "10rem", marginLeft: "10rem" }}
        onClick={() => handleProtected()}
      >
        {" "}
        Protected Route
      </button>
      <button
        style={{ marginTop: "10rem", marginLeft: "10rem" }}
        onClick={() => handleLogout()}
      >
        {" "}
        Logout User
      </button>
    </>
  );
}

export default App;
