import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Card, Spinner, Row, Col } from "react-bootstrap";
import { userService, titleService, nameService } from "../services";
import FormatDate from "../Components/FormatDate";

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

        // Fetch full title details for each bookmark
        const titleDetailsPromises = titleBm.map((bookmark) =>
          titleService
            .getTitleById(bookmark.tconst)
            .then((titleData) => ({ ...bookmark, titleData }))
            .catch((err) => {
              console.error(`Error fetching title ${bookmark.tconst}:`, err);
              return bookmark;
            })
        );

        // Fetch full name details for each bookmark
        const nameDetailsPromises = nameBm.map((bookmark) =>
          nameService
            .getNameById(bookmark.nconst)
            .then((nameData) => ({ ...bookmark, nameData }))
            .catch((err) => {
              console.error(`Error fetching name ${bookmark.nconst}:`, err);
              return bookmark;
            })
        );

        const [titlesWithDetails, namesWithDetails] = await Promise.all([
          Promise.all(titleDetailsPromises),
          Promise.all(nameDetailsPromises),
        ]);
        setTitleBookmarks(titlesWithDetails);
        setNameBookmarks(namesWithDetails);
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
