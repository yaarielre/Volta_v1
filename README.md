# Volta_v1

Volta_v1 is a full-stack web application designed to help users discover the best video game deals across multiple digital stores. The platform integrates with the CheapShark API through a custom ASP.NET Core backend, providing a fast, scalable, and organized architecture while delivering a modern user experience built with React.

---

## Overview

The application allows users to browse thousands of discounted games, search by title, filter offers by store and price, and explore detailed information about each game. The project follows a client-server architecture, separating business logic from the presentation layer to ensure maintainability and scalability.

---

## Features

- Browse the latest game deals.
- Search games by title.
- Filter deals by digital store.
- Filter games by maximum price.
- View detailed game information.
- Responsive interface for desktop and mobile devices.
- High-performance API consumption.
- Clean and maintainable architecture.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- ASP.NET Core Web API
- C#
- REST API
- CheapShark API

---

## Project Structure

```text
Volta_v1
│
├── Backend
│   ├── Controllers
│   ├── Services
│   ├── Models
│   ├── DTOs
│   └── Program.cs
│
├── Frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md
```

---

## Installation

Clone the repository.

```bash
git clone https://github.com/your-username/Volta_v1.git
```

Navigate into the project.

```bash
cd Volta_v1
```

### Backend

```bash
cd Backend
dotnet restore
dotnet run
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## Architecture

The project follows a layered architecture:

- Presentation Layer (React)
- REST API (ASP.NET Core)
- Service Layer
- External CheapShark API

This separation of concerns simplifies maintenance, testing, and future scalability.

---

## Future Improvements

- User authentication
- Wishlist management
- Price history
- Favorite games
- Notifications for price drops
- Dark mode
- Pagination and advanced filters

---

## Author

**Yariel Rojas Evangelista**

Software Developer

GitHub: https://github.com/yaarielre

LinkedIn: https://www.linkedin.com/in/yariel-rojas-evangelista/

---

## License

This project is available for educational and portfolio purposes.
