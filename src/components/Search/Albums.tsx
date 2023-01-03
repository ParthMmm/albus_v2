import SpotifyCard from "@components/Album/SpotifyCard";
import { trpc } from "@utils/trpc";
import type { AlbumItem } from "@utils/types/spotify";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

function Albums({}) {
  const router = useRouter();
  const query = router.query.input as string;

  const { data, fetchNextPage, isLoading, error } =
    trpc.spotify.albumSearch.useInfiniteQuery(
      { query: query, type: "album" },
      {
        enabled: !!query,
        getNextPageParam: (lastPage) => lastPage?.offset + lastPage?.limit,
      }
    );

  console.log(data?.pages.length);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (data?.pages) {
    return (
      <div>
        <InfiniteScroll
          next={() => fetchNextPage()}
          hasMore={true}
          loader={<div>yo</div>}
          dataLength={data?.pages?.length * 20 || 0}
        >
          <div className="grid-playlists-container">
            {data?.pages.map((page) =>
              page?.items.map((album: AlbumItem) => (
                <SpotifyCard key={album.uri} album={album} />
              ))
            )}
          </div>
        </InfiniteScroll>
      </div>
    );
  }

  return null;
}

export default Albums;
