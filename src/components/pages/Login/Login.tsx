import React, { useState } from "react";
import Registration from "./Registration";
import "./Login.css";

const Login = () => {
  const [signUpMode, setSignUpMode] = useState(Boolean);

  const handleSignInUpPopUp = () => {
    if (signUpMode) {
      setSignUpMode(false);
    } else {
      setSignUpMode(true);
    }
  };
  return (
    <div className="login_reg_body">
      <div
        className={
          !signUpMode ? "main_container" : "sign-up-mode main_container"
        }
      >
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form">
              <h2 className="signin_title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  //   {...register("email")}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  //   {...register("password")}
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
              )}
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "38px",
                  }}
                >
                  <ScaleLoader color={"#003665"} size={85} />
                </div>
              ) : (
                <input
                  type="submit"
                  onClick={notify}
                  value="Login"
                  className="common_btn solid"
                />
              )} */}
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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
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
                // onClick={handleGoBackHome}
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
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
                // onClick={handleGoBackHome}
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
