import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import appStyles from "../../App.module.css";

/**
 * Component for rendering a single post page.
 */
function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div class="container">
      <div className={appStyles.Content}>
        <Row className="justify-content-center">
          <Col lg={8}>
            {post ? <Post {...post} setPosts={setPost} postPage /> : null}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PostPage;
