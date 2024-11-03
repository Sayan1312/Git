import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, ToggleButton, } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Lists from "../lists_data.json"
import Items from '../item_data.json'
import CreateItemForm from '../components/CreateItem';

const ShoppingListPage = () => {
  const { listId } = useParams;
  const selectedList = Lists.find((list) => list.id === listId && list !== null);
  const [checked, setChecked] = useState(false);
  const [quantity, setQuantity] = useState(0); // Added state for quantity
  const [items, setItems] = useState(Items);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCompleted] = useState('all')
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Simulate fetching rooms data
    setTimeout(() => {
      if (listId) {
        // Fetch rooms for a specific building
        setItems(Items.filter((item) => item.listId === Number(listId)));
      } else {
        // Fetch all rooms
        setItems(Items);
      }
      setLoading(false);
    }, 1000); 
  }, [listId]);

  const handleCreateItem = (name, quantity) => {
    const newItem = {
      id: items.length + 1, // or some other logic to generate unique IDs
      name,
      quantity,
      completed: false,
      // Add any other necessary fields
    };
    setItems([...items, newItem]);
    setShowCreateModal(false);
  };

  const filteredItems = items.filter((item) => {
    const stateFilter = selectedCompleted === 'all' || item.completed === selectedCompleted;
    return stateFilter ;
  });

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    setSelectedItem(null);
  };


  return (
    <div style={{ background: "#66f2e4", padding: "20px", minHeight: "100vh" }}>
        
      <div className="mb-3">
        <Button
          variant="light"
          style={{ fontSize: "1.1rem", padding: "12px 14px" }}
          className="mt-3"
          onClick={() => setShowCreateModal(true)}
        >
          Add
        </Button>
      </div>
      <div style={{ background: "white", padding: "40px", borderRadius: "3px" }}>
        <Row>
            {filteredItems.map((item) => (
          <Col lg={4} className="mb-4">
            <Card border="dark" className="text-black bg-light mb-3">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={checked}
                  value="1"
                  onChange={(e) => setChecked(e.currentTarget.checked)}
                >
                  Check
                </ToggleButton>
                <input
                  className="form-control" // Corrected className here
                  type="number"
                  value={quantity} // Bind quantity state
                  onChange={(e) => setQuantity(e.target.value)} // Update quantity on change
                  min="0" // Set minimum value to 0
                  style={{
                    width: '100px', // Задайте ширину
                    height: '100px', // Задайте высоту
                    textAlign: 'center' // Центрирование текста
                  }}
                />
                <Button 
                  variant="light"
                  style={{ fontSize: "1.1rem", padding: "12px 14px" }}
                  className="mt-3"
                  onClick={() => setShowCreateModal(true)}>
                    Delete
                  </Button>
              </Card.Body>
            </Card>
          </Col>
          ))}
        </Row>
        <CreateItemForm
        show={showCreateModal}
        handleClose={() => {
            setShowCreateModal(false);
            setSelectedItem(null);
        }}
        handleCreateItem={handleCreateItem}
        item={selectedItem}
        />
      </div>
    </div>
  );
};

export default ShoppingListPage;
