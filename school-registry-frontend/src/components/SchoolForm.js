import React, { useState } from "react";

const SCHOOL_TYPES = [
  { value: "GYMNASIUM", label: "Gymnasium" },
  { value: "LYCEUM", label: "Lyceum" },
  { value: "SECONDARY_SCHOOL", label: "Secondary school" },
];

const INITIAL_FORM_STATE = {
  name: "",
  edrpou: "",
  region: "",
  type: "GYMNASIUM",
  active: true,
};

const SchoolForm = ({ onSubmit }) => {
  const [form, setForm] = useState(INITIAL_FORM_STATE);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(INITIAL_FORM_STATE);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Create New School</h4>

      <div className="form-group mb-2">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="School name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-2">
        <input
          type="text"
          name="edrpou"
          className="form-control"
          placeholder="EDRPOU"
          value={form.edrpou}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-2">
        <input
          type="text"
          name="region"
          className="form-control"
          placeholder="Region"
          value={form.region}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-2">
        <select
          name="type"
          className="form-select"
          value={form.type}
          onChange={handleChange}
        >
          {SCHOOL_TYPES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-2 form-check">
        <input
          type="checkbox"
          name="active"
          className="form-check-input"
          checked={form.active}
          onChange={handleChange}
          id="activeCheck"
        />
        <label className="form-check-label" htmlFor="activeCheck">
          Active
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default SchoolForm;
