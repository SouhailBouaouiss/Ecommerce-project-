import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { axiosInstance } from "../api";

function Home() {
  const [statistics, setStatistics] = useState({
    products: null,
    custumers: null,
    categories: null,
  });

  const [ordersCount, setOrdersCount] = useState([]);

  // Retrieve product customer and categories count

  useEffect(() => {
    axiosInstance
      .get("/v1/count")
      .then((resp) => {
        const data = resp.data.data;
        console.log(data);

        return setStatistics(data);
      })
      .catch((error) => {
        console.log(error);
        return setStatistics({
          products: null,
          customers: null,
          categories: null,
        });
      });
  }, []);

  // Retrieve orders count per mounth

  useEffect(() => {
    axiosInstance
      .get("/v1/orders/ordersByMonth")
      .then((resp) => {
        const data = resp.data.data;
        console.log(data);
        setOrdersCount(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const graphData = useMemo(() => {
    console.log(ordersCount);
    return ordersCount.map((elm) => {
      return {
        name: `${elm._id.month}/${elm._id.year}`,
        Sales: elm.totalOrders,
      };
    });
  }, [ordersCount]);
  console.log(graphData);

  return (
    <main className="main-container">
      <div className="main-title">
        <strong>
          <h3>DASHBOARD</h3>
        </strong>
      </div>

      <div className="main-cards">
        <div className="card" style={{ height: 120 }}>
          <div className="card-inner">
            <strong>
              <h3 style={{ color: "#01DFD7" }}>PRODUCTS</h3>
            </strong>
            <BsFillArchiveFill
              className="card_icon"
              style={{ color: "#01DFD7" }}
            />
          </div>

          <strong>
            <h1 style={{ color: "#ded55b" }}>{statistics.products}</h1>
          </strong>
        </div>
        <div className="card" style={{ height: 120 }}>
          <div className="card-inner">
            <strong>
              <h3 style={{ color: "#01DFD7" }}>CATEGORIES</h3>
            </strong>
            <BsFillGrid3X3GapFill
              className="card_icon"
              style={{ color: "#01DFD7" }}
            />
          </div>
          <strong>
            <h1 style={{ color: "#ded55b" }}>{statistics.categories}</h1>
          </strong>
        </div>
        <div className="card" style={{ height: 120 }}>
          <div className="card-inner">
            <strong>
              <h3 style={{ color: "#01DFD7" }}>CUSTOMERS</h3>
            </strong>
            <BsPeopleFill className="card_icon" style={{ color: "#01DFD7" }} />
          </div>
          <strong>
            <h1 style={{ color: "#ded55b" }}>{statistics.customers}</h1>
          </strong>
        </div>
        <div className="card" style={{ height: 120 }}>
          <div className="card-inner">
            <strong>
              <h3 style={{ color: "#01DFD7" }}>ORDERS</h3>
            </strong>
            <BsFillBellFill
              className="card_icon"
              style={{ color: "#01DFD7" }}
            />
          </div>
          <strong>
            <h1 style={{ color: "#ded55b" }}>{statistics.orders}</h1>
          </strong>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={100}
            height={300}
            data={graphData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="pv" fill="#8884d8" /> */}
            <Bar dataKey="Sales" fill="#8eca82" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={700}
            height={400}
            data={graphData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            /> */}
            <Line type="monotone" dataKey="Sales" stroke="#8eca82" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
