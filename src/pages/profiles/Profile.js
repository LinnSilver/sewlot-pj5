import React from "react";
import styles from "../styles/Profile.module.css";
import btnStyles from "../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { profile, mobile } = props;
  const { id, following_id, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow } = useSetProfileData();

  return (
    <div className={`${styles.Profile} ${mobile ? styles.MobileProfile : ""}`}>
      <div className={styles.Info}>
        <Link className={styles.OwnerLink} to={`/profiles/${id}`}>
          <strong>{owner}</strong>
        </Link>
        {!mobile && currentUser && !is_owner && (
          <div className={styles.Buttons}>
            {following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => {}}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
