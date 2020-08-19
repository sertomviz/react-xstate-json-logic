import { Machine, assign } from "xstate";
import { fetchData } from "./fetchData";

export const machine = Machine({
  id: "testReport",
  initial: "ready",
  context: {
    data: null
  },
  states: {
    ready: {
      on: {
        BUTTON_CLICKED: "fetching"
      }
    },
    fetching: {
      invoke: {
        src: fetchData,
        onDone: {
          target: "showReport",
          actions: assign({
            data: (_, event) => event.data
          })
        },
        onError: "error"
      }
    },
    showReport: {
      type: "parallel",
      states: {
        hour: {
          invoke: {
            id: "#0",
            src: "simpleCell",
            data: {
              headerText: "GODZ",
              accessor: "hour"
            }
          }
        },
        cycle: {
          invoke: {
            id: "#1",
            src: "simpleCell",
            data: {
              headerText: "Cykl",
              accessor: "cycle"
            }
          }
        },
        timeToReport: {
          invoke: {
            id: "#2",
            src: "simpleCell",
            data: {
              headerText: "Czas raportowania",
              accessor: "time"
            }
          }
        },
        realTarget: {
          invoke: {
            id: "#3",
            src: "formulaCell",
            data: {
              headerText: "SUMA",
              conditionalStyle: {
                // {"if": [{">": [ {var: "cycle"}, 10 }, 'color.blue', 'color.red']}
              },
              formula: {
                "+": [{ var: "cycle" }, { var: "time" }]
              }
            }
          }
        },
        multiply: {
          invoke: {
            id: "#4",
            src: "formulaCell",
            data: {
              headerText: "ILOCZYN",
              conditionalStyle: {
                // {"if": [{">": [ {var: "cycle"}, 10 }, 'color.blue', 'color.red']}
              },
              formula: {
                "*": [{ var: "cycle" }, { var: "time" }]
              }
            }
          }
        }
      }
    },
    error: {}
  }
});
