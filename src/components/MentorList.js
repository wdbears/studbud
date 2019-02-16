import React, { Component } from "react";
import { Avatar, List, Skeleton, Modal, Button } from "antd";

const headers = new Headers();
headers.append("Authorization", "Bearer ca893b71-2357-3da0-90d3-a6d0f74fd0f7");

const init = {
  method: "GET",
  cors: "no-cors",
  headers
};

const data = [
  {
    title: "Mentor 1",
    description: "Math"
  },
  {
    title: "Mentor 2",
    description: "Science"
  },
  {
    title: "Mentor 3",
    description: "English"
  },
  {
    title: "Mentor 4",
    description: "Computer Science"
  }
];

class MentorList extends Component {
  state = { visibleModal: false, classes: [] };

  componentDidMount() {
    fetch("https://sandbox.api.it.nyu.edu/class-roster-exp/classes", init)
      .then(response => {
        console.log(response.json()); // or .json() or .blob() ...
      })

      .then(data => {
        let classes = data.results;
        this.setState({ classes: classes });
        console.log(data);
      })
      .catch(e => {
        // error in e.message
      });
  }

  showModal = () => {
    this.setState({
      visibleModal: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visibleModal: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visibleModal: false
    });
  };

  render() {
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item
              actions={[
                <Button type="primary" onClick={this.showModal}>
                  Email
                </Button>
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={item.title}
                  description={item.description}
                />
              </Skeleton>
            </List.Item>
          )}
        />
        <Modal
          title="Contact Mentor"
          visible={this.state.visibleModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default MentorList;
