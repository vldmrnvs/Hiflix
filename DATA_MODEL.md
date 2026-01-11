# Data Model & RLS Policies

This document outlines the database schema and the Row Level Security (RLS) policies that enforce the governance rules.

## Tables

### 1. `profiles`
Extends the auth.users table.
- `id`: uuid (PK, refs auth.users)
- `email`: text
- `role`: text ('admin' | 'guest') - Default 'guest'
- `is_suspended`: boolean - Default false

### 2. `channels`
- `id`: uuid (PK)
- `slug`: text (unique)
- `name`: text
- `type`: text ('global' | 'private') - Default 'global'
- `owner_id`: uuid (refs profiles.id, nullable). Required if type is 'private'.
- `is_featured`: boolean
- `created_at`: timestamp

### 3. `videos`
- `id`: uuid (PK)
- `channel_id`: uuid (refs channels.id)
- `owner_id`: uuid (refs profiles.id)
- `title`: text
- `status`: text ('draft', 'pending_review', 'approved', 'rejected', 'pending_removal', 'removed', 'archived')
- `storage_path`: text
- `moderation_reason`: text (nullable)
- `created_at`: timestamp

### 4. `feedback`
- `id`: uuid
- `user_id`: uuid (nullable, refs profiles.id)
- `type`: text ('suggestion', 'issue', 'content_report')
- `message`: text
- `meta`: jsonb (nullable) - { category, url, channel_id, video_id, ... }
- `status`: text ('open', 'reviewed', 'closed')
- `admin_note`: text (nullable)
- `reviewed_at`: timestamp (nullable)
- `reviewed_by`: uuid (nullable, refs profiles.id)
- `closed_at`: timestamp (nullable)
- `created_at`: timestamp

---

## RLS Policies (The Law)

### Profiles
- **View**: Users can view their own profile. Admins can view all.
- **Update**: Admins can update all (e.g., suspend).

### Channels
- **Select (Public/Guest)**:
  - Allow if `type = 'global'`
  - OR `owner_id = auth.uid()` (Private channels)
- **Insert/Update**:
  - **Admin**: Full access.
  - **Guest**: Allow only if `type = 'private'` AND `owner_id = auth.uid()`.
- **Delete**: Admin only.

### Videos
- **Select**:
  - **Admin/Owner**: `auth.uid() = owner_id` OR `is_admin()`.
  - **Public**: `status = 'approved'` AND `channel.type = 'global'` (Requires join check).
- **Insert**:
  - **Guest**: Allowed. MUST enforce `owner_id = auth.uid()` and `status = 'pending_review'`.
- **Update**:
  - **Admin**: Full access.
  - **Guest**: Allow only if `auth.uid() = owner_id`.
    - Constraint: Can ONLY update `status` to `pending_removal`? Or maybe just title?
    - *Strict Mode*: Only allow `status` update to `pending_removal`.

### Feedback
- **Insert**: Public/Guest allowed.
- **Select**: Admin only. Owner can see their own? (Optional).

## Storage Policies
- **Upload**: `auth.uid() = owner_id` (Folder structure: `/videos/{user_id}/{filename}`)
- **Read**: Public.
