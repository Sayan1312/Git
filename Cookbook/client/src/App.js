import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import IngredientPage from './pages/Ingredient';
import Navigation from './components/Navigation';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navigation />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route
              path="/ingredients"
              element={<IngredientPage setLoading={setLoading} />}
            />
            <Route path="/:recipeId" element={<IngredientPage setLoading={setLoading} />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
