import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import AddUserModal from "../components/UserAddModal";
import EditUserModal from "../components/UserEditModal";
import DeleteUserModal from "../components/UserDeleteModal";
import PageHeader from "../components/PageHeader";
import {
  fetchUsersApi,
  addUserApi,
  editUserApi,
  deleteUserApi,
} from "../services/AdminApi";
import "../stylesheets/AdminUsersPage.css";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  const loadUsers = async () => {
    const data = await fetchUsersApi();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (user?.role !== "admin") {
    return <h2>Access Denied</h2>;
  } else {
    document.querySelector(".page-title").classList.add("admin");
  }

  return (
    <>
      <PageHeader title={"Admin Panel"} />
      <div className="admin-users-container">
        <h2>All Users</h2>
        <button onClick={() => setIsAddModalOpen(true)}>Add New User</button>

        <div className="user-cards">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
              <div className="user-actions">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {isAddModalOpen && (
          <AddUserModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={async (newUser) => {
              await addUserApi(newUser);
              setIsAddModalOpen(false);
              loadUsers();
            }}
          />
        )}

        {isEditModalOpen && selectedUser && (
          <EditUserModal
            user={selectedUser}
            onClose={() => setIsEditModalOpen(false)}
            onSave={async (updatedUser) => {
              await editUserApi(updatedUser);
              setIsEditModalOpen(false);
              loadUsers();
            }}
          />
        )}

        {isDeleteModalOpen && selectedUser && (
          <DeleteUserModal
            user={selectedUser}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={async () => {
              await deleteUserApi(selectedUser._id);
              setIsDeleteModalOpen(false);
              loadUsers();
            }}
          />
        )}
      </div>
    </>
  );
};

export default AdminUsersPage;
