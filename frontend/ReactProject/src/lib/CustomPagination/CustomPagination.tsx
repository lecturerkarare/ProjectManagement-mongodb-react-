import { Pagination, PaginationItem } from '@mui/material';

import GoFirstPaginationIcon from '../../assets/icons/GoFirstPaginationIcon';
import GoLastPaginationIcon from '../../assets/icons/GoLastPaginationIcon';
import GoNextPaginationIcon from '../../assets/icons/GoNextPaginationIcon';
import GoPrevPaginationIcon from '../../assets/icons/GoPrevPaginationIcon';

const CustomPagination = ({
  count,
  page,
  setPage
}: {
  count: number | any;
  page: number | any;
  setPage: (page: number) => void;
}) => {
  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem
          classes={
            {
              // root: styles.pagination,
              // selected: styles.paginationSelected,
              // previousNext: styles.paginationPreviousNext,
              // firstLast: styles.paginationPreviousNext,
            }
          }
          components={{
            previous: GoPrevPaginationIcon,
            next: GoNextPaginationIcon,
            first: GoFirstPaginationIcon,
            last: GoLastPaginationIcon
          }}
          {...item}
        />
      )}
      count={count}
      page={page}
      onChange={(event, value) => setPage(value)}
    />
  );
};

export default CustomPagination;
