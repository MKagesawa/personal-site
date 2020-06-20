import React from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";

export default class IndexPage extends React.Component {
  state = {
    email: null,
  };

  _handleChange = (e) => {
    this.setState({
      [`${e.target.name}`]: e.target.value,
    });
  };

  _handleSubmit = (e) => {
    e.preventDefault();

    addToMailchimp(this.state.email, this.state)
      .then(({ msg, result }) => {

        if (result !== "success") {
          throw msg;
        }
        alert("登録成功！");
      })
      .catch((err) => {
        alert("登録失敗、もしくはすでに登録されています");
      });
  };

  render() {
    return (
      <div>
        <p>ブログ更新通知登録</p>
        <div>
          <form onSubmit={this._handleSubmit}>
            <input
              type="email"
              onChange={this._handleChange}
              placeholder="メールアドレス"
              name="email"
            />
            <br/>
            <input type="submit" value="登録" />
          </form>
        </div>
      </div>
    );
  }
}
