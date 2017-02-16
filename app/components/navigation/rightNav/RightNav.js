import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import RightNavButton from './rightNavButton/RightNavButton'
import { Row, Col } from 'react-flexbox-grid'
import { IoPerson } from 'react-icons/lib/io'
import { FlatButton, IconMenu, IconButton, MenuItem } from 'material-ui'
import { auth } from '../../../services/auth'

class RightNav extends Component {

    state = {
        userMenu: false
    }
    componentWillMount() {
      const { userIsAuthenticated } = this.props
      this.setState({userIsAuthenticated})
    }
    componentWillReceiveProps(nextProps) {
      const isAuthenticated = (auth.getToken())
          ? true
          : false
      const { userIsAuthenticated } = nextProps
      this.setState({userIsAuthenticated: isAuthenticated})
      this.setState({userMenu: false})
      this.setState({settings: false})
      if(auth.getUserInfo() && auth.getUserInfo().role === 'admin'){
        this.setState({userIsAdmin: true})
      }
      else{
        this.setState({userIsAdmin: false})
      }
      if(auth.getUserInfo() && auth.getUserInfo().isGroupAdmin){
        this.setState({isGroupAdmin: true})
      }
      else{
        this.setState({isGroupAdmin: false})
      }
    }

    render() {
        const { rightLinks, onRightNavButtonClick, user, userIsAuthenticated } = this.props

        return (
            <Row between='xs'>
                {
                    (userIsAuthenticated && this.state.userIsAuthenticated && this.state.userIsAdmin)
                    ?
                        rightLinks.filter(btnLink => ((btnLink.showWhenUserAuth === true) && (btnLink.showOnUserDropdown === false) && (btnLink.showOnSettingsDropdown !== true))).map((aLinkBtn, index) => {
                            return (
                                <RightNavButton key={index} link={aLinkBtn.link} label={aLinkBtn.label}
                                    viewName={aLinkBtn.view} onClick={onRightNavButtonClick}/>
                            )
                        })
                    :
                    <div>{
                        (userIsAuthenticated && this.state.userIsAuthenticated && !this.state.userIsAdmin && this.state.isGroupAdmin)
                        ?
                        rightLinks.filter(btnLink => ((btnLink.showWhenUserAuth === true) && (btnLink.showOnUserDropdown === false) && (btnLink.showOnSettingsDropdown !== true) && (btnLink.showOnlyGlobalAdmin !== true))).map((aLinkBtn, index) => {
                                return (
                                    <RightNavButton key={index} link={aLinkBtn.link} label={aLinkBtn.label}
                                        viewName={aLinkBtn.view} onClick={onRightNavButtonClick}/>
                                )
                            })
                        :
                        <div>
                          {
                            (userIsAuthenticated && this.state.userIsAuthenticated && !this.state.userIsAdmin && !this.state.isGroupAdmin)
                            ?
                                rightLinks.filter(btnLink => ((btnLink.showWhenUserAuth === true) && (btnLink.showOnUserDropdown === false) && (btnLink.showAdminOnly === false))).map((aLinkBtn, index) => {
                                    return (
                                        <RightNavButton key={index} link={aLinkBtn.link} label={aLinkBtn.label}
                                            viewName={aLinkBtn.view} onClick={onRightNavButtonClick}/>
                                    )
                                })
                            :
                            rightLinks.filter(btnLink => ((btnLink.showWhenUserAuth === false) || (btnLink.alwaysShows === true))).map((aLinkBtn, index) => {
                                return (
                                    <RightNavButton key={index} link={aLinkBtn.link} label={aLinkBtn.label}
                                        viewName={aLinkBtn.view} onClick={onRightNavButtonClick}/>
                                    )
                            })
                          }
                        </div>

                    }
                    </div>
                }
                {
                    (userIsAuthenticated && this.state.userIsAuthenticated && (this.state.isGroupAdmin || this.state.userIsAdmin))
                    ?
                    <div>
                    <FlatButton onTouchTap={this.handleSettingsClick}
                        label='Settings' hoverColor={'none'}
                        labelStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <IconMenu
                        open={this.state.settings}
                        iconButtonElement={<IconButton style={{ display: 'none' }}></IconButton>}
                        onRequestChange={this.handleOnRequestChange}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            {
                                rightLinks.filter(btnLink => ((btnLink.showWhenUserAuth === true) && (btnLink.showOnSettingsDropdown === true))).map((aLinkBtn, index) => {
                                      return (
                                          <Link key={index} to={aLinkBtn.link} onClick={this.handleRightNavItemClick}>
                                              <MenuItem primaryText={aLinkBtn.label}/>
                                          </Link>
                                      )
                                })
                            }
                    </IconMenu>
                    </div>
                    :
                        null
                }

                {
                    (userIsAuthenticated && this.state.userIsAuthenticated)
                    ?
                    <div>
                    <FlatButton onTouchTap={this.handleUsernameClick}
                        label={user.username} hoverColor={'none'}
                        labelStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                        icon={<IoPerson/>}
                    />
                    <IconMenu
                        open={this.state.userMenu}
                        iconButtonElement={<IconButton style={{ display: 'none' }}></IconButton>}
                        onRequestChange={this.handleOnRequestChange}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            {
                                rightLinks.filter(btnLink => ((btnLink.showWhenUserAuth === true) && (btnLink.showOnUserDropdown === true))).map((aLinkBtn, index) => {
                                    if(aLinkBtn.label === 'Logout'){
                                      return (
                                          <Link key={index} to={aLinkBtn.link} onClick={this.handleLogout}>
                                              <MenuItem primaryText={aLinkBtn.label}/>
                                          </Link>
                                      )
                                    }
                                    else{
                                      return (
                                          <Link key={index} to={aLinkBtn.link} onClick={this.handleRightNavItemClick}>
                                              <MenuItem primaryText={aLinkBtn.label}/>
                                          </Link>
                                      )
                                    }
                                })
                            }
                    </IconMenu>
                    </div>
                    :
                        null
                }
            </Row>
        )
    }

    handleRightNavItemClick = (event) => {
        const { onRightNavButtonClick, viewName } = this.props
        onRightNavButtonClick(event, viewName)
    }

    handleOnRequestChange = (event, value) => {
        if (value === 'clickAway')
            this.setState({ userMenu: false })
            this.setState({ settings: false })
    }

    handleUsernameClick = event => {
        const { userMenu } = this.state
        this.setState({ userMenu: !userMenu })
    }
    handleSettingsClick = event => {
        const { settings } = this.state
        this.setState({ settings: !settings })
    }
    handleLogout = event => {
        auth.clearAllAppStorage()
        this.setState({userIsAuthenticated: false})
    }
}

RightNav.propTypes = {
    rightLinks: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string,
        label: PropTypes.string,
        viewName: PropTypes.string
    })),
    onRightNavButtonClick: PropTypes.func,
    user: PropTypes.object,
    userIsAuthenticated: PropTypes.bool.isRequired
}

export default RightNav
