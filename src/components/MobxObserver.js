//extends this if u want to make the component as observer
import React, { Component } from "react";
import { observer } from "mobx-react";

const MobxObserver = observer(props => <React.Fragment>{props.children}</React.Fragment>);
export default MobxObserver;
