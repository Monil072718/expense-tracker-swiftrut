import React, { useState } from 'react';
import axios from '../services/expenseService';

const BulkUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/expenses/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Bulk upload successful!');
    } catch (error) {
      console.error('Error during bulk upload:', error);
      alert('Failed to upload expenses.');
    }
  };

  return (
    <form onSubmit={handleBulkUpload}>
      <div>
        <label>Select CSV File</label>
        <input type="file" accept=".csv" onChange={handleFileChange} required />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default BulkUpload;