import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import ContentWrapper from '../styled/ContentWrapper'
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
import Divider from '@material-ui/core/Divider';
import { Scrollbars } from 'react-custom-scrollbars';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Logo } from '../styled/Layout'
import banner from '../../images/mainBanner.png'
import ContentStyle from '../styled/ContentStyle'
import Login from '../Login'
import Register from '../Register'
import ScoreList from '../ScoreList'
import CategoryList from '../CategoryList'
import TextContent from '../TextContent'
import MediaQuery from 'react-responsive'

class MainPageContent extends Component {

  constructor(props) {
    super(props);
    //this.handleUpdate = this.handleUpdate.bind(this);
    //this.renderView = this.renderView.bind(this);
    //this.renderThumb = this.renderThumb.bind(this);
  }

  state = {
    weeklyBestList: [
      { name: "Erkan", avatar: "avatar1", score: 1000 },
      { name: "Hakan", avatar: "avatar2", score: 500 },
      { name: "Ahmet", avatar: "avatar1", score: 100 },
      { name: "??nsal", avatar: "avatar3", score: 50 },
      { name: "Ahmet", avatar: "avatar4", score: 10 }
    ],
    monthlyBestList: [
      { name: "Sevil", avatar: "avatar2", score: 2000 },
      { name: "Salim", avatar: "avatar1", score: 1500 },
      { name: "Erkan", avatar: "avatar3", score: 1000 },
      { name: "Salim", avatar: "avatar1", score: 1500 },
      { name: "Erkan", avatar: "avatar4", score: 1000 }
    ],
    scoreList: [
      { name: "Sevil", avatar: "avatar2", score: 2000 },
      { name: "Salim", avatar: "avatar3", score: 1500 },
      { name: "Erkan", avatar: "avatar3", score: 1000 },
      { name: "Salim", avatar: "avatar1", score: 1500 },
      { name: "Erkan", avatar: "avatar4", score: 1000 }
    ],
    // categoryList: [
    //   { name: "Genel K??lt??r", subTitle: [] },
    //   { name: "Bilim", subTitle: [{ name: "Fizik", subTitle:[] },{ name: "Kimya", subTitle:[] },{ name: "Biyoloji", subTitle:[] }] },
    //   { name: "Sanat", subTitle:  [{ name: "M??zik", subTitle:[] },{ name: "Sinema", subTitle:[] }] },
    //   { name: "Spor", subTitle: [] }
    // ]
  }

  componentDidMount() {
  }

  renderThumb({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: "#0007C9",
      color: "black"
    };
    return (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    );
  }

  // handleUpdate(values) {    debugger; 
  //   this.setState({ top: values.top });
  // }

  render() {
    const link = "http://localhost:3000";
    const inlineGridStyle = {
      margin: "20px"
    }
    const rulesGridStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    }
    const bannerStyle = {
      width: "auto",
      height: "auto",
      minHeight: "auto",
      textAlign: "center",
      padding: 0,
      background: "inherit",
      border: "none",
      marginBottom: "10px"
    }
    const dividerStyle = {
      backgroundColor: "#fff",
      marginTop: "10px",
      marginBottom: "10px"
    }
    const fullPageGridStyle = {
      minHeight: "100vh",
      paddingTop: "10%"
    }
    return (
      <Fragment>
        <ContentStyle>
          <MediaQuery query={`(min-width:1150px)`}>
            <Grid container style={{ height: "calc(100vh - 70px)" }}>
              {this.props.mainContent && (
                <ContentWrapper >
                  {this.props.isLogin ? (
                    <Login
                      {...this.props}
                      {...this.state}
                      login={this.props.login}
                      goRegisterPage={() => this.props.changePage("register")}
                      forgotPassword={() => this.setState({ isLogin: false })}
                    />
                  ) : (
                      <Register
                        {...this.props}
                        {...this.state}
                        register={this.props.register}
                        goLoginPage={() => this.props.changePage("login")}
                      />
                    )}
                </ContentWrapper>
              )}
              {this.props.rules && (
                <TextContent
                  contentType="rules"
                />
              )}
              {this.props.help && (
                <TextContent
                  contentType="help"
                />
              )}
              {this.props.contact && (
                <TextContent
                  contentType="contact"
                />
              )}
            </Grid>
          </MediaQuery>
          <MediaQuery query={`(max-width:1149px)`}>
            {/* <Grid container style={{height:"calc(100vh - 70px)"}}>  */}
            {this.props.mainContent && (
              <ContentWrapper >
                {this.props.isLogin ? (
                  <Login
                    {...this.props}
                    {...this.state}
                    login={this.props.login}
                    goRegisterPage={() => this.props.changePage("register")}
                    forgotPassword={() => this.setState({ isLogin: false })}
                  />
                ) : (
                    <Register
                      {...this.props}
                      {...this.state}
                      register={this.props.register}
                      goLoginPage={() => this.props.changePage("login")}
                    />
                  )}
              </ContentWrapper>
            )}
            {this.props.rules && (
              <TextContent
                contentType="rules"
              />
            )}
            {this.props.help && (
              <TextContent
                contentType="help"
              />
            )}
            {this.props.contact && (
              <TextContent
                contentType="contact"
              />
            )}
            {/* </Grid>  */}
          </MediaQuery>

        </ContentStyle>
      </Fragment>
    );
  }
}

export default MainPageContent
