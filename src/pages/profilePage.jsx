import { useEffect, useState, useContext } from "react";

import ModifyProfile from "../components/profile/profileModify";
import ProfilHeader from "../components/profile/profileHeader";

import AuthContext from "../store/auth-context";

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/${authCtx.userId}`, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
        setIsDataLoading(false);
      });
  }, []);

  return isDataLoading ? (
    <div></div>
  ) : (
    <ProfilHeader userData={userData} setUserData={setUserData} />
  );
};

export default ProfilePage;
