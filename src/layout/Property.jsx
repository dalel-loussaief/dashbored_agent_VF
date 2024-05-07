import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AreaTop } from "../components";
import EditPropertyForm from "./EditPropertyForm";
import axios from 'axios';

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 4;
  const { email } = useParams();

  const openDeleteModal = (propertyId) => {
    setSelectedProperty(propertyId);
    deleteModal.show();
  };

  const closeDeleteModal = () => {
    setSelectedProperty(null);
    deleteModal.hide();
  };

  const closeEditModal = () => {
    setSelectedProperty(null);
    editModal.hide();
  };

  useEffect(() => {
    setDeleteModal(new Modal(document.getElementById('deleteModal'), { backdrop: 'static', keyboard: false }));
    setEditModal(new Modal(document.getElementById('editModal'), { backdrop: 'static', keyboard: false }));
  }, []);

  const storedEmail = localStorage.getItem('storedEmail');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/userAuth/properties/${storedEmail}/`);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    if (storedEmail) {
      fetchProperties();
    }
  }, [storedEmail]);

  const deleteProperty = async () => {
    try {
      await axios.delete(`http://localhost:8000/userAuth/property/delete/${selectedProperty}/`);
      // Re-fetch properties after deletion
      const response = await axios.get(`http://localhost:8000/userAuth/properties/${storedEmail}/`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error deleting property:', error);
    }
    closeDeleteModal();
  };
  const editProperty = async (propertyData) => {
    try {
      await axios.put(`http://localhost:8000/userAuth/property/update/${selectedProperty}/`, propertyData);
      // Re-fetch properties after update
      const response = await axios.get(`http://localhost:8000/userAuth/properties/${storedEmail}/`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error updating property:', error);
    }
    closeEditModal();
  };
  const renderProperties = () => {
    const filteredProperties = properties.filter(property =>
      property.property_titre && property.property_titre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    return currentProperties.map(property => (
      console.log(property.id),
      console.log(property),
      <tr key={property.id}>
        <td>{property.property_titre}</td>
        <td>{property.property_description}</td>
        <td>{property.property_surface}</td>
        <td>{property.property_dispo}</td>
        <td>{property.property_prix}</td>

        <td>
          <img
            src={`http://localhost:8000/userAuth${property.image}`}
            alt={property.property_titre}
            className="img-fluid"
            style={{ maxWidth: '50px', maxHeight: '50px' }}
          />
        </td>
        <td>
          <Link to={`/EditPropertyForm/${property.id}`} state={{ editedProperty: property }}>
            <button className="btn btn-primary">
              <MdEdit />
            </button>
          </Link>
          <button className="btn btn-danger" onClick={() => openDeleteModal(property.id)}>
            <MdDelete />
          </button>
        </td>
      </tr>
    ));
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <AreaTop />
      <br />
      <div style={{ textAlign: "center" }}>
        <h2>Property List</h2>
        <div className="d-flex justify-content-end mb-3">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Surface</th>
              <th>Availability</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderProperties()}</tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {[...Array(Math.ceil(properties.length / propertiesPerPage))].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Delete Property</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this property?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={deleteProperty}>Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Edit Property</h5>
                <button type="button" className="btn-close" onClick={closeEditModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {selectedProperty && <EditPropertyForm property={selectedProperty} />}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Property;
