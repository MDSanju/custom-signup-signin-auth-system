import axios from "axios";
import { createContext, useState } from "react";
import swal from "sweetalert";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <UserContext.Provider
      value={{
        createUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
