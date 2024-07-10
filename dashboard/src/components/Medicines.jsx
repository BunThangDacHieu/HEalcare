import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate } from "react-router-dom";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/medicines",
          { withCredentials: true }
        );
        setMedicines(data.medicines);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    };
    fetchMedicines();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard page">
      <h1>MEDICINES</h1>
      <div className="banner">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Origin</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Import Date</th>
                <th>Expired Date</th>
              </tr>
            </thead>
            <tbody>
              {medicines && medicines.length > 0
                ? medicines.map((medicine) => (
                    <tr key={medicine._id}>
                      <td><Link to={`/medicine/${medicine._id}/update`}>{medicine.name}</Link></td>
                      <td>{medicine.medicinecategoryid}</td>
                      <td>{medicine.origin}</td>
                      <td>{medicine.price}</td>
                      <td>{medicine.quantity}</td>
                      <td>{medicine.importdate}</td>
                      <td>{medicine.expirationdate}</td>
                    </tr>
                  ))
                : "No medicines Found!"}
            </tbody>
          </table>

          {}
        </div>
    </section>
  );
};

export default Medicines;
