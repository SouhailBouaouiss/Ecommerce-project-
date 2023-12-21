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
    <div
      style={{
        width: "93%",
        backgroundColor: "#0000",
        color: "wheat",
      }}
      className="mt-10 ms-10"
    >
      <div className="main-title">
        <strong>
          <h3>DASHBOARD</h3>
        </strong>
      </div>

      <div className="main-cards">
        <div
          className="card"
          style={{ height: 120, backgroundColor: "#191c24" }}
        >
          <div className="card-inner">
            <strong>
              <h3
                style={{
                  color: "white",
                  fontSize: "1rem",
                  fontFamily: "Open Sans , sans-serif",
                }}
              >
                PRODUCTS
              </h3>
            </strong>
            <BsFillArchiveFill
              className="card_icon"
              style={{ color: "#009E60" }}
            />
          </div>

          <strong>
            <h1
              style={{
                color: "white",
              }}
            >
              {statistics.products}
            </h1>
          </strong>
        </div>
        <div
          className="card"
          style={{ height: 120, backgroundColor: "#191c24" }}
        >
          <div className="card-inner">
            <strong>
              <h3
                style={{
                  color: "white",
                  fontSize: "1rem",
                  fontFamily: "Open Sans , sans-serif",
                }}
              >
                CATEGORIES
              </h3>
            </strong>
            <BsFillGrid3X3GapFill
              className="card_icon"
              style={{ color: "#C4B454" }}
            />
          </div>
          <strong>
            <h1
              style={{
                color: "white",
              }}
            >
              {statistics.categories}
            </h1>
          </strong>
        </div>
        <div
          className="card"
          style={{ height: 120, backgroundColor: "#191c24" }}
        >
          <div className="card-inner">
            <strong>
              <h3
                style={{
                  color: "white",
                  fontSize: "1rem",
                  fontFamily: "Open Sans , sans-serif",
                }}
              >
                CUSTOMERS
              </h3>
            </strong>
            <BsPeopleFill className="card_icon" style={{ color: "#1F51FF" }} />
          </div>
          <strong>
            <h1
              style={{
                color: "white",
              }}
            >
              {statistics.customers}
            </h1>
          </strong>
        </div>
        <div
          className="card"
          style={{ height: 120, backgroundColor: "#191c24" }}
        >
          <div className="card-inner">
            <strong>
              <h3
                style={{
                  color: "white",
                  fontSize: "1rem",
                  fontFamily: "Open Sans , sans-serif",
                }}
              >
                ORDERS
              </h3>
            </strong>
            <BsFillBellFill
              className="card_icon"
              style={{ color: "#D2042D" }}
            />
          </div>
          <strong>
            <h1
              style={{
                color: "white",
              }}
            >
              {statistics.orders}
            </h1>
          </strong>
        </div>
      </div>

      <div className="charts">
        <div
          style={{
            backgroundColor: "#191c24",
            height: 350,
            padding: 20,
            borderRadius: 5,
          }}
        >
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
              <Bar dataKey="Sales" fill="#0080FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            backgroundColor: "#191c24",
            height: 350,
            padding: 30,
            borderRadius: 5,
          }}
        >
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
              <Line type="monotone" dataKey="Sales" stroke="#E67E22" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;
