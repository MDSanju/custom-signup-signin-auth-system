import React, { useContext, useState } from "react";
import Registration from "./Registration";
import ScaleLoader from "react-spinners/ScaleLoader";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Otp from "./Otp";
import "./Login.css";

const Login = () => {
  const userContext = useContext(UserContext);
  const { signIn, isLoading, openOtp, setOpenOtp, authentication } =
    userContext;

  const [signUpMode, setSignUpMode] = useState("");

  const navigate = useNavigate();

  const handleSignInUpPopUp = () => {
    if (signUpMode) {
      setSignUpMode(false);
    } else {
      setSignUpMode(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password);
  };

  const t = localStorage.getItem("tokenSigninSignupAuth");
  const handleJwtAuth = () => {
    if (t) {
      authentication(t);
    }
    navigate("/dashboard");
  };

  return (
    <div className="login_reg_body">
      <Otp smShow={openOtp} setSmShow={setOpenOtp} />
      <div
        className={
          !signUpMode ? "main_container" : "sign-up-mode main_container"
        }
      >
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={handleLogin}>
              <h2 className="signin_title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" name="email" placeholder="Email" required />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              {/* {authError && (
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              )} */}
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ScaleLoader color={"#003665"} />
                </div>
              ) : (
                <>
                  {t ? (
                    <button
                      type="button"
                      onClick={handleJwtAuth}
                      style={{ width: "196px" }}
                      className="common_btn solid"
                    >
                      Authentication
                    </button>
                  ) : (
                    <input
                      type="submit"
                      // onClick={notify}
                      value="Login"
                      className="common_btn solid"
                    />
                  )}
                </>
              )}
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            <Registration />
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="form_content">
              <h3 style={{ margin: "0" }}>New here ?</h3>
              <p style={{ margin: "0" }}>
                You don't have any account? Please Sign-Up with a new gmail
                account and password.
              </p>
              <button
                className="common_btn transparent mx-1"
                onClick={handleSignInUpPopUp}
                id="sign-up-btn"
              >
                Sign up
              </button>
              <button
                className="common_btn transparent mx-1"
                onClick={() => navigate("/")}
                id="sign-up-btn"
              >
                Home
              </button>
            </div>
            <img src="./log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="form_content">
              <h3 style={{ margin: "0" }}>One of us ?</h3>
              <p style={{ margin: "0" }}>
                You already have an account? Please Sign-In with your authorized
                email and password.
              </p>
              <button
                className="common_btn transparent mx-1"
                onClick={handleSignInUpPopUp}
                id="sign-in-btn"
              >
                Sign in
              </button>
              <button
                className="common_btn transparent mx-1"
                onClick={() => navigate("/")}
                id="sign-up-btn"
              >
                Home
              </button>
            </div>
            <img src="./register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
