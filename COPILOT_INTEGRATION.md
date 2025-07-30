# GitHub Copilot + Supabase Integration Guide for FlairAi

## 🚀 Quick Setup Checklist

### ✅ Completed Setup
- [x] Created `.copilot/` directory with context files
- [x] Added Supabase CLI as dev dependency  
- [x] Configured VS Code settings for optimal Copilot experience
- [x] Set up npm scripts for database management
- [x] Added project rules and coding patterns

### 🔧 Next Steps

#### 1. Initialize Supabase Project Connection
```bash
# Link local project to Supabase
npm run db:link --project-ref wrdfqnydraeyvjnpbiri

# Pull existing schema (optional)
npm run db:pull
```

#### 2. GitHub Repository Integration
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/wrdfqnydraeyvjnpbiri)
2. Navigate to: **Settings > Integrations**
3. Click **"Authorize GitHub"**
4. Select the `W3JDev/FlairAi` repository
5. Configure branch sync for `Lets-Coin` branch

#### 3. Database Schema Sync
```bash
# Create new migration
npm run db:migrate add_missing_tables

# Apply migrations
npm run db:apply
```

## 📁 Project Structure for Copilot

```
FlairAi/
├── .copilot/                 # Copilot context files
│   ├── supabase_context.txt  # Database and project context
│   ├── database_schema.sql   # Complete schema reference
│   ├── project_rules.txt     # Coding patterns and rules
│   └── config.json          # Copilot configuration
├── .vscode/
│   └── settings.json        # VS Code + Copilot settings
├── src-business/            # Main React application
│   ├── components/          # React components
│   ├── contexts/           # React contexts (LiveAPI, etc.)
│   ├── lib/               # Utilities and state management
│   └── App.tsx            # Main app component
├── components/             # Shared components
├── hooks/                  # Custom React hooks
├── lib/                   # Shared utilities
└── database/              # Schema and migrations
    └── schema.sql         # Full database schema
```

## 🧠 How Copilot Uses This Context

### Database Operations
Copilot now knows:
- Use UUID primary keys with `gen_random_uuid()`
- Implement RLS policies with `auth.uid()` checks
- Handle missing tables gracefully (error code '42P01')
- Use JSONB for flexible settings columns
- Prefer timestamptz for datetime fields

### React Patterns
Copilot will suggest:
- Functional components with hooks
- Proper TypeScript typing
- Zustand for state management
- Error boundaries and loading states
- Accessibility best practices

### Supabase Integration
Copilot understands:
- Authentication flow with JWT tokens
- Real-time subscriptions
- Row Level Security patterns
- Proper error handling
- Environment variable usage

## 💡 Copilot Prompt Examples

### Creating a New Component
```
Create a React component for managing FlareBot voice settings with:
- Dropdown for voice selection (Charon, Aoede, Fenrir, etc.)
- Volume slider
- Voice preview button
- Save to Supabase flarebots table
- Follow FlairAi patterns
```

### Database Query Help
```
Write a Supabase query to:
- Fetch user's training sessions
- Include FlareBot details
- Handle missing tables gracefully
- Use proper TypeScript types
- Follow FlairAi error handling patterns
```

### State Management
```
Create a Zustand store for training session management:
- Current session state
- Recording status
- Audio volume levels
- Session history
- Follow FlairAi state patterns
```

## 🔍 Context File Purposes

### `supabase_context.txt`
- Database schema overview
- Business logic explanation
- Common patterns and conventions
- Security considerations

### `database_schema.sql`
- Complete table definitions
- Foreign key relationships
- RLS policies
- Indexes and constraints

### `project_rules.txt`
- Code style guidelines
- React component patterns
- Error handling standards
- Performance best practices

### `config.json`
- Copilot preferences
- TypeScript settings
- Framework specifications
- Tool configurations

## 🛠 Available Commands

```bash
# Development
npm run dev              # Start Vite dev server
npm run build           # Build for production
npm run test            # Run tests

# Database Management
npm run db:link         # Link to Supabase project
npm run db:pull         # Pull remote schema
npm run db:push         # Push local changes
npm run db:reset        # Reset local database
npm run db:migrate      # Create new migration
npm run db:apply        # Apply pending migrations

# Code Quality
npm run lint            # Run ESLint
npm run test:coverage   # Run tests with coverage
```

## 🎯 Optimized Development Workflow

1. **Start Development**
   ```bash
   npm run dev
   ```

2. **Make Database Changes**
   ```bash
   npm run db:migrate new_feature
   # Edit migration file
   npm run db:apply
   ```

3. **Use Copilot Effectively**
   - Reference context files in prompts
   - Ask for FlairAi-specific patterns
   - Request error handling implementation
   - Get help with TypeScript types

4. **Test and Deploy**
   ```bash
   npm run test
   npm run build
   ```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [React + TypeScript Best Practices](https://react-typescript-cheatsheet.netlify.app/)
- [Zustand State Management](https://github.com/pmndrs/zustand)

## 🔐 Security Notes

- Never commit `.env` files with sensitive keys
- Use environment variables for all credentials
- Implement proper RLS policies
- Validate user input on both client and server
- Use HTTPS for all external communications

---

**Ready to build with AI assistance! 🤖✨**
