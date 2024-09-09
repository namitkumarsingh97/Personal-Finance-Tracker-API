## Testing the Accounts API Endpoints

1. Get all accounts

- `GET /api/accounts`

2. Create a new account

- `POST /api/accounts`

## Testing the Transaction API Endpoints

1. Create a Transaction (Income or Expense)

- `POST /api/transactions`
- Body:

```
{
    "accountId": "account-id-here",
    "type": "income",
    "amount": 1000,
    "description": "Salary",
    "category": "Salary"
}
```

2. Get Transactions for a Specific Account

- `GET /api/transactions/:accountId`

3. Delete a transaction

- `DELETE /api/transactions/:transactionId`

## Testing the User API Endpoints

1. Register a User

- `POST /api/users/register`
- Body:

```
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "123456"
}
```

2. Login a User

- `POST /api/users/login`
- Body:

```
{
    "email": "john@example.com",
    "password": "123456"
}
```

3. Get User Profile (Protected)

- `GET /api/users/profile`
- Include a `Bearer <token>` in the Authorization header (token received from login or registration).

## Testing the Tax API Endpoints

1. Get User's Tax Bracket:

- Endpoint: `GET /api/tax/bracket/:userId`
- Response: Returns the user’s total income, tax bracket, and total tax owed.

2. Calculate Tax with Deductions:

- Endpoint: `POST /api/tax/calculate/:userId`
- Request Body: `{ "deductions": 50000 }`
- Response: Returns the remaining tax after applying deductions.
