import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ScaleLoader from "react-spinners/ScaleLoader";
import swal from "sweetalert";

const Registration = () => {
  const userContext = useContext(UserContext);
  const { createUser, isLoading } = userContext;

  const handleCreateUser = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmpassword = e.target.confirmpassword.value;

    if (password === confirmpassword) {
      createUser(email, password, confirmpassword);
    } else {
      return swal({
        title: "Attention",
        text: "Use the same password for both of field to proceed!",
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleCreateUser}>
      <h2 className="signUp_title">Sign up</h2>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input type="email" name="email" placeholder="Email" required />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder="New password"
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="confirmpassword"
          placeholder="Re-type new password"
          required
        />
      </div>
      {/* {regError && (
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
        <input
          type="submit"
          //   onClick={notify}
          className="common_btn"
          value="Sign up"
        />
      )}
      <p className="social-text">Or Sign up with social platforms</p>
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
  );
};

export default Registration;
