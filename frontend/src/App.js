import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getList, createMessage, editMessage, deleteMessage } from './store/messages/actions'
import { Button, Table, Row, Col, Popconfirm, Icon } from 'antd'
import AddMessageModal from './components/AddMessageModal'
import './App.css';

class App extends Component {
  constructor (props) {
    super(props) 
    this.state = {
      list: [],
      createMessageModal: false
    }
  }

  componentDidMount () {
    this.getList()
  }

  getList = () => {
    this.props.dispatch(getList())
  }

  handleAddMessage = (params) => {
    this.props.dispatch(createMessage(params))
  }

  handleEditMessage = (params, id) => {
    this.props.dispatch(editMessage(params, id))
  }

  handleEditMessageModal = row => {
    this.setState({
      isEdit: true,
      editableRow: row,
      createMessageModal: true
    })
  }

  handleDeleteMessage = row => {
    this.props.dispatch(deleteMessage(row._id))
  }

  handleModal = () => {
    this.setState({
      createMessageModal: true
    })
  }

  handleModalClose = () => {
    this.setState({
      createMessageModal: false,
      isEdit: false,
      editableRow: {}
    })
  }

  getTableData = () => {
    const text = 'Are you sure to delete this message?'
    const editText = 'Are you sure to edit this message?'
    const columns = [{
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: 'Message',
      dataIndex: 'body',
      key: 'body',
    }, {
      title: '',
      render: (value, row) => (
        <div>
          <Popconfirm onConfirm={() => this.handleDeleteMessage(row)} title={text} okText='Yes' cancelText='No'>
            <Icon type='delete' className='delete-icon' />
          </Popconfirm>
          <Icon type='edit' className='edit-icon' onClick={() => this.handleEditMessageModal(row)} />
        </div>
      )
      }]
    const locale = {
      emptyText: 'No messages here'
    }
    return {
      columns,
      locale,
      rowKey: 'id',
      dataSource: this.props.messageList,
      loading: this.props.fetching
    }
  }

  render() {
    const { createMessageModal, editableRow, isEdit } = this.state
    return (
      <div className="App">
        <Row>
          <Col span={24}>
            <h2><strong>Messages</strong></h2>
          </Col>
        </Row>        
        <Row>
          <Col span={24}>
            <Button type='primary' className='create-button' onClick={this.handleModal}>
              Create Message
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table {...this.getTableData()} />
          </Col>          
        </Row>
      {createMessageModal && (
        <AddMessageModal
          edit={isEdit}
          editableRow={editableRow}
          addMessage={this.handleAddMessage}
          editMessage={this.handleEditMessage}
          closeModal={this.handleModalClose} />
      )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messageList: state.messages.list,
  message: state.messages.message,
  fetching: state.messages.fetching
})

export default connect(mapStateToProps)(App);
