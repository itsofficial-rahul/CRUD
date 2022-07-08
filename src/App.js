import "./App.css";
import Pagination from "@mui/material/Pagination";
import { PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Empty,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import Header from "./components/Header/Header";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState(true);
  const [editItemId, setEditItemID] = useState("");
  const [show, setshow] = useState(5);
  const [counter, setcounter] = useState(1);
  const [pag, setpag] = useState({
    start: 0,
    end: show,
  });
  const changePag = (start, end) => {
    setpag({ start: start, end: end });
  };
  useEffect(() => {
    const value = show * counter;

    changePag(value - show, value);
  }, [counter]);
  const getData = useCallback(async () => {
    let result = await axios.get("https://jsonplaceholder.typicode.com/users");

    setData(result.data);
  });
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  const [newUserData, setNewUserData] = useState({
    name: "",
    username: "",
    email: "",
    image: "",
  });
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const showData = () => {
    if (
      newUserData.name == " " ||
      newUserData.username == "" ||
      newUserData.email == ""
    ) {
      alert("fill all filed");
      return;
    } else if (editItemId) {
      setData(
        data.map((item) => {
          if (item.id == editItemId) {
            return {
              ...item,
              name: newUserData.name,
              username: newUserData.username,
              email: newUserData.email,
            };
          }
          return item;
        })
      );
      setEditItemID("");
      setVisible(false);
      setNewUserData({
        name: "",
        username: "",
        email: "",
      });
    } else {
      setVisible(false);
      setData(
        data.concat({ ...newUserData, id: new Date().getTime().toString() })
      );
      setNewUserData({
        id: "",
        name: "",
        username: "",
        email: "",
        image: "",
      });
    }
  };

  // function for delete data from table

  const handleDeleteItem = (id) => {
    setData(
      data.filter((item) => {
        return item.id != id;
      })
    );
  };

  // function for put editdata in input field

  console.log(newUserData);

  const handleEditItem = (id, name, username, email) => {
    setVisible(true);
    setEditItemID(id);
    setNewUserData({
      name,
      username,
      email,
    });
  };

  return (
    <div className="App">
      <Button
        style={{ float: "left", height: "56px", fontSize: "35px" }}
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        New account
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => showData()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <div className="allInputField">
          <input
            type="file"
            onChange={(e) =>
              setNewUserData({ ...newUserData, image: e.target.value })
            }
            accept="image/*"
          />

          <label>Name </label>
          <Input
            placeholder="Enter  name"
            className="inputField1"
            type="text"
            onChange={(e) =>
              setNewUserData({ ...newUserData, name: e.target.value })
            }
            value={newUserData.name}
          ></Input>
          <br></br>
          <label>User Name </label>
          <Input
            placeholder="Enter user name"
            className="inputField2"
            onChange={(e) =>
              setNewUserData({ ...newUserData, username: e.target.value })
            }
            type="text"
            value={newUserData.username}
          ></Input>
          <br></br>
          <label>Email </label>
          <Input
            placeholder="Enter user email"
            className="inputField3"
            onChange={(e) =>
              setNewUserData({ ...newUserData, email: e.target.value })
            }
            type="text"
            value={newUserData.email}
          ></Input>
        </div>
      </Drawer>

      <button
        id="btnMode"
        onClick={() => setTheme(!theme)}
        className="btn btn-warning"
      >
        {theme ? "light" : "dark"}
      </button>
      <Header theme={theme} />
      <table
        className={theme ? "table table-dark hover" : "table table-light hover"}
      >
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {data.length == 0 ? (
            <Empty description={false} />
          ) : (
            data.slice(pag.start, pag.end).map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>

                  <td>
                    {" "}
                    <Button
                      onClick={() => handleDeleteItem(item.id)}
                      className="btn btn-primary"
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    {" "}
                    <Button
                      onClick={() =>
                        handleEditItem(
                          item.id,
                          item.name,
                          item.username,
                          item.email
                        )
                      }
                      className="btn btn-primary"
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <Pagination
        variant="outlined"
        size="large"
        shape="rounded"
        className="pagenitionCss"
        onChange={(event, value) => setcounter(value)}
        count={
          +Math.fround(
            data.length == 10 ? data.length / 5 : data.length / 5 + 1
          ).toFixed(0)
        }
        color="secondary"
      />
    </div>
  );
}

export default App;
