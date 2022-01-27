import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import {
  List,
  Avatar,
  Space,
  Input,
  DatePicker,
  TimePicker,
  Button
} from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import moment from "moment";

import "antd/dist/antd.css";
import "./index.css";
import { Comment, Form } from "antd";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function MyComponent() {
  const [value, setValue] = useState("");

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

class App extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: ""
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [
          ...this.state.comments,
          {
            author: "Company Employee",
            avatar: "https://joeschmoe.io/api/v1/random",
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow()
          }
        ]
      });
    }, 1000);
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    );
  }
}

const listData = [];
for (let i = 0; i < 2; i++) {
  listData.push({
    href: "https://ant.design",
    title: `Meeting Topic Title ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: "Time Estimate: 1pm",
    content: "Text Description here."
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function addTopic() {
  listData.push({
    href: "https://ant.design",
    title: `Meeting Topic Title ${listData.length}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: "Time Estimate: 1pm",
    content: "Text Description here."
  });
  render();
}

function deleteTopic(index) {
  listData.splice(index, 1);
  render();
}

function onChange(time, timeString) {
  console.log(time, timeString);
}

function render() {
  const { TextArea } = Input;
  ReactDOM.render(
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3
        }}
        dataSource={listData}
        header={
          <>
            <div>
              <h1>Surfboard Agenda - William Wang</h1>
              <b>Add Topic</b>
              <br />
              <br />
              <Button onClick={() => addTopic()}>Add Topic</Button>
            </div>
          </>
        }
        footer={<></>}
        renderItem={(item, index) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />
            ]}
            extra={
              <div>
                <img
                  width={272}
                  alt="logo"
                  src={
                    /*
                  "https://source.unsplash.com/random/200x200?sig=" +
                  index.toString()
                */
                    "https://www.clipartmax.com/png/full/13-133992_agenda-clipart-transparent.png"
                  }
                />
                <br />
                <figcaption>Image of an Agenda</figcaption>
              </div>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <Input
                  addonBefore="Title: "
                  rows={4}
                  defaultValue={item.title}
                />
              }
              description={
                <div>
                  <span>Estimated Time: </span>
                  <DatePicker onChange={onChange} defaultValue={moment()} />
                  <TimePicker
                    onChange={onChange}
                    defaultValue={moment("00:00:00", "HH:mm:ss")}
                  />
                </div>
              }
            />

            <ReactQuill theme="snow" defaultValue={item.content} />
            <br />
            <Button onClick={() => deleteTopic(index)}>
              Delete This Topic
            </Button>
          </List.Item>
        )}
      />
      <div>
        <b>Note: </b> This is a limit of 3 topics per page. To see more, select
        the next page!
        <br />
        <br />
        <Button onClick={() => addTopic()}>Add Topic</Button>
        <br />
        <br />
        <b>Comment Section:</b> So users can communicate with each other via
        chat!
        <App />
      </div>
    </>,
    document.getElementById("container")
  );
}

render();
