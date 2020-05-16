import React from "react";

import { Table } from "reactstrap";
import {
  MdCompareArrows,
  MdArrowBack,
  MdArrowForward,
  MdDeleteForever,
} from "react-icons/md";
import styled from "styled-components";
import moment from "moment";

const TableContainer = styled.div`
  width: 100%;
  height: 45vh;
  padding: 1em;
  overflow-y: scroll;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(78, 141, 220, 1);
  -moz-box-shadow: 0px 0px 6px 0px rgba(78, 141, 220, 1);
  box-shadow: 0px 0px 6px 0px rgba(78, 141, 220, 1);
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const TableRow = styled.tr`
  text-align: center;
`;

const TableHead = styled.thead`
  color: #5a1490;
`;

function OperationsLogTable(props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <th>
              <MdCompareArrows />
            </th>
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
                  <th scope="row">
                    {tr.operationType === "Compra" ? (
                      <MdArrowBack style={{ color: "#36D95F" }} />
                    ) : (
                      <MdArrowForward style={{ color: "#B3000A" }} />
                    )}
                  </th>
                  <td>{moment(tr.date).format("DD-MM-YYYY")}</td>
                  <td>{tr.stockCode}</td>
                  <td>{tr.operationType}</td>
                  <td>R$ {Number(tr.price).toFixed(2)}</td>
                  <td>{Number(tr.quant).toFixed(0)}</td>
                  <td>R$ {Number(tr.brockageFee).toFixed(2)}</td>
                  <td>R$ {Number(tr.PM).toFixed(2)}</td>
                  <td>R$ {Number(tr.IR).toFixed(2)}</td>
                  <td>
                    <Button onClick={() => props.removeHandler(tr.id)}>
                      <MdDeleteForever style={{ color: "#B3211E" }}/>
                    </Button>
                  </td>
                </TableRow>
              );
            })}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default OperationsLogTable;
