/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernIr from "../../..";

export interface WebSocketChannel extends FernIr.Declaration {
    name: FernIr.WebSocketName;
    displayName: string | undefined;
    path: FernIr.HttpPath;
    auth: boolean;
    headers: FernIr.HttpHeader[];
    queryParameters: FernIr.QueryParameter[];
    pathParameters: FernIr.PathParameter[];
    /** The messages that can be sent and received on this channel */
    messages: FernIr.WebSocketMessage[];
    examples: FernIr.ExampleWebSocketSession[];
}
