import { Form, Space, Button } from 'antd';

const SearchForm = (props: any) => {
  return (
    <Form className="search-form" form={props.form} initialValues={props.initialValues} layout="inline">
      {props.children}
      <Form.Item>
        <Space>
          <Button type="primary" onClick={props.submit}>Search</Button>
          <Button type="default" onClick={props.reset}>Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default SearchForm