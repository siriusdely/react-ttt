var placeholder = document.createElement("li");
placeholder.className = "placeholder";

var List = createReactClass({
  getInitialState: function() {
    return {data: this.props.data};
  },
  dragStart: function(e) {
    this.dragged = e.target;
    e.dataTransfer.effectAllowed = "move";
    // Firefox requires dataTransfer data to be set
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragOver: function(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className === "placeholder") return;
    this.over = e.target;
    // Inside the dragOver method
    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    // console.log(e.clientY, this.over.offsetTop, relY, this.over.offsetHeight, height)
    var parent = this.over.parentNode;
    if (relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(placeholder, this.over.nextElementSibling);
    } else if (relY < height) {
      this.nodePlacement = "before"
      parent.insertBefore(placeholder, this.over);
    }
  },
  dragEnd: function(e) {
    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);
    // Update data
    var data = this.state.data;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to) to--;
    if (this.nodePlacement === "after") to++;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({data: data});
  },
  render: function() {
    var listItems = this.state.data.map((function(item, i) {
      return (
        <li data-id={i}
            key={i}
            draggable="true"
            onDragEnd={this.dragEnd}
            onDragStart={this.dragStart}>
          {item}
        </li>
      );
    }).bind(this));
    return <ul onDragOver={this.dragOver}>{listItems}</ul>
  }
});

var colors = ["Red","Green","Blue","Yellow","Black","White","Orange"];

ReactDOM.render(
  <List data={colors} />,
  document.getElementById("root")
);
