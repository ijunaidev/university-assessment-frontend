import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function UniversityList() {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);

  const fetchUniversities = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/v1/university/getByCountry?country=${country}`);
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
      
      <ul className="list-group">
        {universities.map((university, index) => (
          <li key={index} className="list-group-item">
            <span
              onClick={(event) => {
                event.preventDefault();
                toggleDetails(index);
              }}
              style={{ cursor: 'pointer', marginRight: '5px' }}
            >
              {university.expanded ? '-' : '+'}
            </span>
            <span
              onClick={() => handleUniversityClick(university.name)}
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
            >
              University Name: {university.name}
            </span>
            {university.expanded && (
              <div className="mt-2">
                Domains: {university.domains?.join(', ')} <br />
                Country Code: {university.alpha_two_code} <br />
                Web Sites: {university.web_pages?.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                )).reduce((prev, curr) => [prev, ', ', curr])} <br />
                State / Province: {university['state-province']} <br />
                Country: {university.country} <br />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UniversityList;
