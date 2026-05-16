# Flask restaurant web app

A small full-stack restaurant demo: public menu, shopping basket in session, orders tied to logged-in users, table reservations with capacity rules, and an admin area for menu and reservations.

## Features

- **Auth** — registration, login, logout ([Flask-Login](https://github.com/maxcountryman/flask-login)); passwords hashed with **bcrypt**
- **Menu** — list dishes, dish detail, add items to basket (session)
- **Orders** — checkout basket into an order, list orders, view order total, cancel order
- **Reservations** — book a table type (party size); one active reservation per user; limited seats per table category
- **Admin** (user whose nickname is exactly `admin`) — add menu items with image upload, toggle or delete menu rows, list and remove reservations
- **Security** — CSRF token checks on mutating forms; `Content-Security-Policy` with per-request script nonce; strict session cookie SameSite

## Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Web          | Flask 3                             |
| ORM / DB     | SQLAlchemy 2, PostgreSQL (`JSONB` for order payload) |
| DB driver    | psycopg2-binary                     |
| Config       | python-dotenv                         |

## Prerequisites

- Python 3.10+ (tested in a 3.14 venv locally)
- A running **PostgreSQL** instance and an empty database (or one you are allowed to reset for dev)

## Setup

1. **Clone the repository** and enter the project directory.

2. **Create a virtual environment** and install dependencies:

   ```bash
   python -m venv .venv
   source .venv/bin/activate   # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Create a `.env` file** in the project root (do not commit it; it is gitignored):

   ```env
   SECRET_KEY=your-long-random-secret
   DB_URL=postgresql+psycopg2://USER:PASSWORD@HOST:PORT/DATABASE
   ```

   Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your PostgreSQL connection details.

4. **Create database tables** (SQLAlchemy metadata):

   ```bash
   python database.py
   ```

5. **Create an admin account** — register through `/register` with nickname **`admin`** (admin checks use `current_user.nickname == "admin"`).

6. **Run the app**:

   ```bash
   python app.py
   ```

   Open `http://127.0.0.1:5000` in a browser.

## Environment variables

| Variable     | Required | Description                                      |
| ------------ | -------- | ------------------------------------------------ |
| `SECRET_KEY` | Yes      | Flask secret key for sessions and CSRF           |
| `DB_URL`     | Yes      | SQLAlchemy URL (see example above)               |

## Project layout (main pieces)

| Path            | Role                                      |
| --------------- | ----------------------------------------- |
| `app.py`        | Flask routes, login, CSP, uploads to `static/menu/` |
| `database.py`   | Engine, session, models, `create_db` helper |
| `templates/`    | Jinja2 HTML                               |
| `static/`       | CSS and uploaded menu images              |

## Main HTTP routes

| Route                    | Notes                                      |
| ------------------------ | ------------------------------------------ |
| `/`                      | Home                                       |
| `/register`, `/login`    | Auth                                       |
| `/logout`                | Logout (login required)                    |
| `/menu`                  | Active menu items                          |
| `/position/<name>`       | Dish page; add to basket                   |
| `/create_order`          | Place order from basket                    |
| `/my_orders`, `/my_order/<id>` | Order history and detail           |
| `/cancel_order/<id>`     | POST — mark order cancelled                |
| `/reserved`              | Table reservation                          |
| `/add_position`          | Admin — new menu item + image              |
| `/check_menu`            | Admin — manage menu                        |
| `/reservations_check`    | Admin — list/delete reservations           |
| `/test_basket`           | Debug — returns session basket as JSON     |

## License

No license file is included; add one if you plan to publish this as open source.
