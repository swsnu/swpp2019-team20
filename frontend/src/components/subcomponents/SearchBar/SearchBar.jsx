import _ from 'lodash';
import faker from 'faker';
import React, { Component } from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import './SearchBar.css';

const initialState = { isLoading: false, results: [], value: '' }

const getResults = () =>
  _.times(5, () => ({
    title: faker.name.findName(),
    description: faker.name.jobTitle(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 10, 1, 'score: '),
  }))

const type = ['Favorite', 'Recent', 'New']
let count = 0;
const source = _.range(0, 3).reduce((memo) => {
  const name = type[count++];
  console.log(name);

  // eslint-disable-next-line no-param-reassign
  memo[name] = {
    name,
    results: getResults(),
  }

  return memo
}, {})

export default class SearchBar extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      const filteredResults = _.reduce(
        source,
        (memo, data, name) => {
          const results = _.filter(data.results, isMatch)
          if (results.length) memo[name] = { name, results } // eslint-disable-line no-param-reassign

          return memo
        },
        {},
      )

      this.setState({
        isLoading: false,
        results: filteredResults,
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            category
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
