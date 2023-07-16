# Billing-System
Repo contains a backend for a billing system of an ecommerce platform. The backend is built using Nodejs.


----- Highlights:
1. Passwords are encrypted using hashing and then stored in database.
2. Cart initializing as soon user signs up.
3. when user is deleted, associated cart is also deleted.
4. by default, any person is given role as 'user'. Could be changed if needed.
5. if database connection gets failed, express server won't start(its a check).
6. Authentication using JWT
7. Structured code.
