import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

export default class SearchPanel extends Component {
  static propTypes = {
    text: PropTypes.string,
    updateData: PropTypes.func,
  };

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

  searchUpdateData = () => {
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
