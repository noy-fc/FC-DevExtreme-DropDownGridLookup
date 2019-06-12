import React, { Component } from "react";
import { DropDownBox } from "devextreme-react";
import FCDataGrid from "./FCDataGrid";
import DataGrid, { KeyboardNavigation } from "devextreme-react/data-grid";

class FCDropDownCombo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridBoxValue: null,
      gridSelectedRowKeys: []
    };
  }

  handleValueChanged = e => {
    this.setState({
      gridBoxValue: e.value,
      gridSelectedRowKeys: !e.value ? [] : [e.value]
    });
  };

  handleSelectionChanged = e => {
    const newValue = (e.selectedRowKeys.length && e.selectedRowKeys[0]) || null;
    this.setState({
      gridBoxValue: newValue,
      gridSelectedRowKeys: !newValue ? [] : [newValue]
    });
  };
  gridBox_displayExpr = item => {
    return item && `${item[this.props.displayExpr]}`;
  };

  handleRowClick = () => {
    this.dropdown.instance.close();
    this.dropdown.instance.focus();
  };

  onOptionChanged = e => {
    if (e.fullName === "searchPanel.text") {
      e.component.__searchChanged = true;
      this.onSearchCallback(e.component);
    }
  };

  onSearchCallback = grid => {
    setTimeout(() => {
      grid.selectRowsByIndexes([0]);
    }, 200);
  };

  onEnterInSearchPanel = () => {
    if (
      !this.state.gridSelectedRowKeys ||
      this.state.gridSelectedRowKeys.length === 0
    )
      return;

    this.dropdown.instance.close();
    this.dropdown.instance.focus();
  };

  renderGrid = e => {
    const gridJsx = (
      <FCDataGrid
        {...this.props}
        // dataSource={dataSource}
        ref={ref => (this.dataGrid = ref)}
        keyExpr={this.props.valueExpr}
        gridCssClassName={"dropdown-grid1"}
        // columnConfigs={this.getColumnsConfig()}
        selectionMode={"single"}
        showMoreFunctionsColumn={false}
        showScrollbarMode={"always"}
        // contextMenuItems={contextMenuItems}
        // contextMenuItemClick={this.contextMenuItemClick}
        hideFilterRow={true}
        // hideSearchPanel={true}
        hideExportExcel={true}
        hideColumnChooser={true}
        hideGroupPanel={true}
        hoverStateEnabled={true}
        onSelectionChanged={this.handleSelectionChanged}
        onRowClick={this.handleRowClick}
        onOptionChanged={this.onOptionChanged}
        onEnterInSearchPanel={this.onEnterInSearchPanel}
      />
    );
    return gridJsx;
  };

  render() {
    const { placeholder } = this.props;
    const { gridBoxValue } = this.state;
    return (
      <DropDownBox
        {...this.props}
        ref={ref => (this.dropdown = ref)}
        value={gridBoxValue}
        displayExpr={this.gridBox_displayExpr}
        deferRendering={false}
        placeholder={!placeholder ? "Select a value..." : placeholder}
        showClearButton={true}
        onValueChanged={this.handleValueChanged}
        contentRender={this.renderGrid}
        onOpened={this.onOpened}
      />
    );
  }
}

export default FCDropDownCombo;
