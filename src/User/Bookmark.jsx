import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Card, Spinner, Row, Col } from "react-bootstrap";
import { userService } from "../services";

const Bookmark = () => {
  const [titleBookmarks, setTitleBookmarks] = useState([]);
  const [nameBookmarks, setNameBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const [titleBm, nameBm] = await Promise.all([
          userService.getTitleBookmarks(),
          userService.getNameBookmarks(),
        ]);
        console.log("Title bookmarks:", titleBm);
        console.log("Name bookmarks:", nameBm);
        setTitleBookmarks(titleBm);
        setNameBookmarks(nameBm);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        console.error("Error details:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const totalBookmarks = titleBookmarks.length + nameBookmarks.length;

  if (loading) return <Spinner animation="border" />;

  return (
    <div>
      <p>
        Bookmarks {totalBookmarks}
        <FaChevronRight />
      </p>

      <Row className="g-3">
        {titleBookmarks.map((bookmark) => (
          <Col key={bookmark.tconst} md={6}>
            <a href={`/title/${bookmark.tconst}`}>
              <Card>
                <Card.Img
                  variant="top"
                  src={
                    bookmark.imageURL ? bookmark.imageURL : "holder.js/100px180"
                  }
                />
                <Card.Body>
                  <Card.Text>{bookmark.tconst}</Card.Text>
                  <Card.Text className="text-muted small">
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>
        ))}
        {nameBookmarks.map((bookmark) => (
          <Col key={bookmark.nconst} md={6}>
            <a href={`/name/${bookmark.nconst}`}>
              <Card>
                <Card.Img
                  variant="top"
                  src={
                    bookmark.imageURL ? bookmark.imageURL : "holder.js/100px180"
                  }
                />
                <Card.Body>
                  <Card.Text>{bookmark.nconst}</Card.Text>
                  <Card.Text className="text-muted small">
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Bookmark;
