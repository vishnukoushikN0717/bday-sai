# CORS Fix Guide for Vercel Deployment

## ✅ What I Fixed

I've updated the CORS configuration in `src/index.js` to:
- Support multiple frontend URLs
- Allow wildcard patterns for Vercel preview deployments
- Enable all necessary HTTP methods
- Properly handle preflight OPTIONS requests

## 🚀 Steps to Fix CORS on Vercel

### Step 1: Update Environment Variables on Vercel

1. Go to your Vercel backend project: https://vercel.com/dashboard
2. Click on your project (bday-sai-164p)
3. Go to **Settings** → **Environment Variables**
4. Update or add `FRONTEND_URL` with your frontend URLs:

**For single frontend:**
```
FRONTEND_URL=https://your-frontend-app.vercel.app
```

**For multiple frontends (RECOMMENDED):**
```
FRONTEND_URL=https://your-frontend-app.vercel.app,http://localhost:3000,https://*.vercel.app
```

Replace `your-frontend-app.vercel.app` with your actual frontend Vercel URL!

### Step 2: Redeploy Your Backend

After updating the environment variable:

**Option A - Trigger Redeploy:**
1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**

**Option B - Push Code:**
```bash
cd backend
git add .
git commit -m "Fix CORS configuration"
git push
```

### Step 3: Verify the Fix

Test your upload:
```javascript
// In browser console on your frontend
fetch('https://bday-sai-164p.vercel.app/api/photos/upload', {
  method: 'POST',
  // ... your upload data
})
```

## 📋 Environment Variable Format Examples

### For Development + Production:
```
FRONTEND_URL=https://sailuuu-app.vercel.app,http://localhost:3000
```

### With Wildcard for All Vercel Deployments:
```
FRONTEND_URL=https://sailuuu-app.vercel.app,https://sailuuu-app-*.vercel.app,http://localhost:3000
```

### Complete Example:
```
FRONTEND_URL=https://sailuuu-app.vercel.app,https://sailuuu-app-git-*.vercel.app,https://*.vercel.app,http://localhost:3000,http://localhost:3001
```

## 🔍 Debugging CORS Issues

### Check Backend Logs:
1. Go to Vercel Dashboard → Your Backend Project
2. Click **Deployments** → Latest deployment
3. Click **View Function Logs**
4. Look for `❌ Blocked by CORS:` messages

### Test CORS Headers:
Open browser console on your frontend and run:
```javascript
fetch('https://bday-sai-164p.vercel.app/api/photos', {
  method: 'OPTIONS'
})
.then(response => {
  console.log('CORS Headers:', response.headers);
});
```

## 🛠️ Alternative: Simple CORS (For Testing Only)

If you just want to test quickly, you can temporarily use:

In `backend/src/index.js`:
```javascript
app.use(cors({
  origin: '*',  // ⚠️ NOT SECURE - only for testing!
  credentials: false
}));
```

**⚠️ WARNING:** This allows ALL origins and is NOT recommended for production!

## ✅ Recommended Production Setup

1. **Set specific origins:**
   ```
   FRONTEND_URL=https://sailuuu-app.vercel.app
   ```

2. **For multiple environments:**
   ```
   FRONTEND_URL=https://sailuuu-app.vercel.app,https://sailuuu-app-staging.vercel.app,http://localhost:3000
   ```

3. **Redeploy backend** after setting environment variables

4. **Test uploads** from your frontend

## 📝 What to Update in Vercel

### Backend Environment Variables:
- `FRONTEND_URL` = `https://your-frontend-app.vercel.app,http://localhost:3000`
- `SUPABASE_URL` = Your Supabase URL
- `SUPABASE_SERVICE_KEY` = Your Supabase service key
- `EMAIL_SERVICE` = gmail
- `EMAIL_USER` = Your email
- `EMAIL_PASS` = Your email app password

### Frontend Environment Variables:
- `NEXT_PUBLIC_API_URL` = `https://bday-sai-164p.vercel.app`
- `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key

## 🎯 Quick Checklist

- [ ] Updated CORS code in `src/index.js`
- [ ] Set `FRONTEND_URL` in Vercel backend environment variables
- [ ] Redeployed backend on Vercel
- [ ] Tested photo upload from frontend
- [ ] Tested video scheduling from frontend
- [ ] Checked browser console for errors
- [ ] Verified in Vercel function logs

## 🆘 Still Having Issues?

1. **Check browser console** for exact error message
2. **Check Vercel function logs** for backend errors
3. **Verify environment variables** are set correctly
4. **Clear browser cache** and try again
5. **Try in incognito/private mode**

---

Made with ❤️ for SAILUUUUU
