// @ts-nocheck
import { useState } from "react";
import "./App.scss";

function UserCard({ user, handleDeleteUser, handleEditUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleValues = (target) => {
    setEditedUser((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    handleEditUser(user, editedUser);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <img src={editedUser.avatar} width="50px" height="100px" />
        {!isEditing ? (
          <p>
            <strong>{editedUser.firstName} </strong>{" "}
            <strong> {editedUser.lastName} </strong>
          </p>
        ) : (
          <div>
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName}
              onChange={(event) => handleValues(event.target)}
            />
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName}
              onChange={(event) => handleValues(event.target)}
            />
          </div>
        )}
      </div>
      <div className="card-info">
        <p>
          Phone number: <strong>{editedUser.phoneNumber}</strong>
        </p>
        <p>
          City: <strong> {editedUser.city} </strong>
        </p>
      </div>
      <div className="card-buttons">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => handleDeleteUser(user)}>Delete</button>
            <button onClick={handleEditClick}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    phoneNumber: "",
    city: "",
  });
  const [users, setUsers] = useState([]);

  const handleValues = (target) =>
    setUser((prev) => {
      return { ...prev, [target.name]: target.value };
    });

  const handleAddUser = (user) => {
    setUsers((prev) => [...prev, user]);
    setUser({
      firstName: "",
      lastName: "",
      avatar: "",
      phoneNumber: "",
      city: "",
    });
  };

  const handleDeleteUser = (userToDelete) => {
    setUsers((prev) => prev.filter((user) => user !== userToDelete));
  };

  const handleEditUser = (userToEdit, editedUser) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user === userToEdit) {
          return editedUser;
        }
        return user;
      })
    );
  };


  return (
    <>
      <div>
        <div className="input-container">
          <label>Enter your Photo URL</label>
          <input
            name="avatar"
            placeholder="...Photo"
            value={user.avatar}
            onChange={(event) => handleValues(event.target)}
          />
        </div>
        <div className="input-container">
          <label>Enter your First Name</label>
          <input
            placeholder="...John"
            name="firstName"
            value={user.firstName}
            onChange={(e) => handleValues(e.target)}
          />
        </div>
        <div className="input-container">
          <label>Enter your Last Name</label>
          <input
            placeholder="...Doe"
            name="lastName"
            value={user.lastName}
            onChange={(e) => handleValues(e.target)}
          />
        </div>
        <div className="input-container">
          <label>Enter your Phone number</label>
          <input
            placeholder="+995 555 123 456"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={(e) => handleValues(e.target)}
          />
        </div>
        <div className="input-container">
          <label>Enter your City</label>
          <input
            placeholder="...Tbilisi"
            name="city"
            value={user.city}
            onChange={(e) => handleValues(e.target)}
          />
        </div>
        <button onClick={() => handleAddUser(user)}>Add user</button>
      </div>
      <div className="flex-wrap">
        {users.map((user) => (
          <UserCard
            key={user.firstName + user.lastName}
            user={user}
            handleDeleteUser={handleDeleteUser}
          />
        ))}
      </div>
    </>
  );
}

export default App;
