package com.example.orders;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final Map<Long, Order> store = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(1);

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody Order request) {
        long id = sequence.getAndIncrement();
        Order order = new Order(id, request.getProduct(), request.getQuantity(), LocalDateTime.now());
        store.put(id, order);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "/orders/" + id)
                .body(order);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> get(@PathVariable Long id) {
        Order order = store.get(id);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public Collection<Order> list() {
        return store.values();
    }
}
