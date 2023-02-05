import axios from "axios";
import { createContext, useState } from "react";
import swal from "sweetalert";

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
          wrapper.innerHTML = `<p>New user created by <span class="text-success fw-bold">${res.data.email}</span> this email!</p> `;
          swal({
            // text: `New user created by "${res.data.email}" this email!`,
            content: wrapper,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
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
          console.log(res.data, "got OTP code!");
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

  return (
    <UserContext.Provider
      value={{
        createUser,
        signIn,
        isLoading,
        setIsLoading,
        openOtp,
        setOpenOtp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
