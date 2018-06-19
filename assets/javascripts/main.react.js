const PRODUCTS = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

class SingleProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
                 product.name :
                 <span style={ { color: 'red' } }>{ product.name }</span>


    return (
      <tr>
        <td>{ name }</td>
        <td>{ product.price }</td>
      </tr>
    );
  }
}

class CategoryHeaderRow extends React.Component {
  render() {
    return (
      <tr>
        <th colSpan='2'>
          { this.props.category }
        </th>
      </tr>
    );
  }
}

class ProductsListTable extends React.Component {
  render() {
    const rows = [];
    let category = null;
    const keyword = this.props.filteringKeyword.trim().toLowerCase();
    const stocked = this.props.inStockOnly;

    this.props.products.forEach((product) => {
      const name = product.name.trim().toLowerCase();
      if (name.indexOf(keyword) <= -1) {
        return;
      }
      if (stocked && !product.stocked) {
        return;
      }
      if (product.category !== category) {
        category = product.category;
        rows.push(
          <CategoryHeaderRow
          key={ category }
          category={ category }
          />
        );
      }

      rows.push(
        <SingleProductRow
        key={ product.name }
        product={ product }
        />
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th> Name </th>
            <th> Price </th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    );
  }
}

class FilterableSearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleKeywordChange = (e) => {
    this.props.onKeywordChange(e);
  }

  handleCheckboxChange = (e) => {
    this.props.onCheckboxChange(e);
  }

  render() {
    return (
      <form>
        <input type='text'
               value={ this.props.filteringKeyword }
               placeholder='Search...'
               onChange={ this.props.onKeywordChange }
        />
        <p>
          <input type='checkbox'
                 checked={ this.props.inStockOnly }
                 onChange={ this.props.onCheckboxChange }
          />
          { ' ' }
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteringKeyword: '',
      inStockOnly: false
    }
  }

  handleKeywordChange = (e) => {
    this.setState({ filteringKeyword: e.target.value });
  }

  handleCheckboxChange = (e) => {
    this.setState({ inStockOnly: e.target.checked });
  }

  render() {
    return (
      <div>
        <FilterableSearchBar
          filteringKeyword={ this.state.filteringKeyword }
          inStockOnly={ this.state.inStockOnly }
          onKeywordChange={ this.handleKeywordChange }
          onCheckboxChange={ this.handleCheckboxChange }
        />
        <ProductsListTable
          filteringKeyword={ this.state.filteringKeyword }
          inStockOnly={ this.state.inStockOnly }
          products={ this.props.products }
        />
      </div>
    );
  }
}

ReactDOM.render(
  <FilterableProductsTable products={ PRODUCTS } />,
  document.getElementById('root')
);
