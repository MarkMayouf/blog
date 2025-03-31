import axios from "axios";
import {
  createContext,
  useEffect,
  useState
} from "react";

export const AuthContext = createContext()
//We gonna create a context provider ,why? because we gonna need our user informations in multuple compoenents 
//In NAVBAR ,Write page ,post page SO WE GONNA STORE OUR INFOMATION IN THIS CONTEXT 
//SO IF WE CREATE A CONTEXT PROVIDER AND WRAP THIS APP WITH THE PROVIDER 
//WE WILL BE ABLE TO USE THE USER STATE ANYWHERE IN OUR APP 
export const AuthContextProvider = ({
  children
}) => {
  //CHILDREN REPRESENT THE COMPONENT WE WANT TO WRAP WITH THIS CONTEXT PROVIDER 
  //iN THIS CASE IT WILL BE OUR APP COMPONENT 
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
  const login = async (inputs) => {
    try {
      const res = await axios.post("/auth/login",inputs)
      setCurrentUser(res.data)
    } catch (error) {
      console.error("Login failed:", error)
      // Optionally, set an error state to display to the user
    }
  }
  const logout = async () => {
    try {
      await axios.post("/auth/logout")
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser))
  }, [currentUser])
  return (
     <AuthContext.Provider value = {
      {
        currentUser,
        login,
        logout
      }
    } > {
      children
    } </AuthContext.Provider>
  )
}