import {Component} from 'react'
import './index.css'
import {v4 as uuidV4} from 'uuid'
import Password from '../Password'

const clsBgList = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

class PasswordManger extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    searchInput: '',
    isChecked: false,
  }

  num = 0

  getWebsite = event => {
    this.setState({website: event.target.value})
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  getDetails = event => {
    event.preventDefault()
    console.log('onSubmit')
    console.log(event)
    const {website, username, password} = this.state
    if (website !== '' && username !== '' && password !== '') {
      const newPassword = {
        id: uuidV4(),
        website,
        username,
        password,
        num: this.num,
      }
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPassword],
        website: '',
        username: '',
        password: '',
      }))
      if (this.num === 6) {
        this.num = 0
      } else {
        this.num += 1
      }
    }
  }

  delPsw = id => {
    const {passwordsList} = this.state
    const newPswList = passwordsList.filter(eachItem => eachItem.id !== id)
    this.setState({passwordsList: newPswList})
  }

  getSearch = event => {
    this.setState({searchInput: event.target.value.toLowerCase()})
  }

  getFilteredList = passwordsList => {
    const {searchInput} = this.state
    const filteredList = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput),
    )
    return filteredList
  }

  checkBox = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  render() {
    const {website, username, password, passwordsList, isChecked} = this.state
    const count = passwordsList.length
    const filteredList = this.getFilteredList(passwordsList)
    return (
      <div className="page-div">
        <div className="app-div">
          <div className="logo-div">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="logo"
            />
          </div>
          <div className="top-section">
            <form className="form-div" onSubmit={this.getDetails}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="input-div">
                <div className="input-logo-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-logo"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  onChange={this.getWebsite}
                  value={website}
                />
              </div>
              <div className="input-div">
                <div className="input-logo-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                    alt="username"
                    className="input-logo"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.getUsername}
                  value={username}
                />
              </div>
              <div className="input-div">
                <div className="input-logo-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-logo"
                  />
                </div>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.getPassword}
                  value={password}
                />
              </div>
              <div className="submit-div">
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
            <div className="psw-img-div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="psMng-lg"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
                alt="password manager"
                className="psMng-sm"
              />
            </div>
          </div>
          <div className="bottom-section">
            <div className="btm-menu">
              <div className="btm-heading-div">
                <h1 className="btm-heading">Your Passwords</h1>
                <p className="psw-count">{count}</p>
              </div>
              <div className="search-input-div">
                <div className="search-img-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-img"
                  />
                </div>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.getSearch}
                />
              </div>
            </div>
            <div className="cbx-div">
              <input
                type="checkbox"
                className="cbx"
                id="checkboxId"
                onChange={this.checkBox}
              />
              <label className="sp-text" htmlFor="checkboxId">
                Show password
              </label>
            </div>
            {filteredList.length === 0 ? (
              <div className="no-psw-div">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                  alt="no passwords"
                  className="no-psw-img"
                />
                <p className="no-psw-text">No Passwords</p>
              </div>
            ) : (
              <ul className="psw-list-div">
                {filteredList.map(eachItem => (
                  <Password
                    item={eachItem}
                    key={eachItem.id}
                    clsName={clsBgList[eachItem.num]}
                    delPsw={this.delPsw}
                    isChecked={isChecked}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManger
