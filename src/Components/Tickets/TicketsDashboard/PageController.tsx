import React from "react";
import { Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface IProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  loadTickets: () => Promise<void>;
}

const PageController: React.FC<IProps> = ({
  page,
  totalPages,
  setPage,
  loadTickets,
}) => {
  const onMinPage = !(page > 0);
  const onMaxPage = !(page + 1 < totalPages);

  const handlePageDown = () => {
    console.log("clciked down");

    if (!onMinPage) {
      setPage(page - 1);
      loadTickets();
    }
  };

  const handlePageUp = () => {
    console.log("clciked up");

    if (!onMaxPage) {
      setPage(page + 1);
      loadTickets();
    }
  };
  return (
    <div className="pageNumbers">
      <Icon
        name="arrow alternate circle left"
        link
        disabled={onMinPage}
        onClick={() => handlePageDown()}
      />
      <div className="currentPage">{page + 1}</div>
      <Icon
        name="arrow alternate circle right"
        link
        disabled={onMaxPage}
        onClick={() => handlePageUp()}
      />
    </div>
  );
};

export default observer(PageController);
