import axios from "axios";
import { createContext, useState } from "react";
import swal from "sweetalert";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [email, setEmail] = useState("");
  console.log(email, "email gotten!");

  const createUser = async (email, password, confirmpassword) => {
    await axios
      .post("https://sysonex-admin-testing.onrender.com/signup", {
        email,
        password,
        confirmpassword,
      })
      .then((res) => {
        if (res.status === 200) {
          setEmail(res.data.email);
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
      });
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
