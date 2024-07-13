import React, { useEffect, useRef } from 'react';
import axios from 'axios';

function CharGenerator() {
  const hasFetched = useRef(false);

  useEffect(() => {
    const generateComic = async () => {
      const payload = {
        artStyle: 'pixar art',
        pages: [
          {
            scenes: [
              'a 9 year old girl with blue eyes and curly hair walking in a jungle'
            ]
          }
        ]
      };

      try {
        const response = await axios.post('http://localhost:4000/comic/generate', payload, {
          withCredentials: true, // Send cookies
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('Comic generated:', response.data);
        // Handle response as needed
      } catch (error) {
        console.error('Failed to generate comic:', error);
        // Handle error
      }
    };

    if (!hasFetched.current) {
      generateComic();
      hasFetched.current = true;
    }
  }, []); // Empty dependency array to run once on component mount

  return (
    <div>
      <h2>Generating Comic...</h2>
      {/* Optional: Add loading spinner or message */}
    </div>
  );
}

export default CharGenerator;
