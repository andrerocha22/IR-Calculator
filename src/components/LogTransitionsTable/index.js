import React from "react";

import { Table } from "reactstrap";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  padding: 1em;
  background-color: #f9f9f9;
  margin-bottom: 15px;
  overflow-y: scroll;
`;

export default function LogTransitionsTable(props) {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>Ação</th>
            <th>Operação</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Taxa de Corretagem</th>
            <th>Imposto de Renda</th>
          </tr>
        </thead>
        <tbody>
          {props.content.map((tr) => {
            return (
              <tr key={tr.id}>
                <th scope="row">{tr.stockCode}</th>
                <td>{tr.operationType}</td>
                <td>R$ {Number(tr.price).toFixed(2)}</td>
                <td>{Number(tr.quant).toFixed(0)}</td>
                <td>R$ {Number(tr.brockageFee).toFixed(2)}</td>
                <td>R$ {Number(tr.IRFee).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </TableContainer>
  );
}
