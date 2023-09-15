import './index.css'

const Password = props => {
  const {item, clsName, delPsw, isChecked} = props
  const {website, username, password, id} = item

  const callFun = () => {
    delPsw(id)
  }

  return (
    <li className="list">
      <div className="c-div">
        <p className={`wbs-logo ${clsName}`}>{website[0].toUpperCase()}</p>
        <div className="content">
          <p className="text">{website}</p>
          <p className="text">{username}</p>
          {!isChecked ? (
            <div className="star-img-div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                alt="stars"
                className="stars-img"
              />
            </div>
          ) : (
            <p className="text">{password}</p>
          )}
        </div>
      </div>
      <div className="del-div">
        <button type="button" className="del-btn" data-testid="delete">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="del-img"
            onClick={callFun}
          />
        </button>
      </div>
    </li>
  )
}

export default Password
