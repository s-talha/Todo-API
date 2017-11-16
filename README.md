# Todo API

Todo API contains following features:

- Add todos to a list
- Remove todos from the list
- Mark todos as done
- Unmark todos as done
- Retrieve all events associated with a list of todos
- The API should not loose any data if restarted

# Tech stack
- Node.js
- Express
- Docker
- Mongodb

# Run locally

Install the required dependencies:

> npm install

Run Express:

> npm start

# Running locally using Docker

Use docker-compose to build the service and mongodb containers

> docker-compose build

Then start the the containers:

> docker-compose up

# Run test cases
To execute the test cases:

> npm test

# Endpoints of Todo API

Use [Postman](https://www.getpostman.com) or [cURL](https://curl.haxx.se/) to directly access the API 

### Get events of all tasks

Get all tasks alongwith assoiciated events and other attributes in chronological order sorted by last update

> curl -i -X GET http://localhost:3000/tasks

```
{
    "status": true,
    "todo": [
        {
            "task_name": "Task1",
            "event": "todoUnMarkedAsDone",
            "updated_at": "2017-11-16T21:32:22.868Z",
            "events": "todoPending, todoUnMarkedAsDone",
            "task_id": "5a0e032780a7d6001d67afaf"
        },
        {
            "task_name": "Task2",
            "event": "todoUnMarkedAsDone",
            "updated_at": "2017-11-16T21:37:59.991Z",
            "events": "todoPending, todoUnMarkedAsDone",
            "task_id": "5a0e034180a7d6001d67afb0"
        }
    ]
}
```

### Get a task by Id

> curl -i -X GET http://localhost:3000/tasks/5a0e032780a7d6001d67afaf
```
{
    "task_id": "5a0e032780a7d6001d67afaf",
    "task_name": "Task2",
    "event": "todoUnMarkedAsDone",
    "created_at": "2017-11-16T21:29:11.484Z",
    "updated_at": "2017-11-16T21:32:22.868Z",
    "events": "todoPending, todoUnMarkedAsDone"
}
```

### Create a task

> curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Task1"}' http://localhost:3000/tasks
```
{
    "task_id": "5a0e0b1e48d533001eca546a",
    "task_name": "Task1",
    "event": "todoPending",
    "created_at": "2017-11-16T22:03:10.029Z",
    "updated_at": "2017-11-16T22:03:10.029Z",
    "events": "todoPending"
}
```

### Update a task's event

#### Update event 'todoUnMarkedAsDone'
> curl -i -X PUT -H 'Content-Type: application/json' -d '{"event": "todoUnMarkedAsDone"}' http://localhost:3000/tasks/5a0e0b1e48d533001eca546a
```
{
    "task_id": "5a0e0b1e48d533001eca546a",
    "task_name": "Task1",
    "event": "todoUnMarkedAsDone",
    "created_at": "2017-11-16T22:03:10.029Z",
    "updated_at": "2017-11-16T22:05:55.166Z",
    "events": "todoPending, todoUnMarkedAsDone"
}
```
#### Update event 'todoMarkedAsDone'
> curl -i -X PUT -H 'Content-Type: application/json' -d '{"event": "todoMarkedAsDone"}' http://localhost:3000/tasks/5a0e0b1e48d533001eca546a

```
{
    "task_id": "5a0e0b1e48d533001eca546a",
    "task_name": "Task1",
    "event": "todoMarkedAsDone",
    "created_at": "2017-11-16T22:03:10.029Z",
    "updated_at": "2017-11-16T22:05:57.166Z",
    "events": "todoPending, todoUnMarkedAsDone, todoMarkedAsDone"
}
```

### Delete a task
> curl -i -X DELETE http://localhost:3000/tasks/5a0e0b1e48d533001eca546a
```
{"message":"Task successfully deleted"}
```
