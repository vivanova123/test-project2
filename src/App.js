import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { firstname: "", lastname: "", NPI: "", address: "", phone: "", email: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex2 =  /^\d{10}$/;
   
    if (!values.firstname) {
      errors.firstname = "First Name is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Last Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.npi) {
      errors.npi = "NPI is required";
    } else if (!regex2.test(values.npi)) {
      errors.npi = "NPI should contain 10 digits!";
    } 
    if (!values.address) {
      errors.address = "Business Address is required";
    }
    if (!values.phone) {
      errors.phone = "Phone is required";
    } else if (!regex2.test(values.phone)) {
      errors.phone = "Phone should contain 10 digits!";
    } 
    return errors;
  };

  return (
    <div className="container">
      {
       Object.keys(formErrors).length === 0 && isSubmit ? (<div className="ui message success">Registration Successful!</div>) 
      : Object.keys(formErrors).length > 0 ? (<div className="ui message unsuccesful">Registration Failed</div>)
      :(<div className="ui message"></div>)
      }

      <form onSubmit={handleSubmit}>
        <h1>User Registration</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="firstname"
              value={formValues.firstname}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.firstname}</p>
          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="lastname"
              value={formValues.lastname}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.lastname}</p>
          <div className="field">
            <label>NPI number</label>
            <input
              type="text"
              name="npi"
              placeholder="npi"
              value={formValues.npi}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.npi}</p>
          <div className="field">
            <label>Business Address</label>
            <input
              type="text"
              name="address"
              placeholder="address"
              value={formValues.address}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.address}</p>
          <div className="field">
            <label>Telephone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="phone"
              value={formValues.phone}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.phone}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;