import React from "react";
import { render } from "react-dom";
import { machine } from "./machine";
import { useMachine } from "@xstate/react";
import { RenderReport } from "./renderReport";

const Report = () => {
  const [current, send] = useMachine(machine, { devTools: true });

  return (
    <section>
      {current.matches("ready") && (
        <button onClick={() => send("BUTTON_CLICKED")}>Show Report</button>
      )}
      {current.matches("fetching") && <p>loading...</p>}
      {current.matches("showReport") && <RenderReport machine={current} />}
      {current.matches("error") && <p>An error occured</p>}
    </section>
  );
};

const rootElement = document.getElementById("root");

render(<Report />, rootElement);
