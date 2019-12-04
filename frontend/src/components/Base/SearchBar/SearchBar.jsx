import React, { Component } from 'react';
import { Search, Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      username: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onResultSelect = this.onResultSelect.bind(this);
  }

  onResultSelect(e, { result }) {
    // console.log("called!!");
    this.props.history.push(`/profile/${result.content.id}`);
  }

  onSearchChange(e, { value }) {
    this.setState({
      isLoading: true,
      username: value,
      results: [],
    });
    

    setTimeout(async () => {
      // simple debouncing
      /* if (this.state.username !== value) {
        return;
      } */

      const idResponse = await fetch(`/account/by-name/${this.state.username}`);
      if (idResponse.status !== 200) {
        this.setState({ isLoading: false });
        // TODO: report error to user
        return;
      }
      const { id: userId } = await idResponse.json();

      const profileResponse = await fetch(`/account/user/${userId}`);
      if (profileResponse.status !== 200) {
        if (this.state.username === value) {
          this.setState({ isLoading: false });
        }
        // TODO: report error to user
        return;
      }
      const user = await profileResponse.json();

      // it may all have been for naught
      /* if (this.state.username !== value) {
        return;
      } */

      this.setState((state) => ({
        isLoading: false,
        results: [{
          id: userId,
          title: state.username,
          content: user,
          // TODO: display other user attributes
        }],
      }));
    }, 300);
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={8}>
          <div id="search-bar">
            <Search
              loading={this.state.isLoading}
              onResultSelect={this.onResultSelect}
              onSearchChange={this.onSearchChange}
              results={this.state.results}
              value={this.state.username}
            />
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(SearchBar);
