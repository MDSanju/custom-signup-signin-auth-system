import axios from "axios";
import { createContext, useState } from "react";
import swal from "sweetalert";
import emailjs from "emailjs-com";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  console.log(email, "email gotten!");

  const createUser = async (email, password, confirmpassword) => {
    setIsLoading(true);
    await axios
      .post("https://sysonex-admin-testing.onrender.com/signup", {
        email,
        password,
        confirmpassword,
      })
      .then((res) => {
        if (res.status === 200) {
          setEmail(res.data.email);
          const wrapper = document.createElement("div");
          wrapper.innerHTML = `<p class="mt-5">New user created by <span class="text-success fw-bold">${res.data.email}</span> this email!</p> `;
          swal({
            // text: `New user created by "${res.data.email}" this email!`,
            content: wrapper,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          localStorage.removeItem("tokenSigninSignupAuth");
        }
      })
      .catch((error) => {
        swal({
          title: "Attention",
          text: "This email already has been taken!",
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signIn = async (email, password) => {
    setIsLoading(true);
    await axios
      .post("https://sysonex-admin-testing.onrender.com/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("tokenSigninSignupAuth");
          console.log(res.data, "got OTP code!");
          localStorage.setItem("theOTPToken", res.data);

          // OTP Sending
          const j = localStorage.getItem("theOTPToken");
          console.log(j, "what is the jwt");

          emailjs
            .send(
              "service_token_otp",
              "template_token_otp_k",
              {
                token: j,
                email: email,
              },
              "user_MEvTZqLHfa5kkhyZOup8N"
            )
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.log(error.text);
              }
            );

          swal({
            text: `Please check your email to get the OTP code!`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          }).then((willDelete) => {
            if (willDelete) {
              setOpenOtp(true);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.response.status, "error");
        if (error.response.status === 500) {
          swal({
            title: "Attention",
            text: "Incorrect password!",
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        } else if (error.response.status === 400) {
          swal({
            title: "Attention",
            text: "Email does not exist!",
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const otpVerification = async (token) => {
    await axios
      .post("https://sysonex-admin-testing.onrender.com/login/t", {
        token,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("theOTPToken");
          localStorage.setItem("tokenSigninSignupAuth", res.data);
          setOpenOtp(false);
          swal({
            text: `OTP verified successfully!`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
        }
      })
      .catch((error) => {
        setOpenOtp(false);
        swal({
          title: "Attention",
          text: "Token is invalid!",
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      })
      .finally(() => {
        // console.log("finally");
      });
  };

  const authentication = async (token) => {
    await axios
      .post(
        "https://sysonex-admin-testing.onrender.com/auth",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          swal({
            text: `You are authenticated!`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          }).then((willDelete) => {
            if (willDelete) {
              localStorage.removeItem("tokenSigninSignupAuth");
            }
          });
        }
      })
      .catch((error) => {
        swal({
          title: "Attention",
          text: "Invalid token!",
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      })
      .finally(() => {
        // console.log("finally");
      });
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        signIn,
        isLoading,
        setIsLoading,
        openOtp,
        setOpenOtp,
        otpVerification,
        authentication,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
