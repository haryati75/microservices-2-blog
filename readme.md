## Microservices Using Node.js and React
### Blog
This is a simple blog application that uses microservices architecture. The blog application consists of 3 services:
1. Posts
2. Comments
3. Query

#### Features
* The blog application is a simple blog application that allows users to create posts and comments. 
* The posts service is responsible for creating posts.
* The comments service is responsible for creating comments.
* The query service is responsible for querying the posts and comments.
* The blog application uses an event bus to communicate between the services.
* The blog application also includes a moderation service that moderates the comments.
* The blog application includes a frontend client that allows users to create posts and comments.

The blog application uses the following technologies:
1. NodeJS / Express
2. React
---

#### API Endpoints
##### Posts Service
1. Create Post
   - POST /posts
   - Request Body: { title: string }
   - Response: { id: string, title: string, comments: [] }
   - Example: 
     ```
     curl -X POST -H "Content-Type: application/json" -d '{"title": "Post Title"}' http://localhost:4000/posts
     ```
2. Get Posts
    - GET /posts
    - Response: [{ id: string, title: string, comments: [] }]
    - Example: 
      ```
      curl http://localhost:4000/posts
      ```

##### Comments Service
1. Create Comment
    - POST /posts/:id/comments
    - Request Body: { content: string }
    - Response: { id: string, content: string }
    - Example: 
      ```
      curl -X POST -H "Content-Type: application/json" -d '{"content": "Comment Content"}' http://localhost:4000/posts/1/comments
      ```
2. Get Comments
    - GET /posts/:id/comments
    - Response: [{ id: string, content: string }]
    - Example: 
      ```
      curl http://localhost:4000/posts/1/comments
      ```
      
---
#### Running the Application
1. Clone the repository
2. Use npm install to install all the dependencies for each service and the client
3. Start the services 
4. Start the client
5. Access the client at http://localhost:3000
6. Create posts and comments
7. Query the posts and comments
8. Moderate the comments
9. View the posts and comments
10. View the comments that have been moderated
11. View the comments that have not been moderated
12. View the comments that have been rejected

---


#### Docker Hub
The images for the services are available on Docker Hub:
1. Posts: haryati75/posts
2. Comments: haryati75/comments
3. Query: haryati75/query
4. Event Bus: haryati75/event-bus
5. Moderation: haryati75/moderation
6. Client: haryati75/client

#### Docker cheatsheet
Go to the root directory of the service and run the following commands:
```bash
docker build -t haryati75/posts ./posts
docker build -t haryati75/comments ./comments
docker build -t haryati75/query ./query
docker build -t haryati75/event-bus ./event-bus
docker build -t haryati75/moderation ./moderation
```

Run the following commands to start the services as containers:
```bash
docker run -p 4000:4000 haryati75/posts
docker run -p 4001:4001 haryati75/comments
docker run -p 4002:4002 haryati75/query
docker run -p 4005:4005 haryati75/event-bus
docker run -p 4003:4003 haryati75/moderation
```

#### Kubernetes cheatsheet
Enable Kubernetes in Docker Desktop and run the following commands in the ```/infra/k8s``` directory:
```bash
kubectl apply -f event-bus-depl.yaml
kubectl apply -f posts-depl.yaml
kubectl apply -f posts-srv.yaml
kubectl apply -f comments-depl.yaml
kubectl apply -f query-depl.yaml
kubectl apply -f moderation-depl.yaml
```

__Note__: To enable Kubernetes in Docker Desktop, go to Docker Desktop -> Settings -> Kubernetes -> Enable Kubernetes
