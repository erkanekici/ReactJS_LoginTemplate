import React, { Component, Fragment } from 'react'
import { Formik, Form } from 'formik'
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
import MailIcon from '@material-ui/icons/Mail';
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
import { ErrMsg } from '../styled/FormElements'
import Drawer from '@material-ui/core/Drawer';

class UserDashboard extends Component {

  constructor(props) {
    super(props);
    //this.handleUpdate = this.handleUpdate.bind(this);
    //this.renderView = this.renderView.bind(this);
    //this.renderThumb = this.renderThumb.bind(this);
  }

  state = {
    isSubmitting: false,
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

  startGame = () => {
    this.setState({ isSubmitting: false })
    this.props.startGame({
      nationalIdentityNo: this.props.nationalIdentityNo,
      mobileNumber: this.props.mobileNumber
    })
      .finally(() => {
        this.setState({ isSubmitting: true })
      })
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
    const submitButtonStyle = {
      backgroundColor: "#27c007",
      height: "55px",
      marginTop: "16px"
    };
    const submitButtonDisabledStyle = {
      height: "55px",
      marginTop: "16px"
    };
    return (
      <Fragment>
        
         <ContentStyle style={{display: "flex"}}>
         <Drawer          
          variant="permanent"
          elevation={10}
          PaperProps={{
            style: {
              width: "240px", 
              position: "static", 
              minHeight: "calc(100vh - 110px)", 
              backgroundColor: "#00000014",
              paddingTop:"15px"
            }
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <CategoryList
            {...this.props}
            {...this.state}
            setContent={this.props.setContent}
            title="????LEMLER"
          />
          {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts',].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          </List> */}
        </Drawer>
          <Grid container justify="center" style={{}}>
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
              {this.props.companyDefiniation && (
                <div> ??irket tan??mlama</div>
              )} 
          </Grid>
        </ContentStyle> 
      </Fragment>
    );
  }
}

export default UserDashboard
