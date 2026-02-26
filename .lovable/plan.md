

## Plan: Improve Contact Form Error Handling and Notification

The request has two parts:

1. **Show a clear error message to the user when the email fails** — the form already has basic error handling (lines 142-148 in ContactForm.tsx), but it catches all errors with the same generic message. We should improve it to show the actual error detail from the API response (e.g. domain verification failed).

2. **Notify you (the site owner) when the contact form is broken** — add a fallback notification mechanism so you know if emails are failing silently.

### Implementation Steps

**1. Improve error handling in ContactForm.tsx**
- Parse the API error response body to extract `details` or `error` message from the Vercel function
- Show a more descriptive error toast to the user, including a fallback contact email

**2. Improve error response in `api/send-email.ts`**
- Return the Resend error details more clearly in the response so the frontend can display them
- Add the Resend error message to the response JSON

**3. Add a fallback notification edge function (`notify-form-error`)**
- Create a new edge function that sends a simple notification to your email (info@norrskensstigen.se) using a different method when the primary email fails
- The Vercel API function will call this edge function as a fallback when Resend fails, so you get alerted

**4. Update the Vercel API to call the fallback on failure**
- In the catch block of `api/send-email.ts`, call the edge function to notify you that the form is broken, including the error reason and the customer's details so you don't lose the inquiry

### Technical Details

- The fallback notification will use the existing Supabase edge function infrastructure
- The edge function will store failed submissions in a database table (`failed_contact_submissions`) so no inquiries are lost even if both email paths fail
- The ContactForm will show the specific error from Resend (e.g. "Domain verification failed") rather than just "Något gick fel"
- A database table `failed_contact_submissions` will store: name, email, phone, message, check_in_date, error_reason, created_at — so you can check for any lost inquiries

