import axios from "axios";
import React, { useEffect, useState } from "react";
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

function Home() {
  const data = [
    {
      name: "Page A",
      uv: 4000,

      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,

      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,

      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,

      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,

      amt: 2181,
    },
  ];

  const [statistics, setStatistics] = useState({
    products: null,
    custumers: null,
    categories: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5001/v1/count")
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
            <h1 style={{ color: "#FFFF00" }}>{statistics.products}</h1>
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
            <h1 style={{ color: "#FFFF00" }}>{statistics.categories}</h1>
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
            <h1 style={{ color: "#FFFF00" }}>{statistics.customers}</h1>
          </strong>
        </div>
        <div className="card" style={{ height: 120 }}>
          <div className="card-inner">
            <strong>
              <h3 style={{ color: "#01DFD7" }}>ALERTS</h3>
            </strong>
            <BsFillBellFill
              className="card_icon"
              style={{ color: "#01DFD7" }}
            />
          </div>
          <strong>
            <h1 style={{ color: "#FFFF00" }}>300</h1>
          </strong>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={100}
            height={300}
            data={data}
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
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
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
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
