import { useState } from "react";
import { signUp } from "../services/apiService";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await signUp(email, password, username);
      navigate("/login");
    } catch (error) {
      setError("Error signing up");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>

      <div className="w-full max-w-md">
        <input
          type="text"
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignUp}
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
        >
          Sign Up
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <p className="mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
