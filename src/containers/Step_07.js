import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { pick } from 'lodash-es'
import { ContactPermissions } from '../utils/enums'
import Button from '../components/styled/Button'
import { Validate } from '../utils/validation'
import { ErrMsg, Checkbox, Radio } from '../components/styled/FormElements'
import {
 H1,
 H2,
 H3,
 PageHr,
 ParagraphKvkk,
 Clear
} from '../components/styled/Layout'
import { routePathByName } from '../routes'

const CONTACT_CHANNELS = ['smsDelivery', 'emailDelivery', 'telephoneDelivery']

const mapChannelsToObject = val =>
 CONTACT_CHANNELS.reduce((acc, key) => {
  acc[key] = val
  return acc
 }, {})

const validate = new Validate({
 contactPermission: {
  required: true
 }
})

class StepEight extends Component {
 STEP_EIGTH_PATH = routePathByName('Step_08')

 state = {
  contactPermission: '',
  allChannels: false,
  ...mapChannelsToObject('0')
 }

 constructor(props) {
  super(props)

  this.isContactPermissionRequired =
   ContactPermissions.SHOWS_SECTION_REQUIRED_CONTACT_CHANNEL ===
   props.mustChoice

  this.allChannelsRef = React.createRef()
 }

 componentDidMount() {
  this.props.setStep('none')

  //GoogleTagManager Events
 this.addGTM()
 }

 addGTM() {
  if (this.props.companyCode === "N11" && this.props.basketType === "4"){ //n11 Oto Kredi
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step9_n11oto/',
    'userId': this.props.transactionId
   });
  }
  else{
   window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step9_checkout/',
    'userId': this.props.transactionId
   });
  }
 }

 componentDidUpdate(prevProps, prevState) {
  if (this.areAllChannelsChecked() === true) {
   if (prevState.allChannels === false) this.setState({ allChannels: true })
   this.allChannelsRef.current.indeterminate = false
  } else if (this.areAllChannelsUnChecked()) {
   if (prevState.allChannels === true) this.setState({ allChannels: false })
   this.allChannelsRef.current.indeterminate = false
  } else {
   this.allChannelsRef.current.indeterminate = true
  }
 }

 onSubmit = (values, actions) => {
  this.setState({ ...this.state, ...values })
  const hasContactPermission = values.contactPermission === '1'

  if (!hasContactPermission && this.isContactPermissionRequired) {
   actions.setSubmitting(false)
   actions.setFieldTouched('contactPermission', true, true)
  } else if (this.areChannelsRequired(values)) {
   actions.setSubmitting(false)
   actions.setFieldTouched(CONTACT_CHANNELS[0], true, true)
  } else {
   actions.setSubmitting(true)
   const payload = CONTACT_CHANNELS.reduce((acc, key) => {
    acc[key] = hasContactPermission ? this.state[key] : '0'
    return acc
   }, {})

   this.props.save(payload).then(() => {
    actions.setSubmitting(false)
    this.props.history.replace(this.STEP_EIGTH_PATH)
   })
  }
 }

 areChannelsRequired = ({ contactPermission }) => {
  return this.isAnyChannelChecked() === false && contactPermission === '1'
 }

 isAnyChannelChecked = () =>
  CONTACT_CHANNELS.some(key => this.state[key] === '1')
 areAllChannelsChecked = () =>
  CONTACT_CHANNELS.every(key => this.state[key] === '1')
 areAllChannelsUnChecked = () =>
  CONTACT_CHANNELS.every(key => this.state[key] === '0')

 updateChannel = e => {
  this.setState({ [e.target.name]: e.target.checked ? '1' : '0' })

  if (e.target.name === 'allChannels') {
   if (e.target.checked === true) {
    this.setState(mapChannelsToObject('1'))
   } else {
    this.setState(mapChannelsToObject('0'))
   }
  }
 }

 render() {
  return (
   <Formik
    validate={validate}
    initialValues={{
     contactPermission: this.state.contactPermission
    }}
    onSubmit={this.onSubmit}
    render={({ isSubmitting, values, errors, touched }) => (
     <Fragment>
      <Form>
       <H1>ALI??VER???? KRED??S??</H1>
       <H2>
        Ticari Elektronik ??leti ve Ki??isel Verilerin Korunmas?? Kanunu
        Kapsam??nda M????teri Beyan??
       </H2>
       <ParagraphKvkk>
        6698 say??l?? kanun kapsam??nda KVKK Bilgilendirme Metni???ni okudu??umu
        ve bu kapsamda ki??isel verilerimin, bankan??z nezdindeki pazarlama
        s??re??lerinin planlanmas??, icras??, bankan??z taraf??ndan sunulan ??r??n
        ve hizmetlerin be??enilerime, kullan??m al????kanl??klar??ma ve ihtiya??lar??ma
        g??re ??zelle??tirilmesini, m????teri memnuniyeti ve hizmet kalitesinin
        art??r??lmas??na y??nelik ??al????malarla, planlama, analiz, risk de??erlendirmesi,
        raporlama ve istatistik amac??yla saklanmas??n??, bu ama??larla i??lenmesini,
        hizmet ald??????m??z i?? ortaklar??m??z ile ??????nc?? ki??i ve kurumlara, birlikte
        ??al????t??????m??z sigorta ??irketlerine avantajl?? tekliflerin al??nmas?? amac??yla
        aktar??larak bu kapsamda Fibabanka taraf??ndan a??a????da belirtilen ve
        i??aretledi??im (bir veya birden fazla) ileti??im bilgilerime reklam,
        promosyon, kampanya ve benzeri ticari elektronik ileti g??nderilmesine
       </ParagraphKvkk>

       <Radio
        hasError={errors.contactPermission && touched.contactPermission}
        permission
       >
        <Field
         type="radio"
         id="contactPermission"
         value="1"
         name="contactPermission"
        />
        <label htmlFor="contactPermission">Onay Veriyorum</label>
       </Radio>
       <Radio
        hasError={errors.contactPermission && touched.contactPermission}
        permission
       >
        <Field
         type="radio"
         id="contactPermission2"
         name="contactPermission"
         value="0"
        />
        <label htmlFor="contactPermission2">Onay vermiyorum</label>
       </Radio>
       <ErrMsg
        as={ErrorMessage}
        component="div"
        name="contactPermission"
        marginclear="true"
       />
       {touched.contactPermission &&
        values.contactPermission === '0' &&
        this.isContactPermissionRequired && (
         <ErrMsg component="div" marginclear="true">
          {window.APP_CONFIG.custom_error_messages.contact_permission}
         </ErrMsg>
        )}

       <PageHr />
       <H3>
        Sizinle hangi kanal arac??l?????? ile ileti??ime ge??memizi
        istersiniz?
       </H3>

       <Checkbox>
        <Field
         type="checkbox"
         id="allChannels"
         name="allChannels"
         innerRef={this.allChannelsRef}
         checked={this.state.allChannels}
         onChange={this.updateChannel}
         disabled={values.contactPermission === '0'}
        />
        <label htmlFor="allChannels">Hepsi</label>
       </Checkbox>

       <Checkbox>
        <Field
         type="checkbox"
         id="smsDelivery"
         name="smsDelivery"
         checked={this.state.smsDelivery === '1'}
         onChange={this.updateChannel}
         disabled={values.contactPermission === '0'}
        />
        <label htmlFor="smsDelivery">SMS</label>
       </Checkbox>

       <Checkbox>
        <Field
         type="checkbox"
         id="emailDelivery"
         name="emailDelivery"
         checked={this.state.emailDelivery === '1'}
         onChange={this.updateChannel}
         disabled={values.contactPermission === '0'}
        />
        <label htmlFor="emailDelivery">E-Posta</label>
       </Checkbox>

       <Checkbox>
        <Field
         type="checkbox"
         id="telephoneDelivery"
         name="telephoneDelivery"
         checked={this.state.telephoneDelivery === '1'}
         onChange={this.updateChannel}
         disabled={values.contactPermission === '0'}
        />
        <label htmlFor="telephoneDelivery">Telefon</label>
       </Checkbox>

       {this.areChannelsRequired(values) &&
        this.isAnyChannelChecked() === false &&
        CONTACT_CHANNELS.some(key => touched[key]) ? (
         <ErrMsg component="div" marginclear>
          {window.APP_CONFIG.custom_error_messages.contact_channels}
         </ErrMsg>
        ) : null}
       <Clear />
       <Button type="submit" disabled={isSubmitting}>
        Devam
       </Button>
      </Form>
     </Fragment>
    )}
   />
  )
 }
}

const mapStateToProps = state => {
 const { global, documents } = state
 return {
  ...pick(global, [
   'transactionId',
   'applicationNo',
   'nationalIdentityNo',
   'result',
   'hasError',
   'errorMessage',
   'companyCode',
   'basketType'
  ]),
  ...pick(documents, [
   'mustChoice', ...CONTACT_CHANNELS])
 }
}

const mapDispatchToProps = {
 save: ''
}

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(StepEight)