# XChat Study Guide (What to touch and how to extend)

## 1) Project architecture

- `frontend/` (React + Vite): UI for landing page, room creation, and chat.
- `backend/` (Express + Socket.IO): REST endpoints for room lifecycle and websocket events for real-time chat.
- `Redis`: temporary room/message storage with expiration.
- `MongoDB`: currently connected but not actively used in core room/message flow.

## 2) Current feature flow

1. Create room in frontend (`/create`) -> `POST /rooms/create`.
2. Backend creates Redis key with empty messages and TTL.
3. Chat page joins socket room via `join-room`.
4. Sending message emits `send-message`; backend appends and stores in Redis and broadcasts.
5. Chat page loads room history via `GET /rooms/:roomName`.
6. Delete button calls `POST /rooms/delete`.

## 3) Where to touch when adding features

### A) Room lifecycle features
- Backend: `backend/src/routes/rooms.js`
- Frontend: `frontend/src/pages/Create.jsx` and `frontend/src/pages/Chat.jsx`

Examples:
- Add room password protection.
- Add room metadata (owner, topic, max users).

### B) Real-time chat behavior
- Backend socket events: `backend/src/utils/socketHandler.js`
- Frontend socket listeners: `frontend/src/pages/Chat.jsx`

Examples:
- Typing indicator.
- Read receipts.
- Presence status (online/away).

### C) Persistence strategy
- Redis utilities: `backend/src/utils/redis.js`
- Mongo connection/model: `backend/src/db/connect.js`, `backend/src/models/room.js`

Examples:
- Keep short-term chat in Redis, then archive to MongoDB.
- Restore deleted/expired room metadata from Mongo if required.

## 4) Suggested extension roadmap (beginner-friendly)

1. **Validation layer**
   - Validate message length and room name format.
   - Return consistent API errors.

2. **Room existence checks**
   - Reject `join-room` if room key no longer exists.

3. **Typing indicator**
   - Add `typing-start` and `typing-stop` socket events.

4. **Simple moderation tools**
   - Add basic profanity filtering or duplicate-message protection.

5. **Store room metadata in MongoDB**
   - Save `createdAt`, `expiresAt`, and optional `ownerAlias`.

6. **UI improvements**
   - Show room TTL countdown.
   - Add reconnect status banner.

## 5) Development setup checklist

Backend `.env` values:
- `PORT`
- `DATABASE_URL`
- `REDIS_URL`

Frontend `.env` value:
- `VITE_BACKEND_URL`

Run locally:
- Backend: `cd backend && npm install && npm run dev`
- Frontend: `cd frontend && npm install && npm run dev`

## 6) Important principle

When you are unsure "what to touch", first decide **which layer** the feature belongs to:
- UI only -> frontend page/component files.
- API workflow -> backend routes.
- Live behavior -> socket handlers.
- Data lifetime/storage -> Redis/Mongo files.

Then implement one small increment end-to-end and test it manually.
