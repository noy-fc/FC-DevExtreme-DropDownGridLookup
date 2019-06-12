import React, { Component } from "react";
// import Form, { SimpleItem, ButtonItem, Label } from "devextreme-react/form";
// import { SelectBox, TextBox } from "devextreme-react";
import { users } from "./data";

import FCDropDownCombo from "./FCDropDownCombo";

class App extends Component {
  getColumnsConfig() {
    const configs = [
      { dataField: "id", caption: "id", dataType: "string", visible: false },
      { dataField: "name", caption: "Name", dataType: "string" },
      { dataField: "username", caption: "User Name", dataType: "string" },
      { dataField: "email", caption: "Email", dataType: "string" }
    ];
    return configs;
  }

  render() {
    return (
      <div>
        This is devextreme initial project
        <FCDropDownCombo
          dataSource={users}
          valueExpr={"id"}
          displayExpr={"name"}
          columnConfigs={this.getColumnsConfig()}
        />
        <input type="input" value="test" />
      </div>
    );
  }
}

export default App;
