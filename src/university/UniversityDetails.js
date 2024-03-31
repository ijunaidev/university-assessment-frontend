import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import BASE_URL from '../config/ApiConfig';

function UniversityDetails() {
  const { name } = useParams();
  const [universityDetails, setUniversityDetails] = useState(null);

  useEffect(() => {
    const fetchUniversityDetails = async () => {
      try {

        const response = await axios.get(`${BASE_URL}/university/details?name=${encodeURIComponent(name)}`);
        setUniversityDetails(response.data);
      } catch (error) {
        console.error('Error fetching university details:', error);
      }
    };

    fetchUniversityDetails();
  }, [name]);

  if (!universityDetails) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{universityDetails.name}</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">University Details</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Domains:</strong> {universityDetails.domains?.join(', ')}</li>
            <li className="list-group-item"><strong>Country Code:</strong> {universityDetails.alpha_two_code}</li>
            <li className="list-group-item">
              <strong>Web Sites:</strong> 
              {universityDetails.web_pages?.map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="ml-2">{url}</a>
              ))}
            </li>
            <li className="list-group-item"><strong>State / Province:</strong> {universityDetails['state-province']}</li>
            <li className="list-group-item"><strong>Country:</strong> {universityDetails.country}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UniversityDetails;
