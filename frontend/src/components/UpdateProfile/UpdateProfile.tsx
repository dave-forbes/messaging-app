import { FormEvent, useState } from "react";
import styles from "./UpdateProfile.module.scss";

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    bio: "",
    avatar: null, // New field to store the uploaded avatar
  });
  const [error, setError] = useState("");

  const { username, password, confirmPassword, bio } = formData;

  const handleChange = (e: any) => {
    if (e.target.name === "avatar") {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      setError("");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className={styles.updateProfileContainer}>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit} className={styles.updateForm}>
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
        <div className={styles.inputGroup}>
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
        </div>
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
        <button className="button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
