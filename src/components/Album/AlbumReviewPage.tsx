import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import SmallSpinner from '@components/SmallSpinner';

import { trpc } from '@utils/trpc';

const Review = dynamic(() => import('@components/Reviews/Review'), {
  suspense: true,
});

const CondensedAlbumInfo = dynamic(
  () => import('@components/Album/CondensedAlbumInfo'),
  {
    suspense: true,
  },
);

function AlbumReviewPage({}) {
  const router = useRouter();

  const spotifyId = router.query.id as string;

  console.log(spotifyId);

  const { data, fetchNextPage, isError, isLoading } =
    trpc.review.getReviewsForAlbum.useInfiniteQuery(
      { spotifyId },
      {
        enabled: !!spotifyId,
        getNextPageParam: (lastPage) => {
          lastPage?.nextCursor;
        },
      },
    );

  const albumInfo = trpc.spotify.getAlbum.useQuery(
    { spotifyId },
    {
      enabled: !!spotifyId,
    },
  );

  const album = albumInfo?.data;

  const imageURL = albumInfo?.data?.images.filter(
    (image) => image.height === 300,
  )[0]?.url;

  const artists = album?.artists.map((artist) => artist.name).join(', ');

  if (isLoading) {
    return (
      <div className="flex flex-row justify-between space-x-2 space-y-2 ">
        <div className="m-4 space-x-1">loading</div>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="flex flex-row justify-between space-x-2 space-y-2 ">
        <div className="m-4 space-x-1">error</div>
      </div>
    );
  }

  if (data.pages[0]?.reviews.length === 0) {
    return (
      <div className="flex flex-row justify-between space-x-2 space-y-2 ">
        <div className="m-4 space-x-1">no reviews, be the first!</div>
      </div>
    );
  }

  //get cursor from last page

  //   component breadcrumb based on album name and pages

  const cursor = data?.pages[data?.pages.length - 1]?.nextCursor;
  return (
    <div className="  ">
      <div className="0 p-8 text-sm flex flex-row gap-2">
        <Link href={`/album/${spotifyId}`}>
          <div className="transition-all text-gray-500 hover:text-gray-400">
            {album?.name}
          </div>
        </Link>
        <span className="text-gray-700">/</span>
        <span className="text-gray-700">Reviews</span>
      </div>

      <div className=" mt-12 px-24 pb-12 flex flex-row justify-evenly gap-24">
        <div className=" w-24 flex basis-1/4 ">
          <CondensedAlbumInfo spotifyId={spotifyId} />
        </div>
        <div className="basis-3/4 w-full">
          <div className="pb-8">
            <h1 className="text-4xl font-bold">
              Reviews for <br />
              {album?.name}
            </h1>
            <h3 className="text-2xl">{artists}</h3>
          </div>
          <div className=" rounded-2xl border-2 shadow-[6px_6px_0px_rgb(255,255,255)]">
            <InfiniteScroll
              next={() => fetchNextPage({ pageParam: cursor })}
              hasMore={cursor ? true : false}
              loader={<SmallSpinner />}
              dataLength={data?.pages?.length * 4 || 0}
            >
              <div className="flex flex-col justify-between  space-y-2 divide-y-2">
                {data.pages.map((page) =>
                  page?.reviews.map((review) => (
                    <Review key={review.id} review={review} />
                  )),
                )}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumReviewPage;
