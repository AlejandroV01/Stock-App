"use client";

import React from "react";
import { Flex, Spinner } from "@granite/core";
import useSWR from "swr";
import fetcher from "../../functions/fetcher";
import useInViewport from "../../Hooks/useInViewport";
import PreviewChart from "../Charts/Preview/PreviewChart";

interface Props {
  coin_id: string;
}

const oneDayInSeconds = 86400000;
const timestampNow = Date.now();

const HistoryPreview = ({ coin_id }: Props) => {
  const { isInViewport, ref } = useInViewport();

  const endpoint = `https://api.coincap.io/v2/assets/${coin_id}/history?interval=m30&start=${
    timestampNow - oneDayInSeconds
  }&end=${timestampNow}`;

  const shouldFetchData = isInViewport;

  const { data, error, isLoading } = useSWR(
    () => (shouldFetchData ? endpoint : null),
    fetcher
  );

  // we need this because the ref in the return function always needs to be rendered
  // that is how we determine if the component is in screen or not
  const renderPreview = () => {
    if (isLoading) {
      return (
        <Flex justifyContent="flex-end">
          <Spinner />
        </Flex>
      );
    }

    if (error || !data) {
      return (
        <Flex justifyContent="flex-end">
          <span>Error</span>
        </Flex>
      );
    }

    return <PreviewChart data={data.data} />;
  };

  return <div ref={ref}>{renderPreview()}</div>;
};

export default HistoryPreview;
