# Email Setup Guide for PestControl99

## Current Configuration

Your quote form is now configured to send emails to: `info@pestcontrol99.com`

## Email Configuration Status

✅ **Email address configured**: info@pestcontrol99.com  
✅ **App password configured**: azhh aydt ulgy seti  
✅ **Quote form updated** with email field  
✅ **API route configured** for email sending  
✅ **Customer confirmation emails** enabled  

## How It Works

1. **Customer submits quote form** → Form data sent to `/api/send-quote`
2. **Business notification email** → Sent to info@pestcontrol99.com with quote details
3. **Customer confirmation email** → Sent to customer (if they provide email)

## Testing Your Email Setup

Run this command to test your email configuration:

```bash
npm run test-email
```

Or manually:
```bash
node scripts/test-email.js
```

## Gmail App Password Setup (If Needed)

If you're using Gmail and the current app password doesn't work:

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable **2-Factor Authentication** (required for app passwords)
3. Go to **Security** → **2-Step Verification** → **App passwords**
4. Generate a new app password for "Mail"
5. Update `.env.local` with the new 16-character password

## Email Features

### Business Notification Email
- Sent to: info@pestcontrol99.com
- Contains: Customer details, property info, pest type
- Subject: "New Quote Request - [Phone Number]"

### Customer Confirmation Email
- Sent to: Customer's email (if provided)
- Contains: Request confirmation and contact details
- Subject: "Quote Request Confirmation - PestControl99"

## Quote Form Fields

- **Phone Number** (required)
- **Email Address** (optional - for confirmations)
- **Property Type** (required)
- **Property Size** (required)
- **Street Address** (required)
- **Pest Type** (optional)

## Troubleshooting

### Common Issues:

1. **Authentication Error (EAUTH)**
   - Use App Password, not regular Gmail password
   - Enable 2-factor authentication first

2. **Connection Timeout**
   - Check internet connection
   - Verify SMTP settings

3. **Emails not received**
   - Check spam folder
   - Verify email address is correct

### Error Handling

The system is designed to be user-friendly:
- If email fails, form still shows success to user
- Errors are logged for debugging
- Form validation prevents incomplete submissions

## Security Best Practices

✅ App passwords stored in environment variables  
✅ Email credentials not exposed in code  
✅ Form validation on both client and server  
✅ Error handling prevents system crashes  

## Next Steps

1. Test the email functionality using the test script
2. Submit a test quote through your website
3. Check that you receive the notification email
4. Verify customer confirmation emails work (if customer provides email)

## Support

If you encounter any issues:
1. Run the test script first
2. Check the browser console for errors
3. Verify your app password is correct
4. Ensure 2-factor authentication is enabled on Gmail