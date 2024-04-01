import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import styles from "./CreateConversation.module.scss";
import { useNavbar } from "../../contexts/NavbarContext";
import { useConversation } from "../../contexts/ConversationContext";
import { UserI } from "../../interfaces/interfaces";
import API_URL from "../../utils/apiConfig";

export default function CreateConversation() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<[] | any>([]);
  const [users, setUsers] = useState<{ value: string; label: string }[]>([]);
  const animatedComponents = makeAnimated();
  const { setIsCreateConversationOpen } = useNavbar();
  const { setCurrentConversation } = useConversation();
  const [error, setError] = useState("");

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users/`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        referrerPolicy: "no-referrer",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`, // Include JWT token in the Authorization header
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      const options = data.map((user: UserI) => ({
        value: user._id,
        label: user.username,
      }));
      setUsers(options);
    } catch (error: any) {
      setError(error.toString());
    }
  };

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const participants = selectedUsers.map(
      (selectedUser: any) => selectedUser.value
    );
    participants.push(user?._id);

    const formData = {
      title,
      participants,
    };

    try {
      const response = await fetch(`${API_URL}/conversations/create`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Network error: Unable to connect to the server.");
        }
        const data = await response.json();
        throw new Error(`${response.status}: ${data.message}`);
      }
      const data = await response.json();

      setTitle("");
      setSelectedUsers([]);
      setIsCreateConversationOpen(false);
      setCurrentConversation(data.conversation);
      setError("");
    } catch (error: any) {
      setError(error.toString());
    }
  };

  return (
    <div className={styles.createConversationContainer}>
      <h2>Create Conversation</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Select Users:</label>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={users.filter((item) => item.value !== user?._id)}
            onChange={
              (selectedOptions) => setSelectedUsers(selectedOptions || []) // Handle null case
            }
            required
          />
        </div>
        <button type="submit">Create Conversation</button>
        <button onClick={() => setIsCreateConversationOpen(false)}>
          Close
        </button>
        <p>{error}</p>
      </form>
    </div>
  );
}
