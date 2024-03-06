import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

const List = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      customer: "Username",
      date: new Date("2024-03-01"),
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Username",
      date: new Date("2024-03-01"),
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Username",
      date: new Date("2024-03-01"),
      amount: 35,
      status: "Pending",
    },
  ];
  const filteredRows = selectedDate
    ? rows.filter(
        (row) => row.date.toDateString() === selectedDate.toDateString()
      )
    : rows;
  return (
    <div>
      <div className="dateFilter" style={{ position: "relative", top: 50 }}>
        <label htmlFor="date">Select Date : </label>
        <FontAwesomeIcon
          icon={faCalendarAlt}
          size="lg"
          style={{
            "--fa-primary-color": "#1f5cc7",
            "--fa-secondary-color": "#1f5cc7",
            cursor: "pointer",
          }}
          onClick={() => document.getElementById("date").click()}
        />
        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="hide-datepicker"
        />
      </div>
      <TableContainer
        component={Paper}
        className="table"
        style={{ width: 500, position: "relative", top: 50, height: 250 }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">User</TableCell>
              <TableCell className="tableCell">Validé</TableCell>
              <TableCell className="tableCell">En Attente de PJ</TableCell>
              {/* <TableCell className="tableCell">Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {/* <img src={row.img} alt="" className="image" /> */}
                    {row.customer}
                  </div>
                </TableCell>
                <TableCell className="tableCell">
                  Total : {row.amount}
                </TableCell>
                <TableCell className="tableCell">
                  Total : {row.amount}
                </TableCell>
                {/* <TableCell className={`tableCell status ${row.status}`}>
                  {row.status}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
