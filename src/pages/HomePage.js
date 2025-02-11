import React /*,{ useContext }*/ from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import "../stylesheets/HomePage.css";
// import { UserContext } from "../context/UserContext";

const HomePage = () => {
  // const { user } = useContext(UserContext);
  return (
    <div className={"homepage-container "}>
      <PageHeader title={"Classroom Management Software"} />
      <main className="homepage-main">
        <div className="card-container">
          <Link to="/notes" className="card">
            <h2>Notes</h2>

            <p>Manage your classroom notes efficiently.</p>
          </Link>

          <Link to="/tasks" className="card">
            <h2>To-Do List</h2>

            <p>Organize tasks for better productivity.</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
