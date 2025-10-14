# Works Page - Articles Display

## Overview
The Works page now fetches and displays articles from your API endpoint dynamically.

## ✨ Features Implemented

### 1. **ArticleCard Component**
Located: `src/components/custom/articlecard/ArticleCard.jsx`

**Props:**
- `article` (object) - Contains article data

**Displays:**
- 📝 **Title** - Article headline
- 📄 **Content Preview** - First 150 characters with "..." if longer
- 🏷️ **Category Badge** - Color-coded category label
- ✍️ **Writer** - Author name with user icon
- 📅 **Date** - Formatted creation date (e.g., "October 14, 2025")

**Design Features:**
- Clean card layout with shadow effects
- Hover animations (shadow expansion, title color change)
- Responsive typography
- Border and spacing for visual hierarchy
- No image - text-focused design

### 2. **Works Page**
Located: `src/Pages/Works.jsx`

**Features:**
- ✅ Fetches articles from API on component mount
- ✅ Loading spinner during fetch
- ✅ Error handling with user-friendly message
- ✅ Responsive grid layout (1/2/3 columns)
- ✅ Empty state message when no articles
- ✅ Article count display at bottom
- ✅ Console logging for debugging

**Layout:**
- **Mobile:** 1 column
- **Tablet:** 2 columns
- **Desktop:** 3 columns

### 3. **API Integration**
Located: `src/lib/articles.js`

**Function:** `fetchAndLogArticles()`

**Features:**
- Uses axios for HTTP requests
- Fetches from: `${VITE_API_BASE_URL}/articles`
- Comprehensive console logging:
  - 🔄 Request URL
  - ✅ Success confirmation
  - 📊 Response status and data
  - 📝 Article count
  - 📋 Full articles array
  - ❌ Error details if fails

## 🎨 Article Card Design

```
┌─────────────────────────────────────┐
│  [Category Badge]                   │
│                                     │
│  Article Title Here                 │
│                                     │
│  Content preview text appears       │
│  here with up to 150 characters...  │
│                                     │
│  ─────────────────────────────────  │
│  👤 Author Name    📅 Oct 14, 2025  │
└─────────────────────────────────────┘
```

## 📊 Data Structure Expected

The API should return articles in this format:

```json
{
  "articles": [
    {
      "_id": "unique-id",
      "title": "Article Title",
      "content": "Full article content...",
      "writer": "Author Name",
      "category": "Category Name",
      "createdAt": "2025-10-14T00:00:00.000Z"
    }
  ]
}
```

Or directly as an array:
```json
[
  {
    "_id": "unique-id",
    "title": "Article Title",
    ...
  }
]
```

## 🔄 States Handled

### 1. **Loading State**
- Displays spinning loader
- Shows during initial fetch

### 2. **Error State**
- Red alert box with error message
- User-friendly text
- Still shows header

### 3. **Empty State**
- Message: "No articles found"
- Subtext: "Check back later for new content!"

### 4. **Success State**
- Grid of article cards
- Article count at bottom

## 🚀 How It Works

1. **Component Mounts** → `useEffect` triggers
2. **Fetch Articles** → Calls `fetchAndLogArticles()`
3. **Console Logs** → Shows request/response details
4. **Parse Response** → Handles different response structures
5. **Update State** → Sets articles, loading, error states
6. **Render Cards** → Maps through articles and renders `ArticleCard`

## 📝 Console Output

When you visit the Works page, you'll see:
```
🔄 Fetching articles from: https://api.chsoutreach.live/api/v1/articles
✅ Articles fetched successfully!
📊 Response status: 200
📊 Response data: {...}
📝 Number of articles: 5
📋 Articles: [...]
```

## 🎯 Testing

1. **Start Dev Server:**
   ```bash
   pnpm dev
   ```

2. **Navigate to Works Page:**
   - Go to `/works` route
   - Or click "Literary Works" in navigation

3. **Check Console:**
   - Open DevTools (F12)
   - View Console tab
   - See article data logged

4. **Verify Display:**
   - Articles appear in grid
   - Cards show all information
   - Hover effects work
   - Responsive layout works

## 🔧 Customization Options

### Change Articles Per Row
In `Works.jsx`, update grid classes:
```jsx
// Current: 1/2/3 columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Example: 1/3/4 columns
className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
```

### Change Content Preview Length
In `ArticleCard.jsx`, update `truncateContent`:
```jsx
// Current: 150 characters
const truncateContent = (text, maxLength = 150)

// Example: 200 characters
const truncateContent = (text, maxLength = 200)
```

### Change Card Styling
Modify classes in `ArticleCard.jsx`:
```jsx
// Current card classes
className="bg-white rounded-lg shadow-md hover:shadow-xl..."

// Example: Add border color
className="bg-white rounded-lg shadow-md hover:shadow-xl border-l-4 border-blue-500..."
```

## 📦 Dependencies

- React 18+
- axios (for API calls)
- Tailwind CSS (for styling)

## 🐛 Troubleshooting

**No articles showing?**
- Check console for API errors
- Verify API endpoint is correct in `.env`
- Ensure backend is running
- Check CORS settings on backend

**Articles not formatted correctly?**
- Verify API response structure matches expected format
- Check console logs for actual data structure
- Adjust parsing logic in `Works.jsx` if needed

---

**Status:** ✅ Fully Functional
**Last Updated:** October 14, 2025
