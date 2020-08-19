import React from "react";
import styled from "styled-components";
import { FormulaCell } from "./formulaCell";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export const RenderReport = ({ machine }) => {
  const rows = machine.context.data;
  // Render the UI for your table
  return (
    <Styles>
      <table>
        <thead>
          <tr>
            {Object.keys(machine.children).map((childId, i) => {
              const { meta } = machine.children[childId];
              return <th>{meta.data.headerText}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            return (
              <tr>
                {Object.keys(machine.children).map((childId, i) => {
                  const service = machine.children[childId];
                  const meta = service.meta;

                  switch (meta.src) {
                    case "simpleCell":
                      return <td>{row[meta.data.accessor]}</td>;
                    case "formulaCell":
                      return (
                        <td>
                          <FormulaCell data={row} formula={meta.data.formula} />
                        </td>
                      );
                    default:
                      return <td />;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};
