import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ChartContainer = styled.div`
  float: left;
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  overflow: hidden;
`;

function TransactionChart(props) {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="stockCode" />
          <YAxis />
          <Bar dataKey="quant" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default TransactionChart;
