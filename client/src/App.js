import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
import { FaUndo } from "react-icons/fa";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";

import "./App.css";

function App() {
  const [task, setTask] = useState([]);
  const [edit, setEdit] = useState(null);
  const [data, setData] = useState({
    body: "",
    status: false,
  });
  const [editData, setEditData] = useState({
    id: null,
    body: "",
    status: false,
  });
  const getData = async () => {
    let res = await axios.get("http://localhost:8080/tasks");
    setTask(res.data);
  };
  const postData = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:8080/tasks", data);
    toast.success("Task Added !!!");
    setData({
      body: "",
      status: false,
    });
    getData();
  };
  const updateData = async () => {
    await axios.put(`http://localhost:8080/tasks/`, editData);
    toast.success("Changes Saved");
    setEdit(null);
    setEditData({
      id: null,
      body: "",
      status: false,
    });
    getData();
  };
  const updateStatus = async (data, status) => {
    await axios.put(`http://localhost:8080/tasks/`, {
      ...data,
      status: status,
    });
    toast.success(status ? "Marked as Completed." : "Undo Successfully.");
    getData();
  };
  const deleteData = async (id) => {
    await axios.delete(`http://localhost:8080/tasks/${id}`);
    toast.success("Task Deleted");
    getData();
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-8">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h4 className="text-center my-3 pb-3">To Do App</h4>
                  <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                    <div className="col-9">
                      <div data-mdb-input-init className="form-outline">
                        <input
                          type="text"
                          id="form1"
                          className="form-control"
                          placeholder=" Enter a task here"
                          value={data.body}
                          onChange={(e) => {
                            setData((o) => ({ ...o, body: e.target.value }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary"
                        onClick={(e) => postData(e)}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <table className="table mb-4">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Todo item</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {task.map((d, i) => (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>
                            {edit === d.id ? (
                              <input
                                type="text"
                                id="form1"
                                className="form-control"
                                placeholder=" Enter a task here"
                                value={editData.body}
                                onChange={(e) => {
                                  setEditData((o) => ({
                                    ...o,
                                    body: e.target.value,
                                  }));
                                }}
                              />
                            ) : (
                              <span
                                style={{
                                  textDecoration: d.status
                                    ? "line-through"
                                    : "none",
                                }}
                              >
                                {d.body}
                              </span>
                            )}
                          </td>
                          <td>{!d.status ? "In progress" : "Done"}</td>
                          <td>
                            {edit === d.id ? (
                              <IoIosCheckmarkCircleOutline
                                size={25}
                                className="text-success mx-2 cursor-pointer"
                                onClick={() => {
                                  updateData();
                                }}
                                data-tooltip-id="save"
                                data-tooltip-content="Save Changes"
                                data-tooltip-place="top"
                              />
                            ) : (
                              <FiEdit
                                size={25}
                                className="text-warning mx-2 cursor-pointer"
                                onClick={() => {
                                  setEditData({
                                    id: d.id,
                                    body: d.body,
                                    status: d.status,
                                  });
                                  setEdit(d.id);
                                }}
                                data-tooltip-id="edit"
                                data-tooltip-content="Edit Task"
                                data-tooltip-place="top"
                              />
                            )}
                            <RiDeleteBin6Line
                              size={25}
                              className="text-danger mx-2 cursor-pointer"
                              onClick={() => deleteData(d.id)}
                              data-tooltip-id="delete"
                              data-tooltip-content="Delete Task"
                              data-tooltip-place="top"
                            />
                            {d.status ? (
                              <FaUndo
                                size={25}
                                className="text-warning mx-2 cursor-pointer"
                                onClick={() => {
                                  updateStatus(d, false);
                                }}
                                data-tooltip-id="undo"
                                data-tooltip-content="Undo Changes"
                                data-tooltip-place="top"
                              />
                            ) : (
                              <IoCheckmarkDone
                                size={25}
                                className="text-success mx-2 cursor-pointer"
                                onClick={() => {
                                  updateStatus(d, true);
                                }}
                                data-tooltip-id="complete"
                                data-tooltip-content="Mark Completed"
                                data-tooltip-place="top"
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tooltip id="save" />
        <Tooltip id="edit" />
        <Tooltip id="undo" />
        <Tooltip id="delete" />
        <Tooltip id="complete" />
      </section>
    </>
  );
}

export default App;
