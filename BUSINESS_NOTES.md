# Business Notes & Strategy

## 1. MVP Scope (The "Why")
We are building a **Governance System**, not just a Video Player.
By implementing strict roles and approval flows now, we avoid:
- **Legal Risks**: Copyright infringement, illegal content.
- **Brand Risk**: Low-quality content diluting the "Premium" feel.
- **Technical Debt**: Trying to bolt on permission systems later is painful.

## 2. What we are NOT monetizing yet
- **No Subscriptions**: Focus on adoption by Venues.
- **No Ads**: Ruin the aesthetic.
- **No Licensing Marketplace**: Too complex for Phase 1.

## 3. Cost Control (CFO Perspective)
- **Storage**: We use Google Cloud Storage (or Supabase Storage). Low cost for limited curated library.
- **Bandwidth**: Caching and selective resolution (Phase 2) will manage this.
- **Moderation**: Manual approval = $0 cost in ML/AI moderation tools.

## 4. Future Optionality
Because we own the governance layer:
- We *can* turn on Subscriptions later (Gate `global` channels).
- We *can* license content to Venues (We know who owns what).
- We *can* sell specific "Packs" (Collections of approved videos).

**Current Priority**: detailed auditability and zero-risk content delivery.
