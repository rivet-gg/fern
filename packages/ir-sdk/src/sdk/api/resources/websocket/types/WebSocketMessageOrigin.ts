/**
 * This file was auto-generated by Fern from our API Definition.
 */

export type WebSocketMessageOrigin = "client" | "server";

export const WebSocketMessageOrigin = {
    Client: "client",
    Server: "server",
    _visit: <R>(value: WebSocketMessageOrigin, visitor: WebSocketMessageOrigin.Visitor<R>) => {
        switch (value) {
            case WebSocketMessageOrigin.Client:
                return visitor.client();
            case WebSocketMessageOrigin.Server:
                return visitor.server();
            default:
                return visitor._other();
        }
    },
} as const;

export declare namespace WebSocketMessageOrigin {
    interface Visitor<R> {
        client: () => R;
        server: () => R;
        _other: () => R;
    }
}
