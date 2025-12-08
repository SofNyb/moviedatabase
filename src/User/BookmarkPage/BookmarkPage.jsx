import { Row, Col } from "react-bootstrap";
import { useBookmarks } from "../../hooks/useBookmarks";
import ItemCard from "../../Components/ItemCard";
import LoadingSpinner from "../../Components/LoadingSpinner";
import EmptyState from "../../Components/EmptyState";
import FormatDate from "../../Components/FormatDate";

const BookmarkPage = () => {
  const { titleBookmarks, nameBookmarks, loading, totalBookmarks } =
    useBookmarks();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Bookmarks ({totalBookmarks})</h2>
      {totalBookmarks === 0 ? (
        <EmptyState message="You haven't bookmarked anything yet." />
      ) : (
        <Row className="g-4">
          {titleBookmarks.map((bookmark) => (
            <Col key={bookmark.tconst} xs={12} sm={6} md={4} lg={3}>
              <ItemCard
                href={`/title/${bookmark.tconst}`}
                imageUrl={bookmark.titleData?.poster}
                title={bookmark.titleData?.primaryTitle || bookmark.tconst}
                subtitle={`Bookmarked the ${FormatDate(bookmark.createdAt)}`}
              />
            </Col>
          ))}
          {nameBookmarks.map((bookmark) => (
            <Col key={bookmark.nconst} xs={12} sm={6} md={4} lg={3}>
              <ItemCard
                href={`/name/${bookmark.nconst}`}
                imageUrl="https://via.placeholder.com/300x450?text=Actor"
                title={bookmark.nameData?.name || bookmark.nconst}
                subtitle={`Bookmarked the ${FormatDate(bookmark.createdAt)}`}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default BookmarkPage;
