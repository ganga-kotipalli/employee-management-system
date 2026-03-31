import React, { useState, useEffect } from 'react'
import axios from "axios"
import "./App.css"

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const [employee, setEmployee] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: ""
  })

  const [editId, setEditId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5

  // Sorting
  const [sortOrder, setSortOrder] = useState("asc")

  // ================= FETCH =================
  useEffect(() => {
    axios.get("http://localhost:9091/employees")
      .then(res => setEmployee(res.data))
      .catch(() => toast.error("Failed to fetch data"))
  }, [])

  // ================= VALIDATION =================
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.department) {
      toast.error("All fields are required")
      return false
    }

    if (formData.name.length < 3) {
      toast.error("Name must be at least 3 characters")
      return false
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Invalid email format")
      return false
    }

    return true
  }

  // ================= ADD =================
  const addEmployee = () => {

    if (!validateForm()) return

    fetch("http://localhost:9091/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        setEmployee([...employee, data])
        setFormData({ name: "", email: "", department: "" })
        toast.success("Employee added successfully")
      })
      .catch(() => toast.error("Add failed"))
  }

  // ================= DELETE =================
  const deleteEmployee = (id) => {

    if (!window.confirm("Are you sure to delete?")) return

    fetch(`http://localhost:9091/employees/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setEmployee(employee.filter(emp => emp.id !== id))
        toast.success("Employee deleted successfully")
      })
      .catch(() => toast.error("Delete failed"))
  }

  // ================= EDIT =================
  const editEmployee = (emp) => {
    setFormData({
      name: emp.name,
      email: emp.email,
      department: emp.department
    })
    setEditId(emp.id)
  }

  // ================= UPDATE =================
  const updateEmployee = () => {

    if (!validateForm()) return

    fetch(`http://localhost:9091/employees/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(updatedEmp => {

        const updatedList = employee.map(emp =>
          emp.id === editId ? updatedEmp : emp
        )

        setEmployee(updatedList)
        setFormData({ name: "", email: "", department: "" })
        setEditId(null)
        toast.success("Employee updated successfully")
      })
      .catch(() => toast.error("Update failed"))
  }

  // ================= SEARCH =================
  const filteredEmployees = employee.filter(emp =>
    emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // ================= SORT =================
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  })

  // ================= PAGINATION =================
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage

  const currentRecords = sortedEmployees.slice(firstIndex, lastIndex)

  const totalPages = Math.ceil(sortedEmployees.length / recordsPerPage)
  const pages = [...Array(totalPages).keys()].map(n => n + 1)

  // Reset page on search
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  return (
    <div className="container">

      <h2>Employee Management</h2>

      {/* FORM */}
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
        />

        <button
          className={editId ? "update-btn" : "add-btn"}
          onClick={editId ? updateEmployee : addEmployee}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* SEARCH */}
      <input
        className="search"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
              Name ⬍
            </th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            currentRecords.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button className="edit-btn" onClick={() => editEmployee(emp)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination">
        {
          pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ))
        }
      </div>

      {/* TOAST */}
      <ToastContainer position="top-right" autoClose={2000} />

    </div>
  )
}

export default App