"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  task: string;
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async () => {
    if (!task.trim()) return;

    try {
      if (editId) {
        await fetch(`/api/projects/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task }),
        });

        setEditId("");
      } else {
        await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task }),
        });
      }

      setTask("");
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (project: Project) => {
    setTask(project.task);
    setEditId(project.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-center">Task Manager</h1>
     

      <input


        type="text"
        className="form-control"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <br />

      <button id="addbtn" onClick={handleSubmit}   >
        {editId ? "Update" : "Add"}
      </button>

      <hr style={{ margin: "20px 0" }} />

      {projects.length === 0 ? (
        <p>No Tasks Found</p>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            id="fetch-task"
          >
            <p style={{fontSize:"30px"}}><b>{project.task}</b></p>

            <button id="edit-btn" onClick={() => handleEdit(project)}>
              Edit
            </button>

            <button id="del-btn"
              onClick={() => handleDelete(project.id)}
              
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}