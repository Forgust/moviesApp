import { Component } from 'react';
import { Input } from 'antd';

export default class SearchPanel extends Component {
  state = {
    value: '',
  };
  componentDidMount() {
    const { text } = this.props;
    this.setState({
      value: text,
    });
  }
  searchControl = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  searchUpdateData = (e) => {
    this.props.updateData(this.state.value);
  };

  render() {
    return (
      <Input
        size="large"
        placeholder="Type to search..."
        onChange={this.searchControl}
        value={this.state.value}
        onKeyUp={this.searchUpdateData}
      />
    );
  }
}
