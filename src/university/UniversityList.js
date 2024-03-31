import React, { useState } from 'react';
import axios from 'axios';
import UniversityItem from './UniversityItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import BASE_URL from '../config/ApiConfig';

function UniversityList() {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);

  const fetchUniversities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/university/getByCountry?country=${country}`);
      console.info('Data: ', response.data);
      setUniversities(response.data.map(university => ({ ...university, expanded: false })));
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchUniversities();
  };

  const toggleDetails = (index) => {
    setUniversities((prevState) =>
      prevState.map((university, i) =>
        i === index ? { ...university, expanded: !university.expanded } : university
      )
    );
  };

  const handleUniversityClick = (name) => {
    window.open(`/university/${encodeURIComponent(name)}`, '_blank');
  };

  return (
    <div className="container mt-4">
      <h2>List of Universities in Pakistan</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="countryInput">Country:</label>
          <input type="text" id="countryInput" className="form-control" value={country} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      
      {universities.length === 0 ? (
        <p>No university found</p>
      ) : (
        <ul className="list-group">
          {universities.map((university, index) => (
            <UniversityItem
              key={index}
              university={university}
              index={index}
              toggleDetails={toggleDetails}
              handleUniversityClick={handleUniversityClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default UniversityList;
