import React from "react";
import type { ExtendedAppProps } from "@lib/types";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from '@chakra-ui/react'

import "@lib/styles/index.css";
import WithAuth from "@lib/auth/WithAuth";

export const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: ExtendedAppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        {Component.auth ? (
          <WithAuth options={Component.auth}>
            <Component {...pageProps} />
          </WithAuth>
        ) : (
          <Component {...pageProps} />
        )}
        </ChakraProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
