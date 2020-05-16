import React from "react";

import { Table } from "reactstrap";
import styled from "styled-components";
import moment from "moment";

const TableContainer = styled.div`
  width: 100%;
  height: 45vh;
  padding: 1em;
  background-color: #FFFFFF;
  overflow-y: scroll;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(78, 141, 220, 1);
  -moz-box-shadow: 0px 0px 6px 0px rgba(78, 141, 220, 1);
  box-shadow: 0px 0px 6px 0px rgba(78, 141, 220, 1);
`;

const TableRow = styled.tr`
  text-align: center;
`;

const TableHead = styled.thead`
  color: #5A1490;
`;

export default function LogTransitionsTable(props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <th>Data</th>
            <th>Papel</th>
            <th>Operação</th>
            <th>$</th>
            <th>Qnt.</th>
            <th>C</th>
            <th>Preço Medio</th>
            <th>IR</th>
          </TableRow>
        </TableHead>
        <tbody>
          {props.content
            .slice(0)
            .reverse()
            .map((tr) => {
              if (!tr.authorized) return;
              return (
                <TableRow key={tr.id}>
                  <th scope="row">{moment(tr.date).format("DD-MM-YYYY")}</th>
                  <td>{tr.stockCode}</td>
                  <td>{tr.operationType}</td>
                  <td>R$ {Number(tr.price).toFixed(2)}</td>
                  <td>{Number(tr.quant).toFixed(0)}</td>
                  <td>R$ {Number(tr.brockageFee).toFixed(2)}</td>
                  <td>R$ {Number(tr.PM).toFixed(2)}</td>
                  <td>R$ {Number(tr.IR).toFixed(2)}</td>
                </TableRow>
              );
            })}
        </tbody>
      </Table>
    </TableContainer>
  );
}
