import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/userContext";
import LoginForm from "./LoginForm"

const Login: React.FC = () => {
  const [loginFormOpen, setLoginFormOpen] = useState(true);
  const {state: { isLoggedIn}} = useContext(AuthContext);
  const navigate = useNavigate();
  if (isLoggedIn) {
    navigate("/");
  }
  const onHideLoginForm = () => {
    setLoginFormOpen(!loginFormOpen)
  }
  return <LoginForm loginFormOpen={true} onHideLoginForm={onHideLoginForm} />
}
export default Login;