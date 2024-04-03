import { FormEvent, useState } from "react";
import styles from "./UpdateProfile.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import apiFetch from "../../utils/apiFetch";
import API_URL from "../../utils/apiConfig";
import { useNavbar } from "../../contexts/NavbarContext";

export default function UpdateProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username,
    bio: user?.bio,
    avatar: null,
  });
  const [error, setError] = useState("");
  const { setIsProfileOpen, setIsUpdateProfileOpen } = useNavbar();

  const { username, bio } = formData;

  const handleChange = (e: any) => {
    if (e.target.name === "avatar") {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      if (formData.username) {
        formDataToSend.append("username", formData.username);
      }
      if (formData.bio) {
        formDataToSend.append("bio", formData.bio);
      }
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      await apiFetch(
        `${API_URL}/users/update/${user?._id}`,
        formDataToSend,
        user?.token,
        "PUT",
        false
      );
      setIsProfileOpen(true);
      setError("");
    } catch (error: any) {
      setError(error.toString());
    }
  };
  return (
    <div className={styles.updateProfileContainer}>
      <h1>Update Profile</h1>
      <form
        onSubmit={handleSubmit}
        className={styles.updateForm}
        encType="multipart/form-data"
      >
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className={styles.inputGroup}>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <p>{error}</p>
        <div className={styles.updateProfileControls}>
          <button className="button" type="submit">
            Update
          </button>
          <button
            className="button"
            onClick={() => setIsUpdateProfileOpen(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
