<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep shareable home, collection, about and contact pages as separate TanStack routes with shared RIVI presentation components, so navigation and page metadata stay consistent.
- Validate local-only orders and enquiries with shared Zod schemas before writing to browser storage; no server submission is implied in this first version.
- Define gift-site styling and interactive variants in the semantic global design system to keep visual treatments consistent.
