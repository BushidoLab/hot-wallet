import React from 'react';

class PasswordForm extends React.Component {
  state = {
    password: '',
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <form>
        <input type="text" onChange={this.handleChange} />
        <button>Submit</button>
      </form>
    );
  }

}

export default PasswordForm;
