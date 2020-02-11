import React from "react";

export default class UserNameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: ""
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChange(e) {
        this.setState({
            userName: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.userName)
    }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="usernameForm" ><h2>Select a Username: </h2></label>
            <input
              className="form-control usernameForm"
              type="text"
              name="usernameForm"
            placeholder="Enter your Username here."
            onChange={this.onChange}
            />
                <input type="submit" className="mt-1 btn btn-warning" value="Submit"/>
            </div>
        </form>
      </div>
    );
  }
}
