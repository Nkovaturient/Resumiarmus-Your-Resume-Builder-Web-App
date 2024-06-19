import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
// import { Buffer } from 'buffer';
import axios from 'axios';
import { config } from '../config/config';

const JwtTestComponent = () => {
    // const myBuffer=Buffer.from("bonjour", 'utf8');
    try{
      const secretKey = 'your-256-bit-secret';
        const payload = {
          userId: 123,
          username: 'testuser',
        };
    
        const options = {
          expiresIn: '1h',
        };
    
        const token = jwt.sign(payload, secretKey, options);
        console.log('Generated Token:', token);
    
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            console.error('Token verification failed:', err);
          } else {
            console.log('Decoded Token:', decoded);
          }
        });
    
        const decoded = jwt.decode(token);
        console.log('Decoded Token (without verification):', decoded);
   

    }catch(error){
      if (error instanceof Error) {
        console.error('Error generating or verifying token:', error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    
    }
   
  

  return (
    <div>
      <h1>JWT Test</h1>
      <p>Check the console for JWT operations output.</p>
    </div>
  );
};

export default JwtTestComponent;
