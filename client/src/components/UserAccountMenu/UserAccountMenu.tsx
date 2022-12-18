import React, { useContext, useState } from "react"
import { AuthContext } from "../../contexts/userContext";
import './userAccountMenu.css';
const UserAccountMenu = () => {
  const [active, setActive] = useState(false);
  const {state: {loginUser}} = useContext(AuthContext);
  return (
    <div className={`navigation ${active ? 'active': ''}`}>
        <div className="user-box" onClick={() => setActive(!active)}>
          <div className="image-box">
            <i className={"fa fa-user"}></i> <span><strong>{loginUser.fName}</strong></span>
          </div>
        </div>
        <ul className={`menu ${active ? 'active' : 'hide'}`}>
          <li><a href="#"><i className="fa fa-user"></i>Profile</a></li>
          <li><a href="#"><i className="fa fa-message"></i>Messages</a></li>
          <li><a href="#"><i className="fa fa-notification"></i>Notification</a></li>
          <li><a href="#"><i className="fa fa-settings"></i>Settings</a></li>
          <li><a href="#"><i className="fa fa-logout"></i>Logout</a></li>
      </ul>
    </div>
  )
}
export default UserAccountMenu;