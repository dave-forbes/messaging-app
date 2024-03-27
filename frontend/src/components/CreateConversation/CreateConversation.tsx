import { useState, useEffect } from "react";
import { UserI, useAuth } from "../../contexts/AuthContext";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import styles from "./CreateConversation.module.scss";

export default function CreateConversation() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<[] | any>([]);
  const [users, setUsers] = useState<UserI[]>([]);
  const animatedComponents = makeAnimated();

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/`, {
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
      const options = data.map((item: any) => ({
        value: item._id,
        label: item.username,
      }));
      setUsers(options);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Logic to submit conversation data
    console.log("Title:", title);
    console.log("Selected users:", selectedUsers);

    const participants = selectedUsers.map((item: any) => item.value);

    const formData = {
      title: title,
      participants: participants,
    };
    try {
      const response = await fetch(
        "http://localhost:3000/conversations/create",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          referrerPolicy: "no-referrer",
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(`${response.status}: ${data.message}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }

    // Reset form fields after submission if needed
    setTitle("");
    setSelectedUsers([]);
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
            options={users}
            onChange={
              (selectedOptions) => setSelectedUsers(selectedOptions || []) // Handle null case
            }
          />
        </div>
        <button type="submit">Create Conversation</button>
      </form>
    </div>
  );
}
