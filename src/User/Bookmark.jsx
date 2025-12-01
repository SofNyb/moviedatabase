import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Card, Spinner } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
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
        setTitleBookmarks(titleBm);
        setNameBookmarks(nameBm);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
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
            <Card>
              <Card.Body>
                <Card.Text>{bookmark.tconst}</Card.Text>
                <Card.Text className="text-muted small">
                  {new Date(bookmark.createdAt).toLocaleDateString()}
                </Card.Text>
                <a
                  href={bookmark.titleURL}
                  className="btn btn-sm btn-outline-dark"
                >
                  View Details
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {nameBookmarks.map((bookmark) => (
          <Col key={bookmark.nconst} md={6}>
            <Card>
              <Card.Body>
                <Card.Text>{bookmark.nconst} (Person)</Card.Text>
                <Card.Text className="text-muted small">
                  {new Date(bookmark.createdAt).toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Bookmark;
