import React from "react";
import ReactDOM from "react-dom";

var RecentChangesTable = React.createClass({
  render: function() {
    return (
      <table className="recent-changes-table">
        {this.props.children}
      </table>
    );
  }
});

RecentChangesTable.Heading = React.createClass({
  render: function() {
    return (
      <th>{this.props.heading}</th>
    );
  }
});

RecentChangesTable.Headings = React.createClass({
  render: function() {
    var headings = this.props.headings.map(function (name, index) {
      return <RecentChangesTable.Heading
        key = {index}
        heading = {name} />;
    });
    return (
      <thead><tr>{headings}</tr></thead>
    );
  }
});

RecentChangesTable.Row = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.changeSet.when}</td>
        <td>{this.props.changeSet.who}</td>
        <td>{this.props.changeSet.desc}</td>
      </tr>
    );
  }
});

RecentChangesTable.Rows = React.createClass({
  render: function() {
    var rows = this.props.changeSets.map(function (changeSet, index) {
      return <RecentChangesTable.Row
        changeSet = {changeSet}
        key = {index} />;
    });

    return (
      <tbody>{rows}</tbody>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <RecentChangesTable>
        <RecentChangesTable.Headings headings = {this.props.headings} />
        <RecentChangesTable.Rows changeSets = {this.props.changeSets} />
      </RecentChangesTable>
    );
  }
});

var data = [
  {
    "when": "2 minutes ago",
    "who": "Jill Dupre",
    "desc": "Created new account"
  },
  {
    "when": "1 hour ago",
    "who": "Lose White",
    "desc": "Added fist chapter"
  },
  {
    "when": "2 hours ago",
    "who": "Jordan Whash",
    "desc": "Created new account"
  },
];

// var headings = ["Last updated at", "By Author", "Summary"];
var headings = ["Updated at", "Author", "Change"];
var title = "Recent Changes";

var props = { headings: headings, changeSets: data, title: title };

ReactDOM.render(
  <App {...props} />,
  document.getElementById("container")
);
