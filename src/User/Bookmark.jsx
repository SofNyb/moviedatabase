import { FaChevronRight } from "react-icons/fa";
import { Card, Row, Col } from "react-bootstrap";
import { useBookmarks } from "../hooks/useBookmarks";
import LoadingSpinner from "../Components/LoadingSpinner";
import FormatDate from "../Components/FormatDate";

const Bookmark = () => {
  const { titleBookmarks, nameBookmarks, loading, totalBookmarks } =
    useBookmarks();

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <a href="/bookmark" className="d-flex align-items-center mb-3 text-dark">
        Bookmarks {totalBookmarks}
        <FaChevronRight />
      </a>

      <Row className="g-3">
        {titleBookmarks.map((bookmark) => (
          <Col key={bookmark.tconst} md={6}>
            <a href={`/title/${bookmark.tconst}`}>
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
            </a>
          </Col>
        ))}
        {nameBookmarks.map((bookmark) => (
          <Col key={bookmark.nconst} md={6}>
            <a href={`/name/${bookmark.nconst}`}>
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
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Bookmark;
