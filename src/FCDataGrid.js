import React, { Component } from "react";
import DataGrid, {
  GroupPanel,
  Grouping,
  Export,
  HeaderFilter,
  FilterRow,
  SearchPanel,
  ColumnChooser,
  Paging,
  Scrolling,
  Selection,
  Column,
  ColumnFixing
} from "devextreme-react/data-grid";
import ContextMenu from "devextreme-react/context-menu";

class FCDataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilterRow: false
    };
  }

  moreFunctionsClick = e => {
    // show context menu on moreFunctions clicked
  };

  onEditorPreparing = e => {
    if (e.parentType !== "searchPanel") return;

    if (!this.props.onEnterInSearchPanel) return;

    e.editorOptions.onKeyDown = e => {
      if (e.event.keyCode === 13) {
        this.props.onEnterInSearchPanel();
      }
    };
  };

  onToolbarPreparing = e => {
    if (this.props.hideFilterRow) return;

    e.toolbarOptions.items.unshift({
      location: "after",
      widget: "dxButton",
      options: {
        icon: "equal",
        hint: "Enable Filter Row",
        onClick: () => {
          this.toggleShowFilterRow();
        }
      }
    });
  };
  toggleShowFilterRow = () => {
    this.setState({ showFilterRow: !this.state.showFilterRow });
  };
  renderGridColumns(showMoreFunctionsColumn, columnConfigs) {
    const columns = [];
    if (showMoreFunctionsColumn) {
      const moreFunctionsColumnConfig = {
        type: "buttons",
        width: 60,
        fixedPosition: "left",
        buttons: [
          {
            hint: "More Function",
            icon: "more",
            visible: true,
            onClick: this.moreFunctionsClick
          }
        ]
      };

      columns.push(<Column key={"buttons"} {...moreFunctionsColumnConfig} />);
    }
    if (!columnConfigs || columnConfigs.length === 0) return columns;

    columnConfigs.forEach(col => {
      columns.push(<Column key={col.dataField} {...col} />);
    });
    return columns;
  }

  render() {
    const {
      dataSource,
      keyExpr,
      gridCssClassName,
      contextMenuItems,
      exportFileName,
      selectionMode,
      columnConfigs,
      showMoreFunctionsColumn,
      contextMenuItemClick,
      showScrollbarMode,
      hideSearchPanel = false,
      // hideFilterRow = false,
      hideExportExcel = false,
      hideColumnChooser = false,
      hideGroupPanel = false
    } = this.props;

    return (
      <div>
        <DataGrid
          {...this.props}
          elementAttr={{
            class: gridCssClassName
          }}
          dataSource={dataSource}
          keyExpr={keyExpr}
          columnAutoWidth={true}
          showBorders={true}
          allowColumnReordering={true}
          allowColumnResizing={true}
          onToolbarPreparing={
            this.props.onToolbarPreparing
              ? this.props.onToolbarPreparing
              : this.onToolbarPreparing
          }
          onEditorPreparing={this.onEditorPreparing}
        >
          <ColumnFixing enabled={true} />
          {hideGroupPanel === false && <GroupPanel visible={true} />}
          <Grouping autoExpandAll={false} />
          {hideSearchPanel === false && (
            <SearchPanel visible={true} width={250} />
          )}
          <HeaderFilter visible={true} />
          <FilterRow visible={this.state.showFilterRow} />
          {hideExportExcel === false && (
            <Export
              enabled={true}
              fileName={exportFileName ? exportFileName : "Data"}
              allowExportSelectedData={true}
            />
          )}
          {hideColumnChooser === false && <ColumnChooser enabled={true} />}

          <Selection mode={selectionMode} showCheckBoxesMode={"onClick"} />
          <Paging enabled={false} />
          <Scrolling
            showScrollbar={showScrollbarMode ? showScrollbarMode : "never"}
          />

          {this.renderGridColumns(showMoreFunctionsColumn, columnConfigs)}
        </DataGrid>

        <ContextMenu
          dataSource={contextMenuItems}
          width={200}
          target={`.${gridCssClassName} .dx-link.dx-icon-more`}
          showEvent={"dxclick"}
          onItemClick={contextMenuItemClick}
        />
      </div>
    );
  }
}

export default FCDataGrid;
