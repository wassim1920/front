import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datatable.scss";
import { Link } from "react-router-dom";

const ContractList = () => {
  const [contracts, setContracts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({
    Date: "",
    CIN: "",
    MSISDN: "",
    Statut: "",
    Propriétaire: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractResponse = await fetch(
          `/contrat/all?limit=${itemsPerPage}&page=${currentPage}`
        );
        const contractData = await contractResponse.json();
        setContracts(contractData);

        const customerResponse = await fetch(
          `/contrat/customers?limit=${itemsPerPage}&page=${currentPage}`
        );
        const customerData = await customerResponse.json();
        setCustomers(customerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleClick = (pdfPath) => {
    localStorage.setItem("selectedPdfPath", pdfPath);
  };

  const handleDateChange = async (date) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      Date: date,
    }));

    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await fetch(`/contrat/date?startDate=${formattedDate}`);
      const data = await response.json();
      setContracts(data);
    } catch (error) {
      console.error("Error searching contracts by creation date:", error);
    }
  };
  const handleFilterChange = async (e, columnName) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnName]: value,
    }));

    try {
      let endpoint = `/contrat/all?limit=${itemsPerPage}&page=${currentPage}`;

      if (columnName === "MSISDN" && value.trim() !== "") {
        endpoint = `/contrat/search?MSISDN=${value.trim()}&limit=${itemsPerPage}&page=${currentPage}`;
      } else if (columnName === "CIN" && value.trim() !== "") {
        endpoint = `/contrat/search/cin?cin=${value.trim()}`;
      } else if (columnName === "Propriétaire" && value.trim() !== "") {
        endpoint = `/contrat/search/name?first_name=${value.trim()}&last_name=${value.trim()}`;
      }

      const response = await fetch(endpoint);
      const data = await response.json();
      setContracts(data);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="contract-list">
      <h2>Contrats en attente de vérification</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>CIN</th>
            <th>MSISDN</th>
            <th>Statut</th>
            <th>Propriétaire</th>
          </tr>
          <tr>
            <td>
              <DatePicker
                selected={filters.Date}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Sélectionner une date"
                className="d_Filter"
              />
            </td>
            <td>
              <input
                type="text"
                value={filters.CIN}
                onChange={(e) => handleFilterChange(e, "CIN")}
                placeholder="Recherche"
              />
            </td>
            <td>
              <input
                type="text"
                value={filters.MSISDN}
                onChange={(e) => handleFilterChange(e, "MSISDN")}
                placeholder="Recherche"
              />
            </td>
            <td>
              <input
                type="text"
                value={filters.Statut}
                onChange={(e) => handleFilterChange(e, "Statut")}
                placeholder="Recherche"
              />
            </td>
            <td>
              <input
                type="text"
                value={filters.Propriétaire}
                onChange={(e) => handleFilterChange(e, "Propriétaire")}
                placeholder="Recherche"
              />
            </td>
          </tr>
        </thead>

        <tbody>
          {contracts.length > 0 &&
            customers.length > 0 &&
            contracts.map((contract) => (
              <tr key={contract._id} className="contract">
                <td className="ishearch">
                  <Link
                    to={`/contract/${contract._id}`}
                    className="ishearch"
                    onClick={() => handleClick(contract.pdf_path)}
                  >
                    {contract.creation_date.split("T")[0]}
                  </Link>
                </td>

                <td>
                  {customers.find(
                    (customer) => customer._id === contract.customer
                  )?.cin ||
                    customers.find(
                      (customer) => customer._id === contract.customer
                    )?.passport}
                </td>

                <td>
                  <Link
                    to={`/contract/${contract._id}`}
                    className="ishearch"
                    onClick={() => handleClick(contract.pdf_path)}
                  >
                    {contract.MSISDN}
                  </Link>
                </td>
                <td style={{ color: "orange" }}>En Attente</td>

                <td>
                  {customers.find(
                    (customer) => customer._id === contract.customer
                  )
                    ? customers.find(
                        (customer) => customer._id === contract.customer
                      ).first_name +
                      " " +
                      customers.find(
                        (customer) => customer._id === contract.customer
                      ).last_name
                    : ""}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
      >
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={contracts.length < itemsPerPage}>
          Next
        </button>
      </div>
    </div>
  );
};
export default ContractList;
