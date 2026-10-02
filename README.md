# SupGram

A mobile-first Telegram-style messaging starter built with HTML/CSS/JS + Supabase.

## What works in this starter
- Email/password sign up and login
- Supabase Auth
- Automatic profile creation
- Username search
- Real 1-to-1 conversations
- Real-time messages through Supabase Realtime
- Chats list with last message/time
- Contacts screen
- Profile edit
- Settings screen
- Mobile-first dark UI inspired by the supplied screenshots, with a different SupGram design

## Setup
1. Open Supabase Dashboard → SQL Editor.
2. Run `supabase-schema.sql`.
3. In Supabase Auth, configure email confirmation as you prefer.
4. Put `index.html` on GitHub Pages/Netlify/Vercel or open it in a local/static web server.
5. The supplied Supabase project URL and publishable key are already placed in `index.html`.

## Important security note
The key in the frontend is a publishable key. Do NOT put a Supabase service-role/secret key in browser code.
Security is provided by Row Level Security policies in `supabase-schema.sql`.

## Next production modules
Stories, groups/channels, media uploads, voice notes, calls, push notifications, message reactions, replies/forwarding, typing/presence, read receipts, message search, blocking/reporting and admin moderation can be added on top of this schema.
