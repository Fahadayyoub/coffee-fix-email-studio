# The Steep Club launch: email sequence

Status: drafts only. Nothing is scheduled or sent.
Written: 15 November 2026, from `plan.md`.

Four emails to the whole waitlist (about 2,000 people). Each email is in `emails/`.

## Overview

| # | File | Subject | Purpose | Send (suggested) | Who gets it |
|---|---|---|---|---|---|
| 1 | `01-launch.md` | The Steep Club is open 🍵 | Tell them it's open, and what it is | Mon 7 Dec | Everyone on the waitlist |
| 2 | `02-your-way-in.md` | Your way into The Steep Club | Show how it works for beginners, gift buyers and daily drinkers | Thu 10 Dec | Everyone who hasn't joined |
| 3 | `03-questions-answered.md` | Your Steep Club questions, answered | Answer price, delivery, gift date and stopping, and give the gift order-by date before Christmas | Fri 18 Dec | Everyone who hasn't joined |
| 4 | `04-new-year.md` | A calm start to the new year | A small new routine for the new year, and the waitlist deadline if we have one | Tue 29 Dec | Everyone who hasn't joined |

No emails on 24 to 26 December.

## How the four map to the plan

The plan lists seven emails (E1 to E7). These four cover them like this:

- **Email 1** is E1.
- **Email 2** joins the three E2 versions into one email, with a short part for each group.
- **Email 3** joins E3, E4a and E4b: the teas, the gift date and the common questions.
- **Email 4** joins E6 and E7: the new year and the waitlist deadline.
- E5 (the second gift reminder) is left out.

## Send rules

- **Stop when they join.** Anyone who joins The Steep Club gets no more launch emails. They get the welcome email instead.
- **Resend email 1 once.** People who didn't open it get it again on Thu 10 Dec with the subject "The Steep Club is open. Come in and take a look." (48 characters). They get email 2 a few days later.
- **Pause if unsubscribes go over 1%** on any send.
- **Don't send** to anyone who has unsubscribed from marketing emails.

```
Waitlist --> Email 1 (Mon 7 Dec)
               |
          Opened? --No--> Email 1 resend (Thu 10 Dec)
               |                  |
              Yes                 |
               v                  v
          Email 2 (Thu 10 Dec, or Mon 14 Dec after a resend)
               |
          Email 3 (Fri 18 Dec)
               |
          [Quiet 24 to 26 Dec]
               |
          Email 4 (Tue 29 Dec)
               |
          [End: Sun 3 Jan]

Joined at any point --> [Exit] --> Welcome email
```

## Other subject lines to test

| # | Option B | Option C |
|---|---|---|
| 1 | The Steep Club is open, {{first_name}} | You're one of the first to know |
| 2 | New to tea, gifting, or every day? | Three ways to start The Steep Club |
| 3 | Price, delivery and gifts, answered | Before you join: your questions |
| 4 | A new morning cup for a new year | Make room for a quiet cup 🍵 |

## A/B tests

1. **Email 1 subject.** Main subject against option B (with the name). Split 50/50 on 20% of the list, send the winner to the rest after 4 hours. Winner: more clicks, not just more opens.
2. **Email 2 layout.** One email for all three groups against three separate versions, if the email tool can sort people. Winner: more joins.
3. **Send time.** Morning (8am) against lunch (12pm) on email 3. Winner: more clicks.

## What to track

- **Main measure:** joins from the waitlist. Target: 300 by Sun 3 Jan.
- **Each email:** opens, clicks, unsubscribes.
- **Overall:** joins per week against the plan's checkpoints (120, 200, 250, 300), and how many are gifts.
- **Review:** a short note in `notes/` every Monday, and a wrap-up by 8 January.

As a rough guide for launch emails to a warm waitlist, expect opens of 40 to 60% and clicks of 5 to 15%.

## Before these can be used

1. Fill in every `[TBC]` from the plan's fact sheet. Don't guess any of them.
2. Delete the waitlist offer lines in emails 1 and 4 if there's no offer.
3. Run `brand-review` on all four emails.
4. Get sign-off. A person sends them, outside this folder.

## Note on the email rules

The plan wanted email 1 to carry three "Which are you?" links to sort people into groups. Our email rules allow only one main link per email, so email 1 has one link. To sort people by group, use the subscription page or the email tool instead, or change the rule.
