import React, { useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import CreateLists from "../components/createLists";
import Lists from "../lists_data.json"

const HomePage =() =>{
const [lists, setLists] = useState(Lists);
const [showCreateModal, setShowCreateModal] = useState(false);

const filteredLists = () => {

return lists;
};


const handleShowCreateModal = () => {
  setShowCreateModal(true);
}
const handleCloseCreateModal = () => {
  setShowCreateModal(false);
}
const handleCreateList = (newListName, newListDescription) => {
  const newList = {
    id: lists.lenght + 1,
    name: newListName,
    description: newListDescription,
  };

  setLists([...lists, newList]);

  setShowCreateModal(false);

}


    return(
        <div style={{ background: "#66f2e4", padding: "20px", minHeight: "100vh" }}>
<div className="mb-3">
        <Button
          variant="light"
          style={{ fontSize: "1.1rem", padding: "12px 14px" }}
          className="mt-3"
          onClick={handleShowCreateModal}
        >
          Create 
        </Button>
        </div>
        <div style={{ background: "white", padding: "40px", borderRadius: "3px" }}>
        
        
        <Row >
          {filteredLists().map((list) => (
            <Col key={list.id} lg={4} className="mb-4">
            <Card border="dark" class="card text-black bg-light mb-3">
                <Card.Body>
                <Link to={{ pathname: '/shopping-list' }}  style={{ textDecoration: 'none', color: 'inherit' , }}>
                  <Card.Title>{list.name}</Card.Title>
                  </Link>
                  <Button>
                    Add member
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

    )


}
export default HomePage;