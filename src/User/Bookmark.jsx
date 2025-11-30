import { FaChevronRight } from "react-icons/fa";
import { Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { bookmarks, movies } from "../data/dummyData";

const Bookmark = () => {
  return (
    <div>
      <p>
        Bookmark
        <FaChevronRight />
      </p>

      <Row className="g-3">
        {bookmarks.map((bookmark) => {
          const movie = movies.find((m) => m.id === bookmark.movieId);
          return (
            <Col key={bookmark.id} md={6}>
              <Card>
                <Card.Body>
                  <Card.Text>{movie?.title}</Card.Text>
                  <Card.Text className="text-muted small">
                    {bookmark.addedDate}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Bookmark;
