import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { useBookmarks } from "../../hooks/useBookmarks";
import ItemCard from "./ItemCard";
import LoadingSpinner from "../LoadingSpinner";
import EmptyState from "./EmptyState";
import FormatDate from "../FormatDate";

const BookmarkList = ({ isPreview = false, limit = null }) => {
  const { titleBookmarks, nameBookmarks, loading, totalBookmarks } =
    useBookmarks();

  if (loading) return <LoadingSpinner />;

  // Limit items for preview mode
  const displayTitleBookmarks = limit
    ? titleBookmarks.slice(0, limit)
    : titleBookmarks;
  const displayNameBookmarks =
    limit && displayTitleBookmarks.length < limit
      ? nameBookmarks.slice(0, limit - displayTitleBookmarks.length)
      : limit
      ? []
      : nameBookmarks;

  return (
    <div className={isPreview ? "" : "container py-4"}>
      {isPreview ? (
        <Link
          to="/bookmark"
          className="d-flex align-items-center mb-3 text-dark"
        >
          Bookmarks {totalBookmarks}
          <FaChevronRight />
        </Link>
      ) : (
        <h2 className="mb-4">Your Bookmarks ({totalBookmarks})</h2>
      )}

      {totalBookmarks === 0 ? (
        <EmptyState message="You haven't bookmarked anything yet." />
      ) : (
        <Row className={isPreview ? "g-3" : "g-4"}>
          {displayTitleBookmarks.map((bookmark) => (
            <Col
              key={bookmark.tconst}
              xs={12}
              sm={6}
              md={isPreview ? 6 : 4}
              lg={isPreview ? 6 : 3}
            >
              <ItemCard
                href={`/title/${bookmark.tconst}`}
                imageUrl={bookmark.titleData?.poster}
                title={bookmark.titleData?.primaryTitle || bookmark.tconst}
                subtitle={`Bookmarked on ${FormatDate(bookmark.createdAt)}`}
              />
            </Col>
          ))}
          {displayNameBookmarks.map((bookmark) => (
            <Col
              key={bookmark.nconst}
              xs={12}
              sm={6}
              md={isPreview ? 6 : 4}
              lg={isPreview ? 6 : 3}
            >
              <ItemCard
                href={`/name/${bookmark.nconst}`}
                imageUrl="https://via.placeholder.com/300x450?text=Actor"
                title={bookmark.nameData?.name || bookmark.nconst}
                subtitle={`Bookmarked on ${FormatDate(bookmark.createdAt)}`}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default BookmarkList;
