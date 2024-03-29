import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UniversityList from './university/UniversityList';
import UniversityDetails from './university/UniversityDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UniversityList />} />
        <Route path="/university/:name" element={<UniversityDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
