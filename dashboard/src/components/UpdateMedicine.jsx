import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateMedicine = () => {
  const { isAuthenticated } = useContext(Context);
  const { id } = useParams();
  const navigateTo = useNavigate();

  const [medicine, setMedicine] = useState({
    name: "",
    medicinecategoryid: "",
    origin: "",
    price: "",
    quantity: "",
    importdate: "",
    expirationdate: ""
  });

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/medicines/medicine/${id}`,
          { withCredentials: true }
        );
        setMedicine(data.medicine);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchMedicineDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicine({
      ...medicine,
      [name]: value
    });
  };

  const handleUpdateMedicine = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `http://localhost:4000/api/v1/medicines/medicine/${id}`,
          medicine,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          navigateTo("/medicines");
        });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to update medicine");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container form-component update-medicine-form">
        <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">UPDATE MEDICINE</h1>
        <form onSubmit={handleUpdateMedicine}>
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={medicine.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Category"
              name="medicinecategoryid"
              value={medicine.medicinecategoryid}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Origin"
              name="origin"
              value={medicine.origin}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              value={medicine.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              type="date"
              placeholder="Import Date"
              name="importdate"
              value={medicine.importdate}
              onChange={handleInputChange}
              required
            />
             <input
              type="date"
              placeholder="Expiration Date"
              name="expirationdate"
              value={medicine.expirationdate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={medicine.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">UPDATE MEDICINE</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default UpdateMedicine;
