import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { useBookmarks } from "../../hooks/useBookmarks";
import TitleCard from "./TitleCard";
import NameCard from "./NameCard";
import LoadingSpinner from "../../Components/LoadingSpinner";
import EmptyState from "./EmptyState";
import FormatDate from "../../Components/FormatDate";
import ActorPhoto from "../../Components/ActorPhoto";


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
        <Link to="/bookmark"
          className="d-flex align-items-center mb-3 text-dark"
        >
          Bookmarks {totalBookmarks}
          <FaChevronRight />
        </Link>
      ) : (
        <h2 className="h4 fw-bold mb-4">Your Bookmarks ({totalBookmarks})</h2>
      )}

      <div className="bg-white rounded-3 shadow-sm p-4">
        {totalBookmarks === 0 ? (
          <EmptyState message="You haven't bookmarked anything yet." />
        ) : (
          <div className="d-flex flex-column gap-3">
            {displayTitleBookmarks.map((bookmark) => (
              <TitleCard
                key={bookmark.tconst}
                href={`/titles/${bookmark.tconst}`}
                imageUrl={bookmark.titleData?.poster}
                title={bookmark.titleData?.primaryTitle || bookmark.tconst}
                subtitle={`Bookmarked on ${FormatDate(bookmark.createdAt)}`}
              />

            ))}
            {displayNameBookmarks.map((bookmark) => (
              <NameCard
                key={bookmark.nconst}
                href={`/names/${bookmark.nconst}`}
                customImage={
                <ActorPhoto
                    nconst={bookmark.nconst}
                    className="card-img-top"
                    alt={bookmark.nameData?.name || bookmark.nconst}
                  />
                }
                title={bookmark.nameData?.name || bookmark.nconst}
                subtitle={`Bookmarked on ${FormatDate(bookmark.createdAt)}`}
                isActor={true}
                nconst={bookmark.nconst}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkList;
