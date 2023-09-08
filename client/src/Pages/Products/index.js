import React from 'react'
import Card from '../../Components/Card'
import { Grid, Flex, Button } from '@chakra-ui/react'

import { useInfiniteQuery } from 'react-query'
import { fetchProductsList } from '../../api'

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", fetchProductsList,
    {
      getNextPageParam: (lastGroup, allGroups) => {
        const morePagesExist = lastGroup?.length === 12;

        if (!morePagesExist) return;

        return allGroups.length + 1;
      }
    });
  console.log(data)
  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occured: " + error.message;

  return (
    <div>
      <Grid templateColumns={"repeat(3, 1fr)"} gap={4}>
        {
          data.pages.map((group, key) => (
            <React.Fragment key={key}>
              {
                group.map((card) =>
                (
                  <Card key={card._id} item={card} />
                ))
              }
            </React.Fragment>
          ))
        }
      </Grid>
      <Flex mt="10" justifyContent="center">
        <Button
          isLoading={isFetching}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>
      </Flex>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  )
}

export default Products