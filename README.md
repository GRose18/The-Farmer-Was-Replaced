# The-Farmer-Was-Replaced
The Farmer Was Replaced (Open Source)
This is a replica version of The Farmer Was Replaced - compiled using REA + Codex.
Compatible with both Mac OS and Windows (IOS Coming Soon).

# Legal Disclaimer

**The creator of this repository does not own the rights to the video game "The Farmer Was Replaced". All intellectual property, trademarks, and copyrights belong strictly to Timon Herzog (Developer) and Metaroot (Publisher).**

---

### Copyright & Ownership Notice

The content, assets, and intellectual property associated with the video game **The Farmer Was Replaced** featured, referenced, or utilized within this repository are the sole and exclusive property of their respective owners. This repository is a community/fan-led project and does not claim, imply, or hold any ownership rights, titles, or interest in the game, its source code, or its underlying software.

All rights are reserved to and strictly remain with:
* **Developer:** Timon Herzog
* **Publisher:** Metaroot

### Purpose & Fair Use
This repository is intended solely for **non-commercial, educational, and informational** purposes (such as game automation scripts, programming exercises, or documentation). No copyright infringement is intended. All trademarks, service marks, trade names, and logos appearing in this material are the property of their respective owners.

### Notice to Rights Holders
If you are the copyright holder or a legal representative of Timon Herzog or Metaroot and have queries, concerns, or take-down requests regarding the materials hosted in this repository, please open an Issue or contact the repository administrator directly for prompt removal.



## October 31 local-progress build
Optional Steam stats, achievements synchronization, rich presence, leaderboard networking, player counts, Steam language lookup and store overlay requests are disabled. Local progress and gameplay rewards remain. Steam startup checks are unchanged. Music and sound effects remain bundled. Windows runtime remains untested.

## Private hosting
The original public static site is suspended. Deploy `render-private.yaml` as a new Blueprint from the connected private repository. Set SITE_PASSWORD in Render, never Git. Username defaults to owner. All page, image and video requests require HTTP Basic authentication; only /healthz is public. Missing credentials fail closed. GitHub Release downloads additionally require GitHub sign-in with repository access. Commit auto-deploy is configured.

The latest private offline packages are in release private-offline-2026-10-31. Mac menu rendering checked; Windows runtime untested.
