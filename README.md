# Order Management Service

This project is a minimal Spring Boot application that provides REST endpoints for managing orders. Orders are stored in memory for demonstration purposes.

## Building

Use Gradle to build the project:

```bash
./gradlew build
```

## Running

Run the application using the Spring Boot Gradle plugin:

```bash
./gradlew bootRun
```

The service starts on port `8080`.

## Endpoints

* `POST /orders` – create a new order. Example JSON body:
  ```json
  { "product": "book", "quantity": 2 }
  ```
  The response includes a `Location` header pointing to the created resource.

* `GET /orders/{id}` – retrieve a specific order by ID.
* `GET /orders` – list all orders.

## Testing

Execute the tests with:

```bash
./gradlew test
```
