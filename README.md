# E-Commerce System with Orders & Payments

## Description

This is a simple e-commerce system with a PHP backend and Vue.js frontend, implementing a standard currency-based payment system. [cite: 1, 2, 3] The system focuses on how orders are stored, ensuring that historical order data remains intact even if product prices change in the future. [cite: 4, 5]

## Requirements

* Backend: PHP framework (Laravel/Symfony/CodeIgniter, etc.) [cite: 3]
* Frontend: Vue.js (Vue Router & Vuex/Pinia for state management) [cite: 3]
* User Balance: Each user has an initial balance (e.g., $1000). [cite: 3]
* Order System:
    * Store order details independently (do not rely on the current product price). [cite: 4, 5]
    * Save the product name, price at the time of purchase, quantity, and total. [cite: 5]
* Payment Processing:
    * Validate balance before checkout. [cite: 5, 6]
    * Deduct the amount upon successful payment. [cite: 6]
    * Handle errors asynchronously. [cite: 6]
* Checkout Process: Collect user details & address. [cite: 6, 7]
* Email Notifications: Send an order confirmation email. [cite: 7]

## Installation

While the specific steps may vary slightly depending on the chosen PHP framework, here's a general installation guide:

### Backend Setup (Example using Laravel)

1.  Install PHP and Composer.
2.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

3.  Install backend dependencies:

    ```bash
    composer install
    ```

4.  Create a copy of the `.env.example` file as `.env` and configure the database settings, mail settings, etc.
5.  Generate an application key:

    ```bash
    php artisan key:generate
    ```

6.  Run database migrations:

    ```bash
    php artisan migrate
    ```

7.  (Optional) Seed the database:

    ```bash
    php artisan db:seed
    ```

8.  Start the backend server:

    ```bash
    php artisan serve
    ```

### Frontend Setup (Vue.js)

1.  Install Node.js and npm or Yarn.
2.  Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

3.  Install frontend dependencies:

    ```bash
    npm install # or yarn install
    ```

4.  (Optional) Configure any frontend environment variables.
5.  Build the frontend application:

    ```bash
    npm run build # or yarn build
    ```

6.  Start the frontend development server (if needed):

    ```bash
    npm run serve # or yarn serve
    ```

### General Setup

* **Database Setup:** Create the necessary database and configure the backend `.env` file with the database credentials.
* **Email Configuration:** Configure the email settings in the backend `.env` file to enable order confirmation emails.

##   API Documentation

The API documentation is available as a Postman collection. To use it:

1.  Download and install [Postman](https://www.postman.com/).
2.  Import the `ecommerce-api.json` file (located in the `ecommerce-backend` directory  repository) into Postman.
3.  Set up the `base_url` environment variable in Postman:
    * Go to the "Environments" section in Postman.
    * Create a new environment (e.g., "Local Development").
    * Add a variable named `base_url` and set its value to the base URL of your API (e.g., `http://localhost:8000/api`).
    * Select this environment before sending requests.

The collection includes endpoints for:

* Users: Retrieving user balance.
* Products: Getting product lists and details.
* Orders: Creating orders and retrieving order details.

Please refer to the request descriptions within the Postman collection for detailed information on each endpoint, including request parameters, body structure, and expected responses.
