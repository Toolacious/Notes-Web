import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ApolloClient, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloLink, Observable } from "apollo-link";
import { onError } from "apollo-link-error";
import { createUploadLink } from "apollo-upload-client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { AuthProvider } from "./routes/auth";
import { setAccessToken, getAccessToken } from "./accessToken";

// Create an http link:
const httpLink = createUploadLink({
    uri: "/graphql",
    credentials: "include",
});

const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable((observer) => {
            let handle;
            Promise.resolve(operation)
                .then((operation) => {
                    const accessToken = getAccessToken();
                    if (accessToken) {
                        operation.setContext({
                            headers: {
                                authorization: `bearer ${accessToken}`,
                            },
                        });
                    }
                })
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    });
                })
                .catch(observer.error.bind(observer));

            return () => {
                if (handle) handle.unsubscribe();
            };
        })
);

const RefreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
        const token = getAccessToken();
        if (!token) {
            return true;
        }

        try {
            const { exp } = jwtDecode(token);
            if (Date.now() >= exp * 1000) {
                return false;
            } else {
                return true;
            }
        } catch {
            return false;
        }
    },
    fetchAccessToken: () => {
        return fetch("/refresh_token", {
            method: "POST",
            credentials: "include",
        });
    },
    handleFetch: (accessToken) => {
        console.log(accessToken);
        setAccessToken(accessToken);
    },
    handleError: (err) => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
    },
});

const errorLink = onError(({ graphQLErrors, networkError, errorMessage }) => {
    console.log(graphQLErrors);
    console.log(networkError);
});

const client = new ApolloClient({
    link: ApolloLink.from([RefreshLink, errorLink, requestLink, httpLink]),
    cache: new InMemoryCache().restore({}),
    uri: "",
});

const wrappedApp = (
    <ApolloProvider client={client}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ApolloProvider>
);

ReactDOM.render(wrappedApp, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
