### Microservices Using Node.js and React
#### Blog
This is a simple blog application that uses microservices architecture. The blog application consists of 3 services:
1. Posts
2. Comments
3. Query

The blog application uses the following technologies:
1. NodeJS / Express
2. React

The blog application is a simple blog application that allows users to create posts and comments. 
The posts service is responsible for creating posts, 
the comments service is responsible for creating comments, 
and the query service is responsible for querying the posts and comments.

### API Endpoints
#### Posts Service
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
3. Create Comment
    - POST /posts/:id/comments
    - Request Body: { content: string }
    - Response: { id: string, content: string }
    - Example: 
      ```
      curl -X POST -H "Content-Type: application/json" -d '{"content": "Comment Content"}' http://localhost:4000/posts/1/comments
      ```
4. Get Comments
    - GET /posts/:id/comments
    - Response: [{ id: string, content: string }]
    - Example: 
      ```
      curl http://localhost:4000/posts/1/comments
      ```
      
