import React from "react";

import { Table } from "reactstrap";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  padding: 1em;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 15px;
  overflow-y: scroll;
`;

const TableRow = styled.tr`
  text-align: center;
`;

export default function LogTransitionsTable(props) {
  return (
    <TableContainer>
      <Table>
        <thead>
          <TableRow>
            <th>Ação</th>
            <th>Operação</th>
            <th>Preço</th>
            <th>Quant.</th>
            <th>Taxa</th>
            <th>IR</th>
          </TableRow>
        </thead>
        <tbody>
          {props.content.map((tr) => {
            return (
              <TableRow key={tr.id}>
                <th scope="row">{tr.stockCode}</th>
                <td>{tr.operationType}</td>
                <td>R$ {Number(tr.price).toFixed(2)}</td>
                <td>{Number(tr.quant).toFixed(0)}</td>
                <td>R$ {Number(tr.brockageFee).toFixed(2)}</td>
                <td>R$ {Number(tr.IRFee).toFixed(2)}</td>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </TableContainer>
  );
}
