import './AddMessageModal.css'
import { Input, Form, Modal } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddMessageModal extends Component {
  onOk = () => {
      this.props.form.validateFields((err, values) => {
      if (err) return
      if (this.props.edit) {
        const { _id } = this.props.editableRow
        this.props.editMessage(values, _id)
      } else {
        this.props.addMessage(values)
      }
    })
    this.onOkFinish()

  }
  onOkFinish = () => {
    this.props.form.resetFields()
    this.props.closeModal()
  }
  onCancel = () => {
    this.props.closeModal()
    this.props.form.resetFields()
  }
  render () {
    const { edit, editableRow } = this.props
    return (
      <Modal
        onCancel={this.onCancel}
        title={edit ? 'Edit message' : 'Add new message'}
        okText={edit ? 'EDIT' : 'SAVE'}
        cancelText='Cancel'
        onOk={this.onOk}
        visible
        >
        <Form autoComplete='off' layout='vertical' className='modal-form'>
          <Form.Item label='Title'>
              {this.props.form.getFieldDecorator('title', {               
                rules: [{ required: true, message: 'This field can not be empty' }],
                initialValue: editableRow && editableRow.title
              })(
                <Input placeholder='Title' />
              )}
            </Form.Item>
          <Form.Item label='Message'>
              {this.props.form.getFieldDecorator('body', {                               
                rules: [{ required: true, message: 'This field can not be empty' }],
                initialValue: editableRow && editableRow.body
              })(
                <Input type='textarea' />
              )}
            </Form.Item>       
        </Form>
      </Modal>
    )
  }
}

AddMessageModal.propTypes = {
  form: PropTypes.object,
  closeModal: PropTypes.func,
  addMessage: PropTypes.func
}

export default Form.create()(AddMessageModal)
