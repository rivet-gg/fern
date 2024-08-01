# Reference

## Headers

<details><summary><code>client.headers.<a href="/src/api/resources/headers/client/Client.ts">send</a>({ ...params }) -> SeedLiteral.SendResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.headers.send({
    query: "What is the weather today",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `SeedLiteral.SendLiteralsInHeadersRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Headers.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Inlined

<details><summary><code>client.inlined.<a href="/src/api/resources/inlined/client/Client.ts">send</a>({ ...params }) -> SeedLiteral.SendResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.inlined.send({
    temperature: 10.1,
    query: "What is the weather today",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `SeedLiteral.SendLiteralsInlinedRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Inlined.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Path

<details><summary><code>client.path.<a href="/src/api/resources/path/client/Client.ts">send</a>(id) -> SeedLiteral.SendResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.path.send("123");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `"123"`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Path.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Query

<details><summary><code>client.query.<a href="/src/api/resources/query/client/Client.ts">send</a>({ ...params }) -> SeedLiteral.SendResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.query.send({
    query: "What is the weather today",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `SeedLiteral.SendLiteralsInQueryRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Query.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Reference

<details><summary><code>client.reference.<a href="/src/api/resources/reference/client/Client.ts">send</a>({ ...params }) -> SeedLiteral.SendResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.reference.send({
    prompt: "You are a helpful assistant",
    stream: false,
    query: "What is the weather today",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `SeedLiteral.SendRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Reference.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
