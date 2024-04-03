import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminServiceManagement = () => {
  const [image, setImage] = useState(null);
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [editServiceName, setEditServiceName] = useState('');
  const [editServiceId, setEditServiceId] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fetch-services');
      setServices(response.data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setServiceName(e.target.value);
  };

  const handleEditNameChange = (e) => {
    setEditServiceName(e.target.value);
  };

  const handleEdit = (id, name) => {
    setEditServiceId(id);
    setEditServiceName(name);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/edit-service/${editServiceId}`, { name: editServiceName });
      alert('Service updated successfully');
      fetchServices(); // Refresh the service gallery after update
      setEditServiceId('');
      setEditServiceName('');
    } catch (error) {
      console.error('Failed to update service:', error);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', serviceName);

    try {
      await axios.post('http://localhost:3000/add-service', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Service uploaded successfully');
      fetchServices(); // Refresh the service gallery after upload
      setImage(null); // Reset image state after upload
      setServiceName(''); // Reset service name state after upload
    } catch (error) {
      console.error('Failed to upload service:', error);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:3000/delete-service/${serviceId}`);
      alert('Service deleted successfully');
      fetchServices(); // Refresh the service gallery after deletion
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  return (
    <div>
      <h2>Service Management</h2>
      <div>
        <h3>Add Service</h3>
        <input type="file" onChange={handleImageChange} />
        <input type="text" value={serviceName} onChange={handleNameChange} placeholder="Service Name" />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div>
        <h3>Service Gallery</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {services.map((service, index) => (
            <div key={index} style={{ flex: '0 1 calc(33.33% - 10px)', marginBottom: '20px' }}>
              <img src={`http://localhost:3000/${service.image}`} alt={`Service ${index}`} style={{ width: '100%' }} />
              <p style={{ textAlign: 'center' }}>{service.name}</p>
              <button onClick={() => handleEdit(service._id, service.name)}>Edit</button>
              <button onClick={() => handleDelete(service._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      {/* Edit Service Form */}
      {editServiceId && (
        <div>
          <h3>Edit Service</h3>
          <input type="text" value={editServiceName} onChange={handleEditNameChange} />
          <button onClick={handleEditSubmit}>Update</button>
        </div>
      )}
    </div>
  );
};

export default AdminServiceManagement;
