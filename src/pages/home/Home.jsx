import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
// import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import ChartComponent from "../../components/widget/Widget";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {/* <div className="widgets">
          <Widget type="user" />
          <Widget type="hotel" />
          <Widget type="room" />
        </div> */}
        <div className="charts">
          <Featured />
          <Table/>
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <div className="charts" >
          <ChartComponent/>
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
