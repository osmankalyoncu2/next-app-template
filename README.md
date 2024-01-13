<h1 align="center">
  Make Next App
</h1>

<p align="center">
  A template for quickly building Next.js apps.
</p>

<p align="center">
  Get started by following the <a href="#setup">setup</a>.
</p>

---

(A preview of the template will be added soon)

---

## Getting Started

This template uses Supabase, Stripe, Resend, Next Auth, OpenAI, and Next.js. It is a full stack template that can be used to build a SaaS application.

This template has support for these payment types:
- One-time payments
- Subscriptions
- Usage-based billing
- Donations

## Feature List

- [x] Authentication via Next Auth
- [x] Custom Themes (Only colours for now)
- [ ] Themes for Accessibility (Colour blindness, font size, etc.)
- [x] Google Analytics & Tag Manager
- [x] Hotjar Support
- [x] Meta Pixel Tracking
- [ ]  Stripe Payments:
	- [ ] One-time
  - [ ] Subscriptions
  - [ ] Usage-based billing
  - [ ] Donations
- [ ] Supabase Database (slowly getting there)
- [x] Resend Email Sending
- [x] Logging
  - [x] Betterstack Logging
  - [x] useTrace (Custom Logging)
- [x] OpenAI


## Notes

- [ ] The app is not as efficient as it could be. I need to work on that.
- [ ] I need to add better responsiveness to the Navigation Sidebar


## Setup

To get started with using Make Next App, you need to do the following:

1. Download the [latest release](https://github.com/arsenstorm/next-app-template/releases/latest) (or clone this repo if you want to contribute).

2. Extract and open the folder in your favourite code editor.

3. Run `npm install` to install all the dependencies.

> Alternatively, you can use any other package manager like `yarn` or `pnpm`.

4. You’ll need to create a `.env.local` file in the root of the project and set some environment variables.

5. Run `npm run dev` to start the development server.

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

7. To deploy your project to Vercel or Netlify, follow the [deployment instructions](#deployment).

## What’s OpenAI used for?

This template uses OpenAI for a Support feature that allows a user to search for help using documentation available in your app.

Generally, it’s really useful for many use-cases so it was added as a default feature to showcase how you can implement it.

### Supabase Setup

1. Create a new Supabase project

2. Create the `next_auth` using this command:

```
--
-- Name: next_auth; Type: SCHEMA;
--
CREATE SCHEMA next_auth;

GRANT USAGE ON SCHEMA next_auth TO service_role;
GRANT ALL ON SCHEMA next_auth TO postgres;

--
-- Create users table
--
CREATE TABLE IF NOT EXISTS next_auth.users
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name text,
    email text,
    "emailVerified" timestamp with time zone,
    image text,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email)
);

GRANT ALL ON TABLE next_auth.users TO postgres;
GRANT ALL ON TABLE next_auth.users TO service_role;

--- uid() function to be used in RLS policies
CREATE FUNCTION next_auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select
  	coalesce(
		nullif(current_setting('request.jwt.claim.sub', true), ''),
		(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
	)::uuid
$$;

--
-- Create sessions table
--
CREATE TABLE IF NOT EXISTS  next_auth.sessions
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    expires timestamp with time zone NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" uuid,
    CONSTRAINT sessions_pkey PRIMARY KEY (id),
    CONSTRAINT sessionToken_unique UNIQUE ("sessionToken"),
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES  next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

GRANT ALL ON TABLE next_auth.sessions TO postgres;
GRANT ALL ON TABLE next_auth.sessions TO service_role;

--
-- Create accounts table
--
CREATE TABLE IF NOT EXISTS  next_auth.accounts
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at bigint,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    oauth_token_secret text,
    oauth_token text,
    "userId" uuid,
    CONSTRAINT accounts_pkey PRIMARY KEY (id),
    CONSTRAINT provider_unique UNIQUE (provider, "providerAccountId"),
    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES  next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

GRANT ALL ON TABLE next_auth.accounts TO postgres;
GRANT ALL ON TABLE next_auth.accounts TO service_role;

--
-- Create verification_tokens table
--
CREATE TABLE IF NOT EXISTS  next_auth.verification_tokens
(
    identifier text,
    token text,
    expires timestamp with time zone NOT NULL,
    CONSTRAINT verification_tokens_pkey PRIMARY KEY (token),
    CONSTRAINT token_unique UNIQUE (token),
    CONSTRAINT token_identifier_unique UNIQUE (token, identifier)
);

GRANT ALL ON TABLE next_auth.verification_tokens TO postgres;
GRANT ALL ON TABLE next_auth.verification_tokens TO service_role;
```

3. Expose the `next_auth` schema by adding `next_auth` to the "Exposed schemas" found [here](https://app.supabase.com/project/_/settings/api). Or, when developing locally add `next_auth` to the `schemas` array in the `config.toml` file in the `supabase` folder that was generated by the [Supabase CLI](https://supabase.com/docs/guides/cli/local-development#initialize-your-project?utm_source=authjs-docs&medium=referral&campaign=authjs).


### Stripe Setup

First of all, I favour using Stripe Payment Intents over Stripe Checkout as it gives you more control.

## Tips & Tricks

1. For large products, it’s best to keep your marketing/landing pages separate from your app, but for a small solution, use the same app. This will save you time!

## Deployment

### Vercel

### Netlify
