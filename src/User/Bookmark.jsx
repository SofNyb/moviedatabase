import { FaChevronRight } from "react-icons/fa";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";
import LoadingSpinner from "../Components/LoadingSpinner";
import FormatDate from "../Components/FormatDate";

const Bookmark = () => {
  const { titleBookmarks, nameBookmarks, loading, totalBookmarks } =
    useBookmarks();

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <Link to="/bookmark" className="d-flex align-items-center mb-3 text-dark">
        Bookmarks {totalBookmarks}
        <FaChevronRight />
      </Link>

      <Row className="g-3">
        {titleBookmarks.map((bookmark) => (
          <Col key={bookmark.tconst} md={6}>
            <Link
              to={`/title/${bookmark.tconst}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card>
                <Card.Img
                  variant="top"
                  src={
                    bookmark.titleData?.poster ||
                    "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Text>
                    {bookmark.titleData?.primaryTitle || bookmark.tconst}
                  </Card.Text>
                  <Card.Text className="text-muted small">
                    {FormatDate(bookmark.createdAt)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
        {nameBookmarks.map((bookmark) => (
          <Col key={bookmark.nconst} md={6}>
            <Link
              to={`/name/${bookmark.nconst}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card>
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/300x450?text=Actor"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Text>
                    {bookmark.nameData?.name || bookmark.nconst}
                  </Card.Text>
                  <Card.Text className="text-muted small">
                    {FormatDate(bookmark.createdAt)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Bookmark;
