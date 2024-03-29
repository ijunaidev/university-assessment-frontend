import React from 'react';

function UniversityItem({ university, index, toggleDetails, handleUniversityClick }) {
  return (
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
  );
}

export default UniversityItem;
