import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { configure } from "mobx";

//Enable strict mode for MobX. This disallows state changes outside of an action
configure({ enforceActions: true });

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
