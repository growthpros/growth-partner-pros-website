# AI Mastery Path member area

This repository is the older static Growth Partner Pros site. It is not the live app. Do not add a production `/mastery-path` build here (no member UI, server, Netlify Functions, or hosted attachments).

The source of truth is the Replit React/Express app. Website Ops can review this note, then publish on Replit only after Caroline says yes.

## What the live member area is

Members open `/mastery-path`.

- Sign-in is a magic link sent with Resend. There is no password.
- Only addresses on the email allowlist can sign in.
- The home library has 12 posts: class materials for classes 1–9, Class 2 office hours, Class 3 office hours, and Additional Assets for the overall course.
- Class recordings and the two office-hours recordings are ScreenPal embeds. Office hours are their own posts. They are not nested inside the class materials posts.
- Additional Assets is files only. It has no video.
- Attachment downloads live in Replit App Storage and are served to a signed-in member. They are not stored in this git repository.

Post titles, ScreenPal ids, and the 58 attachment names are listed in [mastery-path-inventory.md](mastery-path-inventory.md).

## Allowlist and secrets

Keep these on the Replit app, not in this repository:

- The Resend API key, and a from-address on a domain Resend is allowed to send from
- The member allowlist (cohort emails only)

Do not commit the allowlist or the Resend key. The public address on the marketing site is not a member login by itself.

## What this pull request is for

Review the inventory against the Replit library. It does not deploy or change the static site.
