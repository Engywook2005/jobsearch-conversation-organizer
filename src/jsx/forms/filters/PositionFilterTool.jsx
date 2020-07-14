import FormHelper from '../../../utils/FormHelper';
import React, {Component} from 'react';
import Ajax from '../../../http/ajax';

class PositionFilterTool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: 'Employer',
      searchString: '',
      searchResults: [],
      foundSearchString: '',
      foundId: 0
    };

    this.updateState = this.updateState.bind(this);
  }

  updateState(newState) {
    this.setState(newState);
  }

  render() {
    const selectorStyle = {
      float: 'left'
    }

    return (<section
      style={selectorStyle}
    >
      <this.FilterPulldown
        updateState={this.updateState}
        selectedFilter={this.state.selectedFilter}
      />
      <this.SelectText
        selectedFilter={this.state.selectedFilter}
        searchString={this.state.searchString}
        searchResults={this.state.searchResults}
        updateState={this.updateState}
        foundSearchString={this.state.foundSearchString}
        component={this}
      />
    </section>);
  }

  SelectText(props) {

    const handleTextChange = function(e) {
      const {target} = e;
      const callback = (passTarget) => {

        if(passTarget === target) {
          const {value} = target;

          props.updateState(
            {
              searchString: value,
              searchResults: []
            }
          )
        }
      }

      props.updateState({foundSearchString: target.value})
      FormHelper.debounceAction(target, callback);
    }

    return(
      <div>
        <input
          type="text"
          onChange={handleTextChange}
          placeholder={props.selectedFilter}
          value={props.foundSearchString}
        />
        <props.component.MatchList
          searchString={props.searchString}
          searchResults={props.searchResults}
          selectedFilter={props.selectedFilter}
          updateState={props.updateState}
          component={props.component}
        />
      </div>
    );
  }

  MatchList(props) {
    if(props.searchString === '') {
      return <div/>;
    }

    // If there is a searchString but no results.
    if(props.searchResults.length === 0) {
      const queryURL = `/search/findFilters.json?filter=${props.selectedFilter}&searchString=${props.searchString}`;

      Ajax.doAjaxQuery(queryURL)
        .then((data) => {
          const searchResults = JSON.parse(data);
          if(searchResults.length === 0) {
            searchResults[0] = {err: 'Nothing found'}
          } else if(props.searchResults[0].value === props.searchString) {
            props.updateState({
              searchResults: [],
              searchString: ''
            })
          } else {
            props.updateState({searchResults: searchResults});
          }
        })
        .catch((err) => {
          props.updateState({searchResults: [
              {err: err}
            ]
          })
        });

      return <div>Searching...</div>;
    }

    // If some results are found (even just an error)
    return(
      <div>
        {
          props.searchResults.map((result, i) => (
              <props.component.SearchResultButton
                updateState={props.updateState}
                resultItem={result}
                key={result.id || i}
                ind={result.id || i}
              />
            )
          )
        }
      </div>
    )
  }

  SearchResultButton(props) {

    const onClick = () => {
      props.updateState(
        {
          foundSearchString: props.resultItem.value,
          foundId: props.id
        }
      )
    };

    if(props.resultItem.err) {
      return(<div>{props.resultItem.err}</div>);
    }

    return(<button
      type="button"
      onClick={onClick}
    >{props.resultItem.value}</button>)
  }

  FilterPulldown(props) {
    return(
      <select
        onChange={(e) => {
          props.updateState(
              {
                selectedFilter : e.target.value,
                searchString: '',
                searchResults: [],
                foundSearchString: '',
                foundId: 0
              }
            );
        }}
        value={props.selectedFilter}
      >
        <option value='Employer'>employers</option>
        <option value='Recruiter'>recruiters</option>
        <option value='Contact'>contacts</option>
      </select>
    );
  }

}

module.exports = PositionFilterTool;
