import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh" }}
    >
      <Spinner animation="border" />
    </div>
  );
};

export default LoadingSpinner;
