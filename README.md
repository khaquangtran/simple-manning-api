## Simple Manning API

Recently I bought a lot of books from [Manning](https://manning.com/). For those who don't know, Manning is an American publisher specializing in computing content. The way their website works is pretty simple, but it's still intrigue me into implementing a replication from their system.

## Production

I deployed this API into an EC2 instance so that everyone could test it.

```text
ec2-3-27-248-71.ap-southeast-2.compute.amazonaws.com
```

## Local dev setup

Run this from the project root:

```shell
sh scripts/setup.sh
```

This would:

- Install `node_modules`.

And then run:

```shell
sh scripts/dev.sh
```

This would:
- Run `docker-compose.yaml`.
- Apply `schema` into the database.


## Support API

Currently, there are 6 endpoints that can play around.

1. Signing up.

```http request
POST http://localhost:8080/signup
Content-Type: application/json

{
    "firstName": "first_name",
    "lastName": "last_name",
    "email": "your_email@mail.com",
    "password": "your_secure_password"
}
```

2. Logging in.

```http request
POST https://localhost:8080/login
Content-Type: application/json

{
    "email": "your_email@mail.com",
    "password": "your_secure_password"
}
```

3. Adding book into the cart.

```http request
POST http://localhost:8080/carts
Authorization: JWT_TOKEN
Content-Type: application/json

{
  "bookId": 1
}
```

4. Adjusting book quantity in the cart.

```http request
PUT http://localhost:8080/carts/1
Authorization: JWT_TOKEN
Content-Type: application/json

{
  "quantity": 2
}
```

5. Getting customer's cart.

```http request
GET http://localhost:8080/carts?page=1&take=20
Authorization: JWT_TOKEN
```

6. Doing checkout

```http request
POST http://localhost:8080/checkout
Authorization: JWT_TOKEN
Content-Type: application/json

{
  "token": "secure_token_generated_from_payment_service",
  "paymentType": "PAYPAL"
}
```

### Planning

- [ ] CI/CD with Gitlab Actions.
- [ ] Inspect new images pushed with WatchTower. 