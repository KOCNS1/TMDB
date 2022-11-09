import { useEffect } from "react";

type Props = {};

const Validate = (props: Props) => {
  useEffect(() => {
    localStorage.setItem("tmdb-request-token", "true");
    window.close();
  }, []);
  return <div>Validate</div>;
};

export default Validate;
