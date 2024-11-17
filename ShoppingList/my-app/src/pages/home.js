import React, { useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateLists from "../components/createLists";
import Lists from "../lists_data.json";

const HomePage = () => {
  const [lists, setLists] = useState(
    Lists.map((list) => ({ ...list, archived: false })) // Add `archived` property
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showArchived, setShowArchived] = useState(false); // State for filtering archived lists

  const filteredLists = () => {
    return lists.filter((list) => showArchived || !list.archived);
  };

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateList = (newListName, newListDescription) => {
    const newList = {
      id: lists.length + 1,
      name: newListName,
      description: newListDescription,
      archived: false,
    };

    setLists([...lists, newList]);
    setShowCreateModal(false);
  };

  const handleDeleteList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
  };

  const handleToggleArchived = (id) => {
    setLists(
      lists.map((list) =>
        list.id === id ? { ...list, archived: !list.archived } : list
      )
    );
  };

  const toggleShowArchived = () => {
    setShowArchived(!showArchived);
  };

  return (
    <div style={{ background: "#66f2e4", padding: "20px", minHeight: "100vh" }}>
      <div className="mb-3 d-flex justify-content-between">
        <Button
          variant="light"
          style={{ fontSize: "1.1rem", padding: "12px 14px" }}
          className="mt-3"
          onClick={handleShowCreateModal}
        >
          Create
        </Button>
        <Button
          variant="dark"
          style={{ fontSize: "1.1rem", padding: "12px 14px" }}
          className="mt-3"
          onClick={toggleShowArchived}
        >
          {showArchived ? "Hide Archived" : "Show Archived"}
        </Button>
      </div>
      <div style={{ background: "white", padding: "40px", borderRadius: "3px" }}>
        <Row>
          {filteredLists().map((list) => (
            <Col key={list.id} lg={4} className="mb-4">
              <Card border="dark" className="card text-black bg-light mb-3">
                <Card.Body>
                  <Link
                    to={{ pathname: "/shopping-list" }}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Card.Title>{list.name}</Card.Title>
                  </Link>
                  <Button
                    className="me-2"
                    onClick={() => handleToggleArchived(list.id)}
                    variant={list.archived ? "success" : "warning"}
                  >
                    {list.archived ? "Unarchive" : "Archive"}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteList(list.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
                <Card.Footer>{list.description}</Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <CreateLists
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        handleCreate={handleCreateList}
      />
    </div>
  );
};

export default HomePage;
