import React, { useState, useEffect } from 'react';
import { getAllCars, deleteCar, createCar, updateCar } from '../apiService';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ model: '', color: '', quantity: 0 });
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getAllCars();
        if (response && response.cars && Array.isArray(response.cars)) {
          setCars(response.cars);
        } else {
          console.error('Invalid data structure received from API:', response);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
      console.log(`Car with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting car with ID ${id}:`, error);
    }
  };

  const handleAddCar = async () => {
    try {
      const createdCar = await createCar(newCar);
      setCars((prevCars) => [...prevCars, createdCar]);
      setNewCar({ model: '', color: '', quantity: 0 });
      setIsAddingCar(false);
      console.log('New car added successfully:', createdCar);
    } catch (error) {
      console.error('Error adding new car:', error);
    }
  };

  const handleUpdateCar = (id) => {
    setEditingCarId(id);
  };

  const handleUpdateField = (id, field, value) => {
    const updatedCars = cars.map((car) => {
      if (car.id === id) {
        return { ...car, [field]: value };
      }
      return car;
    });
    setCars(updatedCars);
  };

  const handleSubmitUpdate = async (e, id) => {
    e.preventDefault();
    const updatedCar = cars.find((car) => car.id === id);
    try {
      await updateCar(id, updatedCar); // Assuming updateCar function is implemented
      setEditingCarId(null);
      console.log(`Car with ID ${id} updated successfully.`);
    } catch (error) {
      console.error(`Error updating car with ID ${id}:`, error);
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>All Cars</h2>
        <button onClick={() => setIsAddingCar(true)}>Add New Car</button>
        {isAddingCar && (
          <form onSubmit={handleAddCar}>
            <label>
              Model:
              <input
                type="text"
                value={newCar.model}
                onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
              />
            </label>
            <label>
              Color:
              <input
                type="text"
                value={newCar.color}
                onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={newCar.quantity}
                onChange={(e) => setNewCar({ ...newCar, quantity: e.target.value })}
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsAddingCar(false)}>
              Cancel
            </button>
          </form>
        )}
        <ul>
          {Array.isArray(cars) && cars.length > 0 ? (
            cars.map((car) => (
              <li key={car.id}>
                {editingCarId === car.id ? (
                  <form onSubmit={(e) => handleSubmitUpdate(e, car.id)}>
                    <label>
                      Model:
                      <input
                        type="text"
                        value={car.model}
                        onChange={(e) => handleUpdateField(car.id, 'model', e.target.value)}
                      />
                    </label>
                    <label>
                      Color:
                      <input
                        type="text"
                        value={car.color}
                        onChange={(e) => handleUpdateField(car.id, 'color', e.target.value)}
                      />
                    </label>
                    <label>
                      Quantity:
                      <input
                        type="number"
                        value={car.quantity}
                        onChange={(e) => handleUpdateField(car.id, 'quantity', e.target.value)}
                      />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingCarId(null)}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <div>
                      <strong>Model:</strong> {car.model}
                    </div>
                    <div>
                      <strong>Color:</strong> {car.color}
                    </div>
                    <div>
                      <strong>Quantity:</strong> {car.quantity}
                    </div>
                    <div>
                      <button onClick={() => handleDelete(car.id)}>Delete</button>
                      <button onClick={() => handleUpdateCar(car.id)}>Update</button>
                    </div>
                  </>
                )}
              </li>
            ))
          ) : (
            <li>No cars available</li>
          )}
        </ul>
      </div>
      <div className="main-content">{/* Display main content (e.g., detailed view or form for updating) */}</div>
    </div>
  );
};

export default CarList;
