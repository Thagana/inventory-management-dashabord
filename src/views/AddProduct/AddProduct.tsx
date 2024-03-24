import * as React from 'react'
import { ProductService } from '../../services/product.service'
import Template from '../Template'
import { Button, Form, type FormProps, Input, InputNumber } from 'antd'
import { type FieldType } from '../../interface/product-formtype'
import { useNavigate } from 'react-router-dom'

import './add-product.style.css'
import LoadingIndicator from '../../components/LoadingIndicator'

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

export default function AddProduct () {
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  return (
    <Template>
      <div className="add-product-container">
        {loading && <LoadingIndicator />}
        {!loading && (
          <div className="form-container">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={async (values) => {
                try {
                  setLoading(true)
                  await ProductService.createProduct(values)
                  setLoading(false)
                  navigate('/products')
                } catch (error) {
                  console.log(error)
                  setLoading(false)
                }
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Product Name"
                name="name"
                rules={[
                  { required: true, message: 'Please provide a product name' }
                ]}
              >
                <Input className="input" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Please provide a product price'
                  }
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item<FieldType>
                label="Quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: 'Please provide a product quantity'
                  }
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item<FieldType>
                label="Category ID"
                name="categoryID"
                initialValue={1}
                rules={[
                  {
                    required: true,
                    message: 'Please provide a product category ID'
                  }
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </Template>
  )
}
