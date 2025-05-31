## Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```
2. **Add a `.env`** in the project root:

   ```dotenv
   PORT=5010
   MONGO_DB_NAME=<db-name>
   MONGO_HOST=localhost
   MONGO_PORT=27017

   OPENAI_API_KEY=<your‑openai‑key>
   ```
3. **Run the server**

   ```bash
   npm start
   ```

> Requires Node 18+ and a running MongoDB instance.

That’s it—open your client app or hit the socket endpoint to start chatting!
