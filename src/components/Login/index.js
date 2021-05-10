import React, { Component, Fragment } from 'react'
import { Formik, Form } from 'formik'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ErrMsg, InfoMsg } from '../styled/FormElements'
import isEmail from 'validator/lib/isEmail'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import isAlpha from 'validator/lib/isAlpha'
import isNumeric from 'validator/lib/isNumeric'
import { isEmpty, words } from 'lodash-es'

class Login extends Component {

  state = {
    isInputsValidated: false,
    userName: '',
    password: '',
    subeNo:'',
    donem: 2020,
    name: '',
    captcha: '',
    isPasswordTypeText: false,
    invalidUserName: false,
    //invalidEmailFormat: false,
    invalidPassword: false,
    invalidSubeNo: false,
    alert: true
  }

  componentDidMount() {
    this.addGTM()

    //recaptcha ekleme
    const sitekey = window.APP_CONFIG.grecaptcha_sitekey
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(sitekey, { action: 'login' }).then((token) => {
        this.setState({ captcha: token })
      })
    })
  }

  addGTM() {
    window.dataLayer.push({
      'event': 'virtualPageview',
      'virtualPageURL': '/vp/gosterBilgini/login/',
      'userId': this.props.transactionId
    });
  }

  handleSelectionChange = event => {
    const name = event.target.name;
    this.setState({ ...this.state, [name]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickIcon = (value) => {
    if (value === 'isPasswordTypeText') {
      this.setState({ isPasswordTypeText: !this.state.isPasswordTypeText });
    }
  };

  handleChangePasswordInput = event => {
    const { name, value } = event.target;

    // if (!isEmpty(value) && !isAlpha(words(value).join(''), 'tr-TR')) {
    //  return;
    // }
    //isAlpha(words(value).join(''), 'tr-TR') --> sadece harf ve noktalama işaretleri
    //isAlpha(value, 'tr-TR') --> sadece harf
    //isNumeric(value) --> sadece rakam
    if (name === 'userName' && !isEmpty(value) && !isAlpha(value, 'tr-TR')) {
      return;      
    }
    if (name === 'subeNo' && !isEmpty(value) && !isNumeric(value)) {
      return;      
    }

    this.setState({ [name]: value });

    if (value.length !== 0) {
      if (name === 'userName') {       
        this.setState({ invalidUserName: false });
        // if (isEmail(value, [])) {
        //   this.setState({ invalidEmailFormat: false });
        // }
      }
      if (name === 'password') {
        this.setState({ invalidPassword: false });
      }
      if (name === 'subeNo') {
        this.setState({ invalidSubeNo: false });
      }
    }
    //this.checkInputsValidated(value, name)
  };

  checkInputsValidated(value, name) {
    let errors = {}
    if (name === 'userName') {
      errors = this.validateAllInputs(value, this.state.password, this.state.subeNo);
    }
    else if (name === 'password') {
      errors = this.validateAllInputs(this.state.userName, value, this.state.subeNo);
    }
    else if (name === 'subeNo') {
      errors = this.validateAllInputs(this.state.userName, this.state.password, value);
    }

    //checkErrors
    if (errors.length !== 0 && !Object.keys(errors).some(x => errors[x])) {
      this.setState({ isInputsValidated: true });
    }
    else {
      this.setState({ isInputsValidated: false });
    }
  }

  validateAllInputs(userName, password, subeNo) {
    // true means invalid, so our conditions got reversed
    const response =
    {
      invalidUserName: userName.length === 0,
      //invalidEmailFormat: !isEmail(email, []),
      invalidPassword: password.length === 0,
      invalidSubeNo: subeNo.length === 0
    };
    return response
  }

  canBeSubmitted() {
    const errors = this.validateAllInputs(this.state.userName, this.state.password, this.state.subeNo);
    // eslint-disable-next-line array-callback-return
    Object.keys(errors).map(item => {
      if (errors[item]) {
        this.setState({ [item]: true });
      }
    })
    return !Object.keys(errors).some(x => errors[x]);
  }

  getEmailErrorText = () => {
    if (this.state.invalidUserName) {
      return 'Lütfen bu alanı doldurunuz.'
    }
    else if (this.state.invalidEmailFormat) {
      return 'Lütfen geçerli bir email adresi giriniz.'
    }
  };

  handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ alert: false });
  };

  onSubmit = (values, actions) => {
    actions.setSubmitting(false)
    if (!this.canBeSubmitted()) {
      return;
    }
    const request =
    {
      userName: this.state.userName,
      password: this.state.password,
      donem: this.state.donem,
      subeNo: this.state.subeNo,
      captcha: this.state.captcha
      // questionAnswerTable: [
      //   {
      //     questionCode: '01',
      //     answer: this.state.friendName
      //   },
      //   {
      //     questionCode: '02',
      //     answer: this.state.cartoonHero
      //   },
      //   {
      //     questionCode: '03',
      //     answer: this.state.teacherName
      //   }
      // ]
    };
    actions.setSubmitting(true)
    this.props.login(request).then(() => {
      actions.setSubmitting(false)
    })
  }

  render() {
    const avatarStyle = {
      marginBottom: "5px",
      backgroundColor: "#0007C9", //#dc004e kırmızı
    };
    const submitButtonStyle = {
      backgroundColor: "#27c007",
      height: "55px",
      marginTop: "16px"
    };
    const submitButtonDisabledStyle = {
      height: "55px",
      marginTop: "16px"
    };
    const gridStyle = {
      marginTop: "10px",
      marginBottom: "10px",
    };
    const pageStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };
    const inputLabelStyle = {
      background: "white",
      padding: "0px 5px",
      marginLeft: "-5px"
    };

    return (
      <Formik
        initialValues={{ ...this.state }}
        onSubmit={this.onSubmit}
        render={({ isSubmitting, errors, touched }) => (
          <Fragment>
            <div style={pageStyle}>
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" style={{ color: "#0007C9" }}>
                Giriş Yap
              </Typography>
              <Form>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="userName"
                  label="Kullanıcı Adı"
                  name="userName"
                  autoComplete="userName"
                  autoFocus
                  value={this.state.userName}
                  onChange={this.handleChangePasswordInput}
                  error={this.state.invalidUserName}
                  // error={this.state.invalidEmail || this.state.invalidEmailFormat}
                  //helperText={this.state.invalidEmail ? 'Lütfen bu alanı doldurunuz.' : ''}
                  helperText={this.getEmailErrorText()}
                  inputProps={{ maxLength: 100 }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Şifre"
                  type={this.state.isPasswordTypeText ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChangePasswordInput}
                  error={this.state.invalidPassword}
                  helperText={this.state.invalidPassword ? 'Lütfen bu alanı doldurunuz.' : ''}
                  inputProps={{ maxLength: 50 }}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={(value) => this.handleClickIcon('isPasswordTypeText')}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.isPasswordTypeText ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <FormControl
                  variant="outlined"
                  margin="normal"
                  fullWidth
                >
                  <InputLabel style={inputLabelStyle}>Dönem</InputLabel>
                  <Select
                    native                   
                    value={this.state.donem}
                    onChange={this.handleSelectionChange}
                    label="Dönem"
                    inputProps={{
                      name: 'donem',
                      // id: 'asd',
                    }}
                  >
                    {/* <option aria-label="None" value="" /> */}
                    <option value={2020}>2020</option>
                    <option value={2019}>2019</option>
                    <option value={2018}>2018</option>
                    <option value={2017}>2017</option>
                  </Select>
                </FormControl>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="subeNo"
                  label="Şube Numarası"
                  name="subeNo"
                  autoComplete="off"                 
                  value={this.state.subeNo}
                  onChange={this.handleChangePasswordInput}
                  error={this.state.invalidSubeNo}                  
                  helperText={this.state.invalidSubeNo ? 'Lütfen bu alanı doldurunuz.' : ''}
                  inputProps={{ maxLength: 100 }}
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Beni Unutma"
                /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                  style={isSubmitting ? submitButtonDisabledStyle : submitButtonStyle}
                >
                  Giriş Yap
                </Button>
                <Grid container style={gridStyle}>
                  <Grid item xs>
                    <Link
                      style={{ float: "left", color: "black" }} href="#" variant="body2"
                      onClick={this.props.forgotPassword}
                    >
                      Şifremi Unuttum?
                    </Link>
                    <Link
                      style={{ float: "right", color: "black" }} href="#" variant="body2"
                      onClick={this.props.goRegisterPage}
                    >
                      Bir hesabın yok mu? <b><font color="#0007C9">Kayıt Ol</font></b>
                    </Link>
                  </Grid>
                </Grid>

                {/* <div>
         <hr
          style={{
           color: "black",
           backgroundColor: "#000005",
           height: 1,
           width: 180,
           float: "left"
          }}
         />
         <b>VEYA</b>
         <hr
          style={{
           color: "black",
           backgroundColor: "#000005",
           height: 1,
           width: 180,
           float: "right"
          }}
         />
        </div>
        <Button
         type="button"
         fullWidth
         variant="contained"
         color="primary"
         style={signUpButtonStyle}
         onClick={this.props.goRegisterPage}
        >
         Kayıt Ol
        </Button> */}
                {this.props.isErrorExist && (
                  <ErrMsg component="div" marginclear="true">
                    {this.props.errorMessageContent}
                  </ErrMsg>
                )}
                {/* {this.props.activation === "1" && (
                  <InfoMsg component="div" marginclear="true">
                    Hesabınız aktifleştirilmiştir. E-posta ve şifre bilgilerinizle giriş yapabilirsiniz.
                  </InfoMsg>
                )} */}

                {this.props.activation === "1" && (
                  <Snackbar
                    style={{ display: 'contents' }}
                    open={this.state.alert}
                    autoHideDuration={3000}
                    onClose={this.handleAlertClose}
                  >
                    {/*Alert severity cesitleri :error,warning,info */}
                    <Alert variant="filled" severity="success" onClose={this.handleAlertClose}>
                      Hesabınız aktifleştirilmiştir. E-posta ve şifre bilgilerinizle giriş yapabilirsiniz.
                    </Alert>
                  </Snackbar>
                )}
              </Form>
            </div>
          </Fragment>
        )} //Formik render
      /> //Formik
    ); //return
  } //render
}

export default Login
