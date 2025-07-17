import React, { useEffect, useState, useCallback } from "react";
import {
  getSchools,
  createSchool,
  deactivateSchool,
  activateSchool,
} from "../api/schoolApi";
import SchoolForm from "./SchoolForm";
import ConfirmModal from "./ConfirmModal";

const SchoolList = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filterRegion, setFilterRegion] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterActive, setFilterActive] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const loadSchools = useCallback(async () => {
    setLoading(true);
    try {
      const filters = {};
      if (filterRegion.trim() !== "") filters.region = filterRegion.trim();
      if (filterType !== "") filters.type = filterType;
      if (filterActive === "active") filters.isActive = true;
      else if (filterActive === "inactive") filters.isActive = false;

      const response = await getSchools(filters);
      setSchools(response.data);
    } catch (error) {
      console.error("Error loading schools:", error);
    } finally {
      setLoading(false);
    }
  }, [filterRegion, filterType, filterActive]);

  useEffect(() => {
    loadSchools();
  }, []);

  const handleCreateSchool = async (school) => {
    try {
      await createSchool(school);
      await loadSchools();
    } catch (error) {
      console.error("Error creating school:", error);
    }
  };

  const openModal = (school, action) => {
    setSelectedSchool(school);
    setModalAction(action);
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
    setSelectedSchool(null);
    setModalAction(null);
  };

  const confirmAction = async () => {
    if (!selectedSchool || !modalAction) return;

    try {
      if (modalAction === "deactivate") {
        await deactivateSchool(selectedSchool.id);
        setSchools((prev) =>
          prev.map((s) =>
            s.id === selectedSchool.id ? { ...s, active: false } : s
          )
        );
      } else if (modalAction === "activate") {
        await activateSchool(selectedSchool.id);
        setSchools((prev) =>
          prev.map((s) =>
            s.id === selectedSchool.id ? { ...s, active: true } : s
          )
        );
      }
    } catch (error) {
      console.error(`Error during ${modalAction} action:`, error);
    } finally {
      closeModal();
    }
  };

  const handleClearFilters = () => {
    setFilterRegion("");
    setFilterType("");
    setFilterActive("");
  };

  return (
    <div className="container mt-4">
      <SchoolForm onSubmit={handleCreateSchool} />

      <h4>Filter Schools</h4>
      <div className="row mb-3 g-2 align-items-end">
        <div className="col-md-4">
          <label htmlFor="filterRegion" className="form-label">
            Region
          </label>
          <input
            id="filterRegion"
            type="text"
            className="form-control"
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            placeholder="Enter region"
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="filterType" className="form-label">
            Type
          </label>
          <select
            id="filterType"
            className="form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All types</option>
            <option value="GYMNASIUM">Gymnasium</option>
            <option value="LYCEUM">Lyceum</option>
            <option value="SECONDARY_SCHOOL">Secondary school</option>
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="filterActive" className="form-label">
            Status
          </label>
          <select
            id="filterActive"
            className="form-select"
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="col-md-2 d-flex gap-2">
          <button className="btn btn-primary flex-grow-1" onClick={loadSchools}>
            Search
          </button>
          <button
            className="btn btn-secondary flex-grow-1"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <h4>School List</h4>

      {loading ? (
        <p>Loading schools...</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>School name</th>
              <th>EDRPOU</th>
              <th>Region</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <tr key={school.id}>
                <td>{school.name}</td>
                <td>{school.edrpou}</td>
                <td>{school.region}</td>
                <td>{school.type}</td>
                <td>{school.active ? "Active" : "Inactive"}</td>
                <td>
                  {school.active ? (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => openModal(school, "deactivate")}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => openModal(school, "activate")}
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ConfirmModal
        show={modalShow}
        school={selectedSchool}
        action={modalAction}
        onClose={closeModal}
        onConfirm={confirmAction}
      />
    </div>
  );
};

export default SchoolList;
