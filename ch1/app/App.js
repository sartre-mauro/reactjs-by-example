import React from "react";
import ReactDOM from "react-dom";

var App = React.createClass({
  render: function() {
    var headings = this.props.headings.map(function (heading) {
      return (<th>
        {heading}
      </th>);
    });

    var rows = this.props.data.map(function (row) {
      return (<tr>
        <td>{row.when}</td>
        <td>{row.who}</td>
        <td>{row.desc}</td>
      </tr>);
    });

    return (
      <div>
        <h1>{this.props.title}</h1>
        <table>
          <thead>{headings}</thead>
          {rows}
        </table>
      </div>
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

var headings = ["Last updated at", "By Author", "Summary"];
var title = "Recent Changes";

ReactDOM.render(
  <App headings={headings} data={data} title={title} />,
  document.body
);
