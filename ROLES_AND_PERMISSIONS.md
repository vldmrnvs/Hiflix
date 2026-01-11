# Roles and Permissions

This document defines the strict role-based access control (RBAC) model for HIFLIX.

## Roles

### 👑 ADMIN
**Definition**: Internal platform operator.
**Access**: Full control over the platform's content and users.

**Capabilities**:
- **Channels**: Create, Edit, Delete Global Channels.
- **Videos**: View ALL videos (including drafts/pending). Approve, Reject, Remove, Archive any video.
- **Users**: Soft-ban/Suspend users.
- **Feedback**: View and manage all feedback.

### 🎟️ GUEST (Invite-Only)
**Definition**: A trusted creator or curator invited to the platform.
**Access**: Limited to their own content and private scope.

**Capabilities**:
- **Videos**:
    - Upload videos (Status automatically set to `pending_review`).
    - View OWN videos (regardless of status).
    - Request removal of OWN videos (Status -> `pending_removal`).
    - **CANNOT**: Approve videos, Delete videos directly, View other guests' private videos.
- **Channels**:
    - Create/Edit Private Channels (Visible only to them).
    - **CANNOT**: Create Global Channels.
- **Feedback**: Submit reports/suggestions.

### 👁️ PUBLIC (Viewer)
**Definition**: Any unauthenticated user or authenticated user without specific privileges.
**Access**: Read-only access to curated content.

**Capabilities**:
- **Videos**: View ONLY `approved` videos in `global` channels.
- **Channels**: View ONLY `global` channels.
- **Feedback**: Submit feedback (optional).
- **CANNOT**: Upload, Comment, See pending content.

## Permission Matrix

| Action | Admin | Guest | Public |
| :--- | :---: | :---: | :---: |
| **View Global Channels** | ✅ | ✅ | ✅ |
| **View Private Channels** | ✅ | Own Only | ❌ |
| **Create/Edit Global Channels** | ✅ | ❌ | ❌ |
| **Upload Video** | ✅ (Auto-Approve) | ✅ (Pending Review) | ❌ |
| **View Pending Videos** | ✅ | Own Only | ❌ |
| **Approve/Reject Video** | ✅ | ❌ | ❌ |
| **Request Removal** | N/A | ✅ (Own Only) | ❌ |
| **Hard Delete Video** | ✅ | ❌ | ❌ |
| **Suspend User** | ✅ | ❌ | ❌ |
