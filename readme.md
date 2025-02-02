## Microservices Using Node.js and React
by Stephen Grider on Udemy

Student: Haryati Hassan
Started: 2024-Oct

### Blog Application
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

It is not suitable for production use.  Use for learning.

### 3rd party apps and services in local development
1. Docker Desktop with Docker Hub account
2. Kubernetes (enabled in Docker Desktop)
3. Ingress Nginx (install using Helm) 
   * Installation guide: https://kubernetes.github.io/ingress-nginx/deploy/#using-helm
   * Repository: https://github.com/kubernetes/ingress-nginx
4. Skaffold (install using Chocolatey)
   * Installation guide: https://skaffold.dev/docs/install/
5. IntelliJ IDEA (optional) or Visual Studio Code
6. Postman (optional)

***Installation note***: `Ingress Nginx` and NOT Nginx Ingress library 

#### Kubernetes Services and ClusterIP/Port
1. Posts Service - http://posts-clusterip-srv:4000
2. Comments Service - http://comments-srv:4001
3. Query Service - http://query-srv:4002
4. Event Bus Service - http://event-bus-srv:4005
5. Moderation Service - http://moderation-srv:4003

For Service with NodePort:
6. Posts Service - http://posts-srv:4000

For Ingress Nginx:
7. Posts Service - http://posts.com (localhost using hosts file)

For Client:
7. Client - http://localhost:3000

---

#### API Endpoints via localhost
##### Posts Service
1. Create Post
   - `POST /posts`
   - Request Body: `{ title: string }`
   - Response: `{ id: string, title: string, comments: [] }`
   - Example: 
     ```
     curl -X POST -H "Content-Type: application/json" -d '{"title": "Post Title"}' http://localhost:4000/posts
     ```
2. Get Posts
    - `GET /posts`
    - Response: `[{ id: string, title: string, comments: [] }]`
    - Example: 
      ```
      curl http://localhost:4000/posts
      ```

##### Comments Service
1. Create Comment
    - `POST /posts/:id/comments`
    - Request Body: `{ content: string }`
    - Response: `{ id: string, content: string }`
    - Example: 
      ```
      curl -X POST -H "Content-Type: application/json" -d '{"content": "Comment Content"}' http://localhost:4000/posts/1/comments
      ```
2. Get Comments
    - `GET /posts/:id/comments`
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
**To build the images and run the containers:**
1. Change URLs in all index.js to localhost instead of k8 service names

1. Go to the root directory of the service and run the following commands:
```bash
docker build -t haryati75/posts ./posts
docker build -t haryati75/comments ./comments
docker build -t haryati75/query ./query
docker build -t haryati75/event-bus ./event-bus
docker build -t haryati75/moderation ./moderation
```

2. Push the images to Docker Hub:
```bash
docker push haryati75/posts
docker push haryati75/comments
docker push haryati75/query
docker push haryati75/event-bus
docker push haryati75/moderation
```

3. Run the following commands to start the services as containers:
```bash
docker run -p 4000:4000 haryati75/posts
docker run -p 4001:4001 haryati75/comments
docker run -p 4002:4002 haryati75/query
docker run -p 4005:4005 haryati75/event-bus
docker run -p 4003:4003 haryati75/moderation
```

4. To clean up unused images, containers and volumes:
```bash
docker system prune -a --volumes
docker image prune -a
```

5. To execute shell in container:
```bash
docker exec it <container)id> sh
```

---
### Running the application in Kubernetes

#### Kubernetes cheatsheet
Enable Kubernetes in Docker Desktop and run the following commands in the ```/infra/k8s``` directory:
```bash
kubectl apply -f event-bus-depl.yaml
kubectl apply -f posts-depl.yaml
kubectl apply -f posts-srv.yaml
kubectl apply -f comments-depl.yaml
kubectl apply -f query-depl.yaml
kubectl apply -f moderation-depl.yaml
kubectl apply -f client-depl.yaml
kubectl apply -f ingress-srv.yaml
```

To get the Kubernetes pods, services and deployments:
```bash
kubectl get services
kubectl get pods
kubectl get deployments
```

__Note__: To enable Kubernetes in Docker Desktop, go to Docker Desktop -> Settings -> Kubernetes -> Enable Kubernetes

Run the following ```kubectl``` after updating an image:
```bash
kubectl rollout restart deployment <deployment-name>
```
### _Ingress Nginx_ in Kubernetes
Pre-requisite: Helm is installed in the local machine. Helm is a package manager for Kubernetes.
To install Ingress Nginx in Kubernetes, use Helm:
```bash
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

Without Helm, use the following command:
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0/deploy/static/provider/cloud/deploy.yaml
```

To check for ingress-nginx:
```bash
kubectl get services -n ingress-nginx
kubectl get pods -n ingress-nginx
kubectl get deployments -n ingress-nginx
kubectl get services -A  # to get all services, regardless of namespace
```

```kubectl``` command to wait for the ingress-nginx controller to be ready:
```bash
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s
```
The output should be:
```
pod/ingress-nginx-controller condition met
```

#### Setting up posts.com locally

1. apply the ingress-srv.yaml file
```bash
kubectl apply -f ingress-srv.yaml
```
2. ensure port 80 is not used by other services, except for Docker backend
```powershell
netstat -anb
```
Scroll to the top of the output: 
```
Active Connections

  Proto  Local Address          Foreign Address        State
  TCP    0.0.0.0:80             0.0.0.0:0              LISTENING
 [com.docker.backend.exe]
```

3. Add the following to the ```hosts``` file:
```bash
127.0.0.1 posts.com
```
For Windows, the hosts file is located at ```C:\Windows\System32\drivers\etc\hosts```
For Mac/Linux, the hosts file is located at ```/etc/hosts```


Note on Ingress Nginx:
* The Ingress Nginx controller is a load balancer that routes traffic to the services in the Kubernetes cluster.
* It does not differentiate the http methods (GET, POST, PUT, DELETE) and routes all traffic to the services.

#### Skaffold
Skaffold is a tool that automates the development workflow for Kubernetes applications. 
It is used to build, push and deploy the services in Kubernetes.

1. Install Skaffold using Chocolatey in Windows:
```bash
choco install -y skaffold
```

2. To run Skaffold, use the following command in the root directory of the project where the skaffold.yaml file is located:
```bash
skaffold dev
```

3. To ensure hot reload, package.json file in each backend service should have the following:
```JSON
"scripts": { 
  "start": "nodemon index.js"
}
```
For React, it is currently hot reloaded by react-scripts/CRA.

This means, any code changes will be automatically reflected in the running containers.

4. To stop Skaffold, use the following command in the running Skaffold terminal:
```
CTRL + C
```