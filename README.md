This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Customer.io Frontend Homework API

## Requirements

- Go

In order to run the API server, you will need to have Golang installed. You can download Go from the official [downloads page](https://golang.org/dl/). The [Getting Started](https://golang.org/doc/install) page explains how to install it.

## Running the API

Once Go is installed, run
```bash
make deps
```
to install this project's dependencies.

Finally, run
```bash
make run
```
to build and start the server.

By default the server will be listening for requests on port `1323`.


You may also run
```bash
make build
```
to first build a binary file, and then simply run the executable with
```bash
./ui-homework-api
```
The `make run` is simply a shorthand for the above two steps.


Once you have the binary file, you can also provide a `port` flag to modify which port the API will be listening on:
```bash
./ui-homework-api -port=1234
```

## Database

The API server uses a simple JSON file as its database, so no extra software is necessary. You will find the file under `data/customers.json`.
Whenever you close the server, it will persist the current state back to that file, so your changes won't be lost.

## Customers
A customer record looks like this:
```
{
  id: "1",
  last_updated: 1557806652,
  attributes: {
    email: "test@example.com",
    created_at: "1557806652",
    first_name: "Bruce",
    last_name: "Wayne"
  }
}
```

Each customer will have an `email` and `created_at` value in their `attributes` hash, which are required and can't be deleted.
Any other attributes are optional and can differ between customers.

## Endpoints

### `GET /customers`
List customers (paginated)

**Query Parameters**
| Parameter | Description |
------------|-------------|
| `page` | which page of customers to provide |
| `per_page` | how many customers to list per page. Default is 25 |

Example: `GET /customers?page=2&per_page=25`

**Response format**
```
{
  customers: [ ... ],
  meta: {
    page: X,
    per_page: Y,
    total: Z
  }
}
```


### `POST /customers`
Create a customer

**Expected request body format**
```
{
  "customer": {
    "attributes": {
      "email": "test@example.com",
      "your_key": "your value"
    }
  }
}
```
The `email` attribute is required.


### `GET /customers/:id`
Get a customer

**Sample response**
```
{
  "customer": {
    "id": 1,
    "last_updated": 1557806652,
    "attributes": {
      "email": "test@example.com",
      "created_at": "1557806652",
      "first_name": "Bruce",
      "last_name": "Wayne"
    }
  }
}
```


### `PATCH /customers/:id`
Update a customer's attributes

**Expected request body format**
```
{
  "customer": {
    "attributes": {
      "your_key": "your value",
      "another_key": "another value"
    }
  }
}
```

Only `attributes` will be used - you can't update a customer's ID or `last_updated` timestamp.

The provided `attributes` will be **merged** into the existing `attributes` hash.
To delete an attribute, set its value to an empty string (`""`).

### `DELETE /customers/:id`
Delete a customer
