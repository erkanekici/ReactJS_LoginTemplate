import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import LanguageIcon from '@material-ui/icons/Language';
import AccountIcon from '@material-ui/icons/AccountCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { Logo } from '../styled/Layout'
import LogoWeb from '../../images/logoWeb.png'
import LogoMobile from '../../images/logoMobile.png'
import MediaQuery from 'react-responsive'

class TopMenu extends Component {

  state = {
    openLangList: false,
    anchor: null,
    accountButtonEffect: "black"
  }

  componentDidMount() { }

  addColor = event => {
    this.setState({ accountButtonEffect: "#27c007" }) //#27c007 yeşil
    //this.handleClick(event);
    //this.setState({ anchor: event.currentTarget })
  }
  removeColor = event => {
    this.setState({ accountButtonEffect: "black" })
    //this.setState({ anchor: null })
  }

  preventDefault = event => {
    event.preventDefault();
  };

  handleClick = event => {
    this.setState({ anchor: event.currentTarget })
  };

  handleClose(event) {
    this.setState({ anchor: null })
  }

  goLogin = () => {
    this.setState({ anchor: null })
    this.props.setContent("mainContent")
    this.props.changePage("login")
  };

  goRegister = () => {
    this.setState({ anchor: null })
    this.props.setContent("mainContent")
    this.props.changePage("register")
  };

  handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.setState({ anchor: null })
    }
  }

  render() {
    const fontStyle = {  //variant="h6"     
      fontSize: "1.25rem",
      fontFamily: '"Roboto", "Helvetica", "Arial" , "sans-serif"',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
      backgroundColor: "black"
    }
    const accountButtonStyle = {
      marginLeft: 5,
      fontSize: "1.25rem",
      textTransform: "unset",
      backgroundColor: this.state.accountButtonEffect,
      color: "white"
    }
    const accountButtonStyleMobile = {
      //marginLeft: 5,
      minWidth: "auto",
      fontSize: "1.25rem",
      textTransform: "unset",
      backgroundColor: this.state.accountButtonEffect,
      color: "white"
    }
    const linkStyle = {
      marginLeft: 10,
      marginRight: 10,
      marginTop: -2,
      color: "white"
    }
    const linkButtonStyle = {
      marginLeft: 10,
      marginRight: 10,
      color: "white"
    }
    const linkButtonStyleMobile = {
      marginLeft: 5,
      marginRight: 5,
      color: "white"
    }
    const appBarStyle = {
      backgroundColor: "black",
      textAlign: "center",
      zIndex: 1201
    }
    const dividerStyle = {
      borderStyle: "inset",
      borderWidth: "1px",
      height: "21px",
      marginBottom: 1
    }
    const menuDividerStyle = {
      backgroundColor: "#e5e5e5"
    }
    const accountMenuStyle = {
      //marginTop: "40px",
      width: "140px",
      color: "#fff",
      backgroundColor: "black",
      //borderStyle: "solid",
      //borderColor: "black",

    }

    const link = "http://localhost:3000";
    return (
      <Fragment>
        <div style={fontStyle}>
          <AppBar position="static" style={appBarStyle} elevation={10} >
            <Container maxWidth="xl" style={{ padding: 0 }}>
              <Toolbar variant="dense" style={{ padding: 0 }} >
                <MediaQuery query={`(min-width:1150px)`}>
                  <a href={link} style={{ flexGrow: 0, height: "70px", marginRight: "20px" }}>
                    <Logo alt="topLogo" src={LogoWeb} />
                  </a>
                  {/* <Link
                style={linkButtonStyle}
                color="inherit"
                //variant="h6"
                //component="button"
                href={link}
                //onClick={() => { }}
              >
                Ana Sayfa
              </Link>               */}
                  {<Typography variant="h6" style={{ flexGrow: 1 }}></Typography>}
                  {this.props.isDashboard ? (
                    <Link
                    style={linkStyle}
                    color="inherit"
                    component="button"                   
                    onClick={() => { this.props.setContent("mainContent") }}                 
                  >
                    Ana Menü
                  </Link>
                  ) : (
                    <Link
                    style={linkStyle}
                    color="inherit"                   
                    href={link}                 
                  >
                    Anasayfa
                  </Link>
                  )}
                  
                  <Divider style={dividerStyle} />
                  <Link
                    style={linkButtonStyle}
                    color="inherit"
                    //variant="h6"
                    component="button"
                    onClick={() => { this.props.setContent("help") }}
                  >
                    Hakkımızda
                  </Link>
                  <Divider style={dividerStyle} />
                  <Link
                    style={linkButtonStyle}
                    color="inherit"
                    //variant="h6" 
                    component="button"
                    onClick={() => { this.props.setContent("contact") }}
                  >
                    İletişim
                  </Link>
                  <Divider style={dividerStyle} />

                  {this.props.isDashboard ? (
                    <Button
                      style={accountButtonStyle}
                      edge="end"
                      //size="small"
                      color="inherit"
                      onClick={this.props.exit}
                      onMouseEnter={this.addColor}
                      onMouseLeave={this.removeColor}
                      startIcon={<ExitToAppOutlinedIcon style={{ marginRight: -5, fontSize: 23, marginTop: -1 }} />}
                    //endIcon={<KeyboardArrowDownIcon style={{ marginLeft: 0 }} />}
                    >
                      Çıkış Yap
                    </Button>
                  ) : (
                      <Button
                        style={accountButtonStyle}
                        edge="end"
                        //size="small"
                        color="inherit"
                        onClick={this.handleClick}
                        onMouseEnter={this.addColor}
                        onMouseLeave={this.removeColor}
                        startIcon={<AccountIcon style={{ marginRight: -5, fontSize: 23, marginTop: -1 }} />}
                      //endIcon={<KeyboardArrowDownIcon style={{ marginLeft: 0 }} />}
                      >
                        Hesabım
                      </Button>
                    )}


                  {/* <IconButton
                style={iconButtonStyle}
                edge="end"                
                //size="small"
                color="inherit"
                onClick={this.handleClick}
                onMouseEnter={() => this.addColor()}
                onMouseLeave={() => this.removeColor()}
              >
                <LanguageIcon style={{ marginRight: 5 }} />
                TR/EN
              </IconButton> */}
                  {/* <Fab
                  //variant="extended"
                  size="small"
                  aria-label="add"
                  color="inherit"
                  onClick={this.handleClick}
                  onMouseEnter={() => this.addColor()}
                  onMouseLeave={() => this.removeColor()}
                  style={iconButtonStyle}
                >
                  <LanguageIcon />
                  TR/EN
                 </Fab> */}
                  {/* <IconButton
                  aria-controls="simple-menu"
                  size="small"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={this.handleClick}      
                >
                  <MenuIcon />
                  {"TR/EN"}
                </IconButton> */}

                  <Popper
                    open={Boolean(this.state.anchor)}
                    anchorEl={this.state.anchor}
                    role={undefined}
                    transition
                    disablePortal={false}
                    style={{
                      zIndex: 1201
                    }}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={() => this.handleClose()}>
                            <MenuList
                              id="menu-list-grow"
                              autoFocusItem={Boolean(this.state.anchor)}
                              onKeyDown={() => this.handleListKeyDown()}
                              style={{
                                minWidth: "100px",
                                color: "#fff",
                                backgroundColor: "black",
                                borderStyle: "solid",
                                borderColor: "#fff",
                                paddingTop: 0,
                                paddingBottom: 0
                              }}
                            >
                              {this.props.isDashboard ? (
                                <MenuItem onClick={this.props.exit}>Çıkış Yap</MenuItem>
                              ) : (
                                  <Fragment>
                                    <MenuItem
                                      onClick={() => this.goLogin()}
                                      onMouseEnter={(e) => e.target.style.backgroundColor = '#27c007'}
                                      onMouseLeave={(e) => e.target.style.backgroundColor = 'black'}
                                    >
                                      Giriş Yap
                                  </MenuItem>
                                    <Divider style={menuDividerStyle} />
                                    <MenuItem
                                      onClick={() => this.goRegister()}
                                      onMouseEnter={(e) => e.target.style.backgroundColor = '#27c007'}
                                      onMouseLeave={(e) => e.target.style.backgroundColor = 'black'}
                                    >
                                      Kayıt Ol
                                  </MenuItem>
                                  </Fragment>
                                )}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>

                  {/* <List>
                <ListItem 
                  button onClick={() => this.setState({ openLangList: !this.state.openLangList })}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                  {this.state.openLangList ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse 
                  in={this.state.openLangList}
                  timeout="auto" 
                  unmountOnExit
                  style={{}}
                >
                  <List component="div" disablePadding>
                    <ListItem button>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Starred" />
                    </ListItem>
                  </List>
                </Collapse>
              </List> */}
                </MediaQuery>
                <MediaQuery query={`(max-width:1149px)`}>
                  <a href={link} style={{ flexGrow: 0, height: "36px", marginRight: "20px" }}>
                    <Logo alt="topLogo" src={LogoMobile} />
                  </a>

                  {<Typography variant="h6" style={{ flexGrow: 1 }}></Typography>}

                  <Link
                    style={linkButtonStyleMobile}
                    color="inherit"
                    variant="subtitle2"
                    component="button"
                    onClick={() => { this.props.setContent("help") }}
                  >
                    Hakkımızda
                  </Link>
                  <Divider style={dividerStyle} />
                  <Link
                    style={linkButtonStyleMobile}
                    color="inherit"
                    variant="subtitle2"
                    component="button"
                    onClick={() => { this.props.setContent("contact") }}
                  >
                    İletişim
                  </Link>
                  <Divider style={dividerStyle} />
                  {this.props.isDashboard ? (
                    <Button
                      style={accountButtonStyleMobile}
                      edge="end"
                      //size="small"
                      color="inherit"
                      onClick={this.props.exit}
                      //onMouseEnter={this.addColor}
                      //onMouseLeave={this.removeColor}
                      startIcon={<ExitToAppOutlinedIcon style={{ marginRight: -12 }} />}
                      //endIcon={<KeyboardArrowDownIcon style={{ marginLeft: 0 }} />}
                    >

                    </Button>
                  ) : (
                      <Button
                      style={accountButtonStyleMobile}
                      edge="end"
                      //size="small"
                      color="inherit"
                      onClick={this.handleClick}
                      //onMouseEnter={this.addColor}
                      //onMouseLeave={this.removeColor}
                      startIcon={<AccountIcon style={{ marginRight: -12 }} />}
                      //endIcon={<KeyboardArrowDownIcon style={{ marginLeft: 0 }} />}
                    >

                    </Button>
                  )}

                  <Popper
                    open={Boolean(this.state.anchor)}
                    anchorEl={this.state.anchor}
                    role={undefined}
                    transition
                    disablePortal={false}
                    style={{
                      zIndex: 1201,
                      marginRight: -5
                    }}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={() => this.handleClose()}>
                            <MenuList
                              id="menu-list-grow"
                              autoFocusItem={Boolean(this.state.anchor)}
                              onKeyDown={() => this.handleListKeyDown()}
                              style={{
                                minWidth: "100px",
                                color: "#fff",
                                backgroundColor: "black",
                                borderStyle: "solid",
                                borderColor: "#fff",
                                paddingTop: 0,
                                paddingBottom: 0
                              }}
                            >
                              {this.props.isDashboard ? (
                                <MenuItem onClick={this.props.exit}>Çıkış Yap</MenuItem>
                              ) : (
                                  <Fragment>
                                    <MenuItem
                                      onClick={() => this.goLogin()}
                                      //onMouseEnter={(e) => e.target.style.backgroundColor = '#27c007'}
                                      //onMouseLeave={(e) => e.target.style.backgroundColor = 'black'}
                                    >
                                      Giriş Yap
                                  </MenuItem>
                                    <Divider style={menuDividerStyle} />
                                    <MenuItem
                                      onClick={() => this.goRegister()}
                                      //onMouseEnter={(e) => e.target.style.backgroundColor = '#27c007'}
                                      //onMouseLeave={(e) => e.target.style.backgroundColor = 'black'}
                                    >
                                      Kayıt Ol
                                  </MenuItem>
                                  </Fragment>
                                )}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>

                </MediaQuery>

              </Toolbar>
            </Container>
          </AppBar>
        </div>
      </Fragment>
    );
  }
}

export default TopMenu
