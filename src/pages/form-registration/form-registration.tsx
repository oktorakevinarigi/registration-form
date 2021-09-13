import { useCallback, useEffect } from 'react'
import { Layout, Form, Button, Space, Divider } from 'antd';
import { observer } from "mobx-react-lite";

import { useStores } from "../../models/root-store/root-store-context";
import BlockUi from '../../components/BlockUi'
import Input from '../../components/Input'
import InputPass from '../../components/InputPass'
import Select from '../../components/Select'

const { Header, Content, Footer } = Layout;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
    md: { span: 4 }
  },
};

const FormRegistration = () => {
  const {
    app: {
      isLoading, getProvince, srcProvinces, handleState, srcRegencies, getRegency, getDistrict,
      srcDistricts, srcVillages, getVillage, getPostCode, form: formRegistation, clearForm, submit
    }
  } = useStores()
  const [form] = Form.useForm();

  useEffect(() => {
    getProvince()
    return () => {
      clearForm()
    }
  }, [getProvince, clearForm])

  useEffect(() => {
    form.setFieldsValue({ postCode: formRegistation.postCode })
  }, [formRegistation.postCode, form])

  const handleChange = useCallback((field: string, value: string | number) => {
    if (field === 'province') {
      form.setFieldsValue({ regency: null, district: null, village: null, postCode: null })
      getRegency(parseInt(value.toString()))
    } else if (field === 'regency') {
      form.setFieldsValue({ district: null, village: null, postCode: null })
      getDistrict(parseInt(value.toString()))
    } else if (field === 'district') {
      form.setFieldsValue({ village: null, postCode: null })
      getVillage(parseInt(value.toString()))
    } else if (field === 'village') {
      form.setFieldsValue({ postCode: null })
      getPostCode(parseInt(value.toString()))
    } else {
      handleState(field, value)
    }
  }, [handleState, getRegency, getDistrict, getVillage, getPostCode, form])

  const onFinish = useCallback(() => {
    submit()
  }, [submit])

  const onClear = useCallback(() => {
    clearForm()
    form.resetFields()
  }, [clearForm, form])

  return (
    <BlockUi isLoading={isLoading}>
      <Layout className="layout">
        <Header>
          <div style={{ color: 'white', fontSize: 20 }}>
            Form Registration
          </div>
        </Header>
        <Content style={{ padding: '50px' }}>
          <Divider orientation='left'>Information General</Divider>
          <Form {...formItemLayout} form={form} name="form-input" labelAlign="left" onFinish={onFinish}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please input First Name!' }]}>
              <Input placeholder="Input First Name" onChange={(e) => { handleChange('firstName', e.target.value) }} />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please input Last Name!' }]}>
              <Input placeholder="Input Last Name" onChange={(e) => { handleChange('lastName', e.target.value) }} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please input Email Address!' },
                { type: 'email', message: "Email Address not valid" }
              ]}>
              <Input placeholder="Input Email Address" onChange={(e) => { handleChange('email', e.target.value) }} />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please input Phone Number!' },
                { pattern: /^\+?\d{10,14}$/, message: "Wrong format!" }
              ]}>
              <Input placeholder="Input Phone Number" onChange={(e) => { handleChange('phone', e.target.value) }} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input Password!' }]}>
              <InputPass placeholder="Input Password" onChange={(e) => { handleChange('password', e.target.value) }} />
            </Form.Item>
            <Form.Item
              name="province"
              label="Province"
              rules={[{ required: true, message: 'Please input Province!' }]}>
              <Select
                placeholder="Select Province"
                source={srcProvinces}
                showSearch
                optionFilterProp="children"
                onChange={(value) => { handleChange('province', value) }}
              />
            </Form.Item>
            <Form.Item
              name="regency"
              label="Regency"
              rules={[{ required: true, message: 'Please input Regency!' }]}>
              <Select
                placeholder="Select Regency"
                source={srcRegencies}
                showSearch
                optionFilterProp="children"
                onChange={(value) => { handleChange('regency', value) }}
              />
            </Form.Item>
            <Form.Item
              name="district"
              label="District"
              rules={[{ required: true, message: 'Please input District!' }]}>
              <Select
                placeholder="Select District"
                source={srcDistricts}
                showSearch
                optionFilterProp="children"
                onChange={(value) => { handleChange('district', value) }}
              />
            </Form.Item>
            <Form.Item
              name="village"
              label="Village"
              rules={[{ required: true, message: 'Please input Village!' }]}>
              <Select
                placeholder="Select Village"
                source={srcVillages}
                showSearch
                optionFilterProp="children"
                onChange={(value) => { handleChange('village', value) }}
              />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please input Address!' }]}>
              <Input placeholder="Input Address" onChange={(e) => { handleChange('address', e.target.value) }} />
            </Form.Item>
            <Form.Item
              name="postCode"
              label="Post Code">
              <Input disabled={true} placeholder="Input Post Code" onChange={(e) => { handleChange('postCode', e.target.value) }} />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button onClick={onClear}>Clear</Button>
              </Space>
            </Form.Item>

          </Form>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2021 Created by Oktora Kevin Arigi</Footer>
      </Layout>
    </BlockUi>
  )
}

export default observer(FormRegistration)