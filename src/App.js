import React from "react";
import { users } from "./data";
import "./styles.scss";
import _ from "lodash";
import axios from "axios";
import { Table } from "reactstrap";

const getApiInfo = async () => {
  await axios
    .get("https://api.publicapis.org/entries")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export default function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState(users);
  const [data, setData] = React.useState([]);
  const [filterData, setFilterData] = React.useState([]);

  const handleSearchFilter = (e) => {
    setSearchValue(e.target.value);
  };

  React.useEffect(() => {
    const filteredData = data.filter((i) => i.API.includes(searchValue));
    setFilterData(filteredData);
  }, [searchValue, data]);

  React.useEffect(() => {
    const getApiInfo = async () => {
      await axios
        .get("https://api.publicapis.org/entries")
        .then(({ data }) => {
          setData(data.entries);
          setFilterData(data.entries);
        })
        .catch((err) => console.log(err));
    };
    getApiInfo();
  }, [searchValue]);

  return (
    <div className="App">
      <h1>Users</h1>

      <input
        type="search"
        placeholder="Search users..."
        value={searchValue}
        onChange={handleSearchFilter}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>API</th>
            <th>Description</th>
            <th>Link</th>
            <th>Category</th>
          </tr>
        </thead>
        {filterData.length > 1 &&
          filterData.map((i, idx) => (
            <tbody>
              <tr>
                <td>{i.API}</td>
                <td>{i.Description}</td>
                <td>{i.Link}</td>
                <td>{i.Category}</td>
              </tr>
            </tbody>
          ))}
      </Table>
    </div>
  );
}
